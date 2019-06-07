import React, { useState, useEffect, useCallback } from 'react';
import { ContributionOverview } from './ContributionOverview';
import { ContributionActivity } from './ContributionActivity';
import { Repositories } from './Repositories';

const DEFAULT_STATE = {
  contributionHistory: '',
  contributionAmount: 0,
  contributionActivity: '',
  repositories: '',
  subNavStats: [0, 0, 0, 0, 0]
};

export const DynamicContent = ({ userName }) => {
  const [
    {
      contributionHistory,
      contributionAmount,
      contributionActivity,
      repositories
    },
    setData
  ] = useState(DEFAULT_STATE);

  const getData = useCallback(async () => {
    const response = await fetch('https://dev.gerritalex.de/html.json');
    const json = await response.json();

    setData(json);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Repositories data={repositories} />
      <div className="mt-4 position-relative">
        <div className="d-flex">
          <div className="col-12">
            <ContributionOverview
              amount={contributionAmount}
              history={contributionHistory}
            />
            <ContributionActivity data={contributionActivity} />
          </div>
        </div>
      </div>
    </>
  );
};
