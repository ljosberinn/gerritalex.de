import React from 'react';
import './assets/App.css';

import { Header } from './Header';
import { Person } from './Person';
import { DynamicContent } from './DynamicContent';

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
            <div
              className="UnderlineNav width-full user-profile-nav top-0"
              style={{ position: 'static' }}
            >
              <nav className="UnderlineNav-body" aria-label="User profile">
                <a
                  aria-current="page"
                  className="UnderlineNav-item mr-0 mr-md-1 mr-lg-3 selected"
                  href={`/${userName}`}
                >
                  Overview
                </a>
                <a
                  className="UnderlineNav-item mr-0 mr-md-1 mr-lg-3"
                  href={`/${userName}/repositories`}
                >
                  Repositories
                  <span className="Counter hide-lg hide-md hide-sm">28</span>
                </a>
                <a
                  className="UnderlineNav-item mr-0 mr-md-1 mr-lg-3"
                  href={`/${userName}/projects`}
                >
                  Projects
                  <span className="Counter hide-lg hide-md hide-sm">0</span>
                </a>
                <a
                  className="UnderlineNav-item mr-0 mr-md-1 mr-lg-3"
                  href={`/${userName}/stars`}
                >
                  Stars
                  <span className="Counter hide-lg hide-md hide-sm">19</span>
                </a>
                <a
                  className="UnderlineNav-item mr-0 mr-md-1 mr-lg-3"
                  href={`/${userName}/followers`}
                >
                  Followers
                  <span className="Counter hide-lg hide-md hide-sm">4</span>
                </a>
                <a
                  className="UnderlineNav-item mr-0 mr-md-1 mr-lg-3"
                  href={`/${userName}/following`}
                >
                  Following
                  <span className="Counter hide-lg hide-md hide-sm">10</span>
                </a>
              </nav>
            </div>

            <div className="position-relative">
              <DynamicContent userName={userName} />
            </div>
          </div>
        </div>
      </main>
    </div>
  </>
);

export default App;
