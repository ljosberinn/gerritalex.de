import TOCInline from 'pliny/ui/TOCInline';
import Pre from 'pliny/ui/Pre';
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm';
import type { MDXComponents } from 'mdx/types';
import { Image } from './Image';
import { CustomLink } from './CustomLink';
import { TableWrapper } from './TableWrapper';
import { WowheadLink } from './WowheadLink';
import { WowheadIcon } from './WowheadIcon';
import { Auras } from './seasonal-content/Auras';
import { AoeSpells } from './seasonal-content/AoeSpells';
import { WowheadSpecIcon } from './WowheadSpecIcon';
import { WowheadClassIcon } from './WowheadClassIcon';
import * as WowheadLinks from './WowheadLinks';

export const components: MDXComponents = {
  Image,
  TOCInline,
  // @ts-expect-error
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  WowheadLink,
  WowheadIcon,
  Auras,
  AoeSpells,
  WowheadSpecIcon,
  WowheadClassIcon,
  ...Object.fromEntries(
    Object.entries(WowheadLinks).map(([key, Component]) => {
      return [
        key,
        (props) => {
          return (
            <>
              <Component {...props} />{' '}
            </>
          );
        },
      ];
    })
  ),
};
