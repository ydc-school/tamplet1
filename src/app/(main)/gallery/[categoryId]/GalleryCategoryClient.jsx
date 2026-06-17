"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const stripHtml = (htmlString) => {
  if (!htmlString) return "";
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
};

export default function GalleryCategoryPage({ categoryId: categoryIdProp, initialCategory = null, initialGalleries = [], initialLoaded = false }) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const router = useRouter();
  const [galleries, setGalleries] = useState(initialGalleries);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded || !categoryId) return;
    axios.get(`/api/client/gallery?Gallery_Category_Id=${categoryId}`)
      .then((res) => {
        if (res.data.status === "success") setGalleries(res.data.data?.data ?? []);
      })
      .finally(() => setLoading(false));
  }, [categoryId, initialLoaded]);

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1e1b4b]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        <header className="space-y-4 mb-16 md:mb-24 text-left max-w-3xl">
          <button 
            onClick={() => router.push("/gallery")}
            className="inline-flex items-center gap-2 text-[#1e1b4b]/80 hover:text-[#7f1d1d] font-sans font-black text-xs uppercase tracking-widest bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm transition-all duration-300 transform hover:-translate-x-1 focus:outline-none"
            aria-label="Back to all categories"
          >
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Categories
          </button>

          <div className="space-y-2 pt-2">
            <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.3em] uppercase block">
              {!loading && `${galleries.length} ${galleries.length === 1 ? "Album" : "Albums"} Available`}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-black text-[#1e1b4b] tracking-tight leading-tight">
              {loading ? "Loading Category…" : initialCategory?.Name || "Gallery Category"}
            </h1>
            <div className="w-20 h-1.5 bg-[#7f1d1d] rounded-full mt-3" />
          </div>
        </header>

        <section aria-label="Photo albums in this category" className="min-h-[300px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] h-[280px] animate-pulse w-full" />
              ))}
            </div>
          ) : galleries.length === 0 ? (
            <div role="status" className="text-center py-16 bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm">
              <p className="font-sans font-medium text-base text-slate-400">No albums configured for this category.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-0 p-0 list-none">
              {galleries.map((gal) => (
                <li key={gal.Id} className="m-0 p-0">
                  <article className="bg-white border border-[#f1f5f9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full group">
                    <Link href={`/gallery/${categoryId}/${gal.Id}`} className="p-8 md:p-10 flex flex-col justify-between items-start h-full flex-1 focus:outline-none">
                      
                      <div className="space-y-4 w-full">
                        <div className="w-10 h-10 rounded-xl bg-[#c4a048]/5 border border-[#c4a048]/10 flex items-center justify-center text-[#c4a048]">
                          <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                        
                        <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors leading-snug line-clamp-2">
                          {gal.Name || `Album ${gal.Id}`}
                        </h2>
                        
                        {gal.Description && (
                          <p className="font-sans text-sm text-[#0f172a]/60 font-medium leading-relaxed line-clamp-4">
                            {stripHtml(gal.Description)}
                          </p>
                        )}
                      </div>

                      <footer className="w-full pt-8 mt-6 border-t border-slate-50 flex items-center justify-between font-sans text-xs font-black uppercase tracking-widest text-[#aa842c] group-hover:text-[#7f1d1d] transition-colors select-none">
                        <span>View Photos</span>
                        <div className="w-8 h-8 rounded-full bg-[#fdfbf7] group-hover:bg-[#7f1d1d] group-hover:text-white border border-[#c4a048]/10 flex items-center justify-center transition-all duration-300">
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