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
    size: 35,
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
    // Use the direction angle directly (it's already in degrees)
    const rotationAngle = direction;
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
                  {/* Hex background */}
                  <path
                    d={path}
                    fill={getPatternUrl(hex.terrain)}
                    stroke="#2F2F2F"
                    strokeWidth={isWaterHex ? "1" : "2"}
                    opacity={hex.terrain === 'desert' ? 0.8 : isWaterHex ? 0.7 : 1}
                  />
                  
                  {/* Number token at center (only for land hexes) */}
                  {hex.number && !isWaterHex && (
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

                  {/* Harbor on water hex */}
                  {hex.harbor && isWaterHex && (
                    <g>
                      {(() => {
                        const { x: harborX, y: harborY, direction } = calculateHarborPosition(hex, map.hexes, layout);
                        return createHarborIcon(hex.harbor, harborX, harborY, direction);
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
              <div className={styles.legendText}>
                <div>Hills (Brick) • Forest (Lumber) • Pasture (Wool)</div>
                <div>Fields (Grain) • Mountains (Ore) • Desert (No Resource)</div>
                <div>Water (Harbors) • 5-6 Player Extensions Available</div>
              </div>
            </div>
            
            {/* Harbor Types */}
            <div className={styles.legendSection}>
              <h4>Harbor Types:</h4>
              <div className={styles.legendText}>
                <div>� Generic (3:1 Trade) • 🧱 Brick (2:1) • 🌲 Lumber (2:1)</div>
                <div>🐑 Wool (2:1) • 🌾 Grain (2:1) • ⛰️ Ore (2:1)</div>
                <div>Harbors are placed on water hexes adjacent to land</div>
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
