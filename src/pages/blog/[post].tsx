import rehypeToc from "@jsdevtools/rehype-toc";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import { resolve } from "path";
import rehypeSlug from "rehype-slug";
import remarkCodeTitles from "remark-code-titles";

import { ExternalLink } from "../../components/ExternalLink";
import type { PostMetaProps } from "../../components/PostMeta";
import { Prose } from "../../components/Prose";
import { Tags } from "../../components/Tags";
import { createInstance, safePromisify } from "../../utils/db";

type PostProps = {
  meta: PostMetaProps["meta"];
  html: {
    compiledSource: string;
    renderedOutput: string;
    scope: {};
  };
};

// eslint-disable-next-line import/no-default-export
export default function Post({ html, meta }: PostProps): JSX.Element {
  return (
    <article>
      <Prose>
        <h1>{meta.title}</h1>
      </Prose>
      <dl className="flex">
        <dt>released</dt>
        <dd>
          <time dateTime={meta.date}>{new Date(meta.date).toDateString()}</time>
        </dd>

        <dt>views</dt>
        <dt>{meta.views.toLocaleString()}</dt>
      </dl>

      <Tags tags={meta.tags} />
      <Prose>{hydrate(html, { components })}</Prose>
      <Tags tags={meta.tags} />
      {/* <WebMentions /> */}
    </article>
  );
}

const postsDir = resolve(process.cwd(), "src/posts");

const allPostSlugs = readdirSync(postsDir).map((post) => {
  return post.slice(0, -4);
});

export function getStaticPaths(): GetStaticPathsResult {
  return {
    fallback: false,
    paths: allPostSlugs.map((post) => ({ params: { post } })),
  };
}

const components = {
  ExternalLink,
};

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PostProps>> {
  if (!context.params.post || Array.isArray(context.params.post)) {
    throw new Error("nope");
  }

  const { post } = context.params;

  const file = resolve(process.cwd(), `src/posts/${post}.mdx`);
  const { content, data } = matter(readFileSync(file, "utf8"));
  const html = await renderToString(content, {
    components,
    mdxOptions: {
      rehypePlugins: [
        mdxPrism,
        rehypeSlug,
        [
          rehypeToc,
          {
            headings: ["h1", "h2", "h3"],
          },
        ],
      ],

      remarkPlugins: [remarkCodeTitles],
    },
  });

  const views = (await getViews(post)) ?? 0;

  const meta: PostMetaProps["meta"] = {
    ...(data as Omit<PostMetaProps, "views">),
    views,
  };

  return {
    props: {
      html,
      meta,
    },
  };
}

const getViews = (pathname: string) =>
  safePromisify<number>(
    createInstance().select("total").where("pathname", pathname)
  )?.[0]?.total;
