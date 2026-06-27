import { Fragment } from 'react';
import { WowheadIcon } from '../WowheadIcon';
import { Spells, type SpellsProps } from './Spells';
import { CustomLink } from '../CustomLink';
import { ContentHeaderLink } from './ContentHeaderLink';
import { type WowheadLinkProps } from '../WowheadLink';
import zephyrMnS1 from '../../prebuild/zephyr-mn-s1.json';
import zephyrMnS2 from '../../prebuild/zephyr-mn-s2.json';
import zephyrTwwS2 from '../../prebuild/zephyr-tww-s2.json';
import zephyrTwwS3 from '../../prebuild/zephyr-tww-s3.json';

const DATA_SOURCES = {
  'zephyr-mn-s1': zephyrMnS1,
  'zephyr-mn-s2': zephyrMnS2,
  'zephyr-tww-s2': zephyrTwwS2,
  'zephyr-tww-s3': zephyrTwwS3,
};

type DataSourceKey = keyof typeof DATA_SOURCES;

type AoeSpellsProps = {
  dataSource: DataSourceKey;
  wowheadBranch?: WowheadLinkProps['branch'];
};

type Encounter = string | { name: string; icon: string; phases?: string[] };

type Section = {
  groupKey: string;
  anchorSlug: string;
  label: string;
  icon?: string;
  phases?: string[];
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

export function AoeSpells({ dataSource, wowheadBranch }: AoeSpellsProps) {
  const data = DATA_SOURCES[dataSource];
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

      // @ts-expect-error doesn't matter
      acc[spell.source][spell.type].push(spell);

      return acc;
    },
    {}
  );

  const sources = Object.keys(grouped);

  return (
    <div>
      <p>Table of Contents</p>
      <ul>
        {sources.map((source) => {
          const sourceInfo = data.sources[source];
          const sections = getSections(sourceInfo.encounters as Encounter[], grouped[source]);

          return (
            <li key={source}>
              <a href={`#${source}`}>
                <WowheadIcon icon={sourceInfo.icon}>{sourceInfo.name}</WowheadIcon>
              </a>
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
            </li>
          );
        })}
      </ul>
      {sources.map((source) => {
        const sections = getSections(
          data.sources[source].encounters as Encounter[],
          grouped[source]
        );

        const spellsBySection = sections.reduce<Record<string, SpellsProps['spells']>>(
          (acc, section) => {
            acc[section.groupKey] = grouped[source][section.groupKey].filter(
              (spell) => !spell.avoidable
            );

            return acc;
          },
          {}
        );

        const total = Object.values(spellsBySection).reduce<number>((acc, spells) => {
          return acc + spells.length;
        }, 0);

        return (
          <Fragment key={source}>
            <h2
              id={source}
              className="border-dashed border-gray-200 [&:not(:first-of-type)]:border-t-1 [&:not(:first-of-type)]:pt-8"
            >
              <CustomLink href={`#${source}`}>
                <ContentHeaderLink />
              </CustomLink>
              <WowheadIcon icon={data.sources[source].icon}>
                {data.sources[source].name}
              </WowheadIcon>{' '}
              ({total})
            </h2>
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
          </Fragment>
        );
      })}
    </div>
  );
}
