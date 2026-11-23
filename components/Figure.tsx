import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Image } from './Image';

type FigureProps = {
  src: string;
  alt?: string;
  // set by remarkImgToJsx for local images
  width?: number;
  height?: number;
  className?: string;
  children?: ReactNode;
};

export function Figure({ src, alt = '', width, height, className, children }: FigureProps) {
  return (
    <figure className={clsx('mx-auto flex flex-col items-center', className)}>
      <Image src={src} alt={alt} width={width} height={height} />
      {children ? <figcaption className="text-center">{children}</figcaption> : null}
    </figure>
  );
}
