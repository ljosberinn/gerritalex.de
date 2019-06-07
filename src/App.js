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
                  <div className="col-12">
                    <DynamicActivityContent userName={userName} />
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
