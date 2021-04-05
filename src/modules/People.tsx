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

export const People = React.memo(() => {
  const { offset, limit } = React.useContext(PaginationContext);
  // const { setData, data: ctxData } = React.useContext<
  //   DataContextProps<PersonProps>
  // >(DataContext);
  const { data, loading, error, fetchMore } = useQuery(PEOPLE_QUERY, {
    variables: {
      limit,
      offset,
    },
  });

  // React.useEffect(() => {
  //   setData(data);
  // }, [data, setData]);

  if (error) {
    return <Error message={error.message} />;
  }
  if (loading) {
    return <Progress />;
  }
  console.log("actually: ", data.allPeople);
  return data && data["allPeople" || "person"] ? (
    <>
      <Banner person={data["allPeople" || "person"][0]} isHomePage />
      <Container maxWidth='xl'>
        <Grid style={{ padding: 0 }} container spacing={4}>
          {data["allPeople" || "person"].map((person: PersonProps) => (
            <PersonCard key={person.name} person={person} />
          ))}
          {/* <OpeningCrawl /> */}
        </Grid>
      </Container>
      <Pagination count={data?.allPeople?.length || 100} rowsPerPage={2} />
    </>
  ) : null;
});
