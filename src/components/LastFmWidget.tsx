import { useState, useCallback, useEffect } from "react";

import type { LatestTrack } from "../pages/api/lastfm";
import { cs } from "../utils/classNames";

const useLastFm = () => {
  const [data, setData] = useState<LatestTrack | null>(null);
  const [loading, setLoading] = useState(true);

  const get = useCallback(() => {
    setLoading(true);

    const start = Date.now();

    fetch("/api/lastfm")
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

export function LastFmWidget(): JSX.Element | null {
  const { loading, data } = useLastFm();

  if (loading) {
    return <Widget loading />;
  }

  if (!data?.album) {
    return null;
  }

  return <Widget loading={false} {...data} />;
}

type WidgetProps = Partial<
  LatestTrack & {
    loading: boolean;
  }
>;

function Widget({
  image,
  artist,
  track,
  album,
  nowPlaying,
  timestamp,
  loading,
}: WidgetProps) {
  const date = timestamp
    ? `${new Date(timestamp).toLocaleDateString()} ${new Date(
        timestamp
      ).toLocaleTimeString()}`
    : null;

  return (
    <div className="border border-gray-300 rounded-md p-4 max-w-xl w-full mx-auto">
      <div
        className={cs(
          "flex space-x-4",
          loading ? "animate-pulse" : "text-left"
        )}
      >
        <div className="bg-gray-400 h-12 w-12">
          {image && album && (
            <img
              src={image}
              alt={album}
              height="48"
              width="48"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex-1 space-y-4 py-1">
          <div className={cs("h-5", loading && "rounded bg-gray-400")}>
            {loading ? null : nowPlaying ? (
              <a href="//last.fm/user/XHS207GA">Now Playing on Last.fm</a>
            ) : timestamp ? (
              <time dateTime={new Date(timestamp).toISOString()}>
                Last Song ({date})
              </time>
            ) : null}
          </div>
          <div className="space-y-2">
            <div className={cs("h-5", loading && "bg-gray-400 rounded")}>
              {!loading && artist && track && (
                <a
                  href={`//youtube.com/results?search_query=${artist} ${track}`}
                  className="mb-4"
                >
                  {artist} - {track}
                </a>
              )}
            </div>
            <div className={cs("h-5", loading && "bg-gray-400 rounded w-5/6")}>
              {!loading && (
                <>
                  on <i>{album}</i>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
