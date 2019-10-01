import React from 'react';
import { OcticonLocation } from '../components/icons';

const music = require('../music.json')
  .reduce((carry, release) => {
    const { artist, ...rest } = release;

    const previousEntry = carry.find(release => release.artist === artist);

    if (!previousEntry) {
      return carry.concat({ artist, releases: [{ ...rest }] });
    }

    return carry.map(dataset => {
      if (dataset.artist === artist) {
        return {
          ...dataset,
          releases: dataset.releases.concat({ ...rest })
        };
      }

      return dataset;
    });
  }, [])
  .map(dataset => ({
    ...dataset,
    releases: dataset.releases.sort((a, b) => (a.album < b.album ? -1 : 1))
  }))
  .sort((a, b) => (a.artist < b.artist ? -1 : 1));

const MusicPage = () => {
  return (
    <div className="albums">
      {music.map(({ artist, releases }) =>
        releases.map(release => (
          <Album
            {...release}
            artist={artist}
            key={[artist, release.album, release.month].join('-')}
          />
        ))
      )}
    </div>
  );
};

const Album = ({ artist, month, year, album }) => (
  <div className="pb-2 px-2">
    <div className="d-flex mt-3">
      <div className="flex-self-start" style={{ display: 'none' }}>
        <div className="rounded-1 overflow-hidden">
          <a
            href={`//last.fm/user/XHS207GA/library/music/${artist}/${album}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              className="d-block"
              height="60"
              width="60"
              alt={`${artist}-${album}`}
              src="https://avatars0.githubusercontent.com/u/29307652?s=180"
            />
          </a>
        </div>
      </div>

      <div className="overflow-hidden ml-3">
        <a
          className="f5 text-bold link-gray-dark no-underline"
          href={`//last.fm/user/XHS207GA/library/music/${artist}/${album}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {artist}
        </a>

        <div className="mt-1">
          <a
            className="link-gray no-underline"
            href={`//youtube.com/results?search_query=${artist}+${album}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {album}
          </a>
        </div>

        <div className="mt-2 text-gray text-small">
          {month}-{year}
        </div>
      </div>
    </div>
  </div>
);

export default MusicPage;
