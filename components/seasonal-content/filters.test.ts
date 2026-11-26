import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getChipCount,
  getEffectivePicks,
  getFilterKeys,
  matchesFilters,
  parseShowParam,
  serializePicks,
  togglePick,
} from './filters.ts';

let nextId = 1;

function spell(fields: { aoe?: boolean; dispelType?: string }) {
  const id = nextId++;
  return { id, type: 'trash', source: 'kings-rest', name: `Spell ${id}`, icon: 'x', ...fields };
}

const times = (n: number, fields: { aoe?: boolean; dispelType?: string }) =>
  Array.from({ length: n }, () => spell(fields));

const spells = [
  ...times(3, { aoe: true }),
  ...times(2, { aoe: true, dispelType: 'magic' }),
  ...times(1, { dispelType: 'magic' }),
  ...times(1, { dispelType: 'poison' }),
  ...times(1, { aoe: true, dispelType: 'curse' }),
  ...times(2, {}),
];

const countMatching = (picks: string[]) =>
  spells.filter((s) => matchesFilters(s, new Set(picks))).length;

describe('getFilterKeys', () => {
  test('lists aoe first, then present dispel types by in-game order', () => {
    assert.deepEqual(getFilterKeys(spells), ['aoe', 'magic', 'poison', 'curse']);
  });

  test('omits aoe when no spell is aoe', () => {
    assert.deepEqual(getFilterKeys(times(1, { dispelType: 'enrage' })), ['enrage']);
  });
});

describe('matchesFilters', () => {
  test('aoe alone keeps every aoe spell', () => assert.equal(countMatching(['aoe']), 6));
  test('a dispel type alone keeps that type', () => assert.equal(countMatching(['magic']), 3));
  test('dispel types combine as either', () => assert.equal(countMatching(['magic', 'poison']), 4));
  test('aoe and a dispel type combine as either', () =>
    assert.equal(countMatching(['aoe', 'magic']), 7));
  test('aoe keeps a dispel type without aoe spells', () =>
    assert.equal(countMatching(['aoe', 'poison']), 7));
  test('no picks keeps everything', () => assert.equal(countMatching([]), 10));
});

describe('getChipCount', () => {
  test('counts the spells each chip shows on its own', () => {
    assert.equal(getChipCount(spells, 'all'), 10);
    assert.equal(getChipCount(spells, 'aoe'), 6);
    assert.equal(getChipCount(spells, 'magic'), 3);
    assert.equal(getChipCount(spells, 'poison'), 1);
    assert.equal(getChipCount(spells, 'curse'), 1);
  });
});

describe('getEffectivePicks', () => {
  test('ignores picks the dungeon has no chip for', () => {
    assert.deepEqual(
      getEffectivePicks(new Set(['curse', 'aoe']), ['aoe', 'magic']),
      new Set(['aoe'])
    );
  });

  test('falls back to no picks when none apply', () => {
    assert.deepEqual(getEffectivePicks(new Set(['curse', 'aoe']), ['magic']), new Set());
  });
});

describe('togglePick', () => {
  test('all clears every pick', () => {
    assert.deepEqual(togglePick(new Set(['aoe', 'magic']), 'all'), new Set());
  });

  test('removes a picked key', () => {
    assert.deepEqual(togglePick(new Set(['magic']), 'magic'), new Set());
  });

  test('adds an unpicked key without touching its input', () => {
    const picks = new Set(['magic']);

    assert.deepEqual(togglePick(picks, 'aoe'), new Set(['aoe', 'magic']));
    assert.deepEqual(picks, new Set(['magic']));
  });
});

describe('parseShowParam', () => {
  const known = new Set(['aoe', 'magic', 'poison']);

  test('restores an old single-value link', () => {
    assert.deepEqual(parseShowParam('magic', known), new Set(['magic']));
  });

  test('treats show=all as no picks', () => {
    assert.deepEqual(parseShowParam('all', known), new Set());
  });

  test('drops empty and unknown keys', () => {
    assert.deepEqual(parseShowParam('aoe,,bogus', known), new Set(['aoe']));
  });
});

describe('serializePicks', () => {
  test('writes keys in chip order', () => {
    assert.equal(serializePicks(new Set(['poison', 'aoe', 'magic'])), 'aoe,magic,poison');
  });

  test('returns null without picks', () => {
    assert.equal(serializePicks(new Set()), null);
  });
});
