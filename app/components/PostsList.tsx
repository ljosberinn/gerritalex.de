import  { type Frontmatter } from "~/utils/posts.server";

import { Card } from "./Card";
import { InternalLink } from "./InternalLink";

type Post = Pick<Frontmatter, "formattedDate" | "slug" | "summary" | "title">;

type Props = {
  page: number;
  posts: Post[];
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
}

export function PostsList({
  posts,
  page,
  previousPage,
  nextPage,
  totalPages,
}: Props) {
  return (
    <div className="prose-h3:mb-0 prose-p:my-2 lg:prose-h3:mb-0 lg:prose-p:my-2">
      {posts.length > 0 ? (
        <>
          <div className="not-prose flex-wrap sm:flex">
            {posts.map((post, index) => (
              <div key={post.slug} className="mb-12 sm:w-1/2">
                <div className={index % 2 === 0 ? "sm:mr-6" : "sm:ml-6"}>
                  <Card {...post} />
                </div>
              </div>
            ))}
          </div>

          <div className="mb-16 flex justify-between">
            {previousPage === null ? (
              <div />
            ) : (
              <InternalLink to={`?page=${previousPage}`}>Previous</InternalLink>
            )}
            {page + 1} of {totalPages}
            {nextPage === null ? (
              <div />
            ) : (
              <InternalLink to={`?page=${nextPage}`}>Next</InternalLink>
            )}
          </div>
        </>
      ) : (
        <div className="not-prose flex-wrap sm:flex">
          <h3>No results</h3>
        </div>
      )}
    </div>
  );
}
