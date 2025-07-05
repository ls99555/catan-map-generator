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

// Generate frame piece coordinates that form a hexagonal border around the map
export function generateFramePieces(): CubeCoordinate[] {
  // Get the base game layout to determine the actual edge tiles
  const baseGameTiles = generateBaseGameLayout();
  
  // Find the outermost tiles in each direction
  const edgeTiles = [
    baseGameTiles.find(tile => tile.q === 2 && tile.r === -2), // Top-right edge
    baseGameTiles.find(tile => tile.q === 2 && tile.r === 0),  // Bottom-right edge
    baseGameTiles.find(tile => tile.q === 0 && tile.r === 2),  // Bottom edge
    baseGameTiles.find(tile => tile.q === -2 && tile.r === 2), // Bottom-left edge
    baseGameTiles.find(tile => tile.q === -2 && tile.r === 0), // Top-left edge
    baseGameTiles.find(tile => tile.q === 0 && tile.r === -2), // Top edge
  ];
  
  // Frame pieces are positioned one step outward from each edge tile
  const framePieces: CubeCoordinate[] = [];
  
  // Top-right frame (next to top-right edge tile)
  if (edgeTiles[0]) {
    framePieces.push({ q: edgeTiles[0].q + 1, r: edgeTiles[0].r, s: edgeTiles[0].s - 1 });
  }
  
  // Bottom-right frame (next to bottom-right edge tile)
  if (edgeTiles[1]) {
    framePieces.push({ q: edgeTiles[1].q, r: edgeTiles[1].r + 1, s: edgeTiles[1].s - 1 });
  }
  
  // Bottom frame (next to bottom edge tile)
  if (edgeTiles[2]) {
    framePieces.push({ q: edgeTiles[2].q - 1, r: edgeTiles[2].r + 1, s: edgeTiles[2].s });
  }
  
  // Bottom-left frame (next to bottom-left edge tile)
  if (edgeTiles[3]) {
    framePieces.push({ q: edgeTiles[3].q - 1, r: edgeTiles[3].r, s: edgeTiles[3].s + 1 });
  }
  
  // Top-left frame (next to top-left edge tile)
  if (edgeTiles[4]) {
    framePieces.push({ q: edgeTiles[4].q, r: edgeTiles[4].r - 1, s: edgeTiles[4].s + 1 });
  }
  
  // Top frame (next to top edge tile)
  if (edgeTiles[5]) {
    framePieces.push({ q: edgeTiles[5].q + 1, r: edgeTiles[5].r - 1, s: edgeTiles[5].s });
  }
  
  return framePieces.filter(piece => piece != null);
}

// Generate the base game 5-6 player layout (uses all 30 tiles from config)
export function generateBaseGame56Layout(): CubeCoordinate[] {
  // For 5-6 players, we need to accommodate 30 tiles
  // This uses a larger hexagonal pattern to fit all tiles
  return generateHexagonalMap(2.5); // Slightly larger radius to fit 30 tiles
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

// Generate SVG path for a frame piece (interlocking border segment)
export function getFramePath(position: CubeCoordinate, layout: HexLayout): string {
  // Frame pieces form a complete hexagonal border around the entire map
  // They are positioned to touch the outer vertices of the outermost land tiles
  const mapCenter = cubeToPixel({ q: 0, r: 0, s: 0 }, layout);
  const size = layout.size;
  
  const { q, r } = position;
  
  // Determine which side of the hexagon this frame piece represents
  let sideIndex = 0;
  if (q === 3 && r === -2) sideIndex = 0;      // Top-right side
  else if (q === 2 && r === 1) sideIndex = 1;  // Bottom-right side
  else if (q === -1 && r === 3) sideIndex = 2; // Bottom side
  else if (q === -3 && r === 2) sideIndex = 3; // Bottom-left side
  else if (q === -2 && r === -1) sideIndex = 4; // Top-left side
  else if (q === 1 && r === -3) sideIndex = 5; // Top side
  
  // Calculate the frame border distances from map center
  // For pointy-top hexes, we need the frame to be pushed out by 1/2 tile from the outer edges
  // The distance from map center to outer tile centers is: 2 * size * sqrt(3)
  // The distance from tile center to hex edge (not vertex) is: size * sqrt(3) / 2
  // Additional 1/2 tile push: size * sqrt(3) / 2
  const mapCenterToOuterTileCenter = 2 * size * Math.sqrt(3);
  const tileCenterToEdge = size * Math.sqrt(3) / 2;
  const frameSpacing = size * Math.sqrt(3) / 2; // 1/2 tile spacing
  const innerRadius = mapCenterToOuterTileCenter + tileCenterToEdge + frameSpacing;
  const outerRadius = innerRadius + size * 0.5; // Frame thickness
  
  // For pointy-top hexagons, the vertices are at the points (30°, 90°, 150°, 210°, 270°, 330°)
  const vertexAngles = Array.from({ length: 6 }, (_, i) => (i * 60 + 30) * Math.PI / 180);
  
  // Calculate all vertices of the inner and outer hexagons
  const innerVertices = vertexAngles.map(angle => ({
    x: mapCenter.x + innerRadius * Math.cos(angle),
    y: mapCenter.y + innerRadius * Math.sin(angle)
  }));
  
  const outerVertices = vertexAngles.map(angle => ({
    x: mapCenter.x + outerRadius * Math.cos(angle),
    y: mapCenter.y + outerRadius * Math.sin(angle)
  }));
  
  // Get the vertices for this specific frame piece
  const nextSide = (sideIndex + 1) % 6;
  
  const innerStart = innerVertices[sideIndex];
  const innerEnd = innerVertices[nextSide];
  const outerStart = outerVertices[sideIndex];
  const outerEnd = outerVertices[nextSide];
  
  // Create the frame piece as a trapezoid with straight edges
  // This ensures perfect interlocking between adjacent pieces
  return `M ${innerStart.x} ${innerStart.y} 
          L ${outerStart.x} ${outerStart.y}
          L ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          Z`;
}
