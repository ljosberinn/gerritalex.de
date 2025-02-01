import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  as?: 'section' | 'div';
}

export default function SectionContainer({ children, as: As = 'section' }: Props) {
  return <As className="mx-auto max-w-3xl px-2 sm:px-6 xl:max-w-none xl:px-0">{children}</As>;
}
