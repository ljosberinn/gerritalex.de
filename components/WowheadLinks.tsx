import { WowheadLink, WowheadLinkProps } from './WowheadLink';
import { WowheadSpecIcon } from './WowheadSpecIcon';

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

export function StretchTime() {
  return (
    <WowheadLink id={410352} icon="ability_evoker_timedilation" kind="spell">
      Stretch Time
    </WowheadLink>
  );
}

export function FireWithin() {
  return (
    <WowheadLink id={375577} icon="item_sparkofragnoros" kind="spell">
      Fire Within
    </WowheadLink>
  );
}

export function DraconicInstincts() {
  return (
    <WowheadLink id={445958} icon="inv_misc_scales_basilliskorange" kind="spell">
      Draconic Instincts
    </WowheadLink>
  );
}

export function Scalecommander() {
  return <WowheadSpecIcon spec="scalecommander">Scalecommander</WowheadSpecIcon>;
}

export function Chronowarden() {
  return <WowheadSpecIcon spec="chronowarden">Chronowarden</WowheadSpecIcon>;
}

export function DevastationEvoker({ plural, abbreviated }) {
  return (
    <WowheadSpecIcon spec="devastation-evoker">
      {abbreviated ? 'Dev' : `Devastation Evoker${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function PreservationEvoker({ plural, abbreviated }) {
  return (
    <WowheadSpecIcon spec="preservation-evoker">
      {abbreviated ? 'Pres' : `Preservation Evoker${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function AugmentationEvoker({ plural, abbreviated }) {
  return (
    <WowheadSpecIcon spec="augmentation-evoker">
      {abbreviated ? 'Aug' : `Augmentation Evoker${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function RegenerativeChitin() {
  return (
    <WowheadLink id={406907} icon="inv_tradeskill_skinning_prismaticscale" kind="spell">
      Regenerative Chitin
    </WowheadLink>
  );
}

export function TemporalWound() {
  return (
    <WowheadLink id={409560} icon="ability_evoker_breathofeons" kind="spell">
      Temporal Wound
    </WowheadLink>
  );
}

export function CloseAsClutchmates() {
  return (
    <WowheadLink id={396043} icon="ability_dragonriding_yearningforthesky01" kind="spell">
      Close as Clutchmates
    </WowheadLink>
  );
}

export function ConcentratedPower() {
  return (
    <WowheadLink
      branch="beta"
      id={1261448}
      icon="inv_10_dungeonjewelry_dragon_trinket_1arcanemagical_blue"
      kind="spell"
    >
      Concentrated Power
    </WowheadLink>
  );
}

export function RefinedEssence() {
  return (
    <WowheadLink branch="beta" id={1261452} icon="ability_evoker_essenceburststacks" kind="spell">
      Refined Essence
    </WowheadLink>
  );
}

export function Chronoboon() {
  return (
    <WowheadLink branch="beta" id={1260484} icon="ability_evoker_tipthescales" kind="spell">
      Chronoboon
    </WowheadLink>
  );
}

export function EnergyCycles() {
  return (
    <WowheadLink branch="beta" id={1260568} icon="ability_evoker_innatemagic4" kind="spell">
      Energy Cycles
    </WowheadLink>
  );
}

export function TipTheScales() {
  return (
    <WowheadLink id={370553} icon="ability_evoker_tipthescales" kind="spell">
      Tip the Scales
    </WowheadLink>
  );
}

export function EssenceBurst() {
  return (
    <WowheadLink id={392268} icon="ability_evoker_essenceburst" kind="spell">
      Essence Burst
    </WowheadLink>
  );
}

export function ChronoFlames() {
  return (
    <WowheadLink id={431442} icon="inv_ability_chronowardenevoker_chronoflame" kind="spell">
      Chrono Flames
    </WowheadLink>
  );
}

export function DoubleTime() {
  return (
    <WowheadLink id={431874} icon="spell_holy_borrowedtime" kind="spell">
      Double-time
    </WowheadLink>
  );
}

export function GoldenOpportunity() {
  return (
    <WowheadLink branch="beta" id={432004} icon="achievement_faction_goldenlotus" kind="spell">
      Golden Opportunity
    </WowheadLink>
  );
}

export function Overclock() {
  return (
    <WowheadLink branch="beta" id={1260647} icon="spell_holy_borrowedtime" kind="spell">
      Overclock
    </WowheadLink>
  );
}

export function OppressingRoar() {
  return (
    <WowheadLink id={372048} icon="ability_evoker_oppressingroar" kind="spell">
      Oppressing Roar
    </WowheadLink>
  );
}

export function Landslide() {
  return (
    <WowheadLink id={358385} icon="ability_earthen_pillar" kind="spell">
      Landslide
    </WowheadLink>
  );
}

export function TerrorOfTheSkies() {
  return (
    <WowheadLink id={372245} icon="ability_evoker_terroroftheskies" kind="spell">
      Terror of the Skies
    </WowheadLink>
  );
}

export function SourceOfMagic() {
  return (
    <WowheadLink id={369459} icon="ability_evoker_blue_01" kind="spell">
      Source of Magic
    </WowheadLink>
  );
}

export function PerilousFate() {
  return (
    <WowheadLink id={410253} icon="spell_shadow_lastingafflictions" kind="spell">
      Perilous Fate
    </WowheadLink>
  );
}

export function ArcaneReach() {
  return (
    <WowheadLink id={454983} icon="classicon_evoker" kind="spell">
      Arcane Reach
    </WowheadLink>
  );
}

export function AspectsFavor() {
  return (
    <WowheadLink id={407243} icon="ability_evoker_aspectsfavor" kind="spell">
      Aspect's Favor
    </WowheadLink>
  );
}

export function DreamOfSpring() {
  return (
    <WowheadLink id={414969} icon="ability_evoker_masterylifebinder" kind="spell">
      Dream of Spring
    </WowheadLink>
  );
}

export function ProlongLife() {
  return (
    <WowheadLink id={410687} icon="ability_evoker_reversion_green" kind="spell">
      Prolong Life
    </WowheadLink>
  );
}

export function EchoingStrike() {
  return (
    <WowheadLink id={410784} icon="ability_evoker_echoingstrike" kind="spell">
      Echoing Strike
    </WowheadLink>
  );
}

export function SymbioticBloom() {
  return (
    <WowheadLink id={410685} icon="inv_10_herb_seed_magiccolor5" kind="spell">
      Symbiotic Bloom
    </WowheadLink>
  );
}

export function ShiftingSands() {
  return (
    <WowheadLink id={413984} icon="ability_evoker_masterytimewalker" kind="spell">
      Shifting Sands
    </WowheadLink>
  );
}

export function Maneuverability() {
  return (
    <WowheadLink branch="beta" id={433871} icon="ability_evoker_deepbreath" kind="spell">
      Maneuverability
    </WowheadLink>
  );
}

export function Timelessness() {
  return (
    <WowheadLink id={412710} icon="ability_evoker_timelessness" kind="spell">
      Timelessness
    </WowheadLink>
  );
}

type CommandSquadronProps = {
  kind: 'buff' | 'talent';
};

export function CommandSquadron({ kind }: CommandSquadronProps) {
  return (
    <WowheadLink
      branch="beta"
      id={kind === 'buff' ? 1252613 : 1260745}
      icon={kind === 'buff' ? 'ability_evoker_pyre' : 'ability_dragonriding_dynamicflight01'}
      kind="spell"
    >
      Command Squadron
    </WowheadLink>
  );
}

export function MoltenBlood() {
  return (
    <WowheadLink id={410643} icon="spell_shaman_spewlava" kind="spell">
      Molten Blood
    </WowheadLink>
  );
}

export function MomentumShift() {
  return (
    <WowheadLink id={408005} icon="ability_priest_voidshift" kind="spell">
      Momentum Shift
    </WowheadLink>
  );
}

export function TimeSkip() {
  return (
    <WowheadLink id={404977} icon="ability_evoker_timeskip" kind="spell">
      Time Skip
    </WowheadLink>
  );
}

export function InterwovenThreads() {
  return (
    <WowheadLink id={412713} icon="inv_enchant_optionalreagent_01" kind="spell">
      Interwoven Threads
    </WowheadLink>
  );
}

export function Unravel() {
  return (
    <WowheadLink id={368432} icon="ability_evoker_unravel" kind="spell">
      Unravel
    </WowheadLink>
  );
}

export function RegenerativeMagic() {
  return (
    <WowheadLink id={387787} icon="spell_frost_manarecharge" kind="spell">
      Regenerative Magic
    </WowheadLink>
  );
}

export function AzureStrike() {
  return (
    <WowheadLink id={362969} icon="ability_evoker_azurestrike" kind="spell">
      Azure Strike
    </WowheadLink>
  );
}

export function ProtractedTalons() {
  return (
    <WowheadLink id={369909} icon="ability_evoker_azurestrike" kind="spell">
      Protracted Talons
    </WowheadLink>
  );
}

export function Quell() {
  return (
    <WowheadLink id={351338} icon="ability_evoker_quell" kind="spell">
      Quell
    </WowheadLink>
  );
}

export function MoltenEmbers() {
  return (
    <WowheadLink id={459725} branch="beta" icon="ability_evoker_earthensky" kind="spell">
      Molten Embers
    </WowheadLink>
  );
}

export function NozdormuAdept() {
  return (
    <WowheadLink id={431715} branch="beta" icon="ability_evoker_aspectsfavorbronze" kind="spell">
      Nozdormu Adept
    </WowheadLink>
  );
}

export function MasterOfDestiny() {
  return (
    <WowheadLink id={431840} branch="beta" icon="ability_evoker_defyfate" kind="spell">
      Master of Destiny
    </WowheadLink>
  );
}

export function ThreadsOfFate() {
  return (
    <WowheadLink id={431715} icon="ability_evoker_sandsoftime" kind="spell">
      Threads of Fate
    </WowheadLink>
  );
}

export function MassEruption(props: WowheadLinkProps) {
  return (
    <WowheadLink {...props} id={438588} icon="ability_evoker_eruption" kind="spell">
      Mass Eruption
    </WowheadLink>
  );
}

export function TemporalBurst() {
  return (
    <WowheadLink id={431695} icon="ability_evoker_essenceburst5" kind="spell">
      Temporal Burst
    </WowheadLink>
  );
}

export function FireBreath() {
  return (
    <WowheadLink id={357208} icon="ability_evoker_firebreath" kind="spell">
      Fire Breath
    </WowheadLink>
  );
}

export function InfernosBlessing() {
  return (
    <WowheadLink id={410261} icon="ability_evoker_infernosblessing" kind="spell">
      Inferno's Blessing
    </WowheadLink>
  );
}

export function StrikeFromAbove() {
  return (
    <WowheadLink id={1267206} icon="ability_racial_glide" kind="spell" branch="beta">
      Strike from Above
    </WowheadLink>
  );
}

export function Glide() {
  return (
    <WowheadLink id={358733} icon="ability_racial_glide" kind="spell" branch="beta">
      Glide
    </WowheadLink>
  );
}

export function IgnitionRush() {
  return (
    <WowheadLink id={408775} icon="spell_fire_immolation" kind="spell">
      Ignition Rush
    </WowheadLink>
  );
}

export function DefyFate() {
  return (
    <WowheadLink id={404195} icon="ability_evoker_defyfate" kind="spell">
      Defy Fate
    </WowheadLink>
  );
}

export function ImminentDestruction(props: WowheadLinkProps) {
  return (
    <WowheadLink
      {...props}
      icon="spell_burningbladeshaman_blazing_radiance"
      id={459537}
      kind="spell"
    >
      Imminent Destruction
    </WowheadLink>
  );
}

export function ImprovedDefyFate() {
  return (
    <WowheadLink id={1268881} icon="ability_evoker_masterytimewalker" branch="beta" kind="spell">
      Improved Defy Fate
    </WowheadLink>
  );
}

export function Rockfall() {
  return (
    <WowheadLink id={1219236} icon="ability_evoker_earthensky" kind="spell">
      Rockfall
    </WowheadLink>
  );
}

export function LivingFlame() {
  return (
    <WowheadLink icon="ability_evoker_livingflame" id={361469} kind="spell">
      Living Flame
    </WowheadLink>
  );
}

export function LeapingFlames() {
  return (
    <WowheadLink icon="ability_evoker_pupilofalexstraza" id={369939} kind="spell">
      Leaping Flames
    </WowheadLink>
  );
}

export function Overawe() {
  return (
    <WowheadLink icon="ability_evoker_oppressingroar2" id={374346} kind="spell">
      Overawe
    </WowheadLink>
  );
}

export function BlisteringScales() {
  return (
    <WowheadLink id={360827} icon="ability_evoker_blisteringscales" kind="spell">
      Blistering Scales
    </WowheadLink>
  );
}

export function Eruption({ plural }) {
  return (
    <WowheadLink id={395160} icon="ability_evoker_eruption" kind="spell">
      {plural ? 'Eruptions' : 'Eruption'}
    </WowheadLink>
  );
}

export function EbonMight() {
  return (
    <WowheadLink id={395152} icon="spell_sarkareth" kind="spell">
      Ebon Might
    </WowheadLink>
  );
}

export function Upheaval() {
  return (
    <WowheadLink id={396286} icon="ability_evoker_upheaval" kind="spell">
      Upheaval
    </WowheadLink>
  );
}

export function Prescience() {
  return (
    <WowheadLink id={409311} icon="ability_evoker_prescience" kind="spell">
      Prescience
    </WowheadLink>
  );
}

export function Clairvoyant() {
  return (
    <WowheadLink
      branch="beta"
      icon="ability_evoker_masterylifebinder_bronze"
      id={1250914}
      kind="spell"
    >
      Clairvoyant
    </WowheadLink>
  );
}

export function MotesOfPossibility() {
  return (
    <WowheadLink id={409267} icon="ability_evoker_motesofpossibility" kind="spell">
      Motes of Possibility
    </WowheadLink>
  );
}

export function BestowWeyrnstone() {
  return (
    <WowheadLink id={408233} icon="ability_evoker_bestowweyrnstone" kind="spell">
      Bestow Weyrnstone
    </WowheadLink>
  );
}

export function Slipstream() {
  return (
    <WowheadLink id={441257} icon="ability_dragonriding_barrelroll01" kind="spell">
      Slipstream
    </WowheadLink>
  );
}

export function Duplicate() {
  return (
    <WowheadLink branch="beta" icon="ability_evoker_recall" id={1259173} kind="spell">
      Duplicate
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

export function Bombardments(props: WowheadLinkProps) {
  return (
    <WowheadLink
      {...props}
      id={434481}
      kind="spell"
      icon="inv_ability_scalecommanderevoker_bombardments"
    >
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
    <WowheadLink id={1214688} kind="spell" icon="inv_wildfirebomb">
      Pyrotechnics
    </WowheadLink>
  );
}

export function DeepBreath() {
  return (
    <WowheadLink id={433874} kind="spell" icon="ability_evoker_deepbreath">
      Deep Breath
    </WowheadLink>
  );
}

export function StaticJolt() {
  return (
    <WowheadLink id={467297} kind="spell" icon="ability_thunderking_thunderstruck">
      Static Jolt
    </WowheadLink>
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

export function MoltenPhlegm() {
  return (
    <WowheadLink id={1213688} kind="spell" icon="inv_11_arenaboss_jawsplosion">
      Molten Phlegm
    </WowheadLink>
  );
}

export function GalvanizedSpite() {
  return (
    <WowheadLink id={472223} kind="spell" icon="inv_11_arenaboss_galvanizedspite">
      Galvanized Spite
    </WowheadLink>
  );
}

export function StaticCharge() {
  return (
    <WowheadLink id={473951} kind="spell" icon="spell_shaman_staticshock">
      Static Charge
    </WowheadLink>
  );
}

export function Scrapbomb() {
  return (
    <WowheadLink id={473650} icon="inv_10_engineering2_boxofbombs_friendly_color1" kind="spell">
      Scrapbomb
    </WowheadLink>
  );
}

export function RollingRubbish() {
  return (
    <WowheadLink kind="spell" id={461536} icon="inv_misc_soccerball">
      Rolling Rubbish
    </WowheadLink>
  );
}

export function PrototypePowercoil() {
  return (
    <WowheadLink kind="spell" id={1218706} icon="ability_siege_engineer_magnetic_crush">
      Prototype Powercoil
    </WowheadLink>
  );
}

export function Incinerator() {
  return (
    <WowheadLink kind="spell" id={464165} icon="ability_ironmaidens_bombardment">
      Incinerator
    </WowheadLink>
  );
}

export function ScrapRockets() {
  return (
    <WowheadLink kind="spell" id={1219386} icon="ability_racial_rocketbarrage">
      Scrap Rockets
    </WowheadLink>
  );
}

export function TrashCompactor() {
  return (
    <WowheadLink kind="spell" id={467135} icon="spell_nature_unrelentingstorm">
      Trash Compactor
    </WowheadLink>
  );
}

export function ElectromagneticSorting() {
  return (
    <WowheadLink
      kind="spell"
      id={464559}
      icon="inv_10_engineering_manufacturedparts_mechanicalparts_color3"
    >
      Electromagnetic Sorting
    </WowheadLink>
  );
}

export function Overdrive() {
  return (
    <WowheadLink kind="spell" id={467117} icon="spell_shaman_crashlightning">
      Overdrive
    </WowheadLink>
  );
}

export function BleedingEdge() {
  return (
    <WowheadLink kind="spell" id={1215218} icon="ability_siege_engineer_pattern_recognition">
      Bleeding Edge
    </WowheadLink>
  );
}

export function SonicBaBoom() {
  return (
    <WowheadLink kind="spell" id={465232} icon="inv_sonic_debuff">
      Sonic Ba-Boom
    </WowheadLink>
  );
}

export function UnstableExplosion() {
  return (
    <WowheadLink kind="spell" id={1216406} icon="spell_shaman_improvedfirenova">
      Unstable Explosion
    </WowheadLink>
  );
}

export function ProductDeployment() {
  return (
    <WowheadLink kind="spell" id={1216411} icon="inv_10_engineering2_boxofbombs_friendly_color1">
      Product Deployment
    </WowheadLink>
  );
}

export function UnstableShrapnel() {
  return (
    <WowheadLink kind="spell" id={1218342} icon="ability_deathwing_shrapnel">
      Unstable Shrapnel
    </WowheadLink>
  );
}

export function Voidsplosion() {
  return (
    <WowheadLink kind="spell" id={1218319} icon="ability_priest_voidentropy">
      Voidsplosion
    </WowheadLink>
  );
}

export function PayLine() {
  return (
    <WowheadLink kind="spell" id={460181} icon="inv_10_fishing_dragonislescoins_gold">
      Pay Line
    </WowheadLink>
  );
}

export function HighRoller() {
  return (
    <WowheadLink kind="spell" id={460444} icon="spell_misc_emotionhappy">
      High Roller
    </WowheadLink>
  );
}

export function FlameAndCoin() {
  return (
    <WowheadLink kind="spell" id={461390} icon="ability_creature_cursed_01">
      Flame and Coin
    </WowheadLink>
  );
}

export function ElectricBlast() {
  return (
    <WowheadLink kind="spell" id={460873} icon="spell_shaman_staticshock">
      Electric Blast
    </WowheadLink>
  );
}

export function CoinMagnet() {
  return (
    <WowheadLink kind="spell" id={474665} icon="inv_ore_gold_nugget">
      Coin Magnet
    </WowheadLink>
  );
}

export function FoulExhaust() {
  return (
    <WowheadLink kind="spell" id={460164} icon="inv_elemental_mote_shadow01">
      Foul Exhaust
    </WowheadLink>
  );
}

export function HotHotHeat() {
  return (
    <WowheadLink kind="spell" id={465388} icon="spell_fire_felflamering_red">
      Hot Hot Heat
    </WowheadLink>
  );
}

export function ElementalCalamity() {
  return (
    <WowheadLink kind="spell" id={468665} icon="spell_fire_masterofelements">
      Elemental Calamity
    </WowheadLink>
  );
}

export function UncontrolledBurn() {
  return (
    <WowheadLink kind="spell" id={469719} icon="ability_siege_engineer_detonate">
      Uncontrolled Burn
    </WowheadLink>
  );
}

export function EarthshakerGaol() {
  return (
    <WowheadLink kind="spell" id={1220769} icon="inv_elementalearth2">
      Earthshaker Gaol
    </WowheadLink>
  );
}

export function Hover() {
  return (
    <WowheadLink kind="spell" id={358267} icon="ability_evoker_hover">
      Hover
    </WowheadLink>
  );
}

export function ScatterblastCanisters() {
  return (
    <WowheadLink kind="spell" id={466419} icon="spell_mage_infernoblast">
      Scatterblast Canisters
    </WowheadLink>
  );
}

export function GallybuxFinaleBlast() {
  return (
    <WowheadLink kind="spell" id={1219333} icon="spell_nature_lightningoverload">
      Gallybux Finale Blast
    </WowheadLink>
  );
}

export function Rescue() {
  return (
    <WowheadLink kind="spell" id={370665} icon="ability_evoker_flywithme">
      Rescue
    </WowheadLink>
  );
}

export function TwinGuardian() {
  return (
    <WowheadLink kind="spell" id={370889} icon="ability_skyreach_shielded">
      Twin Guardian
    </WowheadLink>
  );
}

export function FusedCanisters() {
  return (
    <WowheadLink kind="spell" id={466489} icon="inv_misc_blackironbomb">
      Fused Canisters
    </WowheadLink>
  );
}

export function TickTockCanisters() {
  return (
    <WowheadLink kind="spell" id={466578} icon="inv_eng_bombstonestun">
      Tick-Tock Canisters
    </WowheadLink>
  );
}

export function TotalDestruction() {
  return (
    <WowheadLink kind="spell" id={1214448} icon="ui_majorfactions_rocket">
      TOTAL DESTRUCTION!!!
    </WowheadLink>
  );
}

export function CanisterDetonation() {
  return (
    <WowheadLink kind="spell" id={474447} icon="inv_elemental_primal_shadow">
      Canister Detonation
    </WowheadLink>
  );
}

export function GigaCoils() {
  return (
    <WowheadLink
      kind="spell"
      id={469295}
      icon="inv_10_engineering_manufacturedparts_electricalparts_color1"
    >
      Giga Coils
    </WowheadLink>
  );
}

export function Deathmark({ branch }: WowheadLinkProps) {
  return (
    <WowheadLink kind="spell" id={360194} branch={branch} icon="ability_rogue_deathmark">
      Deathmark
    </WowheadLink>
  );
}

export function UnstableAffliction() {
  return (
    <WowheadLink kind="spell" id={316099} icon="spell_shadow_unstableaffliction_3">
      Unstable Affliction
    </WowheadLink>
  );
}

type SpellReflectionProps = {
  children?: string;
};

export function SpellReflection({ children }: SpellReflectionProps) {
  return (
    <WowheadLink kind="spell" id={23920} icon="ability_warrior_shieldreflection">
      {children ?? 'Spell Reflection'}
    </WowheadLink>
  );
}

export function SpellBlock() {
  return (
    <WowheadLink kind="spell" id={392966} icon="ability_warrior_shieldbreak">
      Spell Block
    </WowheadLink>
  );
}

export function AntiMagicShell() {
  return (
    <WowheadLink kind="spell" id={48707} icon="spell_shadow_antimagicshell">
      Anti-Magic Shell
    </WowheadLink>
  );
}

export function AntiMagicZone() {
  return (
    <WowheadLink kind="spell" id={145629} icon="spell_deathknight_antimagiczone">
      Anti-Magic Zone
    </WowheadLink>
  );
}
