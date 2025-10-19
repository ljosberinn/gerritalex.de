import { Image } from './Image';

const classes = {
  Warrior: 'classicon_warrior',
  Paladin: 'classicon_paladin',
  Hunter: 'classicon_hunter',
  Rogue: 'classicon_rogue',
  Priest: 'classicon_priest',
  DeathKnight: 'Spell_deathknight_classicon',
  Shaman: 'classicon_shaman',
  Mage: 'classicon_mage',
  Warlock: 'classicon_warlock',
  Monk: 'classicon_monk',
  Druid: 'classicon_druid',
  DemonHunter: 'classicon_demonhunter',
  Evoker: 'classicon_evoker',
};

export const classColors = {
  Warrior: '#C69B6D',
  Paladin: '#F48CBA',
  Hunter: '#AAD372',
  Rogue: '#FFF468',
  Priest: '#FFFFFF',
  DeathKnight: '#C41E3A',
  Shaman: '#0070DD',
  Mage: '#3FC7EB',
  Warlock: '#8788EE',
  Monk: '#00FF98',
  Druid: '#FF7C0A',
  DemonHunter: '#A330C9',
  Evoker: '#33937F',
};

export type WowheadClassIconProps = {
  children: string;
  plural?: boolean;
};

export function WowheadClassIcon({ children, plural }: WowheadClassIconProps) {
  const icon = classes[children];
  const color = classColors[children];
  const renderedIcon = (
    <Image
      src={
        icon.includes('https') ? icon : `https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`
      }
      alt=""
      width="24"
      height="24"
      className="mt-0 mb-0 self-center"
    />
  );

  return (
    <>
      <span
        className="inline-flex items-baseline gap-2 dark:hidden"
        style={{
          backgroundColor: `${color}75`,
        }}
      >
        {renderedIcon}
        {children}
        {plural ? 's' : ''}
      </span>

      <span className="hidden items-baseline gap-2 dark:inline-flex" style={{ color }}>
        {renderedIcon}
        {children}
        {plural ? 's' : ''}
      </span>
    </>
  );
}
