'use client';

import { usePathname } from 'next/navigation';
import { slug } from 'github-slugger';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import tagData from '../app/tag-data.json' with { type: 'json' };
import { type Blog } from '../.contentlayer/generated';
import { CustomLink } from '../components/CustomLink';
import siteMetadata from '../data/siteMetadata';
import { Tag } from '../components/Tag';
import clsx from 'clsx';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <CustomLink
            href={currentPage - 1 === 1 ? `${pathname}/` : `${pathname}/?page=${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </CustomLink>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <CustomLink href={`${pathname}/?page=${currentPage + 1}`} rel="next">
            Next
          </CustomLink>
        )}
      </nav>
    </div>
  );
}

export function ListLayoutWithTags({ posts, title }: ListLayoutProps) {
  const pathname = usePathname();
  const tagCounts = tagData as Record<string, number>;
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <>
      <div className="mx-auto">
        <div className="px-4 py-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-6 md:space-x-12">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[200px] flex-wrap overflow-auto bg-gray-50 pt-5 sm:flex dark:bg-gray-900/70">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
              ) : (
                <CustomLink
                  href={`/blog`}
                  className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
                >
                  All Posts
                </CustomLink>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <CustomLink
                          href={`/tags/${slug(t)}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </CustomLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map((post) => {
                const {
                  path,
                  date,
                  slug,
                  title,
                  summary,
                  tags,
                  structuredData: { dateModified: lastmod },
                  images,
                  includeImageInPreview,
                } = post;
                const image = images?.[0];

                return (
                  <li
                    key={path}
                    id={slug}
                    className={clsx(
                      'relative py-5',
                      includeImageInPreview
                        ? null
                        : 'opacity-80 transition-opacity duration-250 ease-in-out hover:opacity-100'
                    )}
                  >
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
                        filter: grayscale(25%);
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
                    <article className="relative mx-auto max-w-4xl px-2 xl:max-w-6xl">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                        {lastmod ? (
                          <>
                            <dt className="sr-only">Updated on</dt>
                            <dd className="flex items-center gap-1 text-base text-xs leading-6 font-medium text-gray-500 dark:text-gray-400">
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
                              <time dateTime={lastmod} suppressHydrationWarning>
                                {formatDate(lastmod, siteMetadata.locale)}
                              </time>
                            </dd>
                          </>
                        ) : null}
                      </dl>
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
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
        </div>
      </div>
    </>
  );
}
