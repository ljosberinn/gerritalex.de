import type { NextComponentType, NextPageContext } from "next";
import type { NextRouter } from "next/dist/next-server/lib/router/router";
import Head from "next/head";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageViewTracker } from "../components/PageViewTracker";
import "../tailwind.css";

type AppProps = {
  Component: NextComponentType<
    NextPageContext,
    Record<string, unknown>,
    Record<string, unknown>
  >;
  pageProps: Record<string, unknown>;
  router: NextRouter;
  err?: Error;
};

// eslint-disable-next-line import/no-default-export
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="next-head-bugfix" content="true" />
      </Head>
      <PageViewTracker />
      <div className="bg-yellow-600 h-2" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-6xl xl:px-0">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
