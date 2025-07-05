import { GameMap, HarborType, Hex } from '@/types/game';
import { 
  cubeToPixel, 
  getHexPath, 
  HexLayout,
  getNeighbors
} from '@/utils/hexGrid';
import { generateTilePatterns, getPatternUrl } from '@/utils/tilePatterns';
import { useMemo } from 'react';
import styles from '../styles/MapRenderer.module.scss';

// Calculate harbor position based on map edge (base game only)
function calculateHarborPosition(hex: Hex, allHexes: Hex[], layout: HexLayout): { x: number; y: number; direction: number } {
  const center = cubeToPixel(hex.position, layout);
  const neighbors = getNeighbors(hex.position);
  
  // Find the direction to place the harbor (base game looks for map edge)
  let harborDirection = 0;
  let targetDirection = { x: 0, y: 0 };
  
  for (let i = 0; i < neighbors.length; i++) {
    const neighborPos = neighbors[i];
    const neighborHex = allHexes.find(h => 
      h.position.q === neighborPos.q && 
      h.position.r === neighborPos.r && 
      h.position.s === neighborPos.s
    );
    
    // For base game: look for map edge (no neighbor hex)
    if (!neighborHex) {
      // Calculate direction towards the missing neighbor
      const edgeCenter = cubeToPixel(neighborPos, layout);
      targetDirection = {
        x: edgeCenter.x - center.x,
        y: edgeCenter.y - center.y
      };
      harborDirection = i;
      break;
    }
  }
  
  // Normalize direction and calculate harbor position
  const length = Math.sqrt(targetDirection.x * targetDirection.x + targetDirection.y * targetDirection.y);
  if (length > 0) {
    targetDirection.x /= length;
    targetDirection.y /= length;
  }
  
  // For flat-top hexes, calculate the position on the hex edge
  // The hex edge is at 86.6% of the hex size from center (cos(30°) * size)
  const hexEdgeDistance = layout.size * 0.866; // cos(30°) for flat-top hex
  const edgeX = center.x + targetDirection.x * hexEdgeDistance;
  const edgeY = center.y + targetDirection.y * hexEdgeDistance;
  
  // Position the harbor so its base sits exactly on the hex edge
  // The harbor base should be ON the edge, not offset from it
  return { x: edgeX, y: edgeY, direction: harborDirection };
}

interface MapRendererProps {
  map: GameMap;
}

