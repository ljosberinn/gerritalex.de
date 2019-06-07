import React from 'react';

export const Header = ({ userName, name }) => (
  <div className="position-relative">
    <header
      className="Header-old header-logged-out Details position-relative f4 py-2"
      role="banner"
    >
      <div className="container-xl d-lg-flex flex-items-center p-responsive">
        <div className="d-flex flex-justify-between flex-items-center">
          <a
            className="mr-4"
            href={`https://github.com/${userName}/gerritalex.de`}
            aria-label="Repository"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg
              height="32"
              className="octicon octicon-mark-github text-white"
              viewBox="0 0 16 16"
              version="1.1"
              width="32"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
        </div>

        <div className="HeaderMenu HeaderMenu--logged-out position-fixed top-0 right-0 bottom-0 height-fit position-lg-relative d-lg-flex flex-justify-between flex-items-center flex-auto">
          <nav className="mt-0 px-3 px-lg-0 mb-5 mb-lg-0" aria-label="Global">
            <ul className="d-lg-flex list-style-none">
              <li className="d-block d-lg-flex flex-lg-nowrap flex-lg-items-center border-bottom border-lg-bottom-0 mr-0 mr-lg-3 edge-item-fix position-relative flex-wrap flex-justify-between d-flex flex-items-center">
                <details className="HeaderMenu-details details-overlay details-reset width-full">
                  <summary
                    className="HeaderMenu-summary HeaderMenu-link px-0 py-3 border-0 no-wrap d-block d-lg-inline-block"
                    style={{ cursor: 'default' }}
                  >
                    {name} - Software Developer
                  </summary>
                </details>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  </div>
);
