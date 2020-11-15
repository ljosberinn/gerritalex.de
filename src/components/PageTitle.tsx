import type { WithChildren } from '@/types';

export function PageTitle({
  children,
  variant: Variant = 'h1',
}: WithChildren<{ variant?: 'h1' | 'h2' }>): JSX.Element {
  return (
    <Variant className="text-3xl md:text-5xl font-bold text-theme-heading">
      {children}
    </Variant>
  );
}
