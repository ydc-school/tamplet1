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
        console.log(res.data.data)
        if (res.data.status === "success") setAchievements(res.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && achievements?.length === 0) return null;

  const formatYear = (y) => {
    if (!y) return "";
    const d = new Date(y);
    return isNaN(d) ? y : d.getFullYear();
  };

 return (
  <>
    {/* Achievements Section */}
    <section className="bg-surface dark:bg-surface-dim full-width py-16 transition-colors duration-300">
      <div className="max-w-container-max mx-auto px-gutter">

        {/* Eyebrow Style from template */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-[1px] w-12 bg-academic-gold/60" />
          <span className="font-label-caps text-label-caps text-academic-gold tracking-widest text-sm uppercase">
            Pride &amp; Excellence
          </span>
          <div className="h-[1px] w-12 bg-academic-gold/60" />
        </div>

        {/* Heading Style from template */}
        <h2 className="font-headline-lg text-headline-lg text-heritage-navy text-center uppercase tracking-wide mb-12">
          Our Achievements
        </h2>

        {/* 4-Column Grid Layout matching the template structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="bg-outline-variant/20 rounded-xl h-80 animate-pulse border border-outline-variant" 
                />
              ))
            : achievements.map((item) => (
                <div 
                  key={item.Id} 
                  className="group bg-surface dark:bg-surface-dim border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between" 
                  onClick={() => setSelected(item)}
                >
                  {/* Gold top accent strip matching standard layout elements */}
                  <div className="h-[4px] w-full bg-academic-gold" />
                  
                  {item.Image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                      <Image
                        src={`/uploads/${item.Image}`}
                        alt={item.Title || item.Name || "Achievement"}
                        width={800}
                        height={600}
                        style={{ width: "100%", height: "100%" }}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      
                      {item.Year && (
                        <span className="absolute top-3 left-3 bg-heritage-navy/90 border border-white/10 text-white font-label-caps text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wider shadow-md">
                          {formatYear(item.Year)}
                        </span>
                      )}

                      {/* Zoom glass overlay effect */}
                      <div className="absolute inset-0 bg-heritage-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-heritage-navy">
                          <span className="material-symbols-outlined text-xl font-bold">zoom_in</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] w-full bg-outline-variant/10 flex items-center justify-center text-text-muted">
                      <span className="material-symbols-outlined text-4xl opacity-50">stars</span>
                    </div>
                  )}

                  {/* Body Text Elements */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-heritage-navy group-hover:text-academic-gold transition-colors line-clamp-2">
                        {item.Title || item.Name}
                      </h3>
                      {item.Description && (
                        <p className="font-body-md text-body-md text-text-muted mt-2 line-clamp-3 leading-relaxed">
                          {item.Description}
                        </p>
                      )}
                    </div>

                    {/* View Details Hint Link */}
                    <span className="font-label-caps text-xs text-heritage-navy font-semibold flex items-center gap-1 group-hover:text-academic-gold transition-colors pt-2 border-t border-outline-variant/40 mt-auto">
                      View Details
                      <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-1 transition-transform">
                        arrow_right_alt
                      </span>
                    </span>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </section>

    {/* Modal Backdrop / Overlay */}
    {selected && (
      <div 
        className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-6" 
        onClick={() => setSelected(null)}
      >
        <div 
          className="relative w-full max-w-2xl bg-surface dark:bg-surface-dim border border-outline-variant shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Close Trigger (for image structures) */}
          {selected.Image && (
            <div className="relative w-full overflow-hidden bg-black/10 flex-shrink-0 max-h-[45vh]">
              <Image
                src={`/uploads/${selected.Image}`}
                alt={selected.Title || selected.Name || "Achievement"}
                width={1200}
                height={900}
                style={{ width: "100%", height: "auto", display: "block" }}
                sizes="680px"
                className="w-full object-contain max-h-[45vh]"
              />
              <button 
                className="absolute top-4 right-4 bg-heritage-navy/80 hover:bg-heritage-navy text-white hover:text-academic-gold p-2 rounded-full border border-white/10 transition-colors shadow-lg flex items-center justify-center z-10" 
                onClick={() => setSelected(null)}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          )}

          {/* Modal Metadata Body */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            {/* Top Close Button for pure text achievements layout */}
            {!selected.Image && (
              <div className="flex justify-between items-center mb-4">
                <span className="font-label-caps text-label-caps text-academic-gold text-xs tracking-wider">
                  Achievement Details
                </span>
                <button 
                  className="bg-outline-variant/30 hover:bg-heritage-navy text-text-main hover:text-white p-2 rounded-full transition-colors flex items-center justify-center" 
                  onClick={() => setSelected(null)}
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            )}

            {selected.Image && (
              <div className="font-label-caps text-label-caps text-academic-gold text-xs tracking-wider mb-2">
                Achievement
              </div>
            )}

            <h3 className="font-headline-md text-headline-md text-heritage-navy mb-4">
              {selected.Title || selected.Name}
            </h3>

            {/* Horizontal Divider */}
            <div className="h-[2px] w-12 bg-academic-gold mb-4" />

            {selected.Description && (
              <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-6 whitespace-pre-line">
                {selected.Description}
              </p>
            )}

            {selected.Year && (
              <div className="flex items-center gap-2 font-label-caps text-xs text-heritage-navy bg-outline-variant/20 border border-outline-variant/50 px-3 py-1.5 rounded-md inline-flex w-auto font-semibold">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                Year: {formatYear(selected.Year)}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);
}