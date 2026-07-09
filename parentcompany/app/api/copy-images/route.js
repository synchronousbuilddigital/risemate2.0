import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const src1 = "C:\\Users\\prasa\\.gemini\\antigravity-ide\\brain\\2b855d26-3f07-454c-92d3-c56fbc48ae68\\about_hero_bg_1783401568749.png";
    const dest1 = "i:\\parentcompany\\rissemate_final\\parentcompany\\public\\about_hero.png";
    
    const src2 = "C:\\Users\\prasa\\.gemini\\antigravity-ide\\brain\\2b855d26-3f07-454c-92d3-c56fbc48ae68\\about_story_bg_1783401579147.png";
    const dest2 = "i:\\parentcompany\\rissemate_final\\parentcompany\\public\\about_story.png";
    
    const src3 = "C:\\Users\\prasa\\.gemini\\antigravity-ide\\brain\\2b855d26-3f07-454c-92d3-c56fbc48ae68\\ecosystem_hero_bg_1783402246788.png";
    const dest3 = "i:\\parentcompany\\rissemate_final\\parentcompany\\public\\ecosystem_hero.png";

    const src4 = "C:\\Users\\prasa\\.gemini\\antigravity-ide\\brain\\2b855d26-3f07-454c-92d3-c56fbc48ae68\\services_hero_bg_1783402552459.png";
    const dest4 = "i:\\parentcompany\\rissemate_final\\parentcompany\\public\\services_hero.png";
    
    if (fs.existsSync(src1)) fs.copyFileSync(src1, dest1);
    if (fs.existsSync(src2)) fs.copyFileSync(src2, dest2);
    if (fs.existsSync(src3)) fs.copyFileSync(src3, dest3);
    if (fs.existsSync(src4)) fs.copyFileSync(src4, dest4);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
