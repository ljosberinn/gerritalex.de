import React from 'react';

const ContributionActivity = ({ data }) => (
  <div
    className="mt-4 activity-listing contribution-activity"
    dangerouslySetInnerHTML={{ __html: data }}
  />
);

export default ContributionActivity;
