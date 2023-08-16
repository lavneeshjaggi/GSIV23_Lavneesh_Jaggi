import { useMemo } from "react";
import { Grid, Typography } from "@mui/material";

import { Movie } from "../Types";
import MovieCard from "./MovieCard";
import { calculateRows } from "../Config";

type Props = {
  movies: Movie[];
  loading: boolean;
  showDetails: (id: number) => void;
};

const MovieRows = (props: Props) => {
  const { movies, loading, showDetails } = props;
  const rows = useMemo(() => calculateRows(movies), [movies]);

  return (
    <Grid
      container
      spacing={3}
      style={{ width: "100%", marginTop: "1rem", justifyContent: "center" }}
    >
      {rows.length === 0 ? (
        <Typography variant="h6" style={{ color: "#000000", width: "12rem" }}>
          {loading ? "Loading" : "No Movies Found"}
        </Typography>
      ) : (
        rows.map((row, rowIndex) => (
          <Grid
            item
            container
            spacing={3}
            key={rowIndex}
            justifyContent="center"
          >
            {row.map((movie: Movie) => {
              const { id, poster_path, title, vote_average, overview } = movie;

              return (
                <MovieCard
                  id={id}
                  key={id}
                  title={title}
                  overview={overview}
                  posterPath={poster_path}
                  showDetails={showDetails}
                  voteAverage={vote_average}
                />
              );
            })}
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default MovieRows;
