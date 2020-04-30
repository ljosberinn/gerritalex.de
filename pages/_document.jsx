import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const description =
  'Personal website of Munich based Fullstack Web Software Engineer & Gerrit Alex. Mainly working with JavaScript, TypeScript, React, Next.js and Node.js.';
const mail = 'admin@gerritalex.de';
const url = '//gerritalex.de';
const keywords = [
  'web development',
  'javascript',
  'gerrit alex',
  'typescript',
  'fullstack',
  'software engineering',
];

const title = 'Gerrit Alex - Fullstack Web Software Engineer';

const img = '//avatars3.githubusercontent.com/u/29307652?s=400';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="canonical" href={url + '/'} />
          <meta name="robots" content="index,nofollow" />
          <link rel="me" href={`mailto:${mail}`} />
          <meta name="reply-to" content={mail} />
          <meta name="distribution" content="global" />
          <meta name="revisit-after" content="7 days" />
          <meta name="author" content="Gerrit Alex" />
          <meta name="description" content={description} />
          <meta itemprop="description" content={description} />
          <meta name="keywords" content={keywords.join(', ')} />

          <meta property="og:locale" content="de_DE" />
          <meta property="og:locale:alternate" content="en_EN" />

          <meta property="og:title" content={title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={img} />
          <meta property="og:description" content={description} />

          <meta name="twitter:image:src" content={img} />
          <meta name="twitter:site" content="@gerrit_alex" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={title} />

          <meta name="theme-color" content="#1e2327" />
          <meta
            name="google-site-verification"
            content="Vlh1Gz6viUFYfAKYfZuNPq6gD7ffi7TZL9bLkbi7jL0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
