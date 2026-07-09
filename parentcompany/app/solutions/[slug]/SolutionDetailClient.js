"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const solutionData = {
  "startups": {
    heroTitle: "Building Tomorrow's",
    heroHighlight: "Global Businesses",
    heroDesc: "Helping founders validate ideas, attract investment, build partnerships, and scale confidently from concept to global growth.",
    quote: "Every Great Business Starts With One Opportunity.",
    list1Title: "Challenges We Solve",
    list1: ["Product-market fit", "Go-to-market strategy", "Revenue generation", "Investor readiness", "Business model refinement", "Team building", "Market expansion", "Partnership development", "Technology implementation", "Scaling operations"],
    journeyTitle: "Startup Growth Journey",
    journey: [
      { step: "Validate", desc: "Customer research • Business model • Market assessment" },
      { step: "Build", desc: "Business strategy • Technology • Operations • Processes" },
      { step: "Launch", desc: "Go-to-market • Sales • Brand positioning • Customer acquisition" },
      { step: "Raise", desc: "Investment readiness • Pitch preparation • Financial planning • Investor connections" },
      { step: "Scale", desc: "Market expansion • AI adoption • International growth • Strategic partnerships" },
    ],
    solutionsTitle: "Solutions",
    solutions: ["Business Strategy", "Mentorship", "Funding Readiness", "Market Expansion", "Corporate Partnerships", "Technology Enablement", "AI Adoption", "Growth Advisory"],
    cta: "Let's Build the Next Great Business Together."
  },
  "enterprises": {
    heroTitle: "Accelerating Enterprise Growth",
    heroHighlight: "Through Innovation",
    heroDesc: "Helping organizations transform, modernize, and expand with confidence.",
    quote: "",
    list1Title: "Enterprise Solutions",
    list1: ["Digital Transformation", "Business Process Optimization", "AI Integration", "Operational Excellence", "Market Expansion", "Business Development", "Corporate Partnerships", "Sales Transformation", "Innovation Programs", "Leadership Advisory"],
    journeyTitle: "Enterprise Growth Framework",
    journey: [
      { step: "Assess", desc: "Evaluating current operations and market positioning." },
      { step: "Transform", desc: "Implementing new models and digital architectures." },
      { step: "Automate", desc: "Integrating AI and operational efficiencies." },
      { step: "Expand", desc: "Entering new markets and building strategic partnerships." },
      { step: "Scale", desc: "Driving sustainable, compounding growth." },
    ],
    solutionsTitle: "Industries",
    solutions: ["Manufacturing", "Healthcare", "Retail", "Technology", "Infrastructure", "Energy", "Education", "Government", "Financial Services"],
    cta: "Transform Today. Lead Tomorrow."
  },
  "investors": {
    heroTitle: "Investing Beyond",
    heroHighlight: "Capital",
    heroDesc: "Helping investors discover stronger opportunities while accelerating portfolio growth.",
    quote: "",
    list1Title: "Solutions",
    list1: ["Deal Flow", "Investment Readiness", "Due Diligence Support", "Portfolio Growth", "Market Intelligence", "Industry Research", "Corporate Introductions", "Growth Advisory", "Strategic Partnerships", "Expansion Support"],
    journeyTitle: "Investment Ecosystem",
    journey: [
      { step: "Family Offices", desc: "Strategic diversification and generational wealth growth." },
      { step: "Angel Investors", desc: "High-potential early-stage opportunities." },
      { step: "VC Funds", desc: "Deal flow and portfolio acceleration." },
      { step: "Private Equity", desc: "Operational turnaround and market expansion." },
      { step: "Strategic Investors", desc: "Synergistic corporate investments." },
    ],
    solutionsTitle: "Ecosystem Network",
    solutions: ["Family Offices", "Angel Investors", "VC Funds", "Private Equity", "Banks", "Strategic Investors", "Corporate Venture Capital"],
    cta: "Partner to Build the Next Generation of Market Leaders."
  },
  "government": {
    heroTitle: "Driving Public Sector",
    heroHighlight: "Innovation",
    heroDesc: "Supporting governments through AI, digital transformation, innovation ecosystems, and execution excellence.",
    quote: "",
    list1Title: "Government Solutions",
    list1: ["AI Adoption", "Digital Governance", "Smart Cities", "Citizen Services", "Capacity Building", "Innovation Labs", "Data Analytics", "Project Execution", "Public-Private Partnerships", "Knowledge Management"],
    journeyTitle: "Execution Framework",
    journey: [
      { step: "Analyze", desc: "Understanding policy goals and citizen needs." },
      { step: "Design", desc: "Architecting scalable public sector solutions." },
      { step: "Implement", desc: "Deploying technologies and processes." },
      { step: "Train", desc: "Building internal capacity and knowledge transfer." },
      { step: "Optimize", desc: "Continuous improvement of citizen services." },
    ],
    solutionsTitle: "Focus Areas",
    solutions: ["Transport", "Education", "Healthcare", "Finance", "Urban Development", "Energy", "Agriculture", "Public Administration"],
    cta: "Building Smarter Governments Together."
  },
  "india-entry": {
    heroTitle: "Your Trusted Partner for",
    heroHighlight: "Business Expansion in India",
    heroDesc: "Helping international organizations establish, expand, and grow successfully across one of the world's fastest-growing economies.",
    quote: "Why Rise Mate Ventures? Unlike traditional consulting firms that stop after delivering recommendations, we work alongside your organization to execute your market entry strategy, build local partnerships, and establish operational capabilities.",
    list1Title: "India Entry Solutions",
    list1: ["Market Research", "Entry Strategy", "Regulatory Guidance", "Business Setup Support", "Localization", "Strategic Partnerships", "Distribution Networks", "Sales Enablement", "Recruitment Support", "Operational Execution", "Technology Integration", "Government Liaison Support"],
    journeyTitle: "Our India Expansion Framework",
    journey: [
      { step: "Research", desc: "Market dynamics, competition, and regulatory landscape." },
      { step: "Plan", desc: "Business models, timelines, and capitalization." },
      { step: "Establish", desc: "Legal setup, infrastructure, and hiring." },
      { step: "Partner", desc: "Distribution, supply chain, and local alliances." },
      { step: "Launch", desc: "Go-to-market and brand positioning." },
      { step: "Execute", desc: "Sales activation and operational management." },
      { step: "Scale", desc: "National expansion and continuous growth." },
    ],
    solutionsTitle: "Why India?",
    solutions: ["Fastest-growing major economy", "Large & diverse consumer market", "Expanding digital infrastructure", "Strong startup & innovation ecosystem", "Manufacturing & supply chain hub", "Supportive government initiatives"],
    cta: "Let's build your India success story."
  }
};

