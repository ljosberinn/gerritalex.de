import { WowheadLink, WowheadLinkProps } from './WowheadLink';
import { WowheadSpecIcon } from './WowheadSpecIcon';

function createComponent(
  name: string,
  id: number,
  icon: string,
  branch?: WowheadLinkProps['branch']
) {
  return function Component() {
    return (
      <WowheadLink kind="spell" id={id} icon={icon} branch={branch}>
        {name}
      </WowheadLink>
    );
  };
}

export const Dragonrage = createComponent('Dragonrage', 375087, 'ability_evoker_dragonrage');

export const Zephyr = createComponent('Zephyr', 374227, 'ability_evoker_hoverblack');

export const StretchTime = createComponent('Stretch Time', 410352, 'ability_evoker_timedilation');

export const FireWithin = createComponent('Fire Within', 375577, 'item_sparkofragnoros');

export const DraconicInstincts = createComponent(
  'Draconic Instincts',
  445958,
  'inv_misc_scales_basilliskorange'
);

export function Scalecommander() {
  return <WowheadSpecIcon spec="scalecommander">Scalecommander</WowheadSpecIcon>;
}

export function Chronowarden() {
  return <WowheadSpecIcon spec="chronowarden">Chronowarden</WowheadSpecIcon>;
}

export function ElementalShaman({ plural, abbreviated }) {
  return (
    <WowheadSpecIcon spec="elemental-shaman">
      {abbreviated ? 'Ele Shaman' : `Elemental Shaman${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function FrostDeathKnight({ plural, abbreviated }) {
  return (
    <WowheadSpecIcon spec="frost-deathknight">
      {abbreviated ? 'FDK' : `Frost Death Knight${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
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

export function UnholyDeathKnight({ plural, abbreviated }) {
  return (
    <WowheadSpecIcon spec="unholy-deathknight">
      {abbreviated ? 'UDK' : `Unholy Death Knight${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function AssassinationRogue({ plural, abbreviated }) {
  return (
    <WowheadSpecIcon spec="assa-rogue">
      {abbreviated ? 'Assa Rogue' : `Assasination Rogue${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export function AugmentationEvoker({ plural, abbreviated }) {
  return (
    <WowheadSpecIcon spec="augmentation-evoker">
      {abbreviated ? `Aug${plural ? 's' : ''}` : `Augmentation Evoker${plural ? 's' : ''}`}
    </WowheadSpecIcon>
  );
}

export const RegenerativeChitin = createComponent(
  'Regenerative Chitin',
  406907,
  'inv_tradeskill_skinning_prismaticscale'
);

export const TemporalWound = createComponent(
  'Temporal Wound',
  409560,
  'ability_evoker_breathofeons'
);

export const CloseAsClutchmates = createComponent(
  'Close as Clutchmates',
  396043,
  'ability_dragonriding_yearningforthesky01'
);

export const ConcentratedPower = createComponent(
  'Concentrated Power',
  1261448,
  'inv_10_dungeonjewelry_dragon_trinket_1arcanemagical_blue',
  'beta'
);

export const RefinedEssence = createComponent(
  'Refined Essence',
  1261452,
  'ability_evoker_essenceburststacks',
  'beta'
);

export const Chronoboon = createComponent(
  'Chronoboon',
  1260484,
  'ability_evoker_tipthescales',
  'beta'
);

export const EnergyCycles = createComponent(
  'Energy Cycles',
  1260568,
  'ability_evoker_innatemagic4',
  'beta'
);

export const TipTheScales = createComponent(
  'Tip the Scales',
  370553,
  'ability_evoker_tipthescales'
);

export const EssenceBurst = createComponent('Essence Burst', 392268, 'ability_evoker_essenceburst');

export const ChronoFlames = createComponent(
  'Chrono Flames',
  431442,
  'inv_ability_chronowardenevoker_chronoflame'
);

export const DoubleTime = createComponent('Double-time', 431874, 'spell_holy_borrowedtime');

export const GoldenOpportunity = createComponent(
  'Golden Opportunity',
  432004,
  'achievement_faction_goldenlotus',
  'beta'
);

export const Overclock = createComponent('Overclock', 1260647, 'spell_holy_borrowedtime', 'beta');

export const OppressingRoar = createComponent(
  'Oppressing Roar',
  372048,
  'ability_evoker_oppressingroar'
);

export const Landslide = createComponent('Landslide', 358385, 'ability_earthen_pillar');

export const TerrorOfTheSkies = createComponent(
  'Terror of the Skies',
  372245,
  'ability_evoker_terroroftheskies'
);

export const SourceOfMagic = createComponent('Source of Magic', 369459, 'ability_evoker_blue_01');

export const PerilousFate = createComponent(
  'Perilous Fate',
  410253,
  'spell_shadow_lastingafflictions'
);

export const ArcaneReach = createComponent('Arcane Reach', 454983, 'classicon_evoker');

export const AspectsFavor = createComponent(
  "Aspect's Favor",
  407243,
  'ability_evoker_aspectsfavor'
);

export const DreamOfSpring = createComponent(
  'Dream of Spring',
  414969,
  'ability_evoker_masterylifebinder'
);

export const ProlongLife = createComponent(
  'Prolong Life',
  410687,
  'ability_evoker_reversion_green'
);

export const EchoingStrike = createComponent(
  'Echoing Strike',
  410784,
  'ability_evoker_echoingstrike'
);

export const SymbioticBloom = createComponent(
  'Symbiotic Bloom',
  410685,
  'inv_10_herb_seed_magiccolor5'
);

export const ShiftingSands = createComponent(
  'Shifting Sands',
  413984,
  'ability_evoker_masterytimewalker'
);

export const Maneuverability = createComponent(
  'Maneuverability',
  433871,
  'ability_evoker_deepbreath',
  'beta'
);

export const Timelessness = createComponent('Timelessness', 412710, 'ability_evoker_timelessness');

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

export const MoltenBlood = createComponent('Molten Blood', 410643, 'spell_shaman_spewlava');

export const MomentumShift = createComponent('Momentum Shift', 408005, 'ability_priest_voidshift');

export const TimeSkip = createComponent('Time Skip', 404977, 'ability_evoker_timeskip');

export const InterwovenThreads = createComponent(
  'Interwoven Threads',
  412713,
  'inv_enchant_optionalreagent_01'
);

export const Unravel = createComponent('Unravel', 368432, 'ability_evoker_unravel');

export const RegenerativeMagic = createComponent(
  'Regenerative Magic',
  387787,
  'spell_frost_manarecharge'
);

export const AzureStrike = createComponent('Azure Strike', 362969, 'ability_evoker_azurestrike');

export const ProtractedTalons = createComponent(
  'Protracted Talons',
  369909,
  'ability_evoker_azurestrike'
);

export const Quell = createComponent('Quell', 351338, 'ability_evoker_quell');

export const MoltenEmbers = createComponent(
  'Molten Embers',
  459725,
  'ability_evoker_earthensky',
  'beta'
);

export const NozdormuAdept = createComponent(
  'Nozdormu Adept',
  431715,
  'ability_evoker_aspectsfavorbronze',
  'beta'
);

export const MasterOfDestiny = createComponent(
  'Master of Destiny',
  431840,
  'ability_evoker_defyfate',
  'beta'
);

export const ThreadsOfFate = createComponent(
  'Threads of Fate',
  431715,
  'ability_evoker_sandsoftime'
);

export function MassEruption(props: WowheadLinkProps) {
  return (
    <WowheadLink {...props} id={438588} icon="ability_evoker_eruption" kind="spell">
      Mass Eruption
    </WowheadLink>
  );
}

export const TemporalBurst = createComponent(
  'Temporal Burst',
  431695,
  'ability_evoker_essenceburst5'
);

export const FireBreath = createComponent('Fire Breath', 357208, 'ability_evoker_firebreath');

export const InfernosBlessing = createComponent(
  "Inferno's Blessing",
  410261,
  'ability_evoker_infernosblessing'
);

export const StrikeFromAbove = createComponent(
  'Strike from Above',
  1267206,
  'ability_racial_glide',
  'beta'
);

export const Glide = createComponent('Glide', 358733, 'ability_racial_glide', 'beta');

export const IgnitionRush = createComponent('Ignition Rush', 408775, 'spell_fire_immolation');

export const DefyFate = createComponent('Defy Fate', 404195, 'ability_evoker_defyfate');

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

export const ImprovedDefyFate = createComponent(
  'Improved Defy Fate',
  1268881,
  'ability_evoker_masterytimewalker',
  'beta'
);

export const Rockfall = createComponent('Rockfall', 1219236, 'ability_evoker_earthensky');

export const LivingFlame = createComponent('Living Flame', 361469, 'ability_evoker_livingflame');

export const LeapingFlames = createComponent(
  'Leaping Flames',
  369939,
  'ability_evoker_pupilofalexstraza'
);

export const Overawe = createComponent('Overawe', 374346, 'ability_evoker_oppressingroar2');

export const BlisteringScales = createComponent(
  'Blistering Scales',
  360827,
  'ability_evoker_blisteringscales'
);

export function Eruption({ plural }) {
  return (
    <WowheadLink id={395160} icon="ability_evoker_eruption" kind="spell">
      {plural ? 'Eruptions' : 'Eruption'}
    </WowheadLink>
  );
}

export const SpatialParadox = createComponent(
  'Spatial Paradox',
  406732,
  'ability_evoker_stretchtime'
);

type EbonMightProps = {
  kind?: 'delves';
};

export function EbonMight({ kind }: EbonMightProps) {
  return (
    <WowheadLink id={kind === 'delves' ? 426404 : 395152} icon="spell_sarkareth" kind="spell">
      Ebon Might
    </WowheadLink>
  );
}

export const Upheaval = createComponent('Upheaval', 396286, 'ability_evoker_upheaval');

export const Prescience = createComponent('Prescience', 409311, 'ability_evoker_prescience');

export const Clairvoyant = createComponent(
  'Clairvoyant',
  1250914,
  'ability_evoker_masterylifebinder_bronze',
  'beta'
);

export const MotesOfPossibility = createComponent(
  'Motes of Possibility',
  409267,
  'ability_evoker_motesofpossibility'
);

export const BestowWeyrnstone = createComponent(
  'Bestow Weyrnstone',
  408233,
  'ability_evoker_bestowweyrnstone'
);

export const Slipstream = createComponent(
  'Slipstream',
  441257,
  'ability_dragonriding_barrelroll01'
);

export const Duplicate = createComponent('Duplicate', 1259173, 'ability_evoker_recall', 'beta');

export const ObsidianScales = createComponent(
  'Obsidian Scales',
  374227,
  'inv_artifact_dragonscales'
);

export const RenewingBlaze = createComponent(
  'Renewing Blaze',
  374348,
  'ability_evoker_masterylifebinder_red'
);

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

export const BreathOfEons = createComponent(
  'Breath of Eons',
  442204,
  'ability_evoker_breathofeons'
);

export const MassDisintegrate = createComponent(
  'Mass Disintegrate',
  436335,
  'ability_evoker_disintegrate'
);

export const Pyrotechnics = createComponent('Pyrotechnics', 1214688, 'inv_wildfirebomb');

export const DeepBreath = createComponent('Deep Breath', 433874, 'ability_evoker_deepbreath');

export const StaticJolt = createComponent(
  'Static Jolt',
  467297,
  'ability_thunderking_thunderstruck'
);

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

export const MoltenPhlegm = createComponent(
  'Molten Phlegm',
  1213688,
  'inv_11_arenaboss_jawsplosion'
);

export const GalvanizedSpite = createComponent(
  'Galvanized Spite',
  472223,
  'inv_11_arenaboss_galvanizedspite'
);

export const StaticCharge = createComponent('Static Charge', 473951, 'spell_shaman_staticshock');

export const Scrapbomb = createComponent(
  'Scrapbomb',
  473650,
  'inv_10_engineering2_boxofbombs_friendly_color1'
);

export const RollingRubbish = createComponent('Rolling Rubbish', 461536, 'inv_misc_soccerball');

export const PrototypePowercoil = createComponent(
  'Prototype Powercoil',
  1218706,
  'ability_siege_engineer_magnetic_crush'
);

export const Incinerator = createComponent(
  'Incinerator',
  464165,
  'ability_ironmaidens_bombardment'
);

export const ScrapRockets = createComponent(
  'Scrap Rockets',
  1219386,
  'ability_racial_rocketbarrage'
);

export const TrashCompactor = createComponent(
  'Trash Compactor',
  467135,
  'spell_nature_unrelentingstorm'
);

export const ElectromagneticSorting = createComponent(
  'Electromagnetic Sorting',
  464559,
  'inv_10_engineering_manufacturedparts_mechanicalparts_color3'
);

export const Overdrive = createComponent('Overdrive', 467117, 'spell_shaman_crashlightning');

export const BleedingEdge = createComponent(
  'Bleeding Edge',
  1215218,
  'ability_siege_engineer_pattern_recognition'
);

export const SonicBaBoom = createComponent('Sonic Ba-Boom', 465232, 'inv_sonic_debuff');

export const UnstableExplosion = createComponent(
  'Unstable Explosion',
  1216406,
  'spell_shaman_improvedfirenova'
);

export const ProductDeployment = createComponent(
  'Product Deployment',
  1216411,
  'inv_10_engineering2_boxofbombs_friendly_color1'
);

export const UnstableShrapnel = createComponent(
  'Unstable Shrapnel',
  1218342,
  'ability_deathwing_shrapnel'
);

export const Voidsplosion = createComponent('Voidsplosion', 1218319, 'ability_priest_voidentropy');

export const PayLine = createComponent('Pay Line', 460181, 'inv_10_fishing_dragonislescoins_gold');

export const HighRoller = createComponent('High Roller', 460444, 'spell_misc_emotionhappy');

export const FlameAndCoin = createComponent('Flame and Coin', 461390, 'ability_creature_cursed_01');

export const ElectricBlast = createComponent('Electric Blast', 460873, 'spell_shaman_staticshock');

export const CoinMagnet = createComponent('Coin Magnet', 474665, 'inv_ore_gold_nugget');

export const FoulExhaust = createComponent('Foul Exhaust', 460164, 'inv_elemental_mote_shadow01');

export const HotHotHeat = createComponent('Hot Hot Heat', 465388, 'spell_fire_felflamering_red');

export const ElementalCalamity = createComponent(
  'Elemental Calamity',
  468665,
  'spell_fire_masterofelements'
);

export const UncontrolledBurn = createComponent(
  'Uncontrolled Burn',
  469719,
  'ability_siege_engineer_detonate'
);

export const EarthshakerGaol = createComponent('Earthshaker Gaol', 1220769, 'inv_elementalearth2');

export const Hover = createComponent('Hover', 358267, 'ability_evoker_hover');

export const ScatterblastCanisters = createComponent(
  'Scatterblast Canisters',
  466419,
  'spell_mage_infernoblast'
);

export const GallybuxFinaleBlast = createComponent(
  'Gallybux Finale Blast',
  1219333,
  'spell_nature_lightningoverload'
);

export const Rescue = createComponent('Rescue', 370665, 'ability_evoker_flywithme');

export const TwinGuardian = createComponent('Twin Guardian', 370889, 'ability_skyreach_shielded');

export const FusedCanisters = createComponent('Fused Canisters', 466489, 'inv_misc_blackironbomb');

export const TickTockCanisters = createComponent(
  'Tick-Tock Canisters',
  466578,
  'inv_eng_bombstonestun'
);

export const TotalDestruction = createComponent(
  'TOTAL DESTRUCTION!!!',
  1214448,
  'ui_majorfactions_rocket'
);

export const CanisterDetonation = createComponent(
  'Canister Detonation',
  474447,
  'inv_elemental_primal_shadow'
);

export const GigaCoils = createComponent(
  'Giga Coils',
  469295,
  'inv_10_engineering_manufacturedparts_electricalparts_color1'
);

export function Deathmark({ branch }: WowheadLinkProps) {
  return (
    <WowheadLink kind="spell" id={360194} branch={branch} icon="ability_rogue_deathmark">
      Deathmark
    </WowheadLink>
  );
}

export const UnstableAffliction = createComponent(
  'Unstable Affliction',
  316099,
  'spell_shadow_unstableaffliction_3'
);

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

export const SpellBlock = createComponent('Spell Block', 392966, 'ability_warrior_shieldbreak');

export const AntiMagicShell = createComponent(
  'Anti-Magic Shell',
  48707,
  'spell_shadow_antimagicshell'
);

export const AntiMagicZone = createComponent(
  'Anti-Magic Zone',
  145629,
  'spell_deathknight_antimagiczone'
);

export const Expunge = createComponent('Expunge', 365585, 'ability_evoker_fontofmagic_green');

export const VerdantEmbrace = createComponent('Verdant Embrace', 360995, 'ability_evoker_rescue');

export const SensePower = createComponent('Sense Power', 361021, 'ability_hunter_aspectoftheviper');

export const TimeConvergence = createComponent(
  'Time Convergence',
  431984,
  'ability_evoker_plotthefuture'
);

export const MotesOfAcceleration = createComponent(
  'Motes of Acceleration',
  432008,
  'item_timemote_icon'
);

export const Temporality = createComponent('Temporality', 431873, 'ability_evoker_return');

export const FateMirror = createComponent(
  'Fate Mirror',
  404908,
  'trade_archaeology_highbornesoulmirror'
);

export const MagnifiedFate = createComponent(
  'Magnified Fate',
  1297728,
  'ability_evoker_masterylifebinder_black'
);

export const Timewalker = createComponent(
  'Mastery: Timewalker',
  406380,
  'ability_evoker_masterytimewalker'
);

export const Accretion = createComponent('Accretion', 407876, 'ability_evoker_accretion');

export const RumblingEarth = createComponent('Rumbling Earth', 459120, 'ability_evoker_geomancy');

export const FelRush = createComponent('Fel Rush', 195072, 'ability_demonhunter_felrush');

export const NimbleFlyer = createComponent('Nimble Flyer', 441253, 'ability_evoker_hover');

export const TimeSpiral = createComponent('Time Spiral', 374968, 'ability_evoker_timespiral');

export const Ascendance = TimeSpiral;
export const BreathOfSindragosa = TimeSpiral;
export const ArmyOfTheDead = TimeSpiral;
