import React from 'react';
import { OcticonLink } from './icons';

const profiles = [
  { icon: 'github', url: 'https://github.com/ljosberinn' },
  { icon: 'twitter', url: 'https://twitter.com/@gerrit_alex' },
  { icon: 'reddit', url: 'https://reddit.com/careseite' },
  { icon: 'linkedin', url: 'https://linkedin.com/in/gerrit-alex/' }
];

export const Profiles = () =>
  profiles.map(({ url }, key) => (
    <li
      itemProp="url"
      className="vcard-detail pt-1 css-truncate css-truncate-target"
      key={key}
    >
      <OcticonLink />
      <a rel="nofollow me noopener noreferrer" target="_blank" href={url}>
        {url}
      </a>
    </li>
  ));
