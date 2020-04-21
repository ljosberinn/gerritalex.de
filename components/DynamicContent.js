import React from 'react';
import { ContributionOverview, ContributionActivity, Repositories } from '.';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export default function DynamicContent() {
  const { data } = useSWR(() => '/api/github', fetcher);

  if (!data) {
    return null;
  }

  const {
    contributionActivity,
    contributionAmount,
    contributionHistory,
    repositories,
  } = data;

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
