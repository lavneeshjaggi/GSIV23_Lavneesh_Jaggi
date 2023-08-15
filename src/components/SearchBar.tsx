import { ChangeEventHandler } from "react";
import { Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Box, AppBar, Toolbar, InputBase } from "@mui/material";

type Props = {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const SearchAppBar = (props: Props) => {
  const { handleChange } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <SearchStyles>
            <SearchIconWrapper style={{ color: "#999999" }}>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              onChange={handleChange}
              style={{ width: "30rem" }}
              inputProps={{ "aria-label": "search" }}
            />
          </SearchStyles>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const SearchStyles = styled("div")(({ theme }) => ({
  marginLeft: 0,
  width: "100%",
  color: "#555555",
  borderRadius: "8px",
  position: "relative",
  backgroundColor: "#d9d9d9",

  "&:hover": {
    backgroundColor: "#d9d9d9",
  },

  [theme.breakpoints.up("sm")]: {
    width: "auto",
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  pointerEvents: "none",
  justifyContent: "center",
  padding: theme.spacing(0, 2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    width: "100%",
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default SearchAppBar;
