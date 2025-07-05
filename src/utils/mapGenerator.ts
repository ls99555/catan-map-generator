import { 
  GameMap, 
  Hex, 
  GameConfiguration, 
  TerrainType, 
  DiceNumber, 
  HarborType,
  ResourceType,
  MapStatistics
} from '../types/game';
import { 
  EXPANSION_CONFIGS
} from '../config/expansions/index';
import { 
  BASE_GAME_NUMBERS_3_4, 
  BASE_GAME_NUMBERS_5_6,
  BASE_GAME_HARBOR_POSITIONS_3_4,
  BASE_GAME_HARBOR_POSITIONS_5_6,
  HarborPosition
} from '../config/expansions/base-game';
import { 
  CubeCoordinate, 
  generateBaseGameLayout,
  generateBaseGame56Layout,
  getNeighbors
} from './hexGrid';
import { v4 as uuidv4 } from 'uuid';

// Shuffle utility function
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// IMPORTANT: Resource uniqueness rule - DO NOT CHANGE THIS LOGIC
// Each hex can only have ONE resource type assigned to it
// This prevents conflicts and maintains game balance
function validateResourceUniqueness(hexes: Hex[]): Hex[] {
  const resourceCounts: Record<string, number> = {};
  
  // Count resources per hex (should always be 1)
  hexes.forEach(hex => {
    const key = `${hex.position.q},${hex.position.r},${hex.position.s}`;
    resourceCounts[key] = (resourceCounts[key] || 0) + 1;
  });
  
  // Verify no hex has multiple resources
  Object.entries(resourceCounts).forEach(([key, count]) => {
    if (count > 1) {
      console.warn(`WARNING: Hex at ${key} has ${count} resources assigned!`);
    }
  });
  
  return hexes;
}

// Generate map coordinates based on player count (base game only)
function generateMapCoordinates(config: GameConfiguration): CubeCoordinate[] {
  const { rules } = config;
  const { playerCount } = rules;
  
  // Base game only - use official layouts
  if (playerCount > 4) {
    // Use the new 5-6 player layout following [3, 4, 5, 6, 5, 4, 3] pattern
    return generateBaseGame56Layout();
  }
  
  // Use the official 3-4-5-4-3 pattern for base game
  return generateBaseGameLayout();
}

