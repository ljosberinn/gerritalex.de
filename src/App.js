import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './assets/App.scss';
import {
  Header,
  Footer,
  Banner,
  Person,
  Navigation,
  LanguageChange,
} from './components';
import { profiles } from './components/Profiles';

const name = 'Gerrit Alex';
const userName = 'ljosberinn';
const repoLink = `//github.com/${userName}/gerritalex.de`;

const Loader = () => null;

const LandingPage = lazy(() =>
  import(/* webpackChunkName: "landingpage" */ './pages/LandingPage'),
);
const ConcertPage = lazy(() =>
  import(/* webpackChunkName: "concertpage" */ './pages/ConcertPage'),
);
//const MusicPage = lazy(() => import(/* webpackChunkName: "musicpage" */'./pages/Other/MusicPage/'));

export default function App() {
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
                      {profiles.map(({ icon: path, url }) => (
                        <Route
                          path={`/${path}`}
                          exact
                          render={() => (window.location.href = url)}
                        />
                      ))}
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
