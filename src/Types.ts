export type Accumulator = {
  result: Movie[];
  ids: Set<unknown>;
};

export type Cast = {
  id: number;
  name: string;
  order: number;
  adult: boolean;
  gender: number;
  cast_id: number;
  character: string;
  credit_id: string;
  popularity: number;
  profile_path: string;
  original_name: string;
  known_for_department: string;
};

export type Crew = {
  id: number;
  job: string;
  name: string;
  adult: boolean;
  gender: number;
  credit_id: string;
  department: string;
  popularity: number;
  profile_path: string;
  original_name: string;
  known_for_department: string;
};

type Credits = {
  cast: Cast[];
  crew: Crew[];
};

export type Movie = {
  id: number;
  title: string;
  adult: boolean;
  video: boolean;
  runtime?: number;
  overview: string;
  credits?: Credits;
  popularity: number;
  vote_count: number;
  genre_ids: number[];
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  original_title: string;
  original_language: string;
};
