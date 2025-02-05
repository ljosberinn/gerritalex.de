import { CustomLink } from './CustomLink';
import { Image } from './Image';

type WowheadLinkProps = {
  id: number;
  kind: 'spell' | 'item' | 'npc' | 'achievement';
  icon: string;
  children: string;
};

export function WowheadLink({ id, icon, children, kind }: WowheadLinkProps) {
  return (
    <CustomLink
      href={`https://www.wowhead.com/${kind}=${id}`}
      className="inline-flex items-baseline gap-2"
    >
      {icon ? (
        <Image
          src={`https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`}
          alt=""
          width="24"
          height="24"
          className="mt-0 mb-0 self-center"
        />
      ) : null}
      {children}
    </CustomLink>
  );
}
