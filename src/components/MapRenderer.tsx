import { GameMap, HarborType } from '@/types/game';
import { 
  cubeToPixel, 
  getHexPath, 
  HexLayout
} from '@/utils/hexGrid';
import { generateTilePatterns, getPatternUrl } from '@/utils/tilePatterns';
import { useMemo } from 'react';

interface MapRendererProps {
  map: GameMap;
}

export function MapRenderer({ map }: MapRendererProps) {
  const layout: HexLayout = useMemo(() => ({
    size: 35,
    origin: { x: 400, y: 300 },
    orientation: 'flat' as const,
  }), []);

  // Calculate SVG dimensions based on hex positions
  const { width, height, minX, minY } = useMemo(() => {
    if (map.hexes.length === 0) return { width: 800, height: 600, minX: 0, minY: 0 };
    
    const positions = map.hexes.map(hex => cubeToPixel(hex.position, layout));
    const minX = Math.min(...positions.map(p => p.x)) - layout.size * 2.5;
    const maxX = Math.max(...positions.map(p => p.x)) + layout.size * 2.5;
    const minY = Math.min(...positions.map(p => p.y)) - layout.size * 2.5;
    const maxY = Math.max(...positions.map(p => p.y)) + layout.size * 2.5;
    
    return {
      width: maxX - minX,
      height: maxY - minY,
      minX,
      minY,
    };
  }, [map.hexes, layout]);

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
    const transform = `rotate(${direction * 60} ${x} ${y})`;
    
    return (
      <g transform={transform}>
        {/* Harbor building */}
        <path
          d={`M ${x - 12} ${y + 8} L ${x - 8} ${y - 8} L ${x + 8} ${y - 8} L ${x + 12} ${y + 8} Z`}
          fill={color}
          stroke="#000"
          strokeWidth="1"
        />
        {/* Roof */}
        <path
          d={`M ${x - 10} ${y - 8} L ${x} ${y - 15} L ${x + 10} ${y - 8} Z`}
          fill="#8B0000"
          stroke="#000"
          strokeWidth="1"
        />
        {/* Exchange rate */}
        <rect
          x={x - 8}
          y={y - 3}
          width="16"
          height="8"
          fill="#FFF"
          stroke="#000"
          strokeWidth="1"
          rx="2"
        />
        <text
          x={x}
          y={y + 2}
          textAnchor="middle"
          className="text-xs font-bold select-none pointer-events-none"
          fill="#000"
          fontSize="10"
        >
          {harborDisplay[type]}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full overflow-auto bg-blue-50 rounded-lg border border-blue-200">
      <svg
        viewBox={`${minX} ${minY} ${width} ${height}`}
        className="w-full h-auto min-h-[400px] max-h-[700px] max-w-full"
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
          const isWater = hex.terrain === 'sea' || hex.terrain === 'fishery';
          
          return (
            <g key={hex.id}>
              {/* Hex background */}
              <path
                d={path}
                fill={isWater ? 'url(#water-pattern)' : getPatternUrl(hex.terrain)}
                stroke="#2F2F2F"
                strokeWidth="2"
                opacity={hex.terrain === 'desert' ? 0.8 : 1}
              />
              
              {/* Number token and odds */}
              {hex.number && (
                <g>
                  {/* Number token at top */}
                  <circle
                    cx={center.x}
                    cy={center.y - 10}
                    r="14"
                    fill={hex.number === 6 || hex.number === 8 ? '#FF6B6B' : '#FFF'}
                    stroke="#2F2F2F"
                    strokeWidth="2"
                  />
                  <text
                    x={center.x}
                    y={center.y - 5}
                    textAnchor="middle"
                    className="text-base font-bold select-none pointer-events-none"
                    fill={hex.number === 6 || hex.number === 8 ? '#FFF' : '#2F2F2F'}
                    fontSize="16"
                  >
                    {hex.number}
                  </text>
                  
                  {/* Probability dots at bottom */}
                  <text
                    x={center.x}
                    y={center.y + 20}
                    textAnchor="middle"
                    className="text-sm select-none pointer-events-none"
                    fill="#2F2F2F"
                    fontSize="14"
                  >
                    {'•'.repeat(6 - Math.abs(hex.number - 7))}
                  </text>
                </g>
              )}
              
              {/* Robber */}
              {hex.hasRobber && (
                <g>
                  <circle
                    cx={center.x}
                    cy={center.y + 5}
                    r="10"
                    fill="#2F2F2F"
                    stroke="#FFF"
                    strokeWidth="2"
                  />
                  <text
                    x={center.x}
                    y={center.y + 10}
                    textAnchor="middle"
                    className="text-sm font-bold select-none pointer-events-none"
                    fill="#FFF"
                    fontSize="12"
                  >
                    R
                  </text>
                </g>
              )}
              
              {/* Pirate */}
              {hex.hasPirate && (
                <g>
                  <circle
                    cx={center.x}
                    cy={center.y + 5}
                    r="10"
                    fill="#8B4513"
                    stroke="#FFF"
                    strokeWidth="2"
                  />
                  <text
                    x={center.x}
                    y={center.y + 10}
                    textAnchor="middle"
                    className="text-sm font-bold select-none pointer-events-none"
                    fill="#FFF"
                    fontSize="12"
                  >
                    P
                  </text>
                </g>
              )}
              
              {/* Hex coordinates (for debugging) */}
              {process.env.NODE_ENV === 'development' && (
                <text
                  x={center.x}
                  y={center.y + 35}
                  textAnchor="middle"
                  className="text-xs select-none pointer-events-none opacity-50"
                  fill="#666"
                >
                  {hex.position.q},{hex.position.r}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Render harbors on hexes */}
        {map.hexes.filter(hex => hex.harbor).map((hex) => {
          const center = cubeToPixel(hex.position, layout);
          // Position harbor at edge of hex
          const harborX = center.x + (layout.size * 0.7);
          const harborY = center.y;
          return (
            <g key={`hex-harbor-${hex.id}`}>
              {createHarborIcon(hex.harbor!, harborX, harborY, 0)}
            </g>
          );
        })}
        
        {/* Legend */}
        <g transform={`translate(${minX + 10}, ${minY + 10})`}>
          <rect
            x="0"
            y="0"
            width="200"
            height="120"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="2"
            rx="4"
            opacity="0.95"
          />
          <text x="8" y="15" className="text-xs font-bold" fill="#000000" fontSize="12">
            Legend
          </text>
          
          {/* Tiles */}
          <text x="8" y="28" className="text-xs font-bold" fill="#000000" fontSize="11">
            Tiles:
          </text>
          <text x="8" y="40" className="text-xs" fill="#000000" fontSize="10">
            🏔️ Hills (Brick) • 🌲 Forest (Lumber)
          </text>
          <text x="8" y="52" className="text-xs" fill="#000000" fontSize="10">
            🐑 Pasture (Wool) • 🌾 Fields (Grain)
          </text>
          <text x="8" y="64" className="text-xs" fill="#000000" fontSize="10">
            ⛰️ Mountains (Ore) • 🏜️ Desert (None)
          </text>
          <text x="8" y="76" className="text-xs" fill="#000000" fontSize="10">
            🌊 Sea • 🏺 Gold • 🐟 Fish
          </text>
          
          {/* Numbers */}
          <text x="8" y="92" className="text-xs" fill="#000000" fontSize="11">
            Red numbers = High probability (6,8)
          </text>
          <text x="8" y="104" className="text-xs" fill="#000000" fontSize="11">
            Dots = Roll frequency • R = Robber • P = Pirate
          </text>
          <text x="8" y="116" className="text-xs" fill="#000000" fontSize="11">
            🏠 = Harbor (3:1 or 2:1 trade)
          </text>
        </g>
      </svg>
      
      {/* Map Info */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Expansion:</span> {map.expansion.replace('-', ' & ')}
          </div>
          <div>
            <span className="font-medium">Players:</span> {map.playerCount}
          </div>
          {map.scenario && (
            <div>
              <span className="font-medium">Scenario:</span> {map.scenario.replace('-', ' ')}
            </div>
          )}
          <div>
            <span className="font-medium">Tiles:</span> {map.hexes.length}
          </div>
        </div>
      </div>
    </div>
  );
}
