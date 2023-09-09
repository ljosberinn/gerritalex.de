import { Link } from "@remix-run/react";

import { siteMetadata } from "~/siteMetadata";

import { SocialMedia } from "./SocialMedia";

export function Footer() {
  return (
    <div>
      <SocialMedia />
      <div className="flex flex-col items-center justify-center space-x-2 py-4 text-xs text-gray-500 dark:text-gray-400 sm:flex-row sm:text-sm ">
        <div>{siteMetadata.author}</div>
        <div className="hidden sm:block">{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div className="hidden sm:block">{` • `}</div>
        <Link to="/" className="text-gray-500 no-underline">
          {siteMetadata.domain}
        </Link>
      </div>
    </div>
  );
}
