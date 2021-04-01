import React from "react";
import { useQuery, gql } from "@apollo/client";

import { Person } from "../components/Person";
import { Progress } from "../components/Progress";

interface PaginationContextType {
  data: any;
  setData: any;
  loading: boolean;
  error: any;
  fetchMore: (v?: any) => void;
}
interface Props {
  children: React.ReactNode;
}

const paginationContextState: PaginationContextType = {
  data: { people: [] },
  setData: (data: any) => {},
  loading: false,
  error: {},
  fetchMore: ({}: any) => {},
};

export const PaginationContext = React.createContext(paginationContextState);

export const PEOPLE_QUERY = gql`
  query People($offset: Int!, $limit: Int!) {
    people(offset: $offset, limit: $limit) {
      name
      height
      mass
      gender
    }
  }
`;

interface PeopleConnection {
  hasNext: number;
  total: number;
}

export const PaginationController = ({ children }: Props) => {
  const { data: initData, loading, error, fetchMore } = useQuery<{
    people: Person[];
  }>(PEOPLE_QUERY, {
    variables: {
      offset: 1,
      limit: 10,
    },
  });
  const [data, setData] = React.useState<any>(initData);
  const value = React.useMemo(
    () => ({ data, setData, loading, error, fetchMore }),
    [data, setData, loading, fetchMore, error]
  );
  if (error) {
    return <div>Could not find people!: {error.message}</div>;
  } else if (loading) {
    return <Progress />;
  } else
    return (
      <PaginationContext.Provider value={value}>
        {children}
      </PaginationContext.Provider>
    );
};
