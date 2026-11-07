import { ListLayoutWithTags } from '../../layouts/ListLayoutWithTags';
import { allBlogs } from 'content-collections';
import { allCoreContent, sortPosts } from '../../lib/content';
import { generatePageMetadata } from '../seo';
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({ title: 'Blog' });

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs));

  return (
    <div className="mx-auto max-w-4xl xl:max-w-6xl">
      <ListLayoutWithTags posts={posts} title="All Posts" />
    </div>
  );
}
