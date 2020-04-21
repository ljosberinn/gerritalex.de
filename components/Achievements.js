import React from 'react';

import { OcticonStar } from './icons';

const Stars = ({ achievements }) =>
  achievements.length > 0 && (
    <span className="pinned-item-meta muted-link">
      <OcticonStar />
      {` ${achievements.length - 1}`}
    </span>
  );

const Achievements = ({ achievements, translatedAchievements }) =>
  achievements.length > 0 && (
    <>
      <p className="pinned-item-desc mt-2 text-gray">
        <Stars achievements={achievements} /> {translatedAchievements}
      </p>
      <ul className="pinned-item-desc text-gray text-small d-block mb-3 dashed">
        {achievements.map((achievement, key) => (
          <li key={key}>{achievement}</li>
        ))}
      </ul>
    </>
  );

export default Achievements;
