import type { QueryResult } from 'react-query';
import { useQuery } from 'react-query';

type Author = {
  type: string;
  name: string;
  url: string;
  photo: string;
};

const endpoint = 'https://webmention.io/api/mentions.jf2?per-page=1000';

export type Webmentions = {
  authors: Author[];
  discussions: FeedItem[];
  reposts: FeedItem[];
  likes: FeedItem[];
};

type FeedItem = {
  type: 'entry';
  name: 'string';
  photo: 'string';
  author: Author;
  published: null | string;
  'wm-received': string;
  'wm-id': number;
  'wm-source': string;
  'wm-target': string;
  'like-of': string;
  'wm-property': string;
  'wm-private': string;
  content: {
    text: string;
  };
};

type Feed = {
  tyee: 'feed';
  name: 'Webmentions';
  children: FeedItem[];
};

export const useWebmention = (url: string): QueryResult<Webmentions> => {
  const finalUrl = `${endpoint}&target=${url}`;

  const initialState = {
    authors: [],
    discussions: [],
    likes: [],
    reposts: [],
  };

  return useQuery(finalUrl, async () => {
    try {
      const response = await fetch(finalUrl);
      const data: Feed = await response.json();

      return data?.children.reduce<Webmentions>((carry, dataset) => {
        const wmProperty = dataset?.['wm-property'];

        if (wmProperty) {
          switch (wmProperty) {
            case 'like-of':
              carry.likes.push(dataset);
              break;
            case 'in-reply-to':
            case 'mention-of':
              carry.discussions.push(dataset);
              break;
            case 'repost-of':
              carry.reposts.push(dataset);
          }
        }

        if (dataset.author.url) {
          carry.authors.push(dataset.author);
        }

        return carry;
      }, initialState);
    } catch {
      return initialState;
    }
  });
};
