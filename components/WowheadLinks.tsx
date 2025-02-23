import { getWowheadBranch } from './seasonal-content/Spells';
import { WowheadLink } from './WowheadLink';

export function Dragonrage() {
  return (
    <WowheadLink id={375087} kind="spell" icon="ability_evoker_dragonrage">
      Dragonrage
    </WowheadLink>
  );
}

export function Zephyr() {
  return (
    <WowheadLink id={374227} kind="spell" icon="ability_evoker_hoverblack">
      Zephyr
    </WowheadLink>
  );
}

export function ObsidianScales() {
  return (
    <WowheadLink id={374227} kind="spell" icon="inv_artifact_dragonscales">
      Obsidian Scales
    </WowheadLink>
  );
}

export function RenewingBlaze() {
  return (
    <WowheadLink id={374348} kind="spell" icon="ability_evoker_masterylifebinder_red">
      Renewing Blaze
    </WowheadLink>
  );
}

export function Bombardments() {
  return (
    <WowheadLink id={434481} kind="spell" icon="inv_ability_scalecommanderevoker_bombardments">
      Bombardments
    </WowheadLink>
  );
}

export function BreathOfEons() {
  return (
    <WowheadLink id={442204} kind="spell" icon="ability_evoker_breathofeons">
      Breath of Eons
    </WowheadLink>
  );
}

export function MassDisintegrate() {
  return (
    <WowheadLink id={436335} kind="spell" icon="ability_evoker_disintegrate">
      Mass Disintegrate
    </WowheadLink>
  );
}

export function Pyrotechnics() {
  return (
    <WowheadLink id={1214688} kind="spell" icon="inv_wildfirebomb" branch={getWowheadBranch()}>
      Pyrotechnics
    </WowheadLink>
  );
}

export function DeepBreath() {
  return (
    <WowheadLink id={4338740} kind="spell" icon="ability_evoker_deepbreath">
      Deep Breath
    </WowheadLink>
  );
}

export function StaticJolt() {
  return (
    <WowheadLink
      id={467297}
      kind="spell"
      icon="ability_thunderking_thunderstruck"
      branch={getWowheadBranch()}
    >
      Static Jolt
    </WowheadLink>
  );
}

export function Torq() {
  return (
    <WowheadLink id={229177} kind="npc" branch={getWowheadBranch()}>
      Torq
    </WowheadLink>
  );
}

export function Flarendo() {
  return (
    <WowheadLink id={229181} kind="npc" branch={getWowheadBranch()}>
      Flarendo
    </WowheadLink>
  );
}

export function MoltenPhlegm() {
  return (
    <WowheadLink
      id={1213688}
      kind="spell"
      icon="inv_11_arenaboss_jawsplosion"
      branch={getWowheadBranch()}
    >
      Molten Phlegm
    </WowheadLink>
  );
}

export function GalvanizedSpite() {
  return (
    <WowheadLink
      id={472223}
      kind="spell"
      icon="inv_11_arenaboss_galvanizedspite"
      branch={getWowheadBranch()}
    >
      Galvanized Spite
    </WowheadLink>
  );
}

export function StaticCharge() {
  return (
    <WowheadLink
      id={473951}
      kind="spell"
      icon="spell_shaman_staticshock"
      branch={getWowheadBranch()}
    >
      Static Charge
    </WowheadLink>
  );
}

export function Scrapbomb() {
  return (
    <WowheadLink
      id={473650}
      icon="inv_10_engineering2_boxofbombs_friendly_color1"
      kind="spell"
      branch={getWowheadBranch()}
    >
      Scrapbomb
    </WowheadLink>
  );
}
