import { useEffect, useRef } from 'react';

/**
 * Like `useRestoreStateFromUrl`, but for several search params at once so the hash is scrolled
 * to only once.
 */
export function useRestoreSearchParams<Key extends string>(
  keys: readonly Key[],
  onRestore: (params: Partial<Record<Key, string>>) => void
) {
  const initialRenderRef = useRef(true);

  useEffect(
    function restoreSearchParams() {
      if (!initialRenderRef.current) {
        return;
      }

      initialRenderRef.current = false;
      const url = new URL(window.location.href);
      const params: Partial<Record<Key, string>> = {};

      for (const key of keys) {
        const value = url.searchParams.get(key);

        if (value !== null) {
          params[key] = value;
        }
      }

      if (Object.keys(params).length === 0) {
        return;
      }

      if (url.hash) {
        // wait for the restored tab to render its anchors
        setTimeout(() => {
          document
            .getElementById(decodeURIComponent(url.hash.slice(1)))
            ?.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }

      onRestore(params);
    },
    [keys, onRestore]
  );
}
