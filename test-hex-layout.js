// Test the hexagonal layout coordinates
const coordinates = [
  // Row 0: 3 hexes
  { q: -1, r: -3, s: 4 }, { q: 0, r: -3, s: 3 }, { q: 1, r: -3, s: 2 },
  // Row 1: 4 hexes
  { q: -1, r: -2, s: 3 }, { q: 0, r: -2, s: 2 }, { q: 1, r: -2, s: 1 }, { q: 2, r: -2, s: 0 },
  // Row 2: 5 hexes
  { q: -2, r: -1, s: 3 }, { q: -1, r: -1, s: 2 }, { q: 0, r: -1, s: 1 }, { q: 1, r: -1, s: 0 }, { q: 2, r: -1, s: -1 },
  // Row 3: 6 hexes (center)
  { q: -2, r: 0, s: 2 }, { q: -1, r: 0, s: 1 }, { q: 0, r: 0, s: 0 }, { q: 1, r: 0, s: -1 }, { q: 2, r: 0, s: -2 }, { q: 3, r: 0, s: -3 },
  // Row 4: 5 hexes
  { q: -2, r: 1, s: 1 }, { q: -1, r: 1, s: 0 }, { q: 0, r: 1, s: -1 }, { q: 1, r: 1, s: -2 }, { q: 2, r: 1, s: -3 },
  // Row 5: 4 hexes
  { q: -2, r: 2, s: 0 }, { q: -1, r: 2, s: -1 }, { q: 0, r: 2, s: -2 }, { q: 1, r: 2, s: -3 },
  // Row 6: 3 hexes
  { q: -1, r: 3, s: -2 }, { q: 0, r: 3, s: -3 }, { q: 1, r: 3, s: -4 }
];

console.log('Total coordinates:', coordinates.length);

// Verify cube coordinate constraint (q + r + s = 0)
const invalidCoords = coordinates.filter(coord => coord.q + coord.r + coord.s !== 0);
if (invalidCoords.length > 0) {
  console.log('Invalid coordinates (q+r+s ≠ 0):', invalidCoords);
} else {
  console.log('✓ All coordinates are valid cube coordinates');
}

// Group by row and analyze centering
const rows = {};
coordinates.forEach(coord => {
  if (!rows[coord.r]) rows[coord.r] = [];
  rows[coord.r].push(coord);
});

console.log('\nRow analysis:');
Object.keys(rows).sort((a, b) => parseInt(a) - parseInt(b)).forEach(r => {
  const row = rows[r];
  row.sort((a, b) => a.q - b.q);
  const qValues = row.map(c => c.q);
  const minQ = Math.min(...qValues);
  const maxQ = Math.max(...qValues);
  const center = (minQ + maxQ) / 2;
  console.log(`Row ${r}: ${row.length} hexes, q range: [${minQ}, ${maxQ}], center: ${center}`);
});

// Check if it forms a proper hexagon (center row should be at r=0)
const centerRow = rows[0];
if (centerRow && centerRow.length === 6) {
  console.log('\n✓ Center row (r=0) has 6 hexes');
  const centerHex = centerRow.find(coord => coord.q === 0 && coord.r === 0 && coord.s === 0);
  if (centerHex) {
    console.log('✓ Origin hex (0,0,0) is at the center');
  } else {
    console.log('✗ Origin hex (0,0,0) not found in center row');
  }
} else {
  console.log('\n✗ Center row issue');
}

// Calculate visual positions (simplified flat-top hex layout)
console.log('\nVisual layout preview:');
const hexSize = 1;
const positions = coordinates.map(coord => ({
  ...coord,
  x: hexSize * (3/2 * coord.q),
  y: hexSize * (Math.sqrt(3)/2 * coord.q + Math.sqrt(3) * coord.r)
}));

// Find bounds
const minX = Math.min(...positions.map(p => p.x));
const maxX = Math.max(...positions.map(p => p.x));
const minY = Math.min(...positions.map(p => p.y));
const maxY = Math.max(...positions.map(p => p.y));

console.log(`X bounds: [${minX.toFixed(2)}, ${maxX.toFixed(2)}], center: ${((minX + maxX) / 2).toFixed(2)}`);
console.log(`Y bounds: [${minY.toFixed(2)}, ${maxY.toFixed(2)}], center: ${((minY + maxY) / 2).toFixed(2)}`);

// Check if the layout is centered around (0,0)
const centerX = (minX + maxX) / 2;
const centerY = (minY + maxY) / 2;
console.log(`Layout center: (${centerX.toFixed(2)}, ${centerY.toFixed(2)})`);

if (Math.abs(centerX) < 0.1 && Math.abs(centerY) < 0.1) {
  console.log('✓ Layout is centered around origin');
} else {
  console.log('✗ Layout is NOT centered around origin');
}
