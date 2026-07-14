const fs = require('fs');
const path = 'public/worldIndiaHigh.svg';

if (!fs.existsSync(path)) {
  console.error("File not found");
  process.exit(1);
}

let svg = fs.readFileSync(path, 'utf8');

const hubs = ['US', 'DE', 'IN', 'AE', 'KE', 'SG', 'GB', 'JP'];

let lines = svg.split('\n');
let modifiedLines = lines.map(line => {
  if (line.includes('<path') && line.includes('id="')) {
    const match = line.match(/id="([^"]+)"/);
    if (match) {
      const id = match[1];
      if (hubs.includes(id)) {
        // Hub country: highlight in gold
        line = line.replace(/fill="[^"]+"/, 'fill="#DFBA6B"');
        line = line.replace(/stroke="[^"]+"/, 'stroke="#ffffff"');
        line = line.replace(/stroke-width="[^"]+"/, 'stroke-width="0.8"');
      } else {
        // Normal country: subtle dark blue
        line = line.replace(/fill="[^"]+"/, 'fill="#102030"');
        line = line.replace(/stroke="[^"]+"/, 'stroke="#1f3556"');
        line = line.replace(/stroke-width="[^"]+"/, 'stroke-width="0.3"');
      }
    }
  }
  return line;
});

fs.writeFileSync(path, modifiedLines.join('\n'), 'utf8');
console.log("SVG colors updated successfully!");
