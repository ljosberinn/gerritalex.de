'use client';

import { Fragment } from 'react';
import { useScript } from '../../hooks/useScript';
import { WowheadIcon } from '../WowheadIcon';
import { Spells, SpellsProps } from './Spells';
import { CustomLink } from '../CustomLink';
import { ContentHeaderLink } from './ContentHeaderLink';

type ZephyrDataset = {
  sources: Record<
    string,
    { icon: string; name: string; encounters: string[] | { icon: string; name: string }[] }
  >;
  spells: SpellsProps['spells'];
  'current-rotation': string[];
};

type ZephyrProps = {
  data: ZephyrDataset;
};

function slugify(str: string) {
  return str
    .replaceAll(' ', '-')
    .replaceAll("'", '')
    .replaceAll('.', '')
    .replaceAll(',', '')
    .toLowerCase();
}

export function Zephyr({ data }: ZephyrProps) {
  useScript('https://wow.zamimg.com/js/tooltips.js');

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
        const encounters = data.sources[source].encounters.concat('Trash');

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

        const total = Object.values(spellsByType).reduce((acc, spells) => {
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
                const spells = spellsByType[slug].sort((a, b) => a.name.localeCompare(b.name));

                return (
                  <Fragment key={slug}>
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

                    <Spells spells={spells} />
                  </Fragment>
                );
              })}
          </Fragment>
        );
      })}
    </div>
  );
}
