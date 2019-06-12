import React, { memo } from 'react';

const Tag = ({ text }) => (
  <button className="btn-link topic-tag topic-tag-link" type="button">
    {text}
  </button>
);

export const Tags = memo(
  ({ tags }) =>
    tags.length > 0 && (
      <p className="mb-0 f6 text-gray d-inline-flex flex-wrap flex-items-center f6 my-1">
        {tags.map((text, key) => (
          <Tag text={text} key={key} />
        ))}
      </p>
    )
);
