import { ApolloClient, InMemoryCache } from '@apollo/client';

// Config
import { CMS_URI } from '@/config';

export default new ApolloClient({
  uri: CMS_URI,
  cache: new InMemoryCache(),
});
