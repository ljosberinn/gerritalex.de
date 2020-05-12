import React from 'react';

import '../i18n';
import {
  Header,
  Banner,
  LanguageChange,
  Navigation,
  Person,
  Footer,
} from '../components';

import '../assets/frameworks.css';
import '../assets/primer.css';
import '../assets/App.css';

const name = 'Gerrit Alex';
const userName = 'ljosberinn';
const repoLink = `//github.com/${userName}/gerritalex.de`;

export function reportWebVitals(metric) {
  // These metrics can be sent to any analytics service
  console.log(metric);
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header repoLink={repoLink} name={name} />
      <main className="application-main">
        <div className="container-xl clearfix px-3 mt-4">
          <Banner repoLink={repoLink} />
          <div className="reverse-col-mobile">
            <div className="col-lg-9 col-md-8 col-12 float-md-left pl-md-2">
              <LanguageChange />
              <Navigation />
              <div className="position-relative mt-4">
                <Component {...pageProps} />
              </div>
            </div>
            <Person name={name} userName={userName} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