// Generate terrain tiles for the map (base game only)
function generateTerrain(coordinates: CubeCoordinate[], config: GameConfiguration): Hex[] {
  const { rules } = config;
  const { playerCount } = rules;
  
  console.log('DEBUG: Starting terrain generation');
  console.log('Coordinates count:', coordinates.length);
  console.log('Player count:', playerCount);
  
  // Select the correct base game config based on player count
  const isUsingExtension = playerCount > 4;
  const expansionKey = isUsingExtension ? 'base-5-6' : 'base';
  const expansionConfig = EXPANSION_CONFIGS[expansionKey];
  
  console.log('Using expansion key:', expansionKey);
  console.log('Expansion config found:', !!expansionConfig);
  console.log('Expansion config name:', expansionConfig?.name);
  console.log('Tile distributions:', expansionConfig?.tileDistributions);
  
  if (!expansionConfig) {
    throw new Error(`Unknown expansion configuration: ${expansionKey}`);
  }
  
  // Create tile pool based on base game configuration
  const tilePool: { terrain: TerrainType; resource: ResourceType }[] = [];
  
  for (const distribution of expansionConfig.tileDistributions) {
    const count = distribution.count;
    
    for (let i = 0; i < count; i++) {
      tilePool.push({
        terrain: distribution.terrain,
        resource: distribution.resource
      });
    }
  }
  
  console.log('Tile pool created:', tilePool.length);
  console.log('Tile pool contents:', tilePool.reduce((acc, tile) => {
    acc[tile.terrain] = (acc[tile.terrain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>));
  
  // Shuffle and assign tiles
  const shuffledTiles = shuffle(tilePool);
  
  // Ensure we have enough tiles for all coordinates
  if (shuffledTiles.length < coordinates.length) {
    console.warn(`Not enough tiles (${shuffledTiles.length}) for coordinates (${coordinates.length})`);
    console.warn('Tile pool:', shuffledTiles);
    console.warn('Coordinates:', coordinates.length);
  }
  
  return coordinates.map((coord, index) => {
    // Use tiles in order without wrapping - if we run out, that's an error
    const tile = shuffledTiles[index];
    
    if (!tile) {
      console.error(`No tile available for coordinate index ${index}`);
      // Fallback to desert
      return {
        id: uuidv4(),
        terrain: 'desert' as const,
        resource: 'desert' as const,
        position: coord,
      };
    }
    
    return {
      id: uuidv4(),
      terrain: tile.terrain,
      resource: tile.resource,
      position: coord,
    };
  });
}

// Generate and assign dice numbers to tiles (base game only)
function assignDiceNumbers(hexes: Hex[], config: GameConfiguration): Hex[] {
  const { rules } = config;
  const { useRandomNumbers, balancedResources, playerCount } = rules;
  
  // Filter tiles that should receive number tokens (base game only)
  // Include: brick, lumber, wool, grain, ore
  // Exclude: desert
  const resourceTiles = hexes.filter(hex => 
    hex.resource !== 'desert' && 
    hex.terrain !== 'desert'
  );
  
  console.log(`DEBUG: Filtered ${resourceTiles.length} resource tiles from ${hexes.length} total hexes`);
  console.log('Resource tiles breakdown:', resourceTiles.reduce((acc, tile) => {
    acc[tile.terrain] = (acc[tile.terrain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>));
  
  let numbers: DiceNumber[];
  
  // Get the exact number distribution from base game configs
  const isUsingExtension = playerCount > 4;
  
  if (isUsingExtension) {
    // Use exact BASE_GAME_NUMBERS_5_6 from base-game config
    numbers = [...BASE_GAME_NUMBERS_5_6] as DiceNumber[];
    console.log('Using 5-6 numbers:', numbers);
  } else {
    // Use exact BASE_GAME_NUMBERS_3_4 from base-game config
    numbers = [...BASE_GAME_NUMBERS_3_4] as DiceNumber[];
    console.log('Using 3-4 numbers:', numbers);
    console.log('Number count by value:', numbers.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {} as Record<number, number>));
  }
  
  // Verify we have the correct number of tokens for the resource tiles
  if (numbers.length !== resourceTiles.length) {
    console.warn(`Mismatch: ${numbers.length} numbers but ${resourceTiles.length} resource tiles`);
    console.warn('Numbers:', numbers);
    console.warn('Resource tiles count by type:', resourceTiles.reduce((acc, tile) => {
      acc[tile.terrain] = (acc[tile.terrain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>));
  }
  
  if (useRandomNumbers) {
    // Shuffle the numbers for random distribution
    numbers = shuffle(numbers);
  }
  
  // Assign numbers to tiles (no trimming or duplicating)
  const updatedHexes = hexes.map(hex => {
    if (hex.resource === 'desert' || hex.terrain === 'desert') {
      return hex;
    }
    
    // Find this tile in the resource tiles list
    const tileIndex = resourceTiles.findIndex(tile => tile.id === hex.id);
    if (tileIndex >= 0 && tileIndex < numbers.length) {
      return {
        ...hex,
        number: numbers[tileIndex]
      };
    }
    
    return hex;
  });
  
  // Balance adjacent numbers if required (disabled for now due to potential bugs)
  // TODO: Add separate option for number balancing vs resource balancing
  if (false && balancedResources) {
    return balanceAdjacentNumbers(updatedHexes);
  }
  
  // Debug: Log the final number distribution
  const finalNumberDistribution = updatedHexes
    .filter(hex => hex.number)
    .reduce((acc, hex) => {
      acc[hex.number!] = (acc[hex.number!] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  
  console.log('Final number distribution:', finalNumberDistribution);
  
  return updatedHexes;
}

// Balance adjacent numbers to avoid clustering
function balanceAdjacentNumbers(hexes: Hex[]): Hex[] {
  console.log('DEBUG: Starting balanceAdjacentNumbers');
  
  // Debug: Log initial number distribution
  const initialNumbers = hexes
    .filter(hex => hex.number)
    .reduce((acc, hex) => {
      acc[hex.number!] = (acc[hex.number!] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  
  console.log('Initial number distribution before balancing:', initialNumbers);
  
  const maxAttempts = 100;
  let attempts = 0;
  let balanced = false;
  
  while (!balanced && attempts < maxAttempts) {
    balanced = true;
    
    for (let i = 0; i < hexes.length; i++) {
      const hex = hexes[i];
      if (!hex.number) continue;
      
      const neighbors = getNeighbors(hex.position);
      const neighborHexes = neighbors
        .map(pos => hexes.find(h => 
          h.position.q === pos.q && h.position.r === pos.r && h.position.s === pos.s
        ))
        .filter(h => h && h.number);
      
      // Check for adjacent 6s and 8s (most probable numbers)
      const hasAdjacentHighProb = neighborHexes.some(neighbor => 
        neighbor?.number && 
        ((hex.number === 6 || hex.number === 8) && 
         (neighbor.number === 6 || neighbor.number === 8))
      );
      
      if (hasAdjacentHighProb) {
        console.log(`DEBUG: Found adjacent high prob numbers: ${hex.number} has adjacent high prob`);
        // Find a different hex to swap with
        for (let j = i + 1; j < hexes.length; j++) {
          const otherHex = hexes[j];
          if (!otherHex.number) continue;
          
          // Try swapping numbers
          const tempNumber: DiceNumber | undefined = hex.number;
          const otherTempNumber: DiceNumber | undefined = otherHex.number;
          hex.number = otherTempNumber;
          otherHex.number = tempNumber;
          
          console.log(`DEBUG: Swapped ${tempNumber} with ${otherTempNumber}`);
          
          // Check if this improves the situation
          const newNeighbors = getNeighbors(hex.position)
            .map(pos => hexes.find(h => 
              h.position.q === pos.q && h.position.r === pos.r && h.position.s === pos.s
            ))
            .filter(h => h && h.number);
          
          const stillHasAdjacentHighProb = newNeighbors.some(neighbor => 
            neighbor?.number && 
            ((hex.number === 6 || hex.number === 8) && 
             (neighbor.number === 6 || neighbor.number === 8))
          );
          
          if (!stillHasAdjacentHighProb) {
            balanced = false;
            break;
          } else {
            // Swap back if it didn't help
            hex.number = tempNumber;
            otherHex.number = otherTempNumber;
          }
        }
      }
    }
    
    attempts++;
  }
  
  // Debug: Log final number distribution
  const finalNumbers = hexes
    .filter(hex => hex.number)
    .reduce((acc, hex) => {
      acc[hex.number!] = (acc[hex.number!] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  
  console.log('Final number distribution after balancing:', finalNumbers);
  console.log(`DEBUG: Balancing completed after ${attempts} attempts`);
  
  return hexes;
}

// Balance resource distribution to prevent clustering (base game only)
function balanceResourceDistribution(hexes: Hex[]): Hex[] {
  console.log('DEBUG: Starting balanceResourceDistribution');
  
  const maxAttempts = 100;
  let attempts = 0;
  let balanced = false;
  
  while (!balanced && attempts < maxAttempts) {
    balanced = true;
    
    for (let i = 0; i < hexes.length; i++) {
      const hex = hexes[i];
      if (hex.resource === 'desert') continue;
      
      const neighbors = getNeighbors(hex.position);
      const neighborHexes = neighbors
        .map(pos => hexes.find(h => 
          h.position.q === pos.q && h.position.r === pos.r && h.position.s === pos.s
        ))
        .filter(h => h && h.resource !== 'desert');
      
      // Count how many neighbors have the same resource type
      const sameResourceNeighbors = neighborHexes.filter(neighbor => 
        neighbor && neighbor.resource === hex.resource
      );
      
      // If more than 1 neighbor has the same resource, try to swap
      if (sameResourceNeighbors.length > 1) {
        console.log(`DEBUG: Found ${sameResourceNeighbors.length} neighbors with same resource (${hex.resource})`);
        
        // Find a different hex to swap with
        for (let j = i + 1; j < hexes.length; j++) {
          const otherHex = hexes[j];
          if (otherHex.resource === 'desert') continue;
          if (otherHex.resource === hex.resource) continue; // Skip same resource
          
          // Check if swapping would improve both positions
          const otherNeighbors = getNeighbors(otherHex.position)
            .map(pos => hexes.find(h => 
              h.position.q === pos.q && h.position.r === pos.r && h.position.s === pos.s
            ))
            .filter(h => h && h.resource !== 'desert');
          
          const otherSameResourceNeighbors = otherNeighbors.filter(neighbor => 
            neighbor && neighbor.resource === otherHex.resource
          );
          
          // Try swapping resources (preserve terrain and number)
          const tempResource: ResourceType = hex.resource;
          const tempTerrain: TerrainType = hex.terrain;
          const otherTempResource: ResourceType = otherHex.resource;
          const otherTempTerrain: TerrainType = otherHex.terrain;
          
          hex.resource = otherTempResource;
          hex.terrain = otherTempTerrain;
          otherHex.resource = tempResource;
          otherHex.terrain = tempTerrain;
          
          // Check if this improves the situation for both hexes
          const newSameResourceNeighbors = neighborHexes.filter(neighbor => 
            neighbor && neighbor.resource === hex.resource
          );
          
          const newOtherSameResourceNeighbors = otherNeighbors.filter(neighbor => 
            neighbor && neighbor.resource === otherHex.resource
          );
          
          if (newSameResourceNeighbors.length < sameResourceNeighbors.length &&
              newOtherSameResourceNeighbors.length <= otherSameResourceNeighbors.length) {
            console.log(`DEBUG: Swapped ${tempResource} with ${hex.resource} - improvement found`);
            balanced = false;
            break;
          } else {
            // Swap back if it didn't help
            hex.resource = tempResource;
            hex.terrain = tempTerrain;
            otherHex.resource = otherTempResource;
            otherHex.terrain = otherTempTerrain;
          }
        }
      }
    }
    
    attempts++;
  }
  
  console.log(`DEBUG: Resource balancing completed after ${attempts} attempts`);
  return hexes;
}

// Generate and place harbors (base game only)
// Creates water hexes around the perimeter and places harbors on them
function generateHarbors(hexes: Hex[], config: GameConfiguration): Hex[] {
  const { rules } = config;
  const { playerCount } = rules;
  
  // Select the correct base game config based on player count
  const isUsingExtension = playerCount > 4;
  const expansionKey = isUsingExtension ? 'base-5-6' : 'base';
  const expansionConfig = EXPANSION_CONFIGS[expansionKey];
  
  if (!expansionConfig) {
    return hexes;
  }
  
  // Use fixed harbor positions for base game
  const fixedHarborPositions = isUsingExtension ? BASE_GAME_HARBOR_POSITIONS_5_6 : BASE_GAME_HARBOR_POSITIONS_3_4;
  
  // Create harbor pool with randomized resource types
  const harborPool: HarborType[] = [];
  for (const harbor of expansionConfig.harborDistribution) {
    const count = harbor.count;
    
    for (let i = 0; i < count; i++) {
      harborPool.push(harbor.type);
    }
  }
  
  // Shuffle only the harbor types, not the positions
  const shuffledHarbors = shuffle(harborPool);
  
  // Create water hexes with harbors
  const waterHexes: Hex[] = [];
  fixedHarborPositions.forEach((harborPos: HarborPosition, index: number) => {
    if (index < shuffledHarbors.length) {
      waterHexes.push({
        id: uuidv4(),
        position: { q: harborPos.q, r: harborPos.r, s: harborPos.s },
        terrain: 'water',
        resource: 'desert', // Use 'desert' as a placeholder for water hexes
        number: undefined,
        harbor: shuffledHarbors[index],
        adjacentLand: harborPos.adjacentLand, // Store which land hex this harbor borders
        iconOffset: harborPos.iconOffset, // Store icon positioning within hex
        iconRotation: harborPos.iconRotation, // Store icon rotation
      });
    }
  });
  
  // Return both land hexes and water hexes with harbors
  return [...hexes, ...waterHexes];
}

// Calculate map statistics (base game only)
function calculateMapStatistics(hexes: Hex[]): MapStatistics {
  const resourceBalance: Record<ResourceType, number> = {
    brick: 0,
    lumber: 0,
    wool: 0,
    grain: 0,
    ore: 0,
    desert: 0,
    harbor: 0,
  };
  
  const numberDistribution: Record<DiceNumber, number> = {
    2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };
  
  const harborDistribution: Record<HarborType, number> = {
    generic: 0,
    brick: 0,
    lumber: 0,
    wool: 0,
    grain: 0,
    ore: 0,
  };
  
  let adjacentSameNumbers = 0;
  let desertPlacement: 'center' | 'edge' | 'corner' = 'center';
  
  // Count resources and numbers
  for (const hex of hexes) {
    resourceBalance[hex.resource]++;
    
    if (hex.number) {
      numberDistribution[hex.number]++;
    }
    
    if (hex.harbor) {
      harborDistribution[hex.harbor]++;
    }
  }
  
  // Calculate adjacent same numbers
  for (const hex of hexes) {
    if (!hex.number) continue;
    
    const neighbors = getNeighbors(hex.position);
    const neighborHexes = neighbors
      .map(pos => hexes.find(h => 
        h.position.q === pos.q && h.position.r === pos.r && h.position.s === pos.s
      ))
      .filter(h => h && h.number);
    
    adjacentSameNumbers += neighborHexes.filter(neighbor => 
      neighbor?.number === hex.number
    ).length;
  }
  
  // Determine desert placement
  const desertTile = hexes.find(hex => hex.terrain === 'desert');
  if (desertTile) {
    const neighbors = getNeighbors(desertTile.position);
    const neighborCount = neighbors.filter(pos => 
      hexes.some(h => h.position.q === pos.q && h.position.r === pos.r && h.position.s === pos.s)
    ).length;
    
    if (neighborCount === 6) {
      desertPlacement = 'center';
    } else if (neighborCount >= 4) {
      desertPlacement = 'edge';
    } else {
      desertPlacement = 'corner';
    }
  }
  
  return {
    resourceBalance,
    numberDistribution,
    harborDistribution,
    adjacentSameNumbers,
    desertPlacement,
  };
}

// Main map generation function (base game only)
export function generateMap(config: GameConfiguration): GameMap {
  // Generate map coordinates
  const coordinates = generateMapCoordinates(config);
  console.log('Generated coordinates:', coordinates.length);
  
  // Generate terrain tiles
  let hexes = generateTerrain(coordinates, config);
  console.log('Generated terrain hexes:', hexes.length);
  console.log('Terrain hex types:', hexes.reduce((acc, hex) => {
    acc[hex.terrain] = (acc[hex.terrain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>));
  
  // Balance resource distribution if enabled (temporarily disabled due to bugs)
  if (false && config.rules.balancedResources) {
    hexes = balanceResourceDistribution(hexes);
  }
  
  // Assign dice numbers
  hexes = assignDiceNumbers(hexes, config);
  
  // Generate harbors
  hexes = generateHarbors(hexes, config);
  
  // Validate resource uniqueness
  hexes = validateResourceUniqueness(hexes);
  
  return {
    hexes,
    playerCount: config.rules.playerCount,
    expansion: 'base',
    scenario: undefined,
    mapSize: config.mapSize,
  };
}

// Validate generated map (base game only)
export function validateMap(map: GameMap): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check minimum number of resource tiles
  const resourceTiles = map.hexes.filter(hex => hex.resource !== 'desert' && hex.terrain !== 'desert');
  if (resourceTiles.length < 12) {
    errors.push('Map has too few resource tiles');
  }
  
  // Check number distribution
  const numberedTiles = map.hexes.filter(hex => hex.number);
  const uniqueNumbers = new Set(numberedTiles.map(hex => hex.number));
  if (uniqueNumbers.size < 8) {
    errors.push('Map should have a diverse number distribution');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// Generate map statistics
export function getMapStatistics(map: GameMap): MapStatistics {
  return calculateMapStatistics(map.hexes);
}
