import axios from "axios";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { Movie } from "../../Types";
import { HEADER } from "../../Config";
import MovieRows from "../../components/MovieRows";
import SearchAppBar from "../../components/SearchBar";

let page = 1;
let query = "";
let debounceTimeout: number;
const setPage = (value: number) => (page = value);

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = useCallback(
    async (url: string, parameters: Record<string, string>) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${url}?${new URLSearchParams(parameters)}`,
          HEADER
        );
        const results: Movie[] = response.data.results;

        if (
          !results.length ||
          results.every((result, index) => result === movies[index])
        ) {
          setLoading(false);
          return;
        }

        setLoading(false);
        setPage(Number(parameters.page) + 1);
        setMovies((prevItems: Movie[]) => [...prevItems, ...results]);
      } catch (error) {
        console.error({ error });
      }
    },
    [movies]
  );

  const searchMovies = useCallback(async () => {
    const parameters = {
      query,
      language: "en-US",
      page: String(page),
      include_adult: String(false),
    };
    await fetchMovies(`https://api.themoviedb.org/3/search/movie`, parameters);
  }, [fetchMovies]);

  const discoverMovies = useCallback(async () => {
    const shouldLoadMore =
      window.outerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 600;

    if (!shouldLoadMore) {
      return;
    }

    if (query) {
      searchMovies();
      return;
    }

    const parameters = {
      language: "en-US",
      page: String(page),
      include_adult: String(false),
      include_video: String(false),
      sort_by: "primary_release_date.desc",
    };
    await fetchMovies(
      `https://api.themoviedb.org/3/discover/movie`,
      parameters
    );
  }, [fetchMovies, searchMovies]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      query = newQuery;

      if (query) {
        page = 1;
        setMovies([]);
        searchMovies();
      } else {
        page = 1;
        setMovies([]);
        discoverMovies();
      }
    }, 600);
  };

  const showDetails = (id: number) => {
    page = 1;
    query = "";
    navigate(`/${id}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", discoverMovies);
    discoverMovies();
    return () => {
      window.removeEventListener("scroll", discoverMovies);
    };
  }, [discoverMovies]);

  return (
    <Box>
      <Grid>
        <SearchAppBar handleChange={handleChange} />
      </Grid>

      <Grid>
        <MovieRows
          movies={movies}
          loading={loading}
          showDetails={showDetails}
        />
      </Grid>
    </Box>
  );
};

export default HomePage;
