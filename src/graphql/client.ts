import { ApolloClient, InMemoryCache } from '@apollo/client';

// Config
import { CMS_API_URL } from '@/config';

export default new ApolloClient({
  uri: `${CMS_API_URL}/gql`,
  cache: new InMemoryCache(),
});
