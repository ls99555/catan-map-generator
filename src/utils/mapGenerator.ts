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
import { EXPANSION_CONFIGS, DICE_PROBABILITIES, STANDARD_NUMBER_DISTRIBUTION, PLAYER_EXTENSION_CONFIG } from '../config/expansions';
import { 
  CubeCoordinate, 
  generateHexagonalMap, 
  generateHexagonalMapWithExtension,
  generateRectangularMap, 
  generateIslandMap,
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

// Generate map coordinates based on player count and expansion (following official rules)
function generateMapCoordinates(config: GameConfiguration): CubeCoordinate[] {
  const { rules } = config;
  const { playerCount, expansion, scenario } = rules;
  
  // Calculate total tiles needed based on player count and expansion
  const expansionConfig = EXPANSION_CONFIGS[expansion];
  const isUsingExtension = playerCount > 4;
  
  // Base tiles from expansion config
  let totalLandTiles = expansionConfig.tileDistributions
    .filter(tile => tile.terrain !== 'sea')
    .reduce((sum, tile) => sum + tile.count, 0);
  
  // Add extension tiles for 5-6 players
  if (isUsingExtension && PLAYER_EXTENSION_CONFIG[expansion as keyof typeof PLAYER_EXTENSION_CONFIG]) {
    const extensionConfig = PLAYER_EXTENSION_CONFIG[expansion as keyof typeof PLAYER_EXTENSION_CONFIG];
    totalLandTiles += extensionConfig.additionalTiles
      .filter(tile => tile.terrain !== 'sea')
      .reduce((sum, tile) => sum + tile.count, 0);
  }
  
  // Determine map radius based on total tiles needed
  // Standard Catan uses specific layouts:
  // - 19 tiles = radius 2 hexagon (3-4 players)
  // - 25 tiles = radius 2 hexagon + 6 frame tiles (5-6 players)
  // - 30+ tiles = radius 3 hexagon (larger expansions)
  let mapRadius: number;
  
  if (totalLandTiles <= 19) {
    mapRadius = 2; // Standard 3-4 player board
  } else if (totalLandTiles <= 25) {
    mapRadius = 2; // 5-6 player board (same radius, but with frame extension)
  } else {
    mapRadius = 3; // Larger expansions
  }
  
  // Expansion-specific map generation
  switch (expansion) {
    case 'base':
      if (isUsingExtension) {
        return generateHexagonalMapWithExtension(mapRadius);
      }
      return generateHexagonalMap(mapRadius);
    
    case 'seafarers':
      if (scenario === 'four-islands') {
        return generateIslandMap(1, 4);
      }
      if (isUsingExtension) {
        return generateHexagonalMapWithExtension(mapRadius);
      }
      return generateHexagonalMap(mapRadius);
    
    case 'cities-knights':
      // Cities & Knights uses standard hexagonal layout, not random edge tiles
      if (isUsingExtension) {
        return generateHexagonalMapWithExtension(mapRadius);
      }
      return generateHexagonalMap(mapRadius);
    
    case 'traders-barbarians':
      if (scenario === 'great-river') {
        return generateRectangularMap(5, 7);
      }
      if (isUsingExtension) {
        return generateHexagonalMapWithExtension(mapRadius);
      }
      return generateHexagonalMap(mapRadius);
    
    case 'explorers-pirates':
      return generateIslandMap(2, Math.max(2, mapRadius - 1));
    
    default:
      if (isUsingExtension) {
        return generateHexagonalMapWithExtension(mapRadius);
      }
      return generateHexagonalMap(mapRadius);
  }
}

// Generate terrain tiles for the map
function generateTerrain(coordinates: CubeCoordinate[], config: GameConfiguration): Hex[] {
  const { rules } = config;
  const { expansion, playerCount } = rules;
  
  const expansionConfig = EXPANSION_CONFIGS[expansion];
  if (!expansionConfig) {
    throw new Error(`Unknown expansion: ${expansion}`);
  }
  
  // Create tile pool based on expansion and player count
  const tilePool: { terrain: TerrainType; resource: ResourceType }[] = [];
  
  for (const distribution of expansionConfig.tileDistributions) {
    let count = distribution.count;
    
    // Skip fishery tiles unless in a fish-related scenario
    if (distribution.terrain === 'fishery') {
      const fishScenarios = ['fishermen-of-catan', 'fishermen-lake', 'fish-for-catan'];
      if (!config.rules.scenario || !fishScenarios.includes(config.rules.scenario)) {
        continue; // Skip fishery tiles
      }
    }
    
    // Add tiles for player extensions (5-6 players)
    if (playerCount > 4) {
      const extensionConfig = PLAYER_EXTENSION_CONFIG[expansion as keyof typeof PLAYER_EXTENSION_CONFIG];
      if (extensionConfig) {
        const additionalTile = extensionConfig.additionalTiles.find(
          (tile: { terrain: TerrainType; count: number; resource: ResourceType }) => 
            tile.terrain === distribution.terrain
        );
        if (additionalTile) {
          count += additionalTile.count;
        }
      }
    }
    
    for (let i = 0; i < count; i++) {
      tilePool.push({
        terrain: distribution.terrain,
        resource: distribution.resource
      });
    }
  }
  
  // Shuffle and assign tiles
  const shuffledTiles = shuffle(tilePool);
  
  return coordinates.map((coord, index) => {
    const tile = shuffledTiles[index % shuffledTiles.length];
    return {
      id: uuidv4(),
      terrain: tile.terrain,
      resource: tile.resource,
      position: coord,
      hasRobber: false,
      hasPirate: false,
    };
  });
}

// Generate and assign dice numbers to tiles
function assignDiceNumbers(hexes: Hex[], config: GameConfiguration): Hex[] {
  const { rules } = config;
  const { useRandomNumbers, balancedResources, playerCount, expansion } = rules;
  
  // Filter out desert and water tiles
  const resourceTiles = hexes.filter(hex => 
    hex.resource !== 'desert' && hex.terrain !== 'sea'
  );
  
  let numbers: DiceNumber[];
  
  if (useRandomNumbers) {
    // Generate random numbers with proper distribution
    numbers = [];
    const baseNumbers: DiceNumber[] = [3, 4, 5, 6, 8, 9, 10, 11];
    
    // Add 2 and 12 for 5-6 player games
    if (playerCount > 4) {
      const extensionConfig = PLAYER_EXTENSION_CONFIG[expansion as keyof typeof PLAYER_EXTENSION_CONFIG];
      if (extensionConfig && extensionConfig.additionalNumbers) {
        baseNumbers.push(...extensionConfig.additionalNumbers as DiceNumber[]);
      }
    }
    
    while (numbers.length < resourceTiles.length) {
      numbers.push(...shuffle(baseNumbers));
    }
    
    numbers = shuffle(numbers).slice(0, resourceTiles.length);
  } else {
    // Use standard distribution
    const standardNumbers = [...STANDARD_NUMBER_DISTRIBUTION] as DiceNumber[];
    
    // Add 2 and 12 for 5-6 player games
    if (playerCount > 4) {
      const extensionConfig = PLAYER_EXTENSION_CONFIG[expansion as keyof typeof PLAYER_EXTENSION_CONFIG];
      if (extensionConfig && extensionConfig.additionalNumbers) {
        standardNumbers.push(...extensionConfig.additionalNumbers as DiceNumber[]);
      }
    }
    
    numbers = shuffle(standardNumbers).slice(0, resourceTiles.length);
  }
  
  // Assign numbers to tiles
  const updatedHexes = hexes.map(hex => {
    if (hex.resource === 'desert' || hex.terrain === 'sea') {
      return hex;
    }
    
    const numberIndex = resourceTiles.findIndex(tile => tile.id === hex.id);
    return {
      ...hex,
      number: numbers[numberIndex]
    };
  });
  
  // Balance adjacent numbers if required
  if (balancedResources) {
    return balanceAdjacentNumbers(updatedHexes);
  }
  
  return updatedHexes;
}

// Balance adjacent numbers to avoid clustering
function balanceAdjacentNumbers(hexes: Hex[]): Hex[] {
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
        // Find a different hex to swap with
        for (let j = i + 1; j < hexes.length; j++) {
          const otherHex = hexes[j];
          if (!otherHex.number) continue;
          
          // Try swapping numbers
          const tempNumber: DiceNumber | undefined = hex.number;
          hex.number = otherHex.number;
          otherHex.number = tempNumber;
          
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
            hex.number = otherHex.number;
            otherHex.number = tempNumber;
          }
        }
      }
    }
    
    attempts++;
  }
  
  return hexes;
}

