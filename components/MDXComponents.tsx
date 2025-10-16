import TOCInline from 'pliny/ui/TOCInline';
import Pre from 'pliny/ui/Pre';
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
import clsx from 'clsx';

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  h2: ({ children, className }) => (
    <h2
      className={clsx(
        className,
        'sticky top-0 border-b-1 border-dashed border-gray-500 bg-white py-1 dark:border-gray-200 dark:bg-gray-950'
      )}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className }) => (
    <h3
      className={clsx(
        className,
        'sticky top-10 border-t-1 border-b-1 border-dotted bg-white dark:border-white dark:bg-gray-950'
      )}
    >
      {children}
    </h3>
  ),
  pre: Pre,
  table: TableWrapper,
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
