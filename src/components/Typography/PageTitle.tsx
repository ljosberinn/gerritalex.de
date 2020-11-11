import type { WithChildren } from '@/types';

export function PageTitle({ children }: WithChildren): JSX.Element {
  return (
    <h1 className="text-3xl md:text-5xl font-bold text-theme-heading">
      {children}
    </h1>
  );
}
