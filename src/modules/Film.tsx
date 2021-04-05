import React from "react";
import { Slideshow, useSlideShowStyles } from "../components/Slideshow";
import { makeStyles, Typography } from "@material-ui/core";

export interface Film {
  title: string;
  episodeID: number;
  openingCrawl: string;
  director: string;
  producers: string[];
  releaseDate: string;
  created: string;
  edited: string;
  // details: FilmDetails
  id: string;
}

interface Props {
  films: Film[];
}

export const Films = (props: Props) => {
  const { films } = props;
  const classes = useSlideShowStyles();
  return (
    <Slideshow title='Films'>
      {films.map((film) => (
        <div className={classes.slideItemContainer}>
          <div className={classes.slideItem}>
            <Typography variant='h4'>{film.title}</Typography>
          </div>
        </div>
      ))}
    </Slideshow>
  );
};
