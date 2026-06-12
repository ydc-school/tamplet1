"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const sortByIndex = (items) =>
  [...items].sort((a, b) => {
    const aIndex = a?.Index_No;
    const bIndex = b?.Index_No;

    if (aIndex === null || aIndex === undefined) return 1;
    if (bIndex === null || bIndex === undefined) return -1;

    return aIndex - bIndex;
  });

export default function TopperCategoryPage({
  initialCategories = [],
  initialLoaded = false,
}) {
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
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 antialiased pb-20">
      
      {/* Hero Section */}
      <header className="relative bg-[#01327F] pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-[#01327F] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#01327F] animate-pulse" />
            Hall of Fame
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            Topper Categories
          </h1>
          
          <p className="text-sm sm:text-base text-white/70 max-w-2xl font-normal leading-relaxed mt-1">
            Explore topper groups by stream, level, class, or academic year and open each category to view the students featured inside it.
          </p>

          {!loading && (
            <div className="inline-flex items-center gap-2 mt-2 bg-white/[0.07] border border-white/[0.1] px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400">
              <span>{categories.length}</span>
              <span className="text-white/60">Categor{categories.length === 1 ? "y" : "ies"} Available</span>
            </div>
          )}
        </div>
      </header>

      {/* Body Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-56 bg-white rounded-2xl border border-gray-100 shadow-sm" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="py-24 text-center max-w-sm mx-auto">
            <div className="p-4 rounded-full bg-gray-100 border border-gray-200 inline-block text-gray-400 mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0l-2-2m2 2l-2 2M5 7h14M5 12h5" />
              </svg>
            </div>
            <h3 className="text-base font-black text-[#01327F]">No topper categories found</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">New categories will appear here once they are added.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.Id} 
                href={`/topper-category/${category.Id}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Decorative Header Block */}
                <div className="h-2 bg-gradient-to-r from-[#01327F] to-amber-500" />
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Order {category.Index_No ?? 0}</span>
                      <div className="flex gap-2">
                        {category.Class && <span className="bg-blue-50 text-[#01327F] px-2 py-0.5 rounded text-[10px] font-bold">{category.Class}</span>}
                        {category.Year && <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">{category.Year}</span>}
                      </div>
                    </div>
                    
                    <h2 className="text-lg font-black text-[#01327F] mb-3 group-hover:text-amber-600 transition-colors">
                      {category.Name || `Category ${category.Id}`}
                    </h2>
                    
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      View the topper list for this category and open student profiles for more details.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#01327F] group-hover:translate-x-1 transition-transform">
                      View Toppers
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}