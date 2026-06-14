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
    <>
      <section className="py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="font-label-caps text-secondary mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary"></span> PRIDE & EXCELLENCE
            </span>
            <h2 className="font-headline-lg text-primary">Our Achievements</h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? [1, 2, 3, 4].map((i) => <div key={i} className="h-80 bg-surface-container animate-pulse" />)
              : achievements.map((item) => (
                  <div
                    key={item.Id}
                    onClick={() => setSelected(item)}
                    className="group cursor-pointer relative overflow-hidden bg-surface-container-lowest border border-on-surface/10 hover:border-primary/30 transition-all duration-500"
                  >
                    {item.Image ? (
                      <div className="relative h-80 w-full overflow-hidden">
                        <Image
                          src={`/uploads/${item.Image}`}
                          alt={item.Title || item.Name || "Achievement"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                        </div>
                        {item.Year && (
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 font-label-caps text-xs">
                            {formatYear(item.Year)}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-80 w-full bg-secondary-container flex items-center justify-center text-primary/20">
                        <span className="material-symbols-outlined text-6xl">emoji_events</span>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="font-headline-sm text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                        {item.Title || item.Name}
                      </h3>
                      <span className="inline-flex items-center gap-2 font-label-caps text-primary border-b border-primary pb-1 text-xs">
                        View Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Modern Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6" onClick={() => setSelected(null)}>
          <div className="bg-surface max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            {selected.Image && (
              <div className="relative h-80 w-full">
                <Image src={`/uploads/${selected.Image}`} alt={selected.Title || ""} fill className="object-cover" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-black/50 text-white p-2 hover:bg-black transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            )}
            <div className="p-10">
              <div className="flex items-center gap-2 text-primary/60 font-label-caps text-sm mb-4">
                <span className="material-symbols-outlined text-sm">emoji_events</span> Achievement
              </div>
              <h3 className="font-headline-md text-primary mb-4">{selected.Title || selected.Name}</h3>
              <p className="text-secondary leading-relaxed mb-8">{selected.Description}</p>
              {selected.Year && (
                <div className="inline-flex items-center gap-2 text-sm font-label-caps text-secondary border border-on-surface/10 px-4 py-2">
                  <span className="material-symbols-outlined text-sm">calendar_month</span> {formatYear(selected.Year)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}