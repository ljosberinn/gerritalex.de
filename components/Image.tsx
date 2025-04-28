'use client';

import { useEffect, useState, type DetailedHTMLProps, type ImgHTMLAttributes } from 'react';

const basePath = process.env.BASE_PATH;

export function Image({
  src,
  ...rest
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  const [effectiveSrc, setSrc] = useState(`${basePath || ''}${src}`);

  useEffect(() => {
    setSrc(`${basePath || ''}${src}`);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      loading="lazy"
      src={effectiveSrc}
      onError={() => {
        console.log(1);
        if (rest.width && rest.height) {
          setSrc(
            `https://placehold.co/${rest.width}x${rest.height}${rest.title ? `?text=${rest.title}` : ''}`
          );
        }
      }}
      {...rest}
    />
  );
}
