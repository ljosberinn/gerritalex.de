import React from 'react';
import useSWR from 'swr';

import fetcher from '../util/fetcher';

import { ContributionOverview, ContributionActivity, Repositories } from '.';

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
