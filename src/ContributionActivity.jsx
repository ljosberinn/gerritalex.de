import React from 'react';

export const ContributionActivity = ({ data }) =>
  data.length === 0 ? null : (
    <div
      className="activity-listing contribution-activity"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
