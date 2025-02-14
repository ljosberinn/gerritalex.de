import { formatDate } from 'pliny/utils/formatDate';
import { CustomLink } from '../components/CustomLink';
import { RandomLyrics } from '../components/RandomLyrics.';
import { RestrainedMaxWidth } from '../components/RestrainedMaxWidth';
import { Tag } from '../components/Tag';
import siteMetadata from '../data/siteMetadata';

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
  return (
    <RestrainedMaxWidth>
      <div className="pt-6">
        <h1 className="pb-6 text-3xl leading-9 font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-300">
          Hi, I'm Xeph!
        </h1>

        <p className="pb-8">
          This new page is still a bit rough layouting wise but functional and I finally wanted to
          get it over the finishing line for now so forgive me while I work on that.
        </p>

        <RandomLyrics />
      </div>
      <div className="divide-y divide-gray-300 dark:divide-gray-700">
        <div className="space-y-2 py-4 md:space-y-5" />
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.length === 0
            ? 'No posts found.'
            : posts.slice(0, MAX_DISPLAY).map(({ slug, date, title, summary, tags }) => {
                return (
                  <li key={slug} className="py-10">
                    <article>
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-300">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl leading-8 font-bold tracking-tight">
                                <CustomLink
                                  href={`/blog/${slug}`}
                                  className="text-red-500 dark:text-yellow-100 dark:hover:text-blue-200"
                                >
                                  {title}
                                </CustomLink>
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
                          <div className="text-base leading-6 font-medium">
                            <CustomLink
                              href={`/blog/${slug}`}
                              className="text-blue-700 hover:text-yellow-900 dark:text-blue-200 dark:hover:text-yellow-100"
                              aria-label={`Read more: "${title}"`}
                            >
                              Read more &rarr;
                            </CustomLink>
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
        <div className="flex justify-end text-base leading-6 font-medium">
          <CustomLink
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </CustomLink>
        </div>
      )}
    </RestrainedMaxWidth>
  );
}
