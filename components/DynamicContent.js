import { ContributionActivity } from './ContributionActivity';
import { ContributionOverview } from './ContributionOverview';
import { Repositories } from './Repositories';

export function DynamicContent({
  contributionActivity,
  contributionAmount,
  contributionHistory,
  repositories,
}) {
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
