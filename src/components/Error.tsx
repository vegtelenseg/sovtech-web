import React from "react";

interface Props {
  message: string;
}

export const Error = (props: Props) => {
  const { message } = props;
  return <div>{message}</div>;
};
