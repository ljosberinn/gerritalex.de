import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  as?: 'section' | 'div';
}

export function SectionContainer({ children, as: As = 'section' }: Props) {
  return <As className="mx-auto max-w-4xl xl:max-w-none xl:px-0">{children}</As>;
}
