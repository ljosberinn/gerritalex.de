/*
 *
 * @param {Date} from
 * @param {Date} to
 */
const getDurationInDays = (from, to) =>
  Math.ceil(Math.abs(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

export function Time({ dates, currentLanguage }) {
  let { from, to } = dates;

  // convert to dates
  from = from ? new Date(from) : null;
  to = to ? new Date(to) : null;

  let formattedStart;
  let formattedEnd;

  try {
    const formatter = new Intl.DateTimeFormat(currentLanguage);
    formattedStart = from ? formatter.format(from) : null;
    formattedEnd = formatter.format(to);
  } catch {
    // fallback for browsers where Intl.DateTimeFormat isnt available
    formattedStart = from && from.toLocaleDateString();
    formattedEnd = to && to.toLocaleDateString();
  }

  const attributes = {
    className: 'd-inline-block float-right',
  };

  if (from && to) {
    attributes['aria-label'] = `${getDurationInDays(from, to)}d`;
  }

  return (
    <span {...attributes}>
      {from && (
        <time dateTime={from.toISOString().split('T')[0]}>
          {formattedStart}
        </time>
      )}
      {' - '}
      {to && (
        <time dateTime={to.toISOString().split('T')[0]}>{formattedEnd}</time>
      )}
    </span>
  );
}
