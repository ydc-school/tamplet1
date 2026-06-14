"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { resolveAssetSrc } from "@/utils/media";

// --- Helper Functions (Logic maintained as requested) ---
function safeText(value) {
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
}

function formatYear(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? safeText(value) : String(date.getFullYear());
}

function formatDateTime(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return safeText(value);
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
}

function toTimestamp(value) {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function sortAchievements(list = []) {
  return [...list].sort((a, b) => {
    const indexA = Number(a?.Index_No) || Infinity;
    const indexB = Number(b?.Index_No) || Infinity;
    if (indexA !== indexB) return indexA - indexB;
    return toTimestamp(b?.Year) - toTimestamp(a?.Year);
  });
}

// --- Components ---

function AchievementCard({ item, onSelect, index }) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = resolveAssetSrc(item?.Image, "");
  const hasImage = Boolean(imageSrc) && !imageError;

  return (
    <button
      onClick={() => onSelect(item)}
      className="group relative bg-white border border-stone-200 p-6 transition-all duration-500 hover:border-stone-400 hover:shadow-lg flex flex-col gap-4 text-left animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 75, 600)}ms` }}
    >
      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
        {hasImage ? (
          <Image src={imageSrc} alt={item.Title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized onError={() => setImageError(true)} />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400">No Image</div>
        )}
      </div>
      <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">{formatYear(item.Year)}</span>
      <h3 className="font-serif text-2xl text-stone-900 leading-tight group-hover:text-amber-900 transition-colors">{item.Title || item.Name}</h3>
      <p className="text-stone-600 text-sm line-clamp-3">{item.Description || "Tap to view full details."}</p>
    </button>
  );
}

export default function AchievementsPageClient({ initialAchievements = [], initialLoaded = false }) {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [loading, setLoading] = useState(!initialLoaded);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);

  // Sorting and Filtering
  const visibleAchievements = sortAchievements(achievements).filter((item) =>
    [item.Name, item.Title, item.Description].some((val) => 
      val?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Header */}
      <div className="mb-16 border-b border-stone-300 pb-12">
        <span className="text-amber-800 uppercase tracking-[0.2em] text-sm">Recognition</span>
        <h1 className="font-serif text-5xl mt-4 mb-6 text-stone-900">Milestones</h1>
        
        {/* Search */}
        <div className="relative max-w-lg">
          <input 
            className="w-full bg-stone-50 border border-stone-200 py-3 px-4 outline-none focus:border-stone-500"
            placeholder="Search by title or year..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-stone-500 font-serif italic">Loading chronicles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleAchievements.map((item, idx) => (
            <AchievementCard key={item.Id} item={item} index={idx} onSelect={setSelected} />
          ))}
        </div>
      )}

      {/* Modal - Editorial Overlay */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white max-w-2xl w-full p-10 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-stone-400 hover:text-black">✕</button>
            <h2 className="font-serif text-4xl mb-4">{selected.Title}</h2>
            <p className="text-stone-700 leading-relaxed">{selected.Description}</p>
            <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-2 gap-4 text-sm">
              <div><span className="block text-stone-400">Year</span>{formatYear(selected.Year)}</div>
              <div><span className="block text-stone-400">Status</span>{selected.Is_Active}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}