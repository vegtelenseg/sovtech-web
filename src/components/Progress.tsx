import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// import StarWarsLogo from "../assets/images/starwars.svg";
import { Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    zIndex: 99999,
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export const Progress = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Backdrop open={true}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>
    </div>
  );
};
