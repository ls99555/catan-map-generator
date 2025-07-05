// Test script to debug the 5-6 player layout generation

function getHexesInRadius(center, radius) {
  const results = [];
  
  for (let q = -radius; q <= radius; q++) {
    for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
      const s = -q - r;
      results.push({ 
        q: center.q + q, 
        r: center.r + r, 
        s: center.s + s 
      });
    }
  }
  
  return results;
}

// Current implementation
function generateBaseGame56Layout() {
  const allHexes = getHexesInRadius({ q: 0, r: 0, s: 0 }, 3);
  
  // Filter to create the exact [3, 4, 5, 6, 5, 4, 3] pattern (30 tiles total)
  const filteredHexes = allHexes.filter(hex => {
    const { q, r } = hex;
    
    // Remove the single hexes at the very top and bottom (rows -3 and 3)
    if (r === -3 || r === 3) return false;
    
    // Remove specific corner hexes to shape the pattern correctly
    // Row -2: keep 4 tiles (remove corners: q=-3 and q=3)
    if (r === -2 && (q === -3 || q === 3)) return false;
    
    // Row -1: keep 5 tiles (remove corners: q=-3 and q=3) 
    if (r === -1 && (q === -3 || q === 3)) return false;
    
    // Row 0: keep 6 tiles (remove outer edges: q=-3 and q=3)
    if (r === 0 && (q === -3 || q === 3)) return false;
    
    // Row 1: keep 5 tiles (remove corners: q=-3 and q=3)
    if (r === 1 && (q === -3 || q === 3)) return false;
    
    // Row 2: keep 4 tiles (remove corners: q=-3 and q=3)
    if (r === 2 && (q === -3 || q === 3)) return false;
    
    return true;
  });
  
  // Apply the same rotation as the base game to get proper vertical orientation
  const rotatedHexes = filteredHexes.map(hex => ({
    q: -hex.r,
    r: -hex.s,
    s: -hex.q
  }));
  
  return rotatedHexes;
}

// Test current implementation
const currentResult = generateBaseGame56Layout();
console.log('Current result:');
console.log('Total hexes:', currentResult.length);

// Group by rows and count
const rowCounts = {};
currentResult.forEach(hex => {
  const row = hex.r;
  if (!rowCounts[row]) rowCounts[row] = 0;
  rowCounts[row]++;
});

// Sort by row and display
const sortedRows = Object.keys(rowCounts).sort((a, b) => parseInt(a) - parseInt(b));
console.log('Row counts:', sortedRows.map(row => `${row}: ${rowCounts[row]}`));
console.log('Pattern:', sortedRows.map(row => rowCounts[row]));

// Let's also check the filtering before rotation
console.log('\nBefore rotation:');
const allHexes = getHexesInRadius({ q: 0, r: 0, s: 0 }, 3);
const filteredHexes = allHexes.filter(hex => {
  const { q, r } = hex;
  
  // Remove the single hexes at the very top and bottom (rows -3 and 3)
  if (r === -3 || r === 3) return false;
  
  // Remove specific corner hexes to shape the pattern correctly
  if (r === -2 && (q === -3 || q === 3)) return false;
  if (r === -1 && (q === -3 || q === 3)) return false;
  if (r === 0 && (q === -3 || q === 3)) return false;
  if (r === 1 && (q === -3 || q === 3)) return false;
  if (r === 2 && (q === -3 || q === 3)) return false;
  
  return true;
});

const preRotationCounts = {};
filteredHexes.forEach(hex => {
  const row = hex.r;
  if (!preRotationCounts[row]) preRotationCounts[row] = 0;
  preRotationCounts[row]++;
});

const preSortedRows = Object.keys(preRotationCounts).sort((a, b) => parseInt(a) - parseInt(b));
console.log('Pre-rotation row counts:', preSortedRows.map(row => `${row}: ${preRotationCounts[row]}`));
console.log('Pre-rotation pattern:', preSortedRows.map(row => preRotationCounts[row]));

// Now let's try a corrected implementation
function generateCorrectBaseGame56Layout() {
  // We need to create a pattern that after rotation gives us [3, 4, 5, 6, 5, 4, 3]
  // Since rotation is (q, r, s) -> (-r, -s, -q), we need to think about what pattern
  // would give us the right result
  
  // Let's manually create the coordinates for the desired pattern
  const coordinates = [];
  
  // Row 0 (top): 3 hexes
  coordinates.push({ q: -1, r: 0, s: 1 });
  coordinates.push({ q: 0, r: 0, s: 0 });
  coordinates.push({ q: 1, r: 0, s: -1 });
  
  // Row 1: 4 hexes
  coordinates.push({ q: -2, r: 1, s: 1 });
  coordinates.push({ q: -1, r: 1, s: 0 });
  coordinates.push({ q: 0, r: 1, s: -1 });
  coordinates.push({ q: 1, r: 1, s: -2 });
  
  // Row 2: 5 hexes  
  coordinates.push({ q: -2, r: 2, s: 0 });
  coordinates.push({ q: -1, r: 2, s: -1 });
  coordinates.push({ q: 0, r: 2, s: -2 });
  coordinates.push({ q: 1, r: 2, s: -3 });
  coordinates.push({ q: 2, r: 2, s: -4 });
  
  // Row 3: 6 hexes
  coordinates.push({ q: -3, r: 3, s: 0 });
  coordinates.push({ q: -2, r: 3, s: -1 });
  coordinates.push({ q: -1, r: 3, s: -2 });
  coordinates.push({ q: 0, r: 3, s: -3 });
  coordinates.push({ q: 1, r: 3, s: -4 });
  coordinates.push({ q: 2, r: 3, s: -5 });
  
  // Row 4: 5 hexes
  coordinates.push({ q: -2, r: 4, s: -2 });
  coordinates.push({ q: -1, r: 4, s: -3 });
  coordinates.push({ q: 0, r: 4, s: -4 });
  coordinates.push({ q: 1, r: 4, s: -5 });
  coordinates.push({ q: 2, r: 4, s: -6 });
  
  // Row 5: 4 hexes
  coordinates.push({ q: -1, r: 5, s: -4 });
  coordinates.push({ q: 0, r: 5, s: -5 });
  coordinates.push({ q: 1, r: 5, s: -6 });
  coordinates.push({ q: 2, r: 5, s: -7 });
  
  // Row 6: 3 hexes
  coordinates.push({ q: 0, r: 6, s: -6 });
  coordinates.push({ q: 1, r: 6, s: -7 });
  coordinates.push({ q: 2, r: 6, s: -8 });
  
  return coordinates;
}

// Test manual implementation
const manualResult = generateCorrectBaseGame56Layout();
console.log('\nManual result:');
console.log('Total hexes:', manualResult.length);

const manualRowCounts = {};
manualResult.forEach(hex => {
  const row = hex.r;
  if (!manualRowCounts[row]) manualRowCounts[row] = 0;
  manualRowCounts[row]++;
});

const manualSortedRows = Object.keys(manualRowCounts).sort((a, b) => parseInt(a) - parseInt(b));
console.log('Manual row counts:', manualSortedRows.map(row => `${row}: ${manualRowCounts[row]}`));
console.log('Manual pattern:', manualSortedRows.map(row => manualRowCounts[row]));
