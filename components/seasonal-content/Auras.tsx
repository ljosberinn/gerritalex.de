import { type WowheadLinkProps } from '../WowheadLink';
import { AurasTabs, type AuraDataset } from './AurasTabs';

const DATA_SOURCES = {
  'auras-mn-s1': () => import('../../prebuild/mn-s1-auras.json'),
  'auras-mn-s2': () => import('../../prebuild/mn-s2-auras.json'),
  'auras-tww-s2': () => import('../../prebuild/tww-s2-auras.json'),
  'auras-tww-s3': () => import('../../prebuild/tww-s3-auras.json'),
};

type DataSourceKey = keyof typeof DATA_SOURCES;

type AurasProps = {
  dataSource: DataSourceKey;
  wowheadBranch?: WowheadLinkProps['branch'];
};

export async function Auras({ dataSource, wowheadBranch }: AurasProps) {
  const { default: data } = await DATA_SOURCES[dataSource]();

  return <AurasTabs wowheadBranch={wowheadBranch} data={data as AuraDataset} />;
}
