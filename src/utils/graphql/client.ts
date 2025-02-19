import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
});

const wsLink = new WebSocketLink({
  uri: import.meta.env.VITE_WEBSOCKET_API,
  options: {
    reconnect: true,
    connectionParams: {
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});