"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// HTML स्ट्रिप और डेट फ़ॉर्मेटिंग हेल्पर्स
const stripHtml = (htmlString) => {
  if (!htmlString) return "";
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function BlogsListPage({ initialBlogs = [], initialPagination = { total: 0, totalPages: 1 }, initialLoaded = false }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(!initialLoaded);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ... (आपकी Fetch / Axios और Debounce लॉजिक यहाँ बिना किसी बदलाव के परफेक्ट काम करेगी)
  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 overflow-hidden relative">
      {/* एम्बिएंट सॉफ्ट बैकग्राउंड लाइट्स */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[#c4a048]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* PREMIUM HERO BANNER HEADER & SEARCH LANDMARK */}
        <header className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-24 max-w-2xl mx-auto">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            Knowledge &amp; Insights
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-[#1e1b4b] tracking-tight">
            Our Blog
          </h1>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mx-auto" />
          
          {/* मॉडर्न इनलाइन सर्च बार */}
          <form 
            role="search" 
            onSubmit={(e) => e.preventDefault()} 
            className="w-full max-w-md pt-6 relative group"
          >
            <div className="relative flex items-center">
              <input 
                type="search" 
                placeholder="Search articles..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 focus:border-[#c4a048] rounded-full font-sans text-sm text-[#0f172a] focus:outline-none focus:ring-4 focus:ring-[#c4a048]/5 transition-all shadow-sm group-hover:shadow-md"
              />
              {/* इनलाइन मैग्नीफाइंग ग्लास आइकन */}
              <svg className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none transition-colors group-focus-within:text-[#c4a048]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>
        </header>

        {/* CORE GRID FEED SECTION */}
        <section aria-label="Blog posts" className="min-h-[400px]">
          {loading ? (
            /* स्केलेटन पल्स फीड लोडर */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-[2rem] h-[420px] animate-pulse w-full" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            /* एम्प्टी रिज़ल्ट फॉलबैक */
            <div className="text-center py-20 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <p className="font-sans font-medium text-base text-slate-400">No articles match your search criteria.</p>
            </div>
          ) : (
            /* 3-COLUMN INTEGRATED PRECISION GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <article 
                  key={b.Id} 
                  className="bg-white border border-[#f1f5f9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group h-full"
                >
                  <Link href={`/blogs/${b.Id}`} className="flex flex-col h-full focus:outline-none">
                    
                    {/* थंबनेल रैपर */}
                    <figure className="relative w-full aspect-[1.625/1] bg-slate-100 overflow-hidden">
                      <Image 
                        src={`/uploads/${b.Image}`} 
                        alt={b.Title} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-103"
                        sizes="(max-w-768px) 100vw, 33vw"
                      />
                    </figure>

                    {/* इंफो डेटा कार्ड */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <h2 className="font-serif text-xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors leading-snug line-clamp-2">
                          {b.Title}
                        </h2>
                        <p className="font-sans text-sm text-[#0f172a]/60 font-medium leading-relaxed line-clamp-3">
                          {stripHtml(b.Description)}
                        </p>
                      </div>

                      {/* फूटर मेटा रोज़ */}
                      <footer className="pt-4 border-t border-slate-100 flex items-center justify-between font-sans text-xs font-black uppercase tracking-wider text-slate-400 select-none">
                        <address className="not-italic text-[#1e1b4b]/80 font-bold">
                          By {b.Author || "Admin"}
                        </address>
                        <time dateTime={b.Date} className="font-medium text-slate-400/80">
                          {formatDate(b.Date)}
                        </time>
                      </footer>
                    </div>

                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ACCESSIBLE NUMBERED PAGINATION NAV LANDMARK */}
        {pagination.totalPages > 1 && !loading && (
          <nav aria-label="Pagination Navigation" className="mt-16 md:mt-24 flex justify-center">
            <ol className="flex items-center gap-2 bg-white border border-[#f1f5f9] px-4 py-2 rounded-full shadow-md select-none">
              {Array.from({ length: pagination.totalPages }, (_, i) => {
                const pageNum = i + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <li key={pageNum}>
                    <button 
                      aria-current={isCurrent ? "page" : undefined}
                      onClick={() => handlePage(pageNum)}
                      className={`w-10 h-10 rounded-full font-sans font-black text-xs transition-all duration-300 flex items-center justify-center focus:outline-none active:scale-90
                        ${isCurrent 
                          ? "bg-gradient-to-r from-[#c4a048] to-[#aa842c] text-white shadow-md scale-105" 
                          : "bg-transparent text-[#1e1b4b] hover:bg-slate-50 border border-transparent hover:border-slate-100"
                        }`}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

      </div>
    </main>
  );
}