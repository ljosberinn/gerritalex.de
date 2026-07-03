import { mkdir, readdir, stat } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

function warn(...args: unknown[]) {
  console.log(`[Thumbnails]`, ...args);
}

// 2x the 120px display size of the /music, /movies and /series grids
const THUMBNAIL_WIDTH = 240;

type ThumbnailSource = {
  dir: string;
  // set for square crops (album covers); posters keep their aspect ratio
  height?: number;
};

const sources: ThumbnailSource[] = [
  { dir: './public/static/images/music', height: THUMBNAIL_WIDTH },
  { dir: './public/static/images/tv' },
];

const CONCURRENCY = 16;

async function generateThumbnail(
  sourcePath: string,
  thumbPath: string,
  height: number | undefined
): Promise<boolean> {
  try {
    const [sourceStats, thumbStats] = await Promise.all([stat(sourcePath), stat(thumbPath)]);

    if (thumbStats.mtimeMs >= sourceStats.mtimeMs) {
      return false;
    }
  } catch {
    // thumbnail doesn't exist yet
  }

  await sharp(sourcePath)
    .resize({
      width: THUMBNAIL_WIDTH,
      height,
      fit: height === undefined ? 'inside' : 'cover',
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(thumbPath);

  return true;
}

export async function generateThumbnails(): Promise<void> {
  console.time('generateThumbnails');

  for (const { dir, height } of sources) {
    const thumbsDir = join(dir, 'thumbs');
    await mkdir(thumbsDir, { recursive: true });

    const entries = await readdir(dir, { withFileTypes: true });
    const jpgs = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.jpg'));

    let created = 0;

    for (let i = 0; i < jpgs.length; i += CONCURRENCY) {
      const results = await Promise.all(
        jpgs.slice(i, i + CONCURRENCY).map((entry) => {
          const sourcePath = join(dir, entry.name);
          const thumbPath = join(thumbsDir, entry.name.replace(/\.jpg$/, '.webp'));

          return generateThumbnail(sourcePath, thumbPath, height).catch((error) => {
            warn(`Failed to generate thumbnail for ${sourcePath}:`, error);
            return false;
          });
        })
      );

      created += results.filter(Boolean).length;
    }

    warn(`${dir}: ${created} generated, ${jpgs.length - created} up to date`);
  }

  console.timeEnd('generateThumbnails');
}
