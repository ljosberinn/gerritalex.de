import { type DetailedHTMLProps, type ImgHTMLAttributes } from 'react';

const basePath = process.env.BASE_PATH;

export function Image({
  src,
  ...rest
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img loading="lazy" src={`${basePath || ''}${src}`} {...rest} />
  );
}
