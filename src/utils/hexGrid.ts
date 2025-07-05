// Cube coordinates for hexagonal grid
export interface CubeCoordinate {
  q: number;
  r: number;
  s: number;
}

// Harbor position type for validation
export interface HarborPosition {
  q: number;
  r: number;
  s: number;
  adjacentLand: { q: number; r: number; s: number };
}

// Offset coordinates for easier grid generation
export interface OffsetCoordinate {
  col: number;
  row: number;
}

// Pixel coordinates for rendering
export interface PixelCoordinate {
  x: number;
  y: number;
}

// Hex grid layout configuration
export interface HexLayout {
  size: number;
  origin: PixelCoordinate;
  orientation: 'flat' | 'pointy';
}

// Convert between coordinate systems
export function cubeToOffset(cube: CubeCoordinate): OffsetCoordinate {
  const col = cube.q;
  const row = cube.r + (cube.q - (cube.q & 1)) / 2;
  return { col, row };
}

export function offsetToCube(offset: OffsetCoordinate): CubeCoordinate {
  const q = offset.col;
  const r = offset.row - (offset.col - (offset.col & 1)) / 2;
  const s = -q - r;
  return { q, r, s };
}

export function cubeToPixel(cube: CubeCoordinate, layout: HexLayout): PixelCoordinate {
  const { size, origin, orientation } = layout;
  
  let x: number, y: number;
  
  if (orientation === 'flat') {
    x = size * (3/2 * cube.q);
    y = size * (Math.sqrt(3)/2 * cube.q + Math.sqrt(3) * cube.r);
  } else {
    x = size * (Math.sqrt(3) * cube.q + Math.sqrt(3)/2 * cube.r);
    y = size * (3/2 * cube.r);
  }
  
  return {
    x: x + origin.x,
    y: y + origin.y
  };
}

export function pixelToCube(pixel: PixelCoordinate, layout: HexLayout): CubeCoordinate {
  const { size, origin, orientation } = layout;
  
  const x = (pixel.x - origin.x) / size;
  const y = (pixel.y - origin.y) / size;
  
  let q: number, r: number;
  
  if (orientation === 'flat') {
    q = (2/3) * x;
    r = (-1/3 * x + Math.sqrt(3)/3 * y);
  } else {
    q = (Math.sqrt(3)/3 * x - 1/3 * y);
    r = (2/3) * y;
  }
  
  return cubeRound({ q, r, s: -q - r });
}

// Round fractional cube coordinates to nearest hex
export function cubeRound(cube: CubeCoordinate): CubeCoordinate {
  let q = Math.round(cube.q);
  let r = Math.round(cube.r);
  let s = Math.round(cube.s);
  
  const qDiff = Math.abs(q - cube.q);
  const rDiff = Math.abs(r - cube.r);
  const sDiff = Math.abs(s - cube.s);
  
  if (qDiff > rDiff && qDiff > sDiff) {
    q = -r - s;
  } else if (rDiff > sDiff) {
    r = -q - s;
  } else {
    s = -q - r;
  }
  
  return { q, r, s };
}

// Calculate distance between two hexes
export function cubeDistance(a: CubeCoordinate, b: CubeCoordinate): number {
  return (Math.abs(a.q - b.q) + Math.abs(a.r - b.r) + Math.abs(a.s - b.s)) / 2;
}

// Get all neighbors of a hex
export function getNeighbors(cube: CubeCoordinate): CubeCoordinate[] {
  const directions = [
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 },
  ];
  
  return directions.map(dir => ({
    q: cube.q + dir.q,
    r: cube.r + dir.r,
    s: cube.s + dir.s,
  }));
}

// Get all hexes within a certain radius
export function getHexesInRadius(center: CubeCoordinate, radius: number): CubeCoordinate[] {
  const results: CubeCoordinate[] = [];
  
  for (let q = -radius; q <= radius; q++) {
    for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
      const s = -q - r;
      results.push({ q, r, s });
    }
  }
  
  return results;
}

