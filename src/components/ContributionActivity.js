import React from 'react';

const ContributionActivity = ({ data }) =>
  data.length === 0 ? null : (
    <div
      className="activity-listing contribution-activity"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );

export default ContributionActivity;
