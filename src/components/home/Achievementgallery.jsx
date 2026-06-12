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
      <section className="w-full py-16 md:py-24 bg-[#01327F]/[0.03]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-amber-400" />
              <span className="text-[#01327F] font-semibold text-sm uppercase tracking-[0.2em]">
                Pride &amp; Excellence
              </span>
              <div className="h-[2px] w-8 bg-amber-400" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#01327F]">
              Our Achievements
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white overflow-hidden"
                  >
                    <div className="h-48 bg-[#01327F]/5 animate-pulse" />
                    <div className="p-4 flex flex-col gap-2">
                      <div className="h-4 w-3/4 bg-[#01327F]/10 animate-pulse rounded-full" />
                      <div className="h-3 w-1/2 bg-[#01327F]/10 animate-pulse rounded-full" />
                    </div>
                  </div>
                ))
              : achievements.map((item) => (
                  <div
                    key={item.Id}
                    onClick={() => setSelected(item)}
                    className="group relative rounded-2xl bg-white overflow-hidden cursor-pointer flex flex-col transition-transform duration-300 hover:-translate-y-1"
                  >
                    {item.Image ? (
                      <div className="relative w-full aspect-[4/3] bg-[#01327F]/5 overflow-hidden">
                        <Image
                          src={`/uploads/${item.Image}`}
                          alt={item.Title || item.Name || "Achievement"}
                          width={800}
                          height={600}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                        {item.Year && (
                          <span className="absolute top-3 left-3 bg-[#01327F] text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                            {formatYear(item.Year)}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-[#01327F]/0 group-hover:bg-[#01327F]/40 transition-colors duration-300 flex items-center justify-center">
                          <svg
                            width="28"
                            height="28"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zm-3-3v6m-3-3h6" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[4/3] bg-[#01327F] flex items-center justify-center">
                        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} className="text-amber-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                    )}

                    <div className="p-4 flex flex-col gap-1.5">
                      <h3 className="text-base font-semibold text-[#01327F] line-clamp-1">
                        {item.Title || item.Name}
                      </h3>
                      {item.Description && (
                        <p className="text-sm text-slate-500 line-clamp-2">{item.Description}</p>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 mt-1">
                        View Details
                        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[100] bg-[#01327F]/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
          >
            {selected.Image && (
              <div className="relative w-full">
                <Image
                  src={`/uploads/${selected.Image}`}
                  alt={selected.Title || selected.Name || "Achievement"}
                  width={1200}
                  height={900}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  sizes="680px"
                  className="rounded-t-2xl"
                />
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 flex items-center justify-center h-9 w-9 rounded-full bg-[#01327F]/70 text-white hover:bg-amber-400 hover:text-[#01327F] transition-colors"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="p-6 md:p-8 flex flex-col gap-3 relative">
              {!selected.Image && (
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 flex items-center justify-center h-9 w-9 rounded-full bg-[#01327F]/10 text-[#01327F] hover:bg-amber-400 hover:text-[#01327F] transition-colors"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <div className="inline-flex items-center gap-1.5 text-amber-500 text-xs font-bold uppercase tracking-[0.15em]">
                Achievement
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[#01327F]">
                {selected.Title || selected.Name}
              </h3>

              <div className="h-1 w-12 bg-amber-400 rounded-full" />

              {selected.Description && (
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {selected.Description}
                </p>
              )}

              {selected.Year && (
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#01327F] bg-[#01327F]/5 px-4 py-2 rounded-full self-start mt-1">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
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