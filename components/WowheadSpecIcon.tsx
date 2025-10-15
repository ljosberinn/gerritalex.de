import { Image } from './Image';
import { classColors } from './WowheadClassIcon';

const specs = {
  diabolist:
    'https://wow.zamimg.com/images/wow/TextureAtlas/live/talents-heroclass-warlock-diabolist.webp',
  hellcaller:
    'https://wow.zamimg.com/images/wow/TextureAtlas/live/talents-heroclass-warlock-hellcaller.webp',
  scalecommander:
    'https://wow.zamimg.com/images/wow/TextureAtlas/live/talents-heroclass-evoker-scalecommander.webp',
  chronowarden:
    'https://wow.zamimg.com/images/wow/TextureAtlas/live/talents-heroclass-evoker-chronowarden.webp',
  'augmentation-evoker': 'classicon_evoker_augmentation',
  'devastation-evoker': 'classicon_evoker_devastation',
  'preservation-evoker': 'classicon_evoker_preservation',
  'vengeance-demon-hunter': 'ability_demonhunter_spectank',
  'destruction-warlock': 'spell_shadow_rainoffire',
  'affliction-warlock': 'spell_shadow_deathcoil',
  'subtlety-rogue': 'ability_stealth',
  'mistweaver-monk': 'spell_monk_mistweaver_spec',
  'shadow-priest': 'spell_shadow_shadowwordpain',
};

const colors = {
  diabolist: classColors.Warlock,
  hellcaller: classColors.Warlock,
  scalecommander: classColors.Evoker,
  chronowarden: classColors.Evoker,
  'augmentation-evoker': classColors.Evoker,
  'devastation-evoker': classColors.Evoker,
  'preservation-evoker': classColors.Evoker,
  'vengeance-demon-hunter': classColors.DemonHunter,
  'destruction-warlock': classColors.Warlock,
  'affliction-warlock': classColors.Warlock,
  'subtlety-rogue': classColors.Rogue,
  'mistweaver-monk': classColors.Monk,
  'shadow-priest': classColors.Priest,
};

export type WowheadSpecIconProps = {
  spec: keyof typeof specs;
  children: string | string[];
};

export function WowheadSpecIcon({ spec, children }: WowheadSpecIconProps) {
  const icon = specs[spec];
  const color = colors[spec];

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
        style={{ backgroundColor: `${color}75` }}
      >
        {renderedIcon}
        {children}
      </span>
      <span className="hidden items-baseline gap-2 dark:inline-flex" style={{ color }}>
        {renderedIcon}
        {children}
      </span>
    </>
  );
}
