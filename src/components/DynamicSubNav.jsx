import React, { useCallback, useEffect, useState } from 'react';

const navTypes = [
  {
    title: 'Overview',
    hasCounter: false
  },
  {
    title: 'Repositories',
    hasCounter: true
  },
  {
    title: 'Projects',
    hasCounter: true
  },
  {
    title: 'Stars',
    hasCounter: true
  },
  {
    title: 'Followers',
    hasCounter: true
  },
  {
    title: 'Following',
    hasCounter: true
  }
];

const ANCHOR_CLASSES = ['UnderlineNav-item', 'mr-0', 'mr-md-1', 'mr-lg-3'];

/**
 *
 * @param {string} userName
 * @param {string} title
 */
const createHref = (userName, title) =>
  `https://github.com/${userName}/${
    title !== 'Overview' ? title.toLowerCase() : ''
  }`;

/**
 *
 * @param {number} key
 */
const getClasses = key =>
  [...ANCHOR_CLASSES, key === 0 ? 'selected' : null].join(' ').trim();

const DEFAULT_STATE = {
  subNavStats: [0, 0, 0, 0, 0]
};

export const DynamicSubNav = ({ userName }) => {
  const [{ subNavStats }, setStats] = useState(DEFAULT_STATE);

  const getStats = useCallback(async () => {
    const response = await fetch('/stats.json');
    const json = await response.json();

    setStats(json);
  }, []);

  useEffect(() => {
    getStats();
  }, [getStats]);

  return (
    <div
      className="UnderlineNav width-full user-profile-nav top-0"
      style={{ position: 'static' }}
    >
      <nav className="UnderlineNav-body" aria-label="User profile">
        {navTypes.map(({ title, hasCounter }, key) => {
          const attributes = {
            className: getClasses(key),
            target: '_blank',
            href: createHref(userName, title),
            key
          };

          if (key === 0) {
            attributes['aria-current'] = 'page';
          }

          return (
            <a {...attributes}>
              {title}
              {hasCounter && (
                <span className="Counter hide-lg hide-md hide-sm">
                  {subNavStats[key - 1]}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
