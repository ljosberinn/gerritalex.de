import React from 'react';

import { ContributionChart } from '.';

export default function ContributionOverview({ amount, history }) {
  return (
    <div className="position-relative">
      <h2 className="f4 text-normal mb-2">
        {amount} contributions in the last year
      </h2>

      <div className="border border-gray-dark py-2 graph-before-activity-overview">
        <div className="mx-3 d-flex flex-column flex-items-end overflow-hidden pt-1 is-graph-loading graph-canvas calendar-graph height-full text-center">
          <ContributionChart svg={history} />
        </div>
        <div className="contrib-footer clearfix mt-1 mx-3 px-3 pb-1">
          <div className="float-left text-gray">
            <a
              href="https://help.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn how we count contributions
            </a>
            .
          </div>
          <div
            className="contrib-legend text-gray"
            title="A summary of pull requests, issues opened, and commits to the default and gh-pages branches."
          >
            Less
            <ul className="legend">
              {['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'].map(
                (backgroundColor, key) => (
                  <li style={{ backgroundColor }} key={key} />
                )
              )}
            </ul>
            More
          </div>
        </div>
      </div>
    </div>
  );
}
