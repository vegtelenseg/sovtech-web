import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Paginate from "./Paginate";
import { PaginationContext } from "../contexts/PaginationContext";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const People = () => {
  const classes = useStyles();
  const { data } = React.useContext(PaginationContext);
  const history = useHistory();

  return (
    <div>
      {data &&
        data.people &&
        data.people.map((person: any) => (
          <Card className={classes.root} key={person.name}>
            <CardContent>
              <Typography
                color='textSecondary'
                gutterBottom
                variant='h5'
                component='h2'
              >
                Name: {person?.name}
              </Typography>
              <Typography>Height: {person.height}</Typography>
              <Typography className={classes.pos} color='textSecondary'>
                Gender: {person.gender}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                variant='contained'
                color='primary'
                onClick={() => history.push(`/person/${person.name}`)}
              >
                More details
              </Button>
            </CardActions>
            <Divider />
          </Card>
        ))}
      <Paginate />
    </div>
  );
};
