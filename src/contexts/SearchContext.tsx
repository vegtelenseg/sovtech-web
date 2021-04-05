import React from "react";

interface Props {
  children: React.ReactNode;
}

interface SearchProps {
  phrase: string;
  setPhrase: (phrase: string) => void;
}

const SearchState: SearchProps = {
  setPhrase: (phrase: string) => {},
  phrase: "",
};

export const SearchContext = React.createContext(SearchState);
export const SearchController = (props: Props) => {
  const { children } = props;
  const [phrase, setPhrase] = React.useState("");

  const value = React.useMemo(
    () => ({
      phrase,
      setPhrase,
    }),
    [phrase, setPhrase]
  );
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
