import React from 'react';

/*
 *
 * @param {Date} from
 * @param {Date} to
 */
const getDurationInDays = (from, to) =>
  Math.ceil(Math.abs(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

export const Time = ({ dates, currentLanguage }) => {
  const { from, to } = dates;

  // convert to dates
  const start = from ? new Date(from) : null;
  const end = to ? new Date(to) : new Date();

  let [formattedStart, formattedEnd] = [null, null];

  try {
    const formatter = new Intl.DateTimeFormat(currentLanguage);
    formattedStart = from ? formatter.format(start) : null;
    formattedEnd = formatter.format(end);
  } catch {
    formattedStart = from && start.toLocaleDateString();
    formattedEnd = to && end.toLocaleDateString();
  }

  const durationInDays = from && getDurationInDays(start, end);

  return (
    <span
      className="d-inline-block float-right"
      aria-label={`${durationInDays}d`}
    >
      {from && <time dateTime={from}>{formattedStart}</time>}
      {' - '}
      {to && <time dateTime={to}>{formattedEnd}</time>}
    </span>
  );
};
