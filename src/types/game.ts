// Types for Catan game elements
export type ResourceType = 'brick' | 'lumber' | 'wool' | 'grain' | 'ore' | 'desert' | 'gold' | 'fish';

export type TerrainType = 
  | 'hills'      // Brick
  | 'forest'     // Lumber  
  | 'pasture'    // Wool
  | 'fields'     // Grain
  | 'mountains'  // Ore
  | 'desert'     // Desert
  | 'sea'        // Water (Seafarers)
  | 'gold'       // Gold field (Seafarers)
  | 'fishery';   // Fish (Seafarers)

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
  hasRobber?: boolean;
  hasPirate?: boolean;
  harbor?: HarborType;
  position: { q: number; r: number; s: number }; // Cube coordinates
}

export interface GameMap {
  hexes: Hex[];
  playerCount: number;
  expansion: ExpansionType;
  scenario?: ScenarioType;
  mapSize: MapSize;
}

export type ExpansionType = 
  | 'base'
  | 'seafarers'
  | 'cities-knights'
  | 'traders-barbarians'
  | 'explorers-pirates'
  | 'seafarers-cities-knights'
  | 'seafarers-traders-barbarians'
  | 'cities-knights-traders-barbarians'
  | 'seafarers-cities-knights-traders-barbarians';

export type ScenarioType =
  // Base scenarios
  | 'standard'
  // Seafarers scenarios
  | 'heading-new-shores'
  | 'four-islands'
  | 'fog-islands'
  | 'through-desert'
  | 'forgotten-tribe'
  | 'cloth-for-catan'
  | 'wonders-of-catan'
  // Cities & Knights scenarios
  | 'barbarian-invasion'
  // Traders & Barbarians scenarios
  | 'fishermen-of-catan'
  | 'rivers-of-catan'
  | 'event-cards'
  | 'barbarian-attack'
  | 'traders-barbarians'
  | 'great-river'
  | 'fishermen-lake'
  // Explorers & Pirates scenarios
  | 'land-ho'
  | 'spice-islands'
  | 'fish-for-catan'
  | 'explorers-pirates'
  | 'into-unknown'
  | 'pirate-islands'
  | 'wonders-world'
  | 'treasure-islands';

export type MapSize = 'small' | 'medium' | 'large' | 'custom';

export type PlayerCount = 2 | 3 | 4 | 5 | 6;

export interface GameRules {
  playerCount: PlayerCount;
  expansion: ExpansionType;
  scenario?: ScenarioType;
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

// Development card types for Cities & Knights
export type DevelopmentCard = 
  | 'knight'
  | 'victory-point'
  | 'road-building'
  | 'year-of-plenty'
  | 'monopoly'
  | 'progress-trade'
  | 'progress-politics' 
  | 'progress-science';

// Commodity types for Cities & Knights
export type CommodityType = 'cloth' | 'coin' | 'paper';

// Building types
export type BuildingType = 
  | 'settlement'
  | 'city'
  | 'road'
  | 'ship'
  | 'city-wall'
  | 'metropolis';

// Trade good types for Traders & Barbarians
export type TradeGood = 
  | 'glass'
  | 'tools'
  | 'spice'
  | 'silk'
  | 'gold'
  | 'marble';

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
  supportedScenarios: ScenarioType[];
  additionalRules?: string[];
}

// Statistics for generated maps
export interface MapStatistics {
  resourceBalance: Record<ResourceType, number>;
  numberDistribution: Record<DiceNumber, number>;
  harborDistribution: Record<HarborType, number>;
  probabilitySpread: number;
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
