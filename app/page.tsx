import { allBlogs } from 'content-collections';
import { sortPosts, allCoreContent, formatDate } from '../lib/content';
import { CustomLink } from '../components/CustomLink';
import { RandomLyrics } from '../components/RandomLyrics.';
import { Tag } from '../components/Tag';
import { Image } from '../components/Image';
import siteMetadata from '../data/siteMetadata';
import { localImageFile } from '../lib/mdx-plugins';
import clsx from 'clsx';
import sharp from 'sharp';
import type { CSSProperties } from 'react';

const MAX_DISPLAY = 10;

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts);
  const bannerWidths = await Promise.all(
    posts.slice(0, MAX_DISPLAY).map(async ({ images, includeImageInPreview }) => {
      const file = includeImageInPreview ? localImageFile(images?.[0]) : null;

      return file ? (await sharp(file).metadata()).width : undefined;
    })
  );

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pt-6 xl:max-w-6xl">
        <h1 className="pb-6 text-3xl leading-9 font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-300">
          Hi, I'm Xeph!
        </h1>

        <p className="pb-8">
          This is my place to yap and where I document a bunch of things that I kept on my mind for
          too long.
        </p>

        <RandomLyrics />
      </div>
      <div className="divide-y divide-gray-300 dark:divide-gray-700">
        <div className="space-y-2 py-4 md:space-y-5" />
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts
            .slice(0, MAX_DISPLAY)
            .map(
              (
                {
                  slug,
                  date,
                  title,
                  summary,
                  tags,
                  lastmod,
                  images,
                  includeImageInPreview,
                  prefetch,
                },
                index
              ) => {
                const image = images?.[0];
                const bannerWidth = bannerWidths[index];

                return (
                  <li
                    key={slug}
                    id={slug}
                    className={clsx(
                      'group @container relative overflow-hidden py-10',
                      includeImageInPreview
                        ? null
                        : 'opacity-80 transition-opacity duration-250 ease-in-out hover:opacity-100'
                    )}
                  >
                    {includeImageInPreview && image ? (
                      <Image
                        src={image}
                        alt=""
                        className={clsx(
                          'pointer-events-none absolute top-1/2 left-1/2 min-h-full max-w-none min-w-full -translate-x-1/2 -translate-y-1/2 opacity-15 grayscale-25 transition-opacity duration-250 ease-in-out group-hover:opacity-25 group-hover:grayscale-0 xl:left-0 xl:w-full xl:translate-x-0 xl:object-cover',
                          bannerWidth && 'blur-(--banner-blur)'
                        )}
                        style={
                          bannerWidth
                            ? ({
                                '--banner-blur': `clamp(0px, (100cqw - ${bannerWidth}px) * 3 / ${bannerWidth}, 2px)`,
                              } as CSSProperties)
                            : undefined
                        }
                      />
                    ) : null}
                    <article className="relative mx-auto max-w-4xl px-2 xl:max-w-6xl">
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
                                  prefetch={prefetch}
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
                              prefetch={prefetch}
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
              }
            )}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="mb-2 flex justify-end px-2 text-base leading-6 font-medium">
          <CustomLink
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </CustomLink>
        </div>
      )}
    </>
  );
}
