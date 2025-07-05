import { ExpansionConfig } from '../../types/game';

/**
 * BASE GAME CONFIGURATION
 * Official Catan Base Game (3-6 players)
 * Source: CN3081 CATAN–The Game Rulebook
 */

// Base Game (3-4 players)
export const BASE_GAME_3_4_CONFIG: ExpansionConfig = {
  name: 'base',
  displayName: 'Base Game (3-4 Players)',
  tileDistributions: [
    { terrain: 'hills', count: 3, resource: 'brick' },
    { terrain: 'forest', count: 4, resource: 'lumber' },
    { terrain: 'pasture', count: 4, resource: 'wool' },
    { terrain: 'fields', count: 4, resource: 'grain' },
    { terrain: 'mountains', count: 3, resource: 'ore' },
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
  supportedPlayerCounts: [3, 4],
  supportedScenarios: [],
  victoryPoints: 10,
  additionalRules: [
    'Initial placement: Each player places 2 settlements and 2 roads',
    'Victory condition: First to 10 victory points wins',
    'Trade: 4:1 with bank, 3:1 with generic harbors, 2:1 with specific harbors',
    'Longest Road: minimum 5 road pieces, worth 2 victory points',
    'Largest Army: minimum 3 knight cards played, worth 2 victory points',
    'Building costs: Road (1 brick + 1 lumber), Settlement (1 brick + 1 lumber + 1 wool + 1 grain), City (3 ore + 2 grain), Development Card (1 ore + 1 wool + 1 grain)',
  ],
};

// Base Game 5-6 Player Extension
export const BASE_GAME_5_6_CONFIG: ExpansionConfig = {
  name: 'base-5-6',
  displayName: 'Base Game (5-6 Players)',
  tileDistributions: [
    { terrain: 'hills', count: 5, resource: 'brick' },
    { terrain: 'forest', count: 6, resource: 'lumber' },
    { terrain: 'pasture', count: 6, resource: 'wool' },
    { terrain: 'fields', count: 6, resource: 'grain' },
    { terrain: 'mountains', count: 5, resource: 'ore' },
    { terrain: 'desert', count: 2, resource: 'desert' },
  ],
  harborDistribution: [
    { type: 'generic', count: 5 },
    { type: 'brick', count: 1 },
    { type: 'lumber', count: 1 },
    { type: 'wool', count: 2 },
    { type: 'grain', count: 1 },
    { type: 'ore', count: 1 },
  ],
  supportedPlayerCounts: [5, 6],
  supportedScenarios: [],
  victoryPoints: 10,
  additionalRules: [
    ...(BASE_GAME_3_4_CONFIG.additionalRules || []),
    'Special building phase: After each player\'s turn (except the player who just rolled)',
    'Building phase: Players can build roads, settlements, cities, and buy development cards',
    'No trading during special building phase',
    'Extended layout for 5-6 players',
  ],
};

// Number distributions for base game
export const BASE_GAME_NUMBERS_3_4 = [
  2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12
];

export const BASE_GAME_NUMBERS_5_6 = [
  2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12, // Base set
  2, 3, 4, 5, 6, 8, 9, 10, 11, 12 // Extension set
];

// Tile counts validation
export const BASE_GAME_TILE_COUNTS = {
  '3-4': {
    total: 19, // 19 land tiles for 3-4 players
    resource: 18,
    desert: 1,
    numbers: 18,
    harbors: 9,
    pattern: [3, 4, 5, 4, 3], // Official tile placement pattern (top to bottom)
    description: 'Standard 3-4-5-4-3 hexagonal layout with 19 land tiles',
  },
  '5-6': {
    total: 30, // Full 5-6 player set as per config
    resource: 28,
    desert: 2,
    numbers: 28,
    harbors: 11,
    pattern: [3, 4, 5, 6, 5, 4, 3], // Base pattern, but uses more tiles total
    description: 'Extended layout with additional tiles for 5-6 players',
  },
};

// Map layout specifications
export const BASE_GAME_LAYOUT = {
  '3-4': {
    radius: 2,
    hexCount: 19,
    layout: 'hexagonal-base', // Official Catan layout pattern
    pattern: [3, 4, 5, 4, 3], // Tiles per row (top to bottom)
    description: '3 tiles in top row, 4 in second row, 5 in middle row, 4 in fourth row, 3 in bottom row',
  },
  '5-6': {
    radius: 2,
    hexCount: 30,
    layout: 'hexagonal-base-expansion',
    pattern: [3, 4, 5, 6, 5, 4, 3], // Extended pattern for 5-6 players
    description: 'Extended 3-4-5-6-5-4-3 pattern for 5-6 players',
  },
};
