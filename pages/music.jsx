import  { useState, memo, useCallback } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useTranslation } from 'react-i18next';
import { FaYoutube } from 'react-icons/fa';

import { ArtistLink } from '../components';
import { OcticonSearch } from '../components/icons';
import music from '../music.json';

function AlbumLink({ artist, album }) {
  return (
    <a
      href={`//www.youtube.com/results?search_query=${encodeURIComponent(
        artist
      )} ${encodeURIComponent(album)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {album} <FaYoutube />
    </a>
  );
}

const Row = memo(({ artist, month, year, album }) => {
  return (
    <tr>
      <td className="content">
        <ArtistLink artist={artist} />
      </td>
      <td className="message">
        <AlbumLink artist={artist} album={album} />
      </td>
      <td className="message has-text-right">
        <time dateTime={`${year}-${month}`}>
          {month}/{year}
        </time>
      </td>
    </tr>
  );
});

const getFilteredData = (data, filter) => {
  if (!filter) {
    return data;
  }

  return data.filter(
    ({ artist, album }) =>
      artist.toLowerCase().trim().includes(filter) ||
      album.toLowerCase().trim().includes(filter)
  );
};

export default function Music({ music }) {
  const { t } = useTranslation(['music', 'concerts']);
  const [filter, setFilter] = useState('');

  const handleChange = useCallback(
    ({ target: { value } }) => {
      const newFilter = value.trim().toLowerCase();

      if (newFilter === filter) {
        return;
      }

      setFilter(newFilter);
    },
    [filter]
  );

  if (!music) {
    return null;
  }

  const filteredData = getFilteredData(music, filter);

  const amountOfUniqueArists = filteredData.reduce(
    (carry, { artist }) =>
      carry.includes(artist) ? carry : [...carry, artist],
    []
  ).length;

  const amountOfUniqueAlbums = filteredData.reduce(
    (carry, { album, artist }) => {
      return carry.some(
        dataset => dataset.album === album && dataset.artist === artist
      )
        ? carry
        : [...carry, { album, artist }];
    },
    []
  ).length;

  const yearsCollecting = music[0].year - music[music.length - 1].year;

  return (
    <table className="files">
      <thead>
        <tr>
          <th>Artist</th>
          <th>Album</th>
          <th>Bought</th>
        </tr>
        <tr>
          <td colSpan={3}>
            <div className="subnav-search pr-2">
              <DebounceInput
                debounceTimeout={300}
                className="form-control input-block subnav-search-input"
                type="search"
                placeholder="Filter albums..."
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
        {filteredData.map(dataset => (
          <Row key={Object.values(dataset).join('-')} {...dataset} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            {[
              amountOfUniqueArists,
              amountOfUniqueArists === 1
                ? t('concerts:artist').toLowerCase()
                : t('concerts:artist-plural'),
            ].join(' ')}
          </td>
          <td>
            {[
              amountOfUniqueAlbums,
              amountOfUniqueAlbums === 1 ? t('album') : t('album-plural'),
            ].join(' ')}
          </td>
          <td className="has-text-right">
            {yearsCollecting} {t('years')}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export function getStaticProps() {
  return {
    props: {
      music: music.filter(dataset => !dataset.hidden).reverse(),
    },
    revalidate: 28_800,
  };
}
