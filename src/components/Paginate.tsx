import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { PaginationContext, PEOPLE_QUERY } from "../contexts/PaginationContext";
import TablePagination from "@material-ui/core/TablePagination";
import { DocumentNode, QueryHookOptions, gql } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

interface PaginateProps {
  fetchMore: any;
}

export default function Paginate() {
  const classes = useStyles();
  const { setData, fetchMore } = React.useContext(PaginationContext);
  const [page, setPage] = React.useState(1);
  // const { fetchMore } = props;

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  React.useEffect(
    () =>
      fetchMore({
        query: PEOPLE_QUERY,
        variables: {
          offset: page,
          limit: rowsPerPage,
        },
        updateQuery: (
          prev: any,
          { fetchMoreResult }: { fetchMoreResult: any }
        ) => {
          if (!fetchMoreResult) return prev;
          const newResults = [...fetchMoreResult.people];
          setData({
            people: newResults.slice(prev.people.length, newResults.length),
          });
        },
      }),

    [page, rowsPerPage]
  );
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
  };
  return (
    <TablePagination
      component='div'
      count={100}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
