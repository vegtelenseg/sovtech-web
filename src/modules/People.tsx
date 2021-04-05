import React from "react";
import { Grid, Container } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

import Pagination from "../components/Pagination";
import { PaginationContext } from "../contexts/PaginationContext";
import { Progress } from "../components/Progress";
import { PersonCard, PersonProps } from "./Person";
import { Error } from "../components/Error";
// import { OpeningCrawl } from "../components/OpeningCrawl";
import { SearchContext } from "../contexts/SearchContext";
import { DataContext, DataContextProps } from "../contexts/DataContext";
import { Banner } from "../components/Banner";
import { PersonDetailsProps } from "./PersonDetails";

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

export const People = () => {
  const { offset, limit } = React.useContext(PaginationContext);
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
    console.log("hay: ", data);
    if (data && data.allPeople) {
      const { gender, height, name, homeworld } = data.allPeople;
      setData(data.allPeople as PersonProps);
    }
  }, [data, setData]);

  if (error) {
    return <Error message={error.message} />;
  }
  // if (loading) {
  //   return <Progress />;
  // }
  return (
    <>
      {ctxData ? (
        <>
          {loading && <Progress />}
          <Banner person={ctxData[0]} isHomePage />
          <Container maxWidth='xl'>
            <Grid style={{ padding: 0 }} container spacing={4}>
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
