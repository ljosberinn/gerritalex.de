import React from 'react';

export function ContributionActivity({ data }) {
  return (
    <div
      className="mt-4 activity-listing contribution-activity"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
