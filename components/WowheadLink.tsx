import { CustomLink } from './CustomLink';
import { Image } from './Image';

type Achievement = {
  kind: 'achievement';
};

type Spell = {
  kind: 'spell';
  icon: string;
};

type Npc = {
  kind: 'npc';
};

type Item = {
  kind: 'item';
  icon: string;
  urlExtra?: string;
};

export type WowheadLinkProps = {
  id: number;
  children: string;
  branch?: 'ptr-2' | 'ptr' | 'classic';
} & (Achievement | Spell | Npc | Item);

export function WowheadLink({ id, children, kind, branch, ...props }: WowheadLinkProps) {
  const urlExtra = 'urlExtra' in props ? `?${props.urlExtra}` : '';

  return (
    <CustomLink
      href={`https://www.wowhead.com/${branch ? `${branch}/` : ''}${kind}=${id}${`${urlExtra}`}`}
      className="inline-flex items-baseline gap-2"
    >
      {'icon' in props ? (
        <Image
          src={`https://wow.zamimg.com/images/wow/icons/medium/${props.icon}.jpg`}
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
