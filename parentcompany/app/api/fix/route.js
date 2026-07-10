import fs from "fs";
import path from "path";

const newHeroJSX = `      {/* 1. HERO SECTION - BENTO REDESIGN */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#FAFAFA] overflow-hidden">
        <div className="container-wide">
          
          {/* Top Headline Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-primary font-black text-[#111] leading-[1.05] tracking-tighter max-w-4xl">
              Building the <span className="inline-block border-[3px] border-[#111] rounded-[40px] px-6 py-2 -my-2 relative top-2">blueprint</span> <br/>
              for global scale
            </h1>
            <div className="hidden md:flex items-center justify-center w-24 h-24 relative opacity-80 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gold animate-[spin_20s_linear_infinite] origin-center">
                <path fill="currentColor" d="M50 0 C50 25 75 50 100 50 C75 50 50 75 50 100 C50 75 25 50 0 50 C25 50 50 25 50 0 Z" />
              </svg>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
            
            {/* Left Column (col-4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Top Box */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 relative bg-gray-100">
                  <Image src="/ecosystem_hero.png" alt="RMV" fill className="object-cover" unoptimized />
                </div>
                <p className="text-sm font-medium text-gray-500 font-secondary leading-snug">
                  Partner with us for exponential market growth and venture scale!
                </p>
              </div>

              {/* Middle Box */}
              <div className="flex flex-col gap-5 pt-4">
                <p className="text-sm text-gray-500 font-secondary leading-relaxed max-w-[280px]">
                  Join our global ecosystem to execute ambitious strategies together. To do this, you can partner, invest, or build with us.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full border-[3px] border-[#FAFAFA] bg-gray-200 overflow-hidden relative">
                      <Image src="/services_hero.png" alt="Avatar" fill className="object-cover" unoptimized />
                    </div>
                    <div className="w-12 h-12 rounded-full border-[3px] border-[#FAFAFA] bg-gray-300 overflow-hidden relative">
                      <Image src="/ecosystem_hero.png" alt="Avatar" fill className="object-cover" unoptimized />
                    </div>
                  </div>
                  <div className="bg-[#111] text-white text-[10px] font-black uppercase tracking-widest px-6 py-4 rounded-full hover:bg-gold hover:text-[#111] transition-colors cursor-pointer shadow-lg shadow-black/10">
                    Join 500+ Partners
                  </div>
                </div>
              </div>

              {/* Bottom Box */}
              <div className="pt-16 mt-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Global Ecosystem</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#111] font-primary leading-[1.1] tracking-tight mb-8">
                  Execute your <br/>vision with us
                </h2>
                <Link href="/contact" className="inline-flex items-center gap-3 border border-gray-300 rounded-full px-6 py-3 hover:border-gold hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest">
                  Partner Now
                  <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </Link>
              </div>
            </div>

            {/* Right Column (col-8) */}
            <div className="lg:col-span-8 flex flex-col relative">
              
              {/* Wide Image */}
              <div className="relative w-full h-[300px] md:h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
                <Image src="/services_hero.png" alt="Global Operations" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-black/10" />
                
                {/* Scroll hint circle */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                </div>
              </div>

              {/* Overlapping Stat Card */}
              <div className="relative lg:absolute lg:left-12 lg:top-[240px] bg-white/95 backdrop-blur-2xl rounded-[32px] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-white max-w-[320px] mt-[-60px] mx-6 lg:mt-0 lg:mx-0 z-10">
                <div className="flex items-end gap-3 mb-4">
                  <h3 className="text-4xl md:text-[50px] font-black text-[#111] font-primary tracking-tighter leading-none">+₹150</h3>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500 leading-tight mb-1">Cr<br/>Deployed</span>
                </div>
                <p className="text-[11px] text-gray-500 font-secondary leading-relaxed">
                  Over the past year, we have successfully facilitated massive capital and execution resources for hyper-growth companies across diverse sectors.
                </p>
              </div>

              {/* Bottom Area */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-12 lg:pt-24 px-6 lg:px-0 relative">
                <p className="text-2xl md:text-[28px] text-[#111] font-primary font-bold leading-snug max-w-md tracking-tight">
                  We strive to protect growth ambitions and transform businesses for future generations.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Link href="/about" className="bg-[#FAF3E0] text-[#8C6B18] px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-[#111] transition-colors border border-transparent">
                    About Us
                  </Link>
                  <Link href="/services" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#111] transition-colors">
                    View Services
                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
                  </Link>
                </div>
                
                {/* Circular Stamp */}
                <div className="absolute -bottom-10 -right-4 w-32 h-32 text-gray-400 animate-[spin_20s_linear_infinite] hidden lg:block">
                  <svg viewBox="0 0 100 100" width="100" height="100">
                    <defs>
                      <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fontSize="10.5" fill="currentColor" letterSpacing="1.5" fontWeight="900" style={{fontFamily: 'sans-serif'}}>
                      <textPath href="#circle">
                        RiseMates Ventures • GLOBAL SCALE • 
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center -rotate-90">
                    <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
`;

export async function GET(request) {
  try {
    const filePath = 'i:/parentcompany/rissemate_final/parentcompany/app/HomeClient.js';
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Clean up prepended garbage from last run
    const useClientIdx = content.indexOf('"use client";');
    if (useClientIdx !== -1) {
      content = content.substring(useClientIdx);
    }

    // 2. Find old hero boundaries
    const startStr = "{/* 1. HERO SECTION - ADVANCED REDESIGN */}";
    const endStr = "{/* 2. TRUST SECTION & STATS STRIP */}";

    const startIdx = content.indexOf(startStr);
    const endIdx = content.indexOf(endStr);

    if (startIdx !== -1 && endIdx !== -1) {
      // Look back to the <section> tag to include it in replacement
      const beforeStr = content.substring(0, startIdx);
      const afterStr = content.substring(endIdx);

      const newContent = beforeStr + newHeroJSX + '\\n\\n      ' + afterStr;

      fs.writeFileSync(filePath, newContent, 'utf8');

      return new Response(JSON.stringify({ success: true, message: "Fixed and replaced" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Could not find start or end tags" }), { status: 200 });
    }

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 200 });
  }
}
