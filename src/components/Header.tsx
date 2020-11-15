import PwaInstallIcon from '@/assets/icon-plus.svg';
import { gerritalex } from '@/blog/authors';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import Link from 'next/link';

import { InternalLink } from './InternalLink';
import { PageTitle } from './PageTitle';
import { ThemeToggle } from './ThemeToggle';

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <img
        className="monochrome-img h-5 inline-block mr-2"
        width="20"
        height="20"
        src="/monochrome/logo.svg"
        alt="logo"
        loading="lazy"
      />
      <strong className="text-lg text">{gerritalex.rawUrl}</strong>
    </div>
  );
}

export function Header(): JSX.Element {
  const { isReady, trigger } = usePwaInstall();

  return (
    <header className="py-6">
      <div className="pb-6">
        <div className="flex justify-between">
          <Link href="/">
            <a aria-label={`${gerritalex.name}'s personal site}`}>
              <Logo />
            </a>
          </Link>
          <div>
            <button
              type="button"
              style={{
                cursor: isReady ? 'auto' : 'none',
                opacity: isReady ? 1 : 0,
                transform: isReady
                  ? 'translateX(0) rotate(0deg)'
                  : 'translateX(-1rem) rotate(-270deg)',
                transition:
                  'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              }}
              className="self-center w-5 h-5 ml-2"
              onClick={() => {
                // eslint-disable-next-line no-console
                trigger().catch(console.error);
              }}
            >
              <img
                className="monochrome-img"
                src={PwaInstallIcon}
                alt="install PWA"
                loading="lazy"
              />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <nav>
        <div className="flex items-center">
          <img
            src={gerritalex.avatar}
            alt={gerritalex.name}
            className="rounded-full mr-4 w-16 h-16 md:w-24 md:h-24"
            loading="lazy"
          />
          <div>
            <PageTitle variant="h2">Hi, I'm {gerritalex.name}</PageTitle>
            <ul className="flex divide-x divide-orange-300">
              <li className="pr-2">
                <InternalLink href="/blog" className="font-medium">
                  Blog
                </InternalLink>
              </li>
              <li className="px-2">
                <InternalLink href="/music" className="font-medium">
                  Music Collection
                </InternalLink>
              </li>
              <li className="px-2">
                <InternalLink href="/concerts" className="font-medium">
                  Attended Concerts
                </InternalLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
