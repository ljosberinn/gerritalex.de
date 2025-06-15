import { generatePageMetadata } from '../seo';
import data from '../../prebuild/series/data.json' with { type: 'json' };
import clsx from 'clsx';
import { Image } from '../../components/Image';

enum State {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  FINISHED = 'finished',
  ABANDONED = 'abandoned',
}

const byState = data.reduce<Record<State, Series[]>>(
  (acc, series) => {
    if (!(series.state in acc)) {
      acc[series.state] = [];
    }

    acc[series.state].push(series);

    return acc;
  },
  {
    [State.ABANDONED]: [],
    [State.FINISHED]: [],
    [State.ONGOING]: [],
    [State.UPCOMING]: [],
  }
);

function sortByYearDesc(data: Series[]) {
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

const genresByOccurence = data.reduce<Record<string, number>>((acc, series) => {
  if (series.metadata.genres.length > 0) {
    series.metadata.genres.forEach((genre) => {
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

    acc.push(' and ' + genre);
    return acc;
  }, [])
  .join('');

export const metadata = generatePageMetadata({
  title: 'Series',
  image: (() => {
    const eligibleSeries = byState[State.ONGOING];

    if (eligibleSeries.length === 0) {
      return undefined;
    }

    const favorites = eligibleSeries.filter((series) => series.favorite);
    const series = favorites.length === 0 ? eligibleSeries : favorites;

    return `/static/images/tv/${series[Math.floor(Math.random() * series.length)].id}-cover.jpg`;
  })(),
  description: `An exhaustive list of the ${data.length} series I've watched, ever. The most common genres among these are ${readableGenresCombinedWithAnd}.`,
});

export type Series = (typeof data)[0];

const stateOrder = [State.UPCOMING, State.ONGOING, State.FINISHED, State.ABANDONED];

const stateDescription = {
  [State.UPCOMING]: "Either unreleased, haven't started yet or have more seasons coming.",
  [State.ONGOING]: "Series I'm currently watching and/or have to finish.",
  [State.FINISHED]: "Concluded series of which I've seen the entirety of.",
  [State.ABANDONED]:
    "Series I've abandoned, largely due to poor/deteriorating quality or lack of interest.",
};

const stateColor = {
  [State.UPCOMING]: 'bg-orange-300 dark:bg-orange-950/50',
  [State.ONGOING]: 'bg-yellow-300 dark:bg-yellow-950/50',
  [State.FINISHED]: 'bg-green-300 dark:bg-green-950/50',
  [State.ABANDONED]: 'bg-red-300 dark:bg-red-950/50',
};

export default async function SeriesPage() {
  const totalRuntimeMinutesEstimated = data.reduce((acc, dataset) => {
    return acc + dataset.episodesSeen * 45;
  }, 0);

  const days = Math.floor(totalRuntimeMinutesEstimated / 60 / 24);
  const hours = Math.floor((totalRuntimeMinutesEstimated / 60) % 24);
  const minutes = Math.floor(totalRuntimeMinutesEstimated % 60);

  const totalRuntime = [
    days > 0 ? `${days} days` : null,
    hours > 0 ? `${hours} hours` : null,
    minutes > 0 ? `${minutes} minutes` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div className="mx-auto max-w-7xl p-4">
        <h1 className="pb-6 text-3xl leading-9 font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-300">
          Series
        </h1>

        <p className="py-4">
          An exhaustive list of series I've watched, ever. The most common genres among these{' '}
          <b>{data.length}</b> series are <b>{readableGenresCombinedWithAnd}</b>. I'm not actively
          going out of my way to seek these genres specifically, it just happens. Sci-Fi certainly
          has an edge however. Total runtime of seen episodes using an estimate of 45 minutes per
          episode amounts to{' '}
          <b title={`${totalRuntimeMinutesEstimated.toLocaleString()} minutes`}>{totalRuntime}</b>.
        </p>

        <p>
          Each group below is ordered by release date in descending order. Golden borders indicate
          favorites/recommendations. Grayscale progress of the poster image indicates how much of
          the series I've seen. You can hover an image for the title should it not be obvious by the
          image already, and click them to see more information.
        </p>
      </div>

      {stateOrder.map((state) => {
        const series = sortByYearDesc(byState[state]);

        return (
          <section key={state} className="mx-auto" aria-labelledby={`${state}-title`}>
            <div className={`p-8 ${stateColor[state]}`}>
              <h2
                id={`${state}-title`}
                className="text-5xl font-black tracking-wide uppercase underline decoration-black/50 decoration-6 underline-offset-8 md:text-7xl md:decoration-10 2xl:text-9xl dark:decoration-white/50"
              >
                {state}
              </h2>

              <p className="mt-8 2xl:text-lg">{stateDescription[state]}</p>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-4 p-4 md:max-w-9/10 md:gap-6">
              {series.map((series) => {
                const classes = [
                  'rounded-md border-2 transition ease-in-out hover:opacity-100 shadow-inner hover:shadow-none',
                ];

                if (series.state === State.ABANDONED) {
                  classes.push(
                    'border-red-500 hover:border-red-600 dark:border-red-500 dark:hover:border-red-800'
                  );
                } else if (series.favorite) {
                  classes.push(
                    'border-yellow-500 hover:border-yellow-600 dark:border-amber-400 dark:hover:border-amber-500'
                  );
                } else {
                  classes.push(
                    'border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-primary-700'
                  );
                }

                const classString = clsx(classes);

                const percentage =
                  series.episodesSeen === series.metadata.episodes
                    ? 1
                    : series.episodesSeen === 0
                      ? 0
                      : 1 - series.episodesSeen / series.metadata.episodes;

                const title =
                  percentage === 1 || percentage === 0
                    ? series.title
                    : `${series.title} (seen ${series.episodesSeen} of ${series.metadata.episodes})`;

                const mainImage = (
                  <Image
                    title={title}
                    alt={series.title}
                    width={120}
                    height={180}
                    className={classString}
                    loading={series.state === State.UPCOMING ? 'eager' : 'lazy'}
                    src={`/static/images/tv/${series.id}-cover.jpg`}
                  />
                );

                return (
                  <a
                    href={`https://www.themoviedb.org/tv/${series.id}`}
                    target="_blank"
                    key={series.id}
                    className="opacity-80 hover:opacity-100"
                  >
                    {percentage < 1 ? (
                      <div className="relative">
                        <span
                          style={{
                            height: percentage === 0 ? undefined : `${percentage * 100}%`,
                          }}
                          className={clsx(
                            `pointer-events-none absolute top-0 left-0 w-full overflow-hidden blur-[0.75px] brightness-50`,
                            percentage === 0 && 'h-full'
                          )}
                        >
                          <Image
                            alt=""
                            title={series.title}
                            width={120}
                            height={180}
                            className={classString + ' grayscale'}
                            loading={series.state === State.UPCOMING ? 'eager' : 'lazy'}
                            src={`/static/images/tv/${series.id}-cover.jpg`}
                          />
                        </span>
                        {mainImage}
                      </div>
                    ) : (
                      mainImage
                    )}

                    <span className="sr-only">
                      {series.title} - {series.metadata.tagline}
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
