// SVG tile patterns for Catan terrain types
export const TILE_PATTERNS = {
  hills: (id: string) => `
    <pattern id="hills-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#D2691E"/>
      <!-- Rolling hills background -->
      <path d="M0 18 Q6 12 12 18 Q18 24 24 18 L24 24 L0 24 Z" fill="#A0522D"/>
      <path d="M0 12 Q6 6 12 12 Q18 18 24 12 L24 18 Q18 24 12 18 Q6 12 0 18 Z" fill="#CD853F"/>
      <path d="M0 6 Q6 0 12 6 Q18 12 24 6 L24 12 Q18 18 12 12 Q6 6 0 12 Z" fill="#F4A460"/>
      <!-- Brick-like texture -->
      <rect x="2" y="2" width="8" height="4" fill="#B22222" opacity="0.7"/>
      <rect x="12" y="2" width="8" height="4" fill="#B22222" opacity="0.7"/>
      <rect x="2" y="8" width="8" height="4" fill="#CD5C5C" opacity="0.7"/>
      <rect x="12" y="8" width="8" height="4" fill="#CD5C5C" opacity="0.7"/>
      <rect x="2" y="14" width="8" height="4" fill="#B22222" opacity="0.7"/>
      <rect x="12" y="14" width="8" height="4" fill="#B22222" opacity="0.7"/>
      <!-- Mortar lines -->
      <path d="M0 6 L24 6 M0 12 L24 12 M0 18 L24 18" stroke="#8B4513" stroke-width="1" opacity="0.5"/>
      <path d="M10 0 L10 6 M10 12 L10 18 M10 24 L10 24" stroke="#8B4513" stroke-width="1" opacity="0.5"/>
      <path d="M20 6 L20 12 M20 18 L20 24" stroke="#8B4513" stroke-width="1" opacity="0.5"/>
    </pattern>
  `,
  
  forest: (id: string) => `
    <pattern id="forest-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#228B22"/>
      <!-- Forest floor -->
      <path d="M0 18 Q12 12 24 18 L24 24 L0 24 Z" fill="#006400"/>
      <path d="M0 12 Q12 6 24 12 L24 18 Q12 12 0 18 Z" fill="#32CD32"/>
      <path d="M0 6 Q12 0 24 6 L24 12 Q12 6 0 12 Z" fill="#90EE90"/>
      <!-- Tree trunks -->
      <rect x="4" y="16" width="2" height="8" fill="#8B4513"/>
      <rect x="10" y="14" width="2" height="10" fill="#8B4513"/>
      <rect x="16" y="15" width="2" height="9" fill="#8B4513"/>
      <rect x="20" y="17" width="2" height="7" fill="#8B4513"/>
      <!-- Tree canopies -->
      <circle cx="5" cy="14" r="4" fill="#228B22"/>
      <circle cx="11" cy="12" r="5" fill="#006400"/>
      <circle cx="17" cy="13" r="4" fill="#32CD32"/>
      <circle cx="21" cy="15" r="3" fill="#228B22"/>
      <!-- Wood grain effect -->
      <path d="M4 16 Q5 18 4 20 Q5 22 4 24" stroke="#654321" stroke-width="0.5" opacity="0.7"/>
      <path d="M10 14 Q11 16 10 18 Q11 20 10 22 Q11 23 10 24" stroke="#654321" stroke-width="0.5" opacity="0.7"/>
      <path d="M16 15 Q17 17 16 19 Q17 21 16 23" stroke="#654321" stroke-width="0.5" opacity="0.7"/>
      <path d="M20 17 Q21 19 20 21 Q21 22 20 24" stroke="#654321" stroke-width="0.5" opacity="0.7"/>
    </pattern>
  `,
  
  pasture: (id: string) => `
    <pattern id="pasture-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#9ACD32"/>
      <!-- Rolling pasture -->
      <path d="M0 18 Q12 12 24 18 L24 24 L0 24 Z" fill="#ADFF2F"/>
      <path d="M0 12 Q12 6 24 12 L24 18 Q12 12 0 18 Z" fill="#7CFC00"/>
      <path d="M0 6 Q12 0 24 6 L24 12 Q12 6 0 12 Z" fill="#CCFF99"/>
      <!-- Grass tufts -->
      <path d="M2 22 L2 18 L3 18 L3 22 M4 22 L4 19 L5 19 L5 22" stroke="#228B22" stroke-width="1" opacity="0.8"/>
      <path d="M8 20 L8 16 L9 16 L9 20 M10 20 L10 17 L11 17 L11 20" stroke="#228B22" stroke-width="1" opacity="0.8"/>
      <path d="M14 21 L14 17 L15 17 L15 21 M16 21 L16 18 L17 18 L17 21" stroke="#228B22" stroke-width="1" opacity="0.8"/>
      <path d="M20 19 L20 15 L21 15 L21 19 M22 19 L22 16 L23 16 L23 19" stroke="#228B22" stroke-width="1" opacity="0.8"/>
      <!-- Wool-like texture -->
      <circle cx="6" cy="8" r="2" fill="#F0F8FF" opacity="0.4"/>
      <circle cx="18" cy="10" r="2" fill="#F0F8FF" opacity="0.4"/>
      <circle cx="12" cy="14" r="2" fill="#F0F8FF" opacity="0.4"/>
      <circle cx="4" cy="12" r="1.5" fill="#F0F8FF" opacity="0.4"/>
      <circle cx="20" cy="6" r="1.5" fill="#F0F8FF" opacity="0.4"/>
    </pattern>
  `,
  
  fields: (id: string) => `
    <pattern id="fields-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#DAA520"/>
      <!-- Wheat rows -->
      <path d="M0 0 L24 0 L24 4 L0 4 Z" fill="#FFD700"/>
      <path d="M0 4 L24 4 L24 8 L0 8 Z" fill="#FFA500"/>
      <path d="M0 8 L24 8 L24 12 L0 12 Z" fill="#FFD700"/>
      <path d="M0 12 L24 12 L24 16 L0 16 Z" fill="#FFA500"/>
      <path d="M0 16 L24 16 L24 20 L0 20 Z" fill="#FFD700"/>
      <path d="M0 20 L24 20 L24 24 L0 24 Z" fill="#FFA500"/>
      <!-- Wheat stalks -->
      <path d="M2 24 L2 20 Q2 18 3 18 Q4 18 4 20 L4 24" stroke="#B8860B" stroke-width="1" opacity="0.8"/>
      <path d="M6 24 L6 20 Q6 18 7 18 Q8 18 8 20 L8 24" stroke="#B8860B" stroke-width="1" opacity="0.8"/>
      <path d="M10 24 L10 20 Q10 18 11 18 Q12 18 12 20 L12 24" stroke="#B8860B" stroke-width="1" opacity="0.8"/>
      <path d="M14 24 L14 20 Q14 18 15 18 Q16 18 16 20 L16 24" stroke="#B8860B" stroke-width="1" opacity="0.8"/>
      <path d="M18 24 L18 20 Q18 18 19 18 Q20 18 20 20 L20 24" stroke="#B8860B" stroke-width="1" opacity="0.8"/>
      <path d="M22 24 L22 20 Q22 18 23 18 Q24 18 24 20 L24 24" stroke="#B8860B" stroke-width="1" opacity="0.8"/>
      <!-- Grain heads -->
      <ellipse cx="3" cy="17" rx="1" ry="3" fill="#DAA520"/>
      <ellipse cx="7" cy="17" rx="1" ry="3" fill="#DAA520"/>
      <ellipse cx="11" cy="17" rx="1" ry="3" fill="#DAA520"/>
      <ellipse cx="15" cy="17" rx="1" ry="3" fill="#DAA520"/>
      <ellipse cx="19" cy="17" rx="1" ry="3" fill="#DAA520"/>
      <ellipse cx="23" cy="17" rx="1" ry="3" fill="#DAA520"/>
    </pattern>
  `,
  
  mountains: (id: string) => `
    <pattern id="mountains-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#696969"/>
      <!-- Mountain peaks -->
      <path d="M0 24 L4 8 L8 24 Z" fill="#808080"/>
      <path d="M6 24 L12 4 L18 24 Z" fill="#A9A9A9"/>
      <path d="M16 24 L20 10 L24 24 Z" fill="#808080"/>
      <!-- Snow caps -->
      <path d="M4 8 L2 12 L6 12 Z" fill="#F0F8FF"/>
      <path d="M12 4 L10 8 L14 8 Z" fill="#F0F8FF"/>
      <path d="M20 10 L18 14 L22 14 Z" fill="#F0F8FF"/>
      <!-- Rock texture -->
      <path d="M2 20 L4 16 L6 20 Z" fill="#DCDCDC"/>
      <path d="M8 18 L10 14 L12 18 Z" fill="#DCDCDC"/>
      <path d="M14 22 L16 18 L18 22 Z" fill="#DCDCDC"/>
      <path d="M18 16 L20 12 L22 16 Z" fill="#DCDCDC"/>
      <!-- Ore veins -->
      <path d="M3 20 Q5 18 7 20" stroke="#4169E1" stroke-width="1" opacity="0.6"/>
      <path d="M10 22 Q12 20 14 22" stroke="#4169E1" stroke-width="1" opacity="0.6"/>
      <path d="M17 18 Q19 16 21 18" stroke="#4169E1" stroke-width="1" opacity="0.6"/>
      <!-- Metallic gleam -->
      <circle cx="5" cy="19" r="1" fill="#C0C0C0" opacity="0.7"/>
      <circle cx="12" cy="21" r="1" fill="#C0C0C0" opacity="0.7"/>
      <circle cx="19" cy="17" r="1" fill="#C0C0C0" opacity="0.7"/>
    </pattern>
  `,
  
  desert: (id: string) => `
    <pattern id="desert-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#F4A460"/>
      <!-- Sand dunes -->
      <path d="M0 18 Q12 12 24 18 L24 24 L0 24 Z" fill="#DEB887"/>
      <path d="M0 12 Q12 6 24 12 L24 18 Q12 12 0 18 Z" fill="#F5DEB3"/>
      <path d="M0 6 Q12 0 24 6 L24 12 Q12 6 0 12 Z" fill="#FAEBD7"/>
      <!-- Sand ripples -->
      <path d="M0 20 Q6 18 12 20 Q18 22 24 20" stroke="#CD853F" stroke-width="1" opacity="0.3"/>
      <path d="M0 16 Q6 14 12 16 Q18 18 24 16" stroke="#CD853F" stroke-width="1" opacity="0.3"/>
      <path d="M0 10 Q6 8 12 10 Q18 12 24 10" stroke="#CD853F" stroke-width="1" opacity="0.3"/>
      <path d="M0 4 Q6 2 12 4 Q18 6 24 4" stroke="#CD853F" stroke-width="1" opacity="0.3"/>
      <!-- Cactus silhouettes -->
      <rect x="4" y="16" width="2" height="6" fill="#228B22" opacity="0.4"/>
      <rect x="3" y="18" width="4" height="1" fill="#228B22" opacity="0.4"/>
      <rect x="18" y="14" width="2" height="8" fill="#228B22" opacity="0.4"/>
      <rect x="17" y="16" width="4" height="1" fill="#228B22" opacity="0.4"/>
      <!-- Rock formations -->
      <circle cx="10" cy="20" r="2" fill="#A0522D" opacity="0.5"/>
      <circle cx="14" cy="18" r="1.5" fill="#A0522D" opacity="0.5"/>
      <circle cx="20" cy="22" r="1" fill="#A0522D" opacity="0.5"/>
    </pattern>
  `,
  
  sea: (id: string) => `
    <pattern id="sea-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#4169E1"/>
      <!-- Ocean waves -->
      <path d="M0 12 Q6 8 12 12 Q18 16 24 12 L24 24 L0 24 Z" fill="#1E90FF"/>
      <path d="M0 0 Q6 4 12 0 Q18 -4 24 0 L24 12 Q18 16 12 12 Q6 8 0 12 Z" fill="#6495ED"/>
      <!-- Wave crests -->
      <path d="M0 12 Q6 8 12 12 Q18 16 24 12" stroke="#87CEEB" stroke-width="2" opacity="0.7"/>
      <path d="M0 6 Q6 2 12 6 Q18 10 24 6" stroke="#87CEEB" stroke-width="2" opacity="0.7"/>
      <path d="M0 18 Q6 14 12 18 Q18 22 24 18" stroke="#87CEEB" stroke-width="2" opacity="0.7"/>
      <!-- Water foam -->
      <circle cx="4" cy="10" r="1" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="8" cy="14" r="0.5" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="16" cy="8" r="0.5" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="20" cy="16" r="1" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="12" cy="20" r="0.5" fill="#F0F8FF" opacity="0.6"/>
      <!-- Ship silhouette -->
      <path d="M10 4 L14 4 L15 6 L9 6 Z" fill="#8B4513" opacity="0.3"/>
      <path d="M12 2 L12 6" stroke="#8B4513" stroke-width="1" opacity="0.3"/>
    </pattern>
  `,
  
  gold: (id: string) => `
    <pattern id="gold-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#FFD700"/>
      <!-- Gold veins -->
      <path d="M0 10 Q10 5 20 10 L20 20 L0 20 Z" fill="#FFA500"/>
      <path d="M0 0 Q10 -5 20 0 L20 10 Q10 5 0 10 Z" fill="#FFFF00"/>
      <!-- Gold nuggets -->
      <circle cx="5" cy="5" r="2" fill="#FFD700" stroke="#FF8C00" stroke-width="1"/>
      <circle cx="15" cy="7" r="1.5" fill="#FFD700" stroke="#FF8C00" stroke-width="1"/>
      <circle cx="8" cy="15" r="2.5" fill="#FFD700" stroke="#FF8C00" stroke-width="1"/>
      <circle cx="16" cy="16" r="1" fill="#FFD700" stroke="#FF8C00" stroke-width="1"/>
      <!-- Sparkle effect -->
      <path d="M5 3 L5 7 M3 5 L7 5" stroke="#FFFF00" stroke-width="1" opacity="0.8"/>
      <path d="M15 5 L15 9 M13 7 L17 7" stroke="#FFFF00" stroke-width="1" opacity="0.8"/>
      <path d="M8 12 L8 18 M5 15 L11 15" stroke="#FFFF00" stroke-width="1" opacity="0.8"/>
      <path d="M16 14 L16 18 M14 16 L18 16" stroke="#FFFF00" stroke-width="1" opacity="0.8"/>
      <!-- Treasure chest -->
      <rect x="12" y="12" width="6" height="4" fill="#8B4513" opacity="0.5"/>
      <rect x="12" y="12" width="6" height="1" fill="#FFD700" opacity="0.8"/>
    </pattern>
  `,
  
  fishery: (id: string) => `
    <pattern id="fishery-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
      <rect width="24" height="24" fill="#00CED1"/>
      <!-- Ocean currents -->
      <path d="M0 12 Q6 8 12 12 Q18 16 24 12 L24 24 L0 24 Z" fill="#20B2AA"/>
      <path d="M0 0 Q6 4 12 0 Q18 -4 24 0 L24 12 Q18 16 12 12 Q6 8 0 12 Z" fill="#48D1CC"/>
      <!-- Schools of fish -->
      <ellipse cx="4" cy="8" rx="2" ry="1" fill="#5F9EA0" opacity="0.8"/>
      <ellipse cx="8" cy="6" rx="1.5" ry="0.8" fill="#5F9EA0" opacity="0.8"/>
      <ellipse cx="12" cy="10" rx="2" ry="1" fill="#5F9EA0" opacity="0.8"/>
      <ellipse cx="16" cy="14" rx="1.5" ry="0.8" fill="#5F9EA0" opacity="0.8"/>
      <ellipse cx="20" cy="8" rx="2" ry="1" fill="#5F9EA0" opacity="0.8"/>
      <ellipse cx="6" cy="18" rx="1.5" ry="0.8" fill="#5F9EA0" opacity="0.8"/>
      <ellipse cx="18" cy="20" rx="2" ry="1" fill="#5F9EA0" opacity="0.8"/>
      <!-- Fish details -->
      <ellipse cx="4" cy="8" rx="1" ry="0.5" fill="#4682B4"/>
      <ellipse cx="12" cy="10" rx="1" ry="0.5" fill="#4682B4"/>
      <ellipse cx="20" cy="8" rx="1" ry="0.5" fill="#4682B4"/>
      <ellipse cx="18" cy="20" rx="1" ry="0.5" fill="#4682B4"/>
      <!-- Fishing nets -->
      <path d="M0 16 L4 16 L4 20 L0 20 Z M2 16 L2 20 M0 18 L4 18" stroke="#8B4513" stroke-width="0.5" opacity="0.4"/>
      <path d="M16 4 L20 4 L20 8 L16 8 Z M18 4 L18 8 M16 6 L20 6" stroke="#8B4513" stroke-width="0.5" opacity="0.4"/>
      <!-- Water bubbles -->
      <circle cx="10" cy="4" r="0.5" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="14" cy="6" r="0.3" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="8" cy="16" r="0.4" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="22" cy="12" r="0.5" fill="#F0F8FF" opacity="0.6"/>
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
