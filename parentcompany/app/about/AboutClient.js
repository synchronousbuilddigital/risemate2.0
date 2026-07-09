"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Globe3D from "../components/Globe3D";

const whyPoints = [
  {
    title: "Global Perspective",
    desc: "Connecting businesses with international opportunities."
  },
  {
    title: "Execution Driven",
    desc: "Turning strategy into measurable results."
  },
  {
    title: "Innovation Focused",
    desc: "Using AI and digital transformation to build future-ready businesses."
  },
  {
    title: "Collaborative Network",
    desc: "Building meaningful relationships across industries and markets."
  },
  {
    title: "Sustainable Growth",
    desc: "Helping organizations create lasting value through responsible expansion."
  }
];

const coreValues = [
  {
    title: "Partnership",
    desc: "Building relationships based on trust, collaboration, and shared success."
  },
  {
    title: "Innovation",
    desc: "Continuously embracing technology and new ideas."
  },
  {
    title: "Integrity",
    desc: "Operating with transparency, accountability, and professionalism."
  },
  {
    title: "Excellence",
    desc: "Delivering the highest standards in strategy and execution."
  },
  {
    title: "Global Mindset",
    desc: "Thinking beyond borders while understanding local markets."
  },
  {
    title: "Impact",
    desc: "Creating measurable value for businesses, industries, and communities."
  }
];

