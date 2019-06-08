import React from 'react';

const Tag = ({ text, handleClick }) => (
  <a className="topic-tag topic-tag-link f6-my1" href="" onClick={handleClick}>
    {text}
  </a>
);

export const Tags = ({ tags, handleClick }) =>
  tags.length > 0 && (
    <p className="mb-0 f6 text-gray d-inline-flex flex-wrap flex-items-center f6 my-1">
      {tags.map((text, key) => (
        <Tag text={text} handleClick={handleClick} key={key} />
      ))}
    </p>
  );
