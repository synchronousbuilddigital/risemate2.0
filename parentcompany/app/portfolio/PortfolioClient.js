"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const entities = [
  {
    key: "entity_01",
    id: "01",
    name: "BWorth",
    tagline: "Sustainable Fashion Innovation Leader",
    tag: "Circular Luxury",
    img: "/image copy.png",
    objectPos: "object-left",
    desc: "Revolutionizing the fashion industry through a unique circular luxury ecosystem. Buy, sell, and recycle fashion while earning rewards through our unique buyback program that preserves the planet's beauty.",
    pillars: ["BWorth Coins (1:1 Value)", "Landfill Elimination", "Live CO₂ Monitoring"],
    metrics: ["10,000+ Items Recycled", "25,000+ total Items Saved"],
    color: "text-cyan-600",
    link: "https://bworth.co.in",
    logo: "/BWORTH.jpg"
  },
  {
    key: "entity_02",
    id: "02",
    name: "Vega Vrudhi",
    tagline: "Precision Execution & Growth Architecture",
    tag: "Managed Sales",
    img: "/image copy 2.png",
    objectPos: "object-left",
    desc: "Precision execution architecture bridging the gap between digital leads and on-ground reality. We deploy trained field teams to accelerate market presence for national growth engines.",
    pillars: ["Digital Lead Fulfillment", "Activation Programs", "Merchant Onboarding"],
    sectors: ["FinTech", "FMCG", "E-Commerce", "GovTech"],
    color: "text-green-600",
    link: "https://vegavruddhi.com",
    logo: "/VEGA.png"
  },
  {
    key: "entity_03",
    id: "03",
    name: "RYM Grenergy",
    tagline: "Intelligent Systems & Deep-Tech Engineering",
    tag: "Clean Energy",
    img: "/image copy 4.png",
    desc: "Enabling a carbon-neutral future by developing the world’s greenest battery cell and intelligent green-tech infrastructure through AI, IoT, and Smart Automation.",
    pillars: ["ULTRON Energy Platform", "INTELLEXA AI", "Weighbridge AI", "REEWS Earthquake Warning"],
    color: "text-gold",
    link: "https://rymgrenergy.com/",
    logo: "/RYM.png"
  },
  {
    key: "entity_04",
    id: "04",
    name: "Synchronous",
    tagline: "High-Performance Digital Marketing Group",
    tag: "Autonomous AI",
    img: "/image copy 5.png",
    objectPos: "object-right",
    desc: "Architecting high-velocity digital ecosystems for high-growth elite brands. We build vertically integrated brand identities and compound ROI via algorithmic process automation.",
    pillars: ["Brand Identity Architecture", "Autonomous AI Agents", "Data-Backed Growth", "Predictive Modeling"],
    color: "text-orange-500",
    link: "https://www.synchronousbuilddigital.com/",
    logo: "/sync.jpg"
  }
];

