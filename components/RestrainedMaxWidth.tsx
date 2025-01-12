import clsx from 'clsx';
import { type ReactNode } from 'react';

type RestrainedMaxWidthProps = {
  children: ReactNode;
  className?: string;
};

export default function RestrainedMaxWidth({ children, className }: RestrainedMaxWidthProps) {
  return <div className={clsx('mx-auto xl:max-w-7xl', className)}>{children}</div>;
}
