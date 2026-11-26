import type { MDXComponents } from 'mdx/types';
import { TOCInline } from './TOCInline';
import { Pre } from './Pre';
import { Image } from './Image';
import { CustomLink } from './CustomLink';
import { TableWrapper } from './TableWrapper';
import { WowheadLink } from './WowheadLink';
import { WowheadIcon } from './WowheadIcon';
import { Auras } from './seasonal-content/Auras';
import { AoeSpells } from './seasonal-content/AoeSpells';
import { SeasonalSpells } from './seasonal-content/SeasonalSpells';
import { WowheadSpecIcon } from './WowheadSpecIcon';
import { WowheadClassIcon } from './WowheadClassIcon';
import * as WowheadLinks from './WowheadLinks';
import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { PatchCadence } from './PatchCadence';
import { Spell, spellComponents } from './Spell';
import { Figure } from './Figure';
import { Video } from './Video';
import { Gallery } from './Gallery';

export const components: MDXComponents = {
  Image,
  Figure,
  Video,
  Gallery,
  TOCInline,
  a: CustomLink,
  h2: ({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={clsx(
        className,
        'sticky top-0 z-2 border-b-1 border-solid border-gray-500 bg-white py-1 dark:border-gray-200 dark:bg-gray-950'
      )}
      {...rest}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={clsx(
        className,
        'sticky top-10 z-1 border-b-1 border-double bg-white py-0.5 dark:border-white dark:bg-gray-950'
      )}
      {...rest}
    >
      {children}
    </h3>
  ),
  h4: ({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={clsx(className, 'border-b-1 border-dashed py-0.25 dark:border-white')} {...rest}>
      {children}
    </h4>
  ),
  pre: Pre,
  table: TableWrapper,
  WowheadLink,
  WowheadIcon,
  Auras,
  AoeSpells,
  SeasonalSpells,
  WowheadSpecIcon,
  WowheadClassIcon,
  Spell,
  ...spellComponents,
  ...WowheadLinks,
  PatchCadence,
};
