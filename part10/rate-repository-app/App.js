import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import Main from './src/components/Main';
import apolloClient from './src/utils/apolloClient';

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
