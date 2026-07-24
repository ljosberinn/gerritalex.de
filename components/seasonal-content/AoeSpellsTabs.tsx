'use client';

import { Fragment, useCallback, useMemo, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { WowheadIcon } from '../WowheadIcon';
import { CustomLink } from '../CustomLink';
import { ContentHeaderLink } from './ContentHeaderLink';
import { Spells, type SpellsProps } from './Spells';
import { filterStaleSpells } from './filterStaleSpells';
import { useRestoreStateFromUrl } from './useRestoreStateFromUrl';
import { type WowheadLinkProps } from '../WowheadLink';

type Encounter = string | { name: string; icon: string; phases?: string[] };

export type AoeSpellsDataset = {
  'current-rotation': string[];
  sources: Record<string, { icon: string; name: string; encounters: Encounter[] }>;
  spells: SpellsProps['spells'];
};

type AoeSpellsTabsProps = {
  data: AoeSpellsDataset;
  wowheadBranch?: WowheadLinkProps['branch'];
};

type Section = {
  groupKey: string;
  anchorSlug: string;
  label: string;
  icon?: string;
  phases?: string[];
};

/** One dungeon's fully filtered spells, ready to render in a single tab panel. */
type DungeonView = {
  source: string;
  sections: Section[];
  spellsBySection: Record<string, SpellsProps['spells']>;
  total: number;
};

function slugify(str: string) {
  return str
    .replaceAll(' ', '-')
    .replaceAll("'", '')
    .replaceAll('.', '')
    .replaceAll(',', '')
    .toLowerCase();
}

/** A trash group is only worth rendering once avoidable spells are filtered out. */
function hasVisibleSpells(spells: SpellsProps['spells'] | undefined) {
  return spells !== undefined && spells.some((spell) => !spell.avoidable);
}

function getSections(
  encounters: Encounter[],
  groups: Record<string, SpellsProps['spells']>
): Section[] {
  const sections: Section[] = [];

  for (const encounter of encounters) {
    const name = typeof encounter === 'string' ? encounter : encounter.name;
    const slug = slugify(name);
    const trashKey = `${slug}-trash`;

    if (hasVisibleSpells(groups[trashKey])) {
      sections.push({
        groupKey: trashKey,
        anchorSlug: trashKey,
        label: `Trash before ${name}`,
      });
    }

    if (groups[slug] !== undefined) {
      sections.push({
        groupKey: slug,
        anchorSlug: slug,
        label: name,
        icon: typeof encounter === 'string' ? undefined : encounter.icon,
        phases: typeof encounter === 'string' ? undefined : encounter.phases,
      });
    }
  }

  if (hasVisibleSpells(groups.trash)) {
    sections.push({ groupKey: 'trash', anchorSlug: 'trash', label: 'Trash' });
  }

  if (hasVisibleSpells(groups['trash-multiple-locations'])) {
    sections.push({
      groupKey: 'trash-multiple-locations',
      anchorSlug: 'trash-multiple-locations',
      label: 'Trash - Multiple Locations',
    });
  }

  return sections;
}

function Dungeon({
  data,
  view,
  wowheadBranch,
}: {
  data: AoeSpellsDataset;
  view: DungeonView;
  wowheadBranch?: WowheadLinkProps['branch'];
}) {
  const { source, sections, spellsBySection, total } = view;
  const sourceInfo = data.sources[source];

  return (
    <div>
      <h2 id={source}>
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

      {sections.map((section) => {
        const spells = spellsBySection[section.groupKey];

        const phases: (string | undefined)[] = section.phases ?? [];

        const link = (
          <h3 id={`${source}-${section.anchorSlug}`}>
            <CustomLink href={`#${source}-${section.anchorSlug}`}>
              <ContentHeaderLink />
            </CustomLink>
            {section.icon ? (
              <WowheadIcon icon={section.icon}>{section.label}</WowheadIcon>
            ) : (
              section.label
            )}
            {spells.length > 1 ? ` (${spells.length})` : null}
          </h3>
        );

        if (phases.length > 0) {
          phases.push(undefined);

          return (
            <Fragment key={section.anchorSlug}>
              {link}

              {phases.map((phase, i) => {
                const phaseSpells = spells.filter((spell) => spell?.phase === phase);

                return (
                  <Fragment key={phase ?? i}>
                    <h4 id={`${source}-${section.anchorSlug}-${phase ?? i}`}>
                      {phase ?? 'Multiple'}
                    </h4>

                    <Spells
                      wowheadBranch={wowheadBranch}
                      spells={phaseSpells.sort((a, b) => a.name.localeCompare(b.name))}
                    />
                  </Fragment>
                );
              })}
            </Fragment>
          );
        }

        return (
          <Fragment key={section.anchorSlug}>
            {link}

            <Spells
              wowheadBranch={wowheadBranch}
              spells={spells.sort((a, b) => a.name.localeCompare(b.name))}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

export function AoeSpellsTabs({ data, wowheadBranch }: AoeSpellsTabsProps) {
  const views = useMemo<DungeonView[]>(() => {
    const currentRotation = new Set(data['current-rotation']);
    const spells = data.spells.filter((spell) => currentRotation.has(spell.source));

    const grouped = spells.reduce<Record<string, Record<string, SpellsProps['spells']>>>(
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

    // tab order follows current-rotation, keeping only dungeons that have spells
    return data['current-rotation']
      .filter((source) => source in grouped)
      .map((source) => {
        const sections = getSections(data.sources[source].encounters, grouped[source]);

        // staleness is judged per dungeon so a rarely crawled one does not vanish entirely
        const stillSeen = new Set(
          filterStaleSpells(sections.flatMap((section) => grouped[source][section.groupKey]))
        );

        const spellsBySection = sections.reduce<Record<string, SpellsProps['spells']>>(
          (acc, section) => {
            acc[section.groupKey] = grouped[source][section.groupKey].filter((spell) => {
              return !spell.avoidable && stillSeen.has(spell);
            });

            return acc;
          },
          {}
        );

        const total = Object.values(spellsBySection).reduce<number>((acc, spells) => {
          return acc + spells.length;
        }, 0);

        return { source, sections, spellsBySection, total };
      });
  }, [data]);

  const [source, setSource] = useState(views[0]?.source);

  const onChange = useCallback(
    (by: string | null) => {
      if (by !== null && views.some((view) => view.source === by)) {
        setSource(by);
      }
    },
    [views]
  );

  useRestoreStateFromUrl(source, onChange);

  const selectedIndex = Math.max(
    0,
    views.findIndex((view) => view.source === source)
  );

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={(index) => {
        const next = views[index].source;

        // @ts-expect-error this is valid
        const url = new URL(location);

        url.hash = '';
        url.searchParams.set('by', next);
        window.history.pushState({}, '', url);

        setSource(next);
      }}
      className="w-full"
    >
      <TabList className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {views.map((view) => {
          const sourceInfo = data.sources[view.source];
          const active = view.source === source;

          return (
            <Tab
              key={view.source}
              className={`flex cursor-pointer items-center justify-center rounded-sm border-1 border-solid px-3 py-2 text-center text-sm leading-tight text-balance sm:text-base ${active ? 'bg-teal-500 font-bold dark:bg-teal-950' : 'hover:bg-teal-400 dark:hover:bg-teal-900'}`}
            >
              <WowheadIcon icon={sourceInfo.icon}>{sourceInfo.name}</WowheadIcon>
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        {views.map((view) => (
          <TabPanel key={view.source}>
            <Dungeon data={data} view={view} wowheadBranch={wowheadBranch} />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
