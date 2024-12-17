import 'css/tailwind.css';
import 'pliny/search/algolia.css';
import 'remark-github-blockquote-alert/alert.css';

import { Noto_Sans, Space_Grotesk } from 'next/font/google';
import { Analytics } from 'pliny/analytics';
import { SearchProvider } from 'pliny/search';
import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';
import Footer from '@/components/Footer';
import siteMetadata from '@/data/siteMetadata';
import { ThemeProviders } from './theme-providers';
import { Metadata } from 'next';

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || '';

  return (
    <html
      lang={siteMetadata.language}
      className={`${notoSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
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
      <body className="bg-white p-0.5 pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          {siteMetadata.analytics ? <Analytics analyticsConfig={siteMetadata.analytics} /> : null}
          <SectionContainer as="div">
            <div className="flex h-screen flex-col justify-between font-sans">
              {siteMetadata.search ? (
                <SearchProvider searchConfig={siteMetadata.search}>
                  <Header />
                  <main className="mb-auto">{children}</main>
                </SearchProvider>
              ) : null}
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
