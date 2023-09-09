import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Card } from "~/components/Card";
import { InternalLink } from "~/components/InternalLink";
import { siteMetadata } from "~/siteMetadata";
import  { type Frontmatter } from "~/utils/posts.server";
import { getPostsSortedByDate } from "~/utils/posts.server";

type LoaderData = {
  posts: Frontmatter[];
}

export const loader = async () => {
  const posts = getPostsSortedByDate().slice(0, 4);

  return json<LoaderData>({
    posts,
  });
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <div className="max-w-full prose-h1:mb-0 prose-h3:mb-0  prose-p:my-2 lg:prose-h1:mb-0 lg:prose-h3:mb-0 lg:prose-p:my-2">
      <div className="flex flex-row items-center">
        <div className="not-prose flex h-32 w-32 items-center">
          <img
            src="https://avatars.githubusercontent.com/u/29307652?s=96&v=4"
            alt="Author's avatar"
            className="my-0 rounded-[50%]"
            loading="lazy"
          />
        </div>
        <h1 className="pl-4 font-medium xl:pl-8">Lorem Ipsum</h1>
      </div>

      <p className="pt-4">{siteMetadata.description}</p>

      <div className="mt-16">
        <div className="not-prose flex-wrap sm:flex">
          {posts.map((post, index) => (
            <div key={post.slug} className="mb-12 sm:w-1/2">
              <div className={index % 2 === 0 ? "sm:mr-6" : "sm:ml-6"}>
                <Card {...post} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16 text-right">
        <InternalLink to="/blog">Older posts</InternalLink>
      </div>
    </div>
  );
}
