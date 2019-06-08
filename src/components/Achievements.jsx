import React from 'react';

const Stars = ({ achievements }) =>
  achievements.length > 0 && (
    <span className="pinned-item-meta muted-link">
      <svg
        aria-label="stars"
        className="octicon octicon-star"
        viewBox="0 0 14 16"
        version="1.1"
        width="14"
        height="16"
        role="img"
      >
        <path
          fillRule="evenodd"
          d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
        />
      </svg>
      {` ${achievements.length}`}
    </span>
  );

export const Achievements = ({ achievements }) =>
  achievements.length > 0 && (
    <>
      <p className="pinned-item-desc mt-2 text-gray">
        <Stars achievements={achievements} /> Achievements
      </p>
      <ul className="pinned-item-desc text-gray text-small d-block mb-3 dashed">
        {achievements.map((achievement, key) => (
          <li key={key}>{achievement}</li>
        ))}
      </ul>
    </>
  );
