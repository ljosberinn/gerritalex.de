import React, { useRef } from 'react';
import { Biography } from './Biography';
import { Profiles } from './Profiles';
import { Meta } from './Meta';
import { Avatar } from './Avatar';
import { useTranslation } from 'react-i18next';
import { OcticonX } from './icons';
import { Sites } from './Sites';

const body = document.querySelector('body');
const { style } = body;

const escapeListener = e => {
  if (e.keyCode === 27) {
    const dialog = document.querySelector('dialog[open]');
    // triggers removal through close-listener
    dialog.close();
    toggleOverflowY();
  }
};

const outOfBoundsListener = e => {
  const dialog = document.querySelector('dialog[open]');

  const { bottom, left, right, top } = dialog.getBoundingClientRect();
  const { clientX, clientY } = e;

  const isXOutside = clientX < left || clientX > right;
  const isYOutside = clientY < top || clientY > bottom;

  if (isXOutside || isYOutside) {
    // triggers removal through close-listener
    dialog.close();
    toggleOverflowY();
  }
};

const removeCloseListeners = () => {
  body.removeEventListener('keydown', escapeListener);
  body.removeEventListener('click', outOfBoundsListener);
};

const toggleOverflowY = () =>
  (style.overflowY = style.overflowY === '' ? 'hidden' : '');

export const Person = ({ name, userName }) => {
  const { t } = useTranslation();
  const dialog = useRef(null);

  const handleClick = () => {
    dialog.current.showModal();
    body.addEventListener('keydown', escapeListener);
    body.addEventListener('click', outOfBoundsListener);
    dialog.current.addEventListener('close', removeCloseListeners);

    toggleOverflowY();
  };

  const handleDialogClose = () => {
    dialog.current.close();
    toggleOverflowY();
    removeCloseListeners();
    dialog.current.removeEventListener('close', removeCloseListeners);
  };

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
        <div className="float-left col-12 pl-2 pl-md-0">
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
          <div className="d-md-block">
            <button
              name="button"
              type="button"
              className="btn btn-primary btn-block mt-2 mb-3"
              onClick={handleClick}
            >
              {t('cta-text')}
            </button>
            <dialog
              ref={dialog}
              className="anim-fade-in fast Box Box--overlay flex-column"
              aria-modal="true"
            >
              <div className="Box-header">
                <button
                  className="Box-btn-octicon btn-octicon float-right"
                  type="button"
                  aria-label="Close dialog"
                  onClick={handleDialogClose}
                >
                  <OcticonX />
                </button>
                <h3 className="mb-2">{t('contact-dialog-1')}</h3>
                <ul className="vcard-details text-gray mb-0">
                  <Profiles mail={t('mail')} />
                </ul>
              </div>
            </dialog>
            <Biography />
            <Meta />
            <Sites />
          </div>
        </div>
      </div>
    </div>
  );
};
