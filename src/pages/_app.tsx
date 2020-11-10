import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { SectionContainer } from '@/components/SectionContainer';
import type { AppProps } from 'next/app';

import '@/styles/theme.css';
import '@/styles/tailwind.css';
import Head from 'next/head';

// eslint-disable-next-line import/no-default-export
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head> */}
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <Component {...pageProps} />
      </SectionContainer>
      <SectionContainer>
        <Footer />
      </SectionContainer>
    </>
  );
}
