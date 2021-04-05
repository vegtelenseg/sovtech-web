import React from "react";
import Slider, { Settings } from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

interface SlideShowProps extends React.PropsWithChildren<object> {
  title: string;
}

export const useSlideShowStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginLeft: "2rem",
  },
  slideItem: {
    minHeight: 200,
    background: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 .5rem",
    outline: "none",
    "&::focus": {
      outline: "none",
    },
  },
  slideItemContainer: {
    margin: "0 1rem 2rem",
  },
}));

export const Slideshow = (props: SlideShowProps) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const classes = useSlideShowStyles();
  const { title, children } = props;
  return (
    <div className={classes.slideItemContainer}>
      <Typography variant='h1' className={classes.title}>
        {title}
      </Typography>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
