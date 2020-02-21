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

const LandingPage = lazy(() =>
  import(/* webpackChunkName: "landing" */ './routes/Landing'),
);
const ConcertPage = lazy(() =>
  import(/* webpackChunkName: "concert" */ './routes/Concert'),
);
const MusicPage = lazy(() =>
  import(/* webpackChunkName: "music" */ './routes/Music/'),
);

const RedirectToHome = () => <Redirect to="/" />;

export default function App() {
  return (
    <Router>
      <Header repoLink={repoLink} name={name} />
      <main className="application-main">
        <div className="container-xl clearfix px-3 mt-4">
          <Banner repoLink={repoLink} />
          <div className="reverse-col-mobile">
            <div className="col-lg-9 col-md-8 col-12 float-md-left pl-md-2">
              <LanguageChange />
              <Navigation />
              <div className="position-relative mt-4">
                <Switch>
                  <Suspense fallback={null}>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/concerts" exact component={ConcertPage} />
                    <Route path="/music" exact component={MusicPage} />
                    {profiles.map(({ icon: path, url }) => (
                      <Route
                        path={`/${path}`}
                        exact
                        render={() => {
                          window.location.href = url;
                          return null;
                        }}
                        key={path}
                      />
                    ))}
                  </Suspense>
                  <Route component={RedirectToHome} />
                </Switch>
              </div>
            </div>
            <Person name={name} userName={userName} />
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}
