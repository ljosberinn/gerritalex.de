import type { WithChildren } from '@/types';

export function Paragraph({ children }: WithChildren): JSX.Element {
  return <p className="text-md text-theme-text md:text-lg mt-4">{children}</p>;
}
