import { MetadataRoute } from 'next';
import { allBlogs } from '../.contentlayer/generated';
import siteMetadata from '../data/siteMetadata';
import { stat } from 'fs/promises';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => {
      return {
        url: `${siteUrl}/${post.path}`,
        lastModified: post.structuredData.dateModified,
      };
    });

  const routes = await Promise.all(
    ['', 'blog', 'music', 'series', 'about', 'tags'].map(async (route) => {
      const { mtimeMs } = await stat(`app/${route}/page.tsx`);

      return {
        url: `${siteUrl}/${route}`,
        lastModified: new Date(mtimeMs).toISOString().split('T')[0],
      };
    })
  );

  return [...routes, ...blogRoutes];
}
