"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

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
        headers: {
          "Content-Type": "application/json",
        },
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
      console.error("Subscription error:", err);
      setSubscribeError("A connection error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-16 pb-8 overflow-hidden border-t border-white/5 font-secondary">
      {/* Background Decorative Gold Mesh Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,168,76,0.08),rgba(0,0,0,0))] pointer-events-none" />
      
      {/* Additional animated accent glows */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="container-wide relative z-10">
        
        {/* TOP ROW: Brand Info & Sleek Newsletter Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-10 border-b border-white/[0.06] items-center">
          
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-primary">
                RISEMATES <span className="text-gold group-hover:text-white transition-colors duration-300">VENTURES</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-lg font-secondary">
              Helping startups raise capital, scale on-ground operations, and build verified investor confidence through actual infrastructure and deep vertical integration.
            </p>
          </div>

          {/* Premium Newsletter Signup */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 rounded-[24px] backdrop-blur-md relative overflow-hidden shadow-xl w-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 space-y-3">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-gold block">Newsletter</span>
              <h4 className="text-base md:text-lg font-black font-primary text-white tracking-tight">Subscribe to Ecosystem Intelligence</h4>
              <p className="text-xs text-gray-400 leading-relaxed max-w-md">Get market insights, regulatory updates, and circular retail resources delivered directly to your inbox.</p>
              
              {subscribed ? (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-emerald-400 font-bold flex items-center gap-2 pt-1"
                >
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Thank you for subscribing to our ecosystem newsletter!
                </motion.p>
              ) : (
                <div className="space-y-2">
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-1">
                    <input
                      type="email"
                      placeholder="Enter corporate email"
                      required
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-gold/50 transition-colors font-secondary placeholder:text-white/20 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gold hover:bg-white text-black hover:text-black text-[10px] font-black uppercase tracking-[0.15em] px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-gold/10 whitespace-nowrap active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                  </form>
                  {subscribeError && (
                    <p className="text-[10px] text-red-400 font-bold pt-1">{subscribeError}</p>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* MIDDLE ROW: Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12">
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 border-l-2 border-gold pl-3 font-primary">Quick Navigation</h5>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Ecosystem", href: "/ecosystem" },
                { name: "Services", href: "/services" },
                { name: "Solutions", href: "/solutions" },
                { name: "Industries", href: "/industries" },
                { name: "Contact Us", href: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href} 
                    className="text-xs text-gray-400 hover:text-gold transition-all duration-300 flex items-center hover:translate-x-1.5 transform font-secondary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services/Verticals */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 border-l-2 border-gold pl-3 font-primary">Ecosystem Services</h5>
            <ul className="space-y-2">
              {[
                { name: "Circular Fashion (BWorth)", href: "/portfolio#bworth" },
                { name: "Managed Sales (Vega Vrudhi)", href: "/portfolio#vega-vrudhi" },
                { name: "Deep-Tech IoT (RYM)", href: "/portfolio#rym-grenergy" },
                { name: "AI & Brand (Synchronous)", href: "/portfolio#synchronous" }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href} 
                    className="text-xs text-gray-400 hover:text-gold transition-all duration-300 flex items-center hover:translate-x-1.5 transform font-secondary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 border-l-2 border-gold pl-3 font-primary">Resources</h5>
            <ul className="space-y-2">
              {[
                { name: "F.A.Q.", href: "/#faq" },
                { name: "Apply for Funding", href: "/contact?type=funding" },
                { name: "Talk to Our Experts", href: "/contact?type=experts" },
                { name: "Terms of Service", href: "/terms" }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href} 
                    className="text-xs text-gray-400 hover:text-gold transition-all duration-300 flex items-center hover:translate-x-1.5 transform font-secondary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 border-l-2 border-gold pl-3 font-primary">Contact Info</h5>
            <ul className="space-y-3 text-xs text-gray-400 font-secondary">
              <li className="flex items-start gap-3 leading-relaxed">
                <span className="material-symbols-outlined text-gold text-base shrink-0 mt-0.5">location_on</span>
                <span>
                  <strong>NCR HQ:</strong> 7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69, Gurugram.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold text-base shrink-0">mail</span>
                <a href="mailto:biz@risematesventures.com" className="hover:text-gold transition-colors">
                  biz@risematesventures.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright, Legal & Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-white/[0.06]">
          <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] text-center sm:text-left">
            © 2026 RISEMATES VENTURES. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-gold transition-colors font-primary font-bold">
              Privacy Policy
            </Link>
            <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-gold transition-colors font-primary font-bold">
              Terms & Conditions
            </Link>
            <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
            {/* Smooth Back to Top Button */}
            <button 
              onClick={scrollToTop}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-gold hover:text-gold transition-colors"
              title="Back to Top"
            >
              <span className="material-symbols-outlined text-xs">arrow_upward</span>
            </button>
          </div>
        </div>

      </div>

      {/* Signature Brand Gold bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </footer>
  );
};

export default Footer;