// Generate and place harbors
function generateHarbors(hexes: Hex[], config: GameConfiguration): Hex[] {
  const { rules } = config;
  const { expansion, playerCount } = rules;
  
  const expansionConfig = EXPANSION_CONFIGS[expansion];
  if (!expansionConfig) {
    return hexes;
  }
  
  // Get land tiles that are adjacent to sea tiles (valid harbor positions)
  const validHarborPositions = getValidHarborPositions(hexes);
  
  // Create harbor pool
  const harborPool: HarborType[] = [];
  for (const harbor of expansionConfig.harborDistribution) {
    let count = harbor.count;
    
    // Add additional harbors for 5-6 player extensions
    if (playerCount > 4) {
      const extensionConfig = PLAYER_EXTENSION_CONFIG[expansion as keyof typeof PLAYER_EXTENSION_CONFIG];
      if (extensionConfig) {
        const additionalHarbor = extensionConfig.additionalHarbors.find(
          (h: { type: HarborType; count: number }) => h.type === harbor.type
        );
        if (additionalHarbor) {
          count += additionalHarbor.count;
        }
      }
    }
    
    for (let i = 0; i < count; i++) {
      harborPool.push(harbor.type);
    }
  }
  
  // Shuffle and assign harbors to valid positions
  const shuffledHarbors = shuffle(harborPool);
  const shuffledPositions = shuffle(validHarborPositions);
  
  return hexes.map(hex => {
    const positionIndex = shuffledPositions.findIndex(pos => pos.id === hex.id);
    if (positionIndex !== -1 && positionIndex < shuffledHarbors.length) {
      return {
        ...hex,
        harbor: shuffledHarbors[positionIndex]
      };
    }
    return hex;
  });
}

