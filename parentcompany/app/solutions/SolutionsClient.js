"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const solutionCategories = [
  {
    title: "For Startups",
    tags: "Build • Launch • Scale",
    desc: "Helping founders transform innovative ideas into investment-ready and globally scalable businesses.",
    href: "/solutions/startups",
    icon: "rocket_launch"
  },
  {
    title: "For Enterprises",
    tags: "Transform • Expand • Innovate",
    desc: "Helping established organizations accelerate growth through technology, partnerships, and operational excellence.",
    href: "/solutions/enterprises",
    icon: "domain"
  },
  {
    title: "For Investors",
    tags: "Discover • Evaluate • Scale",
    desc: "Connecting investors with high-potential opportunities and providing portfolio growth support.",
    href: "/solutions/investors",
    icon: "payments"
  },
  {
    title: "For Government",
    tags: "Digitize • Modernize • Innovate",
    desc: "Supporting public sector organizations with AI, digital transformation, and citizen-centric innovation.",
    href: "/solutions/government",
    icon: "assured_workload"
  },
  {
    title: "Global Companies Entering India",
    tags: "Enter • Localize • Expand",
    desc: "Helping international businesses establish and scale successful operations across India.",
    href: "/solutions/india-entry",
    icon: "public"
  }
];

const whyPoints = [
  "Tailored strategies instead of one-size-fits-all consulting.",
  "Integrated ecosystem combining advisory, capital access, technology, and execution.",
  "Global perspective with strong local market expertise.",
  "Long-term partnerships focused on measurable outcomes.",
  "End-to-end support from planning through implementation and scale."
];

export default function SolutionsClient() {
  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container-wide relative z-10 w-full text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black">Solutions Architecture</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] text-black tracking-tighter mb-8 font-primary">
              Growth Solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Designed Around You.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 font-secondary leading-relaxed mb-12">
              Every business is unique. Every growth journey is different. Whether you're launching a startup, expanding an enterprise, entering India, digitizing government operations, or building the future of banking, our ecosystem is designed around your goals—not just our services.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-black text-gold hover:bg-gold hover:text-black px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-black/10 font-primary"
              >
                Find Your Solution
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-gray-200 text-black hover:border-black hover:bg-gray-50 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 font-primary shadow-sm"
              >
                Speak With Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SOLUTION CATEGORIES */}
      <section id="categories" className="py-14 md:py-20 bg-gray-50 relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="block h-full bg-white border border-gray-200 rounded-[32px] p-10 hover:border-gold/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[100px] pointer-events-none group-hover:bg-gold/10 transition-colors" />
                  
                  <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-8 group-hover:bg-black group-hover:border-black transition-colors relative z-10">
                    <span className="material-symbols-outlined text-black group-hover:text-gold transition-colors text-2xl">
                      {category.icon}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-black font-primary mb-2 relative z-10">
                    {category.title}
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gold mb-6 block relative z-10">
                    {category.tags}
                  </span>
                  <p className="text-sm text-gray-500 font-secondary leading-relaxed mb-10 relative z-10">
                    {category.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black group-hover:text-gold transition-colors relative z-10 mt-auto pt-6 border-t border-gray-100">
                    Explore Solution
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE OUR SOLUTIONS */}
      <section className="py-14 md:py-20 bg-black text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gold/10 blur-[150px] pointer-events-none" />
        
        <div className="container-wide relative z-10 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">The Advantage</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] font-primary">
              Why Choose Our Solutions
            </h2>
          </div>

          <div className="space-y-6">
            {whyPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-6 p-6 md:p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gold">check</span>
                </div>
                <p className="text-lg md:text-xl text-white/90 font-secondary font-medium">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
