import { FaLastfm, FaTwitch, FaSpotify, FaYoutube } from "react-icons/fa";
import { FcReddit } from "react-icons/fc";
import { FiTwitter, FiGithub, FiLinkedin } from "react-icons/fi";

const profiles = [
  { alt: "GitHub", icon: FiGithub, url: "//github.com/ljosberinn" },
  { alt: "Twitter", icon: FiTwitter, url: "//twitter.com/@gerrit_alex" },
  { alt: "Reddit", icon: FcReddit, url: "//reddit.com/user/careseite" },
  { alt: "LinkedIn", icon: FiLinkedin, url: "//linkedin.com/in/gerrit-alex/" },
  { alt: "LastFm", icon: FaLastfm, url: "//last.fm/user/xhs207ga" },
  { alt: "Twitch", icon: FaTwitch, url: "//twitch.tv/gerrit_alex" },
  {
    alt: "Spotify",
    icon: FaSpotify,
    url: "//open.spotify.com/user/21fchbw5qcdxgyiqxis3otdgq",
  },
  {
    alt: "YouTube",
    icon: FaYoutube,
    url: "//www.youtube.com/channel/UCTsp9ZCJw8k9NkaBvybAjGQ",
  },
];

export const config = {
  avatar:
    "https://avatars3.githubusercontent.com/u/29307652?s=96&u=57dd4a6ed2df91e2ea92db8b7c978b8ee5a2a591",
  defaultOgImage:
    "https://og-image-six-sigma.vercel.app/Hi%2C%20I'm%20Gerrit%20Alex.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg",
  domain: "https://gerritalex.de",
  github: "ljosberinn",
  linkedin: "gerrit-alex",
  name: "Gerrit Alex",
  ogImageSource: "https://og-image-six-sigma.vercel.app/",
  profiles,
  twitter: "@gerrit_alex",
};
