"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ecosystemNodes = [
  {
    name: "Startups & Entrepreneurs",
    icon: "rocket_launch",
    desc: "Fostering early-stage innovation and growth through comprehensive venture-building support.",
    capabilities: ["Pre-seed & seed capital access", "Venture building & validation", "Go-to-market strategies", "Investor pitch readiness"]
  },
  {
    name: "Enterprises & Corporates",
    icon: "domain",
    desc: "Scoping growth strategies, digital transformation, and corporate joint ventures.",
    capabilities: ["Open innovation partnerships", "Digital transformation scaling", "JV & M&A advisory", "Corporate venture capital"]
  },
  {
    name: "Investors & Venture Funds",
    icon: "payments",
    desc: "Matching premium investment opportunities with institutional and private funds.",
    capabilities: ["Targeted deal-flow matching", "Due diligence acceleration", "Portfolio growth enablers", "Strategic exit planning"]
  },
  {
    name: "Banks & Institutions",
    icon: "account_balance",
    desc: "Facilitating debt financing, working capital, and structured trade finance.",
    capabilities: ["Institutional credit access", "Syndicated debt structures", "Working capital advisory", "Financing partner networks"]
  },
  {
    name: "FinTech Companies",
    icon: "currency_exchange",
    desc: "Accelerating deployment of modern financial technology, payment rails, and API integrations.",
    capabilities: ["Payment infrastructure setup", "Regulatory compliance alignment", "Strategic banking partnerships", "API integration support"]
  },
  {
    name: "Govt & Public Sector",
    icon: "assured_workload",
    desc: "Collaborating on large-scale public initiatives, digital infrastructure, and smart city technology.",
    capabilities: ["PPP project scoping", "Digital policy advisory", "Public tender preparation", "Capacity building initiatives"]
  },
  {
    name: "AI & Tech Partners",
    icon: "memory",
    desc: "Integrating bleeding-edge AI models, predictive intelligence, and automation frameworks.",
    capabilities: ["Enterprise AI deployment", "Machine learning custom dev", "Workflow automation strategy", "Cloud and DevOps integration"]
  },
  {
    name: "Channel Partners",
    icon: "share",
    desc: "Expanding geographical reach through localized sales agents, brokers, and distributor chains.",
    capabilities: ["Sales network recruitment", "Localized agency structures", "Distribution agreement design", "Regional marketing scale"]
  },
  {
    name: "Academic Institutions",
    icon: "school",
    desc: "Connecting university research hubs, incubators, and patent networks with commercial markets.",
    capabilities: ["IP commercialization support", "Academic incubator links", "Talent pipeline curation", "R&D funding collaboration"]
  },
  {
    name: "Global Markets",
    icon: "public",
    desc: "Guiding cross-border operations, regulatory navigation, and international scale.",
    capabilities: ["Cross-border tax & compliance", "International entity setup", "Local currency hedging", "Global supply chain scoping"]
  },
  {
    name: "Experts & Advisors",
    icon: "workspace_premium",
    desc: "Leveraging deep domain knowledge from senior executives, legal leads, and industry veterans.",
    capabilities: ["Fractional CXO advisory", "Strategic legal guidance", "Industry-specific audits", "Board governance advisory"]
  },
  {
    name: "Execution Teams",
    icon: "group",
    desc: "Providing hands-on implementation specialists, project managers, and operations leaders.",
    capabilities: ["Project management office", "Operational rollout support", "SOP development & audits", "KPI performance tracking"]
  }
];

const pillars = [
  { title: "Business Growth", desc: "Helping organizations identify opportunities, refine strategies, and accelerate growth through structured planning and expert guidance.", icon: "trending_up" },
  { title: "Strategic Partnerships", desc: "Building long-term relationships with corporations, financial institutions, governments, technology companies, and distribution networks to unlock new opportunities.", icon: "handshake" },
  { title: "Capital Access", desc: "Connecting businesses with investors, venture funds, family offices, banks, government funding programs, and strategic financing partners.", icon: "account_balance" },
  { title: "Technology & Innovation", desc: "Supporting organizations through AI adoption, automation, digital transformation, data intelligence, and technology implementation.", icon: "memory" },
  { title: "Market Expansion", desc: "Helping organizations expand into new cities, states, countries, and international markets with localized execution strategies.", icon: "public" },
  { title: "Execution Excellence", desc: "Deploying operational teams, channel partners, implementation specialists, and business development resources to deliver measurable outcomes.", icon: "precision_manufacturing" }
];

