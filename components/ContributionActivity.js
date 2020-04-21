import React from 'react';

export default function ContributionActivity({ data }) {
  return (
    <div
      className="mt-4 activity-listing contribution-activity"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
