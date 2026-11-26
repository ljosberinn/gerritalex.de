import { type SpellsProps } from './Spells';

export type Encounter = string | { name: string; icon: string; phases?: string[] };

export type Section = {
  groupKey: string;
  anchorSlug: string;
  label: string;
  icon?: string;
  phases?: string[];
};

// Must stay identical to `slugify` in seasonal-data-collection/slug.mjs, which writes the
// section slugs this matches against.
export function slugify(str: string) {
  return str
    .replaceAll(' / ', ' ')
    .replaceAll("'", '')
    .replaceAll('.', '')
    .replaceAll(',', '')
    .replaceAll(':', '')
    .replaceAll(' ', '-')
    .toLowerCase();
}

// avoidable spells stay visible (faded, listed last), so they keep a section alive too
function hasVisibleSpells(spells: SpellsProps['spells'] | undefined) {
  return spells !== undefined && spells.length > 0;
}

export function getSections(
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
