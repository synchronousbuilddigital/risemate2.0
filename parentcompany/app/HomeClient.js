"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Globe3D from "./components/Globe3D";
import Counter from "./components/Counter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    y: -8,
    boxShadow: "0 20px 40px -15px rgba(0, 35, 102, 0.08)",
    borderColor: "rgba(0, 35, 102, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// --- Data Structures ---
const whatWeDoList = [
  {
    title: "Global Market Expansion",
    icon: "public",
    desc: "Helping businesses confidently enter new markets through market intelligence, strategic partnerships, localization, regulatory guidance, and execution support.",
    benefits: [
      "Cross-border localization strategies",
      "Regulatory alignment & entry compliance",
      "International trade & local distribution partnerships"
    ],
    color: "text-cyan-600",
    bgColor: "bg-cyan-50/50",
    borderColor: "hover:border-cyan-200"
  },
  {
    title: "Startup & Venture Growth",
    icon: "rocket_launch",
    desc: "Supporting founders from validation to commercialization with mentorship, go-to-market strategy, investor readiness, strategic partnerships, and business scaling.",
    benefits: [
      "Investor readiness & pitch deck styling",
      "Mentorship & go-to-market validations",
      "Strategic joint ventures & seed commercialization"
    ],
    color: "text-emerald-600",
    bgColor: "bg-emerald-50/50",
    borderColor: "hover:border-emerald-200"
  },
  {
    title: "Funding & Strategic Partnerships",
    icon: "handshake",
    desc: "Connecting businesses with investors, venture funds, family offices, financial institutions, corporate partners, and government programs that accelerate growth.",
    benefits: [
      "Access to global venture capital networks",
      "Family office & angel syndicate introductions",
      "Government agency program integrations"
    ],
    color: "text-[#DFBA6B]",
    bgColor: "bg-amber-50/30",
    borderColor: "hover:border-amber-200"
  },
  {
    title: "Business Automation & AI",
    icon: "smart_toy",
    desc: "Helping organizations transform operations through Artificial Intelligence, workflow automation, CRM implementation, analytics, digital transformation, and intelligent business systems.",
    benefits: [
      "Neural workflows & custom AI models",
      "CRM & business intelligence dashboard integrations",
      "Digital conversion & process optimization"
    ],
    color: "text-orange-500",
    bgColor: "bg-orange-50/50",
    borderColor: "hover:border-orange-200"
  },
  {
    title: "Ground Execution & Growth Infrastructure",
    icon: "domain",
    desc: "Providing businesses with operational capabilities including sales teams, channel partners, implementation support, business development, market activation, and execution management.",
    benefits: [
      "Active field sales & merchant acquisition units",
      "Channel development & local operations setup",
      "Account-based execution & campaign activation"
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-50/50",
    borderColor: "hover:border-blue-200"
  }
];

const whyPoints = [
  {
    title: "Unified Platform",
    desc: "Integrated strategy, capital, execution",
    color: "#FF7B00",
    glowColor: "rgba(255, 123, 0, 0.4)",
    textColor: "text-[#FF7B00]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12.24 2a10 10 0 0 0-8.9 5.5" />
        <path d="M3 5v3h3" />
        <path d="M11.76 22a10 10 0 0 0 8.9-5.5" />
        <path d="M21 19v-3h-3" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    )
  },
  {
    title: "Integrated Ecosystem",
    desc: "One partner managing business growth",
    color: "#E5B800",
    glowColor: "rgba(229, 184, 0, 0.4)",
    textColor: "text-[#E5B800]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" fill="currentColor" className="opacity-20" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="6" cy="7" r="1.5" />
        <circle cx="18" cy="7" r="1.5" />
        <circle cx="6" cy="17" r="1.5" />
        <circle cx="18" cy="17" r="1.5" />
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
        <line x1="12" y1="12" x2="6" y2="7" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="18" y2="7" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="6" y2="17" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="18" y2="17" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="12" y2="5" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="12" y2="19" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    title: "Global Network",
    desc: "Connecting businesses with opportunities",
    color: "#2ECC71",
    glowColor: "rgba(46, 204, 113, 0.4)",
    textColor: "text-[#2ECC71]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
        <path d="M3 12h18" />
        <circle cx="12" cy="7" r="1" fill="currentColor" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
        <circle cx="7.5" cy="12" r="1" fill="currentColor" />
        <circle cx="16.5" cy="12" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Technology Driven",
    desc: "Building future-ready businesses",
    color: "#0066CC",
    glowColor: "rgba(0, 102, 204, 0.4)",
    textColor: "text-[#0066CC]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
      </svg>
    )
  },
  {
    title: "Execution Excellence",
    desc: "Delivering measurable outcomes",
    color: "#8E44AD",
    glowColor: "rgba(142, 68, 173, 0.4)",
    textColor: "text-[#8E44AD]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        <circle cx="18.7" cy="8" r="1.5" fill="currentColor" />
        <circle cx="13.6" cy="13.2" r="1.5" fill="currentColor" />
        <circle cx="10.8" cy="10.5" r="1.5" fill="currentColor" />
        <circle cx="18.7" cy="8" r="3.5" />
        <path d="M21.2 10.5l-1.5-1.5" />
      </svg>
    )
  }
];

const growthSteps = [
  {
    step: "Step 1",
    title: "Business Discovery",
    desc: "Understanding business objectives, opportunities, challenges, and market potential."
  },
  {
    step: "Step 2",
    title: "Strategic Planning",
    desc: "Creating growth roadmaps supported by market intelligence and execution planning."
  },
  {
    step: "Step 3",
    title: "Business Partnerships",
    desc: "Connecting organizations with customers, investors, distributors, technology providers, and strategic collaborators."
  },
  {
    step: "Step 4",
    title: "Technology Enablement",
    desc: "Leveraging AI, automation, analytics, and digital transformation to increase efficiency."
  },
  {
    step: "Step 5",
    title: "Execution",
    desc: "Deploying sales teams, operational support, implementation resources, and growth infrastructure."
  },
  {
    step: "Step 6",
    title: "Scale",
    desc: "Supporting businesses as they expand across cities, countries, and international markets."
  }
];



