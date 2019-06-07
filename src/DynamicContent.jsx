import React, { useState, useEffect, useCallback } from 'react';
import { ContributionOverview } from './ContributionOverview';
import { ContributionActivity } from './ContributionActivity';
import { Repositories } from './Repositories';

export const DynamicContent = ({ userName }) => {
  const [
    {
      contributionHistory,
      contributionAmount,
      contributionActivity,
      repositories
    },
    setData
  ] = useState({
    contributionHistory: '',
    contributionAmount: 0,
    contributionActivity: '',
    repositories: ''
  });

  const getData = useCallback(async () => {
    const response = await fetch(
      'https://dev.gerritalex.de/githubDomParser.php'
    );
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
