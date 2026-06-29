"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ContactOrbit = () => (
  <div className="relative w-full aspect-square max-w-[550px] mx-auto flex justify-center items-center group">
    {/* Core Glow */}
    <div className="absolute w-[60%] h-[60%] bg-[#002366]/10 blur-[100px] rounded-full animate-pulse transition-all duration-1000 group-hover:bg-[#002366]/20" />

    {/* SVG Orbits */}
    <svg viewBox="0 0 600 600" className="absolute w-full h-full overflow-visible pointer-events-none drop-shadow-xl" strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="primaryOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#002366" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#002366" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#002366" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Static Inner Rings */}
      <circle cx="300" cy="300" r="140" fill="none" stroke="#002366" strokeOpacity="0.05" strokeWidth="1" />
      <circle cx="300" cy="300" r="90" fill="none" stroke="#002366" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 8" />

      {/* Animated Outer Orbit 1 */}
      <g className="animate-[spin_40s_linear_infinite] origin-center">
        <circle cx="300" cy="300" r="240" fill="none" stroke="url(#primaryOrbit)" strokeWidth="1" />
        <circle cx="300" cy="60" r="3" fill="#002366" />
        <line x1="300" y1="50" x2="300" y2="70" stroke="#002366" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="290" y1="60" x2="310" y2="60" stroke="#002366" strokeWidth="1" strokeOpacity="0.5" />
      </g>

      {/* Animated Middle Orbit 2 */}
      <g className="animate-[spin_25s_linear_infinite_reverse] origin-center">
        <circle cx="300" cy="300" r="190" fill="none" stroke="#002366" strokeWidth="1.5" strokeOpacity="0.1" strokeDasharray="15 30" />
        <circle cx="490" cy="300" r="5" fill="#3B82F6" className="animate-pulse" />
        <circle cx="490" cy="300" r="20" fill="url(#nodeGlow)" opacity="0.4" />
      </g>

      <path d="M 300 160 L 300 120" stroke="#002366" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
      <path d="M 160 300 L 120 300" stroke="#002366" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
      <path d="M 440 300 L 480 300" stroke="#002366" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
      <path d="M 300 440 L 300 480" stroke="#002366" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
    </svg>

    {/* Central Core Element */}
    <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white shadow-[0_20px_50px_-10px_rgba(0,35,102,0.1)] rounded-full flex flex-col items-center justify-center p-6 group-hover:scale-105 transition-all duration-700 z-10">
        <div className="absolute inset-2 border-[1px] border-dashed border-[#002366]/10 rounded-full animate-[spin_60s_linear_infinite]"></div>

        <div className="w-20 h-20 rounded-[1.2rem] bg-gradient-to-br from-[#002366] to-blue-800 text-white flex items-center justify-center mb-4 shadow-xl group-hover:-translate-y-1 transition-transform duration-500">
          <span className="material-symbols-outlined text-4xl font-light">language</span>
        </div>

        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#002366]/40 mb-1 mt-2">Global</span>
        <span className="text-xl font-black text-[#002366] tracking-tight">Nexus</span>

        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full border border-dark/5 shadow-sm flex items-center gap-2 text-xs font-bold text-dark whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Sync
        </div>
      </div>
    </div>

    {/* Floating Modules */}
    <div className="absolute top-[15%] left-[8%] z-20 hover:scale-110 transition-transform cursor-pointer">
      <div className="w-16 h-16 bg-white border border-[#002366]/10 shadow-[0_15px_35px_rgba(0,35,102,0.08)] rounded-2xl flex flex-col items-center justify-center backdrop-blur-md">
        <span className="material-symbols-outlined text-[#002366] mb-1">call</span>
        <span className="text-[8px] font-black uppercase tracking-widest text-dark/40">Voice</span>
      </div>
    </div>

    <div className="absolute bottom-[20%] right-[5%] z-20 hover:scale-110 transition-transform cursor-pointer">
      <div className="w-16 h-16 bg-white border border-[#002366]/10 shadow-[0_15px_35px_rgba(0,35,102,0.08)] rounded-2xl flex flex-col items-center justify-center backdrop-blur-md">
        <span className="material-symbols-outlined text-[#002366] mb-1">support_agent</span>
        <span className="text-[8px] font-black uppercase tracking-widest text-dark/40">Desk</span>
      </div>
    </div>
  </div>
);

