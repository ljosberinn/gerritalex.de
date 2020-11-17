/* eslint-disable promise/prefer-await-to-then */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const endpoint = '/api/views';

export function usePageView(): number {
  const [views, setViews] = useState(-1);

  const { pathname } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams({
      pathname,
    }).toString();

    const url = `${endpoint}?${params}`;

    // eslint-disable-next-line no-console
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setViews(json.total);
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, [pathname]);

  return views;
}
