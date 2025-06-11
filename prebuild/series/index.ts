import {
  Nullable,
  doFetch,
  tmdbOptions,
  PaginatedTMDBResult,
  TMDBSharedResponseFields,
  TMDB_IMAGE_BASE,
} from '../common';
import data from './data.json' with { type: 'json' };
import { resolve } from 'path';
import { writeFile } from 'fs/promises';

function warn(...args: unknown[]) {
  console.log(`[Series]`, ...args);
}

type PaginatedShowResults = PaginatedTMDBResult<{
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

async function findEntryByName(name: string): Promise<Nullable<PaginatedShowResults>> {
  return doFetch<Nullable<PaginatedShowResults>>(
    `https://api.themoviedb.org/3/search/tv?query=${name.toLowerCase()}&include_adult=false&language=en-US&page=1`,
    tmdbOptions
  );
}
async function establishId(dataset: (typeof data)[number]): Promise<null | number> {
  if ('id' in dataset && dataset.id !== null) {
    return dataset.id;
  }

  if (!('title' in dataset)) {
    throw new Error(`Insufficent info given.`);
  }

  const response = await findEntryByName(dataset.title);

  if (response === null || response.results.length === 0) {
    warn(
      response === null
        ? `no response for "${dataset.title}"`
        : `ambiguous response, found multiple entries for "${dataset.title}"`,
      response?.results.map((result) => `https://www.themoviedb.org/tv/${result.id}`)
    );
    return null;
  }

  return response.results[0].id;
}

type Series = TMDBSharedResponseFields & {
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

async function getEntry(id: number): Promise<Nullable<Series>> {
  return doFetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, tmdbOptions);
}

export async function doSeriesImport(): Promise<{ from: string; to: string }[]> {
  console.time('doSeriesImport');

  const images: { from: string; to: string }[] = [];

  for await (const dataset of data) {
    if (
      typeof dataset.metadata === 'object' &&
      dataset.metadata !== null &&
      dataset.state !== 'upcoming' &&
      dataset.state !== 'ongoing'
    ) {
      continue;
    }

    const id = await establishId(dataset);

    if (!id) {
      continue;
    }

    const response = await getEntry(id);

    if (response === null) {
      warn(`no response for ${dataset.title}`);
      continue;
    }

    dataset.id = id;

    dataset.metadata = {
      genres: response.genres.map((genre) => genre.name),
      seasons: response.number_of_seasons,
      tagline: response.tagline,
      release: {
        day: -1,
        month: -1,
        year: -1,
      },
      episodes: response.number_of_episodes,
    };

    if (response.last_air_date) {
      const [year, month, day] = response.last_air_date.split('-');
      dataset.metadata.release.day = Number.parseInt(day);
      dataset.metadata.release.month = Number.parseInt(month);
      dataset.metadata.release.year = Number.parseInt(year);
    } else if (response.last_episode_to_air !== null) {
      const [year, month, day] = response.last_episode_to_air.air_date.split('-');
      dataset.metadata.release.day = Number.parseInt(day);
      dataset.metadata.release.month = Number.parseInt(month);
      dataset.metadata.release.year = Number.parseInt(year);
    }

    if (!('favorite' in dataset)) {
      // @ts-expect-error this is fine
      dataset.favorite = false;
    }

    if (!('episodesSeen' in dataset)) {
      // @ts-expect-error this is fine
      dataset.episodesSeen = 0;
    }

    const [year, month, day] = response.first_air_date.split('-');
    dataset.metadata.release.day = Number.parseInt(day);
    dataset.metadata.release.month = Number.parseInt(month);
    dataset.metadata.release.year = Number.parseInt(year);

    images.push({
      from: `${TMDB_IMAGE_BASE}${response.poster_path}`,
      to: resolve('./public/static/images/tv', `${id}-cover.jpg`),
    });
  }

  await writeFile(
    './prebuild/series/data.json',
    JSON.stringify(
      data.sort((a, b) => a.title.localeCompare(b.title)),
      null,
      2
    )
  );

  console.timeEnd('doSeriesImport');

  return images;
}
