import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface ArgsType {
  // TODO: Fix type
  args: Record<string, any> | null;
}

const uri = "http://localhost:4000";
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          people: {
            keyArgs: false,
            merge(existing, incoming) {
              const people = existing ? [...existing.people, ...incoming] : [];
              return {
                cursor: incoming.cursor,
                hasNextPage: false,
                people,
              };
            },

            // @ts-ignore
            read(existing, { args: { offset, limit } }: ArgsType) {
              console.log("OFFSET: ", offset);
              if (existing) {
                return {
                  cursor: existing.cursor,
                  people:
                    existing && existing.people.slice(offset, offset + limit),
                };
              }
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
