import React from 'react';
import { OcticonLink } from './icons';
import { Twitter, Reddit, LinkedIn, Mail } from './icons';

const profiles = [
  { icon: 'github', url: 'https://github.com/ljosberinn' },
  { icon: 'twitter', url: 'https://twitter.com/@gerrit_alex' },
  { icon: 'reddit', url: 'https://reddit.com/user/careseite' },
  { icon: 'linkedin', url: 'https://linkedin.com/in/gerrit-alex/' }
];

const resolveIcon = name => {
  switch (name) {
    case 'twitter':
      return <Twitter />;
    case 'reddit':
      return <Reddit />;
    case 'linkedin':
      return <LinkedIn />;
    case 'github':
    default:
      return <OcticonLink />;
  }
};

const Profiles = ({ mail }) => (
  <>
    <li className="vcard-detail pt-1 css-truncate css-truncate-target">
      <a href={`mailto:${mail}`}>
        <Mail /> {mail}
      </a>
    </li>
    {profiles.map(({ url, icon }, key) => (
      <li
        itemProp="url"
        className="vcard-detail pt-1 css-truncate css-truncate-target"
        key={key}
      >
        {resolveIcon(icon)}
        <a rel="nofollow me noopener noreferrer" target="_blank" href={url}>
          {url}
        </a>
      </li>
    ))}
  </>
);

export default Profiles;
