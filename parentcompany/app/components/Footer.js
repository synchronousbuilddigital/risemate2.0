"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-dark text-white pt-20 pb-8 overflow-hidden border-t border-white/5">
      {/* Background Decorative Glows */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="container-wide relative z-10">
        
        {/* TOP ROW: Branding, Newsletter & Action CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tighter block group">
              RISEMATES <span className="text-gold transition-all duration-500 group-hover:tracking-widest">VENTURES</span>
            </Link>
            <p className="text-sm text-white/50 font-secondary leading-relaxed max-w-sm">
              Helping startups raise capital, scale on-ground operations, and build verified investor confidence through actual infrastructure and deep vertical integration.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { name: "LinkedIn", url: "https://linkedin.com", icon: "share" },
                { name: "Instagram", url: "https://instagram.com", icon: "photo_camera" },
                { name: "WhatsApp", url: "https://whatsapp.com", icon: "chat" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-300"
                  title={social.name}
                >
                  <span className="material-symbols-outlined text-base">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-7 flex flex-col justify-end space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-gold">Subscribe to Ecosystem Intelligence</h4>
            <p className="text-xs text-white/60 font-secondary max-w-md">Get market insights, regulatory updates, and circular retail resources delivered directly to your inbox.</p>
            
            {subscribed ? (
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md w-full relative">
                <input
                  type="email"
                  placeholder="Enter corporate email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-white outline-none focus:border-gold transition-colors font-secondary placeholder:text-white/20"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold hover:bg-white hover:text-dark text-dark text-[10px] font-black uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* MIDDLE ROW: Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Quick Navigation</h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-xs font-bold text-white/65 hover:text-white transition-colors">About Legacy</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Venture Portfolio</Link>
              </li>
              <li>
                <Link href="/achievements" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Ecosystem Impact</Link>
              </li>
              <li>
                <Link href="/leadership" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Leadership Registry</Link>
              </li>
              <li>
                <Link href="/blog" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Insights & Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Initialize Connection</Link>
              </li>
            </ul>
          </div>

          {/* Services/Verticals */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Ecosystem Services</h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/portfolio#bworth" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Circular Fashion (BWorth)</Link>
              </li>
              <li>
                <Link href="/portfolio#vega-vrudhi" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Managed Sales (Vega Vrudhi)</Link>
              </li>
              <li>
                <Link href="/portfolio#rym-grenergy" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Deep-Tech IoT (RYM)</Link>
              </li>
              <li>
                <Link href="/portfolio#synchronous" className="text-xs font-bold text-white/65 hover:text-white transition-colors">AI & Brand (Synchronous)</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Resources</h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#faq" className="text-xs font-bold text-white/65 hover:text-white transition-colors">F.A.Q.</Link>
              </li>
              <li>
                <Link href="/contact?type=funding" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Apply for Funding</Link>
              </li>
              <li>
                <Link href="/contact?type=experts" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Talk to Our Experts</Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs font-bold text-white/65 hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Contact Info</h5>
            <ul className="space-y-2.5 text-xs text-white/65 font-secondary">
              <li className="leading-relaxed">
                <strong>NCR HQ:</strong> 7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69, Gurugram.
              </li>
              <li className="leading-relaxed">
                <strong>Jaipur Hub:</strong> Vinayak Enclave, Jagatpura.
              </li>
              <li>
                <strong>Emails:</strong> info@bworth.co.in <br />
                saurabh@vegavruddhi.com
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">
              © 2026 RISEMATES VENTURES. ALL RIGHTS RESERVED.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>

      {/* Brand Blue bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#002366]/40 to-transparent" />
    </footer>
  );
};

export default Footer;
