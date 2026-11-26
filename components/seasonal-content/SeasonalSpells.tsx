import { type WowheadLinkProps } from '../WowheadLink';
import { SeasonalSpellsTabs, type SeasonalSpellsDataset } from './SeasonalSpellsTabs';

const DATA_SOURCES = {
  'mn-s2-spells': () => import('../../prebuild/mn-s2-spells.json'),
};

type DataSourceKey = keyof typeof DATA_SOURCES;

type SeasonalSpellsProps = {
  dataSource: DataSourceKey;
  wowheadBranch?: WowheadLinkProps['branch'];
};

export async function SeasonalSpells({ dataSource, wowheadBranch }: SeasonalSpellsProps) {
  const { default: data } = (await DATA_SOURCES[dataSource]()) as unknown as {
    default: SeasonalSpellsDataset;
  };

  return <SeasonalSpellsTabs wowheadBranch={wowheadBranch} data={data} />;
}
