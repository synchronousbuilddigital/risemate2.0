"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = ["All", "Startup Funding", "Business Growth", "Investment Tips", "Founder Stories", "Market Insights"];

export default function BlogClient({ initialBlogs }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = initialBlogs.filter(blog => {
    const matchesCategory = activeCategory === "All" || blog.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 md:py-24">
      <div className="container-wide">
        
        {/* Header Title */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-[#DFBA6B] mb-3 block">Our News & Articles</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-dark tracking-tighter leading-none mb-6 sm:whitespace-nowrap">
            Ecosystem Insights
          </h1>
          <p className="text-lg text-dark/50 font-secondary leading-relaxed max-w-2xl">
            Stay updated with investment guidance, circular retail analysis, direct-to-consumer sales strategies, and founder stories.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center mb-12 border-b border-dark/5 pb-8">
          {/* Categories list */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeCategory === c ? "bg-black text-[#DFBA6B] border-black shadow-md" : "bg-white border border-dark/5 text-dark/60 hover:text-dark"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative max-w-sm w-full">
            <span className="material-symbols-outlined text-dark/30 absolute left-4 top-1/2 -translate-y-1/2">search</span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-dark/10 rounded-full pl-12 pr-6 py-3 text-sm text-dark focus:border-[#DFBA6B] outline-none transition-all placeholder:text-dark/30 font-secondary"
            />
          </div>
        </div>

        {/* Blogs List */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-dark/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  {/* Featured Image */}
                  <Link href={`/blog/${blog.slug}`} className="relative aspect-[16/10] block overflow-hidden bg-gray-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#DFBA6B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>

                  {/* Body Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="px-2 py-0.5 bg-[#FAF9F6] border border-[#DFBA6B]/15 text-[8.5px] font-black uppercase tracking-wider text-[#DFBA6B] rounded-md">
                        {blog.category}
                      </span>
                      <span className="text-[9px] text-dark/45 font-bold uppercase tracking-wider">
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-black text-dark tracking-tight leading-snug mb-2 group-hover:text-[#DFBA6B] transition-colors">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-[11px] text-dark/60 font-secondary leading-relaxed line-clamp-2 mb-3">
                      {blog.description}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-4 pt-0 border-t border-dark/5 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5 mt-3">
                    <div className="w-7 h-7 rounded-full bg-[#DFBA6B]/10 flex items-center justify-center font-black text-[10px] text-[#DFBA6B] uppercase">
                      {blog.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-dark leading-none">{blog.author}</p>
                      <p className="text-[8px] font-bold text-dark/40 uppercase tracking-widest mt-1">{blog.date}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dark/5 rounded-3xl">
            <span className="material-symbols-outlined text-5xl text-dark/20 mb-4">search_off</span>
            <h3 className="text-xl font-black text-dark tracking-tight">No Articles Found</h3>
            <p className="text-dark/50 font-secondary mt-1 max-w-sm mx-auto">
              We couldn't find any articles matching your search query. Try choosing another category or keyword.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
