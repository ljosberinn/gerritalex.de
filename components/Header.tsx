import siteMetadata from 'data/siteMetadata';
import headerNavLinks from 'data/headerNavLinks';
import { CustomLink } from './CustomLink';
import { MobileNav } from './MobileNav';
import { ThemeSwitch } from './ThemeSwitch';
import { SearchButton } from './SearchButton';
import { Image } from './Image';

export function Header() {
  return (
    <header
      className={
        'mx-auto flex w-full max-w-4xl items-center justify-between bg-white px-4 py-10 xl:max-w-7xl dark:bg-gray-950'
      }
    >
      <div className="flex flex-row items-center">
        <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image
                loading="eager"
                src={siteMetadata.siteLogo}
                width="32"
                height="32"
                className="h-8"
                alt="logo"
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 h-full text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </CustomLink>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <CustomLink
                key={link.title}
                href={link.href}
                rel={link.href === '/about' ? 'me' : undefined}
                className="hover:text-primary-500 dark:hover:text-primary-400 block font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </CustomLink>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
