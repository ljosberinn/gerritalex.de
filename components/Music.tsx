'use client';

import { Image } from 'components/Image';
import { Music as MusicType } from 'app/music/page';
import { useState } from 'react';

type MusicProps = {
  data: MusicType[];
};

export function Music({ data }: MusicProps) {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 pt-8">
        {data.map((album) => {
          return (
            <a
              href={
                album.id
                  ? `https://www.discogs.com/release/${album.id}`
                  : `https://www.discogs.com/search?q=${album.artist}+${album.album}`
              }
              target="_blank"
              key={album.id ?? `${album.acquired}-${album.artist}-${album.album}`}
              className="h-[120px] w-[120px] opacity-80 hover:opacity-100"
            >
              <FlippableImage album={album} />
            </a>
          );
        })}
      </div>
    </>
  );
}

const cache = new Map<number, boolean>();

function FlippableImage({ album }: { album: MusicType }) {
  const [kind, setKind] = useState('front');

  return (
    <Image
      alt={`${album.artist} - ${album.album}`}
      title={`${album.artist} - ${album.album}`}
      width={120}
      height={120}
      className={
        'h-full rounded-md border-2 border-slate-300 object-cover shadow-inner transition ease-in-out hover:border-slate-800 hover:opacity-100 hover:shadow-none dark:border-slate-700 hover:dark:border-primary-700'
      }
      loading="lazy"
      quality={75}
      src={`/static/images/music/${album.id}-${kind}.jpg`}
      onMouseEnter={() => {
        if (!album.id) {
          return;
        }

        if (cache.has(album.id)) {
          const exists = cache.get(album.id);

          if (exists) {
            setKind('back');
          }

          return;
        }

        fetch(`/static/images/music/${album.id}-back.jpg`, {
          method: 'HEAD',
        }).then((response) => {
          if (response.status === 404) {
            cache.set(album.id, false);
          } else {
            cache.set(album.id, true);
            setKind('back');
          }
        });
      }}
      onMouseLeave={() => {
        setKind('front');
      }}
    />
  );
}
