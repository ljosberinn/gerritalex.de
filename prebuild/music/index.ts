import { doFetch, Nullable, discogsOptions } from '../common';
import data from './data.json' with { type: 'json' };
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

function warn(...args: unknown[]) {
  console.log(`[Music]`, ...args);
}

type DiscogsSearchResponse = {
  pagination: {
    items: number;
    page: number;
    pages: number;
    per_page: number;
    urls: Record<string, unknown>;
  };
  results: Array<{
    barcode: string[];
    catno: string;
    community: {
      want: number;
      have: number;
    };
    country: string;
    cover_image: string;
    format: string[];
    format_quantity: number;
    genre: string[];
    formats: { namme: string; qty: string; text: string; descriptions: string[] };
    id: number;
    label: string[];
    master_id: number;
    master_url: string;
    resource_url: string;
    style: string[];
    thumb: string;
    title: string;
    type: string;
    uri: string;
    user_data: {
      in_wantlist: boolean;
      in_collection: boolean;
    };
    year: string;
  }>;
};

type DiscogsMasterResponse = {
  id: number;
  main_release: number;
  most_recent_release: number;
  resource_url: string;
  uri: string;
  versions_url: string;
  main_release_url: string;
  most_recent_release_url: string;
  num_for_sale: number;
  lowest_price: number;
  images: [
    {
      type: string;
      uri: string;
      resource_url: string;
      uri150: number;
      width: number;
      height: number;
    },
  ];
  genres: string[];
  styles: string[];
  year: number;
  tracklist: {
    position: string;
    type_: string;
    title: string;
    duration: string;
    extraartists?: {
      name: string;
      anv: string;
      join: string;
      role: string;
      tracks: string;
      id: number;
      resource_url: string;
    }[];
  }[];
  artists: {
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    id: number;
    resource_url: string;
  }[];
  title: string;
  data_quality: string;
  videos: {
    uri: string;
    title: string;
    description: null | string;
    duration: number;
    embed: boolean;
  }[];
};

type DiscogsReleaseResponse = {
  id: number;
  status: string;
  year: number;
  resource_url: string;
  uri: string;
  artists: {
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    id: number;
    resource_url: string;
    thumbnail_url: string;
  }[];
  artists_sort: string;
  labels: {
    name: string;
    catno: string;
    entity_type: string;
    entity_type_name: string;
    id: number;
    resource_url: string;
    thumbnail_url: string;
  }[];
  series: unknown[];
  companies: {
    name: string;
    catno: string;
    entity_type: string;
    entity_type_name: string;
    id: number;
    resource_url: string;
    thumbnail_url: string;
  }[];
  formats: { namme: string; qty: string; text: string; descriptions: string[] }[];
  data_quality: string;
  community: {
    have: number;
    want: number;
    rating: {
      count: number;
      average: number;
    };
    submitter: {
      username: string;
      resource_url: string;
    };
    contributors: { username: string; resource_url: string }[];
    data_quality: string;
    status: string;
  };
  format_quantity: number;
  date_added: string;
  date_changed: string;
  num_for_sale: number;
  lowest_price: number;
  master_id: number;
  master_url: string;
  title: string;
  country: string;
  released: string;
  notes: string;
  released_formatted: string;
  identifiers: { type: string; value: string; description?: string }[];
  videos: { uri: string; title: string; description: string; embed: boolean }[];
  genres: string[];
  styles: string[];
  tracklist: {
    position: string;
    type_: string;
    title: string;
    duration: string;
  }[];
  extraartists: {
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    id: number;
    resource_url: string;
  }[];
  images: {
    type: string;
    uri: string;
    resource_url: string;
    uri150: string;
    width: number;
    height: number;
  }[];
  thumb: string;
  estimated_weight: number;
  blocked_from_sale: boolean;
};

async function getDiscogsEntryByArtistAndRelease(artist: string, album: string) {
  return doFetch<Nullable<DiscogsSearchResponse>>(
    `https://api.discogs.com/database/search?q=${artist}%20${album}&type=release&token=${process.env.DISCOGS_API_KEY}`,
    discogsOptions
  );
}

async function getDiscogsMasterEntryById(id: number) {
  return doFetch<Nullable<DiscogsMasterResponse>>(
    `https://api.discogs.com/masters/${id}?token=${process.env.DISCOGS_API_KEY}`,
    discogsOptions
  );
}

async function getDiscogsMainReleaseById(id: number) {
  return doFetch<Nullable<DiscogsReleaseResponse>>(
    `https://api.discogs.com/releases/${id}?token=${process.env.DISCOGS_API_KEY}`,
    discogsOptions
  );
}

async function establishId(dataset: (typeof data)[number]): Promise<Nullable<number>> {
  if (dataset.id) {
    return dataset.id;
  }

  const searchResponse = await getDiscogsEntryByArtistAndRelease(dataset.artist, dataset.album);

  if (searchResponse === null) {
    return null;
  }

  if (searchResponse.results.length === 0) {
    warn(`No results found for ${dataset.artist} ${dataset.album}`);
    return null;
  }

  const [topResult] = searchResponse.results;

  if (topResult.master_id > 0) {
    const masterData = await getDiscogsMasterEntryById(topResult.master_id);

    if (masterData === null) {
      return null;
    }

    return masterData.main_release;
  }

  return topResult.id;
}

export async function doDiscogsImport(): Promise<{ from: string; to: string }[]> {
  console.time('doDiscogsImport');

  const images: { from: string; to: string }[] = [];

  for await (const dataset of data) {
    if (dataset.visible === false) {
      continue;
    }

    if (typeof dataset.metadata === 'object' && dataset.metadata !== null) {
      continue;
    }

    const id = await establishId(dataset);

    if (id === null) {
      continue;
    }

    const mainReleaseData = await getDiscogsMainReleaseById(id);

    if (mainReleaseData === null) {
      warn(`no response for ${dataset.artist} - ${dataset.album}`);
      continue;
    }

    dataset.id = id;

    const totalRuntimeInSeconds = mainReleaseData.tracklist.reduce((acc, track) => {
      const [minutes, seconds] = track.duration.split(':');
      return acc + Number.parseInt(minutes) * 60 + Number.parseInt(seconds);
    }, 0);

    // @ts-expect-error this is fine
    dataset.metadata = {
      genres: mainReleaseData.styles,
      release: {
        year: mainReleaseData.year,
      },
      runtime: totalRuntimeInSeconds,
    };

    if (dataset.visible === undefined) {
      dataset.visible = true;
    }

    let frontCover: Nullable<string> = null;

    if (mainReleaseData.images.length === 1) {
      frontCover = mainReleaseData.images[0].uri;
    } else {
      frontCover = mainReleaseData.images.find((image) => image.type === 'primary')?.uri ?? null;
    }

    if (frontCover === null) {
      warn(`No primary image found for ${dataset.artist} - ${dataset.album}`);
    } else {
      images.push({
        from: frontCover,
        to: resolve('./public/static/images/music', `${id}-front.jpg`),
      });
    }
  }

  await writeFile(
    './prebuild/music/data.json',
    JSON.stringify(
      data.sort((a, b) => {
        const byArtist = a.artist.localeCompare(b.artist);

        if (byArtist === 0) {
          const byAlbum = a.album.localeCompare(b.album);

          if (byAlbum === 0) {
            return (a.metadata?.release.year ?? 0) - (b.metadata?.release.year ?? 0);
          }

          return byAlbum;
        }

        return byArtist;
      }),
      null,
      2
    )
  );

  console.timeEnd('doDiscogsImport');

  return images;
}
