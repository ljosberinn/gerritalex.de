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
import { stat, writeFile } from 'fs/promises';
import { resolve as resolvePath } from 'path';
import series from './series.json' with { type: 'json' };
import movies from './movies.json' with { type: 'json' };

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

async function doFetch<T>(url: string): Promise<T | null> {
  console.time(url);
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    console.timeEnd(url);
  }
}

type PaginatedResult<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

type PaginatedShowResults = PaginatedResult<{
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}>;

type PaginatedMovieResults = PaginatedResult<{
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  video: false;
  vote_average: number;
  vote_count: number;
}>;

type Nullable<T> = T | null;

async function findTmdbEntryByName<Kind extends 'movie' | 'tv'>(
  name: string,
  kind: Kind
): Promise<Nullable<Kind extends 'movie' ? PaginatedMovieResults : PaginatedShowResults>> {
  return doFetch<Nullable<Kind extends 'movie' ? PaginatedMovieResults : PaginatedShowResults>>(
    `https://api.themoviedb.org/3/search/${kind}?query=${name.toLowerCase()}&include_adult=false&language=en-US&page=1`
  );
}

async function getTmdbEntryById<Kind extends 'movie' | 'tv'>(
  id: number,
  kind: Kind
): Promise<Nullable<Kind extends 'movie' ? Movie : Series>> {
  return doFetch<Nullable<Kind extends 'movie' ? Movie : Series>>(
    `https://api.themoviedb.org/3/${kind}/${id}?language=en-US`
  );
}

type TmdbApiResponseShared = {
  adult: boolean;
  backdrop_path: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  homepage: string;
};

type Series = TmdbApiResponseShared & {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  name: string;
  next_episode_to_air: null;
  networks: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];

  type: string;
};

type Movie = TmdbApiResponseShared & {
  imdb_id: string;
  budget: number;
  revenue: number;
  runtime: number;
  video: boolean;
  release_date: string;
};

type ImageKind = 'cover' | 'backdrop';

function resolvePathForImageId(id: number, kind: ImageKind) {
  return resolvePath('./public/static/images/tv', `${id}-${kind}.jpg`);
}

const FORCE_REFRESH = false;

async function downloadImages(images: Array<{ id: number; cover: string; backdrop: string }>) {
  const imageKinds: ImageKind[] = ['cover', 'backdrop'];

  await Promise.all(
    imageKinds.flatMap((kind) =>
      images.map((image) => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          const url = `https://image.tmdb.org/t/p/w220_and_h330_face${image[kind]}`;
          const response = await fetch(url);

          if (response.ok) {
            const stream = createWriteStream(resolvePathForImageId(image.id, kind));

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
            reject(`Response for ${image.id} was not ok, fetching cover [${response.status}]`);
          }
        });
      })
    )
  );
}

async function importTmdbSeriesData() {
  console.time('importTmdbSeriesData');

  const newImages: Array<{ id: number; cover: string; backdrop: string }> = [];

  for await (const dataset of series) {
    if (dataset.metadata !== null) {
      continue;
    }

    if (dataset.id === null) {
      const result = await findTmdbEntryByName(dataset.title, 'tv');

      if (result === null || result.results.length === 0) {
        continue;
      }

      dataset.id = result.results[0].id;
    }

    const path = resolvePathForImageId(dataset.id, 'backdrop');

    try {
      await stat(path);

      if (FORCE_REFRESH) {
        throw new Error('Refreshing anyway.');
      }
    } catch {
      const result = await getTmdbEntryById(dataset.id, 'tv');

      if (result === null) {
        continue;
      }

      dataset.metadata = {
        genres: result.genres.map((genre) => genre.name),
        seasons: result.number_of_seasons,
        tagline: result.tagline,
        release: {
          day: -1,
          month: -1,
          year: -1,
        },
        episodes: result.number_of_episodes,
      };

      if (result.last_air_date) {
        const [year, month, day] = result.last_air_date.split('-');
        dataset.metadata.release.day = Number.parseInt(day);
        dataset.metadata.release.month = Number.parseInt(month);
        dataset.metadata.release.year = Number.parseInt(year);
      } else if (result.last_episode_to_air !== null) {
        const [year, month, day] = result.last_episode_to_air.air_date.split('-');
        dataset.metadata.release.day = Number.parseInt(day);
        dataset.metadata.release.month = Number.parseInt(month);
        dataset.metadata.release.year = Number.parseInt(year);
      }

      if (result.poster_path === null) {
        continue;
      }

      console.log(
        `[PREBUILD] enqueuing cover download of "${dataset.title}" (https://www.themoviedb.org/tv/${dataset.id})`
      );
      newImages.push({
        id: dataset.id,
        cover: result.poster_path,
        backdrop: result.backdrop_path,
      });
    }
  }

  if (newImages.length > 0) {
    await downloadImages(newImages);

    await writeFile(
      './series.json',
      JSON.stringify(
        series.sort((a, b) => a.title.localeCompare(b.title)),
        null,
        2
      )
    );
  }

  console.timeEnd('importTmdbSeriesData');
}

async function importTmdbMoviesData() {
  console.time('importTmdbMoviesData');

  const newImages: Array<{ id: number; cover: string; backdrop: string }> = [];

  for await (const dataset of movies) {
    if (dataset.metadata !== null) {
      continue;
    }

    if (dataset.id === null) {
      const result = await findTmdbEntryByName(dataset.title, 'movie');

      if (result === null || result.results.length === 0) {
        continue;
      }

      dataset.id = result.results[0].id;
    }

    const path = resolvePathForImageId(dataset.id, 'backdrop');

    try {
      await stat(path);

      if (FORCE_REFRESH) {
        throw new Error('Refreshing anyway.');
      }
    } catch {
      const result = await getTmdbEntryById(dataset.id, 'movie');

      if (result === null) {
        continue;
      }

      dataset.metadata = {
        genres: result.genres.map((genre) => genre.name),
        tagline: result.tagline,
        release: {
          day: -1,
          month: -1,
          year: -1,
        },
        runtime: result.runtime,
      };

      const [year, month, day] = result.release_date.split('-');
      dataset.metadata.release.day = Number.parseInt(day);
      dataset.metadata.release.month = Number.parseInt(month);
      dataset.metadata.release.year = Number.parseInt(year);

      if (result.poster_path === null) {
        continue;
      }

      console.log(
        `[PREBUILD] enqueuing cover download of "${dataset.title}" (https://www.themoviedb.org/tv/${dataset.id})`
      );
      newImages.push({
        id: dataset.id,
        cover: result.poster_path,
        backdrop: result.backdrop_path,
      });
    }
  }

  if (newImages.length > 0) {
    await downloadImages(newImages);

    await writeFile(
      './movies.json',
      JSON.stringify(
        movies.sort((a, b) => a.title.localeCompare(b.title)),
        null,
        2
      )
    );
  }

  console.timeEnd('importTmdbMoviesData');
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

    await Promise.all([
      createTagCount(allBlogs),
      createSearchIndex(allBlogs),
      importTmdbSeriesData(),
      importTmdbMoviesData(),
    ]);
  },
});
