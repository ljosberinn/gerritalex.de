import NextImage, { type ImageProps } from 'next/image';

const basePath = process.env.BASE_PATH;

export function Image({ src, ...rest }: ImageProps) {
  return <NextImage src={`${basePath || ''}${src}`} {...rest} />;
}
