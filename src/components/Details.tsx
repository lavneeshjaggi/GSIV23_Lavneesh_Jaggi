import { Grid, Typography } from "@mui/material";

import { getCast, calculateReleaseDate, getDirector } from "../Config";
import { Movie } from "../Types";

type Props = {
  movie: Movie;
};

const Details = (props: Props) => {
  const { movie } = props;

  const {
    title,
    credits,
    runtime,
    overview,
    poster_path,
    vote_average,
    release_date,
  } = movie;
  const { cast, crew } = credits || {};
  const allCast = getCast(cast);
  const director = getDirector(crew);
  const releaseDate = calculateReleaseDate(release_date);

  return (
    <Grid style={{ display: "flex", padding: "8px" }}>
      <Grid>
        <img
          alt={title}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          style={{
            width: "18rem",
            height: "21rem",
          }}
        />
      </Grid>

      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          marginLeft: "1rem",
          flexDirection: "column",
        }}
      >
        <Grid
          item
          style={{
            width: "18rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" color="gray">
            {title}
          </Typography>
          <Typography variant="h5" color="lightgray">
            {vote_average}
          </Typography>
        </Grid>

        <Grid item style={{ width: "30rem", justifyContent: "space-between" }}>
          <Typography variant="h6" color="darkgray">
            {`${releaseDate} | ${runtime} Min | ${director}`}
          </Typography>
        </Grid>

        <Grid item style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="darkgray">
            Cast: {allCast}
          </Typography>
        </Grid>

        <Grid item style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="darkgray">
            Description: {overview}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