// Generate hexes around a specific center point
export function getHexesAroundCenter(center: CubeCoordinate, radius: number): CubeCoordinate[] {
  const results: CubeCoordinate[] = [];
  
  for (let q = -radius; q <= radius; q++) {
    for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
      const s = -q - r;
      results.push({ 
        q: center.q + q, 
        r: center.r + r, 
        s: center.s + s 
      });
    }
  }
  
  return results;
}

// Generate a hexagonal map shape
export function generateHexagonalMap(radius: number): CubeCoordinate[] {
  return getHexesInRadius({ q: 0, r: 0, s: 0 }, radius);
}

// Generate a rectangular map shape
export function generateRectangularMap(width: number, height: number): CubeCoordinate[] {
  const results: CubeCoordinate[] = [];
  
  for (let col = 0; col < width; col++) {
    for (let row = 0; row < height; row++) {
      results.push(offsetToCube({ col, row }));
    }
  }
  
  return results;
}

// Generate the official base game 3-4-5-4-3 hexagonal layout (19 tiles)
export function generateBaseGameLayout(): CubeCoordinate[] {
  // Official Catan base game layout is a radius-2 hexagon, but rotated
  // so that the 3-4-5-4-3 pattern goes top to bottom instead of left to right
  const baseHexes = getHexesInRadius({ q: 0, r: 0, s: 0 }, 2);
  
  // Rotate the hexagon by 90 degrees to orient the 3-4-5-4-3 pattern vertically
  // This transforms coordinates: (q, r, s) -> (-r, -s, -q)
  const rotatedHexes = baseHexes.map(hex => ({
    q: -hex.r,
    r: -hex.s,
    s: -hex.q
  }));
  
  return rotatedHexes;
}

// Generate the base game 5-6 player layout (30 tiles in [3, 4, 5, 6, 5, 4, 3] pattern)
// WARNING: DO NOT MODIFY THIS FUNCTION - Coordinates are precisely aligned
export function generateBaseGame56Layout(): CubeCoordinate[] {
  // Perfectly symmetrical hexagonal layout centered at origin
  const coordinates: CubeCoordinate[] = [];
  
  // Row 0 (top): 3 hexes - centered
  coordinates.push({ q: 1, r: -3, s: 2 });
  coordinates.push({ q: 2, r: -3, s: 1 });
  coordinates.push({ q: 3, r: -3, s: 0 });
  
  // Row 1: 4 hexes - expanding symmetrically
  coordinates.push({ q: 0, r: -2, s: 2 });
  coordinates.push({ q: 1, r: -2, s: 1 });
  coordinates.push({ q: 2, r: -2, s: 0 });
  coordinates.push({ q: 3, r: -2, s: -1 });
  
  // Row 2: 5 hexes - expanding further
  coordinates.push({ q: -1, r: -1, s: 2 });
  coordinates.push({ q: 0, r: -1, s: 1 });
  coordinates.push({ q: 1, r: -1, s: 0 });
  coordinates.push({ q: 2, r: -1, s: -1 });
  coordinates.push({ q: 3, r: -1, s: -2 });
  
  // Row 3: 6 hexes - widest row, perfectly centered
  coordinates.push({ q: -2, r: 0, s: 2 });
  coordinates.push({ q: -1, r: 0, s: 1 });
  coordinates.push({ q: 0, r: 0, s: 0 });
  coordinates.push({ q: 1, r: 0, s: -1 });
  coordinates.push({ q: 2, r: 0, s: -2 });
  coordinates.push({ q: 3, r: 0, s: -3 });
  
  // Row 4: 5 hexes - contracting symmetrically
  coordinates.push({ q: -2, r: 1, s: 1 });
  coordinates.push({ q: -1, r: 1, s: 0 });
  coordinates.push({ q: 0, r: 1, s: -1 });
  coordinates.push({ q: 1, r: 1, s: -2 });
  coordinates.push({ q: 2, r: 1, s: -3 });
  
  // Row 5: 4 hexes - contracting further
  coordinates.push({ q: -2, r: 2, s: 0 });
  coordinates.push({ q: -1, r: 2, s: -1 });
  coordinates.push({ q: 0, r: 2, s: -2 });
  coordinates.push({ q: 1, r: 2, s: -3 });
  
  // Row 6 (bottom): 3 hexes - perfectly centered
  coordinates.push({ q: -2, r: 3, s: -1 });
  coordinates.push({ q: -1, r: 3, s: -2 });
  coordinates.push({ q: 0, r: 3, s: -3 });
  
  return coordinates;
}

