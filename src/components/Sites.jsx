import React from 'react';
import { OcticonLink, OcticonRepo, OcticonCode } from './icons';
import { useTranslation } from 'react-i18next';

const sites = [
  {
    url: 'https://auctioncraftsniper.com',
    title: 'AuctionCraftSniper',
    repository: 'https://github.com/ljosberinn/auctioncraftsniper'
  },
  {
    url: 'https://resources-helper.de',
    title: 'Resources Helper',
    repository: 'https://github.com/ljosberinn/resources-helper'
  }
];

export const Sites = () => {
  const { t } = useTranslation();

  return (
    <>
      <div class="d-flex width-full flex-items-center position-relative">
        <OcticonCode />
        <span class="text-bold flex-auto">{t('sites-title')}</span>
      </div>

      <ul className="vcard-details mb-3">
        {sites.map(({ url, title, repository }) => (
          <li className="vcard-detail pt-1 css-truncate css-truncate-target">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <OcticonLink /> {title}
            </a>
            <a
              className="has-icon-right"
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              <OcticonRepo />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
