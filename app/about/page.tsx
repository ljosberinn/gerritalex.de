import { allAuthors } from 'content-collections';
import { MDXContent } from '../../components/MDXContent';
import { coreContent } from '../../lib/content';
import AuthorLayout from '../../layouts/AuthorLayout';
import { generatePageMetadata } from '../seo';
import { components } from '../../components/MDXComponents';
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default');

  if (!author) {
    return null;
  }

  const mainContent = coreContent(author);

  return (
    <AuthorLayout content={mainContent}>
      <MDXContent code={author.mdx} components={components} />
    </AuthorLayout>
  );
}
