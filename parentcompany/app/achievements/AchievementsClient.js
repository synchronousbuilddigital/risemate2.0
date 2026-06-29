"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Achievements Data Matching User Requests
const MILESTONES = [
  { year: "2021", title: "Company Inception", desc: "RiseMate established as a specialized digital startup accelerator in Jaipur, launching our first Cohort." },
  { year: "2022", title: "Regional Expansion", desc: "Expanded geographic reach across Rajasthan and Delhi NCR, connecting 40+ early angels." },
  { year: "2023", title: "Ecosystem IP Integration", desc: "Launched BWorth circular retail and RYM industrial IoT automation software platforms." },
  { year: "2024", title: "Gurugram Corporate HQ", desc: "Established NCR Gurugram Corporate HQ, expanding team size and deploying Vega Vrudhi." },
  { year: "2025", title: "Capital Pool Milestones", desc: "Crossed ₹100 Cr in facilitated venture rounds and integrated Synchronous AI support agents." },
  { year: "2026", title: "Ecosystem Peak & Jaipur Hub", desc: "Expanded Jaipur operational hub and facilitated capital reached ₹150 Cr+ across 25+ completed rounds." }
];

const FUNDING_STATS = {
  facilitated: "₹150 Cr+",
  rounds: "25+",
  types: ["Pre-Seed", "Seed", "Angel", "Pre-Series A", "Series A"],
  chartData: [
    { year: "2021", value: 10, label: "₹10 Cr", rounds: "3 Rounds" },
    { year: "2022", value: 35, label: "₹35 Cr", rounds: "6 Rounds" },
    { year: "2023", value: 68, label: "₹68 Cr", rounds: "9 Rounds" },
    { year: "2024", value: 105, label: "₹105 Cr", rounds: "14 Rounds" },
    { year: "2025", value: 132, label: "₹132 Cr", rounds: "20 Rounds" },
    { year: "2026", value: 150, label: "₹150 Cr", rounds: "25 Rounds" }
  ]
};

const COHORT_IMPACT = {
  supported: "100+",
  mentored: "35+",
  funded: "18+",
  scaled: "24",
  industries: ["FinTech", "HealthTech", "AI & Deep Automation", "SaaS", "D2C Brands", "Clean Energy & IoT"]
};

const NETWORK_ALLIANCES = {
  investors: "120+",
  mentors: "40+",
  incubators: "8 Associated Accelerators",
  corporates: "15 Strategic Partnerships",
  universities: "5 University Collaborations"
};

const RECOGNITIONS = [
  { icon: "verified", title: "ISO 9001:2015 Certified Operations", desc: "Audited corporate process mapping and management controls." },
  { icon: "gavel", title: "Startup India Program Partners", desc: "Connected to national incubator frameworks and state capital schemes." },
  { icon: "workspace_premium", title: "Top Accelerator Mentions", desc: "Ecosystem recognitions for sustainable scaling models." },
  { icon: "newspaper", title: "Press Coverage & Mentions", desc: "Featured in top regional business and tech news platforms." }
];

const EVENTS = {
  workshops: "50+ Sessions",
  webinars: "30+ Financial Modeling Webinars",
  organized: "12 Startup Mixer Events",
  competitions: "8 National Pitch Days",
  networking: "Monthly VC-founder matchmaking circles"
};

const BUSINESS_METRICS = {
  success: "94% Raising Success Rate",
  repeat: "38% Repeat Founders",
  active: "28 Active Corporate Partnerships"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
    },
  },
};

