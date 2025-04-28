'use client';

import { Fragment, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react';
import clsx from 'clsx';

function Sun() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="group:hover:text-gray-100 h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Moon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="group:hover:text-gray-100 h-6 w-6"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const items = [
    { name: 'Light', icon: Sun, value: 'light' },
    { name: 'Dark', icon: Moon, value: 'dark' },
    {
      name: 'System',
      icon: function Monitor() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group:hover:text-gray-100 h-6 w-6"
          >
            <rect x="3" y="3" width="14" height="10" rx="2" ry="2"></rect>
            <line x1="7" y1="17" x2="13" y2="17"></line>
            <line x1="10" y1="13" x2="10" y2="17"></line>
          </svg>
        );
      },
      value: 'system',
    },
  ];

  return (
    <div className="mr-5 flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
          <MenuButton aria-label="Theme switcher" className="cursor-pointer">
            {mounted ? resolvedTheme === 'dark' ? <Moon /> : <Sun /> : <svg className="h-6 w-6" />}
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="ring-opacity-5 absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-hidden dark:bg-gray-800">
            <RadioGroup value={theme} onChange={setTheme}>
              <div className="p-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Radio value={item.value} key={item.value}>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            className={clsx(
                              focus ? 'bg-primary-600 text-white' : '',
                              'group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm'
                            )}
                          >
                            <div className="mr-2">{<Icon />}</div>
                            {item.name}
                          </button>
                        )}
                      </MenuItem>
                    </Radio>
                  );
                })}
              </div>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
