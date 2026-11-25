import 'css/tailwind.css';
import 'remark-github-blockquote-alert/alert.css';

import { Space_Grotesk } from 'next/font/google';
import { SearchProvider } from '../components/search/SearchProvider';
import { ThemeProviders } from './theme-providers';
import { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import siteMetadata from '../data/siteMetadata';

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const railClassName =
  'row-span-full row-start-1 hidden border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed 2xl:block';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const basePath = process.env.BASE_PATH || '';
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${basePath}/static/favicons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/static/favicons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/static/favicons/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
        {isDevelopment ? null : (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function () {
        window.counterscale = {
            q: [["set", "siteId", "gerritalex"], ["trackPageview"]],
        };
    })();`,
              }}
            />
            <script id="counterscale-script" defer src={siteMetadata.counterscale.trackerUrl} />
          </>
        )}
      </head>

      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <div className="flex h-screen flex-col justify-between font-sans [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
            <SearchProvider searchDocumentsPath={siteMetadata.search.searchDocumentsPath}>
              <Header />
              <div className="grid flex-1 grid-cols-1 grid-rows-[1fr] md:grid-cols-[1fr_min(96rem,100%)_1fr]">
                <div aria-hidden="true" className={`${railClassName} col-start-1`} />
                <main className="col-start-1 row-start-1 flex flex-col space-y-6 md:col-start-2">
                  {children}
                </main>
                <div aria-hidden="true" className={`${railClassName} col-start-3`} />
              </div>
            </SearchProvider>
            <Footer />
          </div>
        </ThemeProviders>
      </body>
    </html>
  );
}