export default function AchievementsClient() {
  const [hoveredNode, setHoveredNode] = useState(null);

  // SVG coordinates calculation variables
  const chartWidth = 800;
  const chartHeight = 350;
  const paddingX = 60;
  const paddingY = 40;
  
  // Map years data to SVG coordinates
  const points = FUNDING_STATS.chartData.map((d, i) => {
    const x = paddingX + (i * (chartWidth - paddingX * 2)) / (FUNDING_STATS.chartData.length - 1);
    const y = chartHeight - paddingY - (d.value / 160) * (chartHeight - paddingY * 2);
    return { x, y, ...d };
  });

  // Construct SVG paths
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-dark selection:bg-[#002366] selection:text-white pt-28 pb-24 relative overflow-hidden">
      
      {/* Decorative backing glows */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#002366]/5 blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="container-wide relative z-10 w-full">
        
        {/* Breadcrumbs & Capsule */}
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="text-xs font-black uppercase tracking-wider text-dark/45 hover:text-dark transition-colors">Home</Link>
          <span className="material-symbols-outlined text-xs text-dark/30">chevron_right</span>
          <span className="text-xs font-black uppercase tracking-wider text-[#002366]">Ecosystem Impact</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#002366]/5 border border-[#002366]/10 mb-6 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#002366]">Ecosystem Authority</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] mb-6">
            Ecosystem Impact <br />
            & Milestones
          </h1>
          <p className="text-lg md:text-xl text-dark/60 leading-relaxed font-secondary">
            Since our establishment in 2021, RiseMate has engineered structural growth for high-potential startups. We provide verified validation, process audits, and direct funding facilitation.
          </p>
        </div>

        {/* 1. ANIMATED SVG GROWTH CHART SECTION */}
        <section className="bg-white border border-dark/5 p-8 md:p-10 rounded-[32px] shadow-sm mb-12 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-dark/45">Funding Velocity</span>
              <h3 className="text-2xl font-black text-dark tracking-tight leading-none mt-1">Facilitated Funding Journey</h3>
            </div>
            
            {/* Legend / Stats */}
            <div className="flex gap-8 text-xs font-secondary text-dark/50">
              <div>
                <p className="text-[9px] font-black uppercase tracking-wider text-[#002366]">Total Facilitated</p>
                <p className="text-lg font-black text-dark mt-0.5">{FUNDING_STATS.facilitated}</p>
              </div>
              <div className="border-l border-dark/5 pl-8">
                <p className="text-[9px] font-black uppercase tracking-wider text-[#002366]">Completed Rounds</p>
                <p className="text-lg font-black text-dark mt-0.5">{FUNDING_STATS.rounds}</p>
              </div>
              <div className="border-l border-dark/5 pl-8 hidden sm:block">
                <p className="text-[9px] font-black uppercase tracking-wider text-emerald-600">Success Rate</p>
                <p className="text-lg font-black text-emerald-600 mt-0.5">{BUSINESS_METRICS.success}</p>
              </div>
            </div>
          </div>

          {/* SVG Graph container */}
          <div className="relative w-full overflow-x-auto">
            <div className="min-w-[800px] relative">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto select-none pointer-events-none">
                
                {/* Defs for gradients */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#002366" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#002366" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 40, 80, 120, 160].map((grid, idx) => {
                  const y = chartHeight - paddingY - (grid / 160) * (chartHeight - paddingY * 2);
                  return (
                    <g key={idx}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={chartWidth - paddingX}
                        y2={y}
                        stroke="#000"
                        strokeOpacity="0.04"
                        strokeDasharray="4"
                      />
                      <text
                        x={paddingX - 12}
                        y={y + 4}
                        fill="#000"
                        fillOpacity="0.3"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="end"
                      >
                        ₹{grid} Cr
                      </text>
                    </g>
                  );
                })}

                {/* Gradient area underneath */}
                <motion.path
                  d={areaPath}
                  fill="url(#chartGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                />

                {/* Animated Line */}
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="#002366"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Graph X Axis Years Labels */}
                {points.map((p, idx) => (
                  <text
                    key={idx}
                    x={p.x}
                    y={chartHeight - 12}
                    fill="#000"
                    fillOpacity="0.4"
                    fontSize="11"
                    fontWeight="black"
                    textAnchor="middle"
                  >
                    {p.year}
                  </text>
                ))}

              </svg>

              {/* HTML Interactive nodes on top of SVG */}
              {points.map((p, idx) => (
                <div
                  key={idx}
                  className="absolute pointer-events-auto cursor-pointer group"
                  style={{
                    left: `${(p.x / chartWidth) * 100}%`,
                    top: `${(p.y / chartHeight) * 100}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onMouseEnter={() => setHoveredNode(idx)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Glowing Node Point */}
                  <div className="w-5 h-5 rounded-full bg-white border-4 border-[#002366] shadow-md group-hover:scale-125 transition-transform duration-300 relative flex items-center justify-center">
                    <div className="absolute w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Tooltip Overlay */}
                  <AnimatePresence>
                    {hoveredNode === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -12, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#001233] text-white p-4 rounded-xl shadow-xl z-50 min-w-[180px] pointer-events-none"
                      >
                        <p className="text-[9px] font-black uppercase tracking-wider text-gold mb-0.5">Year {p.year}</p>
                        <p className="text-base font-black leading-none">{p.label}</p>
                        <p className="text-[10px] text-white/50 font-secondary mt-1.5 leading-none">{p.rounds} Facilitated</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-[10px] text-dark/40 font-secondary text-center mt-6">
            Hover over chart nodes to see cumulative funding details facilitated via RiseMate co-investments and venture partners.
          </div>
        </section>

        {/* 2. DYNAMIC BENTO GRID OF ALL CREDIBILITY ELEMENTS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          
          {/* Card 1: Growth Timeline (span-2) */}
          <motion.div variants={cardVariants} whileHover={{ y: -6, scale: 1.008 }} className="lg:col-span-2 bg-white border border-dark/5 p-8 rounded-[32px] shadow-sm flex flex-col justify-between group hover:border-[#002366]/10 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-[#002366] text-sm">timeline</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#002366]">Growth Journey & Milestones</span>
              </div>
              
              {/* Vertical / Horizontal Timeline Layout */}
              <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 relative before:absolute before:left-[11px] md:before:left-0 md:before:right-0 md:before:top-4 before:bottom-0 md:before:bottom-auto before:w-0.5 md:before:w-auto md:before:h-0.5 before:bg-[#002366]/5">
                {MILESTONES.slice(0, 3).map((m, i) => (
                  <div key={i} className="relative pl-8 md:pl-0 pt-0.5 md:pt-8 flex flex-col items-start z-10">
                    <div className="absolute left-0 top-0.5 md:top-0 w-6 h-6 rounded-full bg-white border-[3px] border-[#002366] flex items-center justify-center font-bold text-[8px] text-[#002366]" />
                    <span className="text-[11px] font-black text-[#002366] mb-1">Year {m.year}</span>
                    <h5 className="text-xs font-black text-dark tracking-tight leading-none mb-1">{m.title}</h5>
                    <p className="text-[10px] text-dark/50 font-secondary leading-normal pr-4">{m.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="h-[1px] w-full bg-dark/5 my-6 md:my-8" />
              
              <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 relative before:absolute before:left-[11px] md:before:left-0 md:before:right-0 md:before:top-4 before:bottom-0 md:before:bottom-auto before:w-0.5 md:before:w-auto md:before:h-0.5 before:bg-[#002366]/5">
                {MILESTONES.slice(3).map((m, i) => (
                  <div key={i} className="relative pl-8 md:pl-0 pt-0.5 md:pt-8 flex flex-col items-start z-10">
                    <div className="absolute left-0 top-0.5 md:top-0 w-6 h-6 rounded-full bg-white border-[3px] border-[#002366] flex items-center justify-center font-bold text-[8px] text-[#002366]" />
                    <span className="text-[11px] font-black text-[#002366] mb-1">Year {m.year}</span>
                    <h5 className="text-xs font-black text-dark tracking-tight leading-none mb-1">{m.title}</h5>
                    <p className="text-[10px] text-dark/50 font-secondary leading-normal pr-4">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-dark/40 border-t border-dark/5 pt-4 mt-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Established in 2021 with headquarters in Gurugram NCR and regional operational hub in Jaipur.</span>
            </div>
          </motion.div>

          {/* Card 2: Startup Impact & Cohorts (span-1) */}
          <motion.div variants={cardVariants} whileHover={{ y: -6, scale: 1.015 }} className="lg:col-span-1 bg-white border border-dark/5 p-8 rounded-[32px] shadow-sm flex flex-col justify-between group hover:border-[#002366]/10 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-[#002366] text-sm">rocket_launch</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#002366]">Startup Impact & Stages</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-dark/5 pb-3">
                  <div>
                    <h4 className="text-2xl font-black text-dark tracking-tight leading-none mb-1">{COHORT_IMPACT.supported}</h4>
                    <p className="text-[9px] font-black uppercase tracking-wider text-dark/45">Total Supported</p>
                  </div>
                  <span className="text-[10px] font-secondary text-dark/50">Incubated Cohorts</span>
                </div>
                <div className="flex items-center justify-between border-b border-dark/5 pb-3">
                  <div>
                    <h4 className="text-2xl font-black text-dark tracking-tight leading-none mb-1">{COHORT_IMPACT.mentored}</h4>
                    <p className="text-[9px] font-black uppercase tracking-wider text-dark/45">Currently Mentored</p>
                  </div>
                  <span className="text-[10px] font-secondary text-dark/50">Active Batch</span>
                </div>
                <div className="flex items-center justify-between border-b border-dark/5 pb-3">
                  <div>
                    <h4 className="text-2xl font-black text-dark tracking-tight leading-none mb-1">{COHORT_IMPACT.funded}</h4>
                    <p className="text-[9px] font-black uppercase tracking-wider text-dark/45">Successfully Funded</p>
                  </div>
                  <span className="text-[10px] font-secondary text-dark/50">VC Co-Invested</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-black text-dark tracking-tight leading-none mb-1">{COHORT_IMPACT.scaled}</h4>
                    <p className="text-[9px] font-black uppercase tracking-wider text-dark/45">Launched / Scaled</p>
                  </div>
                  <span className="text-[10px] font-secondary text-dark/50">Proven D2C & FinTech</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-dark/40 border-t border-dark/5 pt-4 mt-6">
              <span className="font-bold text-dark/65">Sectors Served:</span> {COHORT_IMPACT.industries.join(", ")}
            </div>
          </motion.div>

          {/* Card 3: Network & Ecosystem Alliances (span-1) */}
          <motion.div variants={cardVariants} whileHover={{ y: -6, scale: 1.015 }} className="lg:col-span-1 bg-white border border-dark/5 p-8 rounded-[32px] shadow-sm flex flex-col justify-between group hover:border-[#002366]/10 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-[#002366] text-sm">hub</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#002366]">Ecosystem Alliances</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#002366]/5 flex items-center justify-center text-[#002366] material-symbols-outlined text-base">handshake</span>
                  <div>
                    <h5 className="text-xs font-black text-dark leading-tight">{NETWORK_ALLIANCES.investors} Connected VCs</h5>
                    <p className="text-[10px] text-dark/40 font-secondary mt-0.5 leading-tight">Angel networks & institutional funds.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#002366]/5 flex items-center justify-center text-[#002366] material-symbols-outlined text-base">school</span>
                  <div>
                    <h5 className="text-xs font-black text-dark leading-tight">{NETWORK_ALLIANCES.mentors} Advisors</h5>
                    <p className="text-[10px] text-dark/40 font-secondary mt-0.5 leading-tight">Industry veterans & operators.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#002366]/5 flex items-center justify-center text-[#002366] material-symbols-outlined text-base">domain</span>
                  <div>
                    <h5 className="text-xs font-black text-dark leading-tight">{NETWORK_ALLIANCES.incubators}</h5>
                    <p className="text-[10px] text-dark/40 font-secondary mt-0.5 leading-tight">Incubator node connections.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#002366]/5 flex items-center justify-center text-[#002366] material-symbols-outlined text-base">business</span>
                  <div>
                    <h5 className="text-xs font-black text-dark leading-tight">{NETWORK_ALLIANCES.corporates}</h5>
                    <p className="text-[10px] text-dark/40 font-secondary mt-0.5 leading-tight">Direct corporate piloting routes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-dark/40 border-t border-dark/5 pt-4 mt-6 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-[#002366]">workspace_premium</span>
              <span>{NETWORK_ALLIANCES.universities} (IITs/IIMs)</span>
            </div>
          </motion.div>

          {/* Card 4: Recognition, Awards & Certifications (span-1) */}
          <motion.div variants={cardVariants} whileHover={{ y: -6, scale: 1.015 }} className="lg:col-span-1 bg-white border border-dark/5 p-8 rounded-[32px] shadow-sm flex flex-col justify-between group hover:border-[#002366]/10 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-[#002366] text-sm">workspace_premium</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#002366]">Certifications & Awards</span>
              </div>
              
              <div className="space-y-4">
                {RECOGNITIONS.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#002366] text-base mt-0.5">{r.icon}</span>
                    <div>
                      <h5 className="text-xs font-black text-dark leading-tight">{r.title}</h5>
                      <p className="text-[10px] text-dark/45 font-secondary mt-0.5 leading-tight">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-dark/40 border-t border-dark/5 pt-4 mt-6 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-emerald-600">verified_user</span>
              <span>ISO 9001:2015 process-audited accelerator operations.</span>
            </div>
          </motion.div>

          {/* Card 5: Events, Workshops & Community Hub (span-2) */}
          <motion.div variants={cardVariants} whileHover={{ y: -6, scale: 1.008 }} className="lg:col-span-2 bg-white border border-dark/5 p-8 rounded-[32px] shadow-sm flex flex-col justify-between group hover:border-[#002366]/10 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-[#002366] text-sm">groups</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#002366]">Events & Community Footprint</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-dark/60 font-secondary">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002366]/5 flex items-center justify-center font-black text-[10px] text-[#002366]">01</span>
                    <div>
                      <h5 className="text-xs font-black text-dark leading-none">{EVENTS.workshops} Conducted</h5>
                      <p className="text-[9px] text-dark/40 font-secondary mt-1 leading-none">For structured seed-scale founders.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002366]/5 flex items-center justify-center font-black text-[10px] text-[#002366]">02</span>
                    <div>
                      <h5 className="text-xs font-black text-dark leading-none">{EVENTS.webinars}</h5>
                      <p className="text-[9px] text-dark/40 font-secondary mt-1 leading-none">Covering unit metrics and models.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002366]/5 flex items-center justify-center font-black text-[10px] text-[#002366]">03</span>
                    <div>
                      <h5 className="text-xs font-black text-dark leading-none">{EVENTS.organized} Hosted</h5>
                      <p className="text-[9px] text-dark/40 font-secondary mt-1 leading-none">Direct angel and VC matchmaking mixers.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002366]/5 flex items-center justify-center font-black text-[10px] text-[#002366]">04</span>
                    <div>
                      <h5 className="text-xs font-black text-dark leading-none">{EVENTS.competitions}</h5>
                      <p className="text-[9px] text-dark/40 font-secondary mt-1 leading-none">VC pitch competitions and feedback panels.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-dark/5 pt-4 mt-6 text-[10px] text-dark/50 leading-relaxed font-secondary">
              <strong className="text-dark/65 font-bold">Community:</strong> {EVENTS.networking}. We connect cohort teams to verified partner networks in private matchmaking cycles monthly.
            </div>
          </motion.div>

          {/* Card 6: Business Growth Metrics (span-3) */}
          <motion.div variants={cardVariants} whileHover={{ y: -6, scale: 1.005 }} className="md:col-span-2 lg:col-span-3 bg-[#001233] text-white p-8 rounded-[32px] shadow-sm flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
            {/* Ambient lines overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

            <div className="flex justify-between items-center z-10 mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-sm">trending_up</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Ecosystem Growth Metrics</span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest rounded-md flex items-center gap-1">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" /> Certified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 my-4">
              <div>
                <h4 className="text-3xl font-black text-white tracking-tighter mb-1">94%</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-gold leading-none">VC Success Rate</p>
                <p className="text-[10px] text-white/40 font-secondary mt-2 leading-tight">Startups successfully facilitated capital rounds within 180 days of scoping.</p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <h4 className="text-3xl font-black text-white tracking-tighter mb-1">38%</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-gold leading-none">Repeat Founders</p>
                <p className="text-[10px] text-white/40 font-secondary mt-2 leading-tight">Serial entrepreneurs accelerating second or third startup cohorts with us.</p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <h4 className="text-3xl font-black text-white tracking-tighter mb-1">28+</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-gold leading-none">Active Partnerships</p>
                <p className="text-[10px] text-white/40 font-secondary mt-2 leading-tight">Corporate collaborations providing pilot sandboxes for validation testing.</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 text-[9px] font-black uppercase tracking-wider text-white/45 z-10">
              Measurable public business impact verified by RiseMate compliance audit teams.
            </div>
          </motion.div>

        </motion.div>

        {/* Call to Action Bar */}
        <div className="mt-16 bg-white border border-dark/5 p-8 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-lg font-black text-dark tracking-tight">Ready to build your funding trajectory?</h4>
            <p className="text-xs text-dark/50 font-secondary mt-1">Book a free, direct metrics evaluation call with our managing partners.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="px-6 py-4 bg-[#002366] text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-dark transition-colors whitespace-nowrap"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact?type=funding"
              className="px-6 py-4 bg-[#FAF9F6] border border-dark/5 text-dark rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-dark hover:text-white transition-all whitespace-nowrap"
            >
              Apply for Funding
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
