'use client';

import { Fragment, useEffect, useState } from 'react';
import { WowheadIcon } from './WowheadIcon';
import { WowheadLink } from './WowheadLink';
import { CustomLink } from './CustomLink';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

type SeasonalAuraOverviewDataset = {
  sources: Record<string, { icon: string; name: string }>;
  spells: {
    id: number;
    kind: string;
    source: string;
    name: string;
    icon: string;
    notes?: string[];
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
            <WowheadLink kind="spell" id={spell.id} icon={spell.icon}>
              {spell.name}
            </WowheadLink>
            {spell.notes ? (
              <ul>
                {spell.notes.map((note, i) => {
                  return <li key={i}>{note}</li>;
                })}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function ByKind({ data }: SeasonalAuraOverviewProps) {
  const grouped = data.spells.reduce<
    Record<string, Record<string, SeasonalAuraOverviewDataset['spells']>>
  >((acc, spell) => {
    if (!(spell.kind in acc)) {
      acc[spell.kind] = {};
    }

    if (!(spell.source in acc[spell.kind])) {
      acc[spell.kind][spell.source] = [];
    }

    acc[spell.kind][spell.source].push(spell);

    return acc;
  }, {});

  const kinds = Object.keys(grouped).sort();

  return (
    <>
      {kinds.map((kind) => {
        const sources = Object.keys(grouped[kind]).sort();

        return (
          <Fragment key={kind}>
            <h2
              id={kind}
              className="content-header border-dashed border-gray-200 [&:not(:first-of-type)]:border-t-1 [&:not(:first-of-type)]:pt-8"
            >
              <CustomLink href={`#${kind}`}>
                <ContentHeaderLink />
              </CustomLink>
              {kind.slice(0, 1).toUpperCase()}
              {kind.slice(1)}
            </h2>
            {sources.map((source) => {
              const sourceInfo = data.sources[source];
              const spells = grouped[kind][source].sort((a, b) => a.name.localeCompare(b.name));

              return (
                <Fragment key={source}>
                  <h3 id={`${kind}-${source}`}>
                    <CustomLink href={`#${kind}-${source}`}>
                      <ContentHeaderLink />
                    </CustomLink>
                    <WowheadIcon icon={sourceInfo.icon}>{sourceInfo.name}</WowheadIcon>
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

    if (!(spell.kind in acc[spell.source])) {
      acc[spell.source][spell.kind] = [];
    }

    acc[spell.source][spell.kind].push(spell);

    return acc;
  }, {});

  const sources = Object.keys(grouped).sort();

  return (
    <>
      {sources.map((source) => {
        const sourceInfo = data.sources[source];
        const kinds = Object.keys(grouped[source]).sort();

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
            {kinds.map((kind) => {
              const spells = grouped[source][kind].sort((a, b) => a.name.localeCompare(b.name));

              return (
                <Fragment key={kind}>
                  <h3 id={`${source}-${kind}`}>
                    <CustomLink href={`#${source}-${kind}`}>
                      <ContentHeaderLink />
                    </CustomLink>
                    {kind.slice(0, 1).toUpperCase()}
                    {kind.slice(1)}
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
  const [displayKind, setDisplayKind] = useState<'byKind' | 'byDungeon'>(() => {
    if (typeof window === 'undefined') {
      return 'byKind';
    }

    // @ts-expect-error this is valid
    const url = new URL(location);

    if (!url.searchParams.has('displayKind')) {
      return 'byKind';
    }

    return url.searchParams.get('displayKind') === 'byDungeon' ? 'byDungeon' : 'byKind';
  });

  useEffect(() => {
    // @ts-expect-error this is valid
    const url = new URL(location);

    if (
      url.searchParams.has('displayKind') &&
      url.searchParams.get('displayKind') === displayKind
    ) {
      return;
    }

    url.hash = '';
    url.searchParams.set('displayKind', displayKind);
    console.log(url.searchParams.toString());

    window.history.pushState({}, '', url);
  }, [displayKind]);

  return (
    <TabGroup
      selectedIndex={displayKind === 'byKind' ? 0 : 1}
      onChange={(index) => setDisplayKind(index === 0 ? 'byKind' : 'byDungeon')}
    >
      <TabList>
        <Tab>By Kind</Tab>
        <Tab>By Dungeon</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ByKind data={data} />
        </TabPanel>
        <TabPanel>
          <ByDungeon data={data} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
