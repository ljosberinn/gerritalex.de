import React from 'react';
import { Biography } from './Biography';
import { Profiles } from './Profiles';
import { Location } from './Location';
import { Avatar } from './Avatar';
import { useTranslation } from 'react-i18next';

export const Person = ({ name, userName }) => {
  const { t } = useTranslation();

  return (
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
            <strong>{userName}</strong>
          </span>
        </div>
      </div>
      <div className="clearfix mb-2">
        <Avatar userName={userName} />
        <div className="float-left col-9 col-md-12 pl-2 pl-md-0">
          <div className="vcard-names-container pt-1 pt-md-3 pb-1 pb-md-3">
            <h1 className="vcard-names">
              <span
                className="p-name vcard-fullname d-block overflow-hidden"
                itemProp="name"
              >
                {name}
              </span>
              <span
                className="p-nickname vcard-username d-block"
                itemProp="additionalName"
              >
                {userName}
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
                {t('cta-text')}
              </button>
            </div>

            <Biography />

            <ul className="vcard-details mb-3">
              <Location />
              <Profiles />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
