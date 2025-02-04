import { type ReactNode } from 'react';
import { type Authors } from '../.contentlayer/generated';
import { RestrainedMaxWidth } from '../components/RestrainedMaxWidth';
import SocialIcon from '../components/social-icons';

interface Props {
  children: ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, occupation, company, bluesky, github } = content;

  return (
    <RestrainedMaxWidth className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          About
        </h1>
      </div>
      <div className="items-start space-y-2">
        <div className="xs:flex-row flex flex-col items-center justify-center space-x-2 pt-8 xl:flex-col">
          <div className="text-center">
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex flex-row justify-center space-x-3 pt-6">
              {github ? <SocialIcon kind="github" href={github} /> : null}
              {bluesky ? <SocialIcon kind="bluesky" href={bluesky} /> : null}
            </div>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">{children}</div>
      </div>
    </RestrainedMaxWidth>
  );
}
