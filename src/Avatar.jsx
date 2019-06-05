import React from "react";

export const Avatar = () => (
  <div className="clearfix mb-2">
    <div className="float-left col-3 col-md-12 pr-3 pr-md-0">
      <a
        className="u-photo d-block tooltipped tooltipped-s"
        aria-label="Gerrit Alex, 2017, Hohenpeißenberg"
        href="https://github.com/ljosberinn"
      >
        <img
          alt=""
          width="260"
          height="260"
          className="avatar width-full height-full avatar-before-user-status"
          src="https://avatars3.githubusercontent.com/u/29307652?s=460;v=4"
        />
      </a>
    </div>
  </div>
);
