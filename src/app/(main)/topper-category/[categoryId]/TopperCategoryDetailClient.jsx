"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function TopperCategoryDetailPage({ categoryId: categoryIdProp, initialCategory = null, initialToppers = [], initialLoaded = false }) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);
  const [toppers, setToppers] = useState(initialToppers);
  const [loading, setLoading] = useState(!initialLoaded);

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#c4a048]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        <header className="space-y-4 mb-16 md:mb-24 text-left max-w-3xl">
          <button 
            onClick={() => router.push("/topper-category")}
            className="inline-flex items-center gap-2 text-[#1e1b4b]/80 hover:text-[#7f1d1d] font-sans font-black text-xs uppercase tracking-widest bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm transition-all duration-300 transform hover:-translate-x-1 focus:outline-none"
            aria-label="Go back to all topper categories"
          >
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Categories
          </button>

          <div className="space-y-2 pt-2">
            <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.3em] uppercase block">
              Academic Roll of Honor
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-black text-[#1e1b4b] tracking-tight leading-tight">
              {loading ? "Loading Category…" : category?.Name || "Topper Category"}
            </h1>
            <div className="w-20 h-1.5 bg-[#7f1d1d] rounded-full mt-3" />
          </div>

          <p className="font-sans text-sm md:text-base text-[#0f172a]/60 leading-relaxed font-medium pt-2">
            Browse the students listed under this topper category.
          </p>

          {!loading && (
            <div className="flex flex-wrap items-center gap-3 pt-4 select-none">
              {category?.Class && (
                <span className="bg-[#1e1b4b]/5 text-[#1e1b4b] font-sans font-bold text-xs px-3.5 py-1.5 rounded-lg border border-[#1e1b4b]/5">
                  Class: {category.Class}
                </span>
              )}
              {category?.Year && (
                <span className="bg-[#7f1d1d]/5 text-[#7f1d1d] font-sans font-bold text-xs px-3.5 py-1.5 rounded-lg border border-[#7f1d1d]/5">
                  Session: {category.Year}
                </span>
              )}
              <span className="bg-[#c4a048]/10 text-[#aa842c] font-sans font-black text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-[#c4a048]/10 ml-auto" aria-live="polite">
                {toppers.length} {toppers.length === 1 ? "Student" : "Students"} Found
              </span>
            </div>
          )}
        </header>

        <section aria-label="Topper student list" className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] h-[450px] animate-pulse w-full" />
              ))}
            </div>
          ) : toppers.length === 0 ? (
            <div role="status" className="text-center py-20 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <p className="font-sans font-medium text-base text-slate-400">No topper records found in this category.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-0 p-0 list-none">
              {toppers.map((topper) => (
                <li key={topper.Id} className="m-0 p-0">
                  <article className="bg-white border border-[#f1f5f9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full group">
                    
                    <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between gap-4">
                      <h2 className="font-serif text-lg md:text-xl font-bold text-[#1e1b4b] tracking-tight line-clamp-1">
                        {topper.Student_Name || "Student"}
                      </h2>
                      <div className="font-sans font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#c4a048] to-[#aa842c] text-white px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap">
                        Rank #{topper.Rank || "-"}
                      </div>
                    </div>

                    <figure className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden m-0 p-0">
                      {topper.Image ? (
                        <Image
                          src={`/uploads/${topper.Image}`}
                          alt={topper.Student_Name || "Topper profile photo"}
                          fill
                          sizes="(max-w: 719px) 100vw, (max-w: 1039px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-serif text-5xl font-black bg-gradient-to-br from-[#1e1b4b]/5 to-[#7f1d1d]/5 text-[#1e1b4b]/30 select-none" aria-label="No photo">
                          {topper.Student_Name?.charAt(0)}
                        </div>
                      )}
                    </figure>

                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                      <p className="font-sans text-sm text-[#0f172a]/60 font-medium leading-relaxed line-clamp-3">
                        {topper.Description || "No citation or accomplishment testimonial provided for this entry."}
                      </p>

                      <footer className="pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <span className="font-sans text-[10px] font-black uppercase tracking-wider text-slate-400 block">Evaluation Score</span>
                          <span className="font-serif text-xl font-black text-[#7f1d1d]" aria-label="Percentage Score">
                            {topper.Marks_Percentage || "--"}% Score
                          </span>
                        </div>
                        
                        <Link 
                          href={`/student/${topper.Id}`}
                          className="inline-flex items-center gap-1.5 font-sans font-black text-xs uppercase tracking-widest text-[#1e1b4b] hover:text-[#7f1d1d] transition-colors group/btn"
                        >
                          <span>View Profile</span>
                          <svg className="w-3.5 h-3.5 stroke-current transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </footer>
                    </div>

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