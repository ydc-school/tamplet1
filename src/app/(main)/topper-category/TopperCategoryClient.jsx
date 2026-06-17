"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const sortByIndex = (items) =>
  [...items].sort((a, b) => {
    const aIndex = a?.Index_No ?? 999;
    const bIndex = b?.Index_No ?? 999;
    return aIndex - bIndex;
  });

export default function TopperCategoryPage({ initialCategories = [], initialLoaded = false }) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    axios
      .get("/api/client/toper-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          setCategories(sortByIndex(data));
        }
      })
      .finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#c4a048]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        <header className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-24 max-w-2xl mx-auto">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            Hall of Fame
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-[#1e1b4b] tracking-tight">
            Topper Categories
          </h1>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mx-auto" />
          <p className="font-sans text-sm md:text-base text-[#0f172a]/60 font-medium pt-2">
            Explore topper groups by stream, level, class, or academic year.
          </p>
          
          {!loading && (
            <span 
              aria-live="polite" 
              className="inline-block mt-4 font-sans font-black text-[10px] md:text-xs uppercase tracking-widest text-[#1e1b4b]/40 bg-slate-100 border border-slate-200/40 px-4 py-1.5 rounded-full"
            >
              Showing {categories.length} {categories.length === 1 ? "Category" : "Categories"}
            </span>
          )}
        </header>

        <section aria-label="List of topper categories" className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] h-[260px] animate-pulse w-full" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div role="status" className="text-center py-20 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <p className="font-sans font-medium text-base text-slate-400">No topper listings recorded yet.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-0 p-0 list-none">
              {categories.map((category) => (
                <li key={category.Id} className="m-0 p-0">
                  <article className="bg-white border border-[#f1f5f9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#c4a048]/60 hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full group">
                    <Link href={`/topper-category/${category.Id}`} className="p-8 md:p-10 flex flex-col justify-between items-start h-full flex-1 focus:outline-none">
                      
                      <div className="space-y-4 w-full">
                        <div className="w-10 h-10 rounded-xl bg-[#7f1d1d]/5 border border-[#7f1d1d]/10 flex items-center justify-center text-[#7f1d1d]">
                          <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                          </svg>
                        </div>

                        <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors leading-snug line-clamp-2">
                          {category.Name || `Category ${category.Id}`}
                        </h2>
                        
                        <p className="font-sans text-sm text-[#0f172a]/60 font-medium leading-relaxed line-clamp-3">
                          {category.Description || "View the topper list for this category and open student profiles."}
                        </p>
                      </div>

                      <footer className="w-full pt-6 mt-6 border-t border-slate-50 flex flex-wrap items-center justify-between gap-4 select-none">
                        <div className="flex flex-wrap items-center gap-2">
                          {category.Class && (
                            <span className="bg-[#fdfbf7] text-[#aa842c] font-sans font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#c4a048]/30">
                              {category.Class}
                            </span>
                          )}
                          {category.Year && (
                            <span className="bg-[#fdfbf7] text-[#aa842c] font-sans font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#c4a048]/30">
                              {category.Year}
                            </span>
                          )}
                          {!category.Class && !category.Year && (
                            <span className="bg-[#fdfbf7] text-[#aa842c] font-sans font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#c4a048]/30">
                              Active Segment
                            </span>
                          )}
                        </div>

                        <div className="w-8 h-8 rounded-full bg-[#fdfbf7] group-hover:bg-[#7f1d1d] group-hover:text-white border border-[#c4a048]/10 flex items-center justify-center transition-all duration-300 ml-auto">
                          <svg className="w-3.5 h-3.5 stroke-current transform group-hover:translate-x-0.5 transition-transform" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
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