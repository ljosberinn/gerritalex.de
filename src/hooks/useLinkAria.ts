import type { LinkProps } from "next/link";
import { useRouter } from "next/router";

export function useLinkAria({
  href,
  locale: targetLocale,
}: Pick<LinkProps, "href" | "locale">): "page" | undefined {
  const { pathname, locale: currentLocale } = useRouter();
  const isCurrentLocale = currentLocale === targetLocale;

  if (typeof href === "string") {
    return isCurrentLocale && pathname === href ? "page" : undefined;
  }

  return isCurrentLocale && pathname === href.pathname ? "page" : undefined;
}
