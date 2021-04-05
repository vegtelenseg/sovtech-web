import React from "react";

interface Props {
  children: React.ReactNode;
}

interface PaginationProps {
  limit: number;
  offset: number;
  setOffSet: (offset: number) => void;
  setLimit: (limit: number) => void;
}

const PaginationState: PaginationProps = {
  limit: 5,
  offset: 0,
  setOffSet: (offset: number) => {},
  setLimit: (limit: number) => {},
};

export const PaginationContext = React.createContext(PaginationState);
export const PaginationController = (props: Props) => {
  const { children } = props;
  const [offset, setOffSet] = React.useState(0);
  const [limit, setLimit] = React.useState(5);

  const value = React.useMemo(
    () => ({
      offset,
      setOffSet,
      limit,
      setLimit,
    }),
    [offset, setOffSet, limit, setLimit]
  );
  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
