import { GameMap, HarborType, Hex } from '@/types/game';
import { 
  cubeToPixel, 
  getHexPath, 
  HexLayout
} from '@/utils/hexGrid';
import { generateTilePatterns, getPatternUrl } from '@/utils/tilePatterns';
import { useMemo } from 'react';
import styles from '../styles/MapRenderer.module.scss';

// Calculate harbor position for water hexes (base game only)
function calculateHarborPosition(waterHex: Hex, allHexes: Hex[], layout: HexLayout): { x: number; y: number; direction: number } {
  const center = cubeToPixel(waterHex.position, layout);
  
  // Use icon offset if provided, otherwise default to bottom center
  const iconOffset = waterHex.iconOffset || { x: 0, y: 0.5 };
  
  // Calculate harbor position using icon offset
  const harborX = center.x + (iconOffset.x * layout.size);
  const harborY = center.y + (iconOffset.y * layout.size);
  
  // Calculate direction from water hex to land hex for base orientation
  let direction = 0;
  if (waterHex.adjacentLand) {
    const landCenter = cubeToPixel(waterHex.adjacentLand, layout);
    
    // Calculate direction from water hex to land hex for orientation
    const directionVector = {
      x: landCenter.x - center.x,
      y: landCenter.y - center.y
    };
    
    // Calculate angle for harbor orientation (point towards land)
    direction = Math.atan2(directionVector.y, directionVector.x) * 180 / Math.PI;
  }
  
  // Add manual rotation if specified
  if (waterHex.iconRotation) {
    direction += waterHex.iconRotation;
  }
  
  return { x: harborX, y: harborY, direction };
}

interface MapRendererProps {
  map: GameMap;
}

