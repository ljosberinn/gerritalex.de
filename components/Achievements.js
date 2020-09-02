import React from 'react';

import { OcticonStar } from './icons';

function Stars({ achievements }) {
  return achievements.length > 0 ? (
    <span className="pinned-item-meta muted-link">
      <OcticonStar />
      {` ${achievements.length - 1}`}
    </span>
  ) : null;
}

export function Achievements({ achievements, translatedAchievements }) {
  if (achievements.length === 0) {
    return null;
  }

  return (
    <>
      <p className="pinned-item-desc mt-2 text-gray">
        <Stars achievements={achievements} /> {translatedAchievements}
      </p>
      <ul className="pinned-item-desc text-gray text-small d-block mb-3 dashed">
        {achievements.map(achievement => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </>
  );
}
