import { DetailedHTMLProps, Fragment, HTMLAttributes } from 'react';
import { WowheadIcon, WowheadIconProps } from '../WowheadIcon';
import { WowheadLinkProps, WowheadLink } from '../WowheadLink';
import { SpellBadge } from './SpellBadge';

export type SpellsProps = {
  wowheadBranch?: WowheadLinkProps['branch'];
  /** Shows `avoidable` as a badge next to the others instead of the older "(avoidable)" text. */
  badges?: boolean;
  spells: {
    id: number;
    type: string;
    source: string;
    name: string;
    icon: string;
    avoidable?: boolean;
    phase?: string;
    aoe?: boolean;
    dispelType?: string;
    interruptible?: boolean;
    notes?: (
      | string
      | [
          | string
          | { component: 'WowheadLink'; props: WowheadLinkProps; children: string }
          | { component: 'WowheadIcon'; props: WowheadIconProps; children: string }
          | { component: 'i'; props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> }
          | { component: 'b'; props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> },
        ]
    )[];
  }[];
};

export function Spells({ spells, wowheadBranch, badges = false }: SpellsProps) {
  const ordered = [
    ...spells.filter((spell) => !spell.avoidable),
    ...spells.filter((spell) => spell.avoidable),
  ];

  return (
    <ul>
      {ordered.map((spell) => {
        const kinds = [
          spell.aoe ? 'aoe' : null,
          spell.dispelType ?? null,
          spell.interruptible ? 'interruptible' : null,
          badges && spell.avoidable ? 'avoidable' : null,
        ].filter((kind) => kind !== null);

        return (
          <li
            key={spell.id}
            className={
              spell.avoidable ? 'opacity-50 transition-opacity hover:opacity-100' : undefined
            }
          >
            <WowheadLink branch={wowheadBranch} kind="spell" id={spell.id} icon={spell.icon}>
              {spell.name}
            </WowheadLink>
            {kinds.length > 0 ? (
              <span className="ml-2 inline-flex gap-1 align-middle">
                {kinds.map((kind) => (
                  <SpellBadge key={kind} kind={kind} />
                ))}
              </span>
            ) : null}
            {!badges && spell.avoidable ? (
              <span className="text-sm italic"> (avoidable)</span>
            ) : null}
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
                          const next = note[j + 1];

                          const comma =
                            j > 0 && typeof next !== 'string' && next?.component === 'WowheadLink';

                          return (
                            <Fragment key={j}>
                              {typeof notePart === 'string' ? (
                                notePart
                              ) : notePart.component === 'WowheadLink' ? (
                                <WowheadLink branch={wowheadBranch} {...notePart.props} />
                              ) : notePart.component === 'WowheadIcon' ? (
                                <WowheadIcon {...notePart.props} />
                              ) : notePart.component === 'b' ? (
                                <b {...notePart.props} />
                              ) : notePart.component === 'i' ? (
                                <i {...notePart.props} />
                              ) : null}
                              {comma ? ', ' : null}
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
