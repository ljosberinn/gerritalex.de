import { useRouter } from "next/router";
import { useEffect } from "react";

const visitedCache = new Set<string>();

export function PageViewTracker(): null {
  const { pathname } = useRouter();

  useEffect(() => {
    const visited = visitedCache.has(pathname);

    if (!visited) {
      visitedCache.add(pathname);
      // eslint-disable-next-line no-console
      fetch(`/api/views?pathname=${pathname}`).catch(console.error);
    }
  }, [pathname]);

  return null;
}
