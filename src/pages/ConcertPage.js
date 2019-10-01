import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import OcticonSearch from '../components/icons/OcticonSearch.js';

const concerts = require('../concerts.json')
  .reduce((carry, { artist, venue, date, concert }) => {
    // reduce to {artist: ..., shows: [showArr]}
    const previousEntry = carry.find(dataset => dataset.artist === artist);

    if (!previousEntry) {
      return carry.concat({ artist, shows: [{ venue, date, concert }] });
    }

    return carry.map(dataset => {
      if (dataset.artist === artist) {
        return {
          ...dataset,
          shows: dataset.shows.concat({ venue, date, concert })
        };
      }

      return dataset;
    });
  }, [])
  .sort(
    (a, b) => (new Date(a.shows[0].date) < new Date(b.shows[0].date) ? 1 : -1) // sort DESC
  )
  .map(dataset => ({ ...dataset, shows: dataset.shows.reverse() })); // reverse shows

const ArtistAnchor = ({ artist }) => (
  <a
    href={`//last.fm/music/${artist}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {artist}
  </a>
);

const Row = memo(
  ({ date, artist, amountOfShows, venue, concert, isFirstShow }) => (
    <tr>
      {isFirstShow && (
        <td className="content" rowSpan={amountOfShows}>
          <ArtistAnchor artist={artist} />
        </td>
      )}
      <td className="age">
        <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
      </td>
      <td className="message">{venue}</td>
      <td className="message">{concert}</td>
    </tr>
  )
);

const ConcertPage = () => {
  const { t } = useTranslation('concerts');
  const [filter, setFilter] = useState('');

  const handleChange = ({ target }) => {
    const value = target.value.trim().toLowerCase();

    if (filter === value) {
      return;
    }

    setFilter(value);
  };

  const filteredConcerts =
    filter.length === 0
      ? concerts
      : concerts.reduce((carry, { artist, shows }) => {
          // search within artist
          if (
            artist
              .toLowerCase()
              .trim()
              .indexOf(filter) > -1
          ) {
            return carry.concat({ artist, shows });
          }

          // search within shows
          const filteredShows = shows.filter(show => {
            let isMatch = false;

            Object.values(show).forEach(value => {
              if (
                value
                  .toLowerCase()
                  .trim()
                  .indexOf(filter) > -1
              ) {
                isMatch = true;
              }
            });

            return isMatch;
          });

          // no shows === no match
          if (filteredShows.length === 0) {
            return carry;
          }

          return carry.concat({ artist, shows: filteredShows });
        }, []);

  const amountOfShows = filteredConcerts.reduce(
    (carry, { shows: { length } }) => carry + length,
    0
  );

  return (
    <div className="mt-4">
      <table className="files">
        <thead>
          <tr>
            <th>{t('artist')}</th>
            <th className="age">{t('date')}</th>
            <th>{t('venue')}</th>
            <th>{t('concert')}</th>
          </tr>
          <tr>
            <td colSpan={4} className="">
              <div className="subnav-search pr-2">
                <input
                  className="form-control input-block subnav-search-input"
                  type="search"
                  placeholder="Filter artists..."
                  autoFocus
                  onChange={handleChange}
                  autoComplete="off"
                  spellCheck="false"
                />
                <OcticonSearch />
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredConcerts.map(({ shows, artist }) =>
            shows.map(({ date, venue, concert }) => (
              <Row
                {...{
                  date,
                  artist,
                  venue,
                  concert,
                  isFirstShow:
                    shows.findIndex(show => show.date === date) === 0,
                  amountOfShows: shows.length
                }}
                key={`${date}-${artist}`}
              />
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              {[
                filteredConcerts.length,
                filteredConcerts.length === 1
                  ? t('artist').toLowerCase()
                  : t('artist-plural')
              ].join(' ')}
            </td>
            <td colSpan={2}>
              {[
                amountOfShows,
                amountOfShows === 1 ? t('show-single') : t('show-plural')
              ].join(' ')}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ConcertPage;
