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
import rehypeKatex from 'rehype-katex';
import rehypeKatexNoTranslate from 'rehype-katex-notranslate';
import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';
import siteMetadata from './data/siteMetadata';
import { allCoreContent, MDXDocumentDate, sortPosts } from 'pliny/utils/contentlayer.js';
import { createWriteStream } from 'fs';
import { writeFile } from 'fs/promises';
import { resolve as resolvePath } from 'path';
import music from './music.json' with { type: 'json' };
import { doMoviesImport } from './prebuild/movies';
import { doSeriesImport } from './prebuild/series';

type DiscogsSearchResponse = {
  pagination: {
    items: number;
    page: number;
    pages: number;
    per_page: number;
    urls: Record<string, unknown>;
  };
  results: Array<{
    barcode: string[];
    catno: string;
    community: {
      want: number;
      have: number;
    };
    country: string;
    cover_image: string;
    format: string[];
    format_quantity: number;
    genre: string[];
    formats: { namme: string; qty: string; text: string; descriptions: string[] };
    id: number;
    label: string[];
    master_id: number;
    master_url: string;
    resource_url: string;
    style: string[];
    thumb: string;
    title: string;
    type: string;
    uri: string;
    user_data: {
      in_wantlist: boolean;
      in_collection: boolean;
    };
    year: string;
  }>;
};

type DiscogsMasterResponse = {
  id: number;
  main_release: number;
  most_recent_release: number;
  resource_url: string;
  uri: string;
  versions_url: string;
  main_release_url: string;
  most_recent_release_url: string;
  num_for_sale: number;
  lowest_price: number;
  images: [
    {
      type: string;
      uri: string;
      resource_url: string;
      uri150: number;
      width: number;
      height: number;
    },
  ];
  genres: string[];
  styles: string[];
  year: number;
  tracklist: {
    position: string;
    type_: string;
    title: string;
    duration: string;
    extraartists?: {
      name: string;
      anv: string;
      join: string;
      role: string;
      tracks: string;
      id: number;
      resource_url: string;
    }[];
  }[];
  artists: {
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    id: number;
    resource_url: string;
  }[];
  title: string;
  data_quality: string;
  videos: {
    uri: string;
    title: string;
    description: null | string;
    duration: number;
    embed: boolean;
  }[];
};

type DiscogsReleaseResponse = {
  id: number;
  status: string;
  year: number;
  resource_url: string;
  uri: string;
  artists: {
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    id: number;
    resource_url: string;
    thumbnail_url: string;
  }[];
  artists_sort: string;
  labels: {
    name: string;
    catno: string;
    entity_type: string;
    entity_type_name: string;
    id: number;
    resource_url: string;
    thumbnail_url: string;
  }[];
  series: unknown[];
  companies: {
    name: string;
    catno: string;
    entity_type: string;
    entity_type_name: string;
    id: number;
    resource_url: string;
    thumbnail_url: string;
  }[];
  formats: { namme: string; qty: string; text: string; descriptions: string[] }[];
  data_quality: string;
  community: {
    have: number;
    want: number;
    rating: {
      count: number;
      average: number;
    };
    submitter: {
      username: string;
      resource_url: string;
    };
    contributors: { username: string; resource_url: string }[];
    data_quality: string;
    status: string;
  };
  format_quantity: number;
  date_added: string;
  date_changed: string;
  num_for_sale: number;
  lowest_price: number;
  master_id: number;
  master_url: string;
  title: string;
  country: string;
  released: string;
  notes: string;
  released_formatted: string;
  identifiers: { type: string; value: string; description?: string }[];
  videos: { uri: string; title: string; description: string; embed: boolean }[];
  genres: string[];
  styles: string[];
  tracklist: {
    position: string;
    type_: string;
    title: string;
    duration: string;
  }[];
  extraartists: {
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    id: number;
    resource_url: string;
  }[];
  images: {
    type: string;
    uri: string;
    resource_url: string;
    uri150: string;
    width: number;
    height: number;
  }[];
  thumb: string;
  estimated_weight: number;
  blocked_from_sale: boolean;
};

async function getDiscogsEntryByArtistAndRelease(artist: string, album: string) {
  return doFetch<Nullable<DiscogsSearchResponse>>(
    `https://api.discogs.com/database/search?q=${artist}%20${album}&type=release&token=${process.env.DISCOGS_API_KEY}`,
    discogsOptions
  );
}

async function getDiscogsMasterEntryById(id: number) {
  return doFetch<Nullable<DiscogsMasterResponse>>(
    `https://api.discogs.com/masters/${id}?token=${process.env.DISCOGS_API_KEY}`,
    discogsOptions
  );
}

async function getDiscogsMainReleaseById(id: number) {
  return doFetch<Nullable<DiscogsReleaseResponse>>(
    `https://api.discogs.com/releases/${id}?token=${process.env.DISCOGS_API_KEY}`,
    discogsOptions
  );
}

