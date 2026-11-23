import { WowheadLink } from './WowheadLink';
import { WowheadSpecIcon } from './WowheadSpecIcon';

// spells live in ./spells.ts
type SpecLabelProps = {
  plural?: boolean;
  abbreviated?: boolean;
};

export function Scalecommander() {
  return <WowheadSpecIcon spec="scalecommander">Scalecommander</WowheadSpecIcon>;
}

export function Flameshaper() {
  return <WowheadSpecIcon spec="flameshaper">Flameshaper</WowheadSpecIcon>;
}

export function Chronowarden() {
  return <WowheadSpecIcon spec="chronowarden">Chronowarden</WowheadSpecIcon>;
}

export function ElementalShaman({ plural, abbreviated }: SpecLabelProps) {
  return (
    <WowheadSpecIcon spec="elemental-shaman">
      {abbreviated ? 'Ele Shaman' : `Elemental Shaman${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function FrostDeathKnight({ plural, abbreviated }: SpecLabelProps) {
  return (
    <WowheadSpecIcon spec="frost-deathknight">
      {abbreviated ? 'FDK' : `Frost Death Knight${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function DevastationEvoker({ plural, abbreviated }: SpecLabelProps) {
  return (
    <WowheadSpecIcon spec="devastation-evoker">
      {abbreviated ? 'Dev' : `Devastation Evoker${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function PreservationEvoker({ plural, abbreviated }: SpecLabelProps) {
  return (
    <WowheadSpecIcon spec="preservation-evoker">
      {abbreviated ? 'Pres' : `Preservation Evoker${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function UnholyDeathKnight({ plural, abbreviated }: SpecLabelProps) {
  return (
    <WowheadSpecIcon spec="unholy-deathknight">
      {abbreviated ? 'UDK' : `Unholy Death Knight${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function AssassinationRogue({ plural, abbreviated }: SpecLabelProps) {
  return (
    <WowheadSpecIcon spec="assa-rogue">
      {abbreviated ? 'Assa Rogue' : `Assassination Rogue${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function AugmentationEvoker({ plural, abbreviated }: SpecLabelProps) {
  return (
    <WowheadSpecIcon spec="augmentation-evoker">
      {abbreviated ? `Aug${plural ? 's' : ''}` : `Augmentation Evoker${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function Torq() {
  return (
    <WowheadLink id={229177} kind="npc">
      Torq
    </WowheadLink>
  );
}

export function Flarendo() {
  return (
    <WowheadLink id={229181} kind="npc">
      Flarendo
    </WowheadLink>
  );
}
