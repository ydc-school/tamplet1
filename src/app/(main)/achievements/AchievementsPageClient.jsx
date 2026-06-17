"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { resolveAssetSrc } from "@/utils/media";

// सुरक्षित ईयर फ़ॉर्मेटिंग हेल्पर
const formatYear = (yearVal) => {
  if (!yearVal) return "N/A";
  const cleaned = String(yearVal).trim();
  if (cleaned.match(/^\d{4}-\d{4}$/)) return cleaned;
  if (cleaned.match(/^\d{4}$/)) return cleaned;
  const parsed = parseInt(cleaned);
  if (!isNaN(parsed) && parsed > 1900 && parsed < 2100) return String(parsed);
  return cleaned;
};

function AchievementCard({ item, onSelect, index }) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = resolveAssetSrc(item?.Image, "");
  const hasImage = Boolean(imageSrc) && !imageError;
  const title = item?.Title || item?.Name || "Untitled Achievement";

  return (
    <article 
      className="bg-white border border-[#f1f5f9] rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden group transform hover:-translate-y-1.5 h-full opacity-0 animate-[fadeInUp_0.5s_ease-out_both]" 
      style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
    >
      {/* थंबनेल विज़ुअल फ़्रेम */}
      <figure className="relative w-full aspect-[1.5/1] bg-slate-100 overflow-hidden flex-shrink-0">
        {hasImage ? (
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            unoptimized 
            onError={() => setImageError(true)} 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1e1b4b]/5 to-[#7f1d1d]/5 text-[#c4a048]/40">
            <svg className="w-12 h-12 stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75a1.125 1.125;0 00-1.125 1.125v3.375m9 0M9 10.5a3 3 0 116 0 3 3 0 01-6 0z" />
            </svg>
          </div>
        )}
        
        {/* फ्लोटिंग प्रीमियम ईयर चिप */}
        <figcaption className="absolute top-4 left-4 bg-gradient-to-r from-[#7f1d1d] to-red-700 text-white font-sans font-black text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-xl shadow-md border border-white/10 z-10">
          {formatYear(item?.Year)}
        </figcaption>
      </figure>

      {/* कार्ड इंफो बॉडी */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-lg md:text-xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="font-sans text-sm text-[#0f172a]/60 font-medium leading-relaxed line-clamp-3">
            {item?.Description || "Tap to view details."}
          </p>
        </div>

        {/* ट्रिगर बटन */}
        <div className="pt-2">
          <button 
            onClick={() => onSelect(item)}
            className="w-full inline-flex items-center justify-center gap-2 border border-[#c4a048]/20 bg-[#fdfbf7] hover:bg-gradient-to-r hover:from-[#c4a048] hover:to-[#aa842c] text-[#aa842c] hover:text-white font-sans font-black text-xs uppercase tracking-widest py-3.5 px-5 rounded-xl transition-all duration-300 shadow-sm focus:outline-none"
          >
            View Details
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function AchievementsPageClient({ initialAchievements = [], initialLoaded = false }) {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [loading, setLoading] = useState(!initialLoaded);
  const [selected, setSelected] = useState(null);

  // बैकड्रॉप ओपन होने पर पैरेंट स्क्रॉल लॉक गार्ड
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 overflow-hidden relative">
      {/* एम्बिएंट सॉफ्ट बैकग्राउंड लाइट्स */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1e1b4b]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* ACADEMIC HERO HEADER */}
        <header className="max-w-3xl space-y-3 mb-16 md:mb-24 text-left">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.3em] uppercase block">
            Recognition &amp; Milestones
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-[#1e1b4b] tracking-tight">
            Achievements
          </h1>
          <div className="w-20 h-1.5 bg-[#7f1d1d] rounded-full mt-4" />
          <p className="font-sans text-base md:text-lg text-[#0f172a]/60 leading-relaxed pt-2 font-medium">
            Browse our recognition and milestones across academic, sports, and cultural excellence.
          </p>
        </header>

        {/* 3-4 COLUMNS CORE PRECISION GRID */}
        <section aria-label="Achievement List">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {achievements.map((item, index) => (
              <AchievementCard key={item.Id} item={item} index={index} onSelect={setSelected} />
            ))}
          </div>
        </section>

      </div>

      {/* FULL EXPERIENTIAL DETAILS DIALOG BOX */}
      {selected && (
        <dialog 
          open 
          className="fixed inset-0 z-[2000] w-full h-full bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 border-none overflow-y-auto animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSelected(null)}
        >
          <article 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl border border-[#f1f5f9] overflow-hidden flex flex-col max-h-[90vh] animate-[zoomIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
          >
            {/* बड़ी बैनर छवि */}
            {resolveAssetSrc(selected?.Image, "") && (
              <figure className="relative w-full aspect-[16/10] bg-slate-50 flex-shrink-0 border-b border-[#f1f5f9]">
                <Image 
                  src={resolveAssetSrc(selected?.Image, "")} 
                  alt={selected.Title || "Achievement Banner"} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
                {/* क्लोज बटन फ्लोटिंग ऑन टॉप-राइट */}
                <button 
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-[#7f1d1d] text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md transition-all duration-300 focus:outline-none shadow-lg border border-white/10 group"
                  aria-label="Close modal"
                >
                  <svg className="w-4 h-4 transform group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </figure>
            )}

            {/* डायलॉग बॉडी कंटेंट */}
            <div className="p-6 md:p-10 space-y-6 overflow-y-auto flex-1">
              <header className="space-y-2">
                <span className="font-sans font-black text-[10px] uppercase tracking-widest text-[#c4a048] bg-[#c4a048]/5 px-3 py-1 rounded-md inline-block">
                  Institutional Milestone
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e1b4b] leading-snug">
                  {selected.Title || selected.Name}
                </h2>
                <div className="w-12 h-0.5 bg-[#7f1d1d] rounded-full mt-2" />
              </header>

              {/* डिस्क्रिप्शन */}
              {selected.Description && (
                <p className="font-sans text-base text-[#0f172a]/75 leading-relaxed font-medium whitespace-pre-line bg-[#f8fafc] p-5 rounded-2xl border border-[#f1f5f9]">
                  {selected.Description}
                </p>
              )}

              {/* डेटा लिस्ट ग्रिड स्ट्रक्चर (<dl>) */}
              <dl className="grid grid-cols-2 gap-4 bg-[#fdfbf7] border border-[#c4a048]/10 p-5 rounded-2xl shadow-inner text-left font-sans text-sm font-medium">
                <div>
                  <dt className="text-[#0f172a]/40 uppercase tracking-wider text-[11px] font-black mb-0.5">Year of Achievement</dt>
                  <dd className="text-[#7f1d1d] font-bold text-base">{formatYear(selected.Year)}</dd>
                </div>
                <div>
                  <dt className="text-[#0f172a]/40 uppercase tracking-wider text-[11px] font-black mb-0.5">Verification ID</dt>
                  <dd className="text-[#1e1b4b] font-mono text-base">{selected.Id || "N/A"}</dd>
                </div>
              </dl>
            </div>

            {/* मॉडर्न फुटर स्टिक बार */}
            <footer className="p-4 bg-[#f8fafc] border-t border-[#f1f5f9] flex justify-end flex-shrink-0">
              <button 
                onClick={() => setSelected(null)}
                className="bg-[#1e1b4b] hover:bg-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shadow-md focus:outline-none"
              >
                Close View
              </button>
            </footer>
          </article>
        </dialog>
      )}
    </main>
  );
}