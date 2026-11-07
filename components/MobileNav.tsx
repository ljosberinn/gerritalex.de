'use client';

import { useRef } from 'react';
import { CustomLink } from './CustomLink';
import headerNavLinks from 'data/headerNavLinks';

export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openNav = () => dialogRef.current?.showModal();
  const closeNav = () => dialogRef.current?.close();

  return (
    <>
      <button aria-label="Toggle Menu" onClick={openNav} className="sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="hover:text-primary-500 dark:hover:text-primary-400 h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        className="m-0 h-full max-h-none w-full max-w-none translate-x-0 bg-white opacity-95 transition-[translate,opacity,display,overlay] transition-discrete duration-300 ease-in-out not-open:translate-x-full not-open:opacity-0 not-open:duration-200 not-open:ease-in backdrop:bg-black/25 dark:bg-gray-950 dark:opacity-[0.98] starting:open:translate-x-full starting:open:opacity-0"
      >
        <nav className="mt-8 flex h-full basis-0 flex-col items-start overflow-y-auto pt-2 pl-12 text-left">
          {headerNavLinks.map((link) => (
            <CustomLink
              key={link.title}
              href={link.href}
              className="hover:text-primary-500 dark:hover:text-primary-400 mb-4 py-2 pr-4 text-2xl font-bold tracking-widest text-gray-900 outline outline-0 dark:text-gray-100"
              onClick={closeNav}
            >
              {link.title}
            </CustomLink>
          ))}
        </nav>

        <button
          className="hover:text-primary-500 dark:hover:text-primary-400 fixed top-7 right-4 h-16 w-16 p-4 text-gray-900 dark:text-gray-100"
          aria-label="Toggle Menu"
          onClick={closeNav}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </dialog>
    </>
  );
}
