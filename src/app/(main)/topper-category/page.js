"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

// Helper function to safely sort categories by index
const sortByIndex = (items) =>
  [...items].sort((a, b) => {
    const aIndex = a?.Index_No ?? 999;
    const bIndex = b?.Index_No ?? 999;
    return aIndex - bIndex;
  });

export default function TopperCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          setCategories(sortByIndex(data));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#fcfbfc] min-h-screen py-16 md:py-24 overflow-hidden relative selection:bg-[#c4a048]/20">
      {/* Background Geometric Line Flourishes */}
      <div className="absolute top-12 left-6 w-32 h-32 border border-[#e2e8f0]/40 rotate-45 pointer-events-none hidden lg:block" />
      <div className="absolute top-24 left-14 w-20 h-20 border border-[#e2e8f0]/30 rotate-45 pointer-events-none hidden lg:block" />
      <div className="absolute top-12 right-6 w-32 h-32 border border-[#e2e8f0]/40 rotate-45 pointer-events-none hidden lg:block" />
      <div className="absolute top-24 right-14 w-20 h-20 border border-[#e2e8f0]/30 rotate-45 pointer-events-none hidden lg:block" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Page Header */}
        <header className="flex flex-col items-center text-center space-y-3 mb-14 md:mb-20 max-w-2xl mx-auto">
          <p className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.35em] uppercase">
            Hall of Fame
          </p>
          <h1 className="font-serif text-3xl md:text-[2.75rem] font-black text-[#1e1b4b] tracking-tight uppercase">
            Topper Categories
          </h1>
          <p className="font-sans text-sm md:text-base text-slate-500 font-medium tracking-wide">
            Explore topper groups by stream, level, class, or academic year.
          </p>
          
          {!loading && (
            <p 
              aria-live="polite" 
              className="inline-block pt-1 font-sans font-semibold text-xs text-slate-700 tracking-wide"
            >
              Showing {categories.length} Categor{categories.length === 1 ? "y" : "ies"}
            </p>
          )}
        </header>

        {/* Main Content Area */}
        <section aria-label="List of topper categories" className="min-h-[300px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-slate-100 rounded-2xl h-[180px] animate-pulse w-full" 
                />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div role="status" className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm max-w-md mx-auto">
              <p className="font-sans font-medium text-slate-400">No topper categories listed at the moment.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 m-0 p-0 list-none">
              {categories.map((category) => (
                <li key={category.Id} className="m-0 p-0">
                  <article className="bg-white border-2 border-transparent rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(196,160,72,0.12)] hover:border-[#c4a048] transition-all duration-300 transform hover:-translate-y-1 will-change-transform flex flex-col h-full group">
                    <Link 
                      href={`/topper-category/${category.Id}`} 
                      className="p-6 md:p-8 flex flex-col justify-between items-start h-full flex-1 focus:outline-none"
                    >
                      <div className="w-full space-y-2.5">
                        <header>
                          <h2 className="font-serif text-lg md:text-xl font-black text-[#1e1b4b] tracking-tight uppercase group-hover:text-[#c4a048] transition-colors duration-200 line-clamp-1">
                            {category.Name || `Category ${category.Id}`}
                          </h2>
                        </header>
                        
                        <section className="tc-card-body">
                          <p className="font-sans text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                            View the topper list for this category and open student profiles.
                          </p>
                        </section>
                      </div>

                      <footer className="w-full pt-5 mt-5 border-t border-slate-50 flex flex-wrap items-center gap-2 select-none">
                        {category.Class && (
                          <span className="bg-white text-[#c4a048] font-sans font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-[#c4a048]/60">
                            {category.Class}
                          </span>
                        )}
                        {category.Year && (
                          <span className="bg-white text-[#c4a048] font-sans font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-[#c4a048]/60">
                            {category.Year}
                          </span>
                        )}
                        {!category.Class && !category.Year && (
                          <span className="bg-white text-[#c4a048] font-sans font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-[#c4a048]/60">
                            Active
                          </span>
                        )}
                      </footer>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  );
}