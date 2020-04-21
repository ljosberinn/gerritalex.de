import React from 'react';
import { useTranslation } from 'react-i18next';

import { OcticonLink, OcticonRepo, OcticonCode } from './icons';

const sites = [
  {
    url: 'https://github.com/ljosberinn/webdev-support-bot',
    title: '/r/webdev Support Discord Bot',
    repository: 'https://github.com/ljosberinn/webdev-support-bot',
  },
  {
    url: 'https://auctioncraftsniper.com',
    title: 'AuctionCraftSniper',
    repository: 'https://github.com/ljosberinn/auctioncraftsniper',
  },
  {
    url: 'https://resources-helper.de',
    title: 'Resources Helper',
    repository: 'https://github.com/ljosberinn/resources-helper',
  },
  {
    url: 'https://wahl2017.gerritalex.de',
    title: 'Wahlorientierungshilfe',
    repository: 'https://github.com/ljosberinn/Wahlorientierungshilfe',
  },
  {
    url:
      'https://chrome.google.com/webstore/detail/github-vs-code-one-dark-v/ifhihbeapkbahaelfppkncgmmmeidapl',
    title: 'Github One Dark Vivid',
    repository: 'https://github.com/ljosberinn/github-one-dark-vivid',
  },
  {
    title: 'Advanced Guild Statistics',
    repository:
      'https://github.com/xepheris/World-of-Warcraft--Legion---Advanced-Guild-Statistics',
  },
  {
    title: 'Advanced Armory Access',
    repository:
      'https://github.com/ljosberinn/World-of-Warcraft-Advanced-Armory-Access',
  },
  {
    title: 'Artifact Power Ranking',
    repository:
      'https://github.com/ljosberinn/World-of-Warcraft-Artifact-Power-World-Ranking',
  },
];

function RepoLink({ link }) {
  return (
    <a
      className="has-icon-right"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
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
}