// Check if a coordinate is valid for a given map shape
export function isValidCoordinate(coord: CubeCoordinate, validCoords: CubeCoordinate[]): boolean {
  return validCoords.some(valid => 
    valid.q === coord.q && valid.r === coord.r && valid.s === coord.s
  );
}

// Get edge positions for harbors
export function getEdgePositions(mapCoords: CubeCoordinate[]): CubeCoordinate[] {
  const edges: CubeCoordinate[] = [];
  
  for (const coord of mapCoords) {
    const neighbors = getNeighbors(coord);
    const hasEmptyNeighbor = neighbors.some(neighbor => 
      !isValidCoordinate(neighbor, mapCoords)
    );
    
    if (hasEmptyNeighbor) {
      edges.push(coord);
    }
  }
  
  return edges;
}

// Calculate hex vertices for precise rendering
export function getHexVertices(cube: CubeCoordinate, layout: HexLayout): PixelCoordinate[] {
  const center = cubeToPixel(cube, layout);
  const vertices: PixelCoordinate[] = [];
  
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i + (layout.orientation === 'flat' ? 0 : 30);
    const angleRad = Math.PI / 180 * angleDeg;
    
    vertices.push({
      x: center.x + layout.size * Math.cos(angleRad),
      y: center.y + layout.size * Math.sin(angleRad)
    });
  }
  
  return vertices;
}

// Generate SVG path for a hex
export function getHexPath(cube: CubeCoordinate, layout: HexLayout): string {
  const vertices = getHexVertices(cube, layout);
  
  let path = `M ${vertices[0].x} ${vertices[0].y}`;
  for (let i = 1; i < vertices.length; i++) {
    path += ` L ${vertices[i].x} ${vertices[i].y}`;
  }
  path += ' Z';
  
  return path;
}

// Get water hex positions adjacent to land hexes for harbor placement
export function getAdjacentWaterPositions(landHexes: CubeCoordinate[]): CubeCoordinate[] {
  const waterPositions: CubeCoordinate[] = [];
  const usedPositions = new Set<string>();
  
  // For each land hex, find all neighboring positions that are NOT land
  landHexes.forEach(landHex => {
    const neighbors = getNeighbors(landHex);
    
    neighbors.forEach(neighbor => {
      const neighborKey = `${neighbor.q},${neighbor.r},${neighbor.s}`;
      
      // If this position is not a land hex and not already used, it's a water position
      const isLandHex = landHexes.some(land => 
        land.q === neighbor.q && land.r === neighbor.r && land.s === neighbor.s
      );
      
      if (!isLandHex && !usedPositions.has(neighborKey)) {
        waterPositions.push(neighbor);
        usedPositions.add(neighborKey);
      }
    });
  });
  
  return waterPositions;
}

// Validate harbor positions against actual land hex coordinates
export function validateHarborPositions(landHexes: CubeCoordinate[], harborPositions: HarborPosition[]): void {
  console.log('Validating harbor positions...');
  console.log('Land hexes:', landHexes);
  
  harborPositions.forEach((harbor, index) => {
    const landHex = landHexes.find(hex => 
      hex.q === harbor.adjacentLand.q && 
      hex.r === harbor.adjacentLand.r && 
      hex.s === harbor.adjacentLand.s
    );
    
    if (!landHex) {
      console.warn(`Harbor ${index} references non-existent land hex:`, harbor.adjacentLand);
    }
    
    // Check if water hex is adjacent to land hex
    if (landHex) {
      const neighbors = getNeighbors(landHex);
      const isAdjacent = neighbors.some(neighbor => 
        neighbor.q === harbor.q && neighbor.r === harbor.r && neighbor.s === harbor.s
      );
      
      if (!isAdjacent) {
        console.warn(`Harbor ${index} is not adjacent to its land hex:`, harbor);
      }
    }
  });
}
