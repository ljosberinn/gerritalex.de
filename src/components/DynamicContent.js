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
    const getData = async () => {
      const response = await fetch('/.netlify/functions/index');
      const json = await response.json();

      setData(json);
    };

    getData();
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
