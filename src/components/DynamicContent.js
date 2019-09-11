import React, { useState, useEffect } from 'react';
import { ContributionOverview, ContributionActivity, Repositories } from '.';

const DEFAULT_STATE = {
  contributionHistory: undefined,
  contributionAmount: undefined,
  contributionActivity: undefined,
  repositories: '',
  subNavStats: [0, 0, 0, 0, 0]
};

const DynamicContent = () => {
  const [
    {
      contributionHistory,
      contributionAmount,
      contributionActivity,
      repositories
    },
    setData
  ] = useState(DEFAULT_STATE);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        '//cdn.gerritalex.de/gerritalex.de/html.json'
      );
      const json = await response.json();

      setData(json);
    };

    getData();
  }, []);

  return (
    <>
      <Repositories data={repositories} />
      <div className="mt-4 position-relative">
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
};

export default DynamicContent;
