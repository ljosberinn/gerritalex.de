import { type MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

import { PostsList } from "~/components/PostsList";
import { SearchForm } from "~/components/SearchForm";
import { siteMetadata } from "~/siteMetadata";
import { getPagingData } from "~/utils/paging.server";
import { type Frontmatter } from "~/utils/posts.server";
import { filterPostsByTitle } from "~/utils/posts.server";
import { getPostsSortedByDate } from "~/utils/posts.server";

type Params = {
  tag: string;
};

type LoaderData = {
  posts: Frontmatter[];
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
  page: number;
  query: string | null;
};

export const meta: MetaFunction = ({ params }) => {
  const { tag } = params;
  const title = `${tag} - ${siteMetadata.author}`;
  const summary = `Posts about ${tag} of ${siteMetadata.author}.`;

  return {
    title,
    description: summary,
    "og:title": title,
    "og:description": summary,
    "twitter:title": title,
    "twitter:description": summary,
  };
};

export const loader = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const { tag } = params;
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  const posts = query ? filterPostsByTitle(query) : getPostsSortedByDate();
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));
  const data = getPagingData(request, filteredPosts);

  return json<LoaderData>({ ...data, query });
};

export default function Tag(): JSX.Element {
  const { tag } = useParams();
  const { posts, nextPage, previousPage, totalPages, page, query } =
    useLoaderData<LoaderData>();

  return (
    <div className="w-full">
      <div className="md:flex md:items-center md:justify-between">
        <h1>#{tag}</h1>
        <SearchForm query={query} />
      </div>
      <PostsList
        posts={posts}
        page={page}
        totalPages={totalPages}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
}
