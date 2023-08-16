import { Grid, Paper, Typography } from "@mui/material";

type Props = {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  voteAverage: number;
  showDetails: (id: number) => void;
};

const MovieCard = (props: Props) => {
  const { id, title, overview, posterPath, showDetails, voteAverage } = props;

  return (
    <Grid
      item
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
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
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
                marginRight: "8px",
                maxHeight: "2.8em",
                overflow: "hidden",
                WebkitLineClamp: 1,
                marginTop: "0.5rem",
                display: "-webkit-box",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2">{voteAverage}</Typography>
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
};

export default MovieCard;
