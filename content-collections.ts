import { defineCollection, defineConfig } from '@content-collections/core';
import { compile } from '@mdx-js/mdx';
import { z } from 'zod';
import { slug } from 'github-slugger';
import path from 'path';
import { spawn } from 'child_process';
import { readFile, stat, writeFile } from 'fs/promises';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypePresetMinify from 'rehype-preset-minify';
import siteMetadata from './data/siteMetadata';
import { remarkImgToJsx, remarkTocHeadings, type TocItem } from './lib/mdx-plugins';
import { allCoreContent, sortPosts } from './lib/content';

const isProduction = process.env.NODE_ENV === 'production';

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
);

async function compileMdx(source: string): Promise<{ mdx: string; toc: TocItem[] }> {
  const file = await compile(source, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm, remarkTocHeadings, remarkImgToJsx, remarkAlert],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'prepend', content: icon }],
      [
        rehypePrettyCode,
        { theme: 'night-owl', keepBackground: false, defaultLang: { block: 'plaintext' } },
      ],
      rehypePresetMinify,
    ],
  });

  return { mdx: String(file), toc: file.data.toc as TocItem[] };
}

const isoDate = z.coerce.date().transform((date) => date.toISOString());

async function hasFileChanges(file: string) {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['diff', '--name-only']);

    let output = '';
    let errorOutput = '';

    git.stdout.on('data', (data) => {
      output += data.toString();
    });

    git.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    git.on('close', (code) => {
      if (code !== 0 && errorOutput) {
        reject(new Error(errorOutput.trim()));
      } else {
        resolve(output.trim().includes(file));
      }
    });

    git.on('error', (err) => {
      reject(err);
    });
  });
}

async function structuredData(
  doc: { title: string; date: string; summary?: string; images?: string | string[] },
  sourceFilePath: string,
  url: string
) {
  const { ctimeMs } = await stat(`data/${sourceFilePath}`);

  if (!isProduction) {
    const hasChanges = await hasFileChanges(sourceFilePath);

    if (hasChanges) {
      const path = `data/${sourceFilePath}`;
      const file = await readFile(path, 'utf-8');
      const date = new Date(ctimeMs).toISOString().split('T')[0];

      if (!file.includes(date)) {
        const lines = file.split('\n');

        const newFile = [
          '---',
          `lastmod: '${date}'`,
          ...lines.splice(1).filter((line) => !line.includes('lastmod: ')),
        ].join('\n');

        await writeFile(path, newFile, 'utf-8');
      }
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: doc.title,
    datePublished: doc.date,
    dateModified: new Date(ctimeMs).toISOString(),
    description: doc.summary,
    image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
    url: `${siteMetadata.siteUrl}/${url}`,
  };
}

function titleWithUpdate(title: string, date: string, lastmod?: string) {
  if (lastmod) {
    const updated = new Date(lastmod);
    const published = new Date(date);

    if (updated.getTime() - published.getTime() > 1000 * 60 * 60 * 24) {
      const [, month, day] = updated.toDateString().split(' ');
      return `[Updated ${month} ${day.startsWith('0') ? day.slice(1) : day}] ${title}`;
    }
  }

  return title;
}

const blogs = defineCollection({
  name: 'blogs',
  typeName: 'Blog',
  directory: 'data/blog',
  include: '**/*.mdx',
  schema: z.object({
    content: z.string(),
    title: z.string(),
    date: isoDate,
    tags: z.array(z.string()).default([]),
    lastmod: isoDate.optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    images: z.union([z.string(), z.array(z.string())]).optional(),
    authors: z.array(z.string()).optional(),
    layout: z.enum(['PostLayout', 'PostSimple', 'PostBanner']).optional(),
    canonicalUrl: z.string().optional(),
    includeImageInPreview: z.boolean().optional(),
    prefetch: z.boolean().optional(),
  }),
  transform: async ({ content, ...doc }, context) => {
    const { mdx, toc } = await context.cache(content, compileMdx);
    const sourceFilePath = `blog/${doc._meta.filePath}`;
    const docPath = `blog/${doc._meta.path}`;

    return {
      ...doc,
      title: titleWithUpdate(doc.title, doc.date, doc.lastmod),
      mdx,
      toc,
      slug: doc._meta.path,
      path: docPath,
      filePath: sourceFilePath,
      structuredData: await structuredData(doc, sourceFilePath, docPath),
    };
  },
  onSuccess: async (allBlogs) => {
    const tagCount: Record<string, number> = {};

    for (const post of allBlogs) {
      if (!isProduction || post.draft !== true) {
        for (const tag of post.tags) {
          const formattedTag = slug(tag);
          tagCount[formattedTag] = (tagCount[formattedTag] ?? 0) + 1;
        }
      }
    }

    const searchIndex = allCoreContent(sortPosts([...allBlogs])).map(
      ({ path, title, summary, date }) => ({ path, title, summary, date })
    );

    await Promise.all([
      writeFile('./app/tag-data.json', JSON.stringify(tagCount)),
      writeFile(
        `public/${path.basename(siteMetadata.search.searchDocumentsPath)}`,
        JSON.stringify(searchIndex)
      ),
    ]);
  },
});

const authors = defineCollection({
  name: 'authors',
  typeName: 'Authors',
  directory: 'data/authors',
  include: '**/*.mdx',
  schema: z.object({
    content: z.string(),
    name: z.string(),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
    company: z.string().optional(),
    email: z.string().optional(),
    twitter: z.string().optional(),
    bluesky: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    layout: z.string().optional(),
  }),
  transform: async ({ content, ...doc }, context) => {
    const { mdx, toc } = await context.cache(content, compileMdx);

    return {
      ...doc,
      mdx,
      toc,
      slug: doc._meta.path,
      path: `authors/${doc._meta.path}`,
      filePath: `authors/${doc._meta.filePath}`,
    };
  },
});

export default defineConfig({
  content: [blogs, authors],
});
