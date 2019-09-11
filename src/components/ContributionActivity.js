import React from 'react';

const ContributionActivity = ({ data }) => (
  <div
    className="activity-listing contribution-activity"
    dangerouslySetInnerHTML={{ __html: data }}
  />
);

export default ContributionActivity;
