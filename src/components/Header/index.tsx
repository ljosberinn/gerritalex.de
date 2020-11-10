import { usePwaInstall } from '@/hooks/usePwaInstall';
import Link from 'next/link';

import { ThemeToggle } from '../Theme/ThemeToggle';
import { InternalLink } from '../Typography/InternalLink';
import PwaInstallIcon from './assets/icon-plus.svg';

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <img
        className="monochrome-img h-5 inline-block mr-2"
        width="20"
        height="20"
        src="/monochrome/logo.svg"
        alt="logo"
      />
      <strong className="text-lg text">gerritalex.de</strong>
    </div>
  );
}

export default function Header() {
  const { isReady, trigger } = usePwaInstall();

  return (
    <header className="flex justify-between items-center py-6">
      <div className="flex space-x-2">
        <Link href="/">
          <a aria-label="Gerrit Alex's personal site">
            <Logo />
          </a>
        </Link>
        <button
          style={{
            cursor: isReady ? 'auto' : 'none',
            opacity: isReady ? 1 : 0,
            transform: isReady
              ? 'translateX(0) rotate(0deg)'
              : 'translateX(-1rem) rotate(-270deg)',
            transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          }}
          className="self-center w-5 h-5"
          onClick={() => {
            trigger();
          }}
        >
          <img
            className="monochrome-img"
            src={PwaInstallIcon}
            alt="install PWA"
            loading="lazy"
          />
        </button>
      </div>
      <div className="text-base leading-5 flex items-center">
        <InternalLink
          href="/blog"
          className="font-medium text-theme-text hover:text-theme-text"
        >
          Blog
        </InternalLink>
        <ThemeToggle />
      </div>
    </header>
  );
}
