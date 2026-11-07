'use client';

import dynamic from 'next/dynamic';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const SearchDialog = dynamic(() => import('./SearchDialog').then((mod) => mod.SearchDialog), {
  ssr: false,
});

type SearchContextValue = {
  toggle: () => void;
};

const SearchContext = createContext<SearchContextValue>({ toggle: () => {} });

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({
  searchDocumentsPath,
  children,
}: {
  searchDocumentsPath: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  // keeps the dialog chunk and search index unloaded until the first open
  const [requested, setRequested] = useState(false);

  const setOpenAndRequest = (next: boolean) => {
    setOpen(next);
    if (next) {
      setRequested(true);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setRequested(true);
        setOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <SearchContext.Provider value={{ toggle: () => setOpenAndRequest(!open) }}>
      {requested ? (
        <SearchDialog
          open={open}
          onOpenChange={setOpen}
          searchDocumentsPath={searchDocumentsPath}
        />
      ) : null}
      {children}
    </SearchContext.Provider>
  );
}
