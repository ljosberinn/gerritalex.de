import {
  FaLastfm,
  FaTwitch,
  FaSpotify,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';

import {
  OcticonLink,
  Twitter,
  Reddit,
  LinkedIn,
  Mail,
  OcticonGit,
} from './icons';

export const profiles = [
  { icon: 'github', url: 'https://github.com/ljosberinn' },
  { icon: 'twitter', url: 'https://twitter.com/@gerrit_alex' },
  { icon: 'reddit', url: 'https://reddit.com/user/careseite' },
  { icon: 'linkedin', url: 'https://linkedin.com/in/gerrit-alex/' },
  { icon: 'lastfm', url: 'https://last.fm/user/xhs207ga' },
  { icon: 'twitch', url: 'https://twitch.tv/gerrit_alex' },
  {
    icon: 'spotify',
    url: 'https://open.spotify.com/user/21fchbw5qcdxgyiqxis3otdgq',
  },
  { icon: 'facebook', url: 'https://www.facebook.com/Exenkoenig' },
  {
    icon: 'youtube',
    url: 'https://www.youtube.com/channel/UCTsp9ZCJw8k9NkaBvybAjGQ',
  },
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
      return <OcticonGit />;
    case 'twitch':
      return <FaTwitch className="octicon" />;
    case 'lastfm':
      return <FaLastfm className="octicon" />;
    case 'spotify':
      return <FaSpotify className="octicon" />;
    case 'facebook':
      return <FaFacebook className="octicon" />;
    case 'youtube':
      return <FaYoutube className="octicon" />;
    default:
      return <OcticonLink />;
  }
};

export function Profiles({ mail }) {
  return (
    <>
      <li className="vcard-detail pt-1 css-truncate css-truncate-target">
        <a href={`mailto:${mail}`}>
          <Mail /> {mail}
        </a>
      </li>
      {profiles
        .filter(dataset => !!dataset.icon)
        .map(({ url, icon }) => (
          <li
            itemProp="url"
            className="vcard-detail pt-1 css-truncate css-truncate-target"
            key={url}
          >
            {resolveIcon(icon)}
            <a rel="nofollow me noopener noreferrer" target="_blank" href={url}>
              {url}
            </a>
          </li>
        ))}
    </>
  );
}
