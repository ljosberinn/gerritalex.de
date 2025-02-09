import { Image } from './Image';

const specs = {
  scalecommander:
    'https://wow.zamimg.com/images/wow/TextureAtlas/live/talents-heroclass-evoker-scalecommander.webp',
  'augmentation-evoker': 'classicon_evoker_augmentation',
  'devastation-evoker': 'classicon_evoker_devastation',
  'vengeance-demon-hunter': 'ability_demonhunter_spectank',
};

export type WowheadSpecIconProps = {
  spec: keyof typeof specs;
  children: string;
};

export function WowheadSpecIcon({ spec, children }: WowheadSpecIconProps) {
  const icon = specs[spec];

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
      <span className="text-orange-700 dark:text-orange-400">{children}</span>
    </span>
  );
}
