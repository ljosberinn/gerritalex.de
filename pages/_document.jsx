import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="canonical" href="https://gerritalex.de" />
          <meta name="description" content="Gerrit Alex - Fullstack Web Sotware Engineer, Munich. Working mainly with JavaScript, TypeScript, React, Next.js and Node.js." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
