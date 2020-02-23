import React, { useState, useEffect } from 'react';
import { ContributionOverview, ContributionActivity, Repositories } from '.';

const DEFAULT_STATE = {
  contributionHistory: '',
  contributionAmount: '',
  contributionActivity: '',
  repositories: '',
};

export default function DynamicContent() {
  const [
    {
      contributionHistory,
      contributionAmount,
      contributionActivity,
      repositories,
    },
    setData,
  ] = useState(DEFAULT_STATE);

  useEffect(() => {
    fetch('/.netlify/functions/index')
      .then(response => response.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <>
      <Repositories data={repositories} />
      <div className="position-relative">
        <div className="d-flex">
          <div className="col-12">
            {contributionAmount && contributionHistory && (
              <ContributionOverview
                amount={contributionAmount}
                history={contributionHistory}
              />
            )}
            {contributionActivity && (
              <ContributionActivity data={contributionActivity} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
