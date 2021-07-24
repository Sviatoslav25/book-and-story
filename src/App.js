import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import RootRouter from './router/RootRouter';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import client from './graphql/apolloClient';
import useClearApolloCacheOnLogout from './hooks/useClearApolloCacheOnLogout';

const ApolloCleanCacheOnLogout = ({ children }) => {
  useClearApolloCacheOnLogout();
  return children;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloCleanCacheOnLogout>
        <RootRouter />
        <ToastContainer />
      </ApolloCleanCacheOnLogout>
    </ApolloProvider>
  );
}

export default App;
