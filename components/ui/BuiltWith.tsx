import siteMetadata from '@/data/siteMetadata';

import BrandIcon from '@/components/ui/BrandIcon';
import Link from '@/components/Link';

const BuiltWith = () => (
  <div className="flex items-center space-x-1">
    <span className="mr-1 text-gray-500 dark:text-gray-400">Built with</span>

    <div className="flex space-x-1.5">
      <Link href="https://nextjs.org">
        <BrandIcon type="NextJS" className="h-5 w-5" />
      </Link>
      <Link href="https://tailwindcss.com">
        <BrandIcon type="TailwindCSS" className="h-5 w-5" />
      </Link>
      <Link href="https://www.typescriptlang.org">
        <BrandIcon type="Typescript" className="h-5 w-5" />
      </Link>
    </div>
    <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
    <Link
      href={siteMetadata.siteRepo}
      className="text-gray-500 underline underline-offset-4 hover:text-primary-500 dark:text-gray-400 hover:dark:text-primary-500"
    >
      <span>View source</span>
    </Link>
  </div>
);

export default BuiltWith;
