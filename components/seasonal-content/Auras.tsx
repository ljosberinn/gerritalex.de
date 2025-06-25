'use client';

import { Fragment, useCallback, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useScript } from '../../hooks/useScript';
import { CustomLink } from '../CustomLink';
import { WowheadIcon } from '../WowheadIcon';
import { useRestoreStateFromUrl } from './useRestoreStateFromUrl';
import { ContentHeaderLink } from './ContentHeaderLink';
import { type SpellsProps, Spells } from './Spells';
import { WowheadLinkProps } from '../WowheadLink';

type AuraDataset = {
  sources: Record<string, { icon: string; name: string }>;
  spells: SpellsProps['spells'];
};

type AuraProps = {
  data: AuraDataset;
  wowheadBranch?: WowheadLinkProps['branch'];
};

function ByType({ data, wowheadBranch }: AuraProps) {
  const grouped = data.spells.reduce<Record<string, Record<string, SpellsProps['spells']>>>(
    (acc, spell) => {
      if (!(spell.type in acc)) {
        acc[spell.type] = {};
      }

      if (!(spell.source in acc[spell.type])) {
        acc[spell.type][spell.source] = [];
      }

      acc[spell.type][spell.source].push(spell);

      return acc;
    },
    {}
  );

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
                  <Spells wowheadBranch={wowheadBranch} spells={spells} />
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}

function ByDungeon({ data, wowheadBranch }: AuraProps) {
  const grouped = data.spells.reduce<Record<string, Record<string, SpellsProps['spells']>>>(
    (acc, spell) => {
      if (!(spell.source in acc)) {
        acc[spell.source] = {};
      }

      if (!(spell.type in acc[spell.source])) {
        acc[spell.source][spell.type] = [];
      }

      acc[spell.source][spell.type].push(spell);

      return acc;
    },
    {}
  );

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
                  <Spells wowheadBranch={wowheadBranch} spells={spells} />
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}

export function Auras({ data, wowheadBranch }: AuraProps) {
  const [by, setBy] = useState<'type' | 'dungeon'>('dungeon');

  const onChange = useCallback((by: string | null) => {
    if (by === 'type' || by === 'dungeon') {
      setBy(by);
    }
  }, []);

  useScript('https://wow.zamimg.com/js/tooltips.js');
  useRestoreStateFromUrl(by, onChange);

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
          <ByDungeon wowheadBranch={wowheadBranch} data={data} />
        </TabPanel>
        <TabPanel>
          <ByType wowheadBranch={wowheadBranch} data={data} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
