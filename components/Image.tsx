'use client';

import { useEffect, useState, type DetailedHTMLProps, type ImgHTMLAttributes } from 'react';

const basePath = process.env.BASE_PATH;

export function Image({
  src,
  ...rest
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  const [effectiveSrc, setSrc] = useState(`${basePath || ''}${src}`);

  useEffect(() => {
    const next = `${basePath || ''}${src}`;

    if (next !== effectiveSrc && !effectiveSrc.includes('placehold')) {
      setSrc(next);
    }
  }, [src, effectiveSrc]);

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      loading="lazy"
      src={effectiveSrc}
      onError={() => {
        if (rest.width && rest.height) {
          setSrc(
            `https://placehold.co/${rest.width}x${rest.height}/000000/FFF${rest.title ? `?text=${rest.title}` : ''}`
          );
        }
      }}
      {...rest}
    />
  );
}
