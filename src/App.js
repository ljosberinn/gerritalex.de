import React, { useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './assets/App.scss';
import {
  Header,
  Footer,
  Banner,
  Person,
  Navigation,
  LanguageChange
} from './components';

const name = 'Gerrit Alex';
const userName = 'ljosberinn';
const repoLink = `//github.com/${userName}/gerritalex.de`;

const Loader = () => null;

const LandingPage = lazy(() => import('./pages/LandingPage'));
const ConcertPage = lazy(() => import('./pages/ConcertPage'));
//const MusicPage = lazy(() => import('./pages/Other/MusicPage/'));

export default function App() {
  useEffect(() => {
    const verifyDataIntegrity = async () => {
      const response = await fetch(
        '//cdn.gerritalex.de/gerritalex.de/updater.php'
      );
      const { success, msg } = await response.json();

      if (success && msg === 'Update successful.') {
        // eslint-disable-next-line
        location.reload();
      }
    };

    verifyDataIntegrity();
  }, []);

  return (
    <>
      <Header repoLink={repoLink} name={name} />
      <main className="application-main">
        <div className="container-xl clearfix px-3 mt-4">
          <Banner repoLink={repoLink} />
          <div className="reverse-col-mobile">
            <div className="col-lg-9 col-md-8 col-12 float-md-left pl-md-2">
              <LanguageChange />
              <Router>
                <Navigation />

                <div className="position-relative mt-4">
                  <Suspense fallback={<Loader />}>
                    <Switch>
                      <Route path="/" exact component={LandingPage} />
                      <Route path="/concerts" exact component={ConcertPage} />
                      <Route render={() => <Redirect to="/" />} />
                    </Switch>
                  </Suspense>
                </div>
              </Router>
            </div>
            <Person name={name} userName={userName} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
