import { CustomLink } from '@/components/CustomLink';
import { slug } from 'github-slugger';

interface TagProps {
  text: string;
}

export function Tag({ text }: TagProps) {
  return (
    <CustomLink
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </CustomLink>
  );
}
