import siteMetadata from 'data/siteMetadata';
import { SocialIcon } from './social-icons';
import { CustomLink } from './CustomLink';

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-4xl px-4 xl:max-w-7xl">
      <div className="flex h-24 flex-col items-center justify-between py-2 md:h-auto md:flex-row">
        <div className="flex items-center space-x-1">
          <CustomLink
            href={siteMetadata.siteRepo}
            className="hover:text-primary-500 dark:hover:text-primary-500 text-gray-500 underline underline-offset-4 dark:text-gray-400"
          >
            <span>View source</span>
          </CustomLink>

          <span className="px-1 text-gray-400 dark:text-gray-500">-</span>

          <CustomLink
            href={siteMetadata.counterscale}
            className="hover:text-primary-500 dark:hover:text-primary-500 text-gray-500 underline underline-offset-4 dark:text-gray-400"
          >
            <span>Counterscale</span>
          </CustomLink>
        </div>

        <div className="flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={6} />
        </div>
        <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
          <div className="whitespace-nowrap">{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div className="whitespace-nowrap">{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
}
