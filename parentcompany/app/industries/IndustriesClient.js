"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const industries = [
  {
    title: "Banking & Financial Services",
    desc: "Supporting banks, NBFCs, payment companies, and financial institutions with customer acquisition, merchant networks, digital transformation, operational efficiency, and financial inclusion initiatives.",
    icon: "account_balance",
    category: "finance",
    featured: true,
    tags: ["Digital Banking", "Merchant Networks", "Financial Inclusion"]
  },
  {
    title: "FinTech",
    desc: "Helping FinTech companies scale through strategic partnerships, customer acquisition, market expansion, compliance support, technology integration, and nationwide execution.",
    icon: "payments",
    category: "finance",
    featured: false,
    tags: ["Scale Support", "Compliance", "Partnerships"]
  },
  {
    title: "Technology & SaaS",
    desc: "Enabling technology companies to accelerate product adoption, enterprise sales, strategic alliances, and international expansion.",
    icon: "devices",
    category: "tech",
    featured: false,
    tags: ["Enterprise Sales", "Adoption", "Alliances"]
  },
  {
    title: "Artificial Intelligence",
    desc: "Supporting AI organizations with commercialization strategies, enterprise adoption, government partnerships, product deployment, and ecosystem development.",
    icon: "psychology",
    category: "tech",
    featured: true,
    tags: ["AI Adoption", "Govt Partnerships", "Commercialization"]
  },
  {
    title: "Healthcare & HealthTech",
    desc: "Helping healthcare providers and innovators expand services, improve operations, build partnerships, and adopt digital technologies.",
    icon: "health_and_safety",
    category: "sustainability",
    featured: false,
    tags: ["Digital Adoption", "Operations", "Scaling"]
  },
  {
    title: "Manufacturing",
    desc: "Supporting manufacturers with supply chain partnerships, digital transformation, export readiness, distribution networks, and market diversification.",
    icon: "precision_manufacturing",
    category: "infrastructure",
    featured: false,
    tags: ["Supply Chain", "Export Readiness", "Distribution"]
  },
  {
    title: "Retail & Consumer Business",
    desc: "Helping retail brands optimize customer engagement, expand distribution channels, strengthen omnichannel strategies, and improve operational efficiency.",
    icon: "storefront",
    category: "finance",
    featured: false,
    tags: ["Omnichannel", "Distribution", "Engagement"]
  },
  {
    title: "Education & EdTech",
    desc: "Working with educational institutions and EdTech companies to improve learner acquisition, institutional partnerships, digital learning ecosystems, and international collaborations.",
    icon: "school",
    category: "tech",
    featured: false,
    tags: ["Ecosystems", "Acquisition", "Collaborations"]
  },
  {
    title: "Government & Public Sector",
    desc: "Partnering with public institutions on digital transformation, AI adoption, capacity building, innovation programs, citizen-centric services, and public-private partnerships.",
    icon: "assured_workload",
    category: "sustainability",
    featured: false,
    tags: ["PPP Scoping", "Digital Policy", "Innovation"]
  },
  {
    title: "Infrastructure & Smart Cities",
    desc: "Supporting infrastructure developers through technology integration, stakeholder partnerships, project execution, and smart infrastructure initiatives.",
    icon: "location_city",
    category: "infrastructure",
    featured: false,
    tags: ["Smart Projects", "Stakeholders", "Execution"]
  },
  {
    title: "Energy & Sustainability",
    desc: "Helping organizations accelerate renewable energy adoption, clean technology deployment, sustainability initiatives, ESG programs, and green financing partnerships.",
    icon: "eco",
    category: "sustainability",
    featured: false,
    tags: ["Renewables", "ESG Support", "Green Finance"]
  },
  {
    title: "Logistics & Supply Chain",
    desc: "Enhancing logistics operations through digital transformation, strategic partnerships, automation, and operational excellence.",
    icon: "local_shipping",
    category: "infrastructure",
    featured: false,
    tags: ["Automation", "Operations", "Logistics Tech"]
  },
  {
    title: "Real Estate & Urban Development",
    desc: "Supporting developers with technology adoption, investor engagement, sales strategy, channel partnerships, and integrated growth planning.",
    icon: "apartment",
    category: "infrastructure",
    featured: false,
    tags: ["Urban Tech", "Investor Links", "Channel Sales"]
  },
  {
    title: "MSMEs & Family Businesses",
    desc: "Helping growing businesses modernize operations, access funding, expand into new markets, implement technology, and build long-term resilience.",
    icon: "store",
    category: "finance",
    featured: false,
    tags: ["Modernization", "Capital Access", "Resilience"]
  },
  {
    title: "Startups & Innovation Ventures",
    desc: "Providing founders with end-to-end support across business strategy, funding readiness, partnerships, technology adoption, market expansion, and execution.",
    icon: "rocket_launch",
    category: "tech",
    featured: true,
    tags: ["Venture Strategy", "Funding", "Scale Support"]
  }
];

