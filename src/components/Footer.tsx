import { gerritalex } from '@/blog/authors';

import { ExternalLink } from './ExternalLink';
import { LastFmWidget } from './LastFmWidget';

export function Footer(): JSX.Element {
  return (
    <footer className="text-sm text-center py-8 ">
      <LastFmWidget />
      <ul className="flex justify-center">
        <li className="pr-2">
          <ExternalLink href={`//github.com/${gerritalex.github}`} rel="me">
            &lt;/&gt;
          </ExternalLink>
        </li>
        <li className="px-2">
          <ExternalLink
            href={`//twitter.com/${gerritalex.twitter.slice(1)}`}
            rel="me"
          >
            {gerritalex.twitter}
          </ExternalLink>
        </li>
        <li className="px-2">
          <ExternalLink
            href={`//www.linkedin.com/in/${gerritalex.linkedin}/`}
            rel="me"
          >
            LinkedIn
          </ExternalLink>
        </li>
      </ul>
    </footer>
  );
}
