import { ListLayoutWithTags } from '../../layouts/ListLayoutWithTags';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from '../../.contentlayer/generated';
import { generatePageMetadata } from '../seo';

export const metadata = generatePageMetadata({ title: 'Blog' });

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs));

  return (
    <div className="mx-auto max-w-4xl xl:max-w-6xl">
      <ListLayoutWithTags posts={posts} title="All Posts" />
    </div>
  );
}