const whyUs = [
  "Deep cross-sector expertise",
  "Integrated growth platform",
  "Strong global partnership network",
  "AI and technology capabilities",
  "Execution-driven approach",
  "Collaborative ecosystem",
  "Sustainable value creation"
];

export default function IndustriesClient() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Sectors", icon: "grid_view" },
    { id: "finance", name: "Finance & Commerce", icon: "payments" },
    { id: "tech", name: "Technology & AI", icon: "memory" },
    { id: "infrastructure", name: "Industry & Infrastructure", icon: "domain" },
    { id: "sustainability", name: "Public & Sustainability", icon: "eco" }
  ];

  const filteredIndustries = activeCategory === "all"
    ? industries
    : industries.filter(ind => ind.category === activeCategory);

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-0">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gray-50 border-b border-gray-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container-wide relative z-10 w-full text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black">Industries</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] text-black tracking-tighter mb-8 font-primary">
              Empowering Industries <br />
              <span className="text-gold">Through Innovation.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 font-secondary leading-relaxed mb-12 max-w-3xl mx-auto">
              Delivering strategic partnerships and operational execution across 15+ global sectors to drive transformative growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-14 bg-white relative">
        <div className="container-wide">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tighter leading-tight mb-4 font-primary">
              Industries We Work With
            </h2>
            <p className="text-sm text-gray-500 font-secondary max-w-md mx-auto mt-2">
              Filter by sector to see our specialized enablers and core growth capabilities.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto px-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider border transition-all duration-300 ${
                    isActive 
                      ? "bg-black border-black text-gold shadow-lg shadow-black/10 scale-105" 
                      : "bg-white border-gray-200 text-gray-600 hover:border-gold/50 hover:text-black"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Grid Layout */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredIndustries.map((ind) => (
                <motion.div
                  key={ind.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`relative border rounded-[32px] p-8 md:p-10 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden flex flex-col justify-between min-h-[320px] ${
                    ind.featured
                      ? "bg-gradient-to-br from-black via-gray-900 to-black border-black text-white md:col-span-2"
                      : "bg-gray-50 border-gray-200 text-black"
                  }`}
                >
                  {/* Subtle Background Radial Glow for Hover */}
                  <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    ind.featured ? "bg-gold/10" : "bg-gold/5"
                  }`} />

                  <div>
                    {/* Header: Icon & Top Right Hover Arrow */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border transition-all duration-300 ${
                        ind.featured
                          ? "bg-white/10 border-white/10 group-hover:bg-gold group-hover:border-gold"
                          : "bg-white border-gray-200 group-hover:bg-black group-hover:border-black"
                      }`}>
                        <span className={`material-symbols-outlined text-2xl transition-colors ${
                          ind.featured
                            ? "text-gold group-hover:text-black"
                            : "text-black group-hover:text-gold"
                        }`}>
                          {ind.icon}
                        </span>
                      </div>
                      
                      {/* Interactive Link Arrow */}
                      <span className={`material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 ${
                        ind.featured ? "text-gold" : "text-black"
                      }`}>
                        north_east
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black font-primary mb-4">
                      {ind.title}
                    </h3>
                    
                    <p className={`text-sm font-secondary leading-relaxed mb-8 ${
                      ind.featured ? "text-white/70" : "text-gray-500"
                    }`}>
                      {ind.desc}
                    </p>
                  </div>

                  {/* Footer tags (Some "not only text type") */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-dashed shrink-0 z-10 transition-colors duration-300"
                    style={{ borderColor: ind.featured ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)' }}
                  >
                    {ind.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                          ind.featured
                            ? "bg-white/5 border-white/5 text-white/80 group-hover:border-gold/30 group-hover:text-gold"
                            : "bg-white border-gray-200 text-gray-600 group-hover:border-black/20 group-hover:text-black"
                        } transition-colors duration-300`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-32 bg-black text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gold/10 blur-[150px] pointer-events-none" />
        
        <div className="container-wide relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">The Rise Mate Advantage</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-8 font-primary">
                Why Industries Choose <br/> Rise Mate Ventures
              </h2>
              <p className="text-lg text-white/50 font-secondary leading-relaxed mb-10">
                We combine deep domain expertise with an integrated ecosystem to solve complex challenges and unlock new market opportunities across diverse sectors.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyUs.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-gold/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-gold text-sm">check</span>
                  </div>
                  <span className="text-sm text-white/90 font-medium font-secondary mt-1">{point}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="container-wide text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-tight mb-8 font-primary">
            Let's Shape the Future of Your Industry.
          </h2>
          <p className="text-xl text-gray-500 font-secondary leading-relaxed mb-12">
            Whether you're transforming an established enterprise, scaling an innovative startup, or expanding into new markets, Rise Mate Ventures provides the expertise, partnerships, and execution capabilities to help you achieve your growth ambitions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-gold text-black hover:bg-black hover:text-white px-10 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-gold/20 font-primary"
          >
            Partner With Us
          </Link>
        </div>
      </section>

    </div>
  );
}
