import React from 'react';
import { useTranslation } from 'react-i18next';

import { OcticonLink, OcticonRepo, OcticonCode } from './icons';

const sites = [
  {
    repository: '//github.com/ljosberinn/eslint-config-galex',
    title: 'Personal ESLint config',
    url: '//github.com/ljosberinn/eslint-config-galex',
  },
  {
    repository: '//github.com/ljosberinn/webdev-support-bot',
    title: '/r/webdev Support Discord Bot',
    url: '//github.com/ljosberinn/webdev-support-bot',
  },
  {
    repository: '//github.com/ljosberinn/auctioncraftsniper',
    title: 'AuctionCraftSniper',
    url: '//auctioncraftsniper.com',
  },
  {
    repository: '//github.com/ljosberinn/resources-helper',
    title: 'Resources Helper',
    url: '//resources-helper.de',
  },
  {
    repository: '//github.com/ljosberinn/Wahlorientierungshilfe',
    title: 'Wahlorientierungshilfe',
    url: '//wahl2017.gerritalex.de',
  },
  {
    repository: '//github.com/ljosberinn/github-one-dark-vivid',
    title: 'Github One Dark Vivid',
    url:
      '//chrome.google.com/webstore/detail/github-vs-code-one-dark-v/ifhihbeapkbahaelfppkncgmmmeidapl',
  },
  {
    repository:
      '//github.com/xepheris/World-of-Warcraft--Legion---Advanced-Guild-Statistics',
    title: 'Advanced Guild Statistics',
  },
  {
    repository:
      '//github.com/ljosberinn/World-of-Warcraft-Advanced-Armory-Access',
    title: 'Advanced Armory Access',
  },
  {
    repository:
      '//github.com/ljosberinn/World-of-Warcraft-Artifact-Power-World-Ranking',
    title: 'Artifact Power Ranking',
  },
];

function RepoLink({ link, title }) {
  return (
    <a
      className="has-icon-right"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title={title ? [title, 'Repository'].join(' ') : undefined}
    >
      <OcticonRepo />
    </a>
  );
}

function RegularLink({ url, title }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <OcticonLink /> {title}
    </a>
  );
}

export default function Sites() {
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex width-full flex-items-center position-relative">
        <OcticonCode />
        <span className="text-bold flex-auto">{t('sites-title')}</span>
      </div>

      <ul className="vcard-details mb-3">
        {sites.map(({ url, title, repository }) => (
          <li
            className="vcard-detail pt-1 css-truncate css-truncate-target"
            key={title}
          >
            {url && repository ? (
              <>
                <RegularLink url={url} title={title} />
                <RepoLink link={repository} title={title} />
              </>
            ) : (
              <>
                {title}
                {repository && <RepoLink link={repository} title={title} />}
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
