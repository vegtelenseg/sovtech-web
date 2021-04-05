import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { PersonProps } from "../modules/Person";

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
  return <ListItem button component='a' {...props} />;
}

interface Props {
  people: PersonProps[];
}

export const SearchPeekResults = (props: Props) => {
  const classes = useStyles();
  const { people } = props;
  return (
    <div className={classes.root}>
      <List>
        {people.map((person) => (
          <>
            <ListItemLink href={`/person/${person.name}`}>
              <ListItemText
                primary={person.name}
                className={classes.listItemText}
              />
            </ListItemLink>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
};
