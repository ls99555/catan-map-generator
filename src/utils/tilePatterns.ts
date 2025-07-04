// SVG tile patterns for Catan terrain types
export const TILE_PATTERNS = {
  hills: (id: string) => `
    <pattern id="hills-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#D2691E"/>
      <path d="M0 15 Q5 8 10 15 Q15 20 20 15 L20 20 L0 20 Z" fill="#A0522D"/>
      <path d="M0 10 Q5 5 10 10 Q15 15 20 10 L20 15 Q15 20 10 15 Q5 8 0 15 Z" fill="#CD853F"/>
      <path d="M0 5 Q5 0 10 5 Q15 10 20 5 L20 10 Q15 15 10 10 Q5 5 0 10 Z" fill="#F4A460"/>
    </pattern>
  `,
  
  forest: (id: string) => `
    <pattern id="forest-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#228B22"/>
      <path d="M0 15 Q10 8 20 15 L20 20 L0 20 Z" fill="#006400"/>
      <path d="M0 10 Q10 3 20 10 L20 15 Q10 8 0 15 Z" fill="#32CD32"/>
      <path d="M0 5 Q10 -2 20 5 L20 10 Q10 3 0 10 Z" fill="#90EE90"/>
    </pattern>
  `,
  
  pasture: (id: string) => `
    <pattern id="pasture-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#9ACD32"/>
      <path d="M0 15 Q10 10 20 15 L20 20 L0 20 Z" fill="#ADFF2F"/>
      <path d="M0 10 Q10 5 20 10 L20 15 Q10 10 0 15 Z" fill="#7CFC00"/>
      <path d="M0 5 Q10 0 20 5 L20 10 Q10 5 0 10 Z" fill="#CCFF99"/>
    </pattern>
  `,
  
  fields: (id: string) => `
    <pattern id="fields-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#DAA520"/>
      <path d="M0 0 L20 0 L20 5 L0 5 Z" fill="#FFD700"/>
      <path d="M0 5 L20 5 L20 10 L0 10 Z" fill="#FFA500"/>
      <path d="M0 10 L20 10 L20 15 L0 15 Z" fill="#FFD700"/>
      <path d="M0 15 L20 15 L20 20 L0 20 Z" fill="#FFA500"/>
    </pattern>
  `,
  
  mountains: (id: string) => `
    <pattern id="mountains-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#696969"/>
      <path d="M0 20 L5 10 L10 20 Z" fill="#808080"/>
      <path d="M5 20 L10 8 L15 20 Z" fill="#A9A9A9"/>
      <path d="M10 20 L15 12 L20 20 Z" fill="#808080"/>
      <path d="M0 20 L3 15 L6 20 Z" fill="#DCDCDC"/>
      <path d="M14 20 L17 14 L20 20 Z" fill="#DCDCDC"/>
    </pattern>
  `,
  
  desert: (id: string) => `
    <pattern id="desert-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#F4A460"/>
      <path d="M0 15 Q10 10 20 15 L20 20 L0 20 Z" fill="#DEB887"/>
      <path d="M0 10 Q10 5 20 10 L20 15 Q10 10 0 15 Z" fill="#F5DEB3"/>
      <path d="M0 5 Q10 0 20 5 L20 10 Q10 5 0 10 Z" fill="#FAEBD7"/>
    </pattern>
  `,
  
  sea: (id: string) => `
    <pattern id="sea-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#4169E1"/>
      <path d="M0 10 Q5 7 10 10 Q15 13 20 10 L20 20 L0 20 Z" fill="#1E90FF"/>
      <path d="M0 0 Q5 3 10 0 Q15 -3 20 0 L20 10 Q15 13 10 10 Q5 7 0 10 Z" fill="#6495ED"/>
    </pattern>
  `,
  
  gold: (id: string) => `
    <pattern id="gold-${id}" patternUnits="userSpaceOnUse" width="16" height="16">
      <rect width="16" height="16" fill="#FFD700"/>
      <circle cx="8" cy="8" r="6" fill="#FFA500"/>
      <circle cx="8" cy="8" r="4" fill="#FFFF00"/>
      <circle cx="8" cy="8" r="2" fill="#FFD700"/>
      <path d="M4 4 L12 4 L12 12 L4 12 Z" stroke="#FF8C00" stroke-width="1" fill="none"/>
    </pattern>
  `,
  
  fishery: (id: string) => `
    <pattern id="fishery-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#00CED1"/>
      <path d="M0 10 Q5 7 10 10 Q15 13 20 10 L20 20 L0 20 Z" fill="#20B2AA"/>
      <path d="M0 0 Q5 3 10 0 Q15 -3 20 0 L20 10 Q15 13 10 10 Q5 7 0 10 Z" fill="#48D1CC"/>
      <ellipse cx="6" cy="6" rx="2" ry="1" fill="#5F9EA0"/>
      <ellipse cx="14" cy="14" rx="2" ry="1" fill="#5F9EA0"/>
      <ellipse cx="6" cy="14" rx="2" ry="1" fill="#5F9EA0"/>
      <ellipse cx="14" cy="6" rx="2" ry="1" fill="#5F9EA0"/>
    </pattern>
  `,
};

// Generate all pattern definitions
export function generateTilePatterns(): string {
  return Object.entries(TILE_PATTERNS)
    .map(([, patternFn]) => patternFn('default'))
    .join('\n');
}

// Get pattern URL for a terrain type
export function getPatternUrl(terrain: string): string {
  return `url(#${terrain}-default)`;
}
