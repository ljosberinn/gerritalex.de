export type LastFmAlbum = {
  artist: string;
  name: string;
  playCount: number;
};

// a bare string is an album name by the same artist
export type LastFmLink = string | { artist: string; album: string };

export type LinkableAlbum = {
  artist: string;
  album: string;
  lastfm?: LastFmLink[];
};

export type LastFmLibrary = Map<string, number>;

export function normalizeName(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');
}

const EDITION_MARKER =
  '(?:edition|version|deluxe|remaster(?:ed)?|bonus|expanded|anniversary|re-?issue|re-?release|explicit|clean|premium|vinyl|ep)';

// last.fm lists reissues apart, e.g. "Meteora (Bonus Edition)" or "Worldfall - EP"
const EDITION_SUFFIX = new RegExp(
  `\\s*(?:[([][^)\\]]*\\b${EDITION_MARKER}\\b[^)\\]]*[)\\]]|\\s[-–]\\s[^-–]*\\b${EDITION_MARKER}\\b[^-–]*)$`,
  'iu'
);

function withoutEditionSuffix(album: string): string {
  let stripped = album;
  let next = album.replace(EDITION_SUFFIX, '');

  // a name that is nothing but a suffix keeps it
  while (next !== stripped && next !== '') {
    stripped = next;
    next = stripped.replace(EDITION_SUFFIX, '');
  }

  return stripped;
}

// '|' can't collide with a name since normalizeName strips it
function keyOf(artist: string, album: string): string {
  return `${normalizeName(artist)}|${normalizeName(withoutEditionSuffix(album))}`;
}

export function indexLibrary(albums: LastFmAlbum[]): LastFmLibrary {
  const library: LastFmLibrary = new Map();

  for (const album of albums) {
    const key = keyOf(album.artist, album.name);
    library.set(key, (library.get(key) ?? 0) + album.playCount);
  }

  return library;
}

export function playsFor(album: LinkableAlbum, library: LastFmLibrary): number {
  const links = album.lastfm ?? [album.album];

  // two links can share a key once edition suffixes are gone
  const keys = new Set(
    links.map((link) =>
      typeof link === 'string' ? keyOf(album.artist, link) : keyOf(link.artist, link.album)
    )
  );

  let plays = 0;

  for (const key of keys) {
    plays += library.get(key) ?? 0;
  }

  return plays;
}
