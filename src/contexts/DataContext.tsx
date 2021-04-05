import React from "react";

interface Props<T> {}

interface Data<T> {
  [key: string]: T[];
}
export interface DataContextProps<T> {
  data: T[];
  setData: (data: T) => void;
}

const DataState: DataContextProps<any> = {
  setData: (data: any) => {},
  data: [],
};

export const DataContext = React.createContext<DataContextProps<any>>(
  DataState
);
export const DataController = <T extends object>(
  props: React.PropsWithChildren<Props<T>>
) => {
  const { children } = props;
  const [data, setData] = React.useState([]);
  console.log("CTX DATA: ", data);

  const value = React.useMemo(
    () => ({
      data,
      setData,
    }),
    [data, setData]
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
