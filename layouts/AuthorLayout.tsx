import { type ReactNode } from 'react';
import { type Authors } from 'contentlayer/generated';
import SocialIcon from '@/components/social-icons';

interface Props {
  children: ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, occupation, company, bluesky, github } = content;

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2">
          <div className="xs:flex-row flex flex-col items-center justify-center space-x-2 pt-8 xl:flex-col">
            <div className="text-center">
              <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
              <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
              <div className="text-gray-500 dark:text-gray-400">{company}</div>
              <div className="flex flex-row justify-center space-x-3 pt-6">
                {github ? <SocialIcon kind="github" href={github} /> : null}
                {bluesky ? <SocialIcon kind="bluesky" href={bluesky} /> : null}
              </div>
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
