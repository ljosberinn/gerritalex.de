import { gerritalex } from '@/blog/authors';
import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultOgImage =
  'https://jackyef-og-img.vercel.app/Hi%2C%20I%20am%20**Jacky**!%20%20%F0%9F%91%8B.png?fontSize=150px';

type PageMetaTagsProps = {
  image?: string;
  title?: string;
  description?: string;
  publishDate?: string;
  readingTime?: string;
};

export function PageMetaTags({
  image = defaultOgImage,
  title = gerritalex.rawUrl,
  description = gerritalex.defaultDescription,
  publishDate = '',
  readingTime = '',
}: PageMetaTagsProps): JSX.Element {
  const { pathname } = useRouter();
  const url = `${gerritalex.domain}${pathname}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Facebook OG meta tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Meta Tags  */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={url} />
      <meta property="twitter:creator" content={gerritalex.twitter} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={url} />

      {publishDate ? (
        <>
          <meta name="twitter:label1" content="Published on" />
          <meta name="twitter:data1" content={publishDate} />
        </>
      ) : null}

      {readingTime ? (
        <>
          <meta name="twitter:label2" content="Reading Time" />
          <meta name="twitter:data2" content={readingTime} />
        </>
      ) : null}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "${title}",
          "image": ["${image}"],
          "datePublished": "${publishDate}",
          "dateModified": "${publishDate}",
          "author": {
            "@type": "Person",
            "@id": "https://twitter.com/${gerritalex.twitter}",
            "name": "${gerritalex.name}",
            "url": "https://twitter.com/${gerritalex.twitter}"
          },
          "publisher": {
              "@type": "Person",
              "@id": "https://twitter.com/${gerritalex.twitter}",
              "name": "${gerritalex.name}",
              "url": "https://twitter.com/${gerritalex.twitter}"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": ${gerritalex.domain}
          }
        }`,
        }}
      />
    </Head>
  );
}
