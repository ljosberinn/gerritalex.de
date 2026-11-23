import clsx from 'clsx';
import type { ReactNode } from 'react';

const basePath = process.env.BASE_PATH;

type VideoProps = {
  src: string;
  // plays like a gif: starts on its own and hides the controls
  autoPlay?: boolean;
  label?: string;
  className?: string;
  children?: ReactNode;
};

export function Video({ src, autoPlay = false, label, className, children }: VideoProps) {
  return (
    <figure className={clsx('mx-auto flex flex-col items-center', className)}>
      <video
        src={`${basePath || ''}${src}`}
        aria-label={label}
        autoPlay={autoPlay}
        controls={!autoPlay}
        muted
        loop
        playsInline
        // metadata is enough for browsers to show the first frame instead of an empty box
        preload={autoPlay ? 'auto' : 'metadata'}
      />
      {children ? <figcaption className="text-center">{children}</figcaption> : null}
    </figure>
  );
}
