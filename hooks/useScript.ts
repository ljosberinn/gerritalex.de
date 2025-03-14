import { useEffect } from 'react';

export function useScript(src: string) {
  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`) !== null) {
      return;
    }

    const node = document.createElement('script');
    node.src = src;

    document.body.appendChild(node);
  }, [src]);
}
