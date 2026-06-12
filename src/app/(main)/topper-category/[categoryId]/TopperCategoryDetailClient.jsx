"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const getRankValue = (rank) => {
  const parsed = parseInt(rank, 10);
  return Number.isNaN(parsed) ? 999 : parsed;
};

const sortToppers = (items) =>
  [...items].sort((a, b) => {
    const rankDiff = getRankValue(a?.Rank) - getRankValue(b?.Rank);
    if (rankDiff !== 0) return rankDiff;

    const aIndex = a?.Index_No ?? Number.MAX_SAFE_INTEGER;
    const bIndex = b?.Index_No ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  });

export default function TopperCategoryDetailPage({
  categoryId: categoryIdProp,
  initialCategory = null,
  initialToppers = [],
  initialLoaded = false,
}) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);
  const [toppers, setToppers] = useState(initialToppers);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    if (!categoryId) return;

    setLoading(true);
    axios.get("/api/client/toper", {
      params: {
        topperCategoryId: categoryId,
        limit: 1000,
        sortBy: "Rank",
        sortOrder: "ASC",
      },
    })
      .then((res) => {
        if (res.data?.status === "success") {
          const records = res.data.data?.data ?? res.data.data ?? [];
          setToppers(sortToppers(records));
        }
      })
      .catch(() => {
        setCategory(null);
        setToppers([]);
      })
      .finally(() => setLoading(false));
  }, [categoryId, initialLoaded]);

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 antialiased pb-20">
      
      {/* Hero Section */}
      <header className="relative bg-[#01327F] pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto flex flex-col items-start gap-4">
          <button 
            onClick={() => router.push("/topper-category")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-amber-400 bg-white/[0.06] border border-white/[0.1] backdrop-blur-md px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Categories
          </button>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            {loading ? "Loading…" : category?.Name || "Topper Category"}
          </h1>
          
          {!loading && (
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {(category?.Class || category?.Year) && (
                <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold text-amber-400">
                  {category.Class} {category.Year}
                </div>
              )}
              <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold text-white/70">
                {toppers.length} Student{toppers.length !== 1 ? "s" : ""}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => <div key={i} className="h-64 bg-white rounded-2xl border border-gray-100" />)}
          </div>
        ) : toppers.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p>No toppers found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toppers.map((topper) => (
              <div key={topper.Id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {topper.Image ? (
                    <Image
                      src={`/uploads/${topper.Image}`}
                      alt={topper.Student_Name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#01327F]/10 text-[#01327F] font-black text-4xl">
                      {topper.Student_Name?.charAt(0)}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-[#01327F] text-amber-400 px-3 py-1 rounded-lg text-xs font-black tracking-widest shadow-lg">
                    #{topper.Rank || "-"}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-lg font-black text-[#01327F] mb-1">{topper.Student_Name}</h2>
                  <div className="flex gap-2 text-[10px] font-bold text-gray-400 uppercase mb-4">
                    <span>{topper.Student_Class}</span>
                    <span>•</span>
                    <span>{topper.Year}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-2">
                    {topper.Description || "Academic excellence and achievement profile."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="text-sm font-black text-amber-500">
                      {topper.Marks_Percentage}%
                    </div>
                    <Link 
                      href={`/student/${topper.Id}`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#01327F] hover:text-amber-500 transition-colors"
                    >
                      Profile
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}