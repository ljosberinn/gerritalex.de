import React from 'react';
import { ContributionChart } from './ContributionChart';
import { OcticonCheck } from './icons/OcticonCheck';

export const ContributionOverview = ({
  contributionAmount,
  contributionHistory
}) => (
  <div className="position-relative">
    <details className="details-reset details-overlay dropdown float-right mt-1">
      <summary
        className="pinned-items-setting-link muted-link"
        aria-haspopup="menu"
      >
        Contribution settings
        <div className="dropdown-caret" />
      </summary>

      <details-menu
        className="dropdown-menu dropdown-menu-sw contributions-setting-menu"
        role="menu"
      >
        <form
          className="edit_user"
          action="/users/ljosberinn/set_private_contributions_preference"
          acceptCharset="UTF-8"
          method="post"
        >
          <button
            name="user[show_private_contribution_count]"
            defaultValue="0"
            type="submit"
            className="dropdown-item ws-normal btn-link text-left pl-5"
            role="menuitem"
          >
            <OcticonCheck />
            <div className="text-bold">Private contributions</div>
            <span className="f6 mt-1">
              Turning off private contributions will show only public activity
              on your profile.
            </span>
          </button>
        </form>
        <div role="none" className="dropdown-divider" />
        <form
          className="edit_user"
          action="/users/ljosberinn/set_activity_overview_preference"
          acceptCharset="UTF-8"
          method="post"
        >
          <button
            type="submit"
            name="user[activity_overview_enabled]"
            defaultValue="0"
            className="dropdown-item ws-normal btn-link text-left pl-5"
            role="menuitem"
          >
            <OcticonCheck />
            <div className="d-flex flex-items-center text-bold">
              Activity overview
            </div>
            <span className="f6 mt-1">
              Turning off the activity overview will hide the section on your
              profile.
            </span>
          </button>
        </form>
      </details-menu>
    </details>
    <h2 className="f4 text-normal mb-2">
      {contributionAmount} contributions in the last year
    </h2>

    <div className="border border-gray-dark py-2 graph-before-activity-overview">
      <div className=" mx-3 d-flex flex-column flex-items-end overflow-hidden pt-1 is-graph-loading graph-canvas calendar-graph height-full text-center">
        <ContributionChart svg={contributionHistory} />
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
            <li style={{ backgroundColor: '#ebedf0' }} />
            <li style={{ backgroundColor: '#c6e48b' }} />
            <li style={{ backgroundColor: '#7bc96f' }} />
            <li style={{ backgroundColor: '#239a3b' }} />
            <li style={{ backgroundColor: '#196127' }} />
          </ul>
          More
        </div>
      </div>
    </div>
  </div>
);
