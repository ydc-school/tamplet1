"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function GalleryCategoryPage({
  categoryId: categoryIdProp,
  initialCategory = null,
  initialGalleries = [],
  initialLoaded = false,
}) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const router = useRouter();
  const [category] = useState(initialCategory);
  const [galleries, setGalleries] = useState(initialGalleries);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    if (!categoryId) return;

    axios.get(`/api/client/gallery?Gallery_Category_Id=${categoryId}`)
      .then((res) => {
        if (res.data.status === "success") {
          setGalleries(res.data.data?.data ?? []);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));

  }, [categoryId, initialLoaded]);

  const stripHtml = (html) => html?.replace(/<[^>]+>/g, " ").trim() ?? "";

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 antialiased pb-20 selection:bg-[#01327F]/10 selection:text-[#01327F]">
      
      {/* ── Corporate Identity Hero Header Block ── */}
      <header className="relative bg-[#01327F] pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Brand Ambiance Background Elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-start gap-4">
          <button 
            onClick={() => router.push("/gallery")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-amber-400 bg-white/[0.06] border border-white/[0.1] backdrop-blur-md px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Categories
          </button>

          <div className="inline-flex items-center gap-2 bg-amber-400 text-[#01327F] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#01327F] animate-pulse" />
            Album Directory
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            {loading ? "Loading…" : category?.Name || category?.Title || "Gallery"}
          </h1>

          {!loading && (
            <div className="inline-flex items-center gap-2 mt-2 bg-white/[0.07] border border-white/[0.1] px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400">
              <span>{galleries.length}</span>
              <span className="text-white/60">Collection Album{galleries.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
      </header>

      {/* ── Main Workspace Grid Wrapper ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Shimmer Placeholder Skeletal Loading Viewport */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-64 shadow-sm" />
            ))}
          </div>
        ) : galleries.length === 0 ? (
          /* Empty Dataset Container State Notice */
          <div className="py-24 text-center max-w-sm mx-auto animate-in fade-in duration-300">
            <div className="p-4 rounded-full bg-gray-100 border border-gray-200 inline-block text-gray-400 mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0123 12v.75m-21 0a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021 12.75m-18 0V17.25A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25V12.75m-18 0z" />
              </svg>
            </div>
            <h3 className="text-base font-black text-[#01327F]">No albums in this category</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">Check back soon. The media folder repository container framework directory architecture is empty.</p>
          </div>
        ) : (
          /* Album Collections Matrix Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-300">
            {galleries.map((gal) => (
              <Link 
                key={gal.Id} 
                href={`/gallery/${categoryId}/${gal.Id}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 min-h-[240px]"
              >
                {/* Simulated Album Cover Banner Deck */}
                <div className="relative h-24 bg-gradient-to-br from-[#01327F] to-[#0b1e3d] flex items-center justify-between px-6 overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-400/[0.08] rounded-full blur-xl" />
                  
                  {/* Decorative High-Fidelity Mini Media Badge */}
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-amber-400 backdrop-blur-sm z-10 shadow-inner">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>

                  {/* Glassmorphic Interaction Arrow */}
                  <div className="p-2 bg-white/0 border border-white/0 text-white rounded-lg opacity-0 group-hover:opacity-100 group-hover:bg-white/10 group-hover:border-white/10 backdrop-blur-sm transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-10">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Info Metadata Display Core Segment */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4 bg-white">
                  <div className="space-y-1.5">
                    <h2 className="text-base sm:text-lg font-black text-[#01327F] tracking-tight group-hover:text-amber-500 transition-colors line-clamp-1 leading-snug">
                      {gal.Name || `Album ${gal.Id}`}
                    </h2>
                    {gal.Description && (
                      <p className="text-xs text-gray-500 font-normal leading-relaxed line-clamp-2">
                        {stripHtml(gal.Description)}
                      </p>
                    )}
                  </div>

                  {/* Interactive Action Bar Bottom Anchor */}
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