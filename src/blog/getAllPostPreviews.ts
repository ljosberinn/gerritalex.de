import type { ComponentType } from 'react';

import type { Author } from './authors';

const importAll = (r: __WebpackModuleApi.RequireContext) =>
  r.keys().map((fileName) => ({
    link: fileName.slice(1).replace(/\/index\.mdx$/u, ''),
    module: r(fileName),
  }));

const dateSortDesc = (a: string, b: string) => {
  if (a > b) {
    return -1;
  }

  if (a < b) {
    return 1;
  }

  return 0;
};

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  image: string;
  authors: Author[];
  readingTime: string;
};

/** This is what is exported out of a .mdx file */
export type Post = {
  link: string;
  module: {
    default: ComponentType;
    meta: PostMeta;
  };
};

export function getAllPostPreviews(): Post[] {
  return importAll(
    require.context('../pages/?preview', true, /\.mdx$/u),
  ).sort((a: Post, b: Post) =>
    dateSortDesc(a.module.meta.date, b.module.meta.date),
  );
}
