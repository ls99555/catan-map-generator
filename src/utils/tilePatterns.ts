// SVG tile patterns for Catan terrain types
export const TILE_PATTERNS = {
  hills: (id: string) => `
    <pattern id="hills-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#8B4513"/>
      <path d="M0 10 Q5 5 10 10 Q15 15 20 10 L20 20 L0 20 Z" fill="#A0522D"/>
      <path d="M0 0 Q5 5 10 0 Q15 -5 20 0 L20 10 Q15 15 10 10 Q5 5 0 10 Z" fill="#CD853F"/>
    </pattern>
  `,
  
  forest: (id: string) => `
    <pattern id="forest-${id}" patternUnits="userSpaceOnUse" width="16" height="16">
      <rect width="16" height="16" fill="#228B22"/>
      <circle cx="4" cy="4" r="2" fill="#32CD32"/>
      <circle cx="12" cy="4" r="2" fill="#32CD32"/>
      <circle cx="8" cy="8" r="2" fill="#32CD32"/>
      <circle cx="4" cy="12" r="2" fill="#32CD32"/>
      <circle cx="12" cy="12" r="2" fill="#32CD32"/>
      <path d="M0 14 Q8 10 16 14 L16 16 L0 16 Z" fill="#006400"/>
    </pattern>
  `,
  
  pasture: (id: string) => `
    <pattern id="pasture-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#9ACD32"/>
      <path d="M0 12 Q6 8 12 12 Q18 16 24 12 L24 24 L0 24 Z" fill="#ADFF2F"/>
      <circle cx="6" cy="6" r="1" fill="#7CFC00"/>
      <circle cx="18" cy="6" r="1" fill="#7CFC00"/>
      <circle cx="12" cy="18" r="1" fill="#7CFC00"/>
      <path d="M4 20 Q8 16 12 20 Q16 24 20 20" stroke="#7CFC00" stroke-width="1" fill="none"/>
    </pattern>
  `,
  
  fields: (id: string) => `
    <pattern id="fields-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#DAA520"/>
      <path d="M0 5 L20 5 M0 10 L20 10 M0 15 L20 15" stroke="#FFD700" stroke-width="1"/>
      <path d="M5 0 L5 20 M10 0 L10 20 M15 0 L15 20" stroke="#FFD700" stroke-width="1"/>
      <circle cx="7" cy="7" r="1" fill="#FFA500"/>
      <circle cx="13" cy="13" r="1" fill="#FFA500"/>
      <circle cx="7" cy="13" r="1" fill="#FFA500"/>
      <circle cx="13" cy="7" r="1" fill="#FFA500"/>
    </pattern>
  `,
  
  mountains: (id: string) => `
    <pattern id="mountains-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#696969"/>
      <path d="M0 24 L6 12 L12 24 Z" fill="#808080"/>
      <path d="M12 24 L18 8 L24 24 Z" fill="#808080"/>
      <path d="M0 24 L4 18 L8 24 Z" fill="#A9A9A9"/>
      <path d="M16 24 L20 16 L24 24 Z" fill="#A9A9A9"/>
      <circle cx="6" cy="18" r="1" fill="#C0C0C0"/>
      <circle cx="18" cy="14" r="1" fill="#C0C0C0"/>
    </pattern>
  `,
  
  desert: (id: string) => `
    <pattern id="desert-${id}" patternUnits="userSpaceOnUse" width="18" height="18">
      <rect width="18" height="18" fill="#F4A460"/>
      <path d="M0 9 Q4.5 6 9 9 Q13.5 12 18 9 L18 18 L0 18 Z" fill="#DEB887"/>
      <path d="M0 0 Q4.5 3 9 0 Q13.5 -3 18 0 L18 9 Q13.5 12 9 9 Q4.5 6 0 9 Z" fill="#F5DEB3"/>
      <circle cx="5" cy="5" r="0.5" fill="#D2691E"/>
      <circle cx="13" cy="5" r="0.5" fill="#D2691E"/>
      <circle cx="9" cy="13" r="0.5" fill="#D2691E"/>
      <circle cx="3" cy="15" r="0.5" fill="#D2691E"/>
      <circle cx="15" cy="15" r="0.5" fill="#D2691E"/>
    </pattern>
  `,
  
  sea: (id: string) => `
    <pattern id="sea-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#4169E1"/>
      <path d="M0 10 Q5 7 10 10 Q15 13 20 10 L20 20 L0 20 Z" fill="#1E90FF"/>
      <path d="M0 0 Q5 3 10 0 Q15 -3 20 0 L20 10 Q15 13 10 10 Q5 7 0 10 Z" fill="#6495ED"/>
      <circle cx="7" cy="7" r="1" fill="#87CEEB" opacity="0.7"/>
      <circle cx="13" cy="13" r="1" fill="#87CEEB" opacity="0.7"/>
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