export default function PortfolioClient() {
  const [dynamicEntities, setDynamicEntities] = useState(entities);

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.portfolioItems && data.portfolioItems.length > 0) {
          const merged = entities.map((staticEnt) => {
            const dynamicEnt = data.portfolioItems.find(p => p.key === staticEnt.key);
            if (dynamicEnt) {
              return {
                ...staticEnt,
                name: dynamicEnt.title,
                tagline: dynamicEnt.tagline || staticEnt.tagline,
                tag: dynamicEnt.tag || staticEnt.tag,
                img: dynamicEnt.img || staticEnt.img,
                desc: dynamicEnt.desc || staticEnt.desc,
                logo: dynamicEnt.logo || staticEnt.logo,
                link: dynamicEnt.link || staticEnt.link
              };
            }
            return staticEnt;
          });

          data.portfolioItems.forEach((dynamicEnt, idx) => {
            const exists = entities.some(staticEnt => staticEnt.key === dynamicEnt.key);
            if (!exists) {
              merged.push({
                key: dynamicEnt.key,
                id: String(entities.length + idx + 1).padStart(2, '0'),
                name: dynamicEnt.title,
                tagline: dynamicEnt.tagline || "Dynamic Venture Project",
                tag: dynamicEnt.tag || "Enterprise",
                img: dynamicEnt.img || "",
                desc: dynamicEnt.desc || "",
                pillars: ["Verified Holding Node"],
                color: "text-blue-600",
                link: dynamicEnt.link || "",
                logo: dynamicEnt.logo || ""
              });
            }
          });

          setDynamicEntities(merged);
        }
      })
      .catch(err => console.error("Error fetching content:", err));
  }, []);

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative pt-6 pb-16 md:py-24 px-6 md:px-24 overflow-hidden bg-[#FAF9F6] border-b border-dark/5">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[120px] -z-10 opacity-50" />

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center"
          >
            {/* Text Area */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-dark/5 shadow-sm mb-10"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-dark/70">Sovereign Registry</span>
              </motion.div>

              <h1 className="text-3xl sm:text-6xl md:text-[7rem] lg:text-[8.5rem] font-black leading-[0.85] text-dark tracking-tighter mb-10">
                Institutional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-dark to-dark/30 italic pr-4">Portfolio.</span>
              </h1>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-dark/10">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="w-full bg-[#002366]"
                  />
                </div>
                <p className="text-xl md:text-2xl text-dark/60 font-secondary max-w-xl leading-relaxed">
                  A legacy of strategic allocation across four high-velocity sectors. Each entity operates as a sovereign architectural unit under the RiseMates banner.
                </p>
              </div>
            </div>

            {/* Graphic / Card Area */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, rotateX: 20, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative w-full aspect-square md:aspect-[4/3] rounded-[40px] bg-white border border-dark/5 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col justify-between group"
                style={{ perspective: "1000px" }}
              >
                {/* Grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-100 group-hover:opacity-50 transition-opacity duration-1000"></div>

                {/* Top Header inside Card */}
                <div className="relative z-10 flex justify-between items-start p-8 md:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-dark shadow-xl flex items-center justify-center rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700">
                    <span className="material-symbols-outlined text-white text-2xl">account_balance</span>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-dark/5 px-3 py-1.5 rounded-full mb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-dark/60">Entity Count</span>
                      <span className="text-xs font-black text-dark bg-white px-2 py-0.5 rounded-full shadow-sm">04</span>
                    </div>
                  </div>
                </div>

                {/* Center Logo Area */}
                <div className="relative z-10 flex flex-col items-center justify-center flex-grow group-hover:scale-105 transition-transform duration-1000">
                  <div className="relative w-64 md:w-80 h-32 md:h-40 mb-4 filter drop-shadow-xl">
                    <Image src="/logo.png" alt="RiseMates Ventures" fill className="object-contain" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30">Master Holding Company</p>
                </div>

                {/* Bottom Footer inside Card */}
                <div className="relative z-10 border-t border-dark/5 p-8 md:p-10 bg-gradient-to-t from-dark/[0.02] to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-dark/40 mb-2">Status</p>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <p className="text-sm font-bold text-dark">Active</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-dark/40 mb-2">Architecture</p>
                      <p className="text-sm font-bold text-dark">Overarching</p>
                    </div>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full ease-in-out"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SHOWCASE */}
      <div className="space-y-12 pb-12 md:space-y-24 md:pb-24 pt-12 md:pt-20">
        {dynamicEntities.map((entity, idx) => (
          <EntitySection key={entity.id} entity={entity} index={idx} />
        ))}
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-[#FAF9F6] border-t border-dark/5 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-dark tracking-tighter mb-6">
            Looking for Venture Support?
          </h2>
          <p className="text-base text-dark/60 font-secondary mb-10">
            Apply to receive operational scaling models and capital access from our network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-[#002366] text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[#002366]/20 hover:bg-dark transition-all duration-300"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/contact?type=funding"
              className="bg-white border border-dark/10 text-dark px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-dark hover:text-white transition-all duration-300"
            >
              Apply for Funding
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function EntitySection({ entity, index }) {
  const isEven = index % 2 === 0;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id={entity.name.toLowerCase().replace(/\s+/g, '-')} ref={sectionRef} className="container-wide relative">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-24 items-center`}>
        {/* Image side */}
        <div className={`lg:col-span-1 border-r border-dark/5 hidden lg:block`}>
          <p className="text-[10vw] font-black text-dark/[0.03] rotate-180 [writing-mode:vertical-lr] select-none">
            0{entity.id}
          </p>
        </div>

        <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden group border border-dark/5">
            <Image
              src={entity.img}
              alt={entity.name}
              fill
              sizes="(max-width: 1200px) 100vw, 50vw"
              className={`object-cover ${entity.objectPos || ""} grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100`}
            />
            <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-1000" />
          </div>
        </div>

        {/* Content side */}
        <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isEven ? 50 : -50 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1 }}
            style={{ y }}
          >
            <div className="flex items-center gap-4 mb-4 md:mb-8">
              <span className="px-4 py-1 bg-dark text-white text-[10px] font-black uppercase tracking-widest rounded-full">{entity.tag}</span>
              <div className="h-[1px] flex-grow bg-dark/5"></div>
            </div>

            <div className="flex items-center justify-between gap-4 md:gap-6 mb-6 md:mb-10">
              <h2 className="text-4xl md:text-7xl font-black text-dark tracking-tighter">
                {entity.name}
              </h2>
              {entity.logo && (
                <div className={`w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center p-4 border border-dark/5 hover:scale-110 transition-all duration-700`}>
                  <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#002366] mb-4 md:mb-8 italic">
              {entity.tagline}
            </p>

            <p className="text-lg text-dark/60 font-secondary leading-relaxed mb-6 md:mb-12 italic border-l-2 border-dark/10 pl-8">
              {entity.desc}
            </p>

            <div className="space-y-6 md:space-y-8 mb-6 md:mb-12">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4">Core Pillars</h4>
                <div className="flex flex-wrap gap-3">
                  {entity.pillars.map((pillar, i) => (
                    <span key={i} className="px-4 py-2 border border-dark/10 text-xs font-bold text-dark/60 rounded-xl hover:bg-dark hover:text-white transition-all cursor-default">
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              {entity.metrics && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4">Impact Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {entity.metrics.map((m, i) => (
                      <div key={i} className="p-4 bg-[#f8f9fa] rounded-2xl border border-dark/5">
                        <p className="text-xs font-bold text-dark">{m}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {entity.sectors && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4">Sector Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {entity.sectors.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href={entity.link} target="_blank" className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.3em] text-dark group/link">
              <span className="relative">
                Explore Website
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gold transition-all duration-500 group-hover/link:w-full"></span>
              </span>
              <span className="material-symbols-outlined text-lg group-hover/link:rotate-45 transition-transform duration-500">north_east</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
