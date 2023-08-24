import { ApolloClient, InMemoryCache } from '@apollo/client';

// Config
import { AppConfig } from '@/constants/app';

const cache = new InMemoryCache();

const client = new ApolloClient({
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
  cache,
  uri: AppConfig.CMS_URL,
  connectToDevTools: true,
});

export default client;
