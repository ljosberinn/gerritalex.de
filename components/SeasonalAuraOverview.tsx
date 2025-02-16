'use client';

import { DetailedHTMLProps, Fragment, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { WowheadIcon, WowheadIconProps } from './WowheadIcon';
import { WowheadLink, WowheadLinkProps } from './WowheadLink';
import { CustomLink } from './CustomLink';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useScript } from '../hooks/useScript';

function getWowheadBranch(): WowheadLinkProps['branch'] {
  if (new Date() >= new Date('2025-03-04T15:00:00Z')) {
    return;
  }

  return 'ptr-2';
}

type SeasonalAuraOverviewDataset = {
  sources: Record<string, { icon: string; name: string }>;
  spells: {
    id: number;
    type: string;
    source: string;
    name: string;
    icon: string;
    notes?: (
      | string
      | { component: 'WowheadLink'; props: WowheadLinkProps; children: string }
      | { component: 'WowheadIcon'; props: WowheadIconProps; children: string }
      | { component: 'i'; props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> }
      | { component: 'b'; props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> }
    )[];
  }[];
};

type SeasonalAuraOverviewProps = {
  data: SeasonalAuraOverviewDataset;
};

function ContentHeaderLink() {
  return (
    <span className="content-header-link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="linkicon h-5 w-5"
      >
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
      </svg>
    </span>
  );
}

type SpellsProps = {
  spells: SeasonalAuraOverviewDataset['spells'];
};