const faqs = [
  {
    q: "Who can apply for RiseMates funding or support?",
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
    a: "Yes, mentorship is a key pillar of the RiseMates ecosystem. Selected founders work directly with Saurabh Jain, Dheeraj Anand, Yograj Rundhanker, and Devam Srivastava to scale sales operations, brand identity, and tech development."
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
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hi! I am the RiseMates AI Assistant. How can I help you with our funding process, capital structure, or mentorship today?' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    // Auto-scroll chat to bottom when messages change
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isBotTyping]);


  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % whatWeDoList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Create GSAP context for safe cleanup in React
    let ctx = gsap.context(() => {
      // 1. Hero Animations (Title, Subtitle, CTA buttons, Globe Parallax)
      gsap.from(".gsap-hero-fade", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      });

      // Parallax effect on the Globe container
      gsap.to(".gsap-globe-parallax", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".gsap-globe-parallax",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 2. Trust/Ecosystem Authority Section Stats
      gsap.fromTo(".gsap-stat-card",
        { scale: 0.85, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".gsap-stat-card",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. What We Do Section - Title & Paragraphs
      gsap.fromTo(".gsap-wwd-header",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-wwd-header",
            start: "top 80%"
          }
        }
      );

      // 4. The Ecosystem Difference (Why section)
      gsap.fromTo(".gsap-why-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-why-header",
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(".gsap-why-svg",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-why-svg",
            start: "top 75%"
          }
        }
      );

      // 5. Growth Framework Section Title
      gsap.fromTo(".gsap-framework-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-framework-header",
            start: "top 85%"
          }
        }
      );

      // 6. Growth Framework Section Cards - Staggered Slide In
      gsap.fromTo(".gsap-framework-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-framework-card",
            start: "top 85%"
          }
        }
      );

      // 7. FAQ Columns
      gsap.fromTo(".gsap-faq-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-faq-item",
            start: "top 85%"
          }
        }
      );

      // 8. Call To Action section (depth parallax & zoom)
      gsap.fromTo(".gsap-cta-card",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-cta-card",
            start: "top 85%"
          }
        }
      );

    }, containerRef); // Scope all selectors to containerRef

    return () => {
      // Revert GSAP context and kill all scroll triggers on unmount
      ctx.revert();
    };
  }, []);

  const getLocalResponse = (query) => {
    const normalizedQuery = query.toLowerCase();

    const knowledgeBase = [
      {
        keywords: ["apply", "eligible", "eligibility", "who can", "stage", "criteria"],
        response: "Startups from Seed to Growth stages seeking strategic capital, execution capability, sustainable commerce architecture, or tech engineering can apply. We look for passionate founders focusing on circular economy, FinTech, clean tech, or automation."
      },
      {
        keywords: ["how much", "funding", "limit", "amount", "receive", "ticket", "size", "capital", "money"],
        response: "We facilitate capital investments ranging from ₹1 Cr (Seed/Pre-Series A) up to ₹50 Cr+ (Growth rounds) through our direct fund and partner networks of institutional investors."
      },
      {
        keywords: ["process", "work", "facilitation", "steps", "application"],
        response: "Our process begins with an initial discover review of your business roadmap. If aligned, program scoping, verification, and funding facilitation takes 4 to 6 weeks."
      },
      {
        keywords: ["industries", "sectors", "fields", "areas", "banking", "fintech", "saas", "ai"],
        response: "We support diverse sectors including Banking & Financial Services, FinTech, Technology & SaaS, Artificial Intelligence, Healthcare, Manufacturing, Smart Cities, Energy, Logistics, and Startups. Our own ecosystem companies (like BWorth, Vegavruddhi, RYM Grenergy, and Synchronous) operate across these verticals."
      },
      {
        keywords: ["mentorship", "advisory", "coaching", "partners", "saurabh", "dheeraj", "yograj", "devam"],
        response: "Yes, selected startups work directly with our partners (Saurabh Jain, Dheeraj Anand, Yograj Rundhanker, and Devam Srivastava) to scale their sales force, refine brand systems, and deploy custom hardware/AI tools."
      },
      {
        keywords: ["documents", "required", "pitch", "deck", "financials", "governance"],
        response: "Initially, only a comprehensive Pitch Deck and a brief business overview are needed. Detailed review requires standard corporate governance documents, product architecture plans, and financial reports."
      },
      {
        keywords: ["how long", "time", "timeline", "duration", "days", "weeks"],
        response: "An initial review of your pitch deck takes 48 hours. The complete scoping, verification, and funding facilitation process takes between 4 to 6 weeks."
      },
      {
        keywords: ["location", "hq", "office", "address", "gurugram", "delhi", "jaipur"],
        response: "Our corporate headquarters (NCR HQ) is located at 7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69, Gurugram. All operations are managed from this location."
      },
      {
        keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
        response: "Hi! I am the RiseMates AI Assistant. How can I help you with our funding process, capital structure, or mentorship today?"
      }
    ];

    let bestMatch = null;
    let maxScore = 0;

    for (const item of knowledgeBase) {
      let score = 0;
      for (const keyword of item.keywords) {
        if (normalizedQuery.includes(keyword)) {
          score += 1;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && maxScore > 0) {
      return bestMatch.response;
    }

    return "That's a great question! For detailed information regarding this, please click 'Talk to Our Experts' to outline a funding blueprint directly with our team.";
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || isBotTyping) return;

    const newMessages = [...chatMessages, { role: 'user', text }];
    setChatMessages(newMessages);
    setChatInput("");
    setIsBotTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }

      const data = await res.json();
      setChatMessages([...newMessages, { role: 'bot', text: data.response }]);
    } catch (err) {
      console.warn("Chatbot API connection failed, falling back to client NLP matcher:", err);
      // Client-side local NLP fallback response
      const localResponse = getLocalResponse(text);
      setChatMessages([...newMessages, { role: 'bot', text: localResponse }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white selection:bg-black selection:text-black relative">

      {/* 1. HERO SECTION - BENTO REDESIGN */}
      <section className="relative pt-36 pb-20 md:pt-44 lg:pt-48 md:pb-12 bg-[#FAFAFA] overflow-hidden">
        <div className="container-wide w-full">

          {/* Top Headline Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-primary font-black text-[#111] leading-[1.2] sm:leading-[1.15] md:leading-[1.1] lg:leading-[1.05] tracking-tighter max-w-none gsap-hero-fade">
              Building the <span className="inline-block border-[3px] border-gold text-gold rounded-[40px] px-4 py-1.5 md:px-6 md:py-2 mx-1 align-middle">blueprint</span> for global scale
            </h1>
            <div className="hidden md:flex items-center justify-center w-24 h-24 relative opacity-80 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gold animate-[spin_20s_linear_infinite] origin-center">
                <path fill="currentColor" d="M50 0 C50 25 75 50 100 50 C75 50 50 75 50 100 C50 75 25 50 0 50 C25 50 50 25 50 0 Z" />
              </svg>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">

            {/* Left Column (col-4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-center">

              {/* Bottom Box */}
              <div className="gsap-hero-fade">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Global Ecosystem</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#111] font-primary leading-[1.1] tracking-tight mb-8">
                  Execute your <br />vision with us
                </h2>
                <Link href="/contact" className="inline-flex items-center gap-3 border border-gray-300 rounded-full px-6 py-3 hover:border-gold hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest">
                  Partner Now
                  <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </Link>
              </div>
            </div>

            {/* Right Column (col-8) */}
            <div className="lg:col-span-8 flex flex-col relative">

              {/* Wide Image / 3D Globe */}
              <div className="relative w-full h-[300px] md:h-[340px] rounded-[40px] overflow-hidden shadow-2xl bg-gradient-to-br from-[#000d24] to-[#001f54] gsap-globe-parallax">
                <Globe3D />
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)' }} />


              </div>



              {/* Bottom Area */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 lg:pt-12 px-6 lg:px-0 relative gsap-hero-fade">
                <p className="text-xl md:text-2xl text-[#111] font-primary font-bold leading-snug max-w-md tracking-tight">
                  We strive to protect growth ambitions and transform businesses for future generations.
                </p>
                <div className="flex flex-wrap gap-4 items-center lg:pr-32">
                  <Link href="/about" className="bg-[#FAF3E0] text-[#8C6B18] px-8 py-4 rounded-full text-xs font-primary font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-colors border border-transparent">
                    About Us
                  </Link>
                  <Link href="/services" className="flex items-center gap-2 text-xs font-primary font-black uppercase tracking-[0.2em] text-black hover:text-gold transition-colors">
                    View Services
                    <span className="material-symbols-outlined text-sm font-bold" style={{ strokeWidth: 2 }}>arrow_outward</span>
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION & STATS STRIP */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
            <div className="max-w-md">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-black mb-3">Ecosystem Authority</h2>
              <p className="text-base font-bold text-black leading-snug font-primary">
                Connecting top-tier opportunities with robust scaling mechanisms. We manage and mitigate growth risks through execution partnerships.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 flex-grow justify-items-center">
              {[
                { value: 25, suffix: "+", label: "Industry Advisors" },
                { value: 5, suffix: "", label: "Growth Domains" },
                { value: 100, suffix: "%", label: "Process Audited" },
                { value: 94, suffix: "%", label: "Success Rate" }
              ].map((stat, i) => (
                <div key={i} className="text-center gsap-stat-card opacity-0">
                  <h4 className="text-3xl font-black text-black tracking-tight">
                    <Counter value={stat.value} />{stat.suffix}
                  </h4>
                  <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO SECTION */}
      <section id="what-we-do" className="py-24 md:py-32 bg-white relative">
        <div className="container-wide relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gsap-wwd-header opacity-0">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-black/90 leading-none">What We Do</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight font-primary">
                We Help Businesses Grow <br />Beyond Borders
              </h2>
            </div>
            <p className="text-base text-gray-600 font-secondary max-w-md mt-6 md:mt-0 leading-relaxed">
              Rather than offering isolated services, we create integrated growth strategies supported by execution.
            </p>
          </div>

          {/* Desktop Layout: Radial Interactive Wheel */}
          <div className="hidden lg:grid grid-cols-12 gap-16 items-center min-h-[550px]">

            {/* Left Column (5 cols): Active Content Display */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="col-span-5 bg-white border border-gray-200 p-10 rounded-[32px] shadow-sm min-h-[460px] flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-20 rounded-full bg-gold/30 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 block mb-1">Module 0{activeService + 1} / 05</span>
                    <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight leading-snug font-primary">
                      {whatWeDoList[activeService].title}
                    </h3>
                  </div>

                  <div className="h-[1px] w-full bg-dark/5" />

                  <p className="text-sm md:text-base text-black/70 leading-relaxed font-secondary">
                    {whatWeDoList[activeService].desc}
                  </p>

                  <ul className="space-y-3">
                    {whatWeDoList[activeService].benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-black/65 font-secondary leading-relaxed">
                        <span className={`material-symbols-outlined text-sm ${whatWeDoList[activeService].color} mt-0.5`}>check_circle</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="pt-6 border-t border-gray-200 mt-6 flex justify-between items-center relative z-10">
                <span className="text-[9px] font-black uppercase tracking-wider text-black/30">Scalable Architecture</span>
                <Link
                  href={`/contact?interest=${encodeURIComponent(whatWeDoList[activeService].title)}`}
                  className="inline-flex items-center justify-center bg-black text-gold px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md shadow-black/10"
                >
                  Partner With Us
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Column (7 cols): Circular Orbit Wheel */}
            <div className="col-span-7 flex items-center justify-center relative min-h-[500px]">

              {/* Visual Orbits (Back dashes) */}
              <div className="absolute w-[360px] h-[360px] border border-dashed border-gray-300 rounded-full pointer-events-none" />
              <div className="absolute w-[240px] h-[240px] border border-dashed border-dark/15 rounded-full pointer-events-none" />

              {/* Center Hub Logo Container */}
              <div className="absolute z-20 w-32 h-32 bg-white border-2 border-gold/30 text-black rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,18,51,0.15)] select-none p-5">
                <div className="relative w-20 h-20">
                  <Image
                    src="/logo.png"
                    alt="RiseMates Logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Subtle pulsing outer rings */}
                <div className="absolute inset-[-4px] border border-gold/15 rounded-full animate-ping pointer-events-none" />
              </div>

              {/* 5 Orbiting Nodes */}
              {whatWeDoList.map((item, idx) => {
                const r = 180; // circle radius
                const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2; // Offset by -90deg so index 0 is top
                const x = r * Math.cos(angle);
                const y = r * Math.sin(angle);
                const isActive = idx === activeService;

                return (
                  <button
                    key={idx}
                    onMouseEnter={() => {
                      setActiveService(idx);
                      setIsPaused(true);
                    }}
                    onMouseLeave={() => setIsPaused(false)}
                    onClick={() => {
                      setActiveService(idx);
                      setIsPaused(true);
                    }}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)"
                    }}
                    className={`absolute z-30 flex flex-col items-center justify-center rounded-full transition-all duration-500 cursor-pointer ${isActive ? "w-20 h-20 bg-white border-2 border-black shadow-xl scale-110" : "w-16 h-16 bg-white border border-gray-300 shadow-md hover:scale-105 hover:border-black/40"}`}
                  >
                    {isActive && (
                      <div className="absolute inset-[-8px] border border-gold/40 rounded-full animate-pulse-slow pointer-events-none" />
                    )}

                    <span className={`material-symbols-outlined text-xl transition-all ${isActive ? `${item.color} scale-110 font-bold` : "text-black/45"}`}>
                      {item.icon}
                    </span>

                    <span className={`absolute top-full mt-1.5 whitespace-nowrap text-[8px] font-black uppercase tracking-widest rounded px-1.5 py-0.5 transition-opacity ${isActive ? "opacity-100 bg-black text-gold" : "opacity-0 group-hover:opacity-100 bg-dark/5 text-gray-500"}`}>
                      Module 0{idx + 1}
                    </span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* Mobile Layout: Swipeable Tab selector & Detail Card */}
          <div className="lg:hidden block space-y-8">

            {/* Scrollable Icon Pills Header */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none scroll-smooth">
              {whatWeDoList.map((item, idx) => {
                const isActive = idx === activeService;
                return (
                  <button
                    key={idx}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                    onClick={() => {
                      setActiveService(idx);
                      setIsPaused(true);
                    }}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-full snap-center text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 border ${isActive ? "bg-black text-gold border-transparent shadow-md shadow-black/10" : "bg-white text-gray-500 border-gray-200"}`}
                  >
                    <span className={`material-symbols-outlined text-sm ${isActive ? "text-gold" : "text-black/45"}`}>{item.icon}</span>
                    <span>{item.title.split(" & ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Active Details Card */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm relative overflow-hidden space-y-6"
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 blur-3xl opacity-10 rounded-full bg-gold pointer-events-none" />

              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-black/30 block mb-1">Module 0{activeService + 1} / 05</span>
                <h3 className="text-xl font-black text-black tracking-tight leading-snug font-primary">
                  {whatWeDoList[activeService].title}
                </h3>
              </div>

              <div className="h-[1px] w-full bg-dark/5" />

              <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-secondary">
                {whatWeDoList[activeService].desc}
              </p>

              <ul className="space-y-3 pt-2">
                {whatWeDoList[activeService].benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-black/65 font-secondary leading-relaxed">
                    <span className={`material-symbols-outlined text-xs ${whatWeDoList[activeService].color} mt-0.5`}>check_circle</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-200 mt-6 flex flex-col gap-3">
                <Link
                  href={`/contact?interest=${encodeURIComponent(whatWeDoList[activeService].title)}`}
                  className="flex justify-center items-center bg-black text-gold py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-md shadow-black/10 text-center"
                >
                  Partner With Us
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. WHY RiseMates Ventures SECTION */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-12 bg-white text-black relative overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-wide relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24 gsap-why-header opacity-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-gold">The Ecosystem Difference</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 font-primary text-shadow-premium">
              More Than Consulting.<br />
              <span className="text-gold italic font-serif font-normal">More Than Capital.</span>
            </h2>
            <p className="text-black/70 font-secondary leading-relaxed text-sm md:text-base">
              Traditional firms solve only one part of the growth equation. RiseMates Ventures integrates strategy, partnerships, technology, capital access, and execution into one unified platform.
            </p>
          </div>

          {/* Desktop SVG Flow Diagram */}
          <div className="hidden lg:block w-full max-w-[1050px] mx-auto overflow-visible mb-10 relative gsap-why-svg opacity-0">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gold/60 mb-8 font-primary">
              RiseMates Ventures Growth Platform
            </h3>

            <svg viewBox="0 0 1050 650" className="w-full h-auto overflow-visible select-none">
              <defs>
                <linearGradient id="snake-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF7B00" />
                  <stop offset="25%" stopColor="#E5B800" />
                  <stop offset="50%" stopColor="#2ECC71" />
                  <stop offset="75%" stopColor="#0066CC" />
                  <stop offset="100%" stopColor="#8E44AD" />
                </linearGradient>
              </defs>

              {/* Segment 1: Orange (Unified Platform) */}
              <g
                onMouseEnter={() => setHoveredSegment(0)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
              >
                <path
                  d="M 50 480 L 150 480 A 120 120 0 0 0 270 360 L 270 300"
                  fill="none"
                  stroke="#FF7B00"
                  strokeWidth="80"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{
                    filter: hoveredSegment === 0 ? 'drop-shadow(0 0 15px rgba(255, 123, 0, 0.6))' : 'none',
                    opacity: hoveredSegment !== null && hoveredSegment !== 0 ? 0.4 : 1
                  }}
                />
                <path
                  d="M 50 480 L 150 480 A 120 120 0 0 0 270 360 L 270 300"
                  fill="none"
                  stroke="#001233"
                  strokeWidth="76"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 0 ? 0.4 : 1 }}
                />
                <path
                  d="M 50 480 L 150 480 A 120 120 0 0 0 270 360 L 270 300"
                  fill="none"
                  stroke="#FF7B00"
                  strokeWidth="76"
                  strokeLinecap="round"
                  opacity="0.15"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 0 ? 0.05 : 0.15 }}
                />
              </g>

              {/* Segment 2: Yellow (Integrated Ecosystem) */}
              <g
                onMouseEnter={() => setHoveredSegment(1)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
              >
                <path
                  d="M 270 300 L 270 240 A 120 120 0 0 1 390 120 L 450 120"
                  fill="none"
                  stroke="#E5B800"
                  strokeWidth="80"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{
                    filter: hoveredSegment === 1 ? 'drop-shadow(0 0 15px rgba(229, 184, 0, 0.6))' : 'none',
                    opacity: hoveredSegment !== null && hoveredSegment !== 1 ? 0.4 : 1
                  }}
                />
                <path
                  d="M 270 300 L 270 240 A 120 120 0 0 1 390 120 L 450 120"
                  fill="none"
                  stroke="#001233"
                  strokeWidth="76"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 1 ? 0.4 : 1 }}
                />
                <path
                  d="M 270 300 L 270 240 A 120 120 0 0 1 390 120 L 450 120"
                  fill="none"
                  stroke="#E5B800"
                  strokeWidth="76"
                  strokeLinecap="round"
                  opacity="0.15"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 1 ? 0.05 : 0.15 }}
                />
              </g>

              {/* Segment 3: Green (Global Network) */}
              <g
                onMouseEnter={() => setHoveredSegment(2)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
              >
                <path
                  d="M 450 120 L 510 120 A 120 120 0 0 1 630 240 L 630 300"
                  fill="none"
                  stroke="#2ECC71"
                  strokeWidth="80"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{
                    filter: hoveredSegment === 2 ? 'drop-shadow(0 0 15px rgba(46, 204, 113, 0.6))' : 'none',
                    opacity: hoveredSegment !== null && hoveredSegment !== 2 ? 0.4 : 1
                  }}
                />
                <path
                  d="M 450 120 L 510 120 A 120 120 0 0 1 630 240 L 630 300"
                  fill="none"
                  stroke="#001233"
                  strokeWidth="76"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 2 ? 0.4 : 1 }}
                />
                <path
                  d="M 450 120 L 510 120 A 120 120 0 0 1 630 240 L 630 300"
                  fill="none"
                  stroke="#2ECC71"
                  strokeWidth="76"
                  strokeLinecap="round"
                  opacity="0.15"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 2 ? 0.05 : 0.15 }}
                />
              </g>

              {/* Segment 4: Blue (Technology Driven) */}
              <g
                onMouseEnter={() => setHoveredSegment(3)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
              >
                <path
                  d="M 630 300 L 630 360 A 120 120 0 0 0 750 480 L 810 480"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="80"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{
                    filter: hoveredSegment === 3 ? 'drop-shadow(0 0 15px rgba(0, 102, 204, 0.6))' : 'none',
                    opacity: hoveredSegment !== null && hoveredSegment !== 3 ? 0.4 : 1
                  }}
                />
                <path
                  d="M 630 300 L 630 360 A 120 120 0 0 0 750 480 L 810 480"
                  fill="none"
                  stroke="#001233"
                  strokeWidth="76"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 3 ? 0.4 : 1 }}
                />
                <path
                  d="M 630 300 L 630 360 A 120 120 0 0 0 750 480 L 810 480"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="76"
                  strokeLinecap="round"
                  opacity="0.15"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 3 ? 0.05 : 0.15 }}
                />
              </g>

              {/* Segment 5: Purple (Execution Excellence) */}
              <g
                onMouseEnter={() => setHoveredSegment(4)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
              >
                <path
                  d="M 810 480 L 870 480 A 120 120 0 0 0 990 360 L 990 240"
                  fill="none"
                  stroke="#8E44AD"
                  strokeWidth="80"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{
                    filter: hoveredSegment === 4 ? 'drop-shadow(0 0 15px rgba(142, 68, 173, 0.6))' : 'none',
                    opacity: hoveredSegment !== null && hoveredSegment !== 4 ? 0.4 : 1
                  }}
                />
                <path
                  d="M 810 480 L 870 480 A 120 120 0 0 0 990 360 L 990 240"
                  fill="none"
                  stroke="#001233"
                  strokeWidth="76"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 4 ? 0.4 : 1 }}
                />
                <path
                  d="M 810 480 L 870 480 A 120 120 0 0 0 990 360 L 990 240"
                  fill="none"
                  stroke="#8E44AD"
                  strokeWidth="76"
                  strokeLinecap="round"
                  opacity="0.15"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredSegment !== null && hoveredSegment !== 4 ? 0.05 : 0.15 }}
                />
              </g>

              {/* Snake Animation */}
              <motion.path
                d="M 50 480 L 150 480 A 120 120 0 0 0 270 360 L 270 300 L 270 240 A 120 120 0 0 1 390 120 L 450 120 L 510 120 A 120 120 0 0 1 630 240 L 630 300 L 630 360 A 120 120 0 0 0 750 480 L 810 480 L 870 480 A 120 120 0 0 0 990 360 L 990 240"
                fill="none"
                stroke="url(#snake-gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0.1, pathOffset: -0.1 }}
                animate={{ pathOffset: 1.1 }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,1))" }}
              />

              {/* Dividers */}
              <line x1="230" y1="300" x2="310" y2="300" stroke="#001233" strokeWidth="2.5" />
              <line x1="450" y1="80" x2="450" y2="160" stroke="#001233" strokeWidth="2.5" />
              <line x1="590" y1="300" x2="670" y2="300" stroke="#001233" strokeWidth="2.5" />
              <line x1="810" y1="440" x2="810" y2="520" stroke="#001233" strokeWidth="2.5" />

              {/* Nodes */}
              {/* 1. Orange Node */}
              <g
                onMouseEnter={() => setHoveredSegment(0)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 0 ? 0.5 : 1 }}
              >
                <circle cx="235" cy="445" r="28" fill="#001233" />
                <circle cx="235" cy="445" r="28" fill="#FF7B00" opacity="0.15" />
                <circle cx="235" cy="445" r={hoveredSegment === 0 ? "32" : "28"} stroke="#FF7B00" strokeWidth="2" fill="none" className="transition-all duration-300" />
                <g className="text-[#FF7B00] transition-transform duration-300" style={{ transform: hoveredSegment === 0 ? 'scale(1.15) translate(-1.5px, -1.5px)' : 'none', transformOrigin: '235px 445px' }}>
                  <svg x={235 - 12} y={445 - 12} width="24" height="24">
                    {whyPoints[0].icon}
                  </svg>
                </g>
              </g>

              {/* 2. Yellow Node */}
              <g
                onMouseEnter={() => setHoveredSegment(1)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 1 ? 0.5 : 1 }}
              >
                <circle cx="305" cy="155" r="28" fill="#001233" />
                <circle cx="305" cy="155" r="28" fill="#E5B800" opacity="0.15" />
                <circle cx="305" cy="155" r={hoveredSegment === 1 ? "32" : "28"} stroke="#E5B800" strokeWidth="2" fill="none" className="transition-all duration-300" />
                <g className="text-[#E5B800] transition-transform duration-300" style={{ transform: hoveredSegment === 1 ? 'scale(1.15) translate(-1.5px, -1.5px)' : 'none', transformOrigin: '305px 155px' }}>
                  <svg x={305 - 12} y={155 - 12} width="24" height="24">
                    {whyPoints[1].icon}
                  </svg>
                </g>
              </g>

              {/* 3. Green Node */}
              <g
                onMouseEnter={() => setHoveredSegment(2)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 2 ? 0.5 : 1 }}
              >
                <circle cx="595" cy="155" r="28" fill="#001233" />
                <circle cx="595" cy="155" r="28" fill="#2ECC71" opacity="0.15" />
                <circle cx="595" cy="155" r={hoveredSegment === 2 ? "32" : "28"} stroke="#2ECC71" strokeWidth="2" fill="none" className="transition-all duration-300" />
                <g className="text-[#2ECC71] transition-transform duration-300" style={{ transform: hoveredSegment === 2 ? 'scale(1.15) translate(-1.5px, -1.5px)' : 'none', transformOrigin: '595px 155px' }}>
                  <svg x={595 - 12} y={155 - 12} width="24" height="24">
                    {whyPoints[2].icon}
                  </svg>
                </g>
              </g>

              {/* 4. Blue Node */}
              <g
                onMouseEnter={() => setHoveredSegment(3)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 3 ? 0.5 : 1 }}
              >
                <circle cx="665" cy="445" r="28" fill="#001233" />
                <circle cx="665" cy="445" r="28" fill="#0066CC" opacity="0.15" />
                <circle cx="665" cy="445" r={hoveredSegment === 3 ? "32" : "28"} stroke="#0066CC" strokeWidth="2" fill="none" className="transition-all duration-300" />
                <g className="text-[#0066CC] transition-transform duration-300" style={{ transform: hoveredSegment === 3 ? 'scale(1.15) translate(-1.5px, -1.5px)' : 'none', transformOrigin: '665px 445px' }}>
                  <svg x={665 - 12} y={445 - 12} width="24" height="24">
                    {whyPoints[3].icon}
                  </svg>
                </g>
              </g>

              {/* 5. Purple Node */}
              <g
                onMouseEnter={() => setHoveredSegment(4)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer group"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 4 ? 0.5 : 1 }}
              >
                <circle cx="955" cy="445" r="28" fill="#001233" />
                <circle cx="955" cy="445" r="28" fill="#8E44AD" opacity="0.15" />
                <circle cx="955" cy="445" r={hoveredSegment === 4 ? "32" : "28"} stroke="#8E44AD" strokeWidth="2" fill="none" className="transition-all duration-300" />
                <g className="text-[#8E44AD] transition-transform duration-300" style={{ transform: hoveredSegment === 4 ? 'scale(1.15) translate(-1.5px, -1.5px)' : 'none', transformOrigin: '955px 445px' }}>
                  <svg x={955 - 12} y={445 - 12} width="24" height="24">
                    {whyPoints[4].icon}
                  </svg>
                </g>
              </g>

              {/* Leader Lines and Texts */}
              {/* 1. Unified Platform */}
              <g
                onMouseEnter={() => setHoveredSegment(0)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 0 ? 0.5 : 1 }}
              >
                <circle cx="263" cy="473" r="3.5" fill="#FF7B00" />
                <line x1="263" y1="473" x2="263" y2="530" stroke="#FF7B00" strokeWidth="1.5" strokeDasharray={hoveredSegment === 0 ? "0" : "3,3"} className="transition-all duration-300" />
                <circle cx="263" cy="530" r="3.5" fill="#FF7B00" />
                <foreignObject x={263 - 125} y={540} width="250" height="90" className="overflow-visible">
                  <div className="flex flex-col items-center text-center justify-start h-full px-2">
                    <span className="text-[12px] font-black tracking-widest uppercase transition-colors duration-300 text-[#FF7B00] drop-shadow-[0_0_8px_rgba(255,123,0,0.2)]">
                      Unified Platform
                    </span>
                    <span className="text-[10px] text-black/60 font-secondary mt-1.5 leading-relaxed max-w-[190px]">
                      Integrated strategy, capital, execution
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* 2. Integrated Ecosystem */}
              <g
                onMouseEnter={() => setHoveredSegment(1)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 1 ? 0.5 : 1 }}
              >
                <circle cx="277" cy="127" r="3.5" fill="#E5B800" />
                <line x1="277" y1="127" x2="277" y2="70" stroke="#E5B800" strokeWidth="1.5" strokeDasharray={hoveredSegment === 1 ? "0" : "3,3"} className="transition-all duration-300" />
                <circle cx="277" cy="70" r="3.5" fill="#E5B800" />
                <foreignObject x={277 - 125} y={0} width="250" height="65" className="overflow-visible">
                  <div className="flex flex-col items-center text-center justify-end h-full px-2">
                    <span className="text-[12px] font-black tracking-widest uppercase transition-colors duration-300 text-[#E5B800] drop-shadow-[0_0_8px_rgba(229,184,0,0.2)]">
                      Integrated Ecosystem
                    </span>
                    <span className="text-[10px] text-black/60 font-secondary mt-1.5 leading-relaxed max-w-[190px]">
                      One partner managing business growth
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* 3. Global Network */}
              <g
                onMouseEnter={() => setHoveredSegment(2)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 2 ? 0.5 : 1 }}
              >
                <circle cx="623" cy="127" r="3.5" fill="#2ECC71" />
                <line x1="623" y1="127" x2="623" y2="70" stroke="#2ECC71" strokeWidth="1.5" strokeDasharray={hoveredSegment === 2 ? "0" : "3,3"} className="transition-all duration-300" />
                <circle cx="623" cy="70" r="3.5" fill="#2ECC71" />
                <foreignObject x={623 - 125} y={0} width="250" height="65" className="overflow-visible">
                  <div className="flex flex-col items-center text-center justify-end h-full px-2">
                    <span className="text-[12px] font-black tracking-widest uppercase transition-colors duration-300 text-[#2ECC71] drop-shadow-[0_0_8px_rgba(46,204,113,0.2)]">
                      Global Network
                    </span>
                    <span className="text-[10px] text-black/60 font-secondary mt-1.5 leading-relaxed max-w-[190px]">
                      Connecting businesses with opportunities
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* 4. Technology Driven */}
              <g
                onMouseEnter={() => setHoveredSegment(3)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 3 ? 0.5 : 1 }}
              >
                <circle cx="637" cy="473" r="3.5" fill="#0066CC" />
                <line x1="637" y1="473" x2="637" y2="530" stroke="#0066CC" strokeWidth="1.5" strokeDasharray={hoveredSegment === 3 ? "0" : "3,3"} className="transition-all duration-300" />
                <circle cx="637" cy="530" r="3.5" fill="#0066CC" />
                <foreignObject x={637 - 125} y={540} width="250" height="90" className="overflow-visible">
                  <div className="flex flex-col items-center text-center justify-start h-full px-2">
                    <span className="text-[12px] font-black tracking-widest uppercase transition-colors duration-300 text-[#0066CC] drop-shadow-[0_0_8px_rgba(0,102,204,0.2)]">
                      Technology Driven
                    </span>
                    <span className="text-[10px] text-black/60 font-secondary mt-1.5 leading-relaxed max-w-[190px]">
                      Building future-ready businesses
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* 5. Execution Excellence */}
              <g
                onMouseEnter={() => setHoveredSegment(4)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: hoveredSegment !== null && hoveredSegment !== 4 ? 0.5 : 1 }}
              >
                <circle cx="983" cy="473" r="3.5" fill="#8E44AD" />
                <line x1="983" y1="473" x2="983" y2="530" stroke="#8E44AD" strokeWidth="1.5" strokeDasharray={hoveredSegment === 4 ? "0" : "3,3"} className="transition-all duration-300" />
                <circle cx="983" cy="530" r="3.5" fill="#8E44AD" />
                <foreignObject x={983 - 125} y={540} width="250" height="90" className="overflow-visible">
                  <div className="flex flex-col items-center text-center justify-start h-full px-2">
                    <span className="text-[12px] font-black tracking-widest uppercase transition-colors duration-300 text-[#8E44AD] drop-shadow-[0_0_8px_rgba(142,68,173,0.2)]">
                      Execution Excellence
                    </span>
                    <span className="text-[10px] text-black/60 font-secondary mt-1.5 leading-relaxed max-w-[190px]">
                      Delivering measurable outcomes
                    </span>
                  </div>
                </foreignObject>
              </g>
            </svg>
          </div>

          {/* Mobile Connected Flow */}
          <div className="lg:hidden space-y-6 max-w-md mx-auto relative pt-4">
            <div className="absolute left-7 top-6 bottom-6 w-0.5 bg-gray-200 z-0" />

            {whyPoints.map((point, idx) => (
              <div
                key={idx}
                className="relative z-10 flex gap-5 items-start p-5 rounded-[24px] bg-white/[0.02] border border-gray-200 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border transition-all duration-300"
                  style={{
                    borderColor: `${point.color}40`,
                    color: point.color,
                    boxShadow: `0 0 12px ${point.color}20`
                  }}
                >
                  {point.icon}
                </div>
                <div>
                  <h3
                    className="text-base font-black font-primary mb-1 transition-colors duration-300"
                    style={{ color: point.color }}
                  >
                    {point.title}
                  </h3>
                  <p className="text-xs md:text-sm text-black/60 font-secondary leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. OUR GROWTH FRAMEWORK SECTION - ROADMAP REDESIGN */}
      <section className="pt-12 pb-24 md:pt-12 md:pb-32 bg-white relative overflow-hidden">
        <div className="container-wide relative z-10">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 gsap-framework-header opacity-0">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-4 block">Scaling System</span>
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-[1.1] font-primary">
              Our Growth Framework
            </h2>
          </div>

          <div className="w-full relative max-w-6xl mx-auto mb-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="flex flex-nowrap justify-start lg:justify-center items-center gap-3 md:gap-5 overflow-x-auto w-full pb-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {["Strategy", "Partnerships", "Technology", "Execution", "Scale"].map((tag, i, arr) => (
                <div key={i} className="flex items-center gap-3 md:gap-5 shrink-0 snap-center">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-gray-50 border border-gray-200 shadow-sm hover:border-gold hover:shadow-md transition-all duration-300 group cursor-default"
                  >
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-700 group-hover:text-black transition-colors">{tag}</span>
                  </motion.div>

                  {i !== arr.length - 1 && (
                    <motion.span
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="text-gold material-symbols-outlined text-lg md:text-xl drop-shadow-sm"
                    >
                      arrow_right_alt
                    </motion.span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 px-4">
            <p className="text-sm md:text-base text-gray-500 font-secondary leading-relaxed">
              Growth is never accidental. It is built through a structured framework that transforms ideas into measurable business outcomes.
            </p>
          </div>

          {/* Compact 3x2 Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {growthSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 p-4 sm:p-6 md:p-8 rounded-[20px] md:rounded-[24px] hover:border-gold/50 hover:shadow-lg transition-all duration-300 group gsap-framework-card opacity-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors duration-300 shadow-sm">
                    <span className="text-xs md:text-sm font-black text-black group-hover:text-gold transition-colors">
                      0{idx + 1}
                    </span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gold transition-colors">Phase 0{idx + 1}</span>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-black text-black font-primary mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 font-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FAQ SECTION - ADVANCED REDESIGN */}
      <section className="py-24 md:py-32 bg-gray-50 text-black relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-200/50 blur-[150px] rounded-full pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left FAQ Info */}
            <div className="lg:col-span-5 flex flex-col justify-between gsap-faq-item opacity-0">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 mb-6 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black">FAQ</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-[1.1] mb-6 font-primary">
                  Clarity on our <br /><span className="text-gold">Process & Capital.</span>
                </h2>
                <p className="text-gray-500 font-secondary leading-relaxed mb-10 max-w-md">
                  Get answers to all questions relating to funding processes, document submissions, mentorship access, and vertical consulting.
                </p>
              </div>

              {/* Secondary CTA block (Glassmorphism) */}
              <div className="bg-white border border-gray-200 shadow-sm p-8 rounded-3xl relative overflow-hidden group hover:border-gold/30 transition-colors">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold/10 blur-3xl rounded-full group-hover:bg-gold/20 transition-colors" />
                <h4 className="text-xs font-black uppercase tracking-wider text-black mb-2 relative z-10">Still have questions?</h4>
                <p className="text-xs text-gray-500 font-secondary mb-8 relative z-10">We'd love to chat directly and outline a funding blueprint for your startup.</p>
                <Link
                  href="/contact"
                  className="relative z-10 inline-flex items-center justify-between w-full bg-black text-gold px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-colors shadow-md"
                >
                  Talk to Our Experts
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Chatbot */}
            <div className="lg:col-span-7 gsap-faq-item opacity-0">
              <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden flex flex-col h-[550px] shadow-sm relative">

                {/* Chat Header */}
                <div className="bg-gray-50 border-b border-gray-100 p-4 md:p-5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 border border-gold/25 shadow-sm">
                      <span className="material-symbols-outlined text-gold text-lg font-bold">smart_toy</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-black font-primary uppercase tracking-wider">RiseMates AI</h3>
                      <p className="text-[9px] text-gray-500 font-secondary uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        Online • Ask anything
                      </p>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={() => setChatMessages([
                      { role: 'bot', text: 'Hi! I am the RiseMates AI Assistant. How can I help you with our funding process, capital structure, or mentorship today?' }
                    ])}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                    title="Reset Conversation"
                    disabled={isBotTyping}
                  >
                    <span className="material-symbols-outlined text-base">refresh</span>
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative bg-[radial-gradient(#f3f4f6_1px,transparent_1px)] bg-[size:16px_16px]" ref={chatScrollRef}>

                  {/* Top Progress Indicator line */}
                  {isBotTyping && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-150 overflow-hidden z-20">
                      <div className="h-full bg-gold/50 animate-pulse w-full" />
                    </div>
                  )}

                  {chatMessages.map((msg, idx) => {
                    const isBot = msg.role === 'bot';
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex gap-3 items-start ${isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        {isBot && (
                          <div className="w-8 h-8 rounded-full bg-black border border-gold/30 flex items-center justify-center shrink-0 shadow-md">
                            <span className="material-symbols-outlined text-[15px] text-gold font-bold">smart_toy</span>
                          </div>
                        )}

                        <div className={`max-w-[78%] md:max-w-[70%] rounded-2xl p-4 text-xs md:text-sm font-secondary leading-relaxed shadow-[0_2px_10px_rgba(0,0,0,0.015)] ${isBot
                          ? 'bg-gray-50 border border-gray-150 text-gray-800 rounded-tl-none'
                          : 'bg-black text-gold rounded-tr-none shadow-md shadow-black/5'
                          }`}>
                          {msg.text}
                        </div>

                        {!isBot && (
                          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0 shadow-md">
                            <span className="material-symbols-outlined text-[15px] text-gold font-bold">person</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {isBotTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 items-start justify-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-black border border-gold/30 flex items-center justify-center shrink-0 shadow-md">
                        <span className="material-symbols-outlined text-[15px] text-gold font-bold">smart_toy</span>
                      </div>
                      <div className="bg-gray-50 border border-gray-150 rounded-2xl rounded-tl-none px-4 py-3.5 flex gap-1.5 items-center shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100 z-10">
                  {/* Suggested Prompts */}
                  <div className="flex overflow-x-auto gap-2 pb-4 mb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {faqs.map((faq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(faq.q)}
                        disabled={isBotTyping}
                        className="whitespace-nowrap bg-gray-50 border border-gray-200 hover:bg-black hover:border-black hover:text-gold text-[10px] font-black uppercase tracking-wider text-gray-600 font-secondary px-4 py-2.5 rounded-full transition-all duration-300 flex-shrink-0 disabled:opacity-50"
                      >
                        {faq.q}
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(chatInput);
                    }}
                    className="relative flex items-center"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about our funding process..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-4 pr-12 text-xs md:text-sm font-secondary focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all disabled:opacity-50"
                      disabled={isBotTyping}
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isBotTyping}
                      className="absolute right-2 w-8 h-8 flex items-center justify-center bg-black text-gold rounded-lg hover:bg-gold hover:text-white transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONVERSION BANNER (READY TO BUILD) */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-200 overflow-hidden relative">
        <div className="container-wide relative z-10 max-w-5xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-[40px] px-8 py-16 md:py-24 text-center relative overflow-hidden shadow-sm gsap-cta-card opacity-0">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-6 inline-block">Partner Scoping Initiated</span>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight mb-8 font-primary max-w-3xl mx-auto">
              Ready to Build Your Next Growth Story?
            </h2>
            <p className="text-base text-gray-600 font-secondary leading-relaxed mb-12 max-w-2xl mx-auto">
              Whether you're entering a new market, seeking strategic partnerships, raising capital, implementing AI, or accelerating business growth, RiseMates Ventures provides the ecosystem to help you scale with confidence.
            </p>

            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center bg-black text-gold hover:bg-gold hover:text-black px-10 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-black/10 font-primary"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MOBILE STICKY FLOATING CTA BAR */}
      <div className="sm:hidden fixed bottom-4 inset-x-4 z-[190] pointer-events-none flex justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="pointer-events-auto bg-white border border-gray-200 rounded-full p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.1)] flex items-center justify-between gap-6 w-full max-w-[400px]"
        >
          <div className="pl-4">
            <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 leading-none mb-1">RiseMates Ventures</p>
            <p className="text-xs font-black text-black leading-none">Global Growth Partner</p>
          </div>

          <Link
            href="/contact"
            className="bg-black hover:bg-gold text-gold hover:text-black px-5 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.15em] transition-colors whitespace-nowrap"
          >
            Partner With Us
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
