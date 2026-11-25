import { writeFile } from 'fs/promises';
import { lastFmOptions } from '../common.ts';
import data from './data.json' with { type: 'json' };
import { indexLibrary, normalizeName, playsFor, type LastFmAlbum } from './plays.ts';

function warn(...args: unknown[]) {
  console.log(`[Last.fm]`, ...args);
}

const root = 'https://ws.audioscrobbler.com/2.0/';
const user = 'XHS207GA';
const limit = 1000;
const attempts = 3;
// operation failed, service offline, temporary error, rate limit exceeded
const retryableErrors = new Set([8, 11, 16, 29]);

type TopAlbumsResponse = {
  topalbums: {
    album: {
      artist: { name: string };
      name: string;
      playcount: string;
    }[];
    '@attr': {
      page: string;
      totalPages: string;
      total: string;
    };
  };
};

type ErrorResponse = {
  error: number;
  message: string;
};

// not doFetch: it logs the request URL, which carries the API key
async function fetchPage(page: number, apiKey: string): Promise<TopAlbumsResponse | null> {
  const url = new URL(root);
  url.search = new URLSearchParams({
    method: 'user.gettopalbums',
    user,
    period: 'overall',
    limit: `${limit}`,
    page: `${page}`,
    api_key: apiKey,
    format: 'json',
  }).toString();

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, lastFmOptions);
      const json = (await response.json()) as TopAlbumsResponse | ErrorResponse;

      if ('topalbums' in json) {
        return json;
      }

      warn(`page ${page}: error ${json.error} (${json.message})`);

      if (!retryableErrors.has(json.error)) {
        return null;
      }
    } catch (error) {
      warn(`page ${page}:`, error);
    }

    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
    }
  }

  return null;
}

function reportUnlinked(albums: LastFmAlbum[]) {
  const library = indexLibrary(albums);

  const byArtist = new Map<string, LastFmAlbum[]>();

  for (const album of albums) {
    const artist = normalizeName(album.artist);
    byArtist.set(artist, [...(byArtist.get(artist) ?? []), album]);
  }

  const unlinked = data
    .filter(
      (album) => album.visible === true && !('lastfm' in album) && playsFor(album, library) === 0
    )
    .sort((a, b) => a.artist.localeCompare(b.artist) || a.album.localeCompare(b.album));

  if (unlinked.length === 0) {
    warn('every visible album is linked');
    return;
  }

  const lines = [`${unlinked.length} visible albums have no plays and no "lastfm" field:`];

  for (const album of unlinked) {
    lines.push(`  ${album.artist} – ${album.album}`);

    const candidates = byArtist.get(normalizeName(album.artist)) ?? [];

    if (candidates.length === 0) {
      lines.push('      (no albums by this artist)');
    }

    for (const candidate of candidates) {
      lines.push(`      ${candidate.name} (${candidate.playCount})`);
    }
  }

  warn(lines.join('\n'));
}

export async function doLastFmImport(): Promise<{ from: string; to: string }[]> {
  const apiKey = process.env.LAST_FM_API_KEY;

  if (!apiKey) {
    warn('LAST_FM_API_KEY is not set, keeping lastfm.json');
    return [];
  }

  const albums: LastFmAlbum[] = [];
  let totalPages = 1;

  for (let page = 1; page <= totalPages; page++) {
    const json = await fetchPage(page, apiKey);

    if (json === null) {
      warn(`page ${page} failed, keeping lastfm.json`);
      return [];
    }

    totalPages = Number.parseInt(json.topalbums['@attr'].totalPages);

    for (const album of json.topalbums.album) {
      albums.push({
        artist: album.artist.name,
        name: album.name,
        playCount: Number.parseInt(album.playcount),
      });
    }
  }

  // ties sorted by name so reruns produce stable diffs
  albums.sort(
    (a, b) =>
      b.playCount - a.playCount || a.artist.localeCompare(b.artist) || a.name.localeCompare(b.name)
  );

  await writeFile('./prebuild/music/lastfm.json', JSON.stringify(albums, null, 2));

  warn(`${albums.length} albums written to lastfm.json`);

  reportUnlinked(albums);

  return [];
}
