import React, { useEffect } from 'react';
import './assets/App.scss';

import {
  Header,
  Footer,
  Banner,
  Person,
  DynamicContent,
  CurriculumVitae
} from './components';

const name = 'Gerrit Alex';
const userName = 'ljosberinn';
const repoLink = `https://github.com/${userName}/gerritalex.de`;

const App = () => {
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
          <div className="col-lg-9 col-md-8 col-12 float-md-left pl-md-2">
            <div className="position-relative">
              <CurriculumVitae />
              <DynamicContent />
            </div>
          </div>
          <Person name={name} userName={userName} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
