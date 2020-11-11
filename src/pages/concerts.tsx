import { PageMetaTags } from '@/components/PageMetaTags';

import { HorizontalDivider } from '../components/HorizontalDivider';
import { PageTitle } from '../components/PageTitle';

// eslint-disable-next-line import/no-default-export
export default function Concerts(): JSX.Element {
  return (
    <>
      <PageMetaTags />
      <PageTitle>Attended Concerts</PageTitle>
      <HorizontalDivider />
    </>
  );
}
