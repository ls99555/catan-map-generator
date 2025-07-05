// Test the 5-6 player layout without rotation
function generateBaseGame56Layout() {
  const hexes = [];
  
  // Row 1 (top): 3 tiles - centered
  hexes.push({ q: -1, r: -3, s: 4 });
  hexes.push({ q: 0, r: -3, s: 3 });
  hexes.push({ q: 1, r: -3, s: 2 });
  
  // Row 2: 4 tiles
  hexes.push({ q: -2, r: -2, s: 4 });
  hexes.push({ q: -1, r: -2, s: 3 });
  hexes.push({ q: 0, r: -2, s: 2 });
  hexes.push({ q: 1, r: -2, s: 1 });
  
  // Row 3: 5 tiles
  hexes.push({ q: -2, r: -1, s: 3 });
  hexes.push({ q: -1, r: -1, s: 2 });
  hexes.push({ q: 0, r: -1, s: 1 });
  hexes.push({ q: 1, r: -1, s: 0 });
  hexes.push({ q: 2, r: -1, s: -1 });
  
  // Row 4 (middle): 6 tiles
  hexes.push({ q: -3, r: 0, s: 3 });
  hexes.push({ q: -2, r: 0, s: 2 });
  hexes.push({ q: -1, r: 0, s: 1 });
  hexes.push({ q: 0, r: 0, s: 0 });
  hexes.push({ q: 1, r: 0, s: -1 });
  hexes.push({ q: 2, r: 0, s: -2 });
  
  // Row 5: 5 tiles
  hexes.push({ q: -2, r: 1, s: 1 });
  hexes.push({ q: -1, r: 1, s: 0 });
  hexes.push({ q: 0, r: 1, s: -1 });
  hexes.push({ q: 1, r: 1, s: -2 });
  hexes.push({ q: 2, r: 1, s: -3 });
  
  // Row 6: 4 tiles
  hexes.push({ q: -1, r: 2, s: -1 });
  hexes.push({ q: 0, r: 2, s: -2 });
  hexes.push({ q: 1, r: 2, s: -3 });
  hexes.push({ q: 2, r: 2, s: -4 });
  
  // Row 7 (bottom): 3 tiles - centered
  hexes.push({ q: 0, r: 3, s: -3 });
  hexes.push({ q: 1, r: 3, s: -4 });
  hexes.push({ q: 2, r: 3, s: -5 });
  
  return hexes;
}

const layout = generateBaseGame56Layout();
console.log('Total hexes:', layout.length);

// Group by row and count
const rowCounts = {};
layout.forEach(hex => {
  const row = hex.r;
  rowCounts[row] = (rowCounts[row] || 0) + 1;
});

console.log('Row counts (from top to bottom):');
console.log('Row -3 (top):', rowCounts[-3] || 0);
console.log('Row -2:', rowCounts[-2] || 0);
console.log('Row -1:', rowCounts[-1] || 0);
console.log('Row 0 (middle):', rowCounts[0] || 0);
console.log('Row 1:', rowCounts[1] || 0);
console.log('Row 2:', rowCounts[2] || 0);
console.log('Row 3 (bottom):', rowCounts[3] || 0);

const pattern = [
  rowCounts[-3] || 0,
  rowCounts[-2] || 0,
  rowCounts[-1] || 0,
  rowCounts[0] || 0,
  rowCounts[1] || 0,
  rowCounts[2] || 0,
  rowCounts[3] || 0
];

console.log('Pattern:', pattern);
console.log('Expected: [3, 4, 5, 6, 5, 4, 3]');
console.log('Match:', JSON.stringify(pattern) === JSON.stringify([3, 4, 5, 6, 5, 4, 3]));

// Show cube coordinate validity (q + r + s should equal 0)
console.log('\nCube coordinate validation:');
let validCount = 0;
layout.forEach((hex, i) => {
  const sum = hex.q + hex.r + hex.s;
  if (sum !== 0) {
    console.log(`Invalid hex ${i}: (${hex.q}, ${hex.r}, ${hex.s}) sum=${sum}`);
  } else {
    validCount++;
  }
});
console.log(`Valid hexes: ${validCount}/${layout.length}`);
