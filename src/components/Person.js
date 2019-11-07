import React, { useRef } from 'react';
import { Biography, Profiles, Meta, Avatar, Sites } from '.';
import { useTranslation } from 'react-i18next';
import { OcticonX } from './icons';

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

export default function Person({ name, userName }) {
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
  );
}
