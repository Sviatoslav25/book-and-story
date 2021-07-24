import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import AuthManager from '../services/AuthManager';

const useClearApolloCacheOnLogout = () => {
  const client = useApolloClient();
  useEffect(() => {
    const unsubscribe = AuthManager.onLogout(() => {
      client.clearStore();
    });
    return () => {
      unsubscribe();
    };
  }, [client]);
};

export default useClearApolloCacheOnLogout;
