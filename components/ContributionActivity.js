import React from 'react';

export function ContributionActivity({ data }) {
  return (
    <div
      className="mt-4 activity-listing contribution-activity"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
