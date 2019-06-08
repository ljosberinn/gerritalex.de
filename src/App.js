import React from 'react';
import './assets/App.scss';

import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { Person } from './components/Person';
import { DynamicContent } from './components/DynamicContent';
import { DynamicSubNav } from './components/DynamicSubNav';
import { CurriculumVitae } from './components/CurriculumVitae';

const ctaText = 'applying as JavaScript Developer';
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
          <Person name={name} userName={userName} ctaText={ctaText} />
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
    <div
      className="footer container-lg width-full p-responsive"
      role="contentinfo"
    >
      <div className="position-relative d-flex flex-row-reverse flex-lg-row flex-wrap flex-lg-nowrap flex-justify-center flex-lg-justify-between pt-6 pb-2 mt-6 f6 text-gray border-top border-gray-light ">
        <ul className="list-style-none d-flex flex-wrap col-12 col-lg-5 flex-justify-center flex-lg-justify-between mb-2 mb-lg-0">
          <li className="mr-3 mr-lg-0">
            Design © 2019 GitHub, Inc., modifications by myself
          </li>
        </ul>
      </div>
      <div className="d-flex flex-justify-center pb-6">
        <span className="f6 text-gray-light" />
      </div>
    </div>
  </>
);

export default App;
