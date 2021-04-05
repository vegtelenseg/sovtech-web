import React from "react";
import { Slideshow, useSlideShowStyles } from "../components/Slideshow";
import { makeStyles, Typography } from "@material-ui/core";

export interface VehicleProps {
  model: string;
  name: string;
  manufacturer: string;
}

interface Props {
  vehicles: VehicleProps[];
}

export const Vehicles = (props: Props) => {
  const { vehicles } = props;
  const classes = useSlideShowStyles();
  return vehicles.length > 0 ? (
    <Slideshow title='Vehicles'>
      {vehicles.map((vehicle) => (
        <div className={classes.slideItemContainer}>
          <div className={classes.slideItem}>
            <Typography variant='h4'>{vehicle.model}</Typography>
          </div>
        </div>
      ))}
    </Slideshow>
  ) : null;
};
