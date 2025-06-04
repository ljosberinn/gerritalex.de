import { Image } from './Image';
import { classColors } from './WowheadClassIcon';

const specs = {
  diabolist:
    'https://wow.zamimg.com/images/wow/TextureAtlas/live/talents-heroclass-warlock-diabolist.webp',
  hellcaller:
    'https://wow.zamimg.com/images/wow/TextureAtlas/live/talents-heroclass-warlock-hellcaller.webp',
  scalecommander:
    'https://wow.zamimg.com/images/wow/TextureAtlas/live/talents-heroclass-evoker-scalecommander.webp',
  'augmentation-evoker': 'classicon_evoker_augmentation',
  'devastation-evoker': 'classicon_evoker_devastation',
  'vengeance-demon-hunter': 'ability_demonhunter_spectank',
  'destruction-warlock': 'spell_shadow_rainoffire',
  'subtlety-rogue': 'ability_stealth',
  'mistweaver-monk': 'spell_monk_mistweaver_spec',
  'shadow-priest': 'spell_shadow_shadowwordpain',
};

const colors = {
  diabolist: classColors.Warlock,
  hellcaller: classColors.Warlock,
  scalecommander: classColors.Evoker,
  'augmentation-evoker': classColors.Evoker,
  'devastation-evoker': classColors.Evoker,
  'vengeance-demon-hunter': classColors.DemonHunter,
  'destruction-warlock': classColors.Warlock,
  'subtlety-rogue': classColors.Rogue,
  'mistweaver-monk': classColors.Monk,
  'shadow-priest': classColors.Priest,
};

export type WowheadSpecIconProps = {
  spec: keyof typeof specs;
  className: string;
  children: string;
};

export function WowheadSpecIcon({ spec, className, children }: WowheadSpecIconProps) {
  const icon = specs[spec];
  const color = colors[spec];

  return (
    <span className="inline-flex items-baseline gap-2">
      <Image
        src={
          icon.includes('https')
            ? icon
            : `https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`
        }
        alt=""
        width="24"
        height="24"
        className="mt-0 mb-0 self-center"
      />
      <span style={{ color }}>{children}</span>
    </span>
  );
}
