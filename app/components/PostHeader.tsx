import Divider from "@mui/material/Divider";

import { siteMetadata } from "~/siteMetadata";
import { formatDate } from "~/utils/date";
import  { type Frontmatter } from "~/utils/posts.server";

import { Badge } from "./Badge";

type Props = {
  attributes: Pick<Frontmatter, "title" | "date" | "tags">;
}

export function PostHeader({ attributes }: Props) {
  return (
    <div className="text-center">
      <h1>{attributes.title}</h1>
      <div className="mb-4 flex flex-wrap items-center justify-center">
        <div className="not-prose mr-2 h-8 w-8 sm:h-12 sm:w-12">
          <img
            src="https://avatars.githubusercontent.com/u/29307652?s=96&v=4"
            alt="Author's avatar"
            className="my-0 h-8 w-8 rounded-[50%] sm:h-12 sm:w-12"
            loading="lazy"
          />
        </div>
        <span className="mr-2">{siteMetadata.author}</span>
        <span className="mr-2 hidden sm:block"> • </span>
        <span className="">{formatDate(attributes.date)}</span>
      </div>
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {attributes.tags.map((tag) => (
          <Badge key={tag} label={`#${tag}`} linkTo={`/tags/${tag}`} />
        ))}
      </div>
      <Divider />
    </div>
  );
}
