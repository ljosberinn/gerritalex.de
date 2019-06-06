import React from 'react';
import './assets/App.css';

import { Header } from './Header';
import { Person } from './Person';
import { OcticonStars } from './icons/OcticonStars';
import { OcticonFork } from './icons/OcticonFork';
import { OcticonGrabber } from './icons/OcticonGrabber';
import { DynamicActivityContent } from './DynamicActivityContent';

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
              className="UnderlineNav width-full user-profile-nav top-0 is-placeholder"
              style={{
                visibility: 'hidden',
                display: 'none',
                height: '56px'
              }}
            />
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
              <div className="mt-4">
                <details
                  className="details-reset details-overlay details-overlay-dark"
                  id="choose-pinned-repositories"
                >
                  <summary
                    className="btn-link muted-link float-right mt-1 pinned-items-setting-link"
                    role="button"
                  >
                    Customize your pins
                  </summary>
                  <details-dialog
                    className="anim-fade-in fast Box Box--overlay d-flex flex-column"
                    src={`/users/${userName}/pinned_items_modal`}
                    role="dialog"
                    aria-modal="true"
                  >
                    <include-fragment
                      className="octocat-spinner my-3"
                      aria-label="Loading..."
                    />
                  </details-dialog>
                </details>
                <h2 className="f4 mb-2 text-normal">
                  Pinned
                  <img
                    src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif"
                    width="13"
                    alt=""
                    className="spinner pinned-items-spinner"
                  />
                  <span
                    className="ml-2 text-gray f6"
                    role="status"
                    aria-live="polite"
                    data-error-text="Something went wrong."
                    data-success-text="Order updated."
                  />
                </h2>

                <form
                  id="user-29307652-pinned-items-reorder-form"
                  action={`/users/${userName}/reorder_pinned_items`}
                  acceptCharset="UTF-8"
                  method="post"
                >
                  <ol className="pinned-items-list mb-4">
                    <li className="pinned-item-list-item d-flex p-3 border border-gray-dark rounded-1 public source reorderable sortable-button-item">
                      <div className="pinned-item-list-item-content">
                        <div className="d-flex width-full flex-items-center position-relative">
                          <svg
                            className="octicon octicon-repo mr-2 text-gray"
                            viewBox="0 0 12 16"
                            version="1.1"
                            width="12"
                            height="16"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                            />
                          </svg>
                          <a
                            href="/ljosberinn/AuctionCraftSniper"
                            className="text-bold flex-auto"
                          >
                            <span className="repo" title="AuctionCraftSniper">
                              AuctionCraftSniper
                            </span>
                          </a>

                          <span
                            className="pinned-item-handle"
                            title="Drag to reorder"
                          >
                            <OcticonGrabber />
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm show-on-focus sortable-button"
                            data-direction="up"
                          >
                            <svg
                              aria-label="Move AuctionCraftSniper up"
                              className="octicon octicon-chevron-up"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm show-on-focus sortable-button"
                            data-direction="down"
                          >
                            <svg
                              aria-label="Move AuctionCraftSniper down"
                              className="octicon octicon-chevron-down"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"
                              />
                            </svg>
                          </button>
                        </div>

                        <p className="pinned-item-desc text-gray text-small d-block mt-2 mb-3">
                          [Website] on-demand near-real time information about
                          profession-related auction house prices for World of
                          Warcraft
                        </p>

                        <p className="mb-0 f6 text-gray">
                          <span className="d-inline-block mr-3">
                            <span
                              className="repo-language-color"
                              style={{ backgroundColor: '#2b7489' }}
                            />
                            <span itemProp="programmingLanguage">
                              TypeScript
                            </span>
                          </span>

                          <a
                            href="/ljosberinn/AuctionCraftSniper/stargazers"
                            className="pinned-item-meta muted-link"
                          >
                            <OcticonStars />8
                          </a>
                        </p>
                      </div>
                    </li>

                    <li className="pinned-item-list-item d-flex p-3 border border-gray-dark rounded-1 public source reorderable sortable-button-item">
                      <div className="pinned-item-list-item-content">
                        <div className="d-flex width-full flex-items-center position-relative">
                          <svg
                            className="octicon octicon-repo mr-2 text-gray"
                            viewBox="0 0 12 16"
                            version="1.1"
                            width="12"
                            height="16"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                            />
                          </svg>
                          <a
                            href="/ljosberinn/resources-helper"
                            className="text-bold flex-auto"
                          >
                            <span className="repo" title="resources-helper">
                              resources-helper
                            </span>
                          </a>

                          <span
                            className="pinned-item-handle pl-2"
                            title="Drag to reorder"
                          >
                            <OcticonGrabber />
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm show-on-focus sortable-button right-0"
                            data-direction="up"
                          >
                            <svg
                              aria-label="Move resources-helper up"
                              className="octicon octicon-chevron-up"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm show-on-focus sortable-button right-0"
                            data-direction="down"
                          >
                            <svg
                              aria-label="Move resources-helper down"
                              className="octicon octicon-chevron-down"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"
                              />
                            </svg>
                          </button>
                        </div>

                        <p className="pinned-item-desc text-gray text-small d-block mt-2 mb-3">
                          [Website] your go-to calculator for Resources mobile
                          GPS real-time economy simulation
                        </p>

                        <p className="mb-0 f6 text-gray">
                          <span className="d-inline-block mr-3">
                            <span
                              className="repo-language-color"
                              style={{ backgroundColor: '#f1e05a' }}
                            />
                            <span itemProp="programmingLanguage">
                              JavaScript
                            </span>
                          </span>

                          <a
                            href="/ljosberinn/resources-helper/stargazers"
                            className="pinned-item-meta muted-link"
                          >
                            <OcticonStars />4
                          </a>
                          <a
                            href="/ljosberinn/resources-helper/network/members"
                            className="pinned-item-meta muted-link"
                          >
                            <svg
                              aria-label="fork"
                              className="octicon octicon-repo-forked"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
                              />
                            </svg>
                            1
                          </a>
                        </p>
                      </div>
                    </li>

                    <li className="pinned-item-list-item d-flex p-3 border border-gray-dark rounded-1 public source reorderable sortable-button-item">
                      <div className="pinned-item-list-item-content">
                        <div className="d-flex width-full flex-items-center position-relative">
                          <svg
                            className="octicon octicon-repo mr-2 text-gray"
                            viewBox="0 0 12 16"
                            version="1.1"
                            width="12"
                            height="16"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                            />
                          </svg>
                          <a
                            href="/ljosberinn/Wahlorientierungshilfe"
                            className="text-bold flex-auto"
                          >
                            <span
                              className="repo"
                              title="Wahlorientierungshilfe"
                            >
                              Wahlorientierungshilfe
                            </span>
                          </a>

                          <span
                            className="pinned-item-handle pl-2"
                            title="Drag to reorder"
                          >
                            <OcticonGrabber />
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm show-on-focus sortable-button right-0"
                            data-direction="up"
                          >
                            <svg
                              aria-label="Move Wahlorientierungshilfe up"
                              className="octicon octicon-chevron-up"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm show-on-focus sortable-button right-0"
                            data-direction="down"
                          >
                            <svg
                              aria-label="Move Wahlorientierungshilfe down"
                              className="octicon octicon-chevron-down"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"
                              />
                            </svg>
                          </button>
                        </div>

                        <p className="pinned-item-desc text-gray text-small d-block mt-2 mb-3">
                          [Website] Eine neutrale und transparente
                          Wahlorientierungshilfe, basierend auf anonymisierten
                          Direktzitaten aus allen Wahlprogrammen.
                        </p>

                        <p className="mb-0 f6 text-gray">
                          <span className="d-inline-block mr-3">
                            <span
                              className="repo-language-color"
                              style={{ backgroundColor: '#4f5d95' }}
                            />
                            <span itemProp="programmingLanguage">PHP</span>
                          </span>

                          <a
                            href="/ljosberinn/Wahlorientierungshilfe/stargazers"
                            className="pinned-item-meta muted-link"
                          >
                            <OcticonStars />1
                          </a>
                          <a
                            href="/ljosberinn/Wahlorientierungshilfe/network/members"
                            className="pinned-item-meta muted-link"
                          >
                            <OcticonFork />1
                          </a>
                        </p>
                      </div>
                    </li>

                    <li className="pinned-item-list-item d-flex p-3 border border-gray-dark rounded-1 public source reorderable sortable-button-item">
                      <div className="pinned-item-list-item-content">
                        <div className="d-flex width-full flex-items-center position-relative">
                          <svg
                            className="octicon octicon-repo mr-2 text-gray"
                            viewBox="0 0 12 16"
                            version="1.1"
                            width="12"
                            height="16"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                            />
                          </svg>
                          <a
                            href="/ljosberinn/github-one-dark-vivid"
                            className="text-bold flex-auto"
                          >
                            <span
                              className="repo"
                              title="github-one-dark-vivid"
                            >
                              github-one-dark-vivid
                            </span>
                          </a>

                          <span
                            className="pinned-item-handle pl-2"
                            title="Drag to reorder"
                          >
                            <OcticonGrabber />
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm show-on-focus sortable-button right-0"
                            data-direction="up"
                          >
                            <svg
                              aria-label="Move github-one-dark-vivid up"
                              className="octicon octicon-chevron-up"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm show-on-focus sortable-button right-0"
                            data-direction="down"
                          >
                            <svg
                              aria-label="Move github-one-dark-vivid down"
                              className="octicon octicon-chevron-down"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"
                              />
                            </svg>
                          </button>
                        </div>

                        <p className="pinned-item-desc text-gray text-small d-block mt-2 mb-3">
                          [Browser Extension] changes Githubs code appearance to
                          resemble One Dark Vivid with Fira Code of VS Code as
                          closely as possible, built upon
                          https://github.com/vovanmix/github-dark-theme
                        </p>

                        <p className="mb-0 f6 text-gray">
                          <span className="d-inline-block mr-3">
                            <span
                              className="repo-language-color"
                              style={{ backgroundColor: '#563d7c' }}
                            />
                            <span itemProp="programmingLanguage">CSS</span>
                          </span>

                          <a
                            href="/ljosberinn/github-one-dark-vivid/network/members"
                            className="pinned-item-meta muted-link"
                          >
                            <svg
                              aria-label="fork"
                              className="octicon octicon-repo-forked"
                              viewBox="0 0 10 16"
                              version="1.1"
                              width="10"
                              height="16"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
                              />
                            </svg>
                            1
                          </a>
                        </p>
                      </div>
                    </li>
                  </ol>
                </form>
              </div>

              <div className="mt-4 position-relative">
                <div className="d-flex">
                  <div className="col-12 col-lg-10">
                    <DynamicActivityContent userName={userName} />

                    <div className="activity-listing contribution-activity">
                      <h2 className="f4 text-normal mb-2">
                        Contribution activity
                      </h2>

                      <div className="contribution-activity-listing float-left col-12">
                        <div className="profile-timeline discussion-timeline width-full pb-4">
                          <h3 className="profile-timeline-month-heading bg-white d-inline-block h6 pr-2 py-1">
                            June <span className="text-gray">2019</span>
                          </h3>

                          <div
                            id="contribution-created-issue-451205547-2019-06-02"
                            className="profile-rollup-wrapper py-4 pl-4 position-relative ml-3"
                          >
                            <span className="timeline-item-icon discussion-item-icon">
                              <svg
                                className="octicon octicon-flame"
                                viewBox="0 0 12 16"
                                version="1.1"
                                width="12"
                                height="16"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"
                                />
                              </svg>
                            </span>
                            <div className="d-flex flex-justify-between flex-items-baseline mb-3">
                              <h4 className="text-normal text-gray lh-condensed my-0 pr-3">
                                Created an issue in
                                <a
                                  className="link-gray-dark"
                                  href="/storeon/localstorage"
                                >
                                  storeon/localstorage
                                </a>
                                that received 1 comment
                              </h4>
                              <a
                                className="f6 text-gray-light muted-link no-wrap"
                                href="/ljosberinn?tab=overview&amp;from=2019-06-01&amp;to=2019-06-30#contribution-created-issue-451205547-2019-06-02"
                              >
                                <time className="no-wrap">Jun 2</time>
                              </a>
                            </div>

                            <div className="profile-timeline-card bg-white border border-gray-dark rounded-1 p-3">
                              <svg
                                className="octicon octicon-issue-closed closed d-inline-block mt-1 float-left"
                                title="Closed"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z"
                                />
                              </svg>
                              <div className="ml-4">
                                <h3 className="lh-condensed my-0">
                                  <a
                                    className="text-gray-dark"
                                    href="/storeon/localstorage/issues/18"
                                  >
                                    Please update the npm package
                                  </a>
                                </h3>

                                <div className="text-gray mb-0 mt-2">
                                  <p>
                                    The npm package is still missing
                                    <code>index.d.ts</code> and on different
                                    machines, I always have to add the file
                                    manually.
                                  </p>
                                </div>

                                <div className="f6 text-gray mt-2">
                                  1 comment
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <form
                        className="ajax-pagination-form"
                        action="/ljosberinn?tab=overview&amp;from=2019-05-01&amp;to=2019-05-31&amp;include_header=no"
                        acceptCharset="UTF-8"
                        method="get"
                      >
                        <img
                          className="contribution-activity-spinner col-10 next"
                          alt=""
                          src="https://github.githubassets.com/images/spinners/octocat-spinner-128.gif"
                        />

                        <button
                          name="button"
                          type="submit"
                          className="ajax-pagination-btn btn btn-outline border-gray-dark width-full f6 mt-0 py-2 contribution-activity-show-more"
                          data-disable-with="Loading..."
                        >
                          Show more activity
                        </button>

                        <p className="text-gray f6 mt-4">
                          Seeing something unexpected? Take a look at the
                          <a href="https://help.github.com/categories/setting-up-and-managing-your-github-profile">
                            GitHub profile guide
                          </a>
                          .
                        </p>
                      </form>
                    </div>
                  </div>
                  <div
                    id="year-list-container"
                    className="col-12 col-lg-2 pl-5 hide-sm hide-md hide-lg"
                  >
                    <div className="d-none d-lg-block">
                      <div
                        className="profile-timeline-year-list bg-white is-placeholder"
                        style={{
                          display: 'none',
                          visibility: 'hidden',
                          height: '118px'
                        }}
                      />
                      <div
                        className="profile-timeline-year-list bg-white"
                        style={{ position: 'static' }}
                      >
                        <ul className="filter-list small">
                          <li>
                            <a
                              id="year-link-2019"
                              className="filter-item px-3 mb-2 py-2 selected"
                              aria-label="Contribution activity in 2019"
                              href="/ljosberinn?tab=overview&amp;from=2019-06-01&amp;to=2019-06-04"
                            >
                              2019
                            </a>
                          </li>
                          <li>
                            <a
                              id="year-link-2018"
                              className=" filter-item px-3 mb-2 py-2"
                              aria-label="Contribution activity in 2018"
                              href="/ljosberinn?tab=overview&amp;from=2018-12-01&amp;to=2018-12-31"
                            >
                              2018
                            </a>
                          </li>
                          <li>
                            <a
                              id="year-link-2017"
                              className=" filter-item px-3 mb-2 py-2"
                              aria-label="Contribution activity in 2017"
                              href="/ljosberinn?tab=overview&amp;from=2017-12-01&amp;to=2017-12-31"
                            >
                              2017
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </>
);

export default App;
