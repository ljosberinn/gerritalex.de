'use client';

import { Image } from './Image';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import { type Series as SeriesType } from '../app/series/page';

type Filter = 'year-desc' | 'favorites' | 'abandoned' | 'year-asc';

function sortByTitleAsc(a: SeriesType, b: SeriesType) {
  if (a.title < b.title) {
    return -1;
  }

  if (a.title > b.title) {
    return 1;
  }

  return 0;
}

function filterToFavorites(data: SeriesType[]) {
  return data.filter((dataset) => dataset.favorite).sort(sortByTitleAsc);
}

function filterToAbandoned(data: SeriesType[]) {
  return data.filter((dataset) => dataset.abandoned).sort(sortByTitleAsc);
}

function filterToYearDesc(data: SeriesType[]) {
  return data.sort((a, b) => {
    if (a.metadata.release.year !== b.metadata.release.year) {
      return b.metadata.release.year - a.metadata.release.year;
    }

    if (a.metadata.release.month !== b.metadata.release.month) {
      return b.metadata.release.month - a.metadata.release.month;
    }

    return b.metadata.release.day - a.metadata.release.day;
  });
}

function filterToYearAsc(data: SeriesType[]) {
  return data.sort((a, b) => {
    if (a.metadata.release.year !== b.metadata.release.year) {
      return a.metadata.release.year - b.metadata.release.year;
    }

    if (a.metadata.release.month !== b.metadata.release.month) {
      return a.metadata.release.month - b.metadata.release.month;
    }

    return a.metadata.release.day - b.metadata.release.day;
  });
}

const filters: Record<Filter, (data: SeriesType[]) => SeriesType[]> = {
  favorites: filterToFavorites,
  abandoned: filterToAbandoned,
  'year-asc': filterToYearAsc,
  'year-desc': filterToYearDesc,
};

type SeriesProps = {
  data: SeriesType[];
};

export function Series({ data }: SeriesProps) {
  const [filterKind, setFilterKind] = useState<Filter>('year-desc');
  const [displayKind, setDisplayKind] = useState<'table' | 'art'>('art');

  const filter = filters[filterKind];
  const filteredData = filter(data);

  function onFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    setFilterKind(event.target.value as Filter);
  }

  function onDisplayChange(event: ChangeEvent<HTMLInputElement>) {
    setDisplayKind(event.target.value as 'table' | 'art');
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2 py-4 xl:flex-row xl:justify-end">
        <div className="w-full xl:w-1/6">
          <label
            htmlFor="filter"
            className="block pb-2 text-sm font-medium text-gray-700 dark:text-gray-300 xl:pb-0"
          >
            Filter & Sorting
          </label>
          <select
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={onFilterChange}
            value={filterKind}
            id="filter"
          >
            <option value="year-desc">Year Desc</option>
            <option value="year-asc">Year Asc</option>
            <option value="favorites">Favorites</option>
            <option value="abandoned">Abandoned</option>
          </select>
        </div>
        <div className="flex w-full items-end justify-center gap-8 xl:w-1/12 xl:flex-col xl:justify-end xl:gap-1">
          <div className="flex items-center gap-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 xl:pb-0"
              htmlFor="display-art"
            >
              Art
            </label>
            <input
              type="radio"
              id="display-art"
              name="display"
              value="art"
              checked={displayKind === 'art'}
              onChange={onDisplayChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 xl:pb-0"
              htmlFor="display-table"
            >
              Table
            </label>
            <input
              type="radio"
              id="display-table"
              name="display"
              value="table"
              checked={displayKind === 'table'}
              onChange={onDisplayChange}
            />
          </div>
        </div>
      </div>
      {displayKind === 'table' ? (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b p-2 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                Title
              </th>
              <th className="border-b p-2 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                Genres
              </th>
              <th className="hidden border-b p-2 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200 md:table-cell">
                Last Release
              </th>
              {filterKind !== 'abandoned' && filterKind !== 'favorites' ? (
                <>
                  <th className="border-b p-2 pb-3 pl-8 pt-0 text-right font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                    Favorite
                  </th>
                  <th className="border-b p-2 pb-3 pl-8 pt-0 text-right font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                    Abandoned
                  </th>
                </>
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {filteredData.map((series) => {
              const date = `${series.metadata.release.year}-${series.metadata.release.month.toString().padStart(2, '0  ')}-${series.metadata.release.day.toString().padStart(2, '0')}`;
              return (
                <tr key={series.id}>
                  <td className="border-b border-slate-100 p-2 text-slate-500 dark:border-slate-700 dark:text-slate-400 md:p-2 xl:pl-4">
                    <a
                      className="underline"
                      href={`https://www.themoviedb.org/tv/${series.id}`}
                      target="_blank"
                    >
                      <b>{series.title}</b>
                    </a>
                    <br />
                    <i className="hidden md:inline-block">{series.metadata.tagline}</i>
                  </td>
                  <td className="border-b border-slate-100 p-2 text-slate-500 dark:border-slate-700 dark:text-slate-400 md:table-cell md:p-2 xl:pl-4">
                    {series.metadata.genres.slice(0, 3).join(', ')}
                  </td>
                  <td className="hidden border-b border-slate-100 p-2 text-slate-500 dark:border-slate-700 dark:text-slate-400 md:table-cell md:p-2 xl:pl-4">
                    <time dateTime={date}>{date}</time>
                  </td>
                  {filterKind !== 'abandoned' && filterKind !== 'favorites' ? (
                    <>
                      <td className="border-b border-slate-100 p-2 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400 md:p-2 xl:pl-4">
                        {series.favorite ? '✅' : '❌'}
                      </td>
                      <td className="border-b border-slate-100 p-2 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400 md:p-2 xl:pl-4">
                        {series.abandoned ? '✅' : '❌'}
                      </td>
                    </>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          {filteredData.map((series) => {
            const classes = [
              'rounded-md border-2 transition ease-in-out hover:opacity-100 shadow-inner hover:shadow-none',
            ];

            if (series.abandoned) {
              classes.push(
                'border-red-500 hover:border-red-600 dark:border-red-500 hover:dark:border-red-800'
              );
            } else if (series.favorite) {
              classes.push(
                'border-yellow-500 hover:border-yellow-600 dark:border-amber-400 hover:dark:border-amber-500'
              );
            } else {
              classes.push(
                'border-slate-300 dark:border-slate-700 hover:border-slate-800 hover:dark:border-primary-700'
              );
            }

            const classString = clsx(classes);

            const percentage =
              series.episodesSeen === series.metadata.episodes
                ? 1
                : series.episodesSeen === 0
                  ? 0
                  : 1 - series.episodesSeen / series.metadata.episodes;

            const mainImage = (
              <Image
                title={series.title}
                alt={series.title}
                width={120}
                height={180}
                className={classString}
                loading="lazy"
                quality={75}
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
                    <div
                      style={{
                        height: `${percentage === 0 ? 100 : percentage * 100}%`,
                      }}
                      className={`pointer-events-none absolute left-0 top-0 w-full overflow-hidden blur-[0.75px] brightness-50`}
                    >
                      <Image
                        alt=""
                        title={series.title}
                        width={120}
                        height={180}
                        className={classString + ' grayscale'}
                        loading="lazy"
                        quality={75}
                        src={`/static/images/tv/${series.id}-cover.jpg`}
                      />
                    </div>
                    <div>{mainImage}</div>
                  </div>
                ) : (
                  mainImage
                )}

                <span className="sr-only">{series.metadata.tagline}</span>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
