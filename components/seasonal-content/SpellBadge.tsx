import clsx from 'clsx';

// approximations of the in-game debuff border colors
const colors: Record<string, string> = {
  aoe: 'border-teal-600 text-teal-700 dark:border-teal-400 dark:text-teal-300',
  magic: 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400',
  poison: 'border-green-600 text-green-700 dark:border-green-500 dark:text-green-400',
  curse: 'border-purple-600 text-purple-700 dark:border-purple-400 dark:text-purple-400',
  disease: 'border-amber-700 text-amber-800 dark:border-amber-500 dark:text-amber-500',
  bleed: 'border-red-600 text-red-700 dark:border-red-400 dark:text-red-400',
  enrage: 'border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400',
  interruptible: 'border-yellow-500 text-yellow-700 dark:border-yellow-400 dark:text-yellow-300',
};

// full class strings so Tailwind picks them up; same hues as `colors`, active state mirrors the
// selected dungeon card
const chipColors: Record<string, { dot: string; active: string }> = {
  all: {
    dot: '',
    active: 'border-teal-500 bg-teal-500/10 ring-teal-500 dark:bg-teal-950/60',
  },
  aoe: {
    dot: 'bg-teal-500',
    active: 'border-teal-500 bg-teal-500/10 ring-teal-500 dark:bg-teal-950/60',
  },
  magic: {
    dot: 'bg-blue-500',
    active: 'border-blue-500 bg-blue-500/10 ring-blue-500 dark:bg-blue-950/60',
  },
  poison: {
    dot: 'bg-green-500',
    active: 'border-green-500 bg-green-500/10 ring-green-500 dark:bg-green-950/60',
  },
  curse: {
    dot: 'bg-purple-500',
    active: 'border-purple-500 bg-purple-500/10 ring-purple-500 dark:bg-purple-950/60',
  },
  disease: {
    dot: 'bg-amber-600',
    active: 'border-amber-600 bg-amber-600/10 ring-amber-600 dark:bg-amber-950/60',
  },
  bleed: {
    dot: 'bg-red-500',
    active: 'border-red-500 bg-red-500/10 ring-red-500 dark:bg-red-950/60',
  },
  enrage: {
    dot: 'bg-orange-500',
    active: 'border-orange-500 bg-orange-500/10 ring-orange-500 dark:bg-orange-950/60',
  },
};

export function getSpellKindChipColor(kind: string) {
  return (
    chipColors[kind] ?? {
      dot: 'bg-gray-500',
      active: 'border-gray-500 bg-gray-500/10 ring-gray-500 dark:bg-gray-950/60',
    }
  );
}

export function getSpellKindLabel(kind: string) {
  return kind === 'aoe' ? 'AoE' : `${kind.slice(0, 1).toUpperCase()}${kind.slice(1)}`;
}

export function getSpellKindColor(kind: string) {
  return colors[kind] ?? 'border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-300';
}

export function SpellBadge({ kind }: { kind: string }) {
  return (
    <span
      className={clsx(
        'rounded-sm border-1 border-solid px-1 text-xs leading-tight font-medium',
        getSpellKindColor(kind)
      )}
    >
      {getSpellKindLabel(kind)}
    </span>
  );
}
