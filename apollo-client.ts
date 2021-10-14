import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
