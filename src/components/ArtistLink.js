import React from 'react';
import { faLastfm } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ArtistLink({ artist }) {
  return (
    <a
      href={`//last.fm/music/${encodeURIComponent(artist)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {artist} <FontAwesomeIcon icon={faLastfm} />
    </a>
  );
}
