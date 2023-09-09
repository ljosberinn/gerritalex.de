import  { type MetaFunction } from "@remix-run/node";

import { siteMetadata } from "~/siteMetadata";

export const meta: MetaFunction = () => {
  const title = `About - ${siteMetadata.author}`;
  const summary = `About me - ${siteMetadata.author}`;

  return {
    title,
    description: summary,
    "og:title": title,
    "og:description": summary,
    "twitter:title": title,
    "twitter:description": summary,
  };
};

export default function About() {
  return (
    <div className="mb-auto flex flex-col items-center justify-center">
      <div className="not-prose h-48 w-48 sm:mb-8 sm:h-64 sm:w-64">
        <img
          src="https://avatars.githubusercontent.com/u/29307652?s=96&v=4"
          alt="Author's avatar"
          className="my-0 rounded-[50%]"
          loading="lazy"
        />
      </div>

      <h2 className="mt-8 text-center lg:mt-0">{siteMetadata.author}</h2>
      <span className="text-slate-500">{siteMetadata.professionalTitle}</span>

      <p>{siteMetadata.aboutMe}</p>
    </div>
  );
}
