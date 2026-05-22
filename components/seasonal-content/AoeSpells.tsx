import { Fragment } from 'react';
import { WowheadIcon } from '../WowheadIcon';
import { Spells, type SpellsProps } from './Spells';
import { CustomLink } from '../CustomLink';
import { ContentHeaderLink } from './ContentHeaderLink';
import { type WowheadLinkProps } from '../WowheadLink';
import zephyrMnS1 from '../../prebuild/zephyr-mn-s1.json';
import zephyrTwwS2 from '../../prebuild/zephyr-tww-s2.json';
import zephyrTwwS3 from '../../prebuild/zephyr-tww-s3.json';

const DATA_SOURCES = {
  'zephyr-mn-s1': zephyrMnS1,
  'zephyr-tww-s2': zephyrTwwS2,
  'zephyr-tww-s3': zephyrTwwS3,
};

type DataSourceKey = keyof typeof DATA_SOURCES;

type AoeSpellsProps = {
  dataSource: DataSourceKey;
  wowheadBranch?: WowheadLinkProps['branch'];
};

function slugify(str: string) {
  return str
    .replaceAll(' ', '-')
    .replaceAll("'", '')
    .replaceAll('.', '')
    .replaceAll(',', '')
    .toLowerCase();
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

          const encounterNames = sourceInfo.encounters.map((encounter) => {
            if (typeof encounter === 'string') {
              return encounter;
            }

            return encounter.name;
          });

          const encounterIconsByName = sourceInfo.encounters.reduce((acc, encounter) => {
            if (typeof encounter === 'string') {
              return acc;
            }

            acc[encounter.name] = encounter.icon;

            return acc;
          }, {});

          const encounterToSlugMap = sourceInfo.encounters.reduce<Record<string, string>>(
            (acc, encounter) => {
              const name = typeof encounter === 'string' ? encounter : encounter.name;
              acc[name] = slugify(name);

              return acc;
            },
            {
              Trash: 'trash',
            }
          );

          return (
            <li key={source}>
              <a href={`#${source}`}>
                <WowheadIcon icon={sourceInfo.icon}>{sourceInfo.name}</WowheadIcon>
              </a>
              <ul>
                {encounterNames
                  .concat('Trash')
                  .filter((encounter) => {
                    const slug = encounterToSlugMap[encounter];

                    return grouped[source][slug] !== undefined;
                  })
                  .map((encounter) => {
                    const slug = encounterToSlugMap[encounter];
                    const icon = encounterIconsByName[encounter];

                    return (
                      <li key={slug}>
                        <a href={`#${source}-${slug}`}>
                          {icon ? <WowheadIcon icon={icon}>{encounter}</WowheadIcon> : encounter}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
      {sources.map((source) => {
        const encounters: (string | { name: string; icon: string; phases?: string[] })[] =
          data.sources[source].encounters.concat('Trash');

        const encounterToSlugMap = encounters.reduce<Record<string, string>>((acc, encounter) => {
          const name = typeof encounter === 'string' ? encounter : encounter.name;
          acc[name] = slugify(name);

          return acc;
        }, {});

        const spellsByType = encounters.reduce<Record<string, SpellsProps['spells']>>(
          (acc, encounter) => {
            const name = typeof encounter === 'string' ? encounter : encounter.name;
            const slug = encounterToSlugMap[name];

            if (grouped[source][slug] === undefined) {
              return acc;
            }

            if (!(slug in acc)) {
              acc[slug] = [];
            }

            acc[slug].push(...grouped[source][slug]);

            return acc;
          },
          {}
        );

        const total = Object.values(spellsByType).reduce<number>((acc, spells) => {
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
            {encounters
              .filter((encounter) => {
                const slug =
                  encounterToSlugMap[typeof encounter === 'string' ? encounter : encounter.name];

                return grouped[source][slug] !== undefined;
              })
              .map((encounter) => {
                const slug =
                  encounterToSlugMap[typeof encounter === 'string' ? encounter : encounter.name];
                const spells = spellsByType[slug];

                const phases: (string | undefined)[] =
                  typeof encounter === 'string' ? [] : (encounter.phases ?? []);

                const link = (
                  <h3 id={`${source}-${slug}`}>
                    <CustomLink href={`#${source}-${slug}`}>
                      <ContentHeaderLink />
                    </CustomLink>
                    {typeof encounter === 'string' ? (
                      encounter
                    ) : (
                      <WowheadIcon icon={encounter.icon}>{encounter.name}</WowheadIcon>
                    )}
                    {spells.length > 1 ? ` (${spells.length})` : null}
                  </h3>
                );

                if (phases.length > 0) {
                  phases.push(undefined);

                  return (
                    <Fragment key={slug}>
                      {link}

                      {phases.map((phase, i) => {
                        const phaseSpells = spells.filter((spell) => spell?.phase === phase);

                        return (
                          <Fragment key={phase ?? i}>
                            <h4 id={`${source}-${slug}-${phase ?? i}`}>{phase ?? 'Multiple'}</h4>

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
                  <Fragment key={slug}>
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
