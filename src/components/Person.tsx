import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Progress } from "./Progress";

export interface Person {
  name: string;
  height: number;
  mass: number;
  gender: string;
}

export const Person = () => {
  const { id } = useParams<{ id: string }>();
  const FRAGMENT_PERSON_DETAILS = gql`
    fragment PersonDetails on Person {
      height
      mass
      gender
      homeworld {
        name
        terrain
      }
    }
  `;

  const PERSON_QUERY = gql`
    ${FRAGMENT_PERSON_DETAILS}
    query People($name: String!) {
      person(name: $name) {
        name
        ...PersonDetails
      }
    }
  `;

  const { data, loading, error } = useQuery<{ person: Person[] }>(
    PERSON_QUERY,
    {
      variables: {
        name: id,
      },
    }
  );
  if (error) {
    <div>{`Could not get details for: ${id}`}</div>;
  }
  if (loading) {
    return <Progress />;
  } else if (data) {
    const { person } = data;
    return <div>{person.map((item: any) => item.name)}</div>;
  }
};
