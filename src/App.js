import React from 'react';
import './assets/App.css';

import { Header } from './Header';
import { Person } from './Person';
import { DynamicContent } from './DynamicContent';
import { DynamicSubNav } from './DynamicSubNav';
import { CurriculumVitae } from './CurriculumVitae';

const ctaText = 'applying as JavaScript Developer';
const name = 'Gerrit Alex';
const userName = 'ljosberinn';

const App = () => (
  <>
    <Header />
    <div className="application-main">
      <main>
        <div className="container-xl clearfix px-3 mt-4">
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
  </>
);

export default App;
