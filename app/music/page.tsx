import { Fragment } from 'react';
import data from '../../prebuild/music/data.json' with { type: 'json' };
import lastfm from '../../prebuild/music/lastfm.json' with { type: 'json' };
import { generatePageMetadata } from '../seo';
import clsx from 'clsx';
import concerts from '../../prebuild/music/concerts.json' with { type: 'json' };
import { CustomLink } from '../../components/CustomLink';
import { AlbumMosaic, type MosaicAlbum } from '../../components/AlbumMosaic';
import { indexLibrary, playsFor } from '../../prebuild/music/plays';

const TILE_TIERS: { span: MosaicAlbum['span']; share: number }[] = [
  { span: 4, share: 0.01 },
  { span: 3, share: 0.03 },
  { span: 2, share: 0.1 },
];

const basePath = process.env.BASE_PATH || '';

const filteredData = data.filter((dataset) => dataset.visible === true);

const unacquiredAlbums = filteredData.filter((album) => album.acquired === null).length;

const genresByOccurence = filteredData.reduce<Record<string, number>>((acc, album) => {
  if (!album.metadata) {
    return acc;
  }

  if (album.metadata.genres.length > 0) {
    for (let genre of album.metadata.genres) {
      if (genre.includes('Black Metal') && genre !== 'Black Metal') {
        genre = 'Black Metal';
      } else if (
        genre.includes('Rap') ||
        genre.includes('Hip Hop') ||
        genre.includes('Hip-Hop') ||
        genre.includes('Deutschrap') ||
        genre.includes('Trap')
      ) {
        genre = 'Rap';
      }

      if (genre in acc) {
        acc[genre] += 1;
      } else {
        acc[genre] = 1;
      }
    }
  }

  return acc;
}, {});

const readableGenresCombinedWithAnd = Object.entries(genresByOccurence)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .reduce<string[]>((acc, [genre], index, arr) => {
    if (index === 0) {
      acc.push(genre);
      return acc;
    }

    if (index !== arr.length - 1) {
      acc.push(`, ${genre}`);
      return acc;
    }

    acc.push('and ' + genre);
    return acc;
  }, [])
  .join(' ');

// most entries are MM-01-YYYY, some from 2025 DD-MM-YYYY, the newest ISO
function parseAcquired(acquired: string): Date {
  const iso = /^(\d{4})-(\d{2})-\d{2}$/.exec(acquired);

  if (iso) {
    return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1));
  }

  const [first, second, year] = acquired.split('-').map(Number);
  const month = second === 1 && first <= 12 ? first : second;

  return new Date(Date.UTC(year, month - 1));
}

function formatAcquisition(acquired: string | null): string | null {
  if (acquired === null) {
    return null;
  }

  const since = parseAcquired(acquired).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return `Owned since ${since}`;
}

