'use client';

import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatDate } from '../../lib/content';

type SearchDocument = {
  path: string;
  title: string;
  summary?: string;
  date: string;
};

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchDocumentsPath: string;
};

export function SearchDialog({ open, onOpenChange, searchDocumentsPath }: SearchDialogProps) {
  const router = useRouter();
  const [documents, setDocuments] = useState<SearchDocument[] | null>(null);

  useEffect(() => {
    fetch(new URL(searchDocumentsPath, window.location.origin))
      .then((response) => response.json())
      .then(setDocuments)
      .catch(() => setDocuments([]));
  }, [searchDocumentsPath]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search"
      overlayClassName="fixed inset-0 z-50 bg-gray-300/50 backdrop-blur dark:bg-black/50"
      contentClassName="fixed top-[14vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-center space-x-4 p-4">
        <span className="block w-5">
          <svg
            className="text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <Command.Input
          placeholder="Type a command or search…"
          className="h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500"
        />
        <kbd className="inline-block rounded border border-gray-400 px-1.5 align-middle text-xs leading-4 font-medium tracking-wide whitespace-nowrap text-gray-400">
          ESC
        </kbd>
      </div>
      <Command.List className="max-h-[400px] overflow-y-auto">
        {documents === null ? (
          <Command.Loading className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
            Loading...
          </Command.Loading>
        ) : (
          <>
            <Command.Empty className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
              No results for your search...
            </Command.Empty>
            <Command.Group
              heading="Content"
              className="**:[[cmdk-group-heading]]:text-primary-600 pt-3 **:[[cmdk-group-heading]]:block **:[[cmdk-group-heading]]:border-t **:[[cmdk-group-heading]]:border-gray-100 **:[[cmdk-group-heading]]:px-4 **:[[cmdk-group-heading]]:pt-6 **:[[cmdk-group-heading]]:pb-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase dark:**:[[cmdk-group-heading]]:border-gray-800"
            >
              {documents.map((document) => (
                <Command.Item
                  key={document.path}
                  value={document.path}
                  keywords={[document.title, document.summary ?? '']}
                  onSelect={() => {
                    onOpenChange(false);
                    router.push(`/${document.path}`);
                  }}
                  className="group data-[selected=true]:bg-primary-600 flex cursor-pointer justify-between bg-transparent px-4 py-2 text-gray-700 data-[selected=true]:text-gray-100 dark:text-gray-100"
                >
                  <div className="block">
                    <div className="text-xs text-gray-400 group-data-[selected=true]:text-gray-200">
                      {formatDate(document.date, 'en-US')}
                    </div>
                    <div>{document.title}</div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </>
        )}
      </Command.List>
    </Command.Dialog>
  );
}
