import { gerritalex } from '@/blog/authors';

type Image = 'nextjs' | 'typescript' | 'hyper' | 'vercel';

const iconMap: Record<Image, string> = {
  hyper:
    'https://assets.vercel.com/image/upload/front/assets/design/hyper-bw-logo.svg',
  nextjs:
    'https://assets.vercel.com/image/upload/front/assets/design/nextjs-white-logo.svg',
  // eslint-disable-next-line inclusive-language/use-inclusive-words
  typescript: 'https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg',
  vercel:
    'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg',
};

type Params = {
  title: string;
  fontSize?: number;
  icons?: Image[];
};

const resolveImages = (icons?: Image[]) => {
  if (!icons) {
    return [];
  }

  return icons.map((icon) => iconMap[icon]);
};

export const createOgImageUrl = ({
  title,
  fontSize = 96,
  icons,
}: Params): string => {
  const params = new URLSearchParams({
    fontSize: `${fontSize}px`,
    theme: 'dark',
  });

  resolveImages(icons).forEach((image) => {
    params.append('images', image);
  });

  return `${gerritalex.ogImageSource}${encodeURIComponent(
    title,
  )}?${params.toString()}`;
};
