"use client";

/**
 * Apollo Client provider.
 *
 * Defines and exposes a singleton Apollo Client instance via React context.
 * Centralizes client creation, cache configuration, and instance reuse.
 */

// third party
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

let globalClient;

/**
 * Creates a new Apollo Client instance with shared configuration.
 */
function makeClient() {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URI_GRAPHQL,
    cache: new InMemoryCache({
      typePolicies: {
        GeneInfo: { keyFields: ["accessionId"] },
      },
    }),
  });
}

/**
 * Returns a singleton Apollo Client instance.
 */
function getClient() {
  if (!globalClient) globalClient = makeClient();
  return globalClient;
}

export default function ApolloGraphQLProvider({ children }) {
  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
}
