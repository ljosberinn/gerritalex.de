import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import type { GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import { resolve, join } from "path";
import type { ChangeEvent } from "react";
import { useState, useMemo } from "react";
import readingTimeAnalyzer from "reading-time";

import { InternalLink } from "../../components/InternalLink";
import type { PostMetaProps } from "../../components/PostMeta";
import { cs } from "../../utils/classNames";
import type { Schema } from "../../utils/db";
import { createInstance, safePromisify } from "../../utils/db";

type BlogProps = {
  posts: Post[];
};

function usePosts(posts: Post[]) {
  const { query, replace } = useRouter();
  const [filter, setFilter] = useState("");
  const allTags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.meta.tags))],
    [posts]
  );

  const tags = query.tags
    ? Array.isArray(query.tags)
      ? query.tags
      : query.tags.split(",")
    : [];

  const toggleTag = (tag: string) => {
    const next = tags.includes(tag)
      ? tags.filter((currentTag) => currentTag !== tag)
      : [...tags, tag];

    const asString = next.join(",");

    const params =
      asString === ""
        ? asString
        : `?${new URLSearchParams({
            tags: asString,
          }).toString()}`;

    const url = `/blog${params}`;

    // eslint-disable-next-line no-console
    replace(url).catch(console.error);
  };

  const handleSearchChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFilter(value);
  };

  const hasTagFilter = tags.length > 0;
  const hasSearchFilter = filter.length > 0;

  const cleanSearch = filter.trim().toLowerCase();

  return {
    allTags,
    handleSearchChange,
    posts: posts.filter((post) => {
      const isTagMatch = hasTagFilter
        ? tags.every((tag) => post.meta.tags.includes(tag))
        : true;

      const isSearchMatch = hasSearchFilter
        ? post.meta.title.toLowerCase().includes(cleanSearch) ||
          post.meta.description.toLowerCase().includes(cleanSearch)
        : true;

      return !(!isSearchMatch || !isTagMatch);
    }),
    searchValue: filter,
    selectedTags: tags,
    toggleTag,
  };
}

type TagFilterProps = {
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
};

function TagFilter({ allTags, selectedTags, toggleTag }: TagFilterProps) {
  return (
    <>
      <span className="block text-sm font-medium text-gray-700">
        search by topic
      </span>
      <div className="flex py-2 space-x-1">
        {allTags.map((tag) => {
          const checked = selectedTags.includes(tag);

          function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
            if (event.key === "Enter") {
              toggleTag(tag);
            }
          }

          function handleClick() {
            toggleTag(tag);
          }

          const className = cs(
            `rounded-full px-2 py-1 hover:bg-gray-400 hover:text-gray-100 transition-color duration-200 cursor-pointer`,
            checked ? "bg-gray-400 text-gray-100" : "bg-gray-200"
          );

          return (
            <div
              className={className}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onClick={handleClick}
              key={tag}
            >
              #{tag}
            </div>
          );
        })}
      </div>
    </>
  );
}

// eslint-disable-next-line import/no-default-export
export default function Blog({ posts }: BlogProps): JSX.Element {
  const {
    posts: filteredPosts,
    handleSearchChange,
    toggleTag,
    allTags,
    selectedTags,
    searchValue,
  } = usePosts(posts);

  return (
    <>
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700"
        >
          search by title & description
        </label>
        <input
          type="text"
          id="search"
          onChange={handleSearchChange}
          value={searchValue}
          className="mt-1 focus:ring-indigo-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <TagFilter
        toggleTag={toggleTag}
        allTags={allTags}
        selectedTags={selectedTags}
      />

      {filteredPosts.map((post) => (
        <InternalLink href={post.slug} key={post.slug}>
          {post.meta.title}
          <pre>
            <time>{post.meta.date}</time>
          </pre>
          <pre>{post.meta.description}</pre>
          <pre>{post.meta.wordCount}</pre>
          <pre>{post.meta.readingTime}</pre>
        </InternalLink>
      ))}
    </>
  );
}

type Post = {
  meta: PostMetaProps["meta"] & {
    readingTime: string;
    wordCount: number;
  };
  slug: string;
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ posts: Post[] }>
> {
  const allViews = await safePromisify<Pick<Schema, "total" | "pathname">[]>(
    createInstance().select("total", "pathname")
  );

  const postsDir = resolve(process.cwd(), "src/posts");

  const posts = readdirSync(postsDir).map((post) => {
    const slug = `/blog/${post.slice(0, -4)}`;

    const { data, content } = matter(
      readFileSync(join(postsDir, post), "utf8")
    );

    const { text, words } = readingTimeAnalyzer(content);
    const views =
      allViews.find((dataset) => dataset.pathname === slug)?.total ?? 0;

    return {
      meta: {
        ...(data as Omit<Post["meta"], "readingTime" | "views" | "wordCount">),
        readingTime: text,
        views,
        wordCount: words,
      },
      slug,
    };
  });

  return {
    props: { posts },
  };
}
