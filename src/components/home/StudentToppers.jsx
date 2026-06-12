"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function StudentToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res?.data?.status === "success") setToppers(res?.data?.data?.data || []);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && (toppers?.length || 0) === 0) return null;

  // Sort by rank if available
  const sorted = [...(toppers || [])].sort((a, b) => (parseInt(a?.Rank) || 99) - (parseInt(b?.Rank) || 99));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  const medalColors = {
    1: { bg: "bg-amber-400", text: "text-[#01327F]", label: "Gold", scale: "md:scale-110 z-10" },
    2: { bg: "bg-slate-300", text: "text-[#01327F]", label: "Silver", scale: "scale-100 mt-6 md:mt-8" },
    3: { bg: "bg-amber-600", text: "text-white", label: "Bronze", scale: "scale-100 mt-10 md:mt-12" },
  };

  return (
    <>
      <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-16 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="h-[2px] w-8 bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Hall of Fame</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#01327F]">Our Student Toppers</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end max-w-3xl mx-auto py-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`animate-pulse bg-[#01327F]/[0.03] rounded-2xl w-full flex flex-col items-center p-6 ${i === 2 ? 'h-72' : i === 1 ? 'h-60 mt-6' : 'h-52 mt-12'}`}>
                  <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
                  <div className="h-8 bg-gray-200 rounded-xl w-16" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Podium — top 3 */}
              {(top3?.length || 0) > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4 items-end max-w-3xl mx-auto mb-12 md:mb-16">
                  {podiumOrder.map((topper) => {
                    if (!topper) return null;
                    const rank = parseInt(topper?.Rank) || 1;
                    const medal = medalColors[rank] || medalColors[3];
                    const initials = topper?.Student_Name?.charAt(0)?.toUpperCase() || "S";

                    return (
                      <div 
                        key={topper?.Id} 
                        className={`bg-[#01327F]/[0.03] p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:bg-[#01327F]/[0.06] ${medal.scale}`}
                      >
                        <div className="relative mb-4 group">
                          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white flex items-center justify-center relative ring-4 ring-white">
                            {topper?.Image ? (
                              <Link href={"./student/" + topper?.Id} className="w-full h-full block">
                                <Image
                                  src={`/uploads/${topper.Image}`}
                                  alt={topper?.Student_Name || "Topper"}
                                  fill
                                  sizes="(max-width: 768px) 96px, 112px"
                                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                />
                              </Link>
                            ) : (
                              <div className="text-2xl font-bold text-[#01327F]/40">{initials}</div>
                            )}
                          </div>
                          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center font-bold text-sm w-7 h-7 rounded-full shadow-sm ${medal.bg} ${medal.text}`}>
                            {rank}
                          </div>
                        </div>

                        <div className="mt-2 w-full">
                          <div className="font-bold text-[#01327F] text-base md:text-lg line-clamp-1">
                            {topper?.Student_Name || "N/A"}
                          </div>
                          {topper?.Student_Class && (
                            <div className="text-xs text-amber-500 font-semibold tracking-wide uppercase mt-0.5">
                              {topper.Student_Class}
                            </div>
                          )}
                          
                          {topper?.Marks_Percentage && (
                            <div className="inline-flex items-baseline text-[#01327F] bg-white px-3 py-1 rounded-full text-sm font-black mt-3">
                              <span>{topper.Marks_Percentage}</span>
                              <span className="text-xs font-bold text-amber-500 ml-0.5">%</span>
                            </div>
                          )}
                          
                          {topper?.Year && (
                            <div className="text-xs text-gray-400 font-medium mt-2">
                              Batch {topper.Year}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Rest — mini cards */}
              {(rest?.length || 0) > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((topper) => {
                    const rank = parseInt(topper?.Rank) || "-";
                    const initials = topper?.Student_Name?.charAt(0)?.toUpperCase() || "S";

                    return (
                      <div 
                        key={topper?.Id}
                        className="flex items-center gap-4 bg-[#01327F]/[0.02] p-3 rounded-xl hover:bg-[#01327F]/5 transition-all duration-200 group"
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center">
                          {topper?.Image ? (
                            <Link href={"./student/" + topper?.Id} className="w-full h-full block">
                              <Image
                                src={`/uploads/${topper.Image}`}
                                alt={topper?.Student_Name || "Topper"}
                                fill
                                sizes="48px"
                                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                              />
                            </Link>
                          ) : (
                            <div className="text-lg font-bold text-[#01327F]/30">{initials}</div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#01327F] text-sm md:text-base truncate group-hover:text-amber-500 transition-colors duration-150">
                            {topper?.Student_Name || "N/A"}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-0.5">
                            <span className="bg-amber-400/20 text-[#01327F] px-1.5 py-0.5 rounded font-bold text-[10px]">
                              #{rank}
                            </span>
                            {topper?.Year && (
                              <>
                                <span className="text-gray-300">·</span>
                                <span>Batch {topper.Year}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}