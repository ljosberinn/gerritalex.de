import type { WithChildren } from '@/types';

export function SectionContainer({ children }: WithChildren): JSX.Element {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-3xl xl:px-0">
      {children}
    </div>
  );
}