const beneficiaries = [
  {
    title: "Startups",
    points: ["Venture building", "Market validation", "Go-to-market support", "Investor readiness", "Strategic mentorship"]
  },
  {
    title: "Enterprises",
    points: ["Digital transformation", "Market expansion", "Strategic partnerships", "Process optimization", "Growth acceleration"]
  },
  {
    title: "Government Organizations",
    points: ["Digital initiatives", "AI implementation", "Capacity building", "Public-private collaborations", "Innovation ecosystems"]
  },
  {
    title: "Investors",
    points: ["High quality investment opportunity", "Portfolio support", "Market intelligence", "Growth acceleration", "Strategic partnerships"]
  }
];

export default function EcosystemClient() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const outerNodes = ecosystemNodes
    .filter((_, i) => i % 2 === 0)
    .map((node, i) => ({ ...node, globalIndex: i * 2, localIndex: i }));

  const innerNodes = ecosystemNodes
    .filter((_, i) => i % 2 !== 0)
    .map((node, i) => ({ ...node, globalIndex: i * 2 + 1, localIndex: i }));

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />

        <div className="container-wide relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black">Our Ecosystem</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black leading-[1.05] text-black tracking-tighter mb-8 font-primary">
                One Ecosystem. <br />
                <span className="text-gold">Unlimited Growth Opportunities.</span>
              </h1>

              <p className="text-lg text-gray-500 font-secondary leading-relaxed mb-10">
                Rise Mate Ventures is more than a business advisory or investment platform. We are a Global Business Growth & Venture Ecosystem that connects businesses with the people, capital, technology, partnerships, and execution capabilities they need to grow confidently across markets.
                <br /><br />
                Our ecosystem brings together startups, enterprises, investors, financial institutions, technology partners, governments, and execution teams to transform opportunities into measurable business outcomes.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-black text-gold hover:bg-gold hover:text-black px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-black/10 font-primary"
              >
                Become a Partner
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-6 relative h-[500px] lg:h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-gray-200"
            >
              <Image
                src="/ecosystem_hero.png"
                alt="Global Business Ecosystem Network"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE ECOSYSTEM DIAGRAM */}
      <section className="py-14 md:py-20 bg-gray-50 border-b border-gray-200 overflow-hidden">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">The Network</span>
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-[1.1] mb-6 font-primary">
              The Rise Mate Ventures Ecosystem
            </h2>
            <p className="text-base text-gray-500 font-secondary leading-relaxed">
              Every connection within our ecosystem creates new opportunities for collaboration, innovation, market access, and sustainable business growth.
            </p>
          </div>

          <div className="relative w-full max-w-[800px] aspect-square mx-auto flex items-center justify-center group/ecosystem">

            {/* Custom Constellation & Laser Flow CSS Styles */}
            <style>{`
              @keyframes RMVEcosystemBob0 {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                50% { transform: translate(-50%, -50%) translateY(-6px); }
              }
              @keyframes RMVEcosystemBob1 {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                50% { transform: translate(-50%, -50%) translateY(-4px) translateX(2px); }
              }
              @keyframes RMVEcosystemBob2 {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                50% { transform: translate(-50%, -50%) translateY(-5px) translateX(-2px); }
              }
              @keyframes RMVEcosystemBob3 {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                50% { transform: translate(-50%, -50%) translateY(-7px); }
              }
              @keyframes RMVEcosystemBob4 {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                50% { transform: translate(-50%, -50%) translateY(-3px) translateX(3px); }
              }
              @keyframes RMVEcosystemBob5 {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                50% { transform: translate(-50%, -50%) translateY(-5px) translateX(-3px); }
              }

              .rmv-bob-0 { animation: RMVEcosystemBob0 4.5s ease-in-out infinite; }
              .rmv-bob-1 { animation: RMVEcosystemBob1 5.2s ease-in-out infinite; }
              .rmv-bob-2 { animation: RMVEcosystemBob2 4.8s ease-in-out infinite; }
              .rmv-bob-3 { animation: RMVEcosystemBob3 3.8s ease-in-out infinite; }
              .rmv-bob-4 { animation: RMVEcosystemBob4 5.5s ease-in-out infinite; }
              .rmv-bob-5 { animation: RMVEcosystemBob5 4.2s ease-in-out infinite; }

              @keyframes RMVEcosystemLineFlow {
                from { stroke-dashoffset: 24; }
                to { stroke-dashoffset: 0; }
              }
              .rmv-flow-line {
                stroke-dasharray: 6 6;
                animation: RMVEcosystemLineFlow 1.2s linear infinite;
              }
            `}</style>

            {/* Background Orbits & Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Outer Orbit Circle */}
              <circle cx="50%" cy="50%" r="50%" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />
              {/* Inner Orbit Circle */}
              <circle cx="50%" cy="50%" r="32.5%" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />

              {/* Connection Lines to Outer Nodes */}
              {outerNodes.map((node, i) => {
                const angle = (i / outerNodes.length) * 2 * Math.PI - Math.PI / 2;
                const x2 = 50 + Math.cos(angle) * 50;
                const y2 = 50 + Math.sin(angle) * 50;
                const isHovered = hoveredNode === node.globalIndex;
                return (
                  <line
                    key={`outer-line-${i}`}
                    x1="50%"
                    y1="50%"
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={isHovered ? "#C9A84C" : "#E2E8F0"}
                    strokeWidth={isHovered ? "2.5" : "1"}
                    className={isHovered ? "rmv-flow-line" : "opacity-40 transition-all duration-350"}
                    style={{
                      filter: isHovered ? "drop-shadow(0 0 4px rgba(201,168,76,0.6))" : "none"
                    }}
                  />
                );
              })}

              {/* Connection Lines to Inner Nodes */}
              {innerNodes.map((node, i) => {
                const angle = (i / innerNodes.length) * 2 * Math.PI - Math.PI / 2;
                const x2 = 50 + Math.cos(angle) * 32.5;
                const y2 = 50 + Math.sin(angle) * 32.5;
                const isHovered = hoveredNode === node.globalIndex;
                return (
                  <line
                    key={`inner-line-${i}`}
                    x1="50%"
                    y1="50%"
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={isHovered ? "#C9A84C" : "#E2E8F0"}
                    strokeWidth={isHovered ? "2.5" : "1"}
                    className={isHovered ? "rmv-flow-line" : "opacity-40 transition-all duration-350"}
                    style={{
                      filter: isHovered ? "drop-shadow(0 0 4px rgba(201,168,76,0.6))" : "none"
                    }}
                  />
                );
              })}
            </svg>

            {/* Center Node containing dynamic Hover Details */}
            <div className="absolute z-30 w-36 h-36 md:w-56 md:h-56 bg-white border border-gold shadow-[0_0_50px_rgba(201,168,76,0.15)] rounded-full flex flex-col items-center justify-center cursor-default p-4 md:p-6 overflow-hidden select-none">
              <AnimatePresence mode="wait">
                {hoveredNode === null ? (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <span className="text-gold font-serif text-3xl md:text-5xl font-black tracking-widest leading-none">RMV</span>
                    <span className="text-[7px] md:text-[9px] text-black uppercase tracking-[0.3em] font-black mt-2 text-center">RiseMatess<br />Ventures</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={hoveredNode}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center text-center w-full"
                  >
                    <span className="material-symbols-outlined text-gold text-lg md:text-2xl mb-1 md:mb-1.5">{ecosystemNodes[hoveredNode].icon}</span>
                    <h4 className="text-[8px] md:text-[10px] font-black text-black uppercase tracking-wider leading-tight mb-1 max-w-[120px] md:max-w-[170px] break-words">
                      {ecosystemNodes[hoveredNode].name}
                    </h4>
                    <p className="text-[6px] md:text-[9px] text-gray-500 font-secondary leading-tight md:leading-normal max-w-[110px] md:max-w-[160px] line-clamp-3">
                      {ecosystemNodes[hoveredNode].desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-[-10px] border border-gold/15 rounded-full animate-ping pointer-events-none" />
            </div>

            {/* Outer Nodes */}
            {outerNodes.map((node, i) => {
              const angle = (i / outerNodes.length) * 2 * Math.PI - Math.PI / 2;
              const left = `calc(50% + ${Math.cos(angle) * 50}%)`;
              const top = `calc(50% + ${Math.sin(angle) * 50}%)`;

              return (
                <div
                  key={node.globalIndex}
                  className={`absolute z-20 flex flex-col items-center justify-center pointer-events-auto rmv-bob-${i % 6}`}
                  style={{ left, top }}
                  onMouseEnter={() => setHoveredNode(node.globalIndex)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border cursor-pointer ${hoveredNode === node.globalIndex ? 'bg-gold border-gold scale-125 z-40' : 'bg-white border-gray-200 hover:border-gold'}`}>
                    <span className={`material-symbols-outlined text-lg md:text-xl transition-colors duration-300 ${hoveredNode === node.globalIndex ? 'text-black' : 'text-gray-500'}`}>
                      {node.icon}
                    </span>
                  </div>
                  <span className={`mt-2 text-[8px] md:text-[9px] font-black uppercase tracking-wider text-center leading-tight transition-colors duration-300 max-w-[80px] md:max-w-[100px] break-words ${hoveredNode === node.globalIndex ? 'text-gold scale-105 font-black' : 'text-gray-500'}`}>
                    {node.name.split(' & ')[0]}
                  </span>
                </div>
              );
            })}

            {/* Inner Nodes */}
            {innerNodes.map((node, i) => {
              const angle = (i / innerNodes.length) * 2 * Math.PI - Math.PI / 2;
              const left = `calc(50% + ${Math.cos(angle) * 32.5}%)`;
              const top = `calc(50% + ${Math.sin(angle) * 32.5}%)`;

              return (
                <div
                  key={node.globalIndex}
                  className={`absolute z-20 flex flex-col items-center justify-center pointer-events-auto rmv-bob-${(i + 3) % 6}`}
                  style={{ left, top }}
                  onMouseEnter={() => setHoveredNode(node.globalIndex)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border cursor-pointer ${hoveredNode === node.globalIndex ? 'bg-gold border-gold scale-125 z-40' : 'bg-white border-gray-200 hover:border-gold'}`}>
                    <span className={`material-symbols-outlined text-lg md:text-xl transition-colors duration-300 ${hoveredNode === node.globalIndex ? 'text-black' : 'text-gray-500'}`}>
                      {node.icon}
                    </span>
                  </div>
                  <span className={`mt-2 text-[8px] md:text-[9px] font-black uppercase tracking-wider text-center leading-tight transition-colors duration-300 max-w-[80px] md:max-w-[100px] break-words ${hoveredNode === node.globalIndex ? 'text-gold scale-105 font-black' : 'text-gray-500'}`}>
                    {node.name.split(' & ')[0]}
                  </span>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* 3. OUR ECOSYSTEM PILLARS */}
      <section className="py-14 md:py-20 bg-white border-b border-gray-200">
        <div className="container-wide max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-[1.1] font-primary mb-4">
              Our Ecosystem Pillars
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-gray-200 p-8 md:p-10 rounded-[32px] hover:border-gold/50 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-200 group-hover:bg-black group-hover:border-black transition-colors">
                  <span className="material-symbols-outlined text-black group-hover:text-gold transition-colors text-2xl">
                    {pillar.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-black font-primary mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-500 font-secondary leading-relaxed flex-grow">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO BENEFITS - CREATIVE CARDS */}
      <section className="py-14 md:py-20 bg-gray-50 relative overflow-hidden">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">Stakeholders</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter leading-[1.1] font-primary">
                Who Benefits from Our Ecosystem?
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-lg animate-[spin_10s_linear_infinite]">
              <span className="material-symbols-outlined text-black">all_inclusive</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {beneficiaries.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-gray-200 p-8 md:p-12 rounded-[40px] shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300 group"
              >
                <h3 className="text-3xl md:text-4xl font-black text-black mb-8 font-primary pb-6 border-b border-gray-100 group-hover:border-gold/30 transition-colors">
                  {b.title}
                </h3>
                <ul className="space-y-4">
                  {b.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-gold/10 group-hover:border-gold/20 transition-colors">
                        <span className="material-symbols-outlined text-black text-xs">done</span>
                      </div>
                      <span className="text-base text-gray-600 font-secondary font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GROWTH PHILOSOPHY */}
      <section className="py-32 bg-black text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <span className="material-symbols-outlined text-6xl text-gold/30 mb-8 block">format_quote</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-snug mb-8 font-primary">
            Growth is never created by capital alone. <br />
            <span className="text-gray-400">It requires vision, market understanding, technology, strategic relationships, operational excellence, and continuous execution.</span>
          </h2>
          <p className="text-lg text-gold font-secondary tracking-wide uppercase font-bold">
            Rise Mate Ventures integrates these capabilities into one ecosystem designed to help businesses scale efficiently and sustainably.
          </p>
        </motion.div>
      </section>

      {/* 6. CONVERSION BANNER */}
      <section className="py-20 md:py-28 bg-white overflow-hidden relative border-t border-gray-200">
        <div className="container-wide relative z-10 max-w-5xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-[40px] px-8 py-16 md:py-24 text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-6 inline-block">Partner Scoping Initiated</span>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight mb-8 font-primary max-w-3xl mx-auto">
              Join the Rise Mate Ventures Ecosystem
            </h2>
            <p className="text-base text-gray-600 font-secondary leading-relaxed mb-12 max-w-2xl mx-auto">
              Whether you're a startup, enterprise, investor, technology provider, or institution, our ecosystem is designed to help you create meaningful partnerships and unlock sustainable growth.
            </p>

            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center bg-black text-gold hover:bg-gold hover:text-black px-10 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-black/10 font-primary"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
