import React from 'react';

const cv = [0, 1, 2, 3];

export const CurriculumVitae = () => {
  return (
    <div className="mt-4">
      <h2 className="f4 mb-2 text-normal">Curriculum Vitae</h2>
      <ol className="pinned-items-list mb-4">
        {cv.map((_, index) => (
          <li className="pinned-item-list-item d-flex p-3 border border-gray-dark rounded-1 -item-list-item public source sortable-button-item cv">
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
                    fill-rule="evenodd"
                    d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                  />
                </svg>
                <a
                  target="_blank"
                  href="https://github.com/ljosberinn/AuctionCraftSniper"
                  class="text-bold flex-auto"
                >
                  <span className="repo -item" title="AuctionCraftSniper">
                    AuctionCraftSniper
                  </span>
                </a>
              </div>

              <p className="pinned-item-desc text-gray text-small d-block mt-2 mb-3">
                [Website] on-demand near-real time information about
                profession-related auction house prices for World of Warcraft
              </p>

              <p class="mb-0 f6 text-gray">
                <span className="d-inline-block mr-3">
                  <span
                    className="repo-language-color"
                    style={{ backgroundColor: '#2b7489' }}
                  />
                  <span itemprop="programmingLanguage">TypeScript</span>
                </span>

                <a
                  target="_blank"
                  href="https://github.com/ljosberinn/AuctionCraftSniper/stargazers"
                  className="pinned-item-meta muted-link"
                >
                  <svg
                    aria-label="stars"
                    class="octicon octicon-star"
                    viewBox="0 0 14 16"
                    version="1.1"
                    width="14"
                    height="16"
                    role="img"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                    />
                  </svg>
                  8
                </a>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
