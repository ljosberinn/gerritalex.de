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
import music from './music.json' with { type: 'json' };

const discogsOptions: RequestInit = {
  method: 'GET',
  headers: {
    'User-Agent': 'XepherisPersonalWebsite/1.0 +https://gerritalex.de/music',
  },
};

const tmdbOptions: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

async function doFetch<T>(url: string, options: RequestInit): Promise<T | null> {
  url = url.replaceAll(' ', '%20');
  console.time(url);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(response.status);
    }
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
    `https://api.themoviedb.org/3/search/${kind}?query=${name.toLowerCase()}&include_adult=false&language=en-US&page=1`,
    tmdbOptions
  );
}

async function getTmdbEntryById<Kind extends 'movie' | 'tv'>(
  id: number,
  kind: Kind
): Promise<Nullable<Kind extends 'movie' ? Movie : Series>> {
  return doFetch<Nullable<Kind extends 'movie' ? Movie : Series>>(
    `https://api.themoviedb.org/3/${kind}/${id}?language=en-US`,
    tmdbOptions
  );
}

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

type TmdbApiSharedResponseFields = {
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

type Series = TmdbApiSharedResponseFields & {
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

type Movie = TmdbApiSharedResponseFields & {
  imdb_id: string;
  budget: number;
  revenue: number;
  runtime: number;
  video: boolean;
  release_date: string;
};

type ImageKind = 'cover' | 'backdrop';
type DiscogsImageKind = 'front' | 'back';

function resolvePathForTmdbImage(id: number, kind: ImageKind) {
  return resolvePath('./public/static/images/tv', `${id}-${kind}.jpg`);
}

function resolvePathForDiscogsImage(id: number, kind: DiscogsImageKind) {
  return resolvePath('./public/static/images/music', `${id}-${kind}.jpg`);
}

const FORCE_REFRESH = false;

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

async function downloadTmdbImages(
  images: Array<{ id: number; cover: string; backdrop: string | null }>
) {
  const imageKinds: ImageKind[] = ['cover', 'backdrop'];

  await Promise.all(
    imageKinds.flatMap((kind) =>
      images.map((image) => {
        return downloadAndStoreImage(
          `https://image.tmdb.org/t/p/w220_and_h330_face${image[kind]}`,
          resolvePathForTmdbImage(image.id, kind)
        );
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

    const path = resolvePathForTmdbImage(dataset.id, 'backdrop');

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

      newImages.push({
        id: dataset.id,
        cover: result.poster_path,
        backdrop: result.backdrop_path,
      });
    }
  }

  if (newImages.length > 0) {
    await downloadTmdbImages(newImages);

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

    const path = resolvePathForTmdbImage(dataset.id, 'backdrop');

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
        `enqueuing cover download of "${dataset.title}" (https://www.themoviedb.org/tv/${dataset.id})`
      );
      newImages.push({
        id: dataset.id,
        cover: result.poster_path,
        backdrop: result.backdrop_path,
      });
    }
  }

  if (newImages.length > 0) {
    await downloadTmdbImages(newImages);

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

    await Promise.all([
      createTagCount(allBlogs),
      createSearchIndex(allBlogs),
      importTmdbSeriesData(),
      importTmdbMoviesData(),
      importDiscogsData(),
    ]);
  },
});
