import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ReactNode } from "react";

import { a } from "../../customization";
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

const dashedObjAccessor = (str: string) => str.split(".").join("-");

export const defaultFontSize = "font-medium";
export const defaultColor = `text-${dashedObjAccessor(
  a.light
)} dark:text-${dashedObjAccessor(a.dark)}`;
export const defaultHoverColor = `hover:text-${dashedObjAccessor(
  a.hover.light
)} dark:hover:text-${dashedObjAccessor(a.hover.dark)}`;

export function InternalLink({
  href,
  locale,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  children,
  color = defaultColor,
  hoverColor = defaultHoverColor,
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
        className={cs(defaultFontSize, color, hoverColor, className)}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}
