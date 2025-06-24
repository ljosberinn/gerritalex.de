import {
  tmdbOptions,
  PaginatedTMDBResult,
  doFetch,
  Nullable,
  TMDBSharedResponseFields,
  TMDB_IMAGE_BASE,
} from '../common';
import data from './data.json' with { type: 'json' };
import { resolve } from 'path';
import { writeFile, stat } from 'fs/promises';

function warn(...args: unknown[]) {
  console.log(`[Movies]`, ...args);
}

type PaginatedMovieResults = PaginatedTMDBResult<{
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

async function findEntryByName(name: string): Promise<Nullable<PaginatedMovieResults>> {
  return doFetch<Nullable<PaginatedMovieResults>>(
    `https://api.themoviedb.org/3/search/movie?query=${name.toLowerCase()}&include_adult=false&language=en-US&page=1`,
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
      response?.results.map((result) => `https://www.themoviedb.org/movie/${result.id}`)
    );
    return null;
  }

  return response.results[0].id;
}

type Movie = TMDBSharedResponseFields & {
  imdb_id: string;
  budget: number;
  revenue: number;
  runtime: number;
  video: boolean;
  release_date: string;
  title: string;
  original_title: string;
};

async function getEntry(id: number): Promise<Movie | null> {
  return doFetch<Nullable<Movie>>(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    tmdbOptions
  );
}

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

export async function doMoviesImport(): Promise<{ from: string; to: string }[]> {
  console.time('doMoviesImport');

  const images: { from: string; to: string }[] = [];

  for await (const dataset of data) {
    let refetch = false;

    if (
      'metadata' in dataset &&
      dataset.metadata?.release &&
      dataset.metadata.release.year &&
      dataset.metadata.release.month &&
      dataset.metadata.release.day
    ) {
      // set refetch to true of the date is in the future
      const { year, month, day } = dataset.metadata.release;

      if (year > currentYear) {
        refetch = true;
      } else if (year === currentYear && month > currentMonth) {
        refetch = true;
      } else if (year === currentYear && month === currentMonth && day > currentDay) {
        refetch = true;
      }
    }

    if (
      !refetch &&
      typeof dataset.metadata === 'object' &&
      dataset.metadata !== null &&
      !('imageMissing' in dataset)
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

    if (response.title) {
      dataset.title = response.title;
    }

    dataset.metadata = {
      genres: response.genres.map((genre) => genre.name),
      tagline: response.tagline,
      release: {
        day: -1,
        month: -1,
        year: -1,
      },
      runtime: response.runtime,
    };

    if (!('favorite' in dataset)) {
      // @ts-expect-error this is fine
      dataset.favorite = false;
    }

    const [year, month, day] = response.release_date.split('-');
    dataset.metadata.release.day = Number.parseInt(day);
    dataset.metadata.release.month = Number.parseInt(month);
    dataset.metadata.release.year = Number.parseInt(year);

    const imagePath = resolve('./public/static/images/tv', `${id}-cover.jpg`);

    if (response.poster_path) {
      images.push({
        from: `${TMDB_IMAGE_BASE}${response.poster_path}`,
        to: imagePath,
      });
    }

    try {
      await stat(imagePath);
      if ('imageMissing' in dataset) {
        delete dataset.imageMissing;
      }
    } catch {
      // @ts-expect-error this is fine
      dataset.imageMissing = true;
    }
  }

  await writeFile(
    './prebuild/movies/data.json',
    JSON.stringify(
      data.sort((a, b) => a.title.localeCompare(b.title)),
      null,
      2
    )
  );

  console.timeEnd('doMoviesImport');

  return images;
}
