import type { WithChildren } from '@/types';

export function SectionTitle({ children }: WithChildren): JSX.Element {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-theme-heading">
      {children}
    </h2>
  );
}
