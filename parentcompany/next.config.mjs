import fs from 'fs';
import path from 'path';

const mapPath = 'i:\\parentcompany\\rissemate_final\\parentcompany\\public\\worldIndiaHigh.svg';
const logPath = 'i:\\parentcompany\\rissemate_final\\parentcompany\\scratch\\map_coordinates.txt';

try {
  if (fs.existsSync(mapPath)) {
    const svgContent = fs.readFileSync(mapPath, 'utf8');
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    
    if (viewBoxMatch) {
      const [vx, vy, vw, vh] = viewBoxMatch[1].split(/\s+/).map(Number);
      let logMsg = `viewBox: x=${vx}, y=${vy}, w=${vw}, h=${vh}\n\n`;
      
      const hubs = ['US', 'DE', 'IN', 'AE', 'KE', 'SG', 'GB', 'JP'];
      
      hubs.forEach(id => {
        // Regex to match path tag with specific id (accounting for multi-line or varied spacing)
        const pathRegex = new RegExp(`<path[^>]+id="${id}"[^>]*>`, 'i');
        const match = svgContent.match(pathRegex);
        
        if (match) {
          const dMatch = match[0].match(/d="([^"]+)"/);
          if (dMatch) {
            const coords = dMatch[1].match(/-?\d+(\.\d+)?/g).map(Number);
            let sumX = 0, sumY = 0, count = 0;
            
            for (let i = 0; i < coords.length; i += 2) {
              if (coords[i] !== undefined && coords[i+1] !== undefined) {
                sumX += coords[i];
                sumY += coords[i+1];
                count++;
              }
            }
            
            if (count > 0) {
              const avgX = sumX / count;
              const avgY = sumY / count;
              const pctX = ((avgX - vx) / vw) * 100;
              const pctY = ((avgY - vy) / vh) * 100;
              
              logMsg += `ID: ${id}\n  Centroid: SVG_X=${avgX.toFixed(2)}, SVG_Y=${avgY.toFixed(2)}\n  Percentages: x="${pctX.toFixed(1)}%", y="${pctY.toFixed(1)}%"\n\n`;
            }
          }
        } else {
          logMsg += `ID: ${id} -> Not found in SVG\n\n`;
        }
      });
      
      fs.writeFileSync(logPath, logMsg, 'utf8');
    }
  }
} catch (err) {
  fs.writeFileSync(logPath, 'Error: ' + err.message, 'utf8');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'rymgrenergy.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'www.synchronousbuilddigital.com',
      },
    ],
  },
};

export default nextConfig;
