import { useRef, useEffect } from 'react';

export function useRestoreStateFromUrl(by: string, onChange: (by: string | null) => void) {
  const intialRenderRef = useRef(true);

  useEffect(
    function restoreStateFromUrl() {
      if (!intialRenderRef.current) {
        return;
      }

      intialRenderRef.current = false;
      // @ts-expect-error this is valid
      const url = new URL(location);

      if (!url.searchParams.has('by')) {
        return;
      }

      const storedBy = url.searchParams.get('by');

      if (storedBy === by) {
        return;
      }

      const hash = url.hash;

      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);

          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }, 350);
      }

      onChange(storedBy);
    },
    [by, onChange]
  );
}
