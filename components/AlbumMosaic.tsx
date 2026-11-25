'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { CustomLink } from './CustomLink';

export type MosaicAlbum = {
  key: string;
  artist: string;
  album: string;
  year: number | null;
  styles: string;
  runtime: string | null;
  acquisition: string | null;
  wanted: boolean;
  listening: string | null;
  span: 1 | 2 | 3 | 4;
  // already prefixed with BASE_PATH, which client bundles can't read
  image: string;
  discogs: string;
};

const TAB_WIDTH = 260;
const CLOSE_DELAY = 150;

const spanClasses: Record<MosaicAlbum['span'], string> = {
  1: '',
  2: 'col-span-2 row-span-2',
  3: 'col-span-3 row-span-3',
  4: 'col-span-4 row-span-4',
};

type OpenTab = {
  key: string;
  alignRight: boolean;
};

export function AlbumMosaic({ albums }: { albums: MosaicAlbum[] }) {
  const [openTab, setOpenTab] = useState<OpenTab | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openTileRef = useRef<HTMLLIElement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastPointerType = useRef('');
  const baseId = useId();

  function show(key: string, tile: HTMLLIElement) {
    window.clearTimeout(closeTimer.current);

    const list = listRef.current!.getBoundingClientRect();
    const width = Math.min(TAB_WIDTH, list.width);

    openTileRef.current = tile;
    setOpenTab({ key, alignRight: tile.getBoundingClientRect().left + width > list.right });
  }

  const hide = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    openTileRef.current = null;
    setOpenTab(null);
  }, []);

  const openKey = openTab?.key ?? null;

  useEffect(() => {
    if (openKey === null) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (!openTileRef.current?.contains(event.target as Node)) {
        hide();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') {
        return;
      }

      const tile = openTileRef.current;

      if (tile?.contains(document.activeElement)) {
        tile.querySelector('button')?.focus();
      }

      hide();
    }

    const openedAtWidth = window.innerWidth;

    // the alignment was measured for the old width; height alone changes as mobile toolbars collapse
    function onResize() {
      if (window.innerWidth !== openedAtWidth) {
        hide();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [openKey, hide]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    // the base track shrinks below 72px on narrow phones so a 4×4 tile always fits
    <ul
      ref={listRef}
      className="@container grid grid-flow-dense grid-cols-[repeat(auto-fill,minmax(min(72px,calc((100%_-_36px)/4)),1fr))] gap-3 md:grid-cols-[repeat(auto-fill,minmax(104px,1fr))] md:gap-6"
    >
      {albums.map((album, index) => {
        const isOpen = openKey === album.key;
        const tabId = `${baseId}-${index}`;

        return (
          <li
            key={album.key}
            className={clsx('relative aspect-square', spanClasses[album.span], isOpen && 'z-20')}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') {
                show(album.key, event.currentTarget);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse' && isOpen) {
                window.clearTimeout(closeTimer.current);
                closeTimer.current = window.setTimeout(hide, CLOSE_DELAY);
              }
            }}
            onBlur={(event) => {
              const next = event.relatedTarget;

              if (isOpen && next instanceof Node && !event.currentTarget.contains(next)) {
                hide();
              }
            }}
          >
            <button
              type="button"
              aria-label={`${album.artist} – ${album.album}`}
              aria-expanded={isOpen}
              aria-controls={tabId}
              onPointerDown={(event) => {
                lastPointerType.current = event.pointerType;
              }}
              onClick={(event) => {
                const tile = event.currentTarget.parentElement as HTMLLIElement;

                // hovering already opened it, so a mouse click must not close it again
                if (event.detail !== 0 && lastPointerType.current === 'mouse') {
                  show(album.key, tile);
                } else if (isOpen) {
                  hide();
                } else {
                  show(album.key, tile);
                }
              }}
              className="group focus-visible:outline-primary-500 block size-full cursor-pointer overflow-hidden rounded-md border-2 border-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-slate-700"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={album.image}
                alt=""
                loading="lazy"
                decoding="async"
                className={clsx(
                  'size-full object-cover motion-safe:transition-opacity',
                  isOpen
                    ? 'opacity-100'
                    : album.wanted
                      ? 'opacity-25 group-hover:opacity-100'
                      : 'opacity-80 group-hover:opacity-100'
                )}
              />
            </button>

            <div
              id={tabId}
              hidden={!isOpen}
              className={clsx(
                'absolute top-full w-[min(260px,100cqw)] pt-2',
                openTab?.alignRight && isOpen ? 'right-0' : 'left-0'
              )}
            >
              <div className="rounded-md border-2 border-slate-300 bg-white p-3 text-sm shadow-lg dark:border-slate-700 dark:bg-gray-950">
                <p className="text-gray-600 [font-variant-caps:small-caps] dark:text-gray-400">
                  {album.artist}
                </p>
                <p className="leading-snug font-bold">{album.album}</p>

                <div className="mt-2 space-y-0.5 text-gray-700 dark:text-gray-300">
                  {album.year || album.runtime ? (
                    <p>{[album.year, album.runtime].filter(Boolean).join(' · ')}</p>
                  ) : null}
                  {album.styles ? <p>{album.styles}</p> : null}
                  {album.acquisition ? <p>{album.acquisition}</p> : null}
                  {album.listening ? <p>{album.listening}</p> : null}
                </div>

                <CustomLink
                  href={album.discogs}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 focus-visible:outline-primary-500 mt-2 inline-block font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  View on Discogs
                </CustomLink>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
