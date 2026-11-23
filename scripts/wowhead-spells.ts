import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { spells, type SpellEntry } from '../components/spells.ts';

type SpellData = Record<string, { name: string; icon: string | null }>;

// ~40 MB, so only the spells referenced by components/spells.ts and `<Spell id={…}>` in posts are kept
const SOURCE = 'https://nether.wowhead.com/data/spell-names';
const OUTPUT = 'prebuild/wowhead-spells.json';
const POSTS = 'data/blog';

function log(...args: unknown[]) {
  console.log('[Wowhead]', ...args);
}

async function collectIds(): Promise<Set<number>> {
  const ids = new Set<number>();

  for (const entry of Object.values(spells as Record<string, SpellEntry>)) {
    ids.add(entry.id);

    for (const id of Object.values(entry.variants ?? {})) {
      ids.add(id);
    }
  }

  for (const file of await readdir(POSTS, { recursive: true })) {
    if (!file.endsWith('.mdx')) {
      continue;
    }

    const source = await readFile(join(POSTS, file), 'utf-8');

    for (const [, id] of source.matchAll(/<Spell\b[^>]*?\bid=\{(\d+)\}/g)) {
      ids.add(Number(id));
    }
  }

  return ids;
}

const previous: SpellData = await readFile(OUTPUT, 'utf-8')
  .then((file) => JSON.parse(file))
  .catch(() => ({}));

const ids = await collectIds();

let live: { id: number; name: string; icon: string | null }[];

try {
  const response = await fetch(SOURCE);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  live = await response.json();
} catch (error) {
  log(`fetching ${SOURCE} failed, keeping ${OUTPUT} as is`, error);
  process.exit(0);
}

const byId = new Map(live.map((spell) => [spell.id, spell]));
const result: SpellData = {};
const missing: number[] = [];

for (const id of [...ids].sort((a, b) => a - b)) {
  const spell = byId.get(id);

  if (spell) {
    result[id] = { name: spell.name, icon: spell.icon };
  } else if (previous[id]) {
    // removed spells drop out of the live data while older posts still link them
    result[id] = previous[id];
  } else {
    missing.push(id);
  }
}

await writeFile(OUTPUT, `${JSON.stringify(result, null, 2)}\n`);

log(`${Object.keys(result).length} spells written to ${OUTPUT}`);

if (missing.length > 0) {
  log(`not in live data, these need an explicit name and icon: ${missing.join(', ')}`);
}
