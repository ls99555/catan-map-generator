import { ExpansionConfig, HarborType, ResourceType, TerrainType, DiceNumber } from '../../types/game';

// Import base game configuration only
import { BASE_GAME_3_4_CONFIG, BASE_GAME_5_6_CONFIG } from './base-game';

// Main expansion configurations export - Base game only
export const EXPANSION_CONFIGS: Record<string, ExpansionConfig> = {
  'base': BASE_GAME_3_4_CONFIG,
  'base-5-6': BASE_GAME_5_6_CONFIG,
};

// 5-6 Player extension configurations - Base game only
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
};

// Number distributions for balanced gameplay
export const DICE_PROBABILITIES: Record<DiceNumber, number> = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  8: 5,
  9: 4,
  10: 3,
  11: 2,
  12: 1,
};

// Resource production rates for balancing (base game only)
export const RESOURCE_BALANCE_TARGETS: Record<ResourceType, number> = {
  brick: 3,
  lumber: 4,
  wool: 4,
  grain: 4,
  ore: 3,
  desert: 0,
};

// Helper functions for base game logic
export function getExpansionConfig(expansionName: string): ExpansionConfig {
  const config = EXPANSION_CONFIGS[expansionName];
  if (!config) {
    throw new Error(`Unknown expansion: ${expansionName}`);
  }
  return config;
}

export function getPlayerExtensionConfig(expansionName: string) {
  return PLAYER_EXTENSION_CONFIG[expansionName as keyof typeof PLAYER_EXTENSION_CONFIG];
}

export function isExpansionSupported(expansionName: string): boolean {
  return expansionName in EXPANSION_CONFIGS;
}

export function getSupportedPlayerCounts(expansionName: string): number[] {
  const config = getExpansionConfig(expansionName);
  return config.supportedPlayerCounts;
}

export function getVictoryPoints(expansionName: string): number {
  const config = getExpansionConfig(expansionName);
  return config.victoryPoints || 10;
}

export function requiresSpecialBuilding(playerCount: number): boolean {
  return playerCount >= 5;
}
