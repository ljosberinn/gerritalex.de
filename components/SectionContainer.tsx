import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  as?: 'section' | 'div';
}

export default function SectionContainer({ children, as: As = 'section' }: Props) {
  return <As className="mx-auto max-w-3xl px-1 sm:px-6 xl:max-w-5xl xl:px-0">{children}</As>;
}
