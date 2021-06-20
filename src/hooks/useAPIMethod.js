import axios from 'axios';
import { useCallback, useState } from 'react';

const noop = () => {};
const useAPIMethod = ({ onComplete = noop, url, method = 'post', onError = noop }) => {
  const [isLoading, setIsLoading] = useState(false);

  const call = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        const result = await axios({
          method,
          url,
          data,
        });
        await onComplete(result.data);
      } catch (e) {
        onError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [method, onComplete, onError, url]
  );
  return [call, isLoading];
};

export default useAPIMethod;
