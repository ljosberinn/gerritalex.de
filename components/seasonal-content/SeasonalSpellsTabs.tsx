'use client';

import { type CSSProperties, Fragment, useCallback, useMemo, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { Image } from '../Image';
import { WowheadIcon } from '../WowheadIcon';
import { CustomLink } from '../CustomLink';
import { type WowheadLinkProps } from '../WowheadLink';
import { ContentHeaderLink } from './ContentHeaderLink';
import { Spells, type SpellsProps } from './Spells';
import { getSpellKindChipColor, getSpellKindLabel } from './SpellBadge';
import {
  getChipCount,
  getEffectivePicks,
  getFilterKeys,
  matchesFilters,
  parseShowParam,
  serializePicks,
  togglePick,
} from './filters';
import { type Encounter, type Section, getSections } from './sections';
import { useRestoreSearchParams } from './useRestoreSearchParams';

export type SeasonalSpellsDataset = {
  'current-rotation': string[];
  sources: Record<string, { icon: string; name: string; encounters: Encounter[] }>;
  spells: SpellsProps['spells'];
};

type SeasonalSpellsTabsProps = {
  data: SeasonalSpellsDataset;
  wowheadBranch?: WowheadLinkProps['branch'];
};

type Dungeon = {
  source: string;
  spells: SpellsProps['spells'];
  keys: string[];
};

const searchParams = ['by', 'show'] as const;

// keeps anchored headings clear of the sticky panel; its height is measured into this variable
const anchorScrollMargin = 'scroll-mt-[calc(var(--spells-panel-height,0px)+0.5rem)]';

function SpellList({
  spells,
  wowheadBranch,
}: {
  spells: SpellsProps['spells'];
  wowheadBranch?: WowheadLinkProps['branch'];
}) {
  return (
    <Spells
      badges
      wowheadBranch={wowheadBranch}
      spells={spells.toSorted((a, b) => a.name.localeCompare(b.name))}
    />
  );
}

function SectionContent({
  section,
  source,
  spells,
  wowheadBranch,
}: {
  section: Section;
  source: string;
  spells: SpellsProps['spells'];
  wowheadBranch?: WowheadLinkProps['branch'];
}) {
  const anchor = `${source}-${section.anchorSlug}`;
  const label = section.icon ? (
    <WowheadIcon icon={section.icon}>{section.label}</WowheadIcon>
  ) : (
    section.label
  );

  const heading = (
    <h3 id={anchor} className={anchorScrollMargin}>
      <CustomLink href={`#${anchor}`}>
        <ContentHeaderLink />
      </CustomLink>
      {label}
      {spells.length > 1 ? ` (${spells.length})` : null}
    </h3>
  );

  if (!section.phases?.length) {
    return (
      <>
        {heading}
        <SpellList spells={spells} wowheadBranch={wowheadBranch} />
      </>
    );
  }

  // spells without a phase go last, under "Multiple"
  const phases = [...section.phases, undefined];

  return (
    <>
      {heading}
      {phases.map((phase, i) => {
        const phaseSpells = spells.filter((spell) => spell.phase === phase);

        if (phaseSpells.length === 0) {
          return null;
        }

        return (
          <Fragment key={phase ?? i}>
            <h4 id={`${anchor}-${phase ?? i}`} className={anchorScrollMargin}>
              {phase ?? 'Multiple'}
            </h4>
            <SpellList spells={phaseSpells} wowheadBranch={wowheadBranch} />
          </Fragment>
        );
      })}
    </>
  );
}

function DungeonPanel({
  data,
  dungeon,
  picks,
  wowheadBranch,
}: {
  data: SeasonalSpellsDataset;
  dungeon: Dungeon;
  picks: ReadonlySet<string>;
  wowheadBranch?: WowheadLinkProps['branch'];
}) {
  const { source } = dungeon;
  const sourceInfo = data.sources[source];

  const { sections, spellsBySection, total } = useMemo(() => {
    const groups: Record<string, SpellsProps['spells']> = {};

    for (const spell of dungeon.spells) {
      if (matchesFilters(spell, picks)) {
        (groups[spell.type] ??= []).push(spell);
      }
    }

    const sections = getSections(sourceInfo.encounters, groups);
    const spellsBySection = Object.fromEntries(
      sections.map((section) => [section.groupKey, groups[section.groupKey]])
    );
    const total = sections.reduce((sum, section) => sum + groups[section.groupKey].length, 0);

    return { sections, spellsBySection, total };
  }, [dungeon.spells, picks, sourceInfo.encounters]);

  return (
    <div>
      <h2 id={source} className={anchorScrollMargin}>
        <CustomLink href={`#${source}`}>
          <ContentHeaderLink />
        </CustomLink>
        <WowheadIcon icon={sourceInfo.icon}>{sourceInfo.name}</WowheadIcon> ({total})
      </h2>

      <p>Table of Contents</p>
      <ul>
        {sections.map((section) => (
          <li key={section.anchorSlug}>
            <a href={`#${source}-${section.anchorSlug}`}>
              {section.icon ? (
                <WowheadIcon icon={section.icon}>{section.label}</WowheadIcon>
              ) : (
                section.label
              )}
            </a>
          </li>
        ))}
      </ul>

      {sections.map((section) => (
        <SectionContent
          key={section.anchorSlug}
          section={section}
          source={source}
          spells={spellsBySection[section.groupKey]}
          wowheadBranch={wowheadBranch}
        />
      ))}
    </div>
  );
}

function updateUrl(update: (url: URL) => void, push: boolean) {
  const url = new URL(window.location.href);

  url.hash = '';
  update(url);
  // keeps `show=aoe,magic` readable instead of `show=aoe%2Cmagic`
  url.search = url.searchParams.toString().replaceAll('%2C', ',');

  if (push) {
    window.history.pushState({}, '', url);
  } else {
    window.history.replaceState({}, '', url);
  }
}

function FilterChip({
  kind,
  active,
  count,
  onClick,
}: {
  kind: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  const color = getSpellKindChipColor(kind);

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={clsx(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-0.5 text-sm focus-visible:outline-2 focus-visible:outline-teal-500',
        active
          ? ['font-bold text-gray-950 ring-1 ring-inset dark:text-white', color.active]
          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-100'
      )}
    >
      {color.dot ? <span className={clsx('size-2 rounded-full', color.dot)} /> : null}
      {kind === 'all' ? 'All' : getSpellKindLabel(kind)}
      <span className="text-gray-500 dark:text-gray-400">{count}</span>
    </button>
  );
}

function ChipDivider() {
  return <span aria-hidden="true" className="h-5 w-px bg-gray-300 dark:bg-gray-700" />;
}

export function SeasonalSpellsTabs({ data, wowheadBranch }: SeasonalSpellsTabsProps) {
  const dungeons = useMemo<Dungeon[]>(() => {
    const rotation = new Set(data['current-rotation']);
    const bySource = new Map<string, SpellsProps['spells']>();

    for (const spell of data.spells) {
      if (!rotation.has(spell.source)) {
        continue;
      }

      bySource.set(spell.source, [...(bySource.get(spell.source) ?? []), spell]);
    }

    return data['current-rotation']
      .filter((source) => bySource.has(source) && source in data.sources)
      .map((source) => {
        const spells = bySource.get(source) ?? [];
        return { source, spells, keys: getFilterKeys(spells) };
      });
  }, [data]);

  const [source, setSource] = useState(dungeons[0]?.source);
  const [picks, setPicks] = useState<ReadonlySet<string>>(() => new Set());
  const [panelHeight, setPanelHeight] = useState(0);

  const panelRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setPanelHeight(entry.borderBoxSize[0].blockSize);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const onRestore = useCallback(
    ({ by, show }: Partial<Record<(typeof searchParams)[number], string>>) => {
      if (by && dungeons.some((dungeon) => dungeon.source === by)) {
        setSource(by);
      }

      if (show !== undefined) {
        const known = new Set(dungeons.flatMap((dungeon) => dungeon.keys));
        setPicks(parseShowParam(show, known));
      }
    },
    [dungeons]
  );

  useRestoreSearchParams(searchParams, onRestore);

  // picks a dungeon has no chip for are ignored there, but stay picked for the others
  const effectivePicks = useMemo(
    () =>
      new Map(dungeons.map((dungeon) => [dungeon.source, getEffectivePicks(picks, dungeon.keys)])),
    [dungeons, picks]
  );

  const selectedIndex = Math.max(
    0,
    dungeons.findIndex((dungeon) => dungeon.source === source)
  );
  const selected = dungeons[selectedIndex];

  const onSelect = (next: string) => {
    updateUrl((url) => url.searchParams.set('by', next), true);
    setSource(next);
  };

  const onToggle = (key: string) => {
    const next = togglePick(picks, key);
    const value = serializePicks(next);

    updateUrl((url) => {
      if (value === null) {
        url.searchParams.delete('show');
      } else {
        url.searchParams.set('show', value);
      }
    }, false);
    setPicks(next);
  };

  const renderChips = (dungeon: Dungeon) => {
    const effective = effectivePicks.get(dungeon.source) ?? new Set<string>();
    const chip = (key: string) => (
      <FilterChip
        key={key}
        kind={key}
        active={key === 'all' ? effective.size === 0 : effective.has(key)}
        count={getChipCount(dungeon.spells, key)}
        onClick={() => onToggle(key)}
      />
    );
    const hasAoe = dungeon.keys.includes('aoe');
    const dispelTypes = dungeon.keys.filter((key) => key !== 'aoe');

    return (
      <>
        {chip('all')}
        {hasAoe ? (
          <>
            <ChipDivider />
            {chip('aoe')}
          </>
        ) : null}
        {dispelTypes.length > 0 ? (
          <>
            <ChipDivider />
            {dispelTypes.map(chip)}
          </>
        ) : null}
      </>
    );
  };

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={(index) => onSelect(dungeons[index].source)}
      className="w-full"
      style={{ '--spells-panel-height': `${panelHeight}px` } as CSSProperties}
    >
      <div
        ref={panelRef}
        className="not-prose sticky top-0 z-10 flex flex-col gap-3 rounded-md border border-gray-200 bg-white/90 p-3 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/90"
      >
        {selected ? (
          <div className="relative sm:hidden">
            <Image
              src={`https://wow.zamimg.com/images/wow/icons/medium/${data.sources[selected.source].icon}.jpg`}
              alt=""
              width="32"
              height="32"
              className="pointer-events-none absolute top-1/2 left-2 my-0 size-8 -translate-y-1/2 rounded-sm"
            />
            <select
              aria-label="Dungeon"
              value={selected.source}
              onChange={(event) => onSelect(event.target.value)}
              className="w-full cursor-pointer appearance-none rounded-md border border-teal-500 bg-teal-500/10 py-2 pr-10 pl-12 text-base leading-tight font-bold text-gray-950 ring-1 ring-teal-500 ring-inset focus-visible:outline-2 focus-visible:outline-teal-500 dark:bg-teal-950/60 dark:text-white"
            >
              {dungeons.map((dungeon) => (
                <option key={dungeon.source} value={dungeon.source}>
                  {data.sources[dungeon.source].name}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-gray-600 dark:text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : null}

        <TabList className="hidden w-full grid-cols-3 gap-1.5 sm:grid">
          {dungeons.map((dungeon) => {
            const sourceInfo = data.sources[dungeon.source];
            const active = dungeon.source === source;

            return (
              <Tab
                key={dungeon.source}
                className={clsx(
                  'group flex cursor-pointer items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-sm leading-tight focus-visible:outline-2 focus-visible:outline-teal-500',
                  active
                    ? 'border-teal-500 bg-teal-500/10 font-bold text-gray-950 ring-1 ring-teal-500 ring-inset dark:bg-teal-950/60 dark:text-white'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-100'
                )}
              >
                <Image
                  src={`https://wow.zamimg.com/images/wow/icons/medium/${sourceInfo.icon}.jpg`}
                  alt=""
                  width="24"
                  height="24"
                  className={clsx(
                    'my-0 size-6 shrink-0 rounded-sm transition',
                    !active &&
                      'opacity-75 grayscale-60 group-hover:opacity-100 group-hover:grayscale-0'
                  )}
                />
                {sourceInfo.name}
              </Tab>
            );
          })}
        </TabList>

        {selected ? (
          <div role="group" aria-label="Show" className="flex flex-wrap items-center gap-2">
            {renderChips(selected)}
          </div>
        ) : null}
      </div>

      <TabPanels>
        {dungeons.map((dungeon) => (
          <TabPanel key={dungeon.source}>
            <DungeonPanel
              data={data}
              dungeon={dungeon}
              picks={effectivePicks.get(dungeon.source) ?? new Set()}
              wowheadBranch={wowheadBranch}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
