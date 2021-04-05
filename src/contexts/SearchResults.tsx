import React from "react";

interface Props {
  children: React.ReactNode;
}

interface SearchResultsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SearchResultsState: SearchResultsProps = {
  setIsOpen: (isOpen: boolean) => {},
  isOpen: false,
};

export const SearchResultsContext = React.createContext(SearchResultsState);
export const SearchResultsController = (props: Props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen]
  );
  return (
    <SearchResultsContext.Provider value={value}>
      {children}
    </SearchResultsContext.Provider>
  );
};
