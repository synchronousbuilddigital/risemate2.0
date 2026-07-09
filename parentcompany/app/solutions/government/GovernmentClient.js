"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const solutionsList = [
  "AI Adoption", "Digital Governance", "Smart Cities", "Citizen Services", 
  "Capacity Building", "Innovation Labs", "Data Analytics", "Project Execution", 
  "Public-Private Partnerships", "Knowledge Management"
];

const journey = [
  { step: "Analyze", desc: "Understanding policy goals and citizen needs." },
  { step: "Design", desc: "Architecting scalable public sector solutions." },
  { step: "Implement", desc: "Deploying technologies and processes." },
  { step: "Train", desc: "Building internal capacity and knowledge transfer." },
  { step: "Optimize", desc: "Continuous improvement of citizen services." },
];

const focusAreas = [
  "Transport", "Education", "Healthcare", "Finance", "Urban Development", 
  "Energy", "Agriculture", "Public Administration"
];

export default function GovernmentClient() {
  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-32">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gray-50 border-b border-gray-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container-wide relative z-10 w-full text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <Link href="/solutions" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 hover:text-black transition-colors">Solutions</Link>
              <span className="text-gray-300 mx-1">/</span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black">Government</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] text-black tracking-tighter mb-8 font-primary">
              Driving Public Sector <br />
              <span className="text-gold">Innovation.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 font-secondary leading-relaxed mb-12">
              Supporting governments through AI, digital transformation, innovation ecosystems, and execution excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-24 bg-white relative">
        <div className="container-wide max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-16">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gold mb-6 block border-b border-gray-200 pb-4">
                  Government Solutions
                </h3>
                <ul className="space-y-4">
                  {solutionsList.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[10px] text-black">check</span>
                      </div>
                      <span className="text-base text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gold mb-6 block border-b border-gray-200 pb-4">
                  Focus Areas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {focusAreas.map((item, i) => (
                    <span key={i} className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-xs font-bold text-gray-600 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Journey) */}
            <div className="lg:col-span-7">
              <div className="bg-gray-50 border border-gray-200 rounded-[40px] p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-black text-black mb-10 font-primary">
                  Execution Framework
                </h3>
                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                  {journey.map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white group-hover:border-gold group-hover:bg-gold text-gray-500 group-hover:text-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                        <span className="font-black text-sm">{i + 1}</span>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-gray-200 bg-white shadow-sm group-hover:shadow-md group-hover:border-gold/30 transition-all">
                        <h4 className="font-black text-black text-lg font-primary mb-2">{step.step}</h4>
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
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-10 font-primary relative z-10">
              Building Smarter Governments Together.
            </h2>
            <Link href="/contact" className="relative z-10 inline-flex items-center justify-center bg-gold text-black hover:bg-white hover:text-black px-10 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 font-primary">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
