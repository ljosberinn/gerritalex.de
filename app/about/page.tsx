import { allAuthors } from '../../.contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { coreContent } from 'pliny/utils/contentlayer';
import AuthorLayout from '../../layouts/AuthorLayout';
import { generatePageMetadata } from '../seo';
import { components } from '../../components/MDXComponents';

export const metadata = generatePageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default');

  if (!author) {
    return null;
  }

  const mainContent = coreContent(author);

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} components={components} />
    </AuthorLayout>
  );
}
