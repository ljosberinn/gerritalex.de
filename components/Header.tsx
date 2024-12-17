import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';

export default function Header() {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10';

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50';
  }

  return (
    <header className={headerClass}>
      <div className="flex flex-row items-center">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 sm:block">
              {siteMetadata.headerTitle}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
