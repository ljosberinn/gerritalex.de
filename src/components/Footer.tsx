import { config } from "../config";
import { ExternalLink } from "./ExternalLink";
import { LastFmWidget } from "./LastFmWidget";

export function Footer(): JSX.Element {
  return (
    <footer className="text-sm text-center pt-8">
      <LastFmWidget />
      <ul className="flex justify-center pt-4">
        {config.profiles.map(({ url, icon: Icon, alt }) => (
          <li className="px-2" key={url}>
            <ExternalLink href={url}>
              <span className="sr-only">{alt}</span>
              <Icon aria-hidden className="w-5 h-5 monochrome" />
            </ExternalLink>
          </li>
        ))}
      </ul>
    </footer>
  );
}
