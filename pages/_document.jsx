import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <NextScript />
        </Head>
        <body>
          <Main />
        </body>
      </Html>
    );
  }
}
