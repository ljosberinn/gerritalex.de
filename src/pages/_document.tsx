import Document, { Html, Head, Main, NextScript } from 'next/document';

const domainName = 'gerritalex.de';
export const publicUrl = `https://${domainName}`;

// eslint-disable-next-line import/no-default-export
export default function CustomDocument(): JSX.Element {
  return (
    <Html lang="en" dir="auto">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1D242C" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Used for webmention */}
        <link href="https://twitter.com/gerrit_alex" rel="me" />
        <link
          rel="webmention"
          href={`https://webmention.io/${domainName}/webmention`}
        />
        <link
          rel="pingback"
          href={`https://webmention.io/${domainName}/xmlrpc`}
        />

        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="apple-mobile-web-app-title" content="gerrit_alex" />
        <meta name="application-name" content="Gerrit Alex" />
      </Head>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: [
            // set initial theme
            `var __storedPerf = localStorage.getItem('theme') || '';`,

            `if (__storedPerf) {`,
            `document.documentElement.setAttribute('data-theme', __storedPerf);`,
            `}`,

            // setup listener to make it reactive
            `var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');`,
            `darkQuery.addListener(function(e) {`,
            `var __newTheme = e.matches ? 'dark' : 'default';`,
            `document.documentElement.setAttribute('data-theme', __newTheme);`,
            `typeof window.__themeBinding === 'function' && window.__themeBinding(__newTheme);`,
            `});`,
          ].join(''),
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// eslint-disable-next-line @typescript-eslint/unbound-method
CustomDocument.renderDocument = Document.renderDocument;
// eslint-disable-next-line @typescript-eslint/unbound-method
CustomDocument.getInitialProps = Document.getInitialProps;
