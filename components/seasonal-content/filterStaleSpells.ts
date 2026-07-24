import { type SpellsProps } from './Spells';

type Spell = SpellsProps['spells'][number];

/** How far behind the most recent sighting a spell may lag before it is dropped. */
const MAX_AGE = 2 * 7 * 24 * 60 * 60 * 1000;

/**
 * Drops spells that have not been observed within two weeks of the most recent
 * sighting anywhere in `spells`.
 *
 * Spells without `lastSeen` are always kept, as is the entire set when nothing
 * in it has ever been seen - absence of crawl data is not evidence of removal.
 */
export function filterStaleSpells<T extends Spell>(spells: T[]): T[] {
  const latestSeen = spells.reduce((acc, spell) => {
    return spell.lastSeen ? Math.max(acc, new Date(spell.lastSeen).getTime()) : acc;
  }, 0);

  if (latestSeen === 0) {
    return spells;
  }

  return spells.filter((spell) => {
    if (!spell.lastSeen) {
      return true;
    }

    const filtered = latestSeen - new Date(spell.lastSeen).getTime() <= MAX_AGE;

    if (!filtered) {
      console.log(
        `Dropping ${spell.name} (https://wowhead.com/ptr/spell=${spell.id}) as it is stale.`
      );
    }

    return filtered;
  });
}
