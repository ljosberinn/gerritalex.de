import React from "react";
import { Biography } from "./Biography";
import { Homepage } from "./Homepage";
import { Location } from "./Location";
import { Avatar } from "./Avatar";
import { Status } from "./Status";

export const Person = () => (
  <div
    className="h-card col-lg-3 col-md-4 col-12 float-md-left pr-md-3 pr-xl-6"
    itemScope
    itemType="http://schema.org/Person"
  >
    <div className="user-profile-sticky-bar">
      <div className="user-profile-mini-vcard d-table">
        <span className="user-profile-mini-avatar d-table-cell v-align-middle lh-condensed-ultra pr-2">
          <img
            className="rounded-1"
            height="32"
            width="32"
            alt="@ljosberinn"
            src="https://avatars0.githubusercontent.com/u/29307652?s=180;v=4"
          />
        </span>
        <span className="d-table-cell v-align-middle lh-condensed">
          <strong>ljosberinn</strong>
        </span>
      </div>
    </div>
    <Avatar />
    <Status />
    <div className="float-left col-9 col-md-12 pl-2 pl-md-0">
      <div className="vcard-names-container pt-1 pt-md-3 pb-1 pb-md-3">
        <h1 className="vcard-names">
          <span
            className="p-name vcard-fullname d-block overflow-hidden"
            itemProp="name"
          >
            Gerrit Alex
          </span>
          <span
            className="p-nickname vcard-username d-block"
            itemProp="additionalName"
          >
            ljosberinn
          </span>
        </h1>
      </div>
      <div className="d-none d-md-block">
        <div className="hide-sm hide-md">
          <button
            name="button"
            type="button"
            className="btn btn-block mt-2 mb-3"
          >
            applying as JavaScript Developer
          </button>
        </div>

        <Biography />

        <ul className="vcard-details mb-3">
          <Location />

          <Homepage />
        </ul>
      </div>
    </div>
  </div>
);
