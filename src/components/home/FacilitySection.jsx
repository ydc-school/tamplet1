"use client";
import React, { useState, useEffect } from "react";
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
        if (res.data?.status === "success") {
          const dataArray = res.data.data?.data || res.data.data || [];
          setFacilities(dataArray);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // स्क्रॉल लॉक करने के लिए useEffect
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  if (!loading && facilities.length === 0) return null;

  return (
    <section className="bg-[#f8fafc] py-20 md:py-28 overflow-hidden relative">
      {/* एम्बिएंट ग्रूवी बैकग्राउंड */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#1e1b4b]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* HEADER SECTION */}
        <header className="max-w-3xl space-y-4 mb-16">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.3em] uppercase block">
            Campus Infrastructure
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1e1b4b] tracking-tight">
            Our Facilities
          </h2>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full" />
          <p className="font-sans text-base text-[#0f172a]/70 leading-relaxed pt-2">
            World-class infrastructure designed to support learning, growth, and overall student well-being.
          </p>
        </header>

        {/* FACILITIES GRID */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-slate-200/60 rounded-[2rem] animate-pulse w-full" />
              ))
            : facilities.map((f, idx) => (
                <FacilityCard key={f.Id} facility={f} idx={idx} onClick={() => setSelected(f)} />
              ))}
        </main>
      </div>

      {/* FULL IMMERSIVE VIEW DETAILS MODAL */}
      {selected && (
        <dialog 
          open 
          className="fixed inset-0 z-[200] w-full h-full bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 border-none overflow-y-auto animate-[fadeIn_0.22s_ease-out]"
          onClick={() => setSelected(null)}
        >
          <article 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl border border-[#f1f5f9] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* बड़ी बैनर इमेज */}
            {selected.Image && (
              <figure className="relative w-full aspect-[16/9] max-h-[420px] bg-slate-100 flex-shrink-0">
                <Image 
                  src={`/uploads/${selected.Image}`} 
                  alt={selected.Title} 
                  fill 
                  className="object-cover"
                  priority
                />
                {/* क्लोज बटन फ्लोटिंग ऑन इमेज */}
                <button 
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </figure>
            )}

            {/* विवरण बॉडी एरिया */}
            <div className="p-6 md:p-10 space-y-4 overflow-y-auto">
              <header className="space-y-1.5">
                <span className="font-sans font-black text-xs uppercase tracking-widest text-[#c4a048] bg-[#c4a048]/5 px-3 py-1 rounded-md inline-block">
                  {selected.Name || "Campus Facility"}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1e1b4b]">
                  {selected.Title}
                </h3>
              </header>
              
              <div className="w-12 h-0.5 bg-[#7f1d1d] rounded-full" />
              
              <p className="font-sans text-base text-[#0f172a]/75 leading-relaxed font-medium pt-2 whitespace-pre-line">
                {selected.Description}
              </p>
            </div>

            {/* मॉडर्न फुटर स्टिक */}
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
    </section>
  );
}

// कस्टमाइज्ड सब-कॉम्पोनेंट फ़ैसिलिटी कार्ड
function FacilityCard({ facility, idx, onClick }) {
  return (
    <div 
      className="bg-white border border-[#f1f5f9] rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden group transform hover:-translate-y-1.5 h-full"
    >
      {/* इमेज फ्रेम होवर ज़ूम */}
      {facility.Image && (
        <figure className="relative w-full aspect-[1.6/1] bg-slate-100 overflow-hidden flex-shrink-0">
          <Image 
            src={`/uploads/${facility.Image}`} 
            alt={facility.Title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* न्यूमेरिक इंडेक्स पैडिंग सिंबल */}
          <span className="absolute top-4 left-4 bg-white/95 text-[#1e1b4b] font-sans font-black text-xs tracking-wider px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm z-10">
            #{String(idx + 1).padStart(2, "0")}
          </span>
        </figure>
      )}

      {/* विवरण ग्रूव */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="font-sans font-black text-[11px] uppercase tracking-widest text-[#c4a048] block">
            {facility.Name || "Infrastructure"}
          </span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors line-clamp-1">
            {facility.Title}
          </h3>
          <p className="font-sans text-sm text-[#0f172a]/60 font-medium leading-relaxed line-clamp-3">
            {facility.Description}
          </p>
        </div>

        {/* ट्रिगर बटन */}
        <div className="pt-2">
          <button 
            onClick={onClick}
            className="w-full inline-flex items-center justify-center gap-2 border border-[#1e1b4b]/10 bg-[#f8fafc] hover:bg-[#1e1b4b] text-[#1e1b4b] hover:text-white font-sans font-black text-xs uppercase tracking-widest py-3.5 px-5 rounded-xl transition-all duration-300 focus:outline-none shadow-sm"
          >
            View Details
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}