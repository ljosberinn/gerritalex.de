import React from 'react';
import { useTranslation } from 'react-i18next';
import { OcticonLocation } from './icons';

export const Location = () => {
  const { t } = useTranslation();

  return (
    <ul className="vcard-details mb-3">
      <li
        itemProp="homeLocation"
        aria-label="Home location: Augsburg, Bavaria"
        className="vcard-detail pt-1 css-truncate css-truncate-target"
      >
        <OcticonLocation />
        <span className="p-label">{t('location')}</span>
      </li>
    </ul>
  );
};
