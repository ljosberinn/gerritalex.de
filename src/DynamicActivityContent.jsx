import React, { useState, useEffect, useCallback } from 'react';
import { ContributionOverview } from './ContributionOverview';
import { ContributionActivity } from './ContributionActivity';

export const DynamicActivityContent = ({ userName }) => {
  const [
    { contributionHistory, contributionAmount, contributionActivity },
    setData
  ] = useState({
    contributionHistory: '',
    contributionAmount: 0,
    contributionActivity: ''
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
      <ContributionOverview
        amount={contributionAmount}
        history={contributionHistory}
      />
      <ContributionActivity data={contributionActivity} />
    </>
  );
};
