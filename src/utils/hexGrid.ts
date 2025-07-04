// Cube coordinates for hexagonal grid
export interface CubeCoordinate {
  q: number;
  r: number;
  s: number;
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

// Generate a hexagonal map shape
export function generateHexagonalMap(radius: number): CubeCoordinate[] {
  return getHexesInRadius({ q: 0, r: 0, s: 0 }, radius);
}

// Generate a hexagonal map with 5-6 player extension frame
export function generateHexagonalMapWithExtension(radius: number): CubeCoordinate[] {
  const baseHexes = generateHexagonalMap(radius);
  
  // Add the 6 frame tiles for 5-6 player extension
  // These are positioned around the outer edge of the radius-2 hexagon
  const extensionHexes: CubeCoordinate[] = [
    { q: 0, r: -3, s: 3 },   // top
    { q: 3, r: -3, s: 0 },   // top-right
    { q: 3, r: 0, s: -3 },   // bottom-right
    { q: 0, r: 3, s: -3 },   // bottom
    { q: -3, r: 3, s: 0 },   // bottom-left
    { q: -3, r: 0, s: 3 },   // top-left
  ];
  
  return [...baseHexes, ...extensionHexes];
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

// Generate custom map shapes for different scenarios
export function generateIslandMap(centerRadius: number, islandCount: number = 4): CubeCoordinate[] {
  const results: CubeCoordinate[] = [];
  
  // Main island
  const mainIsland = getHexesInRadius({ q: 0, r: 0, s: 0 }, centerRadius);
  results.push(...mainIsland);
  
  // Smaller islands around the main island
  const islandPositions = [
    { q: centerRadius + 3, r: 0, s: -(centerRadius + 3) },
    { q: 0, r: centerRadius + 3, s: -(centerRadius + 3) },
    { q: -(centerRadius + 3), r: 0, s: centerRadius + 3 },
    { q: 0, r: -(centerRadius + 3), s: centerRadius + 3 },
  ];
  
  for (let i = 0; i < Math.min(islandCount, islandPositions.length); i++) {
    const smallIsland = getHexesInRadius(islandPositions[i], 1);
    results.push(...smallIsland);
  }
  
  return results;
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
