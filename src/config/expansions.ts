import { ExpansionConfig, HarborType, ResourceType, TerrainType } from '../types/game';

// Base game configurations
export const BASE_GAME_CONFIG: ExpansionConfig = {
  name: 'base',
  displayName: 'Base Game',
  tileDistributions: [
    { terrain: 'hills', count: 3, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'brick' },
    { terrain: 'forest', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'lumber' },
    { terrain: 'pasture', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'wool' },
    { terrain: 'fields', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'grain' },
    { terrain: 'mountains', count: 3, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'ore' },
    { terrain: 'desert', count: 1, resource: 'desert' },
  ],
  harborDistribution: [
    { type: 'generic', count: 4 },
    { type: 'brick', count: 1 },
    { type: 'lumber', count: 1 },
    { type: 'wool', count: 1 },
    { type: 'grain', count: 1 },
    { type: 'ore', count: 1 },
  ],
  supportedPlayerCounts: [3, 4, 5, 6],
  supportedScenarios: [],
  additionalRules: [
    'Initial placement: Each player places 2 settlements and 2 roads',
    'Robber starts on desert tile and blocks resource production',
    'Victory condition: First to 10 victory points wins',
    'Trade: 4:1 with bank, 3:1 with generic harbors, 2:1 with specific harbors',
    'Longest Road: minimum 5 road pieces, worth 2 victory points',
    'Largest Army: minimum 3 knight cards played, worth 2 victory points',
    'Building costs: Road (1 brick + 1 lumber), Settlement (1 brick + 1 lumber + 1 wool + 1 grain), City (3 ore + 2 grain), Development Card (1 ore + 1 wool + 1 grain)',
  ],
};

// Seafarers expansion
export const SEAFARERS_CONFIG: ExpansionConfig = {
  name: 'seafarers',
  displayName: 'Seafarers',
  tileDistributions: [
    { terrain: 'hills', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'brick' },
    { terrain: 'forest', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'lumber' },
    { terrain: 'pasture', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'wool' },
    { terrain: 'fields', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'grain' },
    { terrain: 'mountains', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'ore' },
    { terrain: 'desert', count: 2, resource: 'desert' },
    { terrain: 'sea', count: 19, resource: 'desert' },
    { terrain: 'gold', count: 2, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'gold' },
  ],
  harborDistribution: [
    { type: 'generic', count: 5 },
    { type: 'brick', count: 1 },
    { type: 'lumber', count: 1 },
    { type: 'wool', count: 1 },
    { type: 'grain', count: 1 },
    { type: 'ore', count: 1 },
  ],
  supportedPlayerCounts: [3, 4, 5, 6],
  supportedScenarios: ['heading-new-shores', 'four-islands', 'fog-islands', 'through-desert', 'forgotten-tribe', 'cloth-for-catan', 'wonders-of-catan', 'fishermen-of-catan', 'fish-for-catan'],
  additionalRules: [
    'Ships can be built (1 lumber + 1 wool) and moved on water',
    'Pirate replaces robber on water tiles and can be moved',
    'Gold fields produce any resource when rolled',
    'Discover new islands for additional victory points',
    'Ships can be repositioned (front ships of shipping routes)',
    'Some scenarios have special victory conditions',
  ],
};

// Cities & Knights expansion
export const CITIES_KNIGHTS_CONFIG: ExpansionConfig = {
  name: 'cities-knights',
  displayName: 'Cities & Knights',
  tileDistributions: [
    { terrain: 'hills', count: 3, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'brick' },
    { terrain: 'forest', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'lumber' },
    { terrain: 'pasture', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'wool' },
    { terrain: 'fields', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'grain' },
    { terrain: 'mountains', count: 3, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'ore' },
    { terrain: 'desert', count: 1, resource: 'desert' },
  ],
  harborDistribution: [
    { type: 'generic', count: 4 },
    { type: 'brick', count: 1 },
    { type: 'lumber', count: 1 },
    { type: 'wool', count: 1 },
    { type: 'grain', count: 1 },
    { type: 'ore', count: 1 },
  ],
  supportedPlayerCounts: [3, 4, 5, 6],
  supportedScenarios: ['barbarian-invasion'],
  additionalRules: [
    'Cities produce commodities (cloth, coin, paper) in addition to resources',
    'Progress cards replace development cards with three categories',
    'Knights must be activated with grain to defend against barbarians',
    'Barbarian army strength equals total number of cities on board',
    'Failed defense results in city being downgraded to settlement',
    'Metropolises can be built for 4 victory points each',
    'Victory condition increased to 13 victory points',
    'City improvements unlock progress cards and metropolises',
  ],
};

