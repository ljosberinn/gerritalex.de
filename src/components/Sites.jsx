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
  },
  {
    url: 'https://wahl2017.gerritalex.de',
    title: 'Wahlorientierungshilfe',
    repository: 'https://github.com/ljosberinn/Wahlorientierungshilfe'
  },
  {
    url:
      'https://chrome.google.com/webstore/detail/github-vs-code-one-dark-v/ifhihbeapkbahaelfppkncgmmmeidapl',
    title: 'Github One Dark Vivid',
    repository: 'https://github.com/ljosberinn/github-one-dark-vivid'
  },
  {
    title: 'Advanced Guild Statistics',
    repository:
      'https://github.com/xepheris/World-of-Warcraft--Legion---Advanced-Guild-Statistics'
  },
  {
    title: 'Advanced Armory Access',
    repository:
      'https://github.com/ljosberinn/World-of-Warcraft-Advanced-Armory-Access'
  },
  {
    title: 'Artifact Power Ranking',
    repository:
      'https://github.com/ljosberinn/World-of-Warcraft-Artifact-Power-World-Ranking'
  }
];

const RepoLink = ({ link }) => (
  <a
    className="has-icon-right"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <OcticonRepo />
  </a>
);

const RegularLink = ({ url, title }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <OcticonLink /> {title}
  </a>
);

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
            {url && repository ? (
              <>
                <RegularLink url={url} title={title} />
                <RepoLink link={repository} />
              </>
            ) : (
              <>
                {title}
                {repository && <RepoLink link={repository} />}
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
