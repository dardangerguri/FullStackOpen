import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const { apolloUri } = Constants.expoConfig.extra;

const createApolloClient = (authStorage) => {
  const httpLink = new HttpLink({
    uri: apolloUri,
    fetch: async (uri, options) => {
      try {
        const accessToken = await authStorage.getAccessToken();

        const headers = {
          ...options.headers,
          ...(accessToken && { authorization: `Bearer ${accessToken}` }),
        };

        return fetch(uri, {
          ...options,
          headers,
        });
      } catch (e) {
        console.log(e);
        return fetch(uri, options);
      }
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
