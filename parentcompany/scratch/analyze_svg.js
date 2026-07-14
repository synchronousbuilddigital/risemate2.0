const fs = require('fs');
const svg = fs.readFileSync('public/worldIndiaHigh.svg', 'utf8');

const fills = {};
const matches = svg.matchAll(/fill="([^"]+)"/g);
for (const match of matches) {
  const fill = match[1];
  fills[fill] = (fills[fill] || 0) + 1;
}

console.log('Unique fills:', fills);

const ids = {};
const idMatches = svg.matchAll(/id="([^"]+)"/g);
for (const match of idMatches) {
  const id = match[1];
  ids[id] = (ids[id] || 0) + 1;
}
console.log('Hub status:');
['US', 'DE', 'IN', 'AE', 'KE', 'SG', 'GB', 'JP'].forEach(id => {
  const idx = svg.indexOf(`id="${id}"`);
  if (idx !== -1) {
    const start = Math.max(0, idx - 100);
    const end = Math.min(svg.length, idx + 100);
    console.log(`ID: ${id}\nContext: ${svg.substring(start, end).replace(/\s+/g, ' ')}\n`);
  } else {
    console.log(`ID: ${id} not found`);
  }
});
