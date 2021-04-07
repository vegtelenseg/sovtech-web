import React from "react";
import { Grid } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
// import StarsWarsAvatar from "../assets/images/starwars-avatar.svg";

import { Card } from "../components/Card";

interface HomeworldProps {
  name: string;
}

export interface PersonProps {
  name: string;
  gender: string;
  height: string;
  homeworld: HomeworldProps;
}

interface Props {
  person: PersonProps;
}

export const PersonCard = React.memo((props: Props) => {
  const { person } = props;
  const history = useHistory();
  const handleOnClick = React.useCallback(() => {
    history.push(`/person/${person.name}`);
  }, [history]);

  return (
    <Grid item>
      <Card
        onClick={handleOnClick}
        detailsText='More details'
        homeworld={person.homeworld.name}
        subtitle={person.gender}
        height={person.height}
        cover={"  "}
        logo={""}
        title={person.name}
      />
    </Grid>
  );
});
