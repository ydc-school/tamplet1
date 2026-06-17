"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function AchievementGallery() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/achievements")
      .then((res) => {
        if (res.data.status === "success") setAchievements(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && achievements?.length === 0) return null;

  const formatYear = (y) => {
    if (!y) return "";
    const d = new Date(y);
    return isNaN(d) ? y : d.getFullYear();
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-[#f1f5f9]/50 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 font-serif text-[12vw] font-black text-primary/5 pointer-events-none select-none translate-x-1/4 -translate-y-1/4 leading-none">
        GLORY
      </div>

      <div className="max-w-[1280px] mx-auto px-8 w-full">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <span className="font-sans font-black text-[#7f1d1d] uppercase tracking-[0.4em] text-xs block">
              Academic & Extra-Curricular
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#1e1b4b] tracking-tight">
              Our <span className="italic font-normal">Achievements</span>
            </h2>
          </div>
          <div className="w-full md:w-1/3 h-px bg-[#1e1b4b]/10 hidden md:block"></div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-[2.5rem] p-4 space-y-6 border border-[#f1f5f9] shadow-sm animate-pulse"
                >
                  <div className="aspect-[4/3] bg-slate-200 rounded-[2rem] w-full" />
                  <div className="space-y-3 px-2">
                    <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                    <div className="h-4 bg-slate-200 rounded-md w-full" />
                    <div className="h-4 bg-slate-200 rounded-md w-1/2" />
                  </div>
                </div>
              ))
            : achievements.map((item, index) => (
                <div
                  key={item.Id || index}
                  onClick={() => setSelected(item)}
                  className="group bg-white rounded-[2.5rem] border border-[#f1f5f9] p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image Thumbnail with Overlay */}
                    {item.Image && (
                      <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-[#1e1b4b]/5">
                        <Image
                          src={`/uploads/${item.Image}`}
                          alt={item.Title || item.Name || "Achievement"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Year Chip */}
                        {item.Year && (
                          <span className="absolute top-4 left-4 bg-[#1e1b4b] text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-md z-10">
                            {formatYear(item.Year)}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="px-2 space-y-3">
                      <h3 className="font-serif text-2xl text-[#1e1b4b] leading-tight group-hover:text-[#7f1d1d] transition-colors line-clamp-2">
                        {item.Title || item.Name}
                      </h3>
                      {item.Description && (
                        <p className="font-sans text-sm text-[#0f172a]/60 line-clamp-3 leading-relaxed">
                          {item.Description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* View Details Button Trigger */}
                  <div className="pt-6 px-2">
                    <span className="inline-flex items-center gap-2 text-[#1e1b4b] font-black text-xs uppercase tracking-widest group-hover:text-[#7f1d1d] transition-colors">
                      View Details
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl bg-[#1e1b4b]/20 animate-[fadeIn_0.2s_ease-out]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-[#1e1b4b]/10 grid md:grid-cols-12 max-h-[90vh] md:max-h-none overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-30 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1e1b4b] hover:bg-[#7f1d1d] hover:text-white hover:rotate-90 transition-all duration-300 shadow-md border border-[#f1f5f9]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Column: Premium Image Preview */}
            <div className="md:col-span-6 h-64 md:h-[500px] bg-[#1e1b4b] relative overflow-hidden">
              {selected.Image ? (
                <Image
                  src={`/uploads/${selected.Image}`}
                  alt={selected.Title || selected.Name || "Achievement"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              )}
              {/* Soft Gradient Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/40 via-transparent to-transparent" />
            </div>

            {/* Right Column: Information details */}
            <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-center space-y-6 bg-white relative">
              {/* Organic shape style accent patch inside modal */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f1f5f9] rounded-full opacity-50 pointer-events-none" style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }} />
              
              <div className="space-y-4 relative z-10">
                {selected.Year && (
                  <span className="inline-block bg-[#7f1d1d] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm">
                    Session {formatYear(selected.Year)}
                  </span>
                )}
                <h3 className="font-serif text-3xl md:text-4xl text-[#1e1b4b] font-bold leading-tight">
                  {selected.Title || selected.Name}
                </h3>
                <div className="w-16 h-1 bg-[#7f1d1d] rounded-full" />
              </div>

              {selected.Description && (
                <p className="font-sans text-[#0f172a]/70 text-base md:text-lg leading-relaxed relative z-10 max-h-48 overflow-y-auto pr-2">
                  {selected.Description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}