import fs from "fs";
import path from "path";

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      
      // Remove Navbar imports
      if (content.includes('import Navbar from')) {
        content = content.replace(/import Navbar from.*?\n/g, '');
        modified = true;
      }
      
      // Remove Footer imports
      if (content.includes('import Footer from')) {
        content = content.replace(/import Footer from.*?\n/g, '');
        modified = true;
      }
      
      // Remove <Navbar />
      if (content.includes('<Navbar />')) {
        content = content.replace(/\s*<Navbar \/>/g, '');
        modified = true;
      }
      
      // Remove <Footer />
      if (content.includes('<Footer />')) {
        content = content.replace(/\s*<Footer \/>/g, '');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

export async function GET(request) {
  try {
    processDir('i:/parentcompany/rissemate_final/parentcompany/app');
    return new Response(JSON.stringify({ success: true, message: "Cleaned" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
