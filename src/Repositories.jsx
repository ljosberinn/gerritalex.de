import React from 'react';

export const Repositories = ({ data }) => {
  const spinnerClassList = [
    'pinned-items-spinner',
    data.length > 0 ? 'spinner' : null
  ];

  return (
    <div className="mt-4">
      <h2 className="f4 mb-2 text-normal">
        Pinned
        <img
          src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif"
          width="13"
          alt=""
          className={spinnerClassList.join(' ')}
        />
      </h2>
      <ol
        className="pinned-items-list mb-4"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};
