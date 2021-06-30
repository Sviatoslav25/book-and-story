import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const noop = () => {};
const useAPIMethod = ({ onComplete = noop, url, method = 'post', onError = noop, call }) => {
  const [isLoading, setIsLoading] = useState(false);
  const callbacksRef = useRef({
    onComplete,
    onError,
    call,
  });

  useEffect(() => {
    callbacksRef.current = {
      onComplete,
      onError,
      call,
    };
  }, [onComplete, onError, call]);

  const fn = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        if (typeof callbacksRef.current.call === 'function') {
          const result = await callbacksRef.current.call(data);
          await callbacksRef.current.onComplete(result);
        } else {
          const result = await axios({
            method,
            url,
            data,
          });
          await callbacksRef.current.onComplete(result.data);
        }
      } catch (e) {
        console.log(e);
        callbacksRef.current.onError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [method, url]
  );
  return [fn, isLoading];
};

export default useAPIMethod;
