import { InternalLink } from "./InternalLink";

type TagsProps = {
  tags: string[];
};

export function Tags({ tags }: TagsProps): JSX.Element {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="flex list-none text-sm space-x-1">
      {tags.map((tag) => (
        <li key={tag}>
          <InternalLink href={`/blog?tags=${tag}`}>#{tag}</InternalLink>
        </li>
      ))}
    </ul>
  );
}
