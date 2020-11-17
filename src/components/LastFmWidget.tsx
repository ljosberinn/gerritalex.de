import { useLastFm } from '@/hooks/useLastFm';
import type { LatestTrack } from '@/pages/api/lastfm';
import { classNames } from '@/utils/classNames';

import { ExternalLink } from './ExternalLink';

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
        timestamp,
      ).toLocaleTimeString()}`
    : null;

  return (
    <div className="border border-gray-300 rounded-md p-4 max-w-xl w-full mx-auto mb-4">
      <div
        className={classNames(
          'flex space-x-4',
          loading ? 'animate-pulse' : 'text-left',
        )}
      >
        <div className="bg-gray-400 h-12 w-12">
          {image && album && <img src={image} alt={album} loading="lazy" />}
        </div>
        <div className="flex-1 space-y-4 py-1">
          <div className={classNames('h-5', loading && 'rounded bg-gray-400')}>
            {loading ? null : nowPlaying ? (
              <ExternalLink href="//last.fm/user/XHS207GA">
                Now Playing on Last.fm
              </ExternalLink>
            ) : timestamp ? (
              <time dateTime={new Date(timestamp).toISOString()}>
                Last Song ({date})
              </time>
            ) : null}
          </div>
          <div className="space-y-2">
            <div
              className={classNames('h-5', loading && 'bg-gray-400 rounded')}
            >
              {!loading && artist && track && (
                <ExternalLink
                  href={`//youtube.com/results?search_query=${artist} ${track}`}
                  className="mb-4"
                >
                  {artist} - {track}
                </ExternalLink>
              )}
            </div>
            <div
              className={classNames(
                'h-5',
                loading && 'bg-gray-400 rounded w-5/6',
              )}
            >
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
