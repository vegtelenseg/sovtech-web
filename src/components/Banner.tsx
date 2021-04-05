import React from "react";
import { OpeningCrawl } from "./OpeningCrawl";
import { makeStyles } from "@material-ui/core/styles";
import { PersonDetailsProps } from "../modules/PersonDetails";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 600,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    paddingLeft: "2rem",
    marginBottom: "3rem",
  },
}));

interface Props {
  person: PersonDetailsProps;
  isHomePage?: boolean;
}

export const Banner = (props: Props) => {
  const classes = useStyles();
  const { person, isHomePage } = props;
  return (
    <div className={classes.root}>
      {isHomePage ? (
        <div>
          <Typography variant='h3'>Welcome to Star Wars Explorer</Typography>
          <Typography variant='h6'>
            Click More Details on the following characters, to explore them.
          </Typography>
        </div>
      ) : (
        <div>
          <Typography variant='h3'>{`Name: ${person.name}`}</Typography>
          <Typography variant='h4'>{`Height: ${person.height} cm`}</Typography>
          <Typography variant='h4'>{`Mass: ${person.mass} kg`}</Typography>
          <Typography variant='h5'>{`Gender: ${person.gender}`}</Typography>
        </div>
      )}
    </div>
  );
};
