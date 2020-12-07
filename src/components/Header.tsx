import Link from "next/link";

import { config } from "../config";
import { useLinkAria } from "../hooks/useLinkAria";
import { cs } from "../utils/classNames";
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
            <h1 className="text-2xl md:text-3xl">Hi, I'm {config.name}</h1>
            <ul className="flex space-x-1">
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
      className={cs(
        "px-3 py-2 relative transition-color rounded duration-200 ease-in",
        ariaCurrent
          ? "bg-gray-300 dark:bg-green-800"
          : "hover:bg-gray-300 dark:hover:bg-green-800"
      )}
      href={href}
    >
      <span className="absolute opacity-50" />
      <span className="relative">{children}</span>
    </InternalLink>
  );
}
