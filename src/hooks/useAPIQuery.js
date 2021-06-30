import { useEffect, useState } from 'react';
import useAPIMethod from './useAPIMethod';

const useAPIQuery = ({ url, call }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [fetch, isLoading] = useAPIMethod({ onComplete: setData, url, method: 'get', onError: setError, call });

  useEffect(() => {
    setError(null);
    fetch();
  }, [fetch]);
  return [data, fetch, isLoading, error];
};

export default useAPIQuery;
