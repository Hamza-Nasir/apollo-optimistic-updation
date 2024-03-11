import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    headers: {
        'x-hasura-admin-secret': import.meta.env.VITE_X_HASURA_SECRET,
    },
    connectToDevTools: true,
  });
  