type DiscogsImageKind = 'front' | 'back';

function resolvePathForDiscogsImage(id: number, kind: DiscogsImageKind) {
  return resolvePath('./public/static/images/music', `${id}-${kind}.jpg`);
}

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
      reject(`Response for ${url} was not ok [${response.status}]`);
    }
  });
}

async function downloadDiscogsImages(
  images: Array<{ id: number; front: string; back: string | null }>
): Promise<void> {
  const imageKinds: DiscogsImageKind[] = ['front', 'back'];

  await Promise.all(
    imageKinds.flatMap((kind) =>
      images.map((image) => {
        const url = image[kind];
        if (!url) {
          return Promise.resolve();
        }

        return downloadAndStoreImage(url, resolvePathForDiscogsImage(image.id, kind));
      })
    )
  );
}

// async function downloadTmdbImages(
//   images: Array<{ id: number; cover: string; backdrop: string | null }>
// ) {
//   const imageKinds: ImageKind[] = ['cover', 'backdrop'];

//   await Promise.all(
//     imageKinds.flatMap((kind) =>
//       images.map((image) => {
//         return downloadAndStoreImage(
//           `https://image.tmdb.org/t/p/w220_and_h330_face${image[kind]}`,
//           resolvePathForTmdbImage(image.id, kind)
//         );
//       })
//     )
//   );
// }

const discogsEnabled = false;

async function importDiscogsData() {
  console.time('importDiscogsData');

  if (discogsEnabled) {
    const newImages: Array<{ id: number; front: string; back: string | null }> = [];
    let processed = 0;
    let hasChanges = false;

    for await (const dataset of music) {
      if (!dataset.visible) {
        continue;
      }

      if (processed == 10) {
        console.warn('Sleeping for 65s');
        await new Promise((resolve) => setTimeout(resolve, 65 * 1000));
        processed = 0;
      }

      if (!dataset.id) {
        continue;
      }

      let mainReleaseData: Nullable<DiscogsReleaseResponse> = null;

      if (dataset.id) {
        mainReleaseData = await getDiscogsMainReleaseById(dataset.id);
      } else {
        const searchResponse = await getDiscogsEntryByArtistAndRelease(
          dataset.artist,
          dataset.album
        );

        if (searchResponse === null) {
          continue;
        }

        if (searchResponse.results.length === 0) {
          console.error(`No results for ${dataset.artist} ${dataset.album}`);
          continue;
        }

        const [topResult] = searchResponse.results;

        if (topResult.master_id > 0) {
          const masterData = await getDiscogsMasterEntryById(searchResponse.results[0].master_id);

          if (!masterData) {
            continue;
          }

          mainReleaseData = await getDiscogsMainReleaseById(masterData.main_release);
        } else {
          mainReleaseData = await getDiscogsMainReleaseById(topResult.id);
        }
      }

      if (!mainReleaseData) {
        continue;
      }

      const totalRuntimeInSeconds = mainReleaseData.tracklist.reduce((acc, track) => {
        const [minutes, seconds] = track.duration.split(':');
        return acc + Number.parseInt(minutes) * 60 + Number.parseInt(seconds);
      }, 0);

      dataset.id = mainReleaseData.id;

      dataset.metadata = {
        genres: mainReleaseData.styles,
        release: {
          year: mainReleaseData.year,
        },
        runtime: totalRuntimeInSeconds,
      };

      hasChanges = true;

      let frontCover = mainReleaseData.images.find((image) => image.type === 'primary');

      if (!frontCover && mainReleaseData.images.length === 1) {
        frontCover = mainReleaseData.images[0];
      }

      if (!frontCover) {
        console.warn(`No primary image found for ${dataset.artist} - ${dataset.album}`);
        continue;
      }

      const backCover = mainReleaseData.images.find((image) => image.type === 'secondary');

      newImages.push({
        id: mainReleaseData.id,
        front: frontCover.uri,
        back: backCover?.uri ?? null,
      });

      processed += 1;
    }

    if (newImages.length > 0) {
      await downloadDiscogsImages(newImages);
    }

    if (hasChanges) {
      await writeFile(
        './music.json',
        JSON.stringify(
          music.sort((a, b) => {
            const byArtist = a.artist.localeCompare(b.artist);

            if (byArtist === 0) {
              return a.album.localeCompare(b.album);
            }

            return byArtist;
          }),
          null,
          2
        )
      );
    }
  }

  console.timeEnd('importDiscogsData');
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
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
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
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      rehypeKatexNoTranslate,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData();

    const [seriesImages, movieImages] = await Promise.all([doSeriesImport(), doMoviesImport()]);

    console.log(seriesImages, movieImages);

    await Promise.all([createTagCount(allBlogs), createSearchIndex(allBlogs), importDiscogsData()]);
  },
});
