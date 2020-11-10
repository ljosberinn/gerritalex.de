import type { ReactNode } from 'react';

export type WithChildren<Props = {}> = Props & {
  children: ReactNode;
};
