import {useCallback, useState} from 'react';

export const useImageApp = () => {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean>(false);

  const onLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback(() => {
    setError(true);
  }, []);

  return {error, loading, onLoadStart, onLoad, onError};
};
