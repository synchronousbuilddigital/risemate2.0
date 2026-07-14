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

  // Inner ring (CW): Banks, Govt, Global Markets, Channel Partners, Execution Teams, Enterprises
  const innerRingNodes = [3, 5, 9, 7, 11, 1].map(idx => ({ ...ecosystemNodes[idx], globalIndex: idx }));
  // Outer ring (CCW): Experts, Academic, AI, FinTech, Investors, Startups
  const outerRingNodes = [10, 8, 6, 4, 2, 0].map(idx => ({ ...ecosystemNodes[idx], globalIndex: idx }));

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
                RiseMates Ventures is more than a business advisory or investment platform. We are a Global Business Growth &amp; Venture Ecosystem that connects businesses with the people, capital, technology, partnerships, and execution capabilities they need to grow confidently across markets.
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
              The RiseMates Ventures Ecosystem
            </h2>
            <p className="text-base text-gray-500 font-secondary leading-relaxed">
              Every connection within our ecosystem creates new opportunities for collaboration, innovation, market access, and sustainable business growth.
            </p>
          </div>

          <div className="relative w-full max-w-[760px] aspect-square mx-auto select-none">

            <style>{`
              @keyframes ecoSpinCW  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              @keyframes ecoSpinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
              @keyframes ecoNodeCW  { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
              @keyframes ecoNodeCCW { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
              @keyframes ecoHubPing { 0% { opacity:.5; transform:scale(1); } 100% { opacity:0; transform:scale(2); } }
              .eco-ring-inner { animation: ecoSpinCW  35s linear infinite; }
              .eco-ring-outer { animation: ecoSpinCW  55s linear infinite; }
              .eco-node-inner { animation: ecoNodeCW  35s linear infinite; }
              .eco-node-outer { animation: ecoNodeCW  55s linear infinite; }
            `}</style>

            {/* Inner Ring (Clockwise) */}
            <div
              className="eco-ring-inner absolute rounded-full border border-dashed border-gold/35"
              style={{ width: '58%', height: '58%', top: '21%', left: '21%', pointerEvents: 'none' }}
            >
              {innerRingNodes.map((node, i) => {
                const angle = (i / innerRingNodes.length) * 360;
                const isHov = hoveredNode === node.globalIndex;
                return (
                  <div key={node.globalIndex} style={{
                    position: 'absolute', top: 0, left: '50%',
                    width: 0, height: '50%',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${angle}deg)`
                  }}>
                    <div
                      className="eco-node-inner"
                      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}
                      onMouseEnter={() => setHoveredNode(node.globalIndex)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <div className={`rounded-full flex items-center justify-center border shadow-md cursor-pointer transition-all duration-300 ${isHov ? 'bg-gold border-gold' : 'bg-white border-gray-200 hover:border-gold/60'}`}
                        style={{ 
                          width: 48, 
                          height: 48,
                          transform: `rotate(${-angle}deg) scale(${isHov ? 1.25 : 1})`,
                          transformOrigin: 'center'
                        }}>
                        <span className={`material-symbols-outlined text-base transition-colors duration-300 ${isHov ? 'text-black' : 'text-gray-500'}`}>{node.icon}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Outer Ring (Clockwise) */}
            <div
              className="eco-ring-outer absolute rounded-full border border-dashed border-gold/15"
              style={{ width: '94%', height: '94%', top: '3%', left: '3%', pointerEvents: 'none' }}
            >
              {outerRingNodes.map((node, i) => {
                const angle = (i / outerRingNodes.length) * 360;
                const isHov = hoveredNode === node.globalIndex;
                return (
                  <div key={node.globalIndex} style={{
                    position: 'absolute', top: 0, left: '50%',
                    width: 0, height: '50%',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${angle}deg)`
                  }}>
                    <div
                      className="eco-node-outer"
                      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}
                      onMouseEnter={() => setHoveredNode(node.globalIndex)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <div className={`rounded-full flex items-center justify-center border shadow-lg cursor-pointer transition-all duration-300 ${isHov ? 'bg-gold border-gold' : 'bg-white border-gray-200 hover:border-gold/60'}`}
                        style={{ 
                          width: 56, 
                          height: 56,
                          transform: `rotate(${-angle}deg) scale(${isHov ? 1.25 : 1})`,
                          transformOrigin: 'center'
                        }}>
                        <span className={`material-symbols-outlined text-lg transition-colors duration-300 ${isHov ? 'text-black' : 'text-gray-500'}`}>{node.icon}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Hub */}
            <div className="absolute z-30 flex items-center justify-center"
              style={{ width: 172, height: 172, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="absolute inset-0 rounded-full border border-gold/30"
                style={{ animation: 'ecoHubPing 2.2s ease-out infinite' }} />
              <div className="absolute inset-0 rounded-full border border-gold/20"
                style={{ animation: 'ecoHubPing 2.2s ease-out 1.1s infinite' }} />
              <div className="w-full h-full rounded-full bg-white border border-gold shadow-[0_0_60px_rgba(201,168,76,0.18)] flex flex-col items-center justify-center overflow-hidden cursor-default p-4">
                <AnimatePresence mode="wait">
                  {hoveredNode === null ? (
                    <motion.div key="default"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}
                      className="flex flex-col items-center justify-center">
                      <span className="text-gold font-serif text-3xl md:text-4xl font-black tracking-widest leading-none">RMV</span>
                      <span className="text-[7px] text-black uppercase tracking-[0.3em] font-black mt-1.5 text-center">RiseMates<br />Ventures</span>
                    </motion.div>
                  ) : (
                    <motion.div key={hoveredNode}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}
                      className="flex flex-col items-center justify-center text-center w-full">
                      <span className="material-symbols-outlined text-gold text-2xl mb-1">{ecosystemNodes[hoveredNode].icon}</span>
                      <h4 className="text-[9px] font-black text-black uppercase tracking-wider leading-tight mb-1 max-w-[140px]">{ecosystemNodes[hoveredNode].name}</h4>
                      <p className="text-[7px] text-gray-500 leading-snug max-w-[130px] line-clamp-3">{ecosystemNodes[hoveredNode].desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

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
            RiseMates Ventures integrates these capabilities into one ecosystem designed to help businesses scale efficiently and sustainably.
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
              Join the RiseMates Ventures Ecosystem
            </h2>
            <p className="text-base text-gray-600 font-secondary leading-relaxed mb-12 max-w-2xl mx-auto">
              Whether you are a startup, enterprise, investor, technology provider, or institution, our ecosystem is designed to help you create meaningful partnerships and unlock sustainable growth.
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
