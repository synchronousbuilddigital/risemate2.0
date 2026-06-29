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
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-[#002366] mb-3 block">Ecosystem Insights</span>
          <h1 className="text-5xl md:text-[5.5rem] font-black text-dark tracking-tighter leading-none mb-6">
            Our News & Articles
          </h1>
          <p className="text-lg text-dark/50 font-secondary leading-relaxed">
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
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeCategory === c ? "bg-[#002366] text-white shadow-sm" : "bg-white border border-dark/5 text-dark/60 hover:text-dark"}`}
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
              className="w-full bg-white border border-dark/10 rounded-full pl-12 pr-6 py-3 text-sm text-dark focus:border-[#002366] outline-none transition-all placeholder:text-dark/30 font-secondary"
            />
          </div>
        </div>

        {/* Blogs List */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-dark/5 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  {/* Featured Image */}
                  <Link href={`/blog/${blog.slug}`} className="relative aspect-[16/10] block overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#002366]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-[#FAF9F6] border border-dark/5 text-[9px] font-black uppercase tracking-wider text-[#002366] rounded-md">
                        {blog.category}
                      </span>
                      <span className="text-[10px] text-dark/45 font-bold uppercase tracking-wider">
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-dark tracking-tight leading-snug mb-3 group-hover:text-[#002366] transition-colors">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-sm text-dark/60 font-secondary leading-relaxed line-clamp-3 mb-6">
                      {blog.description}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-6 md:p-8 pt-0 border-t border-dark/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#002366]/10 flex items-center justify-center font-black text-xs text-[#002366] uppercase">
                      {blog.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-black text-dark leading-none">{blog.author}</p>
                      <p className="text-[9px] font-bold text-dark/40 uppercase tracking-widest mt-1">{blog.date}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-dark/5 flex items-center justify-center group-hover:bg-[#002366] group-hover:text-white transition-colors duration-500"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
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
