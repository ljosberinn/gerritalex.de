import { type WowheadLinkProps } from '../WowheadLink';
import { AoeSpellsTabs, type AoeSpellsDataset } from './AoeSpellsTabs';

const DATA_SOURCES = {
  'zephyr-mn-s1': () => import('../../prebuild/zephyr-mn-s1.json'),
  'zephyr-mn-s2': () => import('../../prebuild/zephyr-mn-s2.json'),
  'zephyr-tww-s2': () => import('../../prebuild/zephyr-tww-s2.json'),
  'zephyr-tww-s3': () => import('../../prebuild/zephyr-tww-s3.json'),
};

type DataSourceKey = keyof typeof DATA_SOURCES;

type AoeSpellsProps = {
  dataSource: DataSourceKey;
  wowheadBranch?: WowheadLinkProps['branch'];
};

export async function AoeSpells({ dataSource, wowheadBranch }: AoeSpellsProps) {
  const { default: data } = (await DATA_SOURCES[dataSource]()) as unknown as {
    default: AoeSpellsDataset;
  };

  return <AoeSpellsTabs wowheadBranch={wowheadBranch} data={data} />;
}
