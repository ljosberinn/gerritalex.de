import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  as?: 'section' | 'div';
}

export function SectionContainer({ children, as: As = 'section' }: Props) {
  return <As className="mx-auto">{children}</As>;
}
