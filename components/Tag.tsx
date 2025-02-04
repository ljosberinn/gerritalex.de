import { CustomLink } from './CustomLink';
import { slug } from 'github-slugger';

interface TagProps {
  text: string;
}

export function Tag({ text }: TagProps) {
  return (
    <CustomLink
      href={`/tags/${slug(text)}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </CustomLink>
  );
}
