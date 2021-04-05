import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import { PaginationContext } from "../contexts/PaginationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

interface PaginationProps {
  rowsPerPage: number;
  count: number;
}

export default function Pagination(props: PaginationProps) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  // const { fetchMore } = props;

  const { setLimit, setOffSet } = React.useContext(PaginationContext);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setOffSet(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setLimit(Number(event.target.value));
  };
  return (
    <TablePagination
      component='div'
      count={props.count}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
