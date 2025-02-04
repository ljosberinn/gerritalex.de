import { CustomLink } from './CustomLink';
import { Image } from './Image';

type WowheadLinkProps = {
  id: number;
  kind: 'spell' | 'item' | 'npc' | 'achievement';
  icon: string;
  children: string;
  iconOnly?: boolean;
};

export function WowheadLink({ id, icon, children, kind, iconOnly }: WowheadLinkProps) {
  const iconJsx = icon ? (
    <Image
      src={`https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`}
      alt=""
      width="24"
      height="24"
      className="mt-0 mb-0 self-center"
    />
  ) : null;

  if (iconOnly) {
    return (
      <span className="inline-flex items-baseline gap-2">
        {iconJsx}
        {children}
      </span>
    );
  }

  return (
    <CustomLink
      href={`https://www.wowhead.com/${kind}=${id}`}
      className="inline-flex items-baseline gap-2"
    >
      {iconJsx}
      {children}
    </CustomLink>
  );
}
