import React from "react";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

import Pagination from "../components/Pagination";
import { PaginationContext } from "../contexts/PaginationContext";
import { Progress } from "../components/Progress";
import { PersonCard, PersonProps } from "./Person";
import { Error } from "../components/Error";
// import { OpeningCrawl } from "../components/OpeningCrawl";
import { DataContext, DataContextProps } from "../contexts/DataContext";
import { Banner } from "../components/Banner";

const PEOPLE_QUERY = gql`
  query AllPeople($offset: Int, $limit: Int, $name: String) {
    allPeople(offset: $offset, limit: $limit, name: $name) {
      id
      name
      height
      gender
      homeworld {
        name
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
  },
}));
export const People = () => {
  const { offset, limit } = React.useContext(PaginationContext);
  const classes = useStyles();
  const { setData, data: ctxData } = React.useContext<
    DataContextProps<PersonProps>
  >(DataContext);
  const { data, loading, error, fetchMore } = useQuery(PEOPLE_QUERY, {
    fetchPolicy: "cache-first",
    variables: {
      limit,
      offset,
    },
  });

  React.useEffect(() => {
    if (data && data.allPeople) {
      setData(data.allPeople as PersonProps);
    }
  }, [data, setData]);

  if (error) {
    return <Error message={error.message} />;
  }
  return (
    <>
      {ctxData ? (
        <>
          {loading && <Progress />}
          <Banner person={ctxData[0]} isHomePage />
          {!loading && <Pagination count={100} rowsPerPage={10} />}
          {data && (
            <Box ml={4} mb={3}>
              <Typography variant='h2' color='primary'>
                All Characters
              </Typography>
            </Box>
          )}
          <Container maxWidth='xl'>
            <Grid
              style={{ padding: 10 }}
              container
              spacing={4}
              className={classes.container}
            >
              {
                // @ts-ignore
                ctxData &&
                  ctxData.map((person: PersonProps) => (
                    <PersonCard key={person.name} person={person} />
                  ))
              }
              {/* <OpeningCrawl /> */}
            </Grid>
          </Container>
          <Pagination count={100} rowsPerPage={10} />
        </>
      ) : null}
    </>
  );
};
