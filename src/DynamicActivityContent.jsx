import React, { useState, useEffect, useCallback } from 'react';
import { ContributionOverview } from './ContributionOverview';
import { ActivityOverview } from './ActivityOverview';

export const DynamicActivityContent = ({ userName }) => {
  const [
    { contributionHistory, contributionAmount, activityOverview },
    setData
  ] = useState({
    contributionHistory: '',
    contributionAmount: 0,
    activityOverview: ''
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
        contributionAmount={contributionAmount}
        contributionHistory={contributionHistory}
      />

      <ActivityOverview
        userName={userName}
        activityOverview={activityOverview}
      />
    </>
  );
};
