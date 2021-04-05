import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Search } from "./Seach";
import { useHistory } from "react-router-dom";
import {
  SearchResultsContext,
  SearchResultsController,
} from "../contexts/SearchResults";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      cursor: "pointer",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  })
);

export default function Navbar() {
  const classes = useStyles();

  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant='h6'
            noWrap
            onClick={() => history.push("/")}
          >
            Star Wars
          </Typography>
          <SearchResultsController>
            <Search />
          </SearchResultsController>
        </Toolbar>
      </AppBar>
    </div>
  );
}
