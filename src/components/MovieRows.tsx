import { useMemo } from "react";
import { Grid, Paper, Typography } from "@mui/material";

import { Movie } from "../Types";
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
                <Grid
                  item
                  key={id}
                  onClick={() => showDetails(id)}
                  style={{ minHeight: "18.9rem", cursor: "pointer" }}
                >
                  <Paper
                    style={{
                      height: "100%",
                      width: "15.9rem",
                      cursor: "pointer",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      alt={title}
                      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      style={{
                        width: "15.9rem",
                        height: "18.9rem",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />

                    <Grid
                      style={{
                        padding: "8px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography
                          variant="body2"
                          style={{
                            lineHeight: "1.4",
                            maxHeight: "2.8em",
                            overflow: "hidden",
                            WebkitLineClamp: 1,
                            marginTop: "0.5rem",
                            display: "-webkit-box",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            marginRight: "8px", // Add some spacing between the two elements
                          }}
                        >
                          {title}
                        </Typography>
                        <Typography variant="body2">{vote_average}</Typography>
                      </Grid>

                      <Grid>
                        <Typography
                          color="gray"
                          variant="body2"
                          style={{
                            lineHeight: "1.4",
                            maxHeight: "2.8em",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                            marginTop: "0.5rem",
                            display: "-webkit-box",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {overview}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default MovieRows;
