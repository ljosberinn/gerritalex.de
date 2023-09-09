import  { type SEOHandle } from "@balavishnuvj/remix-seo";
import  { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Badge } from "~/components/Badge";
import { siteMetadata } from "~/siteMetadata";
import { POSTS } from "~/utils/posts.server";

type LoaderData = {
  tags: [string, number][];
}

export const meta: MetaFunction = () => {
  const title = `Tags - ${siteMetadata.author}`;

  return {
    title,
    "og:title": title,
    "twitter:title": title,
  };
};

export const loader: LoaderFunction = async () => {
  const tags: { [tag: string]: number } = {};

  POSTS.forEach((post) => {
    post.attributes.tags.forEach((tag: string) => {
      if (tags[tag]) {
        tags[tag]++;
      } else {
        tags[tag] = 1;
      }
    });
  });

  return json({
    tags: Object.entries(tags).sort((a, b) => b[1] - a[1]),
  });
};

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const tags = POSTS.flatMap((post) => post.attributes.tags);

    return [...new Set(tags)].map((tag) => {
      return { route: `/tags/${tag}`, priority: 0.5 };
    });
  },
};

export default function Tags() {
  const { tags } = useLoaderData<LoaderData>();

  return (
    <div className="mb-auto text-center">
      <h1>Tags</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {tags.map(([tag, count]) => (
          <Badge key={tag} label={`#${tag} (${count})`} linkTo={tag} />
        ))}
      </div>
    </div>
  );
}
