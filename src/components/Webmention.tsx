import { gerritalex } from '@/blog/authors';
import type { PostMeta } from '@/blog/getAllPostPreviews';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { QueryResult } from 'react-query';
import tinytime from 'tinytime';

import { useWebmention } from '../hooks/useWebmention';
import type { Webmentions } from '../hooks/useWebmention';
import { ExternalLink } from './ExternalLink';
import { TwitterShare } from './TwitterShare';

type WebmentionWidgetProps = {
  url: string;
  meta: PostMeta;
};

const repliesTimeTemplate = tinytime('{DD} {MM} {YYYY} - {h}:{mm} {a}');

// eslint-disable-next-line import/no-default-export
export default function WebmentionWidget({
  url,
  meta,
}: WebmentionWidgetProps): JSX.Element {
  const query = useWebmention(url);

  return (
    <div className="mb-2">
      <h3 className="text-lg font-bold mb-2">Webmentions</h3>
      <div
        className={
          query.isLoading ? 'animate-pulse bg-gray-300 rounded-lg' : ''
        }
      >
        <Content {...query} meta={meta} />
      </div>
    </div>
  );
}

type ContentProps = Pick<
  QueryResult<Webmentions>,
  'isLoading' | 'isError' | 'data' | 'refetch'
> &
  Pick<WebmentionWidgetProps, 'meta'>;

const maxAuthorsShown = 4;

function Content({ isError, isLoading, data, refetch, meta }: ContentProps) {
  const [showReplies, setShowReplies] = useState(false);
  const { pathname } = useRouter();

  if (isError) {
    return (
      <div className="bg-red-200 text-red-700 rounded-lg p-4 m-4">
        Something bad happened when trying to load Webmentions 😐 <br />
        <button
          type="button"
          className="hover:underline cursor-pointer font-bold"
          onClick={() => refetch()}
        >
          Try again?
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="opacity-0 h-12">a</div>;
  }

  if (data) {
    const { likes, reposts, discussions, authors } = data;

    const _authors =
      authors.length > maxAuthorsShown
        ? authors.slice(0, maxAuthorsShown)
        : authors;

    const authorImages = _authors.map((a) => (
      <img
        loading="lazy"
        key={a.url}
        src={a.photo}
        alt={a.name}
        className="rounded-full w-8 h-8 border-2 border-gray-50"
      />
    ));
    const otherAuthorsCount = authors.length - _authors.length;

    return (
      <>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex space-x-3 items-center">
            <div className="flex space-x-1">
              <span>❤️</span> <span>{likes.length}</span>
            </div>
            <div className="flex space-x-1">
              <span>🔄</span> <span>{reposts.length}</span>
            </div>
            <div className="flex space-x-1">
              <span>💬</span> <span>{discussions.length}</span>
              <button
                type="button"
                onClick={() => {
                  setShowReplies((prev) => !prev);
                }}
                className="hover:underline"
              >
                (show all)
              </button>
            </div>
          </div>
          <div className="pl-0 md:pl-6">
            <div className="flex -space-x-2">
              {authorImages}
              {otherAuthorsCount > 0 ? (
                <div className="flex items-center justify-center text-sm pl-4">
                  and {otherAuthorsCount} others.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <TwitterShare
          text={`${meta.title} ${gerritalex.domain}${pathname} via ${gerritalex.twitter}`}
        >
          Discuss on Twitter
        </TwitterShare>

        {showReplies ? (
          <div className="flex flex-col mt-4 space-y-4">
            {discussions.map((discussion) => {
              const author = discussion.author || {};

              return (
                <div
                  key={discussion['wm-id']}
                  className="p-4 md:p-6 rounded-lg shadow-md"
                >
                  <div className="flex flex-col space-y-2">
                    <div>
                      <img
                        className="inline rounded-full w-8 h-8 mr-2"
                        loading="lazy"
                        width={48}
                        height={48}
                        src={author.photo}
                        alt={author.name}
                      />
                      <ExternalLink href={author.url}>
                        <span className="font-bold">{author.name}</span>
                      </ExternalLink>
                      <span className="ml-1 text-sm text-theme-subtitle">
                        &middot;{' '}
                        {discussion?.published &&
                          repliesTimeTemplate.render(
                            new Date(discussion.published),
                          )}
                      </span>
                    </div>
                    <p className="text-theme-text">{discussion.content.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );
  }

  return null;
}
