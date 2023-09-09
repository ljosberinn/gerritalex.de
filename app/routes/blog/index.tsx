import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { PostsList } from "~/components/PostsList";
import { SearchForm } from "~/components/SearchForm";
import { getPagingData } from "~/utils/paging.server";
import  { type Frontmatter } from "~/utils/posts.server";
import { filterPostsByTitle } from "~/utils/posts.server";
import { getPostsSortedByDate } from "~/utils/posts.server";

type LoaderData = {
  page: number;
  posts: Frontmatter[];
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
  query: string | null;
}

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  const posts = query ? filterPostsByTitle(query) : getPostsSortedByDate();
  const data = getPagingData(request, posts);

  return json<LoaderData>({ ...data, query });
};

export default function Blog() {
  const { page, posts, nextPage, previousPage, totalPages, query } =
    useLoaderData<LoaderData>();

  return (
    <div className="w-full">
      <div className="md:flex md:items-center md:justify-between">
        <h1>All posts</h1>
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
