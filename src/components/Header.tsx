import Link from "next/link";

import { config } from "../config";
import { useLinkAria } from "../hooks/useLinkAria";
import type { WithChildren } from "./InternalLink";
import { InternalLink } from "./InternalLink";

export function Header(): JSX.Element {
  return (
    <header className="py-6">
      <nav>
        <div className="flex items-center">
          <Link href="/">
            <a>
              <img
                src={config.avatar}
                alt={config.name}
                className="rounded-full mr-4 w-16 h-16 md:w-24 md:h-24"
                height="96"
                width="96"
                loading="lazy"
              />
            </a>
          </Link>
          <div className="h-16 md:h-24 flex flex-col justify-between">
            <h2>Hi, I'm {config.name}</h2>
            <ul className="flex">
              <li>
                <NavLink href="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink href="/about">About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

type NavLinkProps = WithChildren<{
  href: string;
}>;

function NavLink({ href, children }: NavLinkProps) {
  const ariaCurrent = useLinkAria({
    href,
  });

  return (
    <InternalLink
      className="transition-colors duration-200 relative px-3 py-2"
      href={href}
    >
      {ariaCurrent && (
        <span className="rounded inset-0 absolute bg-green-800 opacity-50" />
      )}
      {ariaCurrent ? <span className="relative">{children}</span> : children}
    </InternalLink>
  );
}
