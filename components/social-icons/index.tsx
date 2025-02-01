import { Mail, Github, Youtube, Bluesky } from './icons';

const components = {
  mail: Mail,
  github: Github,
  youtube: Youtube,
  bluesky: Bluesky,
};

type SocialIconProps = {
  kind: keyof typeof components;
  href: string | undefined;
  size?: number;
};

export default function SocialIcon({ kind, href, size = 8 }: SocialIconProps) {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  ) {
    return null;
  }

  const SocialSvg = components[kind];

  return (
    <a
      className="group text-sm text-gray-500 transition"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-${size} w-${size}`}
      />
    </a>
  );
}
