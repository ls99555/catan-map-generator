// SVG tile patterns for Catan terrain types
export const TILE_PATTERNS = {
  hills: (id: string) => `
    <pattern id="hills-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#E74C3C"/>
      <!-- Enhanced brick pattern -->
      <rect x="0" y="0" width="10" height="4" fill="#C0392B" stroke="#A93226" stroke-width="0.5"/>
      <rect x="10" y="0" width="10" height="4" fill="#DC143C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="0" y="4" width="10" height="4" fill="#E74C3C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="10" y="4" width="10" height="4" fill="#C0392B" stroke="#A93226" stroke-width="0.5"/>
      <rect x="0" y="8" width="10" height="4" fill="#DC143C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="10" y="8" width="10" height="4" fill="#E74C3C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="0" y="12" width="10" height="4" fill="#C0392B" stroke="#A93226" stroke-width="0.5"/>
      <rect x="10" y="12" width="10" height="4" fill="#DC143C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="0" y="16" width="10" height="4" fill="#E74C3C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="10" y="16" width="10" height="4" fill="#C0392B" stroke="#A93226" stroke-width="0.5"/>
      <!-- Offset pattern for realistic brick look -->
      <rect x="-5" y="2" width="10" height="4" fill="#CB4335" stroke="#A93226" stroke-width="0.5"/>
      <rect x="5" y="2" width="10" height="4" fill="#B03A2E" stroke="#A93226" stroke-width="0.5"/>
      <rect x="15" y="2" width="10" height="4" fill="#CB4335" stroke="#A93226" stroke-width="0.5"/>
      <rect x="-5" y="6" width="10" height="4" fill="#DC143C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="5" y="6" width="10" height="4" fill="#CB4335" stroke="#A93226" stroke-width="0.5"/>
      <rect x="15" y="6" width="10" height="4" fill="#DC143C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="-5" y="10" width="10" height="4" fill="#B03A2E" stroke="#A93226" stroke-width="0.5"/>
      <rect x="5" y="10" width="10" height="4" fill="#DC143C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="15" y="10" width="10" height="4" fill="#B03A2E" stroke="#A93226" stroke-width="0.5"/>
      <rect x="-5" y="14" width="10" height="4" fill="#CB4335" stroke="#A93226" stroke-width="0.5"/>
      <rect x="5" y="14" width="10" height="4" fill="#B03A2E" stroke="#A93226" stroke-width="0.5"/>
      <rect x="15" y="14" width="10" height="4" fill="#CB4335" stroke="#A93226" stroke-width="0.5"/>
      <rect x="-5" y="18" width="10" height="4" fill="#DC143C" stroke="#A93226" stroke-width="0.5"/>
      <rect x="5" y="18" width="10" height="4" fill="#CB4335" stroke="#A93226" stroke-width="0.5"/>
      <rect x="15" y="18" width="10" height="4" fill="#DC143C" stroke="#A93226" stroke-width="0.5"/>
    </pattern>
  `,
  
  forest: (id: string) => `
    <pattern id="forest-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#8B4513"/>
      <!-- Tree trunks - darker brown -->
      <rect x="3" y="12" width="2" height="6" fill="#3E2723"/>
      <rect x="8" y="11" width="2" height="7" fill="#3E2723"/>
      <rect x="13" y="13" width="2" height="5" fill="#3E2723"/>
      <rect x="17" y="10" width="2" height="8" fill="#3E2723"/>
      <!-- Tree canopies - darker green -->
      <circle cx="4" cy="10" r="3" fill="#1B5E20"/>
      <circle cx="9" cy="9" r="3.5" fill="#2E7D32"/>
      <circle cx="14" cy="11" r="3" fill="#1B5E20"/>
      <circle cx="18" cy="8" r="3" fill="#388E3C"/>
      <!-- Forest floor - brown -->
      <path d="M0 16 Q5 14 10 16 Q15 18 20 16 L20 20 L0 20 Z" fill="#5D4037"/>
      <!-- Leaves scattered -->
      <circle cx="6" cy="15" r="0.5" fill="#2E7D32"/>
      <circle cx="11" cy="17" r="0.5" fill="#4CAF50"/>
      <circle cx="16" cy="14" r="0.5" fill="#388E3C"/>
      <circle cx="2" cy="18" r="0.5" fill="#1B5E20"/>
    </pattern>
  `,
  
  pasture: (id: string) => `
    <pattern id="pasture-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#ECEFF1"/>
      <!-- Rolling pasture hills - lighter/whiter -->
      <path d="M0 12 Q5 8 10 12 Q15 16 20 12 L20 20 L0 20 Z" fill="#F5F5F5"/>
      <path d="M0 8 Q5 4 10 8 Q15 12 20 8 L20 12 Q15 16 10 12 Q5 8 0 12 Z" fill="#E8F5E8"/>
      <!-- Grass tufts -->
      <path d="M2 16 L2 12 L3 12 L3 16" stroke="#4CAF50" stroke-width="1"/>
      <path d="M4 17 L4 13 L5 13 L5 17" stroke="#4CAF50" stroke-width="1"/>
      <path d="M7 15 L7 11 L8 11 L8 15" stroke="#4CAF50" stroke-width="1"/>
      <path d="M9 18 L9 14 L10 14 L10 18" stroke="#4CAF50" stroke-width="1"/>
      <path d="M12 16 L12 12 L13 12 L13 16" stroke="#4CAF50" stroke-width="1"/>
      <path d="M15 17 L15 13 L16 13 L16 17" stroke="#4CAF50" stroke-width="1"/>
      <path d="M18 15 L18 11 L19 11 L19 15" stroke="#4CAF50" stroke-width="1"/>
      <!-- Sheep wool areas -->
      <circle cx="5" cy="6" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="15" cy="7" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="10" cy="10" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="3" cy="9" r="1" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="17" cy="5" r="1" fill="#FFFFFF" opacity="0.8"/>
    </pattern>
  `,
  
  fields: (id: string) => `
    <pattern id="fields-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#9ACD32"/>
      <!-- Field background - bright green field -->
      <rect x="0" y="0" width="20" height="20" fill="#7CB342"/>
      <!-- Plowed field furrows -->
      <path d="M0 2 L20 2" stroke="#6A9F3E" stroke-width="1"/>
      <path d="M0 5 L20 5" stroke="#6A9F3E" stroke-width="1"/>
      <path d="M0 8 L20 8" stroke="#6A9F3E" stroke-width="1"/>
      <path d="M0 11 L20 11" stroke="#6A9F3E" stroke-width="1"/>
      <path d="M0 14 L20 14" stroke="#6A9F3E" stroke-width="1"/>
      <path d="M0 17 L20 17" stroke="#6A9F3E" stroke-width="1"/>
      <!-- Wheat stalks - golden -->
      <path d="M2 18 L2 10 Q2 8 3 8 Q4 8 4 10 L4 18" stroke="#FFD700" stroke-width="1" fill="none"/>
      <path d="M5 18 L5 9 Q5 7 6 7 Q7 7 7 9 L7 18" stroke="#FFD700" stroke-width="1" fill="none"/>
      <path d="M8 18 L8 11 Q8 9 9 9 Q10 9 10 11 L10 18" stroke="#FFD700" stroke-width="1" fill="none"/>
      <path d="M11 18 L11 10 Q11 8 12 8 Q13 8 13 10 L13 18" stroke="#FFD700" stroke-width="1" fill="none"/>
      <path d="M14 18 L14 9 Q14 7 15 7 Q16 7 16 9 L16 18" stroke="#FFD700" stroke-width="1" fill="none"/>
      <path d="M17 18 L17 11 Q17 9 18 9 Q19 9 19 11 L19 18" stroke="#FFD700" stroke-width="1" fill="none"/>
      <!-- Wheat heads - golden grain -->
      <ellipse cx="3" cy="7" rx="1.5" ry="2" fill="#FFD700"/>
      <ellipse cx="6" cy="6" rx="1.5" ry="2" fill="#FFA500"/>
      <ellipse cx="9" cy="8" rx="1.5" ry="2" fill="#FFD700"/>
      <ellipse cx="12" cy="7" rx="1.5" ry="2" fill="#FFA500"/>
      <ellipse cx="15" cy="6" rx="1.5" ry="2" fill="#FFD700"/>
      <ellipse cx="18" cy="8" rx="1.5" ry="2" fill="#FFA500"/>
      <!-- Farm elements -->
      <circle cx="1" cy="1" r="0.5" fill="#8B4513"/>
      <circle cx="19" cy="19" r="0.5" fill="#8B4513"/>
      <circle cx="4" cy="19" r="0.5" fill="#8B4513"/>
      <circle cx="16" cy="1" r="0.5" fill="#8B4513"/>
    </pattern>
  `,
  
  mountains: (id: string) => `
    <pattern id="mountains-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#607D8B"/>
      <!-- Mountain peaks - more realistic -->
      <path d="M0 20 L3 8 L6 20 Z" fill="#546E7A"/>
      <path d="M4 20 L8 4 L12 20 Z" fill="#78909C"/>
      <path d="M10 20 L14 6 L18 20 Z" fill="#546E7A"/>
      <path d="M16 20 L20 10 L24 20 Z" fill="#607D8B"/>
      <!-- Snow caps -->
      <path d="M8 4 L6 8 L10 8 Z" fill="#FFFFFF"/>
      <path d="M3 8 L1 12 L5 12 Z" fill="#FFFFFF"/>
      <path d="M14 6 L12 10 L16 10 Z" fill="#FFFFFF"/>
      <path d="M20 10 L18 14 L22 14 Z" fill="#FFFFFF"/>
      <!-- Rock texture -->
      <path d="M2 16 L4 12 L6 16 Z" fill="#90A4AE"/>
      <path d="M6 18 L8 14 L10 18 Z" fill="#90A4AE"/>
      <path d="M10 16 L12 12 L14 16 Z" fill="#90A4AE"/>
      <path d="M14 18 L16 14 L18 18 Z" fill="#90A4AE"/>
      <!-- Ore veins - blue/metallic -->
      <path d="M3 16 Q5 14 7 16" stroke="#1976D2" stroke-width="1.5" opacity="0.8"/>
      <path d="M9 18 Q11 16 13 18" stroke="#1976D2" stroke-width="1.5" opacity="0.8"/>
      <path d="M15 16 Q17 14 19 16" stroke="#1976D2" stroke-width="1.5" opacity="0.8"/>
      <!-- Metallic gleam -->
      <circle cx="5" cy="15" r="1" fill="#E3F2FD" opacity="0.9"/>
      <circle cx="11" cy="17" r="1" fill="#E3F2FD" opacity="0.9"/>
      <circle cx="17" cy="15" r="1" fill="#E3F2FD" opacity="0.9"/>
      <circle cx="7" cy="13" r="0.5" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="13" cy="15" r="0.5" fill="#FFFFFF" opacity="0.9"/>
    </pattern>
  `,
  
  desert: (id: string) => `
    <pattern id="desert-${id}" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#F4A460"/>
      <!-- Sand dunes -->
      <path d="M0 14 Q5 10 10 14 Q15 18 20 14 L20 20 L0 20 Z" fill="#DEB887"/>
      <path d="M0 10 Q5 6 10 10 Q15 14 20 10 L20 14 Q15 18 10 14 Q5 10 0 14 Z" fill="#F5DEB3"/>
      <path d="M0 6 Q5 2 10 6 Q15 10 20 6 L20 10 Q15 14 10 10 Q5 6 0 10 Z" fill="#FAEBD7"/>
      <!-- Sand ripples -->
      <path d="M0 16 Q5 14 10 16 Q15 18 20 16" stroke="#CD853F" stroke-width="1" opacity="0.4"/>
      <path d="M0 12 Q5 10 10 12 Q15 14 20 12" stroke="#CD853F" stroke-width="1" opacity="0.4"/>
      <path d="M0 8 Q5 6 10 8 Q15 10 20 8" stroke="#CD853F" stroke-width="1" opacity="0.4"/>
      <path d="M0 4 Q5 2 10 4 Q15 6 20 4" stroke="#CD853F" stroke-width="1" opacity="0.4"/>
      <!-- Small dunes -->
      <ellipse cx="4" cy="16" rx="2" ry="1" fill="#DEB887" opacity="0.6"/>
      <ellipse cx="12" cy="18" rx="3" ry="1.5" fill="#DEB887" opacity="0.6"/>
      <ellipse cx="17" cy="15" rx="1.5" ry="1" fill="#DEB887" opacity="0.6"/>
      <!-- Sand particles -->
      <circle cx="3" cy="12" r="0.5" fill="#CD853F" opacity="0.5"/>
      <circle cx="8" cy="14" r="0.5" fill="#CD853F" opacity="0.5"/>
      <circle cx="14" cy="11" r="0.5" fill="#CD853F" opacity="0.5"/>
      <circle cx="18" cy="13" r="0.5" fill="#CD853F" opacity="0.5"/>
      <circle cx="6" cy="8" r="0.5" fill="#CD853F" opacity="0.5"/>
      <circle cx="16" cy="9" r="0.5" fill="#CD853F" opacity="0.5"/>
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
  
  water: (id: string) => `
    <pattern id="water-${id}" patternUnits="userSpaceOnUse" width="24" height="24">
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
      <circle cx="12" cy="8" r="0.8" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="16" cy="16" r="0.6" fill="#F0F8FF" opacity="0.6"/>
      <circle cx="20" cy="12" r="0.7" fill="#F0F8FF" opacity="0.6"/>
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
