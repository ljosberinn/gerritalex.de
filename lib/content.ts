export type CoreContent<T> = Omit<T, 'mdx' | '_meta'>;

const isProduction = process.env.NODE_ENV === 'production';

export function sortPosts<T extends { date: string }>(posts: T[]): T[] {
  return posts.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
}

export function coreContent<T extends { mdx: string; _meta: unknown }>(doc: T): CoreContent<T> {
  const { mdx, _meta, ...rest } = doc;
  return rest;
}

export function allCoreContent<T extends { mdx: string; _meta: unknown; draft?: boolean }>(
  docs: T[]
): CoreContent<T>[] {
  const core = docs.map((doc) => coreContent(doc));
  return isProduction ? core.filter((doc) => doc.draft !== true) : core;
}

export function formatDate(date: string, locale = 'en-US'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
