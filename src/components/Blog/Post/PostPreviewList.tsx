import type { Post as PostType } from '@/blog/getAllPostPreviews';
import { getAllPostPreviews } from '@/blog/getAllPostPreviews';
import { InternalLink } from '@/components/InternalLink';
import { SectionTitle } from '@/components/SectionTitle';
import type { ChangeEvent } from 'react';
import { memo, useState, useMemo } from 'react';
import tinytime from 'tinytime';

const posts = getAllPostPreviews();
const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}');

export type ViewData = {
  total: number;
  pathname: string;
};

export type PostPreviewListProps = {
  viewData: ViewData[];
  onlyPopular?: boolean;
};

export function PostPreviewList({
  viewData,
  onlyPopular,
}: PostPreviewListProps): JSX.Element {
  const [search, setSearch] = useState('');
  const postsWithViewData = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        module: {
          ...post.module,
          meta: {
            ...post.module.meta,
            views:
              viewData.find((dataset) => dataset.pathname === post.link)
                ?.total ?? 0,
          },
        },
      })),
    [viewData],
  );

  const mostPopularPosts = useMemo(
    () =>
      postsWithViewData
        .sort((a, b) => (a.module.meta.views > b.module.meta.views ? 1 : -1))
        .slice(0, 2),
    [postsWithViewData],
  );

  function handleSearch({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setSearch(value);
  }

  const filteredPosts = postsWithViewData
    .sort(
      (a, b) =>
        Number(new Date(b.module.meta.date)) -
        Number(new Date(a.module.meta.date)),
    )
    .filter((post) =>
      post.module.meta.title.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <>
      {/* search should only be visible on /blog */}
      {!onlyPopular && (
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="search posts"
          className="form-input flex-1 block w-full rounded transition duration-150 ease-in-out sm:text-sm sm:leading-5 mt-4 mb-8"
          aria-label="search posts"
        />
      )}

      {!search && (
        <>
          <SectionTitle>Most popular posts</SectionTitle>
          <ul className="divide-y divide-gray-200">
            {mostPopularPosts.map(({ link, module }) => (
              <Post
                key={link}
                link={link}
                {...module}
                // show preview on /, but not on /blog
                omitPreview={!onlyPopular}
              />
            ))}
          </ul>
        </>
      )}

      {/* all posts should only be visible on /blog */}
      {!onlyPopular && (
        <>
          <SectionTitle>All posts</SectionTitle>

          <ul className="divide-y divide-gray-200">
            {filteredPosts.map(({ link, module }) => (
              <Post key={link} link={link} {...module} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

type PostProps = Pick<PostType, 'link'> & {
  default: PostType['module']['default'];
  meta: PostType['module']['meta'] & { views: number };
  omitPreview?: boolean;
};

const Post = memo(
  ({ link, meta, default: Component, omitPreview }: PostProps) => {
    return (
      <li key={link} className="py-4">
        <article className="space-y-2">
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl leading-8 font-bold tracking-tight">
                  <InternalLink href={link} className="underline">
                    {meta.title}
                  </InternalLink>
                </h2>
                <div className="flex">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-xs leading-6 font text-theme-subtitle">
                      <time dateTime={meta.date}>
                        {postDateTemplate.render(new Date(meta.date))}
                      </time>
                    </dd>
                  </dl>
                  <div className="mx-1">&middot;</div>
                  <dt className="sr-only">Time to read</dt>
                  <dd className="text-xs leading-6 font text-theme-subtitle">
                    {meta.readingTime} ☕
                  </dd>

                  {meta.views > -1 && (
                    <>
                      <div className="mx-1">&middot;</div>
                      <dd className="text-xs leading-6 font text-theme-subtitle">
                        {meta.views.toLocaleString()} views
                      </dd>
                    </>
                  )}
                </div>
              </div>
              {!omitPreview && (
                <div className="prose max-w-none text-theme-text">
                  <Component />
                </div>
              )}
            </div>
            {!omitPreview && (
              <div className="text-base leading-6 font-medium">
                <InternalLink href={link} aria-label={`Read "${meta.title}"`}>
                  Read more &rarr;
                </InternalLink>
              </div>
            )}
          </div>
        </article>
      </li>
    );
  },
);
