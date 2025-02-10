'use client';

import { Image } from './Image';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import { type Movies as MoviesType } from '../app/movies/page';

type Filter = 'year-desc' | 'favorites' | 'year-asc';

function sortByTitleAsc(a: MoviesType, b: MoviesType) {
  if (a.title < b.title) {
    return -1;
  }

  if (a.title > b.title) {
    return 1;
  }

  return 0;
}

function filterToFavorites(data: MoviesType[]) {
  return data.filter((dataset) => dataset.favorite).sort(sortByTitleAsc);
}

function filterToYearDesc(data: MoviesType[]) {
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

function filterToYearAsc(data: MoviesType[]) {
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

const filters: Record<Filter, (data: MoviesType[]) => MoviesType[]> = {
  favorites: filterToFavorites,
  'year-asc': filterToYearAsc,
  'year-desc': filterToYearDesc,
};

type MoviesProps = {
  data: MoviesType[];
};

export function Movies({ data }: MoviesProps) {
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
            className="block pb-2 text-sm font-medium text-gray-700 xl:pb-0 dark:text-gray-300"
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
          </select>
        </div>
        <div className="flex w-full items-end justify-center gap-8 xl:w-1/12 xl:flex-col xl:justify-end xl:gap-1">
          <div className="flex items-center gap-2">
            <label
              className="block text-sm font-medium text-gray-700 xl:pb-0 dark:text-gray-300"
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
              className="block text-sm font-medium text-gray-700 xl:pb-0 dark:text-gray-300"
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
              <th className="border-b p-2 pt-0 pb-3 pl-8 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                Title
              </th>
              <th className="border-b p-2 pt-0 pb-3 pl-8 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                Genres
              </th>
              <th className="hidden border-b p-2 pt-0 pb-3 pl-8 text-left font-medium text-slate-400 md:table-cell dark:border-slate-600 dark:text-slate-200">
                Released
              </th>
              <th className="hidden border-b p-2 pt-0 pb-3 pl-8 text-left font-medium text-slate-400 md:table-cell dark:border-slate-600 dark:text-slate-200">
                Runtime
              </th>
              {filterKind !== 'favorites' ? (
                <th className="border-b p-2 pt-0 pb-3 pl-8 text-right font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                  Favorite
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {filteredData.map((movie) => {
              const date = `${movie.metadata.release.year}-${movie.metadata.release.month.toString().padStart(2, '0  ')}-${movie.metadata.release.day.toString().padStart(2, '0')}`;
              return (
                <tr key={movie.id}>
                  <td className="border-b border-slate-100 p-2 text-slate-500 md:p-2 xl:pl-4 dark:border-slate-700 dark:text-slate-400">
                    <a
                      className="underline"
                      href={`https://www.themoviedb.org/movie/${movie.id}`}
                      target="_blank"
                    >
                      <b>{movie.title}</b>
                    </a>
                    <br />
                    <i className="hidden md:inline-block">{movie.metadata.tagline}</i>
                  </td>
                  <td className="border-b border-slate-100 p-2 text-slate-500 md:table-cell md:p-2 xl:pl-4 dark:border-slate-700 dark:text-slate-400">
                    {movie.metadata.genres.slice(0, 3).join(', ')}
                  </td>
                  <td className="hidden border-b border-slate-100 p-2 text-slate-500 md:table-cell md:p-2 xl:pl-4 dark:border-slate-700 dark:text-slate-400">
                    <time dateTime={date}>{date}</time>
                  </td>
                  <td className="hidden border-b border-slate-100 p-2 text-right text-slate-500 md:table-cell md:p-2 xl:pl-4 dark:border-slate-700 dark:text-slate-400">
                    {movie.metadata.runtime}m
                  </td>
                  {filterKind !== 'favorites' ? (
                    <td className="border-b border-slate-100 p-2 text-right text-slate-500 md:p-2 xl:pl-4 dark:border-slate-700 dark:text-slate-400">
                      {movie.favorite ? '✅' : '❌'}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 pt-4 md:gap-6">
          {filteredData.map((movie) => {
            const classes = [
              'rounded-md border-2 transition ease-in-out hover:opacity-100 shadow-inner hover:shadow-none',
            ];

            if (movie.favorite) {
              classes.push(
                'border-yellow-500 hover:border-yellow-600 dark:border-amber-400 dark:hover:border-amber-500'
              );
            } else {
              classes.push(
                'border-slate-300 dark:border-slate-700 hover:border-slate-800 dark:hover:border-primary-700'
              );
            }

            const classString = clsx(classes);

            return (
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                key={movie.id}
                className="opacity-80 hover:opacity-100"
              >
                <Image
                  title={movie.title}
                  alt={movie.title}
                  width={120}
                  height={180}
                  className={classString}
                  src={`/static/images/tv/${movie.id}-cover.jpg`}
                />

                <span className="sr-only">{movie.metadata.tagline}</span>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
