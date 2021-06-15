import { useState, memo, useCallback } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useTranslation } from 'react-i18next';

import { ArtistLink } from '../components';
import { OcticonSearch } from '../components/icons';
import concerts from '../concerts.json';

const Row = memo(
  ({ date, artist, amountOfShows, venue, concert, isFirstShow }) => (
    <tr>
      {isFirstShow && (
        <td className="content" rowSpan={amountOfShows}>
          <ArtistLink artist={artist} />
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

const getFilteredData = (data, filter) => {
  if (!filter) {
    return data;
  }

  return data.reduce((carry, { artist, shows }) => {
    // search within artist
    if (artist.toLowerCase().trim().includes(filter)) {
      return [...carry, { artist, shows }];
    }

    // search within shows
    const filteredShows = shows.filter(show => {
      let isMatch = false;

      Object.values(show).forEach(value => {
        if (value.toLowerCase().trim().includes(filter)) {
          isMatch = true;
        }
      });

      return isMatch;
    });

    // no shows === no match
    if (filteredShows.length === 0) {
      return carry;
    }

    return [...carry, { artist, shows: filteredShows }];
  }, []);
};

export default function ConcertPage({ concerts }) {
  const { t } = useTranslation('concerts');
  const [filter, setFilter] = useState('');

  const handleChange = useCallback(
    ({ target }) => {
      const value = target.value.trim().toLowerCase();

      if (filter === value) {
        return;
      }

      setFilter(value);
    },
    [filter]
  );

  if (!concerts) {
    return null;
  }

  const filteredConcerts = getFilteredData(concerts, filter);

  const amountOfShows = filteredConcerts.reduce(
    (carry, { shows: { length } }) => carry + length,
    0
  );

  return (
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
              <DebounceInput
                debounceTimeout={300}
                className="form-control input-block subnav-search-input"
                type="search"
                placeholder="Filter artists..."
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
            key={`${date}-${artist}`}
              {...{
                amountOfShows: shows.length,
                artist,
                concert,
                date,
                isFirstShow: shows.findIndex(show => show.date === date) === 0,
                venue,
              }}
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
                : t('artist-plural'),
            ].join(' ')}
          </td>
          <td colSpan={2}>
            {[
              amountOfShows,
              amountOfShows === 1 ? t('show-single') : t('show-plural'),
            ].join(' ')}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export function getStaticProps() {
  return {
    props: {
      concerts: concerts
        .reduce((carry, { artist, venue, date, concert }) => {
          // reduce to {artist: ..., shows: [showArr]}
          const previousEntry = carry.find(
            dataset => dataset.artist === artist
          );

          if (!previousEntry) {
            return [...carry, { artist, shows: [{ concert, date, venue }] }];
          }

          return carry.map(dataset => {
            if (dataset.artist === artist) {
              return {
                ...dataset,
                shows: [...dataset.shows, { concert, date, venue }],
              };
            }

            return dataset;
          });
        }, [])
        .sort(
          (a, b) =>
            new Date(a.shows[0].date) < new Date(b.shows[0].date) ? 1 : -1 // sort DESC
        )
        .map(dataset => ({ ...dataset, shows: dataset.shows.reverse() })), // reverse shows,
    },
    revalidate: 28_800,
  };
}
