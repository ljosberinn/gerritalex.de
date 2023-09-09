import Drawer from "@mui/material/Drawer";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import { siteMetadata } from "~/siteMetadata";
import { isDarkMode } from "~/utils/darkMode";

import menuIcon from "../assets/menu.webp";
import { BlogLinks } from "./BlogLinks";

export function Header() {
  const [shouldShowDrawer, setShouldShowDrawer] = useState(false);
  const [siteLogo, setSiteLogo] = useState(siteMetadata.logo);

  const openDrawer = () => { setShouldShowDrawer(true); };
  const closeDrawer = () => { setShouldShowDrawer(false); };

  useEffect(() => {
    if (isDarkMode() && siteMetadata.logo_dark_mode) {
      setSiteLogo(siteMetadata.logo_dark_mode);
    }
  }, []);

  return (
    <header className="flex w-full max-w-full items-center justify-between gap-x-12 py-8 md:gap-x-0">
      <Link
        className="home not-prose m-0 flex-1 text-3xl font-medium no-underline md:my-4"
        to="/"
      >
        {siteLogo ? (
          <img alt="Website logo" src={siteLogo} loading="lazy" />
        ) : (
          <span>{siteMetadata.domain}</span>
        )}
      </Link>

      <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
        <BlogLinks />
      </div>

      <div className="not-prose sm:hidden" onClick={openDrawer}>
        <img
          alt="Menu"
          src={menuIcon}
          width={42}
          height={42}
          loading="lazy"
          className="dark:invert"
        />
      </div>

      <Drawer
        anchor="right"
        open={shouldShowDrawer}
        onClose={closeDrawer}
        onClick={closeDrawer}
      >
        <div className="flex h-full min-w-[125px] flex-col gap-4 pl-4 pr-8 pt-8 dark:bg-slate-900">
          <BlogLinks />
        </div>
      </Drawer>
    </header>
  );
}
