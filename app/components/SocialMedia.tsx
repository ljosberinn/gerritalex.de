import { siteMetadata } from "~/siteMetadata";

import githubLogo from "../assets/github.webp";
import linkedinLogo from "../assets/linkedin.webp";
import twitterLogo from "../assets/twitter.webp";
import { ExternalLink } from "./ExternalLink";

export function SocialMedia() {
  return (
    <div className="not-prose flex justify-center gap-4">
      <Icon
        href={`https://github.com/${siteMetadata.github}`}
        alt="GitHub profile"
        src={githubLogo}
      />
      <Icon
        href={`https://twitter.com/${siteMetadata.twitter}`}
        alt="Twitter profile"
        src={twitterLogo}
      />
      <Icon
        href={`https://linkedin.com/in/${siteMetadata.linkedin}`}
        alt="LinkedIn profile"
        src={linkedinLogo}
      />
    </div>
  );
}

type IconProps = {
  href: string;
  alt: string;
  src: string;
}

function Icon({ href, alt, src }: IconProps) {
  return (
    <ExternalLink href={href}>
      <img
        alt={alt}
        src={src}
        width={42}
        height={42}
        loading="lazy"
        className="dark:invert"
      />
    </ExternalLink>
  );
}
