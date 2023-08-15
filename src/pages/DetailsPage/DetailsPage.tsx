import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Movie } from "../../Types";
import Details from "../../components/Details";
import { DEFAULT_MOVIE, HEADER } from "../../Config";
import DetailsNavbar from "../../components/DetailsNavbar";

const DetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState<Movie>(DEFAULT_MOVIE);
  const [loading, setLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    try {
      const id = params.id;
      const parameters = { append_to_response: "credits" };
      const url = `https://api.themoviedb.org/3/movie/${id}`;
      const response = await axios.get(
        `${url}?${new URLSearchParams(parameters)}`,
        HEADER
      );

      setLoading(false);
      setMovie(response.data);
    } catch (error) {
      console.log({ error });
    }
  }, [params.id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <Box>
      <DetailsNavbar />

      <Grid container alignItems="center" style={{ marginTop: "1rem" }}>
        {loading ? (
          <Typography variant="h6" style={{ color: "#000000", width: "12rem" }}>
            Loading
          </Typography>
        ) : (
          <Details movie={movie} />
        )}
      </Grid>
    </Box>
  );
};

export default DetailsPage;