export function MapRenderer({ map }: MapRendererProps) {
  const layout: HexLayout = useMemo(() => ({
    size: 150, // Even larger hex size
    origin: { x: 400, y: 300 },
    orientation: 'pointy' as const,
  }), []);

  // Calculate SVG dimensions based on hex positions with proper margins
  const { viewBox } = useMemo(() => {
    if (map.hexes.length === 0) return { 
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
      viewBox
    };
  }, [map.hexes, layout]); // Removed map.expansion and map.scenario as they're not actually used in the calculation

  // Create mini hex for legend
  const createMiniHex = (terrain: string, size: number = 20) => {
    const hexPath = `M ${size/2} 0 L ${size*0.866} ${size/4} L ${size*0.866} ${size*0.75} L ${size/2} ${size} L ${size*0.134} ${size*0.75} L ${size*0.134} ${size/4} Z`;
    
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.miniHex}>
        <defs dangerouslySetInnerHTML={{ __html: generateTilePatterns() }} />
        <path
          d={hexPath}
          fill={getPatternUrl(terrain)}
          stroke="#2F2F2F"
          strokeWidth="1"
        />
      </svg>
    );
  };

  // Create mini harbor icon for legend
  const createMiniHarborIcon = (type: HarborType, size: number = 16) => {
    const radius = size / 2;
    
    if (type === 'generic') {
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.miniHarbor}>
          <circle
            cx={radius}
            cy={radius}
            r={radius - 1}
            fill="#000000"
            stroke="#FFF"
            strokeWidth="1"
          />
          <text
            x={radius}
            y={radius}
            textAnchor="middle"
            fontSize="10"
            fill="#FFFFFF"
            dominantBaseline="central"
            fontWeight="bold"
          >
            ?
          </text>
        </svg>
      );
    } else {
      const color = harborColors[type];
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.miniHarbor}>
          <circle
            cx={radius}
            cy={radius}
            r={radius - 1}
            fill={color}
            stroke="#000"
            strokeWidth="1"
          />
        </svg>
      );
    }
  };

  // Harbor colors - matching tile colors for consistency
  const harborColors: Record<HarborType, string> = {
    generic: '#000000', // Black for generic with white question mark
    brick: '#E74C3C', // Matching brick/hills color
    lumber: '#8B4513', // Matching forest color (dark brown)
    wool: '#8BC34A', // Matching updated pasture color (light green)
    grain: '#cbd5e1', // Light slate to represent grain
    ore: '#607D8B', // Matching mountains color (blue-gray)
  };

  // Create harbor icon based on type - now round
  const createHarborIcon = (type: HarborType, x: number, y: number) => {
    const radius = 28; // Even larger harbor icons
    
    if (type === 'generic') {
      // Generic harbor: black circle with white question mark
      return (
        <g>
          <circle
            cx={x}
            cy={y}
            r={radius}
            fill="#000000"
            stroke="#FFF"
            strokeWidth="4"
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="26"
            fill="#FFFFFF"
            dominantBaseline="central"
            fontWeight="bold"
          >
            ?
          </text>
        </g>
      );
    } else {
      // Resource harbors: use same background as their hexes
      const color = harborColors[type];
      return (
        <g>
          <circle
            cx={x}
            cy={y}
            r={radius}
            fill={color}
            stroke="#000"
            strokeWidth="4"
          />
          {/* Inner accent ring for better visibility */}
          <circle
            cx={x}
            cy={y}
            r={radius - 4}
            fill="none"
            stroke="#FFF"
            strokeWidth="3"
            opacity="0.3"
          />
        </g>
      );
    }
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
              {/* Tile patterns */}
              <g dangerouslySetInnerHTML={{ __html: generateTilePatterns() }} />
            </defs>
            
            {/* Render hexes */}
            {map.hexes.map((hex) => {
              const center = cubeToPixel(hex.position, layout);
              const path = getHexPath(hex.position, layout);
              
              // Determine if this is a water hex
              const isWaterHex = hex.terrain === 'water';
              
              return (
                <g key={hex.id}>
                  {/* Hex background - invisible for water hexes, patterns for land hexes */}
                  {!isWaterHex && (
                    <path
                      d={path}
                      fill={getPatternUrl(hex.terrain)}
                      stroke="#2F2F2F"
                      strokeWidth="2"
                      opacity={hex.terrain === 'desert' ? 0.9 : 1}
                    />
                  )}

                  {/* Number token at center (only for land hexes) */}
                  {hex.number && !isWaterHex && (
                    <g>
                      {/* Number token circle at hex center */}
                      <circle
                        cx={center.x}
                        cy={center.y}
                        r="32"
                        fill={hex.number === 6 || hex.number === 8 ? '#FF6B6B' : '#FFF'}
                        stroke="#2F2F2F"
                        strokeWidth="4"
                      />
                      <text
                        x={center.x}
                        y={center.y}
                        textAnchor="middle"
                        className={styles.numberToken}
                        fill={hex.number === 6 || hex.number === 8 ? '#FFF' : '#2F2F2F'}
                        fontSize="26"
                        dominantBaseline="central"
                      >
                        {hex.number}
                      </text>
                    </g>
                  )}

                  {/* Desert robber - only on ONE desert hex (first one found) */}
                  {hex.terrain === 'desert' && hex.id === map.hexes.find(h => h.terrain === 'desert')?.id && (
                    <g>
                      {/* Desert robber */}
                      <circle
                        cx={center.x}
                        cy={center.y}
                        r="22"
                        fill="#8B4513"
                        stroke="#654321"
                        strokeWidth="4"
                        opacity="0.8"
                      />
                      <text
                        x={center.x}
                        y={center.y}
                        textAnchor="middle"
                        className={styles.desertText}
                        fontSize="18"
                        fill="#FFF"
                        dominantBaseline="central"
                      >
                        R
                      </text>
                    </g>
                  )}

                  {/* Harbor on water hex */}
                  {hex.harbor && isWaterHex && (
                    <g>
                      {(() => {
                        const { x: harborX, y: harborY } = calculateHarborPosition(hex, map.hexes, layout);
                        return createHarborIcon(hex.harbor, harborX, harborY);
                      })()}
                    </g>
                  )}
                </g>
              );
            })}
            
            {/* Background water pattern removed since we now have water hexes */}
          </svg>
        </div>

        {/* Legend Panel */}
        <div className={styles.legendPanel}>
          <h3>Legend</h3>
          
          <div className={styles.legendSections}>
            {/* Terrain Types */}
            <div className={styles.legendSection}>
              <h4>Terrain Types:</h4>
              <div className={styles.terrainGrid}>
                <div className={styles.terrainItem}>
                  {createMiniHex('hills')}
                  <span>Hills (Brick)</span>
                </div>
                <div className={styles.terrainItem}>
                  {createMiniHex('forest')}
                  <span>Forest (Lumber)</span>
                </div>
                <div className={styles.terrainItem}>
                  {createMiniHex('pasture')}
                  <span>Pasture (Wool)</span>
                </div>
                <div className={styles.terrainItem}>
                  {createMiniHex('fields')}
                  <span>Fields (Grain)</span>
                </div>
                <div className={styles.terrainItem}>
                  {createMiniHex('mountains')}
                  <span>Mountains (Ore)</span>
                </div>
                <div className={styles.terrainItem}>
                  {createMiniHex('desert')}
                  <span>Desert (Robber)</span>
                </div>
              </div>
            </div>
            
            {/* Harbor Types */}
            <div className={styles.legendSection}>
              <h4>Harbor Types:</h4>
              <div className={styles.harborGrid}>
                <div className={styles.harborItem}>
                  {createMiniHarborIcon('generic')}
                  <span>Generic (3:1)</span>
                </div>
                <div className={styles.harborItem}>
                  {createMiniHarborIcon('brick')}
                  <span>Brick (2:1)</span>
                </div>
                <div className={styles.harborItem}>
                  {createMiniHarborIcon('lumber')}
                  <span>Lumber (2:1)</span>
                </div>
                <div className={styles.harborItem}>
                  {createMiniHarborIcon('wool')}
                  <span>Wool (2:1)</span>
                </div>
                <div className={styles.harborItem}>
                  {createMiniHarborIcon('grain')}
                  <span>Grain (2:1)</span>
                </div>
                <div className={styles.harborItem}>
                  {createMiniHarborIcon('ore')}
                  <span>Ore (2:1)</span>
                </div>
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
            <span className={styles.mapInfoLabel}>Land Tiles:</span>
            <span className={styles.mapInfoValue}>{map.hexes.filter(hex => hex.terrain !== 'water').length}</span>
          </div>
          <div className={styles.mapInfoItem}>
            <span className={styles.mapInfoLabel}>Harbors:</span>
            <span className={styles.mapInfoValue}>{map.hexes.filter(hex => hex.harbor).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
