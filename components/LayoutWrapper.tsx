import { Inter } from 'next/font/google';
import { Footer } from './Footer';
import { type ReactNode } from 'react';
import { Header } from './Header';

interface Props {
  children: ReactNode;
}

const inter = Inter({
  subsets: ['latin'],
});

export default function LayoutWrapper({ children }: Props) {
  return (
    <div className={`${inter.className} mx-auto flex h-screen flex-col justify-between font-sans`}>
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
}