// Get valid harbor positions (land tiles adjacent to sea tiles or map edge)
function getValidHarborPositions(hexes: Hex[]): Hex[] {
  const validPositions: Hex[] = [];
  
  // Check if this expansion uses sea tiles
  const hasSeaTiles = hexes.some(hex => hex.terrain === 'sea');
  
  for (const hex of hexes) {
    // Skip if this is not a land tile
    if (hex.terrain === 'sea') {
      continue;
    }
    
    let isValidHarborPosition = false;
    
    if (hasSeaTiles) {
      // For expansions with sea tiles: check if this land tile is adjacent to any sea tile
      const neighbors = getNeighbors(hex.position);
      isValidHarborPosition = neighbors.some(neighborPos => {
        const neighborHex = hexes.find(h => 
          h.position.q === neighborPos.q && 
          h.position.r === neighborPos.r && 
          h.position.s === neighborPos.s
        );
        return neighborHex && neighborHex.terrain === 'sea';
      });
    } else {
      // For base game without sea tiles: check if this land tile is on the map edge
      const neighbors = getNeighbors(hex.position);
      isValidHarborPosition = neighbors.some(neighborPos => {
        const neighborHex = hexes.find(h => 
          h.position.q === neighborPos.q && 
          h.position.r === neighborPos.r && 
          h.position.s === neighborPos.s
        );
        return !neighborHex; // No hex at this position = edge of map
      });
    }
    
    if (isValidHarborPosition) {
      validPositions.push(hex);
    }
  }
  
  return validPositions;
}

// Place robber on desert tile
function placeRobber(hexes: Hex[]): Hex[] {
  const desertTiles = hexes.filter(hex => hex.terrain === 'desert');
  if (desertTiles.length > 0) {
    const robberTile = desertTiles[0];
    return hexes.map(hex => ({
      ...hex,
      hasRobber: hex.id === robberTile.id
    }));
  }
  return hexes;
}

// Calculate map statistics
function calculateMapStatistics(hexes: Hex[]): MapStatistics {
  const resourceBalance: Record<ResourceType, number> = {
    brick: 0,
    lumber: 0,
    wool: 0,
    grain: 0,
    ore: 0,
    desert: 0,
    gold: 0,
    fish: 0,
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
  
  let probabilitySpread = 0;
  let adjacentSameNumbers = 0;
  let desertPlacement: 'center' | 'edge' | 'corner' = 'center';
  
  // Count resources and numbers
  for (const hex of hexes) {
    resourceBalance[hex.resource]++;
    
    if (hex.number) {
      numberDistribution[hex.number]++;
      probabilitySpread += DICE_PROBABILITIES[hex.number];
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
    probabilitySpread,
    adjacentSameNumbers,
    desertPlacement,
  };
}

// Main map generation function
export function generateMap(config: GameConfiguration): GameMap {
  // Generate map coordinates
  const coordinates = generateMapCoordinates(config);
  
  // Generate terrain tiles
  let hexes = generateTerrain(coordinates, config);
  
  // Assign dice numbers
  hexes = assignDiceNumbers(hexes, config);
  
  // Generate harbors
  hexes = generateHarbors(hexes, config);
  
  // Place robber
  hexes = placeRobber(hexes);
  
  // Validate resource uniqueness
  hexes = validateResourceUniqueness(hexes);
  
  return {
    hexes,
    playerCount: config.rules.playerCount,
    expansion: config.rules.expansion,
    scenario: config.rules.scenario,
    mapSize: config.mapSize,
  };
}

// Validate generated map
export function validateMap(map: GameMap): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check minimum number of resource tiles
  const resourceTiles = map.hexes.filter(hex => hex.resource !== 'desert' && hex.terrain !== 'sea');
  if (resourceTiles.length < 12) {
    errors.push('Map has too few resource tiles');
  }
  
  // Check for robber placement
  const robberTiles = map.hexes.filter(hex => hex.hasRobber);
  if (robberTiles.length !== 1) {
    errors.push('Map must have exactly one robber');
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
