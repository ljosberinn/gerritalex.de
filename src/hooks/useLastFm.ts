import type { LatestTrack } from '@/pages/api/lastfm';
import { useState, useCallback, useEffect } from 'react';

type UseLastFmReturn = { data: LatestTrack | null; loading: boolean };

export const useLastFm = (): UseLastFmReturn => {
  const [data, setData] = useState<LatestTrack | null>(null);
  const [loading, setLoading] = useState(true);

  const get = useCallback(() => {
    setLoading(true);

    const start = Date.now();

    fetch('/api/lastfm')
      // eslint-disable-next-line promise/prefer-await-to-then
      .then((response) => response.json())
      // eslint-disable-next-line promise/prefer-await-to-then
      .then((data) => {
        setData(data);
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => {
        const timeTaken = Date.now() - start;
        const delay = timeTaken > 1000 ? 0 : 1000 - timeTaken;

        setTimeout(() => {
          setLoading(false);
        }, delay);
      });
  }, []);

  useEffect(get, [get]);

  useEffect(() => {
    const interval = setInterval(get, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [get]);

  return {
    data,
    loading,
  };
};
