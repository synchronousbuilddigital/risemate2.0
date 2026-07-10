"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

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

const WalkingFigure = ({ isCelebrating }) => {
  return (
    <motion.div 
      className="w-12 h-12 md:w-[64px] md:h-[64px] relative flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] z-[60]"
      animate={isCelebrating ? { y: [-15, 0, -15] } : { y: [0, -3, 0] }}
      transition={isCelebrating ? { repeat: Infinity, duration: 0.6, ease: "easeOut" } : { repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full stroke-gold fill-transparent" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="50" cy="18" r="9" className="fill-gold stroke-none" />
        
        {/* Torso */}
        <line x1="50" y1="28" x2="50" y2="58" strokeWidth="12" />
        
        {/* Left Arm (Back) */}
        <motion.line 
          strokeWidth="7"
          x1="50" y1="32" x2="50" y2="58" 
          animate={isCelebrating ? { rotate: -150 } : { rotate: [35, -35, 35] }} 
          transition={isCelebrating ? { type: "spring", stiffness: 200, damping: 15 } : { repeat: Infinity, duration: 1, ease: "linear" }}
          style={{ transformOrigin: "50px 32px" }}
          className="stroke-gold/60"
        />
        
        {/* Left Leg (Back) */}
        <motion.g
          strokeWidth="8"
          animate={isCelebrating ? { rotate: -20 } : { rotate: [-40, 40, -40] }} 
          transition={isCelebrating ? { type: "spring", stiffness: 200, damping: 15 } : { repeat: Infinity, duration: 1, ease: "linear" }}
          style={{ transformOrigin: "50px 58px" }}
        >
            <line x1="50" y1="58" x2="50" y2="88" className="stroke-gold/60" />
            <line x1="50" y1="88" x2="57" y2="88" strokeWidth="6" className="stroke-gold/60" /> {/* Foot */}
        </motion.g>

        {/* Right Leg (Front) */}
        <motion.g
          strokeWidth="8"
          animate={isCelebrating ? { rotate: 20 } : { rotate: [40, -40, 40] }} 
          transition={isCelebrating ? { type: "spring", stiffness: 200, damping: 15 } : { repeat: Infinity, duration: 1, ease: "linear" }}
          style={{ transformOrigin: "50px 58px" }}
        >
            <line x1="50" y1="58" x2="50" y2="88" className="stroke-gold" />
            <line x1="50" y1="88" x2="57" y2="88" strokeWidth="6" className="stroke-gold" /> {/* Foot */}
        </motion.g>
        
        {/* Right Arm (Front) */}
        <motion.line 
          strokeWidth="7"
          x1="50" y1="32" x2="50" y2="58" 
          animate={isCelebrating ? { rotate: 150 } : { rotate: [-35, 35, -35] }} 
          transition={isCelebrating ? { type: "spring", stiffness: 200, damping: 15 } : { repeat: Infinity, duration: 1, ease: "linear" }}
          style={{ transformOrigin: "50px 32px" }}
          className="stroke-gold"
        />
      </svg>
    </motion.div>
  );
};

const DeliveryModel = () => {
  const containerRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [currentStep, setCurrentStep] = useState(-1);
  const [confettiInstance, setConfettiInstance] = useState(null);

  // Load canvas-confetti
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.confetti) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
    
    // Initialize custom canvas
    const initConfetti = setInterval(() => {
       if (window.confetti && confettiCanvasRef.current) {
           const myConfetti = window.confetti.create(confettiCanvasRef.current, {
             resize: true,
             useWorker: true
           });
           setConfettiInstance(() => myConfetti);
           clearInterval(initConfetti);
       }
    }, 100);
    
    return () => clearInterval(initConfetti);
  }, []);

  useEffect(() => {
    let timeout1, timeout2, confettiInterval;
    if (isInView && currentStep < deliverySteps.length) {
        // the walk duration is approx 1000ms.
        // Wait 1000ms, then fire confetti
        timeout1 = setTimeout(() => {
            const stepEl = document.getElementById(`step-${currentStep}`);
            if (stepEl && confettiInstance && confettiCanvasRef.current) {
                const rect = stepEl.getBoundingClientRect();
                const canvasRect = confettiCanvasRef.current.getBoundingClientRect();
                const x = (rect.left + rect.width / 2 - canvasRect.left) / canvasRect.width;
                const y = (rect.top + rect.height / 2 - canvasRect.top) / canvasRect.height;
                
                if (currentStep === deliverySteps.length - 1) {
                    // Grand finale fireworks for the final step!
                    const duration = 2500;
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, colors: ['#FFD700', '#ffffff', '#aaaaaa', '#ffaa00'] };

                    confettiInterval = setInterval(function() {
                      const timeLeft = animationEnd - Date.now();

                      if (timeLeft <= 0) {
                        return clearInterval(confettiInterval);
                      }

                      const particleCount = 50 * (timeLeft / duration);
                      confettiInstance(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
                    }, 250);
                } else {
                    // Normal step burst
                    confettiInstance({
                        particleCount: 50,
                        spread: 60,
                        origin: { x, y },
                        colors: ['#FFD700', '#ffffff', '#aaaaaa'],
                        disableForReducedMotion: true
                    });
                }
            }
            
            // Wait a bit, then move to next step
            timeout2 = setTimeout(() => {
                setCurrentStep(p => p + 1);
            }, currentStep === deliverySteps.length - 1 ? 4000 : 1500); // stay longer on final step

        }, currentStep === 0 ? 500 : 1000); 
    } else if (isInView && currentStep >= deliverySteps.length) {
        // loop back after grand finale
        timeout1 = setTimeout(() => {
            setCurrentStep(0);
        }, 1000);
    } else if (!isInView) {
        // Reset when out of view
        setCurrentStep(-1);
    }

    return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearInterval(confettiInterval);
    };
  }, [currentStep, isInView, confettiInstance]);

  return (
    <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Confetti Canvas strictly confined to this section */}
        <canvas ref={confettiCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        <div className="container-wide relative z-20">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6 font-primary">
              Our Delivery Model
            </h2>
            <p className="text-lg text-white/50 font-secondary leading-relaxed">
              Every engagement follows a structured methodology focused on delivering sustainable and measurable business outcomes.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-2 max-w-5xl mx-auto mt-16" ref={containerRef}>
            {deliverySteps.map((step, idx) => {
              const isActive = currentStep >= idx;
              const isCurrent = currentStep === idx;
              return (
                <div
                  key={idx}
                  id={`step-${idx}`}
                  className="relative flex flex-col items-center group w-full"
                >
                  {/* Person Walking / Celebrating */}
                  {isCurrent && (
                    <motion.div
                      layoutId="walkingPerson"
                      transition={{ 
                        type: "tween", 
                        ease: "linear",
                        duration: 1
                      }}
                      className="absolute -top-[30px] md:top-[-26px] z-[60] pointer-events-none"
                    >
                      <WalkingFigure isCelebrating={currentStep === deliverySteps.length - 1} />
                    </motion.div>
                  )}

                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 z-10 ${isActive ? 'bg-gold border-gold text-black shadow-[0_0_20px_rgba(255,215,0,0.4)]' : 'bg-white/5 border-white/10 text-white'}`}>
                    <span className="font-black font-primary text-xl">0{idx + 1}</span>
                  </div>
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-gold drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]' : 'text-white/70'}`}>
                    {step}
                  </span>

                  {/* Connecting Lines for Desktop */}
                  {idx !== deliverySteps.length - 1 && (
                     <div className="hidden md:block absolute h-[2px] top-8 left-[50%] w-full -z-0">
                         {/* Background line */}
                         <div className="absolute inset-0 bg-white/10" />
                         {/* Active line fill */}
                         <motion.div 
                            className="absolute inset-0 bg-gold origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: currentStep > idx ? 1 : 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                         />
                     </div>
                  )}
                  
                  {/* Connecting Lines for Mobile */}
                  {idx !== deliverySteps.length - 1 && (
                     <div className="md:hidden absolute w-[2px] top-[2rem] left-1/2 -translate-x-1/2 -z-0" style={{ height: 'calc(100% + 3rem)' }}>
                         {/* Background line */}
                         <div className="absolute inset-0 bg-white/10" />
                         {/* Active line fill */}
                         <motion.div 
                            className="absolute inset-0 bg-gold origin-top"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: currentStep > idx ? 1 : 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                         />
                     </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
  );
};

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
                From strategy and market expansion to funding, AI, partnerships, and execution, RiseMates Ventures provides comprehensive business growth solutions designed to help organizations scale with confidence.
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
      <DeliveryModel />

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
