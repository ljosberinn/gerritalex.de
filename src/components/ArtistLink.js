import React from 'react';
import { FaLastfm } from 'react-icons/fa';

export default function ArtistLink({ artist }) {
  return (
    <a
      href={`//last.fm/music/${encodeURIComponent(artist)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {artist} <FaLastfm />
    </a>
  );
}
