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

async function getTmdbEntryById<Kind extends 'movie' | 'tv'>(
  id: number,
  kind: Kind
): Promise<Nullable<Kind extends 'movie' ? Movie : Series>> {
  return doFetch<Nullable<Kind extends 'movie' ? Movie : Series>>(
    `https://api.themoviedb.org/3/${kind}/${id}?language=en-US`,
    tmdbOptions
  );
}

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
