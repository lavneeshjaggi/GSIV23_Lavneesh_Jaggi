import moment from "moment";
import { Accumulator, Cast, Crew, Movie } from "./Types";

export const HEADER = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDgwOGU1ZDg3ZGQxY2U4NTBhY2M4Y2ExNzE4MWJmMyIsInN1YiI6IjY0ZGIyMThiZDEwMGI2MDBjNWQzMDI4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RBuemy3J6qcpgjQ_4xSj-BKwalmRsU358w59iHjfNyE",
  },
};

export const DEFAULT_MOVIE = {
  id: 0,
  title: "",
  adult: false,
  video: false,
  overview: "",
  popularity: 0,
  vote_count: 0,
  genre_ids: [],
  poster_path: "",
  release_date: "",
  vote_average: 0,
  backdrop_path: "",
  original_title: "",
  original_language: "",
};

export const calculateRows = (movies: Movie[]) => {
  const uniqueMovies = movies.reduce(
    (accumulator: Accumulator, currentItem: Movie) => {
      if (!accumulator.ids.has(currentItem.id)) {
        accumulator.ids.add(currentItem.id);
        accumulator.result.push(currentItem);
      }
      return accumulator;
    },
    { ids: new Set(), result: [] }
  ).result;

  const rows = [];
  const chunkSize = 5;

  for (let i = 0; i < uniqueMovies.length; i += chunkSize) {
    const chunk = uniqueMovies
      .filter((movie: Movie) => {
        const { poster_path, overview, title } = movie;
        return poster_path && overview && title;
      })
      .slice(i, i + chunkSize);

    if (chunk.length > 0) {
      rows.push(chunk);
    }
  }

  return rows;
};

export const calculateReleaseDate = (release_date: string) => {
  return moment(release_date).format("DD MMM YYYY");
};

export const getDirector = (crew: Crew[] | undefined) => {
  if (!crew) {
    return "";
  }
  return crew.find((item: Crew) => item.job === "Director")?.name || "";
};

export const getCast = (cast: Cast[] | undefined) => {
  if (!cast) {
    return "";
  }
  const maxVisibleMembers = 6;

  if (!cast || cast.length === 0) {
    return "";
  }

  const visibleCast = cast
    .slice(0, maxVisibleMembers)
    .map((item: Cast) => item.name);
  const remainingCount = cast.length - maxVisibleMembers;

  if (remainingCount > 0) {
    return `${visibleCast.join(", ")} ...`;
  } else {
    return visibleCast.join(", ");
  }
};