function formatRuntime(seconds: number | null | undefined): string | null {
  if (!seconds || seconds <= 0) {
    return null;
  }

  const minutes = Math.round(seconds / 60);

  return minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function formatListening(seconds: number, plays: number): string | null {
  if (plays === 0) {
    return null;
  }

  const time =
    seconds < 3600
      ? `${Math.max(1, Math.round(seconds / 60))} min`
      : `${Math.round(seconds / 3600)} h`;

  return `≈ ${time} listened · ${plays.toLocaleString('en-US')} ${plays === 1 ? 'play' : 'plays'}`;
}

type Album = (typeof filteredData)[number];

// for releases whose Discogs tracklist count is unknown
const ASSUMED_TRACK_COUNT = 9;

function averageTrackLength(album: Album): number | null {
  const runtime = album.metadata?.runtime;

  if (!runtime || runtime <= 0) {
    return null;
  }

  return runtime / (album.metadata?.tracks || ASSUMED_TRACK_COUNT);
}

const knownTrackLengths = filteredData
  .map(averageTrackLength)
  .filter((length) => length !== null)
  .sort((a, b) => a - b);

const medianTrackLength = knownTrackLengths[Math.floor(knownTrackLengths.length / 2)];

const library = indexLibrary(lastfm);

// last.fm counts every track scrobble as a play of its album, so plays × track length ≈ time listened
const albumsWithListening = filteredData.map((album) => {
  const plays = playsFor(album, library);

  return { album, plays, listening: plays * (averageTrackLength(album) ?? medianTrackLength) };
});

const rankedByListening = albumsWithListening
  .filter(({ listening }) => listening > 0)
  .sort((a, b) => b.listening - a.listening);

const spans = new Map<Album, MosaicAlbum['span']>();
let rank = 0;

for (const { span, share } of TILE_TIERS) {
  const end = Math.min(rank + Math.round(filteredData.length * share), rankedByListening.length);

  for (; rank < end; rank++) {
    spans.set(rankedByListening[rank].album, span);
  }
}

const mosaicAlbums: MosaicAlbum[] = shuffle(
  albumsWithListening.map(({ album, plays, listening }) => {
    const span = spans.get(album) ?? 1;

    return {
      key: `${album.id ?? `${album.artist} ${album.album}`}`,
      artist: album.artist,
      album: album.album,
      year: album.metadata?.release.year || null,
      styles: album.metadata?.genres.join(', ') ?? '',
      runtime: formatRuntime(album.metadata?.runtime),
      acquisition: formatAcquisition(album.acquired),
      wanted: album.acquired === null,
      listening: formatListening(listening, plays),
      span,
      image:
        span > 1
          ? `${basePath}/static/images/music/${album.id}-front.jpg`
          : `${basePath}/static/images/music/thumbs/${album.id}-front.webp`,
      discogs: album.id
        ? `https://www.discogs.com/release/${album.id}`
        : `https://www.discogs.com/search?${new URLSearchParams({ q: `${album.artist} ${album.album}` })}`,
    };
  })
);

const ignoredArtists = new Set(['The Rangers', 'The 58 Cajon Rollers', 'PiXie Meet', 'Shining']);

const mostSeenArtists = Object.entries(
  concerts.reduce<Record<string, number>>((acc, concert) => {
    for (const artist of concert.artists) {
      if (ignoredArtists.has(artist)) {
        continue;
      }

      if (acc[artist] === undefined) {
        acc[artist] = 1;
      } else {
        acc[artist] += 1;
      }
    }

    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]);

const totalArtistsSeen = Object.keys(mostSeenArtists).length;

export const metadata = generatePageMetadata({
  title: 'Music',
  image: (() => {
    return `/static/images/music/${filteredData[Math.floor(Math.random() * filteredData.length)].id}-front.jpg`;
  })(),
  description: `An exhaustive list of the ${filteredData.length - unacquiredAlbums} albums I physically own. The most common genres among these are ${readableGenresCombinedWithAnd}.`,
});

export default async function MusicPage() {
  return (
    <>
      <section className="px-4">
        <h1 className="pb-6 text-3xl leading-9 font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-300">
          Music
        </h1>

        <p>
          Albums I own either on LP or CD as well as those that I plan on buying (faded out), but
          are usually hard to acquire. The most common genres among these{' '}
          {filteredData.length - unacquiredAlbums} albums are <b>{readableGenresCombinedWithAnd}</b>
          . Beyond that, I enjoy <b>Vaporwave, Goth Rock and some Trance</b>. The more I've listened
          to an album, the bigger its cover. Hover or tap a cover for details.
        </p>

        <div className="mx-auto max-w-7xl py-8 md:max-w-9/10 md:p-4">
          <AlbumMosaic albums={mosaicAlbums} />
        </div>
      </section>
      <section className="px-4">
        <h1 className="pb-6 text-3xl leading-9 font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-300">
          Concerts
        </h1>

        <p>
          Over the years, I have been lucky enough to have the opportunity to see most of my
          favourite artists perform live. The artists I've seen the most are{' '}
          {mostSeenArtists.slice(0, 3).map(([artist, count], index, arr) => (
            <Fragment key={artist}>
              {index === 0 ? null : index === arr.length - 1 ? ' and ' : ', '}
              <b>
                {artist} ({count}x)
              </b>
            </Fragment>
          ))}{' '}
          and I've seen a total of {totalArtistsSeen} different artists at {concerts.length} events.
          The full list in chronologically descending order:
        </p>

        {concerts.reverse().map((concert, index) => {
          const [from, to] = concert.date.split('|');
          const isOdd = index % 2 === 1;

          const rendersArtistsIndividually =
            concert.artists.length > 1 ||
            (concert.event ? !concert.event.includes(concert.artists[0]) : false);

          return (
            <section
              key={concert.date}
              className={clsx(
                'm-2 mx-auto rounded-md border-2 p-2',
                isOdd
                  ? 'border-white bg-gray-100 dark:border-slate-900 dark:bg-gray-900'
                  : 'border-slate-300 dark:border-slate-900'
              )}
              aria-labelledby={`${concert.date}-title`}
            >
              <div className="flex flex-col justify-between p-6 md:flex-row">
                <h2
                  id={`${concert.date}-title`}
                  className="text-1xl md:text-1xl font-black tracking-wide uppercase underline decoration-black/50 decoration-2 underline-offset-8 md:decoration-6 2xl:text-3xl dark:decoration-white/50"
                >
                  {concert.event ? concert.event : concert.artists.join(', ')}
                </h2>

                <h3 className="mt-4 md:mt-0 2xl:text-lg">
                  {to ? (
                    <>
                      <time dateTime={from}>{from}</time> - <time dateTime={to}>{to}</time>
                    </>
                  ) : (
                    <time dateTime={from}>{from}</time>
                  )}
                </h3>
              </div>

              <div
                className={clsx(
                  'mx-auto flex max-w-7xl flex-col gap-4 md:max-w-9/10 md:flex-row md:gap-6',
                  rendersArtistsIndividually ? 'py-4' : null
                )}
              >
                {rendersArtistsIndividually
                  ? concert.artists.map((artist) => {
                      const title = artist;

                      return (
                        <CustomLink
                          href={`https://www.discogs.com/artist/${artist}`}
                          className=""
                          key={artist}
                        >
                          {title}
                        </CustomLink>
                      );
                    })
                  : null}
              </div>
            </section>
          );
        })}
      </section>
    </>
  );
}
