import { ApolloClient, InMemoryCache } from '@apollo/client';

// Config
import { AppConfig } from '@/constants/app';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: AppConfig.CMS_URL,
  cache,
});

export default client;
