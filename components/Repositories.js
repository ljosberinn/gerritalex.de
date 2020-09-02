import React from 'react';

const getClasses = withSpinner =>
  ['pinned-items-spinner', withSpinner ? 'spinner' : null].join(' ').trim();

export function Repositories({ data = [] }) {
  return (
    <div className="mt-4">
      <h2 className="f4 mb-2 text-normal">
        Pinned Repositories
        <img
          src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif"
          width="13"
          alt=""
          className={getClasses(data.length > 0)}
        />
      </h2>
      <ol
        className="pinned-items-list gutter-condensed"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
}
