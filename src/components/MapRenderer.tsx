import { GameMap, HarborType, Hex, GameConfiguration, PlayerCount } from '@/types/game';
import { 
  cubeToPixel, 
  getHexPath, 
  HexLayout
} from '@/utils/hexGrid';
import { generateTilePatterns, getPatternUrl } from '@/utils/tilePatterns';
import { EXPANSION_CONFIGS } from '@/config/expansions/index';
import { Button } from './Button';
import { useMemo, useRef, useState, useEffect } from 'react';
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
  config: GameConfiguration;
  onChange: (config: GameConfiguration) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function MapRenderer({ map, config, onChange, onGenerate, isGenerating }: MapRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [containerHeight, setContainerHeight] = useState(600);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate hex positions and map dimensions
  const hexPositions = map.hexes.map(hex => hex.position);
  const minQ = Math.min(...hexPositions.map(h => h.q));
  const maxQ = Math.max(...hexPositions.map(h => h.q));
  const minR = Math.min(...hexPositions.map(h => h.r));
  const maxR = Math.max(...hexPositions.map(h => h.r));
  
  // Calculate how many hexes wide and tall the map is
  const mapWidthInHexes = maxQ - minQ + 1;
  const mapHeightInHexes = maxR - minR + 1;
  
  // For pointy-top hexes, calculate dimensions
  const padding = 32; // Reduced padding for mobile
  const availableWidth = containerWidth - padding;
  const availableHeight = containerHeight - padding;
  const hexWidthRatio = Math.sqrt(3); // width/size ratio for pointy-top hex
  const hexHeightRatio = 2; // height/size ratio for pointy-top hex
  
  // Calculate optimal hex size based on both width and height constraints
  const hexSizeByWidth = availableWidth / (mapWidthInHexes * hexWidthRatio);
  const hexSizeByHeight = availableHeight / (mapHeightInHexes * hexHeightRatio * 0.75);
  
  // Use the smaller of the two to ensure it fits, but set minimum for readability
  const calculatedHexSize = Math.min(hexSizeByWidth, hexSizeByHeight);
  
  // Set responsive minimums - larger minimum on mobile for better readability
  let minHexSize;
  if (containerWidth < 480) {
    minHexSize = 60; // Small mobile
  } else if (containerWidth < 768) {
    minHexSize = 80; // Large mobile/tablet
  } else {
    minHexSize = 40; // Desktop - can be smaller since screen is bigger
  }
  
  const optimalHexSize = Math.max(calculatedHexSize, minHexSize);

  // Layout for viewBox calculation (smaller, for consistent viewport)
  const viewBoxLayout: HexLayout = useMemo(() => ({
    size: 60, // Smaller fixed size for viewBox calculation
    origin: { x: 0, y: 0 }, // Origin at 0,0 for easier centering
    orientation: 'pointy' as const,
  }), []);

  // Calculate responsive sizes for circles and text based on hex size
  const circleRadius = Math.max(optimalHexSize * 0.16, 20); // Scale with hex size, minimum 20
  
  // Font size: make it scale more predictably across screen sizes
  let fontSizeRatio;
  if (containerWidth < 480) {
    fontSizeRatio = 0.12; // 12% on small mobile - bigger for readability
  } else if (containerWidth < 768) {
    fontSizeRatio = 0.10; // 10% on large mobile/tablet
  } else if (containerWidth < 1200) {
    fontSizeRatio = 0.12; // 12% on small desktop
  } else {
    fontSizeRatio = 0.14; // 14% on large desktop - bigger numbers
  }
  
  const fontSize = Math.max(optimalHexSize * fontSizeRatio, 12); // Minimum 12px
  const strokeWidth = Math.max(optimalHexSize * 0.02, 2); // Scale with hex size, minimum 2

  // Control handlers for the generation options
  const handlePlayerCountChange = (playerCount: PlayerCount) => {
    onChange({
      ...config,
      rules: {
        ...config.rules,
        playerCount,
      },
    });
  };

  const handleRuleChange = (rule: string, value: boolean) => {
    onChange({
      ...config,
      rules: {
        ...config.rules,
        [rule]: value,
      },
    });
  };

  const currentExpansion = EXPANSION_CONFIGS['base'];
  const extensionConfig = EXPANSION_CONFIGS['base-5-6'];
  
  // Combine supported player counts from both base and extension configs
  const baseSupportedCounts = currentExpansion?.supportedPlayerCounts || [3, 4];
  const extensionSupportedCounts = extensionConfig?.supportedPlayerCounts || [];
  const allSupportedPlayerCounts = [...baseSupportedCounts, ...extensionSupportedCounts];

  // Check if using 5-6 player extension
  const isUsingExtension = config.rules.playerCount > 4;
  const requires56Extension = isUsingExtension;

  // Layout for actual hex rendering (calculated optimal size)
  const layout: HexLayout = useMemo(() => ({
    size: optimalHexSize, // Calculated hex size to fit container
    origin: { x: 0, y: 0 }, // Origin at 0,0 for easier centering
    orientation: 'pointy' as const,
  }), [optimalHexSize]);

  // Calculate SVG dimensions based on hex positions with proper margins
  const { viewBox } = useMemo(() => {
    if (map.hexes.length === 0) return { 
      viewBox: '0 0 400 300' // Smaller default viewBox when no hexes
    };
    
    // Calculate positions for both layouts
    const viewBoxPositions = map.hexes.map(hex => cubeToPixel(hex.position, viewBoxLayout));
    const renderPositions = map.hexes.map(hex => cubeToPixel(hex.position, layout));
    
    // Calculate bounds for viewBox layout
    const margin = viewBoxLayout.size * 2;
    const minX = Math.min(...viewBoxPositions.map(p => p.x)) - margin;
    const maxX = Math.max(...viewBoxPositions.map(p => p.x)) + margin;
    const minY = Math.min(...viewBoxPositions.map(p => p.y)) - margin;
    const maxY = Math.max(...viewBoxPositions.map(p => p.y)) + margin;
    
    const width = maxX - minX;
    const height = maxY - minY;
    
    // Center the viewBox properly
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const viewBoxX = centerX - width / 2;
    const viewBoxY = centerY - height / 2;
    
    const viewBox = `${viewBoxX} ${viewBoxY} ${width} ${height}`;
    
    return {
      viewBox
    };
  }, [map.hexes, viewBoxLayout, layout]);

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
    grain: '#FFE066', // Light yellow for grain
    ore: '#607D8B', // Matching mountains color (blue-gray)
  };

  // Create harbor icon based on type - now round
  const createHarborIcon = (type: HarborType, x: number, y: number) => {
    const radius = circleRadius; // Use responsive circle radius
    
    if (type === 'generic') {
      // Generic harbor: all black circle with white question mark
      return (
        <g>
          <circle
            cx={x}
            cy={y}
            r={radius}
            fill="#000000"
            stroke="#000000"
            strokeWidth={strokeWidth}
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={fontSize} // Use responsive font size
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
            strokeWidth={strokeWidth}
          />
          {/* Inner accent ring for better visibility */}
          <circle
            cx={x}
            cy={y}
            r={radius - strokeWidth}
            fill="none"
            stroke="#FFF"
            strokeWidth={Math.max(strokeWidth - 1, 1)}
            opacity="0.3"
          />
        </g>
      );
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
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
                        r={circleRadius} // Responsive circle radius
                        fill={hex.number === 6 || hex.number === 8 ? '#FF6B6B' : '#FFF'}
                        stroke="#2F2F2F"
                        strokeWidth={strokeWidth} // Responsive stroke width
                      />
                      <text
                        x={center.x}
                        y={center.y}
                        textAnchor="middle"
                        className={styles.numberToken}
                        fill={hex.number === 6 || hex.number === 8 ? '#FFF' : '#2F2F2F'}
                        fontSize={fontSize} // Responsive font size
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
                        r={circleRadius} // Responsive circle radius
                        fill="#8B4513"
                        stroke="#654321"
                        strokeWidth={strokeWidth} // Responsive stroke width
                        opacity="0.8"
                      />
                      <text
                        x={center.x}
                        y={center.y}
                        textAnchor="middle"
                        className={styles.desertText}
                        fontSize={fontSize} // Responsive font size
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
          <h3>Map Generator</h3>
          
          <div className={styles.legendSections}>
            {/* Generation Controls */}
            <div className={styles.legendSection}>
              <h4>Player Count:</h4>
              <div className={styles.playerCountGrid}>
                {allSupportedPlayerCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => handlePlayerCountChange(count)}
                    className={`${styles.playerCountButton} ${
                      config.rules.playerCount === count ? styles.selected : ''
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              
              {requires56Extension && (
                <div className={styles.extensionNotice}>
                  <span>5-6 Player Extension Required</span>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className={styles.legendSection}>
              <Button
                onClick={onGenerate}
                disabled={isGenerating}
                className={styles.generateButton}
              >
                {isGenerating ? 'Generating...' : 'Generate New Map'}
              </Button>
            </div>

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
