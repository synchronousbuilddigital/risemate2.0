"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Ecosystem", href: "/ecosystem" },
      { label: "Achievements", href: "/achievements" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "For Startups", href: "/solutions/startups" },
      { label: "For Enterprises", href: "/solutions/enterprises" },
      { label: "For Investors", href: "/solutions/investors" },
      { label: "For Government", href: "/solutions/government" },
      { label: "India Entry", href: "/solutions/india-entry" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Global Market Expansion", href: "/services" },
      { label: "Startup & Venture Growth", href: "/services" },
      { label: "Funding & Investment", href: "/services" },
      { label: "AI & Digital Transformation", href: "/services" },
      { label: "Operational Execution", href: "/services" },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setSubscribeError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribed(true);
        setEmail("");
      } else {
        setSubscribeError(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setSubscribeError("A connection error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#080808] text-white overflow-hidden border-t border-white/[0.06] font-secondary">

      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(201,168,76,0.07),transparent)] pointer-events-none" />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.04] blur-[140px] rounded-full pointer-events-none"
      />

      {/* ── MAIN CONTENT ── */}
      <div className="container-wide relative z-10 pt-16 pb-0">

        {/* TOP GRID: Brand + Nav Columns + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <Link href="/" className="inline-block group">
              <span className="text-xl font-black tracking-tighter font-primary">
                RiseMates{" "}
                <span className="text-gold group-hover:text-white transition-colors duration-300">
                  VENTURES
                </span>
              </span>
            </Link>
            <p className="text-[11px] text-white/40 leading-relaxed max-w-[260px]">
              A Global Business Growth &amp; Venture Ecosystem connecting organizations with capital, technology, partnerships, and execution.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/risematesventures/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 hover:border-gold hover:text-gold text-white/50 transition-all duration-300"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

            {/* Contact */}
            <div className="space-y-3 mt-2">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 border-l-2 border-gold pl-3">
                Contact
              </p>
              <a
                href="mailto:biz@risematesventures.com"
                className="flex items-center gap-2.5 text-[11px] text-white/40 hover:text-gold transition-colors group/mail"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gold/60 group-hover/mail:text-gold transition-colors shrink-0">
                  <rect x="2" y="4" width="16" height="12" rx="2" />
                  <path d="M2 7l8 5 8-5" />
                </svg>
                biz@risematesventures.com
              </a>
              <div className="flex items-start gap-2.5 text-[11px] text-white/40 leading-relaxed">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gold/60 shrink-0 mt-0.5">
                  <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" />
                  <circle cx="10" cy="7" r="1.5" />
                </svg>
                <span>7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69, Gurugram.</span>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navLinks.map((col) => (
              <div key={col.heading}>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 mb-5">
                  {col.heading}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[11px] text-white/45 hover:text-gold transition-colors duration-200 leading-relaxed"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <div className="bg-white/[0.025] border border-white/[0.07] rounded-[20px] p-6 relative overflow-hidden h-full flex flex-col justify-between gap-6">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 blur-[60px] rounded-full pointer-events-none" />

              <div className="relative z-10 space-y-2">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-gold block">
                  Newsletter
                </span>
                <h4 className="text-base font-black font-primary text-white leading-snug">
                  Subscribe to Ecosystem Intelligence
                </h4>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Market insights, regulatory updates, and growth resources delivered to your inbox.
                </p>
              </div>

              <div className="relative z-10">
                {subscribed ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-emerald-400 font-bold flex items-center gap-2"
                  >
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
                      <circle cx="10" cy="10" r="8" />
                      <path d="M6.5 10l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    You're subscribed. Welcome to the ecosystem.
                  </motion.p>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-[11px] text-white outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-gold hover:bg-white text-black text-[9px] font-black uppercase tracking-[0.15em] px-4 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap shrink-0 active:scale-95 disabled:opacity-50 text-center"
                      >
                        {isSubmitting ? "..." : "Subscribe"}
                      </button>
                    </div>
                    {subscribeError && (
                      <p className="text-[10px] text-red-400 font-bold">{subscribeError}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-5">
          <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] text-center sm:text-left">
            © 2026 RiseMates Ventures. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5 md:gap-6">
            <Link
              href="/privacy"
              className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 hover:text-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <Link
              href="/terms"
              className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 hover:text-gold transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-7 h-7 rounded-full border border-white/10 hover:border-gold hover:text-gold text-white/30 transition-colors"
              title="Back to Top"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M8 12V4M4 7l4-4 4 4" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Gold bottom accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </footer>
  );
};

export default Footer;
