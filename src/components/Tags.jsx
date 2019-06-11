import React from 'react';

const Tag = ({ text }) => (
  <button className="btn-link topic-tag topic-tag-link f6-my1" type="button">
    {text}
  </button>
);

export const Tags = ({ tags }) =>
  tags.length > 0 && (
    <p className="mb-0 f6 text-gray d-inline-flex flex-wrap flex-items-center f6 my-1">
      {tags.map((text, key) => (
        <Tag text={text} key={key} />
      ))}
    </p>
  );
