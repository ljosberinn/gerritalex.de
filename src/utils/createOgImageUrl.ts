const baseUrl = 'https://jackyef-og-img.vercel.app/';

type Params = {
  title: string;
  fontSize?: number;
};

export const createOgImageUrl = ({ title, fontSize = 96 }: Params): string => {
  return `${baseUrl}${encodeURIComponent(title)}?fontSize=${fontSize}px`;
};
