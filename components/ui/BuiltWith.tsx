import siteMetadata from 'data/siteMetadata';

import { BrandIcon } from 'components/ui/BrandIcon';
import { CustomLink } from 'components/CustomLink';

const BuiltWith = () => (
  <div className="flex items-center space-x-1">
    <span className="mr-1 text-gray-500 dark:text-gray-400">Built with</span>

    <div className="flex space-x-1.5">
      <CustomLink href="https://nextjs.org">
        <BrandIcon type="NextJS" className="h-5 w-5" />
      </CustomLink>
      <CustomLink href="https://tailwindcss.com">
        <BrandIcon type="TailwindCSS" className="h-5 w-5" />
      </CustomLink>
      <CustomLink href="https://www.typescriptlang.org">
        <BrandIcon type="Typescript" className="h-5 w-5" />
      </CustomLink>
    </div>
    <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
    <CustomLink
      href={siteMetadata.siteRepo}
      className="text-gray-500 underline underline-offset-4 hover:text-primary-500 dark:text-gray-400 hover:dark:text-primary-500"
    >
      <span>View source</span>
    </CustomLink>
  </div>
);

export default BuiltWith;
