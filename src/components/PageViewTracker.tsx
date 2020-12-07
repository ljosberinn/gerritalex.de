import { useRouter } from "next/router";
import { useEffect } from "react";

const visitedCache = new Set<string>();

export function PageViewTracker(): null {
  const { asPath } = useRouter();

  useEffect(() => {
    const visited = visitedCache.has(asPath);

    if (!visited) {
      visitedCache.add(asPath);
      // eslint-disable-next-line no-console
      fetch(`/api/views?pathname=${asPath}`).catch(console.error);
    }
  }, [asPath]);

  return null;
}