// Traders & Barbarians expansion
export const TRADERS_BARBARIANS_CONFIG: ExpansionConfig = {
  name: 'traders-barbarians',
  displayName: 'Traders & Barbarians',
  tileDistributions: [
    { terrain: 'hills', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'brick' },
    { terrain: 'forest', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'lumber' },
    { terrain: 'pasture', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'wool' },
    { terrain: 'fields', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'grain' },
    { terrain: 'mountains', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'ore' },
    { terrain: 'desert', count: 2, resource: 'desert' },
  ],
  harborDistribution: [
    { type: 'generic', count: 5 },
    { type: 'brick', count: 1 },
    { type: 'lumber', count: 1 },
    { type: 'wool', count: 1 },
    { type: 'grain', count: 1 },
    { type: 'ore', count: 1 },
  ],
  supportedPlayerCounts: [3, 4, 5, 6],
  supportedScenarios: ['fishermen-of-catan', 'rivers-of-catan', 'event-cards', 'barbarian-attack', 'traders-barbarians'],
  additionalRules: [
    'Multiple scenario collection with different gameplay mechanics',
    'Traders provide various special trading opportunities',
    'Barbarians can be hired as allies or pose threats',
    'Rivers and lakes provide fishing opportunities',
    'Caravans transport goods across the map',
    'Castles provide defensive capabilities',
    'Event cards add random elements to gameplay',
  ],
};

// Explorers & Pirates expansion
export const EXPLORERS_PIRATES_CONFIG: ExpansionConfig = {
  name: 'explorers-pirates',
  displayName: 'Explorers & Pirates',
  tileDistributions: [
    { terrain: 'hills', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'brick' },
    { terrain: 'forest', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'lumber' },
    { terrain: 'pasture', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'wool' },
    { terrain: 'fields', count: 5, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'grain' },
    { terrain: 'mountains', count: 4, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'ore' },
    { terrain: 'desert', count: 2, resource: 'desert' },
    { terrain: 'sea', count: 20, resource: 'desert' },
    { terrain: 'gold', count: 3, numbers: [3, 4, 5, 6, 8, 9, 10, 11], resource: 'gold' },
    { terrain: 'fishery', count: 10, numbers: [4, 5, 6, 8, 9, 10], resource: 'fish' },
  ],
  harborDistribution: [
    { type: 'generic', count: 6 },
    { type: 'brick', count: 1 },
    { type: 'lumber', count: 1 },
    { type: 'wool', count: 1 },
    { type: 'grain', count: 1 },
    { type: 'ore', count: 1 },
  ],
  supportedPlayerCounts: [2, 3, 4, 5, 6],
  supportedScenarios: ['land-ho', 'spice-islands', 'fish-for-catan', 'explorers-pirates'],
  additionalRules: [
    'Explore unknown islands with face-down terrain tiles',
    'Pirate ships can be moved to block other players',
    'Spice islands provide valuable trading opportunities',
    'Mission cards offer alternative victory paths',
    'Harbor settlements provide special bonuses',
    'Fish tokens can be used for various game benefits',
    'Discover new lands for additional victory points',
  ],
};

