import 'css/prism.css';
import 'katex/dist/katex.css';

import { components } from '@/components/MDXComponents';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import PostSimple from '@/layouts/PostSimple';
import PostLayout from '@/layouts/PostLayout';
import PostBanner from '@/layouts/PostBanner';
import { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';
import { notFound } from 'next/navigation';
import RestrainedMaxWidth from '@/components/RestrainedMaxWidth';

const defaultLayout = 'PostLayout';
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));
  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    return;
  }

  const authorList = post.authors || ['default'];
  const authorDetails = authorList.reduce((acc, author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    if (!authorResults) {
      return acc;
    }

    return [...acc, coreContent(authorResults)];
  }, []);

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  const authors = authorDetails.map((author) => author.name);
  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => ({
    url: img.includes('http') ? img : siteMetadata.siteUrl + img,
  }));

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }));
};

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs));
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];
  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    return null;
  }

  const authorList = post.authors || ['default'];
  const authorDetails = authorList.reduce((acc, author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    if (!authorResults) {
      return acc;
    }

    return [...acc, coreContent(authorResults)];
  }, []);
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;
  jsonLd.author = authorDetails.map((author) => ({
    '@type': 'Person',
    name: author.name,
  }));

  const Layout = layouts[post.layout || defaultLayout];

  return (
    <RestrainedMaxWidth>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </RestrainedMaxWidth>
  );
}
