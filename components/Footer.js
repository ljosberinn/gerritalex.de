import React from 'react';

export function Footer() {
  return (
    <div
      className="footer container-lg width-full p-responsive"
      role="contentinfo"
    >
      <div className="position-relative d-flex flex-row-reverse flex-lg-row flex-wrap flex-lg-nowrap flex-justify-center flex-lg-justify-between pt-6 pb-2 mt-6 f6 text-gray border-top border-gray-light ">
        <ul className="list-style-none d-flex flex-wrap col-12 col-lg-5 flex-justify-center flex-lg-justify-between mb-2 mb-lg-0">
          <li className="mr-3 mr-lg-0">
            Design © 2019-{new Date().getFullYear()} GitHub, Inc., modifications
            by Gerrit Alex
          </li>
          <li
            className="mr-3 mr-lg-0 imprint"
            data-name="Gerrit Alex"
            data-street="Appenzeller Straße 97"
            data-city="81475 Munich"
          />
        </ul>
      </div>
      <div className="d-flex flex-justify-center pb-6" />
    </div>
  );
}
