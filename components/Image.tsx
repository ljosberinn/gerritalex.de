import { type DetailedHTMLProps, type ImgHTMLAttributes } from 'react';

const basePath = process.env.BASE_PATH;

export function Image({
  src,
  ...rest
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  return <img loading="lazy" src={`${basePath || ''}${src}`} {...rest} />;
}
