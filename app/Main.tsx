import Link from '@/components/Link';
import RestrainedMaxWidth from '@/components/RestrainedMaxWidth';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { formatDate } from 'pliny/utils/formatDate';

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
  return (
    <RestrainedMaxWidth>
      <div className="my-6 flex flex-col gap-x-12 xl:mb-12 xl:flex-row">
        <div className="pt-6">
          <h1 className="pb-6 text-3xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            Hi, I'm Xeph!
          </h1>
          <h2 className="w-3/4 text-lg text-gray-600 dark:text-gray-300">
            Just a bunch of things I kept thinking about and felt worth sharing.
          </h2>
        </div>
      </div>
      <div className="divide-y divide-gray-300 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5" />
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.length === 0
            ? 'No posts found.'
            : posts.slice(0, MAX_DISPLAY).map(({ slug, date, title, summary, tags }) => {
                return (
                  <li key={slug} className="py-12">
                    <article>
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-300">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/blog/${slug}`}
                                  className="text-red-500 dark:text-yellow-100 hover:dark:text-blue-200"
                                >
                                  {title}
                                </Link>
                              </h2>
                              {tags.length > 0 ? (
                                <div className="flex flex-wrap">
                                  {tags.map((tag) => (
                                    <Tag key={tag} text={tag} />
                                  ))}
                                </div>
                              ) : null}
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-300">
                              {summary}
                            </div>
                          </div>
                          <div className="text-base font-medium leading-6">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-blue-700 hover:text-yellow-900 dark:text-blue-200 dark:hover:text-yellow-100"
                              aria-label={`Read more: "${title}"`}
                            >
                              Read more &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </RestrainedMaxWidth>
  );
}
