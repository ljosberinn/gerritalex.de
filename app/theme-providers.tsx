'use client';

import { ThemeProvider } from 'next-themes';
import siteMetadata from '@/data/siteMetadata';
import { type ReactNode } from 'react';

export function ThemeProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  );
}
