import { formatDate } from 'pliny/utils/formatDate';
import { CustomLink } from '../components/CustomLink';
import { RandomLyrics } from '../components/RandomLyrics.';
import { RestrainedMaxWidth } from '../components/RestrainedMaxWidth';
import { Tag } from '../components/Tag';
import siteMetadata from '../data/siteMetadata';

const MAX_DISPLAY = 10;

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
          {posts
            .slice(0, MAX_DISPLAY)
            .map(({ slug, date, title, summary, tags, lastmod, images, includeImageInPreview }) => {
              const image = images?.[0];

              return (
                <li key={slug} id={slug} className="relative py-10">
                  {includeImageInPreview ? (
                    <style>
                      {`
                      #${slug}:before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-image: url(${image});
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                        filter: grayscale(100%);
                        opacity: 0.15;
                        transition: opacity 0.25s ease-in-out;
                      }
                      
                      #${slug}:hover:before {
                        filter: grayscale(0%);
                        opacity: 0.25;
                      }
                      `}
                    </style>
                  ) : null}
                  <article className="relative px-2">
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-300">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>

                        {lastmod ? (
                          <>
                            <dt className="sr-only">Last updated</dt>
                            <dd className="flex items-center gap-2 text-base text-xs leading-6 text-gray-500 dark:text-gray-300">
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.1464 6.85355C11.3417 7.04882 11.6583 7.04882 11.8536 6.85355C12.0488 6.65829 12.0488 6.34171 11.8536 6.14645L7.85355 2.14645C7.65829 1.95118 7.34171 1.95118 7.14645 2.14645L3.14645 6.14645C2.95118 6.34171 2.95118 6.65829 3.14645 6.85355C3.34171 7.04882 3.65829 7.04882 3.85355 6.85355L7.5 3.20711L11.1464 6.85355ZM11.1464 12.8536C11.3417 13.0488 11.6583 13.0488 11.8536 12.8536C12.0488 12.6583 12.0488 12.3417 11.8536 12.1464L7.85355 8.14645C7.65829 7.95118 7.34171 7.95118 7.14645 8.14645L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L7.5 9.20711L11.1464 12.8536Z"
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <time dateTime={lastmod}>
                                {formatDate(lastmod, siteMetadata.locale)}
                              </time>
                            </dd>
                          </>
                        ) : null}
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
