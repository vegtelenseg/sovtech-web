import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { PersonProps } from "../modules/Person";
import { useHistory } from "react-router";
import { SearchResultsContext } from "../contexts/SearchResults";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      position: "absolute",
      top: "4rem",
      right: "0.5rem",
      zIndex: 9999,
      boxShadow: "0px 2px 19px #b74517",
      borderRadius: "1rem",
      backgroundColor: theme.palette.background.paper,
    },
    listItemText: {
      color: theme.palette.common.black,
    },
  })
);

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component='span' {...props} />;
}

interface Props {
  people: PersonProps[];
}

export const SearchPeekResults = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { setIsOpen, isOpen } = React.useContext(SearchResultsContext);
  const handleOnClick = React.useCallback(
    (name: string) => {
      history.push(`/person/${name}`);
      setIsOpen(false);
    },
    [history]
  );
  const { people } = props;
  return isOpen ? (
    <div className={classes.root}>
      <List>
        {people.map((person) => (
          <div onClick={() => handleOnClick(`${person.name}`)}>
            <ListItemLink>
              <ListItemText
                primary={person.name}
                className={classes.listItemText}
              />
            </ListItemLink>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  ) : null;
};
