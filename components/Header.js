import React from 'react';

export default function Header({ name, repoLink }) {
  return (
    <div className="position-relative">
      <header
        className="Header-old header-logged-out Details position-relative f4 py-2"
        role="banner"
      >
        <div className="container-xl d-lg-flex flex-items-center p-responsive">
          <div className="d-flex flex-justify-between flex-items-center">
            <a
              className="mr-4"
              href={repoLink}
              aria-label="Repository"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="https://avatars3.githubusercontent.com/u/29307652?s=460;v=4"
                width="32"
                aria-hidden="true"
                height="32"
                className="octicon octicon-mark-github text-white"
                alt="Gerrit Alex - Software Engineer"
              />
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
                      {name} - Fullstack Web Software Engineer
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
}
