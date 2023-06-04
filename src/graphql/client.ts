import { ApolloClient, InMemoryCache } from '@apollo/client';

// Config
import { CMS_URI } from '@/config';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: CMS_URI,
  cache,
});

export default client;
