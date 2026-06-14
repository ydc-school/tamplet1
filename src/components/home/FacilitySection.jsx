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
        if (res.data.status === "success") setFacilities(res.data.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && facilities.length === 0) return null;

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span> CAMPUS INFRASTRUCTURE
          </span>
          <h2 className="font-headline-lg text-primary mb-6">Our Facilities</h2>
          <p className="text-secondary max-w-2xl text-lg">
            World-class infrastructure designed to support learning, growth, and overall student well-being.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-secondary-container animate-pulse" />
              ))
            : facilities.map((f, idx) => (
                <FacilityCard key={f.Id} facility={f} idx={idx} onClick={() => setSelected(f)} />
              ))}
        </div>
      </div>

      {/* Modern Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6" onClick={() => setSelected(null)}>
          <div className="bg-surface max-w-4xl w-full shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {selected.Image && (
              <div className="relative h-64 md:h-96 w-full">
                <Image src={`/uploads/${selected.Image}`} alt={selected.Title} fill className="object-cover" />
              </div>
            )}
            <div className="p-10">
              <span className="font-label-caps text-primary">{selected.Name}</span>
              <h3 className="font-headline-md text-primary mt-2 mb-6">{selected.Title}</h3>
              <p className="text-secondary leading-relaxed">{selected.Description}</p>
              <button onClick={() => setSelected(null)} className="mt-8 bg-primary text-on-primary px-8 py-3 font-label-caps hover:opacity-90">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Refined Facility Card ── */
function FacilityCard({ facility, idx, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className="group cursor-pointer border border-on-surface/10 hover:border-primary/30 transition-all duration-500 bg-surface-container-lowest"
    >
      <div className="relative h-64 overflow-hidden">
        {facility.Image ? (
          <Image 
            src={`/uploads/${facility.Image}`} 
            alt={facility.Title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center text-primary/20">
            <span className="material-symbols-outlined text-6xl">school</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 font-label-caps text-xs">
          #{String(idx + 1).padStart(2, "0")}
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="font-headline-sm text-primary mb-3 group-hover:text-secondary transition-colors">
          {facility.Title}
        </h3>
        <p className="text-secondary text-sm line-clamp-3 mb-6">{facility.Description}</p>
        <span className="inline-flex items-center gap-2 font-label-caps text-primary border-b border-primary pb-1">
          View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </span>
      </div>
    </div>
  );
}