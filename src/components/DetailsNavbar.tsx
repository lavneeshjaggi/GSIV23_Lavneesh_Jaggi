import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Paper, Typography } from "@mui/material";

const DetailsNavbar = () => {
  const navigate = useNavigate();

  const homeButton = () => {
    navigate("/");
  };

  return (
    <Box>
      <Paper
        style={{
          padding: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" color="gray">
          Movie Details
        </Typography>

        <IconButton onClick={homeButton}>
          <Home />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default DetailsNavbar;
