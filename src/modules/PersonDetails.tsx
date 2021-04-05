import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { Progress } from "../components/Progress";
import { Banner } from "../components/Banner";
import { Error } from "../components/Error";
// import { OpeningCrawl } from "../components/OpeningCrawl";
import { Slideshow } from "../components/Slideshow";
import { Films } from "./Film";
import { Vehicles, VehicleProps } from "./Vehicles";

export interface FilmProps {
  title: string;
  episodeID: number;
  openingCrawl: string;
  director: string;
  producers: string[];
  releaseDate: string;
  created: string;
  edited: string;
  // details: FilmDetails
  id: string;
}

export interface PersonDetailsProps {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: FilmProps[];
  vehicles: VehicleProps[];
}

const FRAGMENT_PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    name
    height
    mass
    gender
    vehicles {
      model
      name
      manufacturers
    }
    homeworld {
      name
      population
    }
    species {
      name
    }
    films {
      title
      episodeID
      openingCrawl
      director
      producers
      releaseDate
      created
      edited
      details {
        vehicles {
          name
        }
      }
    }
  }
`;

const PERSON_DEATILS_QUERY = gql`
  ${FRAGMENT_PERSON_DETAILS}
  query PersonDetailsQuery($name: String!) {
    person(name: $name) {
      name
      ...PersonDetails
    }
  }
`;

interface PersonDetailsQuery {
  person: PersonDetailsProps[];
}
export const PersonDetails = () => {
  const { name } = useParams<{ name: string }>();

  const { data, loading, error } = useQuery<PersonDetailsQuery>(
    PERSON_DEATILS_QUERY,
    {
      variables: {
        name,
      },
    }
  );

  if (error) {
    return <Error message={error.message} />;
  }
  if (loading) {
    return <Progress />;
  }
  return data
    ? data.person.map((person) => (
        <>
          <Banner person={person} />
          <Films films={person.films} />
          <Vehicles vehicles={person.vehicles} />
        </>
      ))
    : null;
};
