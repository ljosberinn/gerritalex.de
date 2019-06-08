import React from 'react';

/*
 *
 * @param {Date} from
 * @param {Date} to
 */
const getDurationInDays = (from, to) =>
  Math.ceil(Math.abs(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

export const Time = ({ dates }) => {
  const { from, to } = dates;

  const start = from ? new Date(from) : null;
  const end = to ? new Date(to) : new Date();

  const durationInDays = from && getDurationInDays(start, end);

  return (
    <span
      className="d-inline-block float-right"
      aria-label={`${durationInDays}d`}
    >
      {from && to ? (
        <>
          <time dateTime={from}>{start.toLocaleDateString()}</time> -{' '}
          <time dateTime={to}>{end.toLocaleDateString()}</time>
        </>
      ) : from && !to ? (
        <>
          <time dateTime={from}>{start.toLocaleDateString()}</time>
          {' - '}
        </>
      ) : (
        <>
          {' - '}
          <time dateTime={to}>{end.toLocaleDateString()}</time>
        </>
      )}
    </span>
  );
};
