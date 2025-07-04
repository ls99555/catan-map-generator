import { GameMap, ResourceType, HarborType } from '@/types/game';
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
    const minX = Math.min(...positions.map(p => p.x)) - layout.size * 2;
    const maxX = Math.max(...positions.map(p => p.x)) + layout.size * 2;
    const minY = Math.min(...positions.map(p => p.y)) - layout.size * 2;
    const maxY = Math.max(...positions.map(p => p.y)) + layout.size * 2;
    
    return {
      width: maxX - minX,
      height: maxY - minY,
      minX,
      minY,
    };
  }, [map.hexes, layout]);

  // Resource icons/text
  const resourceIcons: Record<ResourceType, string> = {
    brick: '🧱',
    lumber: '🌲',
    wool: '🐑',
    grain: '🌾',
    ore: '⛰️',
    desert: '🏜️',
    gold: '💰',
    fish: '🐟',
  };

  // Harbor display
  const harborDisplay: Record<HarborType, string> = {
    generic: '3:1',
    brick: '2:1🧱',
    lumber: '2:1🌲',
    wool: '2:1🐑',
    grain: '2:1🌾',
    ore: '2:1⛰️',
  };

  return (
    <div className="w-full overflow-auto bg-blue-50 rounded-lg border border-blue-200">
      <svg
        viewBox={`${minX} ${minY} ${width} ${height}`}
        className="w-full h-auto min-h-[400px] max-h-[600px] max-w-full"
      >
        {/* Define patterns for terrain types */}
        <defs>
          <pattern id="water-pattern" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill="#4169E1" opacity="0.3" />
            <path d="M0,2 Q2,0 4,2 Q2,4 0,2Z" fill="#1E90FF" opacity="0.5" />
          </pattern>
          
          {/* Tile patterns */}
          <g dangerouslySetInnerHTML={{ __html: generateTilePatterns() }} />
        </defs>
        
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
              
              {/* Resource icon */}
              <text
                x={center.x}
                y={center.y - 8}
                textAnchor="middle"
                className="text-lg select-none pointer-events-none"
              >
                {resourceIcons[hex.resource]}
              </text>
              
              {/* Number token */}
              {hex.number && (
                <g>
                  <circle
                    cx={center.x}
                    cy={center.y + 8}
                    r="12"
                    fill={hex.number === 6 || hex.number === 8 ? '#FF6B6B' : '#FFF'}
                    stroke="#2F2F2F"
                    strokeWidth="1"
                  />
                  <text
                    x={center.x}
                    y={center.y + 13}
                    textAnchor="middle"
                    className="text-sm font-bold select-none pointer-events-none"
                    fill={hex.number === 6 || hex.number === 8 ? '#FFF' : '#2F2F2F'}
                  >
                    {hex.number}
                  </text>
                  {/* Probability dots */}
                  {hex.number && (
                    <text
                      x={center.x}
                      y={center.y + 20}
                      textAnchor="middle"
                      className="text-xs select-none pointer-events-none"
                      fill="#666"
                    >
                      {'•'.repeat(6 - Math.abs(hex.number - 7))}
                    </text>
                  )}
                </g>
              )}
              
              {/* Robber */}
              {hex.hasRobber && (
                <g>
                  <circle
                    cx={center.x}
                    cy={center.y - 15}
                    r="8"
                    fill="#2F2F2F"
                    stroke="#FFF"
                    strokeWidth="1"
                  />
                  <text
                    x={center.x}
                    y={center.y - 11}
                    textAnchor="middle"
                    className="text-xs font-bold select-none pointer-events-none"
                    fill="#FFF"
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
                    cy={center.y - 15}
                    r="8"
                    fill="#8B4513"
                    stroke="#FFF"
                    strokeWidth="1"
                  />
                  <text
                    x={center.x}
                    y={center.y - 11}
                    textAnchor="middle"
                    className="text-xs font-bold select-none pointer-events-none"
                    fill="#FFF"
                  >
                    P
                  </text>
                </g>
              )}
              
              {/* Harbor */}
              {hex.harbor && (
                <g>
                  <rect
                    x={center.x - 15}
                    y={center.y + 15}
                    width="30"
                    height="12"
                    fill="#FFF"
                    stroke="#2F2F2F"
                    strokeWidth="1"
                    rx="2"
                  />
                  <text
                    x={center.x}
                    y={center.y + 24}
                    textAnchor="middle"
                    className="text-xs font-bold select-none pointer-events-none"
                    fill="#2F2F2F"
                  >
                    {harborDisplay[hex.harbor]}
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
        
        {/* Legend */}
        <g transform={`translate(${minX + 10}, ${minY + 10})`}>
          <rect
            x="0"
            y="0"
            width="120"
            height="60"
            fill="#FFF"
            stroke="#2F2F2F"
            strokeWidth="1"
            rx="4"
            opacity="0.9"
          />
          <text x="10" y="15" className="text-xs font-bold" fill="#2F2F2F">
            Legend
          </text>
          <text x="10" y="30" className="text-xs" fill="#2F2F2F">
            Red numbers = High probability
          </text>
          <text x="10" y="42" className="text-xs" fill="#2F2F2F">
            Dots = Roll frequency
          </text>
          <text x="10" y="54" className="text-xs" fill="#2F2F2F">
            R = Robber, P = Pirate
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
