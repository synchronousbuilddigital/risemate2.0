"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Counter from "./components/Counter";
import Magnetic from "./components/Magnetic";
import { SERVICES_DATA } from "../lib/servicesData";

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const cardHover = {
  hover: {
    y: -10,
    boxShadow: "0 30px 60px -15px rgba(0, 35, 102, 0.15)",
    borderColor: "rgba(0, 35, 102, 0.2)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const services = [
  {
    title: "Circular Supply Chain & Sustainable Commerce",
    entity: "BWorth",
    tagline: "Preserving Capital & Environmental Equity",
    icon: "eco",
    desc: "Leading-edge circular economy solutions that help consumer brands buy back, recycle, and monetize excess inventory through loyalty systems.",
    benefits: [
      "Significant carbon footprint reduction",
      "Monetize deadstock through BWorth Coins system",
      "Dramatically improve customer retention and sustainability metrics"
    ],
    process: "Inventory Audit → Infrastructure Customization → Loyalty API Integration → Lifecycle Deployment.",
    deliverables: "Whitelabel Circular Commerce App, Custom Loyalty Coins, Dashboard with Live CO2 Tracking.",
    results: "25,000+ items saved, average +25% client repeat purchase rate, verified ESG audit logs.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50/50",
    borderColor: "hover:border-cyan-200",
    logo: "/BWORTH.jpg"
  },
  {
    title: "Precision Managed Sales & Execution",
    entity: "Vega Vrudhi",
    tagline: "Bridging Digital Mandates with Physical Scale",
    icon: "groups",
    desc: "Direct field-force scaling, rapid merchant onboarding, and strategic physical customer activation pipelines for high-growth sectors.",
    benefits: [
      "Nationwide on-ground execution in Tier 1 and Tier 2 cities",
      "Algorithmic lead distribution and field agent performance tracking",
      "Optimized client conversion rates via trained, specialized teams"
    ],
    process: "Territory Mapping → Custom Staffing Alignment → Real-time Onboarding Activation → Lead Fulfillment.",
    deliverables: "Nationwide Field Sales Team, Custom Merchant Onboarding Software, Analytics Dashboard.",
    results: "10,000+ active onboarding cycles, 95%+ verified client acquisition compliance.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50/50",
    borderColor: "hover:border-emerald-200",
    logo: "/VEGA.png"
  },
  {
    title: "AI Automation & Deep-Tech IoT Engineering",
    entity: "RYM Grenergy",
    tagline: "Energy Sovereignty & Enterprise Intelligence",
    icon: "memory",
    desc: "Next-generation energy management solutions, automated vehicle routing systems, and universal document intelligence platforms.",
    benefits: [
      "Optimized clean energy grid architectures with ULTRON",
      "Automated document processing via advanced neural engines",
      "Real-time IoT sensory networks for safety warnings"
    ],
    process: "Edge Sensor Deployment → IoT Controller Setup → AI/ML Neural Tuning → Enterprise Integration.",
    deliverables: "ULTRON Energy Platform, Intellexa AI Analyzer License, REEWS Early-Warning API Access.",
    results: "Average 32% energy bill reduction, 90%+ processing speed improvement.",
    color: "text-amber-600",
    bgColor: "bg-amber-50/30",
    borderColor: "hover:border-amber-200",
    logo: "/RYM.png"
  },
  {
    title: "High-Performance Brand Identity & Autonomous AI",
    entity: "Synchronous",
    tagline: "Algorithmic Growth & Elite Visual Legacies",
    icon: "smart_toy",
    desc: "Synthesizing custom autonomous AI agents, high-conversion visual design, and data-backed digital marketing pipelines.",
    benefits: [
      "Bespoke visual identity and digital interface architectures",
      "Custom AI agents that automate customer service and operations",
      "Algorithmic advertising optimization to drive down client acquisition costs"
    ],
    process: "Neural Arbitrage Audit → Visual Identity System Design → Autonomous Agent Injection → Scaled Automation.",
    deliverables: "Interactive Brand Style Guidelines, High-Conversion Web Architecture, Active AI Agents.",
    results: "Compound digital ROI, average 60% customer support operational savings.",
    color: "text-orange-500",
    bgColor: "bg-orange-50/50",
    borderColor: "hover:border-orange-200",
    logo: "/sync.jpg"
  }
];

const testimonials = [
  {
    name: "Siddharth Mehta",
    role: "CEO & Founder",
    company: "GreenLoop Apparel",
    logo: "/BWORTH.jpg",
    photo: "https://i.pravatar.cc/150?u=siddharth",
    rating: 5,
    review: "RiseMate completely transformed our sustainability strategy. By integrating the BWorth circular commerce engine, we saw direct improvements in customer retention and managed to save over 15,000 garments from landfills. Their team understands the metrics that investors care about.",
    metrics: {
      funding: "₹12 Cr Raised",
      growth: "+180% Revenue",
      users: "50k+ Active Users",
      saved: "40% Time Saved"
    }
  },
  {
    name: "Neha Sharma",
    role: "Co-Founder",
    company: "SwiftPay Solutions",
    logo: "/VEGA.png",
    photo: "https://i.pravatar.cc/150?u=neha",
    rating: 5,
    review: "The execution capabilities of Vega Vrudhi under the RiseMate umbrella are outstanding. We needed to onboard 15,000 merchants across North India in three months, and they handled it with precision. Deployed on-ground field forces made the difference.",
    metrics: {
      funding: "₹28 Cr Series A",
      growth: "+320% Merchants",
      users: "200k+ End Users",
      saved: "35% Onboarding Cost"
    }
  },
  {
    name: "Amit Patel",
    role: "Chief Technology Officer",
    company: "EnerGrid Systems",
    logo: "/RYM.png",
    photo: "https://i.pravatar.cc/150?u=amit",
    rating: 5,
    review: "RYM Grenergy's ULTRON platform optimized our grid operations within weeks. We achieved significant cost savings and obtained certifications that helped us secure our growth funding round. The deep-tech integration was seamless.",
    metrics: {
      funding: "₹15 Cr Facilitated",
      growth: "32% Energy Saved",
      users: "12 Enterprise Clients",
      saved: "50% Development Time"
    }
  },
  {
    name: "Vikram Malhotra",
    role: "Founder & CEO",
    company: "AI-Med Devices",
    logo: "/sync.jpg",
    photo: "https://i.pravatar.cc/150?u=vikram",
    rating: 5,
    review: "Synchronous helped us build our brand visual system and integrate custom LLM support agents. It saved our operational team endless hours of customer service tickets and boosted order values by 28%. Highest quality execution I've seen in years.",
    metrics: {
      funding: "₹18 Cr Series A",
      growth: "+140% Growth",
      users: "30+ Hospitals",
      saved: "60% Support Saved"
    }
  },
  {
    name: "Priyanka Sen",
    role: "Co-Founder & CEO",
    company: "AeroEco Logistics",
    logo: "/VEGA.png",
    photo: "https://i.pravatar.cc/150?u=priyanka",
    rating: 5,
    review: "The managed sales infrastructure provided by Vega Vrudhi was a game changer for our FMCG expansion. We scale-deployed field campaigns across 8 states in record time, which was critical for our Series B round validation.",
    metrics: {
      funding: "₹45 Cr Series B",
      growth: "+210% Retail",
      users: "850+ Outlets",
      saved: "45% CAC Decreased"
    }
  },
  {
    name: "Rohan Deshmukh",
    role: "CTO",
    company: "CircularThread",
    logo: "/BWORTH.jpg",
    photo: "https://i.pravatar.cc/150?u=rohan",
    rating: 5,
    review: "BWorth's recycling engine was integrated into our app within three weeks. Our customers love the coin-reward system, and the automated carbon tracking API has added huge ESG validation to our investor deck.",
    metrics: {
      funding: "₹7 Cr Seed Round",
      growth: "+250% Recycled",
      users: "18k+ Recyclers",
      saved: "30% Dev Cost Saved"
    }
  }
];

const caseStudies = [
  {
    title: "Scaling Sustainable Retail via Circular Economy Integration",
    client: "EcoWear India",
    stage: "Seed Stage",
    industry: "Sustainable Retail / E-commerce",
    challenge: "High customer acquisition costs and excess inventory resulting in capital blockages.",
    solution: "Custom BWorth circular loyalty system integrated into their e-commerce platform. Allowed users to recycle old clothes for store currency.",
    process: "Audited inventory → Deployed whitelabel app → Marketed sustainability program → Tracked carbon offset.",
    results: "25,000+ items recycled, customer lifetime value increased by 42%, conversion rate boosted from 1.8% to 3.5%.",
    funding: "Secured ₹8.5 Cr Seed Round supported by audited circularity metrics.",
    beforeAfter: { before: "1.8% CR", after: "3.5% CR" }
  },
  {
    title: "Deploying Nationwide On-ground Merchant Acquisition",
    client: "PaySwift FinTech",
    stage: "Series A Stage",
    industry: "FinTech / Payments",
    challenge: "High friction in onboarding retail merchants in semi-urban areas using online methods.",
    solution: "Vega Vrudhi deployed managed, specialized field teams equipped with mobile identity scanning apps for real-time compliance validation.",
    process: "Territory selection → Recruited & trained field force → Deployed field application → Real-time lead review.",
    results: "Onboarded 50,000+ retail merchants across 14 cities in 90 days, with 98% compliance accuracy.",
    funding: "Helped secure ₹35 Cr Series A round via documented active transaction points.",
    beforeAfter: { before: "₹1,200 Cost/CAC", after: "₹450 Cost/CAC" }
  },
  {
    title: "AI-Powered Brand Legacy and Support Automation",
    client: "Luminary Luxury Co.",
    stage: "Growth Stage",
    industry: "Consumer Luxury",
    challenge: "Visual identity mismatch with high-end audience, combined with scaling customer support bottlenecks.",
    solution: "Synchronous team created a premium visual brand architecture and deployed autonomous customer support AI agents.",
    process: "Brand audit & styling guidelines redesign → Custom LLM agent configuration → API connection to CRM → Full deployment.",
    results: "60% reduction in support ticketing costs, customer response times reduced to under 5 seconds, average order value grew by 28%.",
    funding: "Attracted private equity expansion round of ₹45 Cr within 6 months.",
    beforeAfter: { before: "18m Response Time", after: "< 5s Response Time" }
  }
];

const partnerLogos = [
  { name: "Jaipur Angel Network", logoText: "JAN" },
  { name: "Sovereign Cap", logoText: "SOVEREIGN" },
  { name: "Rajasthan Venture Capital Fund", logoText: "RVCF" },
  { name: "NCR Capital Group", logoText: "NCR CAP" },
  { name: "Vega Trust Partners", logoText: "VEGA TRUST" },
  { name: "Circular Economy Fund", logoText: "CE FUND" }
];

const faqs = [
  {
    q: "Who can apply for RiseMate funding or support?",
    a: "Startups from Seed to Growth stages seeking strategic capital, execution capability, sustainable commerce architecture, or tech engineering can apply. We look for passionate founders focusing on circular economy, FinTech, clean tech, or automation."
  },
  {
    q: "How does the funding facilitation process work?",
    a: "We evaluate your startup’s execution roadmap, financials, and core technology. If aligned, we facilitate direct capital investments from our fund and match you with our partner network of institutional and angel investors, while providing actual operational support."
  },
  {
    q: "Which industries do you support?",
    a: "Our core competence spans Sustainable Retail & Circular Economy, Managed Sales & Field Force Execution, Clean Energy & IoT Engineering, and Brand Systems & Autonomous AI. However, any high-growth startup can benefit from our advisory."
  },
  {
    q: "Is mentorship included in your programs?",
    a: "Yes, mentorship is a key pillar of the RiseMate ecosystem. Selected founders work directly with Saurabh Jain, Dheeraj Anand, Yograj Rundhanker, and Devam Srivastava to scale sales operations, brand identity, and tech development."
  },
  {
    q: "How long does the entire process take?",
    a: "An initial review of your pitch deck or consultation mandate takes 48 hours. If selected for advisory or investment review, the complete program scoping, verification, and funding facilitation takes 4 to 6 weeks."
  },
  {
    q: "What documents are required to apply for capital?",
    a: "Initially, only a comprehensive Pitch Deck and a brief overview of your business model. As we progress, we require standard corporate governance documents, product architecture plans, and financial reports."
  },
  {
    q: "How much funding can a startup receive?",
    a: "Through our direct channels and partner network, we facilitate funding ranging from ₹1 Cr (Seed/Pre-Series A) up to ₹50 Cr+ (Growth rounds), tailored specifically to capital efficiency and scale needs."
  }
];

export default function HomeClient() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [activeAchievementTab, setActiveAchievementTab] = useState("journey");
  const [activeServiceModal, setActiveServiceModal] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#002366] selection:text-white relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen bg-[#FAF9F6] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden flex flex-col justify-center">
        {/* Decorative background grid and flows */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#002366]/5 blur-[200px] -translate-y-1/2 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container-wide relative z-10 w-full flex flex-col">
          
          {/* Top: Massive Typographic Headline */}
          <div className="w-full mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#002366]/5 border border-[#002366]/10 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#002366]">Ecosystem Accelerator</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[116px] font-black text-dark leading-[0.85] tracking-tighter">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                We build products,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#002366] relative block"
              >
                automate workflows,
                <span className="absolute bottom-2 left-0 w-full h-[6px] md:h-[10px] bg-gold/30 -z-10 rounded-full" />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-dark/95"
              >
                & accelerate <span className="italic font-serif font-normal text-[#002366]">funding.</span>
              </motion.span>
            </h1>
          </div>

          {/* Bottom: 3-Column Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Column 1: Slogan & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-white border border-dark/5 p-8 rounded-[32px] shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#002366] mb-3">Our Core Philosophy</h3>
                <p className="text-sm text-dark/60 font-secondary leading-relaxed">
                  We bridge the gap between global institutional expertise and high-velocity regional execution through proprietary technology. By deploying capital alongside circular commerce (BWorth), field-force scaling (Vega Vrudhi), deep-tech IoT (RYM), and visual AI brand systems (Synchronous), we build verified scale.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-8 w-full">
                <Link
                  href="/contact"
                  className="flex justify-center items-center bg-[#002366] text-white px-6 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-md shadow-[#002366]/15 hover:bg-dark transition-colors text-center"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/contact?type=funding"
                  className="flex justify-center items-center bg-[#FAF9F6] border border-dark/5 text-dark px-6 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-dark hover:text-white transition-all text-center group"
                >
                  Apply for Funding
                  <span className="material-symbols-outlined text-sm ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </motion.div>

            {/* Column 2: Media Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative aspect-[4/3] lg:aspect-auto rounded-[32px] overflow-hidden border border-dark/5 shadow-md min-h-[280px] group"
            >
              <Image
                src="/corporate-interior.png"
                alt="RiseMate Operations Hub"
                fill
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[6s] ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-dark/5 flex items-center gap-3 shadow-md">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-[#002366] leading-none mb-1">HQ Operations</p>
                  <p className="text-[10px] font-black text-dark leading-none">NCR Gurgaon Hub Active</p>
                </div>
              </div>
            </motion.div>

            {/* Column 3: VC Capital Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bg-[#001233] text-white p-8 rounded-[32px] flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              {/* Backgrid accent */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

              <div className="flex justify-between items-center z-10">
                <span className="text-[9px] font-black uppercase tracking-widest text-gold">Capital Status</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest rounded-md flex items-center gap-1">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" /> Live Pool
                </span>
              </div>

              <div className="my-6 z-10">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/45 mb-1">Facilitated Funding</p>
                <h4 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none mb-4">₹150 Cr+</h4>
                
                <div className="h-[1px] w-full bg-white/10 my-4" />
                
                <div className="flex justify-between items-center text-xs text-white/70 font-secondary">
                  <span>Completed Rounds: <strong className="text-white font-bold">25+</strong></span>
                  <span>Target: <strong className="text-white font-bold">Seed to Series A</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-white/10 pt-4 text-[9px] font-black uppercase tracking-wider text-white/45 z-10">
                <span className="material-symbols-outlined text-[#002366] text-sm text-gold">workspace_premium</span>
                <span>ISO 9001 Certified | 94% SUCCESS RATE</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 2. TRUST SECTION & STATS STRIP */}
      <section className="py-16 bg-white border-y border-dark/5">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
            <div className="max-w-md">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#002366] mb-3">Ecosystem Authority</h2>
              <p className="text-lg font-bold text-dark leading-tight">
                Our founders are veterans operating active companies. We validate growth model accuracy before bringing you to investors.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 flex-grow justify-items-center">
              {[
                { number: "25+", label: "Industry Advisors" },
                { number: "4", label: "Sovereign Verticals" },
                { number: "100%", label: "Process Audited" },
                { number: "₹200 Cr+", label: "Ecosystem Valuation" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <h4 className="text-3xl font-black text-[#002366] tracking-tighter">{stat.number}</h4>
                  <p className="text-[9px] font-black uppercase tracking-widest text-dark/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 bg-[#FAF9F6] relative">
        <div className="container-wide relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-[#002366] rounded-full" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#002366]/90 leading-none">Accelerator Services</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-none">
                Bespoke Services <br />To Scale Your Startup
              </h2>
            </div>
            <p className="text-lg text-dark/50 font-secondary md:text-right max-w-sm mt-6 md:mt-0 italic">
              Access the operations and technology behind RiseMates' four core entities to supercharge your startup's traction.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                variants={cardHover}
                whileHover="hover"
                className="group relative p-8 md:p-12 bg-white border border-dark/5 rounded-[32px] md:rounded-[48px] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[640px]"
              >
                {/* Background glow on hover */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 rounded-full ${s.bgColor} z-0`} />

                {/* Background Watermark Entity Logo (Full size of card div) */}
                {s.logo && (
                  <div className={`absolute inset-0 w-full h-full pointer-events-none group-hover:scale-105 transition-all duration-700 select-none z-0 flex items-center justify-center p-12 ${s.entity === "Synchronous" ? "opacity-[0.16] group-hover:opacity-[0.26] mix-blend-multiply" : "opacity-[0.08] group-hover:opacity-[0.14]"}`}>
                    <img
                      src={s.logo}
                      alt=""
                      className="w-full h-full object-contain grayscale"
                    />
                  </div>
                )}

                <div>
                  {/* Top: Icon & Entity indicator */}
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${s.bgColor} flex items-center justify-center border border-dark/5`}>
                      <span className={`material-symbols-outlined text-2xl ${s.color}`}>{s.icon}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-dark/30">Vertical {idx + 1}</span>
                      <p className={`text-xs font-black uppercase tracking-widest ${s.color} mt-1`}>{s.entity} Power</p>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl md:text-3xl font-black text-dark tracking-tight leading-snug mb-2 group-hover:text-[#002366] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#002366] italic mb-6">
                    {s.tagline}
                  </p>

                  <div className="h-[1px] w-full bg-dark/5 mb-8" />

                  {/* Content details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">Service Overview</h4>
                      <p className="text-sm text-dark/70 leading-relaxed font-secondary">{s.desc}</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">Core Benefits</h4>
                      <ul className="space-y-2">
                        {s.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-dark/70 font-secondary leading-relaxed">
                            <span className={`material-symbols-outlined text-sm ${s.color} mt-1`}>check_circle</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-dark/5">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Process Plan</h4>
                        <p className="text-xs font-bold text-dark/70 font-secondary leading-relaxed">{s.process}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Core Deliverables</h4>
                        <p className="text-xs font-bold text-dark/70 font-secondary leading-relaxed">{s.deliverables}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expected Results & CTA Button */}
                <div className="pt-8 mt-8 border-t border-dark/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-1">Expected Outcomes</h4>
                    <p className={`text-sm font-black uppercase tracking-wider ${s.color}`}>{s.results}</p>
                  </div>
                  <Link
                    href="/contact?service=consultation"
                    className="flex justify-center items-center bg-dark text-white px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#002366] transition-colors"
                  >
                    Book a Free Consultation
                  </Link>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>



      {/* 4. CASE STUDIES SECTION */}
      <section id="cases" className="py-24 md:py-32 bg-white relative">
        <div className="container-wide">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="max-w-xl">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-[#002366] mb-3 block">Verified Results</span>
              <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-none">
                Proven Cases of Growth
              </h2>
            </div>

            {/* Selector tabs */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-[#FAF9F6] p-1.5 rounded-full border border-dark/5">
              {caseStudies.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCaseStudy(idx)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${activeCaseStudy === idx ? "bg-[#002366] text-white shadow-md" : "text-dark/50 hover:text-dark"}`}
                >
                  Case 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Study Details */}
          <div className="border border-dark/5 rounded-[40px] p-8 md:p-16 bg-[#FAF9F6] shadow-sm relative overflow-hidden">
            <div className="absolute top-10 right-10 text-[180px] font-black text-dark/[0.02] pointer-events-none leading-none select-none">
              0{activeCaseStudy + 1}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              
              {/* Left Column: Info Card */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <span className="px-3 py-1 bg-white border border-dark/10 rounded-md text-[9px] font-black uppercase tracking-wider text-[#002366]">{caseStudies[activeCaseStudy].stage}</span>
                    <span className="text-xs text-dark/40 font-bold uppercase tracking-widest">{caseStudies[activeCaseStudy].industry}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-dark tracking-tight leading-snug">
                    {caseStudies[activeCaseStudy].title}
                  </h3>
                </div>

                <div className="h-[1px] w-full bg-dark/5" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">The Challenge</h4>
                    <p className="text-sm text-dark/70 font-secondary leading-relaxed">{caseStudies[activeCaseStudy].challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">The Solution</h4>
                    <p className="text-sm text-dark/70 font-secondary leading-relaxed">{caseStudies[activeCaseStudy].solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">Operational Process</h4>
                    <p className="text-sm text-dark/70 font-secondary leading-relaxed">{caseStudies[activeCaseStudy].process}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">Metrics Gained</h4>
                    <p className="text-sm text-dark/70 font-secondary leading-relaxed">{caseStudies[activeCaseStudy].results}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Funding & Results Badge */}
              <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-dark/10 p-8 md:p-10 rounded-[32px] shadow-sm">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-4 block">Funding Outcome</span>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-4xl text-[#002366]">payments</span>
                    <h4 className="text-2xl font-black text-dark tracking-tight leading-tight">
                      {caseStudies[activeCaseStudy].funding}
                    </h4>
                  </div>
                </div>

                <div className="border-t border-dark/5 pt-6 mt-8">
                  <span className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-3 block">Before & After Growth</span>
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[8px] font-black uppercase tracking-widest text-dark/30">Previous State</p>
                      <p className="text-xl font-bold text-dark/50 line-through mt-1">{caseStudies[activeCaseStudy].beforeAfter.before}</p>
                    </div>
                    <div className="w-8 h-[1px] bg-dark/20 relative">
                      <span className="material-symbols-outlined text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-dark/40">trending_flat</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-black uppercase tracking-widest text-[#002366]">Optimized State</p>
                      <p className="text-2xl font-black text-emerald-600 mt-1">{caseStudies[activeCaseStudy].beforeAfter.after}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-dark/5 pt-6 mt-8">
                  <Link
                    href="/contact"
                    className="flex justify-center items-center w-full bg-[#002366] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-dark transition-colors"
                  >
                    Talk to Our Experts
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-24 md:py-32 bg-[#001233] text-white relative overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          
          {/* Header */}
          <div className="container-wide mb-16 md:mb-20">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-3 block">Testimonials</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Startups Scaling with Us
            </h2>
          </div>

          {/* Testimonials Infinite Loop Row */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-4 select-none">
            <motion.div
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-6 w-max px-6"
            >
              {/* Render the testimonials list twice for seamless looping marquee */}
              {[...testimonials, ...testimonials].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[320px] sm:w-[420px] bg-white/5 border border-white/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px] flex flex-col justify-between h-[450px] md:h-[480px] backdrop-blur-md relative overflow-hidden group"
                >
                  <div>
                    {/* Rating stars */}
                    <div className="flex items-center gap-1.5 text-gold mb-6">
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined fill-current text-xs md:text-sm">star</span>
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-sm md:text-base text-white/90 leading-relaxed font-serif italic mb-6 line-clamp-6">
                      "{item.review}"
                    </p>
                  </div>

                  <div>
                    {/* Metrics outcomes box */}
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                      <div>
                        <p className="text-[7px] font-black uppercase tracking-widest text-white/40 mb-1">Funding</p>
                        <p className="text-[11px] font-black text-gold truncate">{item.metrics.funding}</p>
                      </div>
                      <div>
                        <p className="text-[7px] font-black uppercase tracking-widest text-white/40 mb-1">Growth</p>
                        <p className="text-[11px] font-black text-white truncate">{item.metrics.growth}</p>
                      </div>
                    </div>

                    {/* Client details signature */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/40 shrink-0">
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-white leading-none mb-1 truncate">{item.name}</h4>
                          <p className="text-[9px] text-white/40 uppercase tracking-widest leading-none truncate max-w-[150px]">{item.role}</p>
                          <p className="text-[8px] text-gold font-bold leading-none mt-1 truncate max-w-[150px]">{item.company}</p>
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-white text-dark flex items-center justify-center p-1 shrink-0">
                        {item.logo && <img src={item.logo} alt="" className="w-full h-full object-contain" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Testimonial Page-to-Services Link */}
          <div className="container-wide mt-16 text-center">
            <Link
              href="#services"
              className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-gold hover:text-white transition-colors group"
            >
              See Acceleration Verticals
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left FAQ Info */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#002366] mb-3 block">FAQ</span>
                <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter leading-none mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-dark/60 font-secondary leading-relaxed mb-8">
                  Get answers to all questions relating to funding processes, document submissions, mentorship access, and vertical consulting.
                </p>
              </div>

              {/* Secondary CTA block */}
              <div className="bg-[#FAF9F6] border border-dark/5 p-8 rounded-3xl">
                <h4 className="text-sm font-black uppercase tracking-wider text-dark mb-2">Still have questions?</h4>
                <p className="text-xs text-dark/50 font-secondary mb-6">We'd love to chat directly and outline a funding blueprint for your startup.</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full bg-[#002366] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-dark transition-colors"
                >
                  Talk to Our Experts
                </Link>
              </div>
            </div>

            {/* Right Accordion */}
            <div className="lg:col-span-8 space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-dark/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left p-6 md:p-8 bg-[#FAF9F6] hover:bg-dark/5 transition-colors focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-black text-dark tracking-tight leading-snug">{faq.q}</span>
                    <span className="material-symbols-outlined text-dark/50 transition-transform duration-300" style={{ transform: openFaq === idx ? "rotate(180deg)" : "rotate(0deg)" }}>
                      keyboard_arrow_down
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-[#FAF9F6] border-t border-dark/5"
                      >
                        <div className="p-6 md:p-8 text-sm text-dark/70 font-secondary leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 7. CONVERSION BANNER (MID PAGE) */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-t border-dark/5 overflow-hidden relative">
        <div className="container-wide relative z-10 text-center max-w-4xl">
          <span className="text-xs font-black uppercase tracking-[0.5em] text-[#002366] mb-6 inline-block">Consultation Protocol</span>
          <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-tight mb-8">
            Create Your Investment Blueprint. <br />Initialize Partnership.
          </h2>
          <p className="text-lg text-dark/60 font-secondary leading-relaxed mb-12 max-w-2xl mx-auto">
            Book a complimentary 30-minute growth evaluation with our partners. We review scaling frameworks and direct funding options.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="flex justify-center items-center bg-[#002366] text-white px-8 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[#002366]/20 hover:bg-dark transition-all duration-300 min-w-[240px]"
            >
              Book a Free Consultation
            </Link>
            
            <Link
              href="/contact?type=advisor"
              className="flex justify-center items-center bg-white border border-dark/10 text-dark px-8 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-dark hover:text-white transition-all duration-300 min-w-[240px]"
            >
              Talk to Our Experts
            </Link>
          </div>
        </div>
      </section>

      {/* 8. MOBILE STICKY FLOATING CTA BAR */}
      <div className="sm:hidden fixed bottom-4 inset-x-4 z-[190] pointer-events-none flex justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="pointer-events-auto bg-white border border-[#002366]/15 rounded-full p-2.5 shadow-[0_16px_36px_rgba(0,18,51,0.18)] flex items-center justify-between gap-6 w-full max-w-[400px]"
        >
          <div className="pl-4">
            <p className="text-[8px] font-black uppercase tracking-widest text-dark/45 leading-none mb-1">RiseMate Accelerator</p>
            <p className="text-xs font-black text-[#002366] leading-none">Consultation Free</p>
          </div>
          
          <Link
            href="/contact"
            className="bg-[#002366] hover:bg-dark text-white px-5 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.15em] transition-colors whitespace-nowrap"
          >
            Book Free Call
          </Link>
        </motion.div>
      </div>

      {/* 9. SERVICE DETAILS MODAL */}
      <AnimatePresence>
        {activeServiceModal && (() => {
          const service = SERVICES_DATA[activeServiceModal];
          if (!service) return null;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/75 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-6"
              onClick={() => setActiveServiceModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-white max-w-4xl w-full rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh] text-dark"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Modal Close Button */}
                <button
                  onClick={() => setActiveServiceModal(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#FAF9F6] border border-dark/5 flex items-center justify-center text-dark/50 hover:text-dark hover:bg-[#FAF9F6]/85 transition-colors z-[1001]"
                  aria-label="Close modal"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>

                {/* Modal Header */}
                <div className="p-8 md:p-10 border-b border-dark/5 bg-[#FAF9F6] relative">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-white border border-dark/10 rounded-md text-[9px] font-black uppercase tracking-wider text-[#002366]">
                      {service.entity}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-dark/30">Service Profile</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-dark mb-2 leading-tight pr-12">
                    {service.name}
                  </h3>
                  <p className="text-sm text-dark/60 font-secondary leading-relaxed max-w-2xl">
                    {service.summary}
                  </p>
                </div>

                {/* Modal Tabs navigation */}
                <div className="flex border-b border-dark/5 px-8 md:px-10 bg-white shrink-0">
                  {[
                    { id: "overview", label: "Overview", icon: "info" },
                    { id: "scope", label: "Scope & Benefits", icon: "rule" },
                    { id: "process", label: "Onboarding & Process", icon: "route" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveModalTab(tab.id)}
                      className={`py-4 px-6 text-xs font-black uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${activeModalTab === tab.id ? "border-[#002366] text-[#002366]" : "border-transparent text-dark/45 hover:text-dark"}`}
                    >
                      <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Modal Body (Scrollable container) */}
                <div className="p-8 md:p-10 overflow-y-auto flex-1 font-secondary text-sm text-dark/70 space-y-8">
                  
                  {/* Tab Content: Overview */}
                  {activeModalTab === "overview" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-3">Service Overview</h4>
                          <p className="leading-relaxed mb-4">{service.detailedDescription.what}</p>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-3">Why it is Critical</h4>
                          <p className="leading-relaxed">{service.detailedDescription.why}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-3">How RiseMate Delivers</h4>
                          <p className="leading-relaxed mb-4">{service.detailedDescription.how}</p>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-3">What Makes Us Different</h4>
                          <p className="leading-relaxed">{service.detailedDescription.diff}</p>
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-dark/5 my-6" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#FAF9F6] border border-dark/5 p-6 rounded-2xl">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/45 mb-2">Target Audience</h4>
                          <p className="text-xs font-bold leading-relaxed">{service.targetAudience.who}</p>
                          <p className="text-xs text-dark/50 mt-1 font-secondary">Ideal Stage: {service.targetAudience.stage}</p>
                          <p className="text-xs text-dark/50 mt-1 font-secondary">Sectors: {service.targetAudience.industries}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/45 mb-2">Eligibility Criteria</h4>
                          <p className="text-xs font-bold leading-relaxed">{service.targetAudience.eligibility}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab Content: Scope & Benefits */}
                  {activeModalTab === "scope" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-4">Key Features Included</h4>
                          <ul className="space-y-3">
                            {service.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2.5 leading-relaxed text-xs font-secondary text-dark/80">
                                <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5">check_circle</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-4">Core Deliverables</h4>
                          <ul className="space-y-3">
                            {service.deliverables.map((d, i) => (
                              <li key={i} className="flex items-start gap-2.5 leading-relaxed text-xs font-secondary text-dark/80">
                                <span className="material-symbols-outlined text-[#002366] text-sm mt-0.5">drafts</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-dark/5 my-6" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-4">Problems Solved</h4>
                          <ul className="space-y-3">
                            {service.problemsSolved.map((p, i) => (
                              <li key={i} className="flex items-start gap-2.5 leading-relaxed text-xs font-secondary text-dark/80">
                                <span className="material-symbols-outlined text-amber-600 text-sm mt-0.5">report_problem</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-4">Business Benefits</h4>
                          <ul className="space-y-3">
                            {service.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5 leading-relaxed text-xs font-secondary text-dark/80">
                                <span className="material-symbols-outlined text-[#002366] text-sm mt-0.5">done_all</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab Content: Process */}
                  {activeModalTab === "process" && (
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-6">Service Execution Roadmap</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {service.process.map((p, i) => (
                          <div key={i} className="bg-[#FAF9F6] border border-dark/5 p-5 rounded-2xl space-y-2 relative group hover:border-[#002366]/20 transition-all">
                            <span className="w-6 h-6 rounded-full bg-[#002366] text-white flex items-center justify-center font-black text-[10px] mb-2">{p.step}</span>
                            <h5 className="text-xs font-black text-dark">{p.title}</h5>
                            <p className="text-[11px] text-dark/50 leading-relaxed font-secondary">{p.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="h-[1px] w-full bg-dark/5 my-6" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Onboarding Documents */}
                        <div className="bg-[#FAF9F6] border border-dark/5 p-6 rounded-2xl">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002366] mb-3">Documents Required</h4>
                          <ul className="space-y-2">
                            {service.requiredDocs.map((doc, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-dark/80 font-secondary leading-none">
                                <span className="material-symbols-outlined text-xs text-[#002366]">article</span>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Performance Metrics */}
                        <div className="bg-[#001233] text-white p-6 rounded-2xl flex flex-col justify-between">
                          <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gold mb-3">Success Metrics & Case Summary</h4>
                            <p className="text-xs text-white/80 font-serif italic mb-4">"{service.successMetrics.stories}"</p>
                          </div>
                          <div className="flex justify-between items-center border-t border-white/10 pt-3 text-xs text-white/50 font-secondary">
                            <span>Clients: {service.successMetrics.clients}</span>
                            <span className="text-gold font-bold">{service.successMetrics.results}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Modal Footer */}
                <div className="p-8 md:p-10 border-t border-dark/5 bg-[#FAF9F6] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-dark/45 uppercase tracking-widest font-black leading-none mb-1">Expected Service Duration</p>
                    <p className="text-sm font-black text-dark leading-none">{service.timeline.duration} <span className="text-xs text-dark/50 font-secondary font-normal">({service.timeline.turnaround})</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveServiceModal(null)}
                      className="px-6 py-4 border border-dark/5 bg-white text-dark/70 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-dark hover:text-white transition-colors"
                    >
                      Close Window
                    </button>
                    <Link
                      href="/contact?service=consultation"
                      className="px-6 py-4 bg-[#002366] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-dark transition-colors"
                    >
                      Book Free Consultation
                    </Link>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
