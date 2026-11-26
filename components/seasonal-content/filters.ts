import type { SpellsProps } from './Spells';

type Spell = SpellsProps['spells'][number];

export const dispelTypeOrder = ['magic', 'poison', 'curse', 'disease', 'bleed', 'enrage'];

function rank(key: string) {
  if (key === 'aoe') {
    return -1;
  }

  const index = dispelTypeOrder.indexOf(key);
  return index === -1 ? dispelTypeOrder.length : index;
}

function byRank(a: string, b: string) {
  return rank(a) - rank(b) || a.localeCompare(b);
}

export function getFilterKeys(spells: Spell[]): string[] {
  const keys = new Set<string>();

  for (const spell of spells) {
    if (spell.aoe) {
      keys.add('aoe');
    }

    if (spell.dispelType) {
      keys.add(spell.dispelType);
    }
  }

  return [...keys].sort(byRank);
}

export function matchesFilters(spell: Spell, picks: ReadonlySet<string>): boolean {
  if (picks.size === 0) {
    return true;
  }

  return (
    (picks.has('aoe') && spell.aoe === true) ||
    (spell.dispelType !== undefined && picks.has(spell.dispelType))
  );
}

export function getChipCount(spells: Spell[], key: string): number {
  if (key === 'all') {
    return spells.length;
  }

  const picks = new Set([key]);
  return spells.filter((spell) => matchesFilters(spell, picks)).length;
}

export function getEffectivePicks(
  picks: ReadonlySet<string>,
  keys: readonly string[]
): Set<string> {
  return new Set(keys.filter((key) => picks.has(key)));
}

export function togglePick(picks: ReadonlySet<string>, key: string): Set<string> {
  if (key === 'all') {
    return new Set();
  }

  const next = new Set(picks);

  if (!next.delete(key)) {
    next.add(key);
  }

  return next;
}

export function parseShowParam(value: string, known: ReadonlySet<string>): Set<string> {
  return new Set(value.split(',').filter((key) => known.has(key)));
}

export function serializePicks(picks: ReadonlySet<string>): string | null {
  return picks.size === 0 ? null : [...picks].sort(byRank).join(',');
}