export function MapRenderer({ map }: MapRendererProps) {
  const layout: HexLayout = useMemo(() => ({
    size: 35,
    origin: { x: 400, y: 300 },
    orientation: 'pointy' as const,
  }), []);

  // Calculate SVG dimensions based on hex positions with proper margins
  const { width, height, minX, minY, viewBox } = useMemo(() => {
    if (map.hexes.length === 0) return { 
      width: 800, 
      height: 600, 
      minX: 0, 
      minY: 0, 
      viewBox: '0 0 800 600'
    };
    
    const positions = map.hexes.map(hex => cubeToPixel(hex.position, layout));
    const margin = layout.size * 3; // Increased margin for better view
    
    const minX = Math.min(...positions.map(p => p.x)) - margin;
    const maxX = Math.max(...positions.map(p => p.x)) + margin;
    const minY = Math.min(...positions.map(p => p.y)) - margin;
    const maxY = Math.max(...positions.map(p => p.y)) + margin;
    
    const width = maxX - minX;
    const height = maxY - minY;
    const viewBox = `${minX} ${minY} ${width} ${height}`;
    
    return {
      width,
      height,
      minX,
      minY,
      viewBox,
    };
  }, [map.hexes, layout]); // Removed map.expansion and map.scenario as they're not actually used in the calculation

  // Harbor display
  const harborDisplay: Record<HarborType, string> = {
    generic: '3:1',
    brick: '2:1',
    lumber: '2:1',
    wool: '2:1',
    grain: '2:1',
    ore: '2:1',
  };

  // Harbor colors
  const harborColors: Record<HarborType, string> = {
    generic: '#8B4513',
    brick: '#B22222',
    lumber: '#228B22',
    wool: '#F5F5DC',
    grain: '#DAA520',
    ore: '#696969',
  };

  // Create harbor icon based on type
  const createHarborIcon = (type: HarborType, x: number, y: number, direction: number = 0) => {
    const color = harborColors[type];
    // Calculate rotation angle to point toward the sea/edge
    // The harbor should point away from the hex center toward the sea
    const rotationAngle = direction * 60; // 60 degrees per hex edge
    const transform = `rotate(${rotationAngle} ${x} ${y})`;
    
    return (
      <g transform={transform}>
        {/* Harbor building - base positioned at y=0, tip pointing toward negative y */}
        <path
          d={`M ${x - 12} ${y} L ${x - 8} ${y - 16} L ${x + 8} ${y - 16} L ${x + 12} ${y} Z`}
          fill={color}
          stroke="#000"
          strokeWidth="1"
        />
        {/* Roof at the tip */}
        <path
          d={`M ${x - 10} ${y - 16} L ${x} ${y - 23} L ${x + 10} ${y - 16} Z`}
          fill="#8B0000"
          stroke="#000"
          strokeWidth="1"
        />
        {/* Exchange rate in the middle */}
        <rect
          x={x - 8}
          y={y - 11}
          width="16"
          height="8"
          fill="#FFF"
          stroke="#000"
          strokeWidth="1"
          rx="2"
        />                <text
                  x={x}
                  y={y - 6}
                  textAnchor="middle"
                  className={styles.harbor}
                  fill="#000"
                  fontSize="10"
                >
                  {harborDisplay[type]}
                </text>
      </g>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* Map SVG */}
        <div className={styles.mapContainer}>
          <svg
            viewBox={viewBox}
            className={styles.mapSvg}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Define patterns for terrain types */}
            <defs>
              <pattern id="water-pattern" patternUnits="userSpaceOnUse" width="8" height="8">
                <rect width="8" height="8" fill="#4682B4" />
                <path d="M0,4 Q2,2 4,4 Q6,6 8,4" stroke="#5F9EA0" strokeWidth="1" fill="none"/>
                <path d="M0,0 Q2,-2 4,0 Q6,2 8,0" stroke="#87CEEB" strokeWidth="1" fill="none"/>
              </pattern>
              
              {/* Blue sea corners pattern */}
              <pattern id="sea-corner-pattern" patternUnits="userSpaceOnUse" width="12" height="12">
                <rect width="12" height="12" fill="#4169E1" />
                <circle cx="3" cy="3" r="1" fill="#1E90FF" opacity="0.7"/>
                <circle cx="9" cy="9" r="1" fill="#1E90FF" opacity="0.7"/>
                <circle cx="9" cy="3" r="0.5" fill="#87CEEB" opacity="0.5"/>
                <circle cx="3" cy="9" r="0.5" fill="#87CEEB" opacity="0.5"/>
              </pattern>
              
              {/* Tile patterns */}
              <g dangerouslySetInnerHTML={{ __html: generateTilePatterns() }} />
            </defs>
            
            {/* Water background around entire map with blue sea corners */}
            <rect
              x={minX}
              y={minY}
              width={width}
              height={height}
              fill="url(#sea-corner-pattern)"
              opacity="0.8"
            />
            
            {/* Additional water border for cleaner look */}
            <rect
              x={minX + 20}
              y={minY + 20}
              width={width - 40}
              height={height - 40}
              fill="url(#water-pattern)"
              opacity="0.6"
            />
            
            {/* Render hexes */}
            {map.hexes.map((hex) => {
              const center = cubeToPixel(hex.position, layout);
              const path = getHexPath(hex.position, layout);
              
              return (
                <g key={hex.id}>
                  {/* Hex background */}
                  <path
                    d={path}
                    fill={getPatternUrl(hex.terrain)}
                    stroke="#2F2F2F"
                    strokeWidth="2"
                    opacity={hex.terrain === 'desert' ? 0.8 : 1}
                  />
                  
                  {/* Number token at center */}
                  {hex.number && (
                    <g>
                      {/* Number token circle at hex center */}
                      <circle
                        cx={center.x}
                        cy={center.y}
                        r="14"
                        fill={hex.number === 6 || hex.number === 8 ? '#FF6B6B' : '#FFF'}
                        stroke="#2F2F2F"
                        strokeWidth="2"
                      />
                      <text
                        x={center.x}
                        y={center.y + 5}
                        textAnchor="middle"
                        className={styles.numberToken}
                        fill={hex.number === 6 || hex.number === 8 ? '#FFF' : '#2F2F2F'}
                        fontSize="16"
                      >
                        {hex.number}
                      </text>
                      

                    </g>
                  )}

                </g>
              );
            })}
            
            {/* Render harbors on hexes */}
            {map.hexes.filter(hex => hex.harbor).map((hex) => {
              const { x: harborX, y: harborY, direction } = calculateHarborPosition(hex, map.hexes, layout);
              return (
                <g key={`hex-harbor-${hex.id}`}>
                  {createHarborIcon(hex.harbor!, harborX, harborY, direction)}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend Panel */}
        <div className={styles.legendPanel}>
          <h3>Legend</h3>
          
          <div className={styles.legendSections}>
            {/* Terrain Types */}
            <div className={styles.legendSection}>
              <h4>Terrain Types:</h4>
              <div className={styles.legendText}>
                <div>Hills (Brick) • Forest (Lumber) • Pasture (Wool)</div>
                <div>Fields (Grain) • Mountains (Ore) • Desert (No Resource)</div>
              </div>
            </div>
            
            {/* Game Elements */}
            <div className={styles.legendSection}>
              <h4>Game Elements:</h4>
              <div className={styles.legendText}>
                <div>🏠 = Harbor (3:1 or 2:1 trade)</div>
                <div>Harbors positioned towards sea/map edge</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Info */}
      <div className={styles.mapInfo}>
        <div className={styles.mapInfoGrid}>
          <div className={styles.mapInfoItem}>
            <span className={styles.mapInfoLabel}>Expansion:</span>
            <span className={styles.mapInfoValue}>Base Game</span>
          </div>
          <div className={styles.mapInfoItem}>
            <span className={styles.mapInfoLabel}>Players:</span>
            <span className={styles.mapInfoValue}>{map.playerCount}</span>
          </div>
          <div className={styles.mapInfoItem}>
            <span className={styles.mapInfoLabel}>Tiles:</span>
            <span className={styles.mapInfoValue}>{map.hexes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