function Spells({ spells }: SpellsProps) {
  return (
    <ul>
      {spells.map((spell) => {
        return (
          <li key={spell.id}>
            <WowheadLink branch={getWowheadBranch()} kind="spell" id={spell.id} icon={spell.icon}>
              {spell.name}
            </WowheadLink>
            {spell.notes ? (
              <ul>
                {spell.notes.map((note, i) => {
                  if (typeof note === 'string') {
                    return <li key={i}>{note}</li>;
                  }

                  if (Array.isArray(note)) {
                    return (
                      <li key={i}>
                        {note.map((notePart, j) => {
                          return (
                            <Fragment key={j}>
                              {typeof notePart === 'string' ? (
                                notePart
                              ) : notePart.component === 'WowheadLink' ? (
                                <WowheadLink branch={getWowheadBranch()} {...notePart.props} />
                              ) : notePart.component === 'WowheadIcon' ? (
                                <WowheadIcon {...notePart.props} />
                              ) : notePart.component === 'b' ? (
                                <b {...notePart.props} />
                              ) : notePart.component === 'i' ? (
                                <i {...notePart.props} />
                              ) : null}
                            </Fragment>
                          );
                        })}
                      </li>
                    );
                  }

                  return null;
                })}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function ByType({ data }: SeasonalAuraOverviewProps) {
  const grouped = data.spells.reduce<
    Record<string, Record<string, SeasonalAuraOverviewDataset['spells']>>
  >((acc, spell) => {
    if (!(spell.type in acc)) {
      acc[spell.type] = {};
    }

    if (!(spell.source in acc[spell.type])) {
      acc[spell.type][spell.source] = [];
    }

    acc[spell.type][spell.source].push(spell);

    return acc;
  }, {});

  const types = Object.keys(grouped).sort();

  return (
    <>
      <p>Table of Contents</p>
      <ul>
        {types.map((type) => {
          const sources = Object.keys(grouped[type]);
          const totalForType = sources.reduce((acc, source) => {
            return acc + grouped[type][source].length;
          }, 0);

          return (
            <li key={type}>
              <a href={`#${type}`}>
                {type.slice(0, 1).toUpperCase()}
                {type.slice(1)} ({totalForType})
              </a>
            </li>
          );
        })}
      </ul>
      {types.map((type) => {
        const sources = Object.keys(grouped[type]).sort();
        const totalForType = sources.reduce((acc, source) => {
          return acc + grouped[type][source].length;
        }, 0);

        return (
          <Fragment key={type}>
            <h2
              id={type}
              className="content-header border-dashed border-gray-200 [&:not(:first-of-type)]:border-t-1 [&:not(:first-of-type)]:pt-8"
            >
              <CustomLink href={`#${type}`}>
                <ContentHeaderLink />
              </CustomLink>
              {type.slice(0, 1).toUpperCase()}
              {type.slice(1)} ({totalForType})
            </h2>
            {sources.map((source) => {
              const sourceInfo = data.sources[source];
              const spells = grouped[type][source].sort((a, b) => a.name.localeCompare(b.name));

              return (
                <Fragment key={source}>
                  <h3 id={`${type}-${source}`}>
                    <CustomLink href={`#${type}-${source}`}>
                      <ContentHeaderLink />
                    </CustomLink>
                    <WowheadIcon icon={sourceInfo.icon}>{sourceInfo.name}</WowheadIcon> (
                    {spells.length})
                  </h3>
                  <Spells spells={spells} />
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}

function ByDungeon({ data }: SeasonalAuraOverviewProps) {
  const grouped = data.spells.reduce<
    Record<string, Record<string, SeasonalAuraOverviewDataset['spells']>>
  >((acc, spell) => {
    if (!(spell.source in acc)) {
      acc[spell.source] = {};
    }

    if (!(spell.type in acc[spell.source])) {
      acc[spell.source][spell.type] = [];
    }

    acc[spell.source][spell.type].push(spell);

    return acc;
  }, {});

  const sources = Object.keys(grouped).sort();

  return (
    <>
      <p>Table of Contents</p>
      <ul>
        {sources.map((source) => {
          const sourceInfo = data.sources[source];
          return (
            <li key={source}>
              <a href={`#${source}`}>
                <WowheadIcon icon={sourceInfo.icon}>{sourceInfo.name}</WowheadIcon>
              </a>
            </li>
          );
        })}
      </ul>
      {sources.map((source) => {
        const sourceInfo = data.sources[source];
        const types = Object.keys(grouped[source]).sort();

        return (
          <Fragment key={source}>
            <h2
              id={source}
              className="content-header border-dashed border-gray-200 [&:not(:first-of-type)]:border-t-1 [&:not(:first-of-type)]:pt-8"
            >
              <CustomLink href={`#${source}`}>
                <ContentHeaderLink />
              </CustomLink>
              <WowheadIcon icon={sourceInfo.icon}>{sourceInfo.name}</WowheadIcon>
            </h2>
            {types.map((type) => {
              const spells = grouped[source][type].sort((a, b) => a.name.localeCompare(b.name));

              return (
                <Fragment key={type}>
                  <h3 id={`${source}-${type}`}>
                    <CustomLink href={`#${source}-${type}`}>
                      <ContentHeaderLink />
                    </CustomLink>
                    {type.slice(0, 1).toUpperCase()}
                    {type.slice(1)} ({spells.length})
                  </h3>
                  <Spells spells={spells} />
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}

export function SeasonalAuraOverview({ data }: SeasonalAuraOverviewProps) {
  const [by, setBy] = useState<'type' | 'dungeon'>('dungeon');
  const intialRenderRef = useRef(true);

  useScript('https://wow.zamimg.com/js/tooltips.js');

  useEffect(
    function restoreStateFromUrl() {
      if (!intialRenderRef.current) {
        return;
      }

      intialRenderRef.current = false;
      // @ts-expect-error this is valid
      const url = new URL(location);

      if (!url.searchParams.has('by')) {
        return;
      }

      const storedBy = url.searchParams.get('by');

      if (storedBy === by) {
        return;
      }

      const hash = url.hash;

      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);

          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }, 350);
      }

      if (storedBy === 'type' || storedBy === 'dungeon') {
        setBy(storedBy);
      }
    },
    [by]
  );

  return (
    <TabGroup
      selectedIndex={by === 'dungeon' ? 0 : 1}
      onChange={(index) => {
        const next = index === 0 ? 'dungeon' : 'type';

        // @ts-expect-error this is valid
        const url = new URL(location);

        url.hash = '';
        url.searchParams.set('by', next);
        window.history.pushState({}, '', url);

        setBy(next);
      }}
      className="w-full"
    >
      <TabList className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-4">
        <Tab
          className={`w-full cursor-pointer rounded-sm border-1 border-solid py-2 text-center ${by === 'dungeon' ? 'bg-teal-500 font-bold dark:bg-teal-950' : 'hover:bg-teal-400 dark:hover:bg-teal-900'}`}
        >
          By Dungeon
        </Tab>
        <Tab
          className={`w-full cursor-pointer rounded-sm border-1 border-solid py-2 text-center ${by === 'type' ? 'bg-teal-500 font-bold dark:bg-teal-950' : 'hover:bg-teal-400 dark:hover:bg-teal-900'}`}
        >
          By Type
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ByDungeon data={data} />
        </TabPanel>
        <TabPanel>
          <ByType data={data} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
