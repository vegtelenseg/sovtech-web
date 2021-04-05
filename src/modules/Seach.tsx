import React from "react";

import { gql, useLazyQuery } from "@apollo/client";
import { DataContext, DataContextProps } from "../contexts/DataContext";
import { PersonProps } from "./Person";
import { Progress } from "../components/Progress";
import { Error } from "../components/Error";
import { SearchBar } from "../components/SearchBar";
import { SearchPeekResults } from "../components/SearchPeekResults";
import { SearchResultsContext } from "../contexts/SearchResults";

const PERSON_QUERY = gql`
  query People($name: String) {
    person(name: $name) {
      name
    }
  }
`;

const SearchModule = React.memo(() => {
  const { setIsOpen, isOpen } = React.useContext(SearchResultsContext);
  const [searchPhrase, setSearchPhrase] = React.useState("");

  const [getPerson, { data, loading, error }] = useLazyQuery(PERSON_QUERY, {
    fetchPolicy: "cache-first",
    variables: {
      name: searchPhrase,
    },
  });

  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.keyCode === 13 || (event.keyCode === 13 && !searchPhrase)) {
        setIsOpen(true);
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
  if (error) {
    return <Error message={error.message} />;
  }
  return (
    <>
      {loading && <Progress />}
      <SearchBar handleChange={handleChange} handleKeyUp={handleKeyUp} />
      {data && data.person.length > 0 && (
        <SearchPeekResults people={data.person} />
      )}
    </>
  );
});

export const Search = SearchModule;
