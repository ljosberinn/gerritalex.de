import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import { config } from "../config";

const [, rawDomainName] = config.domain.split("//");

// eslint-disable-next-line import/no-default-export
export default function Document(): JSX.Element {
  return (
    <Html
      lang="en"
      dir="auto"
      className="antialiased bg-gray-100 dark:bg-coolgray-900 text-gray-500 dark:text-coolgray-200"
    >
      <Head>
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
        <link
          href={`https://twitter.com/${config.twitter.slice(1)}`}
          rel="me"
        />
        <link
          rel="webmention"
          href={`https://webmention.io/${rawDomainName}/webmention`}
        />
        <link
          rel="pingback"
          href={`https://webmention.io/${rawDomainName}/xmlrpc`}
        />

        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// eslint-disable-next-line @typescript-eslint/unbound-method
Document.renderDocument = NextDocument.renderDocument;
// eslint-disable-next-line @typescript-eslint/unbound-method
Document.getInitialProps = NextDocument.getInitialProps;
