import type { WithChildren } from '@/types';

export function LineLoader({ children }: WithChildren): JSX.Element {
  return (
    <div className="inline-block animate-pulse bg-gray-400">{children}</div>
  );
}
