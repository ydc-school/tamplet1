"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function FacilitySection() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/facility", { params: { limit: 12, isActive: "active" } })
      .then((res) => {
        if (res?.data?.status === "success") setFacilities(res?.data?.data?.data || []);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  if (!loading && (facilities?.length || 0) === 0) return null;

  return (
    <>
      <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow + heading */}
          <div className="mb-10 md:mb-14 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="h-[2px] w-8 bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Campus Infrastructure</span>
              <div />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#01327F]">Our Facilities</h2>
            <p className="text-sm md:text-base text-gray-600 mt-3 max-w-2xl leading-relaxed">
              World-class infrastructure designed to support learning, growth, and overall student well-being.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-[#01327F]/[0.03] rounded-2xl overflow-hidden flex flex-col h-full min-h-[380px]">
                  <div className="bg-gray-200 h-48 w-full" />
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-5 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-6 bg-gray-200 rounded w-20 mt-auto" />
                  </div>
                </div>
              ))
              : facilities.map((f, idx) => (
                <FacilityCard
                  key={f?.Id}
                  facility={f}
                  idx={idx}
                  onClick={() => setSelected(f)}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div 
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01327F]/40 backdrop-blur-sm transition-opacity duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh] transform transition-all duration-300"
          >
            {/* Modal image */}
            {selected?.Image ? (
              <div className="relative w-full h-56 sm:h-64 md:h-80 bg-[#01327F]/[0.03] shrink-0">
                <Image
                  src={`/uploads/${selected.Image}`}
                  alt={selected?.Title || "Facility Image"}
                  fill
                  sizes="(max-width: 720px) 100vw, 680px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-[#01327F]/[0.03] flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 text-amber-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                  <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Modal header */}
            <div className="p-6 pb-0 flex items-start justify-between gap-4 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  {selected?.Name || "Facility Details"}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#01327F] leading-snug">
                  {selected?.Title || "Facility"}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="text-gray-400 hover:text-amber-500 hover:bg-[#01327F]/5 p-2 rounded-full transition-colors duration-200 shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 overflow-y-auto text-sm md:text-base text-gray-600 leading-relaxed min-h-[100px]">
              <p>{selected?.Description || "No description available."}</p>
            </div>

            {/* Modal footer */}
            <div className="p-6 pt-0 flex justify-end shrink-0">
              <button 
                onClick={() => setSelected(null)}
                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-[#01327F] text-white px-5 py-2.5 rounded-xl hover:bg-amber-400 hover:text-[#01327F] transition-all duration-200 active:scale-95"
              >
                Close
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Card sub-component ── */
function FacilityCard({ facility, idx, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = facility?.Image && !imgErr;

  return (
    <div 
      onClick={onClick}
      className="group bg-[#01327F]/[0.02] rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-300 hover:bg-[#01327F]/5"
    >
      {/* Image / placeholder */}
      <div className="relative w-full h-48 overflow-hidden bg-white shrink-0 flex items-center justify-center">
        {hasImg ? (
          <Image
            src={`/uploads/${facility.Image}`}
            alt={facility?.Title || "Facility"}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-102"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#01327F]/[0.03] flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.9}>
              <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {(facility?.Index_No > 0 || typeof facility?.Index_No === "undefined") && (
          <span className="absolute top-3 right-3 bg-[#01327F] text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-full">
            #{String(idx + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {facility?.Name && (
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">{facility.Name}</span>
        )}
        <h3 className="text-base md:text-lg font-bold text-[#01327F] mb-1.5 group-hover:text-amber-500 transition-colors duration-150 line-clamp-1">
          {facility?.Title || "Facility Title"}
        </h3>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
          {facility?.Description || "No description details updated yet."}
        </p>

        <div className="mt-auto">
          <button 
            tabIndex={-1}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#01327F] group-hover:text-amber-500 transition-colors duration-150"
          >
            View Details
            <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}