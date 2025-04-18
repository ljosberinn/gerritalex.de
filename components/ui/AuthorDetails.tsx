import SocialIcon from '../social-icons';
import { Image } from '../Image';

export default function AuthorDetails({
  author,
  occupation,
  company,
  location,
  email,
  github,
  bluesky,
  avatar,
  youtube,
}) {
  return (
    <div className="xs:flex-row flex flex-col items-center justify-center space-x-2 pt-8 xl:flex-col">
      {avatar ? (
        <div className="pr-2 xl:pr-4">
          <Image
            src={avatar}
            alt="avatar"
            width={224}
            height={224}
            className="border-primary-400 h-48 w-48 min-w-48 rounded-full border-2 bg-linear-to-b from-white to-teal-500 md:h-52 md:w-52 dark:from-slate-900 dark:to-teal-500"
          />
        </div>
      ) : null}
      <div>
        <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight sm:text-3xl md:text-4xl">
          {author}
        </h3>
        <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{occupation}</div>
        <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{company}</div>
        {location && (
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{location}</div>
        )}
        <div className="flex space-x-3 pt-6">
          <SocialIcon kind="mail" href={`mailto:${email}`} />
          {github ? <SocialIcon kind="github" href={github} /> : null}
          {bluesky ? <SocialIcon kind="bluesky" href={bluesky} /> : null}
          {youtube ? <SocialIcon kind="youtube" href={youtube} /> : null}
        </div>
      </div>
    </div>
  );
}
