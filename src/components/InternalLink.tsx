import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ReactNode } from "react";

import { useLinkAria } from "../hooks/useLinkAria";
import { cs } from "../utils/classNames";

export type WithChildren<Props = {}> = Props & {
  children: ReactNode;
};

type InternalLinkProps = WithChildren<Omit<LinkProps, "as">> & {
  color?: string;
  hoverColor?: string;
  className?: string;
};

export function InternalLink({
  href,
  locale,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  children,
  color = "text-orange-500 dark:text-yellow-500",
  hoverColor = "text-orange-600 dark:hover:text-yellow-600",
  className,
  ...rest
}: InternalLinkProps): JSX.Element {
  const linkProps = {
    href,
    locale,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
  };

  const ariaCurrent = useLinkAria({
    href,
    locale,
  });

  return (
    <Link {...linkProps}>
      <a
        aria-current={ariaCurrent}
        className={cs("font-medium", color, hoverColor, className)}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}