export default function AboutClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white" ref={containerRef}>

      {/* 1. HERO SECTION (PREMIUM LIGHT, SPLIT LAYOUT) */}
      <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden bg-white">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-gold/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gray-100/50 blur-[100px] rounded-full" />
        </div>

        <div className="container-wide relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Typography */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-10"
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">About The Ecosystem</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] font-black leading-[1.05] text-black tracking-tighter mb-8 font-primary"
              >
                Building <br /> Businesses <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">
                  Beyond Borders.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-lg md:text-2xl text-gray-500 font-secondary leading-relaxed max-w-xl mb-12"
              >
                Creating opportunities where strategy, technology, capital, and execution come together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="#our-story" className="bg-black text-white px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-colors shadow-lg shadow-black/10">
                  Our Story
                </Link>
                <Link href="/services" className="bg-white text-black px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border border-gray-200 hover:border-gold/50 hover:bg-gray-50 transition-colors shadow-sm">
                  Explore Ecosystem
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Stunning Integrated Globe Card */}
            <div className="lg:col-span-6 relative flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="w-full max-w-[600px] aspect-[4/5] md:aspect-square rounded-[48px] overflow-hidden bg-gray-50 border border-gray-200 shadow-2xl relative group"
              >
                {/* Internal Card Header */}
                <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-start pointer-events-none">
                  <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/50 shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Global Reach</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-gold">public</span>
                  </div>
                </div>

                {/* The Globe */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#000d24] to-[#001f54]">
                  <Globe3D focusLocation={{ longitude: 77.02, latitude: 28.45, zoom: 1.5 }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)' }} />
                </div>

                {/* Bottom Floating Stats */}
                <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Execution Hub</p>
                    <p className="text-2xl font-black text-black font-primary">Strategy + Capital</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE - CREATIVE TYPOGRAPHY REVEAL */}
      <section className="py-12 md:py-16 bg-white relative">
        <div className="container-wide max-w-6xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-16 h-px bg-gold" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-black">Who We Are</span>
          </div>

          {/* Massive Text Statement */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-black text-black tracking-tight leading-[1.2] mb-16 font-primary w-full"
          >
            Rise Mate Ventures is a Global Growth Ecosystem helping organizations <span className="text-gray-400 whitespace-nowrap">unlock their full potential.</span>
          </motion.h2>

          {/* Comparison Concept Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-4xl font-black text-black leading-tight">
                Your strategic growth partner.
              </h3>
              <p className="text-lg text-gray-500 font-secondary leading-relaxed">
                We empower businesses to scale globally, navigate complexity, and seize new opportunities with confidence.
              </p>
              
              <div className="pt-4 space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-gold text-[18px]">public</span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-black tracking-tight mb-1">Global Expansion</h4>
                    <p className="text-sm text-gray-500 font-secondary leading-relaxed">Seamlessly enter new markets with localized strategies and deep regional expertise.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-gold text-[18px]">timeline</span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-black tracking-tight mb-1">Operational Scaling</h4>
                    <p className="text-sm text-gray-500 font-secondary leading-relaxed">Optimize workflows, integrate technology, and build resilient frameworks for sustainable growth.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-gold text-[18px]">handshake</span>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-black tracking-tight mb-1">Strategic Partnerships</h4>
                    <p className="text-sm text-gray-500 font-secondary leading-relaxed">Unlock capital, joint ventures, and high-value alliances through our extensive network.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual breakdown instead of paragraphs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-50 border border-gray-200 p-10 md:p-12 rounded-[40px] relative overflow-hidden"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-gold mb-8 block">The Difference</span>

              <div className="space-y-8 relative z-10">
                <div className="flex gap-4 items-start opacity-40">
                  <span className="material-symbols-outlined text-black mt-1">close</span>
                  <div>
                    <h4 className="text-lg font-black text-black mb-1">Traditional Consulting</h4>
                    <p className="text-sm text-gray-600">Provide recommendations only.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start opacity-40">
                  <span className="material-symbols-outlined text-black mt-1">close</span>
                  <div>
                    <h4 className="text-lg font-black text-black mb-1">Traditional VC</h4>
                    <p className="text-sm text-gray-600">Focus primarily on investment.</p>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200" />

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-lg">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-black mb-2">Rise Mate Ecosystem</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-secondary">
                      Integrated strategy, capital, and execution. <br /><br />
                      <strong>We don't just plan—we execute.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY - CREATIVE SPLIT SCREEN */}
      <section id="our-story" className="py-12 md:py-16 bg-white relative overflow-hidden border-y border-gray-100">
        <div className="container-wide max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image Side (Redesigned Container) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[40px] overflow-hidden bg-gray-50 border border-gray-200 shadow-2xl p-10 flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
              <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700">
                <Image
                  src="/about_story.png"
                  alt="Integrated Strategy and Growth"
                  fill
                  className="object-contain drop-shadow-2xl"
                  unoptimized
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 shadow-lg">
                <span className="text-[10px] font-black uppercase tracking-widest text-black">Unified Strategy</span>
              </div>
            </motion.div>

            {/* Text Side (Refined Typography) */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-gold" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-gold">Our Story</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.05] mb-10 font-primary">
                  Every successful business shares one common challenge. <br />
                  <span className="text-gray-400 text-3xl md:text-4xl lg:text-5xl block mt-4">Growth requires multiple capabilities working together seamlessly.</span>
                </h2>

                <div className="flex flex-wrap gap-2 mb-10">
                  {["Guidance", "Funding", "Technology", "Sales Infrastructure", "Partnerships", "Execution"].map((tag, i) => (
                    <span key={i} className="px-4 py-2 rounded-full border border-gray-200 bg-white text-[10px] font-black uppercase tracking-widest text-gray-600 shadow-sm hover:border-gold hover:text-black transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-lg text-gray-600 font-secondary leading-relaxed mb-10">
                  Traditionally, these capabilities have existed in isolation. Rise Mate Ventures was established to bridge this gap by creating an integrated ecosystem where businesses can access every growth enabler through one trusted partner.
                </p>

                <div className="relative p-8 rounded-3xl bg-black overflow-hidden group shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
                  <div className="absolute right-0 top-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full z-0 group-hover:bg-gold/20 transition-colors duration-500" />

                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      Our Purpose
                    </span>
                    <p className="text-xl font-black text-white leading-snug font-primary">
                      To make business growth faster, smarter, and more sustainable by connecting vision with execution.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. VISION, MISSION, PURPOSE - INTERACTIVE CARDS */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-wide max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 p-10 lg:p-12 rounded-[40px] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="text-6xl text-gray-300 font-black mb-8 group-hover:text-gold/40 transition-colors">01</div>
                <h3 className="text-3xl font-black text-black font-primary mb-6">Our Vision</h3>
                <p className="text-gray-500 font-secondary leading-relaxed">
                  To become the world's most trusted Global Business Growth & Venture Ecosystem, enabling organizations to scale across borders through innovation, partnerships, technology, and execution excellence.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 mt-12 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors">
                <span className="material-symbols-outlined text-black group-hover:text-gold transition-colors">visibility</span>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-black text-white p-10 lg:p-12 rounded-[40px] shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="text-6xl text-white/30 font-black mb-8 group-hover:text-gold/50 transition-colors">02</div>
                <h3 className="text-3xl font-black text-white font-primary mb-6">Our Mission</h3>
                <p className="text-white/70 font-secondary leading-relaxed">
                  To empower businesses by providing integrated access to advisory, funding, digital transformation, and execution. We are committed to creating an ecosystem where startups, enterprises, governments, and investors collaborate to build sustainable economic value.
                </p>
              </div>
              <div className="relative z-10 w-12 h-12 rounded-full border border-white/20 mt-12 flex items-center justify-center bg-white/10 backdrop-blur-md">
                <span className="material-symbols-outlined text-gold">rocket_launch</span>
              </div>
            </motion.div>

            {/* Purpose */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 p-10 lg:p-12 rounded-[40px] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="text-6xl text-gray-300 font-black mb-8 group-hover:text-gold/40 transition-colors">03</div>
                <h3 className="text-3xl font-black text-black font-primary mb-6">Our Purpose</h3>
                <p className="text-gray-500 font-secondary leading-relaxed">
                  We exist to simplify business growth. By integrating strategy, capital access, technology, partnerships, and execution, we help organizations transform opportunities into measurable outcomes.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 mt-12 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors">
                <span className="material-symbols-outlined text-black group-hover:text-gold transition-colors">target</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. WHY RISE MATE VENTURES - CREATIVE LIST */}
      <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Sticky Header */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-40">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">Why Us</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter leading-[1.1] mb-6 font-primary">
                  Integrated <br />Growth Platform
                </h2>
                <p className="text-lg text-gray-500 font-secondary leading-relaxed border-l-2 border-gold pl-6">
                  One ecosystem supporting every stage of business growth.
                </p>
              </div>
            </div>

            {/* Scrolling Points */}
            <div className="lg:col-span-7 space-y-6">
              {whyPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white border border-gray-200 p-8 md:p-10 rounded-[32px] flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 hover:border-gold/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-3xl font-black text-gray-300 group-hover:text-gold transition-colors">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-black font-primary mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 font-secondary leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. CORE VALUES - BENTO GRID */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">Principles</span>
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-[1.1] font-primary">
              Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-gray-200 rounded-[32px] p-8 md:p-10 hover:bg-black hover:text-white transition-colors duration-500 group shadow-sm"
              >
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                  <div className="w-3 h-3 bg-gold rounded-full" />
                </div>
                <h3 className="text-2xl font-black text-black group-hover:text-white font-primary mb-4 transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-400 font-secondary leading-relaxed transition-colors">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
