import TOCInline from 'pliny/ui/TOCInline';
import Pre from 'pliny/ui/Pre';
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm';
import type { MDXComponents } from 'mdx/types';
import { Image } from './Image';
import { CustomLink } from './CustomLink';
import { TableWrapper } from './TableWrapper';
import { WowheadLink } from './WowheadLink';
import { WowheadIcon } from './WowheadIcon';
import { SeasonalAuraOverview } from './SeasonalAuraOverview';
import { WowheadSpecIcon } from './WowheadSpecIcon';

export const components: MDXComponents = {
  Image,
  TOCInline,
  // @ts-expect-error
  a: CustomLink,
  pre: Pre,
  // @ts-expect-error
  table: TableWrapper,
  BlogNewsletterForm,
  WowheadLink,
  WowheadIcon,
  SeasonalAuraOverview,
  WowheadSpecIcon,
};
