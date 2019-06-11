import React from 'react';
import './assets/App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Banner } from './components/Banner';
import { Person } from './components/Person';
import { DynamicContent } from './components/DynamicContent';
import { DynamicSubNav } from './components/DynamicSubNav';
import { CurriculumVitae } from './components/CurriculumVitae';

const name = 'Gerrit Alex';
const userName = 'ljosberinn';
const repoLink = `https://github.com/${userName}/gerritalex.de`;

(async () => {
  const response = await fetch('https://dev.gerritalex.de/updater.php');
  const text = await response.text();

  if (text === 'Update successful.') {
    // eslint-disable-next-line
    location.reload();
  }
})();

const App = () => (
  <>
    <Header repoLink={repoLink} name={name} />
    <div className="application-main">
      <main>
        <div className="container-xl clearfix px-3 mt-4">
          <Banner repoLink={repoLink} />
          <Person name={name} userName={userName} />
          <div className="col-lg-9 col-md-8 col-12 float-md-left pl-md-2">
            <DynamicSubNav userName={userName} />
            <div className="position-relative">
              <CurriculumVitae />
              <DynamicContent userName={userName} />
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default App;
