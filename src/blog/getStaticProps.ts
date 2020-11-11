import type { GetStaticPropsResult } from 'next';

import { getAllPostPreviews } from './getAllPostPreviews';

export function getStaticProps(): GetStaticPropsResult<{
  posts: { link: string; title: string }[];
}> {
  return {
    props: {
      posts: getAllPostPreviews().map((post) => {
        return {
          link: post.link,
          title: post.module.meta.title,
        };
      }),
    },
  };
}