const ContactCard = ({ title, email, phone, logo, refLabel, textColor, bgLightColor, bgGlowColor, link }) => (
  <div
    onClick={link ? () => window.open(link, '_blank') : undefined}
    className={`relative p-5 md:p-8 ${bgLightColor} border border-dark/5 rounded-[20px] md:rounded-[32px] hover:border-dark/10 hover:shadow-[0_20px_40px_rgba(0,35,102,0.05)] transition-all duration-500 group overflow-hidden ${link ? 'cursor-pointer' : ''}`}
  >
    <div className={`absolute -top-10 -right-10 w-24 h-24 blur-3xl opacity-0 hover:opacity-20 transition-opacity duration-1000 ${bgGlowColor}`} />

    <div className="relative z-10">
      <div className="flex items-start mb-5">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white shadow-md rounded-xl flex items-center justify-center group-hover:-translate-y-1 transition-all duration-500 overflow-hidden border border-dark/5">
          {logo && <Image src={logo} alt={title} width={36} height={36} className="object-contain" unoptimized={true} />}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-dark/30 mb-1">{refLabel}</p>
        <h3 className={`text-base md:text-xl font-black ${textColor} tracking-tight leading-none`}>{title}</h3>
      </div>
      <div className="space-y-2">
        <a href={`mailto:${email}`} className="block text-xs font-bold text-dark/70 hover:text-dark transition-colors truncate">{email}</a>
        {phone && (
          <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-wider ${textColor} flex items-center gap-1.5 leading-none`}>
            <span className={`w-1 h-1 rounded-full ${bgGlowColor} animate-pulse`}></span>
            {phone}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default function ContactClient() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", vertical: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = "Full Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formState.vertical) newErrors.vertical = "Please select a vertical";
    if (!formState.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      // Mock submit action
      console.log("Submitting contact mandate:", formState);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen relative overflow-x-hidden">
      
      {/* HERO & SPLIT ORBIT SECTION */}
      <section className="relative pt-10 pb-12 md:py-24 px-6 md:px-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-[#002366]/30"></span>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#002366]">Initialize Connection</span>
              </div>

              <h1 className="text-5xl md:text-[6.5rem] font-black leading-[0.85] text-dark tracking-tighter mb-12">
                Nexus <br />
                <span className="text-[#002366] italic font-serif font-normal">Collective.</span>
              </h1>

              <div className="max-w-xl border-l-[3px] border-[#002366] pl-8 py-2">
                <p className="text-lg md:text-xl text-dark/50 font-secondary leading-relaxed italic">
                  Bridge the gap between institutional accelerator scaling systems and your startup's capital raising roadmap. Our offices respond to all consultation mandates within 24 operational cycles.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-dark/40 text-lg">schedule</span>
                  <span className="text-sm font-bold text-dark/70 font-secondary">Business Hours: Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-dark/40 text-lg">quickreply</span>
                  <span className="text-sm font-bold text-dark/70 font-secondary">Average Response Guarantee: Under 24 Hours</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Orbit graphic */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <ContactOrbit />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ENTITY MATRIX */}
      <section className="py-16 px-6 md:px-24 bg-white relative border-y border-dark/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <ContactCard
              title="BWorth Support"
              email="info@bworth.co.in"
              phone="+91 8826668050"
              logo="/BWORTH.jpg"
              refLabel="Circular Synthesis"
              textColor="text-cyan-600"
              bgLightColor="bg-cyan-50/50"
              bgGlowColor="bg-cyan-600"
              link="https://bworth.co.in"
            />
            <ContactCard
              title="Vega Vrudhi"
              email="saurabh@vegavruddhi.com"
              phone="+91 91166 16636"
              logo="/VEGA.png"
              refLabel="Execution Framework"
              textColor="text-green-600"
              bgLightColor="bg-green-50/50"
              bgGlowColor="bg-green-600"
              link="https://vegavruddhi.com"
            />
            <ContactCard
              title="RYM Grenergy"
              email="contact@rym-grenergy.com"
              phone="+91 82000 55645"
              logo="/RYM.png"
              refLabel="Energy Sovereignty"
              textColor="text-[#C9A84C]"
              bgLightColor="bg-[#C9A84C]/10"
              bgGlowColor="bg-[#C9A84C]"
              link="https://rymgrenergy.com/"
            />
            <ContactCard
              title="Synchronous"
              email="biz@synchronousbuilddigital.com"
              phone="Global Digital Hub"
              logo="/sync.jpg"
              refLabel="AI & Brand Automation"
              textColor="text-orange-500"
              bgLightColor="bg-orange-50/50"
              bgGlowColor="bg-orange-500"
              link="https://www.synchronousbuilddigital.com/"
            />
          </div>
        </div>
      </section>

      {/* FORM AND GEOGRAPHIC HUBS */}
      <section className="py-24 px-6 md:px-24 bg-[#FAF9F6] relative">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-16 rounded-[40px] border border-dark/5 shadow-[0_15px_45px_rgba(0,18,51,0.03)]">
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <span className="material-symbols-outlined text-6xl text-emerald-500">check_circle</span>
                  <h3 className="text-2xl font-black text-dark tracking-tight">Mandate Received</h3>
                  <p className="text-dark/60 font-secondary max-w-sm mx-auto">
                    Your startup profile has been successfully cataloged. One of our managing partners will reach out within 24 hours to schedule your consultation.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", phone: "", vertical: "", message: "" }); }}
                    className="inline-flex bg-dark text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#002366] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <h2 className="text-3xl font-black text-dark tracking-tighter mb-8 border-b border-dark/5 pb-4">
                    Submit Strategic Mandate
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Full Identity *</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className={`w-full bg-[#FAF9F6] border ${errors.name ? 'border-red-500' : 'border-dark/10'} rounded-xl px-4 py-4 text-dark focus:border-[#002366] outline-none transition-all placeholder:text-dark/25 font-secondary`}
                        placeholder="Founder Name"
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Corporate Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className={`w-full bg-[#FAF9F6] border ${errors.email ? 'border-red-500' : 'border-dark/10'} rounded-xl px-4 py-4 text-dark focus:border-[#002366] outline-none transition-all placeholder:text-dark/25 font-secondary`}
                        placeholder="exec@company.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Contact Phone (Optional)</label>
                      <input
                        type="text"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#FAF9F6] border border-dark/10 rounded-xl px-4 py-4 text-dark focus:border-[#002366] outline-none transition-all placeholder:text-dark/25 font-secondary"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Target Vertical *</label>
                      <select
                        name="vertical"
                        value={formState.vertical}
                        onChange={handleInputChange}
                        className={`w-full bg-[#FAF9F6] border ${errors.vertical ? 'border-red-500' : 'border-dark/10'} rounded-xl px-4 py-4 text-dark focus:border-[#002366] outline-none transition-all font-secondary`}
                      >
                        <option value="">Select Accelerator Service</option>
                        <option value="funding">Capital Raising / Co-investment</option>
                        <option value="circular">Circular Supply Chain (BWorth)</option>
                        <option value="sales">Managed Sales & Activation (Vega Vrudhi)</option>
                        <option value="ai">AI Agents & Brand Identity (Synchronous)</option>
                        <option value="tech">IoT & Deep-Tech (RYM)</option>
                      </select>
                      {errors.vertical && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.vertical}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 ml-1">Mandate Specifications *</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formState.message}
                      onChange={handleInputChange}
                      className={`w-full bg-[#FAF9F6] border ${errors.message ? 'border-red-500' : 'border-dark/10'} rounded-xl px-4 py-4 text-dark focus:border-[#002366] outline-none transition-all placeholder:text-dark/25 font-secondary`}
                      placeholder="Outline your startup stage, metrics, and what you seek to achieve..."
                    />
                    {errors.message && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#002366] text-white py-5 rounded-xl text-xs font-black uppercase tracking-[0.25em] shadow-lg shadow-[#002366]/20 hover:bg-dark transition-all duration-300"
                  >
                    Submit Mandate & Request Call
                  </button>
                </form>
              )}
            </div>

            {/* Right: Geographic Map and Addresses */}
            <div className="lg:col-span-5 space-y-12">
              
              {/* Google Map Mockup */}
              <div className="bg-white border border-dark/5 p-6 rounded-[40px] shadow-[0_15px_45px_rgba(0,18,51,0.03)] relative overflow-hidden h-[360px] flex flex-col justify-end group">
                <div className="absolute inset-0 grayscale opacity-45 group-hover:grayscale-0 transition-all duration-1000 bg-[#E8ECEF]">
                  {/* Grid layout representing map streets */}
                  <svg className="w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="10" y1="0" x2="10" y2="100" stroke="white" strokeWidth="1" />
                    <line x1="30" y1="0" x2="30" y2="100" stroke="white" strokeWidth="1.5" />
                    <line x1="70" y1="0" x2="70" y2="100" stroke="white" strokeWidth="1" />
                    <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="1.5" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="1" />
                    <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeWidth="2" />
                    <circle cx="30" cy="50" r="2.5" fill="#002366" />
                    <circle cx="70" cy="20" r="2" fill="#002366" opacity="0.5" />
                  </svg>
                </div>
                
                <div className="relative z-10 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white max-w-sm shadow-md">
                  <h4 className="text-sm font-black text-dark mb-1">RiseMate Global Headquarters</h4>
                  <p className="text-xs text-dark/60 font-secondary leading-normal mb-3">7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69, Gurugram, India</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-[#002366] hover:underline"
                  >
                    Open in Google Maps
                    <span className="material-symbols-outlined text-[10px]">north_east</span>
                  </a>
                </div>
              </div>

              {/* Physical Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white border border-dark/5 rounded-3xl">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#002366] mb-3 block">Corporate Head Office</span>
                  <h4 className="text-lg font-black text-dark mb-2">Gurugram (NCR)</h4>
                  <p className="text-xs text-dark/50 font-secondary leading-relaxed">
                    7th Floor, Spaze Plazo, <br />
                    Golf Course Ext. Road Sector – 69.
                  </p>
                </div>

                <div className="p-6 bg-white border border-dark/5 rounded-3xl">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gold mb-3 block">Royal Heritage Hub</span>
                  <h4 className="text-lg font-black text-dark mb-2">Jaipur (Rajasthan)</h4>
                  <p className="text-xs text-dark/50 font-secondary leading-relaxed">
                    Vinayak Enclave, <br />
                    Jagatpura.
                  </p>
                </div>
              </div>

              {/* Social Channels grid */}
              <div className="bg-white border border-dark/5 p-8 rounded-3xl">
                <span className="text-[9px] font-black uppercase tracking-widest text-dark/40 mb-6 block">Institutional Social Registry</span>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com" target="_blank"
                    className="flex-1 flex flex-col items-center justify-center py-4 bg-[#FAF9F6] border border-dark/5 rounded-2xl hover:border-[#002366]/20 transition-all group"
                  >
                    <span className="text-xs font-black text-dark group-hover:text-[#002366] transition-colors font-secondary">LinkedIn</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-dark/30 mt-1">Institutional</span>
                  </a>
                  <a
                    href="https://whatsapp.com" target="_blank"
                    className="flex-1 flex flex-col items-center justify-center py-4 bg-[#FAF9F6] border border-dark/5 rounded-2xl hover:border-emerald-500/20 transition-all group"
                  >
                    <span className="text-xs font-black text-dark group-hover:text-emerald-600 transition-colors font-secondary">WhatsApp</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-dark/30 mt-1">Direct Chat</span>
                  </a>
                  <a
                    href="https://instagram.com" target="_blank"
                    className="flex-1 flex flex-col items-center justify-center py-4 bg-[#FAF9F6] border border-dark/5 rounded-2xl hover:border-pink-500/20 transition-all group"
                  >
                    <span className="text-xs font-black text-dark group-hover:text-pink-600 transition-colors font-secondary">Instagram</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-dark/30 mt-1">Ecosystem Feed</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
