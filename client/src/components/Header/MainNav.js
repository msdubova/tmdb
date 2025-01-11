import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#10203f",
    zIndex: 100,
  },
  active: {
    color: "#ff4081",
  },
  inactive: {
    color: "white",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setValue(0);
    } else if (location.pathname === "/movies") {
      setValue(1);
    } else if (location.pathname === "/series") {
      setValue(2);
    } else if (location.pathname === "/search") {
      setValue(3);
    } else if (location.pathname === "/favorites") {
      setValue(4);
    }
  }, [location]);

  useEffect(() => {
    if (value === 0) {
      history.push("/");
    } else if (value === 1) {
      history.push("/movies");
    } else if (value === 2) {
      history.push("/series");
    } else if (value === 3) {
      history.push("/search");
    } else if (value === 4) {
      history.push("/favorites");
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        className={value === 0 ? classes.active : classes.inactive}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        className={value === 1 ? classes.active : classes.inactive}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        className={value === 2 ? classes.active : classes.inactive}
        label="TV Shows"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        className={value === 3 ? classes.active : classes.inactive}
        label="Search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        className={value === 4 ? classes.active : classes.inactive}
        label="Favorites"
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
  );
}
