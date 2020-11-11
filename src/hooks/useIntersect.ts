import type { RefObject } from 'react';
import { useRef, useEffect, useCallback } from 'react';

const initialOptions = {
  root: null,
  rootMargin: '0px',
  threshold: [0.05, 0.3, 0.6, 0.95],
};

type Params = {
  onIntersect: () => void;
  onlyOnce?: boolean;
  optionsData?: typeof initialOptions;
};

export const useIntersect = <T extends HTMLElement>({
  onIntersect,
  onlyOnce = false,
  optionsData = initialOptions,
}: Params): RefObject<T> | null | undefined => {
  const intersected = useRef(false);
  const targetRef = useRef<T>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const options = optionsData || initialOptions;

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      const isIntersecting = entries[0]?.isIntersecting || false;

      if (isIntersecting) {
        onIntersect();

        if (!intersected.current && observer.current && onlyOnce) {
          observer.current.disconnect();
          observer.current = null;
          intersected.current = true;
        }
      }
    },
    [onIntersect, observer, intersected, onlyOnce],
  );

  useEffect(() => {
    if (!intersected.current && !observer.current && targetRef.current) {
      observer.current = new IntersectionObserver(handleIntersect, options);

      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [handleIntersect, options, targetRef]);

  return targetRef;
};
