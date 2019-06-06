import React from 'react';

export const Header = () => (
  <div className="position-relative">
    <header
      className="Header Details flex-wrap flex-lg-nowrap p-responsive"
      role="banner"
    >
      <div className="Header-item d-none d-lg-flex">
        <a
          className="Header-link"
          href="https://github.com/"
          aria-label="Homepage"
        >
          <svg
            className="octicon octicon-mark-github v-align-middle"
            height="32"
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
      <div className="Header-item d-lg-none">
        <button
          className="Header-link btn-link"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          <svg
            height="24"
            className="octicon octicon-three-bars"
            viewBox="0 0 12 16"
            version="1.1"
            width="18"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
            />
          </svg>
        </button>
      </div>
      <div className="Header-item Header-item--full flex-column flex-lg-row width-full flex-order-2 flex-lg-order-none mr-0 mr-lg-3 mt-3 mt-lg-0 Details-content--hidden">
        <div
          className="header-search flex-self-stretch flex-lg-self-auto mr-0 mr-lg-3 mb-3 mb-lg-0 scoped-search site-scoped-search position-relative"
          role="combobox"
          aria-owns="jump-to-results"
          aria-label="Search or jump to"
          aria-haspopup="listbox"
          aria-expanded="false"
        >
          <div className="position-relative">
            <form
              role="search"
              aria-label="Site"
              action="https://github.com/search?user=ljosberinn"
              method="get"
            >
              <label className="form-control input-sm header-search-wrapper p-0 header-search-wrapper-jump-to position-relative d-flex flex-justify-between flex-items-center">
                <input
                  type="text"
                  className="form-control input-sm header-search-input jump-to-field is-clearable"
                  placeholder="Search or jump to..."
                  spellCheck="false"
                  autoComplete="off"
                />
                <img
                  src="https://github.githubassets.com/images/search-key-slash.svg"
                  alt=""
                  className="mr-2 header-search-key-slash"
                />
              </label>
            </form>
          </div>
        </div>
        <nav
          className="d-flex flex-column flex-lg-row flex-self-stretch flex-lg-self-auto"
          aria-label="Global"
        >
          <a
            className="Header-link d-block d-lg-none py-2 py-lg-0 border-top border-lg-top-0 border-white-fade-15"
            aria-label="Dashboard"
            href="https://github.com/dashboard"
          >
            Dashboard
          </a>
          <a
            className="Header-link  mr-0 mr-lg-3 py-2 py-lg-0 border-top border-lg-top-0 border-white-fade-15"
            aria-label="Pull requests you created"
            data-selected-links="/pulls /pulls/assigned /pulls/mentioned /pulls"
            href="https://github.com/pulls"
          >
            Pull requests
          </a>
          <a
            className="Header-link  mr-0 mr-lg-3 py-2 py-lg-0 border-top border-lg-top-0 border-white-fade-15"
            aria-label="Issues you created"
            href="https://github.com/issues"
          >
            Issues
          </a>
          <a
            className=" Header-link  mr-0 mr-lg-3 py-2 py-lg-0 border-top border-lg-top-0 border-white-fade-15"
            href="https://github.com/explore"
          >
            Explore
          </a>
          <a
            className="Header-link d-block d-lg-none mr-0 mr-lg-3 py-2 py-lg-0 border-top border-lg-top-0 border-white-fade-15"
            aria-label="View profile and more"
            aria-expanded="false"
            aria-haspopup="false"
            href="https://github.com/ljosberinn"
          >
            <img
              className="avatar"
              src="https://avatars2.githubusercontent.com/u/29307652?s=40&amp;v=4"
              width="20"
              height="20"
              alt="@ljosberinn"
            />
            ljosberinn
          </a>
        </nav>
      </div>
      <div className="Header-item mr-0 mr-lg-3 flex-order-1 flex-lg-order-none">
        <a
          aria-label="You have no unread notifications"
          className="Header-link notification-indicator position-relative tooltipped tooltipped-s"
          href="https://github.com/notifications"
        >
          <span className="mail-status " />
          <svg
            className="octicon octicon-bell"
            viewBox="0 0 14 16"
            version="1.1"
            width="14"
            height="16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"
            />
          </svg>
        </a>
      </div>
      <div className="Header-item position-relative d-none d-lg-flex">
        <details className="details-overlay details-reset">
          <summary
            className="Header-link"
            aria-label="Create new…"
            aria-haspopup="menu"
          >
            <svg
              className="octicon octicon-plus"
              viewBox="0 0 12 16"
              version="1.1"
              width="12"
              height="16"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z" />
            </svg>
            <span className="dropdown-caret" />
          </summary>
          <details-menu className="dropdown-menu dropdown-menu-sw" role="menu">
            {[
              { title: 'New repository', url: 'https://github.com/new' },
              {
                title: 'Import repository',
                url: 'https://github.com/new/import'
              },
              { title: 'New gist', url: 'https://gist.github.com/' },
              {
                title: 'New organizationt',
                url: 'https://github.com/organizations/new'
              },
              {
                title: 'New project',
                url: 'https://github.com/new/project'
              }
            ].map(({ title, url }) => (
              <a
                key={title}
                role="menuitem"
                className="dropdown-item"
                href={url}
              >
                {title}
              </a>
            ))}
          </details-menu>
        </details>
      </div>
      <div className="Header-item position-relative mr-0 d-none d-lg-flex">
        <details className="details-overlay details-reset">
          <summary
            className="Header-link"
            aria-label="View profile and more"
            aria-haspopup="menu"
          >
            <img
              alt="@ljosberinn"
              className="avatar"
              src="https://avatars2.githubusercontent.com/u/29307652?s=40v=4"
              height="20"
              width="20"
            />
            <span className="dropdown-caret" />
          </summary>
        </details>
      </div>
    </header>
  </div>
);