export default function SolutionDetailClient({ slug }) {
  const data = solutionData[slug];

  if (!data) return null;

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gray-50 border-b border-gray-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container-wide relative z-10 w-full text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <Link href="/solutions" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 hover:text-black transition-colors">Solutions</Link>
              <span className="text-gray-300 mx-1">/</span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black">{slug.replace("-", " ")}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] text-black tracking-tighter mb-8 font-primary">
              {data.heroTitle} <br />
              <span className="text-gold">{data.heroHighlight}.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 font-secondary leading-relaxed mb-12">
              {data.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Section (if exists) */}
      {data.quote && (
        <section className="py-20 bg-white border-b border-gray-200">
          <div className="container-wide">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="material-symbols-outlined text-4xl text-gold/50 mb-6">format_quote</span>
              <h2 className="text-2xl md:text-4xl font-black text-black leading-snug font-primary">
                {data.quote}
              </h2>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content Layout */}
      <section className="py-24 bg-white relative">
        <div className="container-wide max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column (Lists) */}
            <div className="lg:col-span-5 space-y-16">
              
              {/* List 1 */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gold mb-6 block border-b border-gray-200 pb-4">
                  {data.list1Title}
                </h3>
                <ul className="space-y-4">
                  {data.list1.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[10px] text-black">check</span>
                      </div>
                      <span className="text-base text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions Grid */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gold mb-6 block border-b border-gray-200 pb-4">
                  {data.solutionsTitle}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.solutions.map((item, i) => (
                    <span key={i} className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-xs font-bold text-gray-600 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (Journey / Framework) */}
            <div className="lg:col-span-7">
              <div className="bg-gray-50 border border-gray-200 rounded-[40px] p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-black text-black mb-10 font-primary">
                  {data.journeyTitle}
                </h3>
                
                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                  {data.journey.map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white group-hover:border-gold group-hover:bg-gold text-gray-500 group-hover:text-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                        <span className="font-black text-sm">{i + 1}</span>
                      </div>
                      
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-gray-200 bg-white shadow-sm group-hover:shadow-md group-hover:border-gold/30 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-black text-black text-lg font-primary">{step.step}</h4>
                        </div>
                        <p className="text-sm text-gray-500 font-secondary leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pt-20">
        <div className="container-wide">
          <div className="bg-black text-white rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-10 font-primary relative z-10">
              {data.cta}
            </h2>
            <Link
              href="/contact"
              className="relative z-10 inline-flex items-center justify-center bg-gold text-black hover:bg-white hover:text-black px-10 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 font-primary"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
