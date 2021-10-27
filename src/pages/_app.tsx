import type { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import type { NextRouter } from "next/router";

import "../styles/global.css";
import { maxW } from "../styles/tokens";

export type AppRenderProps = {
  pageProps: Record<string, unknown>;
  err?: Error;
  Component: NextComponentType<
    NextPageContext,
    Record<string, unknown>,
    Record<string, unknown>
  >;
  router: NextRouter;
};

export default function App({
  Component,
  pageProps,
}: AppRenderProps): JSX.Element {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <header className={`border-b-2 border-white ${maxW}`}>
        <h1 className="text-2xl semibold">Fancy Headline</h1>
      </header>

      <main className={maxW}>
        <Component {...pageProps} />
      </main>

      <footer className={`border-t-2 border-white ${maxW}`}>
        <a href="/" className="underline">
          Index
        </a>{" "}
        |{" "}
        <a href="/imprint" className="underline">
          Imprint
        </a>
      </footer>
    </>
  );
}