// 5-6 player extension configurations
export const PLAYER_EXTENSION_CONFIG = {
  base: {
    additionalTiles: [
      { terrain: 'hills' as TerrainType, count: 1, resource: 'brick' as ResourceType },
      { terrain: 'forest' as TerrainType, count: 1, resource: 'lumber' as ResourceType },
      { terrain: 'pasture' as TerrainType, count: 1, resource: 'wool' as ResourceType },
      { terrain: 'fields' as TerrainType, count: 1, resource: 'grain' as ResourceType },
      { terrain: 'mountains' as TerrainType, count: 1, resource: 'ore' as ResourceType },
      { terrain: 'desert' as TerrainType, count: 1, resource: 'desert' as ResourceType },
    ],
    additionalHarbors: [
      { type: 'generic' as HarborType, count: 2 },
    ],
    additionalNumbers: [2, 12],
    victoryPoints: 10,
    specialRules: [
      'Special building phase: After each player\'s turn, all players may build',
      'Building phase occurs in turn order',
      'Cannot win during special building phase',
    ],
  },
  seafarers: {
    additionalTiles: [
      { terrain: 'hills' as TerrainType, count: 1, resource: 'brick' as ResourceType },
      { terrain: 'forest' as TerrainType, count: 1, resource: 'lumber' as ResourceType },
      { terrain: 'pasture' as TerrainType, count: 1, resource: 'wool' as ResourceType },
      { terrain: 'fields' as TerrainType, count: 1, resource: 'grain' as ResourceType },
      { terrain: 'mountains' as TerrainType, count: 1, resource: 'ore' as ResourceType },
      { terrain: 'sea' as TerrainType, count: 10, resource: 'desert' as ResourceType },
      { terrain: 'gold' as TerrainType, count: 1, resource: 'gold' as ResourceType },
    ],
    additionalHarbors: [
      { type: 'generic' as HarborType, count: 2 },
    ],
    additionalNumbers: [2, 12],
    victoryPoints: 10,
    specialRules: [
      'Special building phase applies',
      'Additional sea hexes for larger island layouts',
      'Same ship building and movement rules apply',
    ],
  },
  'cities-knights': {
    additionalTiles: [
      { terrain: 'hills' as TerrainType, count: 1, resource: 'brick' as ResourceType },
      { terrain: 'forest' as TerrainType, count: 1, resource: 'lumber' as ResourceType },
      { terrain: 'pasture' as TerrainType, count: 1, resource: 'wool' as ResourceType },
      { terrain: 'fields' as TerrainType, count: 1, resource: 'grain' as ResourceType },
      { terrain: 'mountains' as TerrainType, count: 1, resource: 'ore' as ResourceType },
      { terrain: 'desert' as TerrainType, count: 1, resource: 'desert' as ResourceType },
    ],
    additionalHarbors: [
      { type: 'generic' as HarborType, count: 2 },
    ],
    additionalNumbers: [2, 12],
    victoryPoints: 13,
    specialRules: [
      'Special building phase applies',
      'Victory condition remains 13 points',
      'Barbarian army strength still equals number of cities',
    ],
  },
  'traders-barbarians': {
    additionalTiles: [
      { terrain: 'hills' as TerrainType, count: 1, resource: 'brick' as ResourceType },
      { terrain: 'forest' as TerrainType, count: 1, resource: 'lumber' as ResourceType },
      { terrain: 'pasture' as TerrainType, count: 1, resource: 'wool' as ResourceType },
      { terrain: 'fields' as TerrainType, count: 1, resource: 'grain' as ResourceType },
      { terrain: 'mountains' as TerrainType, count: 1, resource: 'ore' as ResourceType },
      { terrain: 'desert' as TerrainType, count: 1, resource: 'desert' as ResourceType },
    ],
    additionalHarbors: [
      { type: 'generic' as HarborType, count: 2 },
    ],
    additionalNumbers: [2, 12],
    victoryPoints: 10,
    specialRules: [
      'Special building phase applies',
      'Scenario-specific rules vary by chosen scenario',
      'Additional components support 5-6 players',
    ],
  },
  'explorers-pirates': {
    additionalTiles: [
      { terrain: 'hills' as TerrainType, count: 1, resource: 'brick' as ResourceType },
      { terrain: 'forest' as TerrainType, count: 1, resource: 'lumber' as ResourceType },
      { terrain: 'pasture' as TerrainType, count: 1, resource: 'wool' as ResourceType },
      { terrain: 'fields' as TerrainType, count: 1, resource: 'grain' as ResourceType },
      { terrain: 'mountains' as TerrainType, count: 1, resource: 'ore' as ResourceType },
      { terrain: 'sea' as TerrainType, count: 12, resource: 'desert' as ResourceType },
      { terrain: 'gold' as TerrainType, count: 1, resource: 'gold' as ResourceType },
    ],
    additionalHarbors: [
      { type: 'generic' as HarborType, count: 2 },
    ],
    additionalNumbers: [2, 12],
    victoryPoints: 10,
    specialRules: [
      'Special building phase applies',
      'Additional sea hexes for larger exploration maps',
      'Mission cards and spice islands provide alternative victory paths',
    ],
  },
};

// All expansion configurations
export const EXPANSION_CONFIGS: Record<string, ExpansionConfig> = {
  'base': BASE_GAME_CONFIG,
  'seafarers': SEAFARERS_CONFIG,
  'cities-knights': CITIES_KNIGHTS_CONFIG,
  'traders-barbarians': TRADERS_BARBARIANS_CONFIG,
  'explorers-pirates': EXPLORERS_PIRATES_CONFIG,
};

// Number distributions for balanced gameplay
export const DICE_NUMBERS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12] as const;
export const STANDARD_NUMBERS = [3, 4, 5, 6, 8, 9, 10, 11] as const;

// Probability weights for dice numbers (based on 2d6)
export const DICE_PROBABILITIES: Record<number, number> = {
  2: 1/36,
  3: 2/36,
  4: 3/36,
  5: 4/36,
  6: 5/36,
  8: 5/36,
  9: 4/36,
  10: 3/36,
  11: 2/36,
  12: 1/36,
};

// Standard number distributions for base game
export const STANDARD_NUMBER_DISTRIBUTION = [
  2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12
];

// Resource production rates for balancing
export const RESOURCE_BALANCE_TARGETS: Record<ResourceType, number> = {
  brick: 3,
  lumber: 4,
  wool: 4,
  grain: 4,
  ore: 3,
  desert: 0,
  gold: 0,
  fish: 0,
};
