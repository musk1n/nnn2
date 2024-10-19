// client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5173/api/subgraphs/name/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV',
  cache: new InMemoryCache(),
});

export default client;
