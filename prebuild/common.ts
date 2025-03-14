export const tmdbOptions: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export const discogsOptions: RequestInit = {
  method: 'GET',
  headers: {
    'User-Agent': 'XepherisPersonalWebsite/1.0 +https://gerritalex.de/music',
  },
};

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w220_and_h330_face';

export type Nullable<T> = T | null;

export type PaginatedTMDBResult<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TMDBSharedResponseFields = {
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

export async function doFetch<T>(url: string, options: RequestInit): Promise<T | null> {
  url = url.replaceAll(' ', '%20');
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
  }
}
