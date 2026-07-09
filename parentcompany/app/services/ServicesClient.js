"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const servicesList = [
  {
    title: "Global Market Expansion",
    desc: "Expanding into new markets requires more than ambition—it demands local knowledge, strategic partnerships, regulatory understanding, and operational execution.",
    points: ["Market entry strategy", "Business localization", "Distribution partnerships", "Regulatory guidance", "Business networking", "Sales enablement", "Regional expansion planning", "International business development"],
    icon: "public"
  },
  {
    title: "Startup & Venture Growth",
    desc: "Supporting entrepreneurs from idea validation to sustainable scale.",
    points: ["Business model refinement", "Go-to-market strategy", "Product commercialization", "Revenue acceleration", "Investor readiness", "Strategic mentorship", "Corporate partnerships", "Scale-up planning"],
    icon: "rocket_launch"
  },
  {
    title: "Funding & Investment Readiness",
    desc: "Helping organizations prepare for growth capital while connecting them with the right funding partners.",
    points: ["Investment strategy", "Pitch preparation", "Financial planning", "Due diligence support", "Investor introductions", "Venture capital access", "Debt financing guidance", "Government funding programs"],
    icon: "account_balance"
  },
  {
    title: "AI, Automation & Digital Transformation",
    desc: "Helping businesses become more intelligent, efficient, and future-ready.",
    points: ["AI consulting", "Workflow automation", "CRM implementation", "Data analytics", "Business intelligence", "Predictive insights", "Enterprise AI solutions", "Digital transformation strategy"],
    icon: "memory"
  },
  {
    title: "Business Development & Partnerships",
    desc: "Creating opportunities through meaningful collaborations.",
    points: ["Corporate alliances", "Strategic partnerships", "Distribution networks", "Channel ecosystems", "International collaborations", "Government partnerships", "Industry alliances", "Ecosystem development"],
    icon: "handshake"
  },
  {
    title: "Operational Execution",
    desc: "Turning strategies into measurable outcomes through dedicated implementation support.",
    points: ["Project management", "Sales operations", "Field execution", "Partner management", "Recruitment support", "Market activation", "Operational governance", "Performance monitoring"],
    icon: "precision_manufacturing"
  }
];

const deliverySteps = [
  "Discover", "Strategize", "Connect", "Execute", "Measure", "Scale"
];

export default function ServicesClient() {
  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gray-50 border-b border-gray-200">
        <div className="container-wide relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black">Our Services</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] text-black tracking-tighter mb-8 font-primary">
                Integrated Growth <br />
                <span className="text-gray-400">Solutions for Every Stage.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 font-secondary leading-relaxed max-w-lg mb-10">
                From strategy and market expansion to funding, AI, partnerships, and execution, Rise Mate Ventures provides comprehensive business growth solutions designed to help organizations scale with confidence.
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative h-[450px] lg:h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-gray-200/50"
            >
              <Image
                src="/services_hero.png"
                alt="Business Growth Solutions"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES LIST - CREATIVE LAYOUT */}
      <section className="py-14 md:py-20 bg-white relative">
        <div className="container-wide">
          <div className="mb-20 text-center">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-[1.1] font-primary">
              Our Core Services
            </h2>
          </div>

          <div className="space-y-12">
            {servicesList.map((service, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col lg:flex-row gap-10 lg:gap-20 items-stretch bg-gray-50 rounded-[40px] p-8 md:p-12 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group ${isEven ? '' : 'lg:flex-row-reverse'}`}
                >

                  {/* Service Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-8 shadow-sm group-hover:bg-black group-hover:border-black transition-colors duration-300">
                      <span className="material-symbols-outlined text-black group-hover:text-gold text-2xl transition-colors">
                        {service.icon}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-black mb-4 font-primary">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-500 font-secondary leading-relaxed mb-8 border-l-2 border-gold pl-4">
                      {service.desc}
                    </p>
                  </div>

                  {/* Capabilities List */}
                  <div className="flex-1 bg-white rounded-[32px] p-8 border border-gray-200 group-hover:border-gold/30 transition-colors">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-6">Capabilities Include</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                      {service.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-gold text-sm mt-0.5">done_all</span>
                          <span className="text-sm text-gray-600 font-secondary font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DELIVERY MODEL */}
      <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6 font-primary">
              Our Delivery Model
            </h2>
            <p className="text-lg text-white/50 font-secondary leading-relaxed">
              Every engagement follows a structured methodology focused on delivering sustainable and measurable business outcomes.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 max-w-5xl mx-auto">
            {deliverySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center group w-full"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all duration-300">
                  <span className="font-black font-primary text-xl">0{idx + 1}</span>
                </div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-gold transition-colors">
                  {step}
                </span>

                {/* Connecting Lines for Desktop */}
                {idx !== deliverySteps.length - 1 && (
                  <div className="hidden md:block absolute w-[10%] h-[1px] bg-white/10 left-[calc(50%+40px)] top-8" style={{ left: `calc(${16.66 * idx}% + 8.33% + 32px)` }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONVERSION BANNER */}
      <section className="py-20 md:py-32 bg-white overflow-hidden relative border-b border-gray-200">
        <div className="container-wide text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-tight mb-6 font-primary">
            Ready to accelerate <br />your business growth?
          </h2>
          <p className="text-xl text-gray-500 font-secondary leading-relaxed mb-10">
            Let's build your next success story together.
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
