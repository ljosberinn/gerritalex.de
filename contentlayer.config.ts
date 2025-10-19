import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer2/source-files';
import readingTime from 'reading-time';
import { slug } from 'github-slugger';
import path from 'path';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
// Remark packages
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { remarkAlert } from 'remark-github-blockquote-alert';
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js';
// Rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';
import siteMetadata from './data/siteMetadata';
import { allCoreContent, MDXDocumentDate, sortPosts } from 'pliny/utils/contentlayer.js';
import { createWriteStream } from 'fs';
import { writeFile, stat, readFile } from 'fs/promises';
import { doMoviesImport } from './prebuild/movies';
import { doSeriesImport } from './prebuild/series';
import { doDiscogsImport } from './prebuild/music';
import { spawn } from 'child_process';

async function downloadAndStoreImage(url: string, storagePath: string): Promise<void> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url);

    if (response.ok) {
      const stream = createWriteStream(storagePath);

      stream.on('finish', resolve);
      stream.on('close', reject);
      stream.on('error', reject);

      response.body?.pipeTo(
        new WritableStream({
          write(chunk) {
            stream.write(chunk);
          },
          close() {
            stream.end();
          },
        })
      );
    } else {
      console.error(`Response for ${url} was not ok [${response.status}]`);
      resolve();
    }
  });
}

async function downloadImages(images: Array<{ from: string; to: string }>) {
  await Promise.all(
    images.map((image) => {
      return downloadAndStoreImage(image.from, image.to);
    })
  );
}

const root = process.cwd();
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

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

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

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    includeImageInPreview: { type: 'boolean' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: async (doc) => {
        const { ctimeMs } = await stat(`data/${doc._raw.sourceFilePath}`);

        if (process.env.NODE_ENV !== 'production') {
          const hasChanges = await hasFileChanges(doc._raw.sourceFilePath);

          if (hasChanges) {
            const path = `data/${doc._raw.sourceFilePath}`;
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
          url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        };
      },
    },
  },
}));

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
async function createTagCount(allBlogs: MDXDocumentDate[]) {
  const tagCount = allBlogs.reduce<Record<string, number>>((acc, file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in acc) {
          acc[formattedTag] += 1;
        } else {
          acc[formattedTag] = 1;
        }
      });
    }

    return acc;
  }, {});

  await writeFile('./app/tag-data.json', JSON.stringify(tagCount));
}

async function createSearchIndex(allBlogs: MDXDocumentDate[]) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    await writeFile(
      `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    );
    console.log('Local search index generated...');
  }
}

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    bluesky: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}));

// (async () => {
//   const [...images] = await Promise.all([
//     doSeriesImport(),
//     doMoviesImport(),
//     doDiscogsImport(),
//   ]);

//   await downloadImages(images.flat());
// })();

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: icon,
        },
      ],
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const [allBlogs, ...images] = await Promise.all([
      importData().then(({ allBlogs }) => allBlogs),
    ]);

    await Promise.all([createTagCount(allBlogs), createSearchIndex(allBlogs)]);
  },
});
