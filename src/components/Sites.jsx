import React from 'react';
import { OcticonLink, OcticonRepo } from './icons';
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="octicon mr-2 text-gray"
          width="14"
          height="16"
          aria-hidden="true"
        >
          <path d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z" />
        </svg>
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
