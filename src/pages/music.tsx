import { PageMetaTags } from '@/components/PageMetaTags';

import { HorizontalDivider } from '../components/HorizontalDivider';
import { PageTitle } from '../components/PageTitle';

// eslint-disable-next-line import/no-default-export
export default function Music(): JSX.Element {
  return (
    <>
      <PageMetaTags />
      <PageTitle>Music Collection</PageTitle>
      <HorizontalDivider />
    </>
  );
}
