import type { NextApiRequest, NextApiResponse } from 'next';
import { URLSearchParams } from 'url';

type Track = {
  album: {
    mbid: string;
    '#text': string;
  };
  artist: {
    mbid: string;
    '#text': string;
  };
  date: {
    uts: string;
    '#text': string;
  };
  mbid: string;
  url: string;
  streamable: '0' | '1';
  name: string;
  image: {
    size: 'small' | 'medium' | 'large' | 'extralarge';
    '#text': string;
  }[];
  '@attr'?: {
    nowplaying: 'true';
  };
};

type LastFmRecentTracks = {
  recenttracks: {
    '@attr': {
      page: string;
      perPage: string;
      total: string;
      totalPages: string;
      user: string;
    };
    track: Track[];
  };
};

const extractRelevantTrackData = (track: Track) => ({
  album: track.album['#text'],
  artist: track.artist['#text'],
  image:
    track.image.find((image) => image.size === 'medium')?.['#text'] ?? null,
  nowPlaying: track['@attr']?.nowplaying === 'true',
  timestamp: track.date ? Number.parseInt(track.date.uts) * 1000 : null,
  track: track.name,
});

export type LatestTrack =
  | ReturnType<typeof extractRelevantTrackData>
  | {
      album: null;
      artist: null;
      image: null;
      nowPlaying: false;
      track: null;
      timestamp: null;
    };

const baseUrl = 'http://ws.audioscrobbler.com/2.0';

const getCurrentTrack = async () => {
  const params = new URLSearchParams({
    api_key: process.env.LAST_FM_API_KEY,
    format: 'json',
    limit: '2',
    method: 'user.getrecenttracks',
    user: 'XHS207GA',
  }).toString();

  const url = `${baseUrl}?${params}`;

  const response = await fetch(url);
  const json: LastFmRecentTracks = await response.json();

  if (json.recenttracks.track.length === 0) {
    throw new Error('something went wrong');
  }

  const currentlyPlayingTrack = json.recenttracks.track.find(
    (track) => track['@attr']?.nowplaying === 'true',
  );

  return extractRelevantTrackData(
    currentlyPlayingTrack ? currentlyPlayingTrack : json.recenttracks.track[0],
  );
};

// eslint-disable-next-line import/no-default-export
export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const data = await getCurrentTrack();

    res.json(data);
  } catch {
    const noData: LatestTrack = {
      album: null,
      artist: null,
      image: null,
      nowPlaying: false,
      timestamp: null,
      track: null,
    };

    res.json(noData);
  }
}
