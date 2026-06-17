"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function GalleryPage({ initialCategories = [], initialLoaded = false }) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    axios.get("/api/client/gallery-category").then((res) => {
      if (res.data.status === "success") {
        const sorted = [...(res.data.data?.data ?? [])].sort((a, b) => (a.Index_No ?? 999) - (b.Index_No ?? 999));
        setCategories(sorted);
      }
    }).finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#1e1b4b]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        <header className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-24 max-w-2xl mx-auto">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            Visual Archives
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-[#1e1b4b] tracking-tight">
            Photo Gallery
          </h1>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mx-auto" />
          <p className="font-sans text-sm md:text-base text-[#0f172a]/60 font-medium pt-2">
            Explore our campus life, events and achievements
          </p>
        </header>

        <section aria-label="Gallery Categories" className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] h-[400px] animate-pulse w-full" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div role="status" className="text-center py-20 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <p className="font-sans font-medium text-base text-slate-400">No media categories established yet.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-0 p-0 list-none">
              {categories.map((cat) => (
                <li key={cat.Id} className="m-0 p-0">
                  <article className="bg-white border border-[#f1f5f9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full group">
                    <Link href={`/gallery/${cat.Id}`} className="flex flex-col h-full focus:outline-none">
                      
                      <figure className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden m-0 p-0">
                        {cat.Image ? (
                          <Image 
                            src={`/uploads/${cat.Image}`} 
                            alt={cat.Name || "Gallery"} 
                            fill 
                            sizes="(max-w-768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e1b4b]/5 to-[#7f1d1d]/5 text-[#c4a048]/30">
                            <svg className="w-12 h-12 stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                      </figure>

                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h2 className="font-serif text-xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors leading-snug line-clamp-1">
                            {cat.Name || "Untitled Gallery"}
                          </h2>
                          {cat.Description && (
                            <p className="font-sans text-sm text-[#0f172a]/60 font-medium leading-relaxed line-clamp-3">
                              {cat.Description.replace(/<[^>]+>/g, " ").trim()}
                            </p>
                          )}
                        </div>

                        <footer className="pt-4 border-t border-slate-50 flex items-center justify-between font-sans text-xs font-black uppercase tracking-widest text-[#aa842c] group-hover:text-[#7f1d1d] transition-colors select-none">
                          <span>View Photos</span>
                          <div className="w-8 h-8 rounded-full bg-[#fdfbf7] group-hover:bg-[#7f1d1d] group-hover:text-white border border-[#c4a048]/10 flex items-center justify-center transition-all duration-300">
                            <svg className="w-3.5 h-3.5 stroke-current transform group-hover:translate-x-0.5 transition-transform" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </div>
                        </footer>
                      </div>

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