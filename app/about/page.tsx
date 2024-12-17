import { allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import AuthorLayout from '@/layouts/AuthorLayout';
import { coreContent } from 'pliny/utils/contentlayer';
import { generatePageMetadata } from 'app/seo';

export const metadata = generatePageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default');

  if (!author) {
    return null;
  }

  const mainContent = coreContent(author);

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  );
}
