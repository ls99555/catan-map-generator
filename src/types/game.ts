// Types for Catan game elements - Base Game Only
export type ResourceType = 'brick' | 'lumber' | 'wool' | 'grain' | 'ore' | 'desert' | 'harbor';

export type TerrainType = 
  | 'hills'      // Brick
  | 'forest'     // Lumber  
  | 'pasture'    // Wool
  | 'fields'     // Grain
  | 'mountains'  // Ore
  | 'desert'     // Desert
  | 'water'      // Water (for harbors, not used as resource)
  | 'harbor';    // Harbor tile (for harbor hexes)

export type HarborType = 
  | 'generic'    // 3:1
  | 'brick'      // 2:1 brick
  | 'lumber'     // 2:1 lumber
  | 'wool'       // 2:1 wool
  | 'grain'      // 2:1 grain
  | 'ore';       // 2:1 ore

export type DiceNumber = 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12;

export interface Hex {
  id: string;
  terrain: TerrainType;
  resource: ResourceType;
  number?: DiceNumber;
  harbor?: HarborType;
  position: { q: number; r: number; s: number }; // Cube coordinates
  adjacentLand?: { q: number; r: number; s: number }; // For water hexes with harbors
  iconOffset?: { x: number; y: number }; // Harbor icon positioning within hex
  iconRotation?: number; // Harbor icon rotation in degrees
}

export interface GameMap {
  hexes: Hex[];
  playerCount: number;
  expansion: 'base';
  scenario?: undefined;
  mapSize: MapSize;
}

export type MapSize = 'small' | 'medium' | 'large' | 'custom';

export type PlayerCount = 2 | 3 | 4 | 5 | 6;

export interface GameRules {
  playerCount: PlayerCount;
  expansion: 'base';
  scenario?: undefined;
  useRandomNumbers: boolean;
  balancedResources: boolean;
  customRules?: {
    allowAdjacentSameNumbers?: boolean;
    requireHarbors?: boolean;
    ensureResourceSpread?: boolean;
  };
}

export interface GameConfiguration {
  rules: GameRules;
  mapSize: MapSize;
  customDimensions?: {
    width: number;
    height: number;
  };
}

export interface TileDistribution {
  terrain: TerrainType;
  count: number;
  numbers?: DiceNumber[];
  resource: ResourceType;
}

export interface ExpansionConfig {
  name: string;
  displayName: string;
  tileDistributions: TileDistribution[];
  harborDistribution: { type: HarborType; count: number }[];
  supportedPlayerCounts: PlayerCount[];
  supportedScenarios: never[];
  victoryPoints?: number;
  additionalRules?: string[];
}

// Statistics for generated maps
export interface MapStatistics {
  resourceBalance: Record<ResourceType, number>;
  numberDistribution: Record<DiceNumber, number>;
  harborDistribution: Record<HarborType, number>;
  adjacentSameNumbers: number;
  desertPlacement: 'center' | 'edge' | 'corner';
}

// Export options
export interface ExportOptions {
  format: 'image' | 'pdf' | 'json';
  includeRules: boolean;
  includeStatistics: boolean;
  includeQRCode: boolean;
  scale: number;
}
