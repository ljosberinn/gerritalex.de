import spellData from '../prebuild/wowhead-spells.json';
import { spells, type SpellEntry } from './spells';
import { WowheadLink, type WowheadBranch } from './WowheadLink';

const data: Record<string, { name: string; icon: string | null }> = spellData;

type SpellProps = {
  id: number;
  // replaces the spell name, e.g. "current 4-set bonus"
  children?: string;
  // false hides the icon
  icon?: string | false;
  branch?: WowheadBranch;
  urlExtra?: string;
  abbreviated?: boolean;
  plural?: boolean;
};

export function Spell({ id, children, icon, branch, urlExtra, abbreviated, plural }: SpellProps) {
  const spell = data[id];
  const name = children ?? spell?.name;

  if (!name) {
    console.warn(`[Spell] ${id} is missing from prebuild/wowhead-spells.json, run \`npm run wowhead\``);
  }

  let label = name ?? `spell=${id}`;

  if (name && abbreviated) {
    label = name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  } else if (name && plural) {
    label = `${name}s`;
  }

  return (
    <WowheadLink
      kind="spell"
      id={id}
      branch={branch}
      urlExtra={urlExtra}
      icon={icon === false ? undefined : (icon ?? spell?.icon ?? undefined)}
    >
      {label}
    </WowheadLink>
  );
}

type SpellComponentProps = Omit<SpellProps, 'id' | 'icon'> & { variant?: string };

function createSpellComponent(key: string, entry: SpellEntry) {
  function SpellComponent({ variant, children, branch, ...props }: SpellComponentProps) {
    const id = variant ? entry.variants?.[variant] : entry.id;

    if (id === undefined) {
      throw new Error(`<${key} variant="${variant}" /> is not a known variant`);
    }

    return (
      <Spell id={id} icon={entry.icon} branch={branch ?? entry.branch} {...props}>
        {children ?? entry.name}
      </Spell>
    );
  }

  SpellComponent.displayName = key;

  return SpellComponent;
}

export const spellComponents = Object.fromEntries(
  Object.entries(spells).map(([key, entry]) => [key, createSpellComponent(key, entry)])
);
