const fs = require('fs');
const path = './app/HomeClient.js';
let content = fs.readFileSync(path, 'utf8');

// Backgrounds
content = content.replace(/bg-\[#FAF9F6\]/g, 'bg-white');
content = content.replace(/bg-\[#001233\]/g, 'bg-white');
content = content.replace(/bg-\[#002366\]/g, 'bg-black');

// Text Colors
content = content.replace(/text-\[#002366\]/g, 'text-black');
content = content.replace(/text-\[#001233\]/g, 'text-black');
content = content.replace(/text-white/g, 'text-black');
content = content.replace(/text-dark\/50/g, 'text-gray-500');
content = content.replace(/text-dark\/60/g, 'text-gray-600');
content = content.replace(/text-dark\/85/g, 'text-gray-800');
content = content.replace(/text-dark/g, 'text-black');

// Borders
content = content.replace(/border-\[#002366\]/g, 'border-black');
content = content.replace(/border-dark\/5/g, 'border-gray-200');
content = content.replace(/border-dark\/10/g, 'border-gray-300');
content = content.replace(/border-white\/5/g, 'border-gray-200');
content = content.replace(/border-white\/10/g, 'border-gray-200');

// Additional adjustments
content = content.replace(/bg-white\/5/g, 'bg-gray-100');
content = content.replace(/bg-white\/10/g, 'bg-gray-200');
content = content.replace(/bg-white\/40/g, 'bg-gray-100');
content = content.replace(/hover:bg-\[#001233\]/g, 'hover:bg-gray-800');
content = content.replace(/hover:bg-dark/g, 'hover:bg-gray-800');
content = content.replace(/shadow-\[#002366\]\/20/g, 'shadow-black/20');
content = content.replace(/shadow-\[#002366\]\/10/g, 'shadow-black/10');

fs.writeFileSync(path, content);
console.log("Colors updated.");
