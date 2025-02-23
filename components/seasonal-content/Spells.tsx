import { DetailedHTMLProps, Fragment, HTMLAttributes } from 'react';
import { WowheadIcon, WowheadIconProps } from '../WowheadIcon';
import { WowheadLinkProps, WowheadLink } from '../WowheadLink';

export function getWowheadBranch(): WowheadLinkProps['branch'] {
  if (new Date() >= new Date('2025-02-25T15:00:00Z')) {
    return;
  }

  return 'ptr-2';
}

export type SpellsProps = {
  spells: {
    id: number;
    type: string;
    source: string;
    name: string;
    icon: string;
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

export function Spells({ spells }: SpellsProps) {
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
