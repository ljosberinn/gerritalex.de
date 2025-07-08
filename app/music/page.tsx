import data from '../../prebuild/music/data.json' assert { type: 'json' };
import { generatePageMetadata } from '../seo';
import clsx from 'clsx';
import { Image } from '../../components/Image';

const filteredData = data
  .filter((dataset) => dataset.visible === true)
  .sort((a, b) => {
    if (a.acquired === null && b.acquired === null) {
      return 0;
    }

    if (a.acquired === null) {
      return -1;
    }

    if (b.acquired === null) {
      return 1;
    }

    const acquired = new Date(b.acquired).getTime() - new Date(a.acquired).getTime();

    if (acquired !== 0) {
      return acquired;
    }

    const artist = b.artist.localeCompare(b.artist);

    if (artist !== 0) {
      return artist;
    }

    return b.album.localeCompare(a.album);
  });

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

const byGenre = filteredData.reduce<Record<string, Set<Music>>>((acc, album) => {
  if (!album.metadata) {
    return acc;
  }

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

    if (!(genre in acc)) {
      acc[genre] = new Set();
    }

    acc[genre].add(album);
  }

  return acc;
}, {});

const byGenreOccurrence = Object.entries(byGenre).sort((a, b) => b[1].size - a[1].size);

export const metadata = generatePageMetadata({
  title: 'Music',
  image: (() => {
    return `/static/images/music/${filteredData[Math.floor(Math.random() * filteredData.length)].id}-front.jpg`;
  })(),
  description: `An exhaustive list of the ${filteredData.length - unacquiredAlbums} albums I physically own. The most common genres among these are ${readableGenresCombinedWithAnd}.`,
});

export type Music = (typeof data)[0];

export default async function MusicPage() {
  return (
    <section className="px-4">
      <h1 className="pb-6 text-3xl leading-9 font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-300">
        Music
      </h1>

      <p>
        Albums I own either on LP or CD as well as those that I plan on buying, but are hard to
        acquire. The most common genres among these {filteredData.length - unacquiredAlbums} albums
        are <b>{readableGenresCombinedWithAnd}</b>. Beyond that, I enjoy{' '}
        <b>Vaporwave, Goth Rock and some Trance</b>. Ordered by acquisition date, beginning with the
        latest.
      </p>

      {Object.entries(byGenreOccurrence).map(([, [genre, albums]]) => {
        const albumsSortedAlphabeticallyByArtistAndAlbum = Array.from(albums).sort((a, b) => {
          const aArtist = a.artist.toLowerCase();
          const bArtist = b.artist.toLowerCase();

          if (aArtist !== bArtist) {
            return aArtist.localeCompare(bArtist);
          }

          const aAlbum = a.album.toLowerCase();
          const bAlbum = b.album.toLowerCase();

          return aAlbum.localeCompare(bAlbum);
        });

        const subgenres = albumsSortedAlphabeticallyByArtistAndAlbum.reduce<Record<string, number>>(
          (acc, album) => {
            if (album.metadata && album.metadata.genres.length > 0) {
              for (const genre of album.metadata.genres) {
                if (genre in acc) {
                  acc[genre] += 1;
                } else {
                  acc[genre] = 1;
                }
              }
            }

            return acc;
          },
          {}
        );

        const topThreeOccurringSubgenres = Object.entries(subgenres)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([subgenre]) => subgenre)
          .reduce<string[]>((acc, subgenre, index, arr) => {
            if (index === 0) {
              acc.push(subgenre);
              return acc;
            }

            if (index !== arr.length - 1) {
              acc.push(`, ${subgenre}`);
              return acc;
            }

            acc.push(' and ' + subgenre);

            return acc;
          }, []);

        return (
          <section key={genre} className="mx-auto" aria-labelledby={`${genre}-title`}>
            <div className={`p-8`}>
              <h2
                id={`${genre}-title`}
                className="text-3xl font-black tracking-wide uppercase underline decoration-black/50 decoration-6 underline-offset-8 md:text-5xl md:decoration-10 2xl:text-7xl dark:decoration-white/50"
              >
                {genre}
              </h2>

              {albumsSortedAlphabeticallyByArtistAndAlbum.length > 1 ? (
                <p className="mt-8 2xl:text-lg">
                  {albumsSortedAlphabeticallyByArtistAndAlbum.length} releases
                  {topThreeOccurringSubgenres.length > 1 ? (
                    <>
                      , spanning <b>{topThreeOccurringSubgenres.join('')}</b>.
                    </>
                  ) : (
                    '.'
                  )}
                </p>
              ) : null}
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,_minmax(120px,_120px))] gap-4 p-4 md:max-w-9/10 md:gap-6">
              {albumsSortedAlphabeticallyByArtistAndAlbum.map((album) => {
                const classes = [
                  'rounded-md border-2 transition ease-in-out hover:opacity-100 shadow-inner hover:shadow-none',
                  'h-[120px] w-[120px] overflow-hidden object-cover',
                  'border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-primary-700',
                ];

                if (album.acquired === null) {
                  classes.push(
                    'border-red-500 hover:border-red-600 dark:border-red-500 dark:hover:border-red-800'
                  );
                }

                const title = `${[album.artist, album.album].join(' - ')}${album.metadata?.release.year ? `, ${album.metadata.release.year}` : ''}`;

                return (
                  <a
                    href={
                      album.id
                        ? `https://www.discogs.com/release/${album.id}`
                        : `https://www.discogs.com/search?q=${album.artist}+${album.album}`
                    }
                    target="_blank"
                    key={album.id}
                    className="opacity-80 hover:opacity-100"
                  >
                    {
                      <Image
                        title={title}
                        alt={album.album}
                        width={120}
                        height={120}
                        className={clsx(classes)}
                        loading={'lazy'}
                        src={`/static/images/music/${album.id}-front.jpg`}
                      />
                    }

                    <span className="sr-only">{title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </section>
  );
}
