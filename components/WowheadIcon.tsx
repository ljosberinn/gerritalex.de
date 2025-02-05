import { Image } from './Image';

type WowheadIconProps = {
  icon: string;
  children: string;
};

export function WowheadIcon({ icon, children }: WowheadIconProps) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <Image
        src={`https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`}
        alt=""
        width="24"
        height="24"
        className="mt-0 mb-0 self-center"
      />
      {children}
    </span>
  );
}
