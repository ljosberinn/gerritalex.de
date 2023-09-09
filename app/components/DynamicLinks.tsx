import { useMatches } from "@remix-run/react";
import  { type AppData, type LinkDescriptor } from "@remix-run/server-runtime";

export type DynamicLinksFunction<Data extends AppData = AppData> = {
  (args: { data: Data }): LinkDescriptor[];
}

type DynamicLink = {
  rel: string;
  href: string;
}

export function DynamicLinks() {
  const links: DynamicLink[] = useMatches().flatMap((match) => {
    const fn = match.handle?.dynamicLinks;
    if (typeof fn !== "function") {return [];}
    return fn({ data: match.data });
  });

  return (
    <>
      {links.map((link) => (
        <link key={link.rel} rel={link.rel} href={link.href} />
      ))}
    </>
  );
}
