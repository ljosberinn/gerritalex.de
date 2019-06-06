import React from 'react';
import { OcticonRepo } from './icons/OcticonRepo';

export const ActivityOverview = ({ userName }) => (
  <div className="position-relative" id="user-activity-overview">
    <div className="Box mb-5 p-3 activity-overview-box border-top border-xl-top-0">
      <nav className="subnav mb-2 d-flex flex-wrap">
        <a
          style={{ maxWidth: '181px' }}
          className=" f6 py-1 pr-2 pl-1 rounded-1 mr-2 mb-2 subnav-item css-truncate css-truncate-target"
          href="/ljosberinn?tab=overview&amp;org=storeon"
        >
          <img
            className="avatar mr-1"
            alt=""
            height="20"
            width="20"
            src="https://avatars2.githubusercontent.com/u/50117058?s=60&amp;v=4"
          />
          @storeon
        </a>
        <a
          style={{ maxWidth: '181px' }}
          className="f6 py-1 pr-2 pl-1 rounded-1 mr-2 mb-2 subnav-item css-truncate css-truncate-target"
          href="/ljosberinn?tab=overview&amp;org=welldone-software"
        >
          <img
            className="avatar mr-1"
            alt=""
            height="20"
            width="20"
            src="https://avatars0.githubusercontent.com/u/1571470?s=60&amp;v=4"
          />
          @welldone-software
        </a>
      </nav>

      <div className="d-flex flex-column flex-lg-row">
        <div className="col-12 col-lg-6 d-flex flex-column pr-lg-5">
          <h5 className="mb-3 text-normal">Activity overview</h5>

          <div className="d-flex mb-2">
            <OcticonRepo />
            <div className="profile-break-word">
              Contributed to
              <a
                className="text-bold css-truncate css-truncate-target"
                style={{ maxWidth: '228px' }}
                href="/ljosberinn/AuctionCraftSniper"
              >
                {userName}/AuctionCraftSniper
              </a>
              ,
              <a
                className="text-bold css-truncate css-truncate-target"
                style={{ maxWidth: '228px' }}
                href="/ljosberinn/pdf-gen-final"
              >
                {userName}/pdf-gen-final
              </a>
              ,
              <a
                className="text-bold css-truncate css-truncate-target"
                style={{ maxWidth: '228px' }}
                href="/ljosberinn/wow-armory-lite-ts"
              >
                {userName}/wow-armory-lite-ts
              </a>
              <span className="no-wrap">and 5 other repositories</span>
            </div>
          </div>
        </div>

        <div className="pl-lg-3 col-6 border-lg-left">
          <svg
            className="mx-auto d-block"
            xmlns="http://www.w3.org/2000/svg"
            width="303"
            height="266"
          >
            <g transform="translate(-17.515625, -42.78125)">
              <path
                strokeLinejoin="round"
                fill="#7bc96f"
                stroke="#7bc96f"
                strokeWidth="7"
                d="M176.5,176.5 L183.7605337078652,176.5 L176.5,177.6260533707865 L80.28125,176.5 z"
              />
              <line
                strokeWidth="2"
                className=" activity-overview-axis"
                x1="76.28125"
                y1="176.5"
                x2="276.71875"
                y2="176.5"
              />
              <line
                strokeWidth="2"
                className=" activity-overview-axis"
                x1="176.5"
                y1="76.28125"
                x2="176.5"
                y2="276.71875"
              />

              <ellipse
                className="activity-overview-point"
                rx="3"
                ry="3"
                strokeWidth="2"
                fill="white"
                cx="185.7605337078652"
                cy="176.5"
              />
              <ellipse
                className="activity-overview-point"
                rx="3"
                ry="3"
                strokeWidth="2"
                fill="white"
                cx="176.5"
                cy="179.6260533707865"
              />
              <ellipse
                className="activity-overview-point"
                rx="3"
                ry="3"
                strokeWidth="2"
                fill="white"
                cx="78.28125"
                cy="176.5"
              />
              <text
                textAnchor="middle"
                className="activity-overview-percentage"
                dx="176.5"
                dy="52.28125"
              >
                &nbsp;
              </text>
              <text
                textAnchor="middle"
                className="text-small activity-overview-label"
                dx="176.5"
                dy="66.28125"
              >
                Code review
              </text>
              <text
                textAnchor="start"
                className="activity-overview-percentage"
                dy="174.25"
                dx="293.7890625"
              >
                10%
              </text>
              <text
                textAnchor="start"
                className="text-small activity-overview-label"
                dy="188.25"
                dx="286.71875"
              >
                Issues
              </text>
              <text
                textAnchor="middle"
                className="activity-overview-percentage"
                dx="176.5"
                dy="292.21875"
              >
                1%
              </text>
              <text
                textAnchor="middle"
                className="text-small activity-overview-label"
                dx="176.5"
                dy="306.21875"
              >
                Pull requests
              </text>
              <text
                textAnchor="end"
                className="activity-overview-percentage"
                dy="174.25"
                dx="51.0625"
              >
                89%
              </text>
              <text
                textAnchor="end"
                className="text-small activity-overview-label"
                dy="188.25"
                dx="64.28125"
              >
                Commits
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
);
