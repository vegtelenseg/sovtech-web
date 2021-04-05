import React from "react";

import { SearchContext } from "../contexts/SearchContext";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { DataContext, DataContextProps } from "../contexts/DataContext";
import { PersonProps } from "./Person";
import { Progress } from "../components/Progress";
import { Error } from "../components/Error";
import { SearchBar } from "../components/SearchBar";
import { SearchPeekResults } from "../components/SearchPeekResults";
import { withRouter } from "react-router";

const PERSON_QUERY = gql`
  query People($name: String) {
    person(name: $name) {
      name
    }
  }
`;

const SearchModule = React.memo(() => {
  const { setData } = React.useContext<DataContextProps<PersonProps>>(
    DataContext
  );
  const [searchPhrase, setSearchPhrase] = React.useState("");

  const [getPerson, { data, loading, error }] = useLazyQuery(PERSON_QUERY, {
    variables: {
      name: searchPhrase,
    },
  });

  React.useEffect(() => {
    setData(data);
  }, [data, setData]);

  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.keyCode === 13 || (event.keyCode === 13 && !searchPhrase)) {
        getPerson({
          variables: {
            name: searchPhrase,
          },
        });
      }
    },
    [setSearchPhrase, event]
  );
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchPhrase(event.target.value);
    },
    [setSearchPhrase, event]
  );
  if (loading) {
    return <Progress />;
  }
  if (error) {
    return <Error message={error.message} />;
  }
  return (
    <>
      <SearchBar handleChange={handleChange} handleKeyUp={handleKeyUp} />
      {data && <SearchPeekResults people={data.person} />}
    </>
  );
});

export const Search = SearchModule;
