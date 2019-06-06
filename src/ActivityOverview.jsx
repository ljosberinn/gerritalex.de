import React from 'react';

export const ActivityOverview = ({ userName, activityOverview }) => {
  if (activityOverview.length === 0) {
    return null;
  }

  return (
    <div className="position-relative" id="user-activity-overview">
      <div
        className="Box mb-5 p-3 activity-overview-box border-top border-xl-top-0"
        dangerouslySetInnerHTML={{ __html: activityOverview }}
      />
    </div>
  );
};
