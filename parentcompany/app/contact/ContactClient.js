"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactClient() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formState.interest) newErrors.interest = "Please select an area of interest";
    if (!formState.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Inquiry submission error:", err);
      setSubmitError("A connection error occurred. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen relative overflow-x-hidden selection:bg-gold selection:text-black">

      {/* 1. HERO SECTION (PREMIUM LIGHT) */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-24 overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-gold/5 via-transparent to-transparent rounded-full blur-[100px] opacity-70 pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gray-100 via-transparent to-transparent rounded-full blur-[80px] opacity-70 pointer-events-none translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-8">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800">Available for Partnerships</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-[1.05] font-primary mb-8">
                Let's Build <br />
                <span className="text-gray-400">The Future.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 font-secondary leading-relaxed mb-10 max-w-lg">
                Whether you're looking to scale globally, raise capital, or establish a presence in new markets, RiseMates Ventures is your strategic growth partner.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 sm:items-center text-sm font-bold text-gray-700 font-secondary">
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                  <span className="material-symbols-outlined text-gold">schedule</span>
                  Mon - Fri, 9:00 AM - 6:00 PM
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                  <span className="material-symbols-outlined text-gold">forum</span>
                  24hr Response Guarantee
                </div>
              </div>
            </motion.div>

            {/* Right: Elegant Image/Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square md:aspect-[4/3] rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl group"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Corporate Collaboration"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined">headset_mic</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-black">Direct Consultation</h4>
                    <p className="text-xs text-gray-500 font-secondary mt-1">Speak directly with our managing partners to map out your growth trajectory.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT FORM & LOCATIONS (BENTO STYLE) */}
      <section className="py-24 px-6 md:px-24 bg-gray-50 relative border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[40px] border border-gray-200 shadow-sm">
              {submitted ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl text-green-500">check_circle</span>
                  </div>
                  <h3 className="text-3xl font-black text-black tracking-tight mb-4">Request Received</h3>
                  <p className="text-gray-500 font-secondary max-w-sm mx-auto mb-8">
                    Thank you for reaching out. A partner from our team will contact you shortly to schedule your consultation.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", phone: "", interest: "", message: "" }); setSubmitError(""); }}
                    className="inline-flex bg-black text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all shadow-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-black tracking-tighter font-primary mb-3">
                      Get In Touch
                    </h2>
                    <p className="text-sm text-gray-500 font-secondary">Fill out the form below and we'll get back to you promptly.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-2xl px-5 py-4 text-black focus:bg-white focus:border-black outline-none transition-all placeholder:text-gray-400 font-secondary`}
                        placeholder="Ravi Kumar"
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-bold ml-2">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Work Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-2xl px-5 py-4 text-black focus:bg-white focus:border-black outline-none transition-all placeholder:text-gray-400 font-secondary`}
                        placeholder="ravi@company.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold ml-2">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-black focus:bg-white focus:border-black outline-none transition-all placeholder:text-gray-400 font-secondary"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Area of Interest *</label>
                      <select
                        name="interest"
                        value={formState.interest}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${errors.interest ? 'border-red-500' : 'border-gray-200'} rounded-2xl px-5 py-4 text-black focus:bg-white focus:border-black outline-none transition-all font-secondary appearance-none`}
                      >
                        <option value="">Select an area...</option>
                        <option value="growth">Business Growth Strategy</option>
                        <option value="funding">Capital Raising & Funding</option>
                        <option value="market_entry">Global Market Entry (India/Global)</option>
                        <option value="partnerships">Corporate Partnerships</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                      {errors.interest && <p className="text-[10px] text-red-500 font-bold ml-2">{errors.interest}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Your Message *</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formState.message}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-2xl px-5 py-4 text-black focus:bg-white focus:border-black outline-none transition-all placeholder:text-gray-400 font-secondary resize-none`}
                      placeholder="Tell us about your business goals and how we can help..."
                    />
                    {errors.message && <p className="text-[10px] text-red-500 font-bold ml-2">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold font-secondary">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-black/10 hover:bg-gold hover:text-black hover:shadow-gold/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                    {!isSubmitting && <span className="material-symbols-outlined text-[16px]">arrow_forward</span>}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Locations & Direct Contacts */}
            <div className="lg:col-span-5 space-y-6">

              {/* HQ Card */}
              <div className="bg-white p-8 rounded-[40px] border border-gray-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">Global Headquarters</span>
                <h3 className="text-2xl font-black text-black font-primary mb-4">Gurugram, India</h3>
                <p className="text-sm text-gray-600 font-secondary leading-relaxed mb-6">
                  7th Floor, Spaze Plazo, <br />
                  Golf Course Ext. Road Sector – 69, <br />
                  Gurugram, Haryana.
                </p>
                <div className="space-y-3">
                  <a href="mailto:biz@RiseMatesventures.com" className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-black transition-colors group/link">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-gold group-hover/link:text-black transition-colors">
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                    </div>
                    biz@RiseMatesventures.com
                  </a>
                  <a href="tel:+918239660777" className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-black transition-colors group/link">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-gold group-hover/link:text-black transition-colors">
                      <span className="material-symbols-outlined text-[16px]">call</span>
                    </div>
                    +91 82396 60777
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="bg-black p-8 rounded-[40px] shadow-xl text-white">
                <h3 className="text-lg font-black tracking-tight mb-6 font-primary">Connect with us</h3>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/company/risematesventures/posts/?feedView=all" target="_blank" className="flex-1 flex flex-col items-center justify-center p-4 bg-white/10 rounded-2xl hover:bg-gold hover:text-black transition-all">
                    <span className="font-bold text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. ECOSYSTEM ENTITIES (PREMIUM CARDS) */}
      <section className="py-24 px-6 md:px-24 bg-white relative border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-3 block">Our Ecosystem</span>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tighter font-primary">Ecosystem Entities</h2>
            <p className="text-sm text-gray-500 font-secondary mt-2 max-w-lg mx-auto">
              Specialized entities within the RiseMates Ventures network delivering domain-specific expertise and execution capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* BWorth */}
            <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 hover:shadow-xl hover:border-gold transition-all duration-300 group cursor-default flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden border border-gray-100">
                <Image src="/BWORTH.jpg" alt="BWorth" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <h3 className="text-lg font-black text-black mb-1">BWorth</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4 inline-block font-secondary">Circular Supply</span>
              <p className="text-xs text-gray-500 font-secondary leading-relaxed">
                Specializing in sustainable raw materials, scrap supply chains, recycling networks, and circular economy infrastructure.
              </p>
            </div>

            {/* Vega Vrudhi */}
            <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 hover:shadow-xl hover:border-gold transition-all duration-300 group cursor-default flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden border border-gray-100 p-2">
                <Image src="/VEGA.png" alt="Vega Vrudhi" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <h3 className="text-lg font-black text-black mb-1">Vega Vrudhi</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4 inline-block font-secondary">Sales & Execution</span>
              <p className="text-xs text-gray-500 font-secondary leading-relaxed">
                Providing end-to-end sales force outsourcing, channel expansion, retail distribution network, and on-ground brand activation.
              </p>
            </div>

            {/* RYM Grenergy */}
            <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 hover:shadow-xl hover:border-gold transition-all duration-300 group cursor-default flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden border border-gray-100 p-2">
                <Image src="/RYM.png" alt="RYM Grenergy" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <h3 className="text-lg font-black text-black mb-1">RYM Grenergy</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4 inline-block font-secondary">IoT & Deep-Tech</span>
              <p className="text-xs text-gray-500 font-secondary leading-relaxed">
                Developing custom hardware, sensor networks, smart metering, remote diagnostics, and industrial IoT solutions.
              </p>
            </div>

            {/* Synchronous */}
            <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 hover:shadow-xl hover:border-gold transition-all duration-300 group cursor-default flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden border border-gray-100 p-2">
                <Image src="/sync.jpg" alt="Synchronous" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <h3 className="text-lg font-black text-black mb-1">Synchronous</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4 inline-block font-secondary">AI & Brand Identity</span>
              <p className="text-xs text-gray-500 font-secondary leading-relaxed">
                Powering corporate digital transformation, web and mobile development, custom AI tools, and cohesive brand design.
              </p>
            </div>

            {/* Sovra */}
            <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 hover:shadow-xl hover:border-gold transition-all duration-300 group cursor-default flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden border border-gray-100 p-2">
                <Image src="/sovra.png" alt="Sovra" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <h3 className="text-lg font-black text-black mb-1">Sovra</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4 inline-block font-secondary">Jewellery & Luxury</span>
              <p className="text-xs text-gray-500 font-secondary leading-relaxed">
                Curating premium jewellery brands with a focus on craftsmanship, heritage design, and modern retail distribution.
              </p>
            </div>

            {/* Seemee */}
            <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 hover:shadow-xl hover:border-gold transition-all duration-300 group cursor-default flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden border border-gray-100 p-2">
                <Image src="/seeme.png" alt="Seemee" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <h3 className="text-lg font-black text-black mb-1">Seemee</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4 inline-block font-secondary">Fashion & Apparel</span>
              <p className="text-xs text-gray-500 font-secondary leading-relaxed">
                Building contemporary clothing brands through design innovation, supply chain development, and omnichannel retail growth.
              </p>
            </div>

            {/* Boxfox */}
            <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 hover:shadow-xl hover:border-gold transition-all duration-300 group cursor-default flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden border border-gray-100 p-2">
                <Image src="/boxfox.png" alt="Boxfox" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <h3 className="text-lg font-black text-black mb-1">Boxfox</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4 inline-block font-secondary">Logistics & Delivery</span>
              <p className="text-xs text-gray-500 font-secondary leading-relaxed">
                Enabling last-mile delivery, packaging solutions, and end-to-end fulfilment infrastructure for D2C and e-commerce brands.
              </p>
            </div>

            {/* Closetrush */}
            <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 hover:shadow-xl hover:border-gold transition-all duration-300 group cursor-default flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden border border-gray-100 p-2">
                <Image src="/closetruh.png" alt="Closetrush" width={40} height={40} className="object-contain" unoptimized />
              </div>
              <h3 className="text-lg font-black text-black mb-1">Closetrush</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4 inline-block font-secondary">Fashion Resale</span>
              <p className="text-xs text-gray-500 font-secondary leading-relaxed">
                Powering the circular fashion economy through curated pre-owned clothing, resale platform infrastructure, and sustainable wardrobe solutions.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
