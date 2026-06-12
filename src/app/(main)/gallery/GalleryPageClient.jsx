"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function GalleryPage({
  initialCategories = [],
  initialLoaded = false,
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    axios
      .get("/api/client/gallery-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          // Index_No ascending (lower = top), nulls last
          const sorted = [...data].sort((a, b) => {
            if (a.Index_No === null && b.Index_No === null) return 0;
            if (a.Index_No === null) return 1;
            if (b.Index_No === null) return -1;
            return a.Index_No - b.Index_No;
          });
          setCategories(sorted);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 antialiased pb-20 selection:bg-[#01327F]/10 selection:text-[#01327F]">
      
      {/* ── Corporate Identity Hero Header Block ── */}
      <header className="relative bg-[#01327F] pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Brand Ambiance Background Elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-[#01327F] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#01327F] animate-pulse" />
            Media Portal
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            Photo Gallery
          </h1>
          
          <p className="text-sm sm:text-base text-white/70 max-w-2xl font-normal leading-relaxed mt-1">
            Explore our campus life, events and achievements
          </p>
        </div>
      </header>

      {/* ── Main Workspace Content Wrapper ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Shimmer Placeholder Skeletal Loading Viewport */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-72 shadow-sm" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          /* Empty Dataset Container State Notice */
          <div className="py-24 text-center max-w-sm mx-auto animate-in fade-in duration-300">
            <div className="p-4 rounded-full bg-gray-100 border border-gray-200 inline-block text-gray-400 mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 className="text-base font-black text-[#01327F]">No galleries yet</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">Check back soon for photos and updates.</p>
          </div>
        ) : (
          /* Media Category Grid Matrix Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 animate-in fade-in duration-300">
            {categories.map((cat) => (
              <Link 
                key={cat.Id} 
                href={`/gallery/${cat.Id}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail Header Panel Area */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  {cat.Image ? (
                    <>
                      <Image
                        src={`/uploads/${cat.Image}`}
                        alt={cat.Name || "Gallery"}
                        fill
                        sizes="(max-width: 540px) 100vw, (max-width: 860px) 50vw, (max-width: 1100px) 33vw, 25vw"
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      {/* Micro Ambient Hover Overlay Gradient */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Interactive Glassmorphic Navigation Pointer Badge */}
                      <div className="absolute bottom-4 right-4 p-2 bg-white/10 border border-white/10 backdrop-blur-md text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:bg-[#01327F] group-hover:border-[#01327F] translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    /* Default Placeholder Fallback Visual State */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#01327F]/[0.03] to-amber-400/[0.01]">
                      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#eab308" strokeWidth={1} className="opacity-40">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Metadata Description Info Payload Segment */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4 bg-white">
                  <div className="space-y-1.5">
                    <h2 className="text-base sm:text-lg font-black text-[#01327F] tracking-tight group-hover:text-amber-500 transition-colors line-clamp-1 leading-snug">
                      {cat.Name || "Untitled Gallery"}
                    </h2>
                    {cat.Description && (
                      <p className="text-xs text-gray-500 font-normal leading-relaxed line-clamp-2">
                        {cat.Description.replace(/<[^>]+>/g, " ").trim()}
                      </p>
                    )}
                  </div>

                  {/* Interactive Action Anchor Border Rule */}
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#01327F] group-hover:text-amber-500 transition-colors">
                      View Photos
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
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