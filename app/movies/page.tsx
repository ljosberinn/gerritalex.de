import { generatePageMetadata } from '../seo';
import data from '../../prebuild/movies/data.json' with { type: 'json' };
import { Movies } from '../../components/Movies';
import clsx from 'clsx';
import { Image } from '../../components/Image';

enum State {
  UPCOMING = 'upcoming',
  FINISHED = 'finished',
}

const byState = data.reduce<Record<State, Movies[]>>(
  (acc, movies) => {
    const state = movies.seen ? State.FINISHED : State.UPCOMING;

    if (!(state in acc)) {
      acc[state] = [];
    }

    acc[state].push(movies);

    return acc;
  },
  {
    [State.FINISHED]: [],
    [State.UPCOMING]: [],
  }
);

export type Movies = (typeof data)[0];

const description = [
  'Ordered by latest release date.',
  'Golden borders indicate favorites/recommendations.',
  'Hover image for title.',
  'Click image for more info.',
];

function sortByYearDesc(data: Movies[]) {
  return data.sort((a, b) => {
    const aYear = a.metadata.release.year ?? new Date().getFullYear();
    const bYear = b.metadata.release.year ?? new Date().getFullYear();

    if (aYear !== bYear) {
      return bYear - aYear;
    }

    const aMonth = a.metadata.release.month ?? 12;
    const bMonth = b.metadata.release.month ?? 12;

    if (aMonth !== bMonth) {
      return bMonth - aMonth;
    }

    const aDay = a.metadata.release.day ?? 31;
    const bDay = b.metadata.release.day ?? 31;

    if (aDay !== bDay) {
      return bDay - aDay;
    }

    return 0;
  });
}

const genresByOccurence = data.reduce<Record<string, number>>((acc, movies) => {
  if (movies.metadata.genres.length > 0) {
    movies.metadata.genres.forEach((genre) => {
      if (genre in acc) {
        acc[genre] += 1;
      } else {
        acc[genre] = 1;
      }
    });
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

export const metadata = generatePageMetadata({
  title: 'Movies',
  image: (() => {
    const favorites = byState[State.FINISHED].filter((movies) => movies.favorite);

    return `/static/images/tv/${favorites[Math.floor(Math.random() * favorites.length)].id}-cover.jpg`;
  })(),
  description: `An exhaustive list of the ${byState[State.FINISHED].length} movies I've seen, ever.The most common genres among these are ${readableGenresCombinedWithAnd}.`,
});

const stateOrder = [State.UPCOMING, State.FINISHED];

const stateDescription = {
  [State.UPCOMING]: "Either unreleased or haven't found the time and place yet.",
};

const stateColor = {
  [State.UPCOMING]: 'bg-orange-300 dark:bg-orange-950/50',
  [State.FINISHED]: 'bg-green-300 dark:bg-green-950/50',
};

export default async function MoviesPage() {
  const totalRuntime =
    data.reduce((acc, movie) => (movie.seen ? acc + movie.metadata.runtime : acc), 0) / 60 / 24;

  return (
    <>
      <div className="mx-auto max-w-7xl p-4">
        <h1 className="pb-6 text-3xl leading-9 font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-300">
          Movies
        </h1>

        <p className="py-4">
          An exhaustive list of movies I've seen, ever. The most common genres among these{' '}
          {data.filter((movie) => movie.seen).length} movies are{' '}
          <b>{readableGenresCombinedWithAnd}</b>. I'm not actively going out of my way to seek these
          genres specifically, it just happens. Sci-Fi certainly has an edge however. Total runtime
          amounts to <b>{totalRuntime.toFixed(2)}</b> days.
        </p>

        <p>
          Each group below is ordered by release date in descending order. Golden borders indicate
          favorites/recommendations. You can hover an image for the title should it not be obvious
          by the image already, and click them to see more information.
        </p>
      </div>

      {stateOrder.map((state) => {
        const movies = sortByYearDesc(byState[state]);

        return (
          <section key={state} className="mx-auto" aria-labelledby={`${state}-title`}>
            <div className={`p-8 ${stateColor[state]}`}>
              <h2
                id={`${state}-title`}
                className="text-5xl font-black tracking-wide uppercase underline decoration-black/50 decoration-6 underline-offset-8 md:text-7xl md:decoration-10 2xl:text-9xl dark:decoration-white/50"
              >
                {state}
              </h2>

              {stateDescription[state] ? (
                <p className="mt-8 2xl:text-lg">{stateDescription[state]}</p>
              ) : null}
            </div>

            <div
              className={clsx(
                state === State.UPCOMING
                  ? 'flex justify-evenly'
                  : 'grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))]',
                'mx-auto max-w-7xl gap-4 p-4 md:max-w-9/10 md:gap-6'
              )}
            >
              {movies.map((movie) => {
                const classes = [
                  'rounded-md border-2 transition ease-in-out hover:opacity-100 shadow-inner hover:shadow-none',
                ];

                const releaseDate = new Date(
                  [
                    movie.metadata.release.year,
                    movie.metadata.release.month,
                    movie.metadata.release.day,
                  ].join('-')
                );

                const isUpcoming = releaseDate > new Date();

                if (isUpcoming || !movie.seen) {
                  classes.push('grayscale dark:border-slate-700');
                } else if (movie.favorite) {
                  classes.push(
                    'border-yellow-500 hover:border-yellow-600 dark:border-amber-400 dark:hover:border-amber-500'
                  );
                } else {
                  classes.push(
                    'border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-primary-700'
                  );
                }

                const classString = clsx(classes);

                const title = isUpcoming
                  ? `${movie.title} (releasing ${releaseDate.toISOString().split('T')[0]})`
                  : movie.title;

                return (
                  <a
                    href={`https://www.themoviedb.org/movie/${movie.id}`}
                    target="_blank"
                    key={movie.id}
                    className="flex max-w-[120px] justify-center opacity-80 hover:opacity-100"
                  >
                    <Image
                      title={title}
                      alt={movie.title}
                      width={120}
                      height={180}
                      className={classString}
                      loading={movie.seen ? 'lazy' : 'eager'}
                      src={`/static/images/tv/${movie.id}-cover.jpg`}
                    />

                    <span className="sr-only">
                      {movie.title} - {movie.metadata.tagline}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
