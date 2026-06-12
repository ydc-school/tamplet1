"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { resolveAssetSrc } from "@/utils/media";

function safeText(value) {
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
}

function formatYear(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return safeText(value);
  return String(date.getFullYear());
}

function formatDateTime(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return safeText(value);

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function toTimestamp(value) {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function getLatestYear(list = []) {
  const latest = list.reduce(
    (acc, item) => {
      const timestamp = toTimestamp(item?.Year);
      if (timestamp > acc.timestamp) {
        return {
          timestamp,
          label: formatYear(item?.Year),
        };
      }
      return acc;
    },
    { timestamp: 0, label: "N/A" }
  );

  return latest.label;
}

function normalizeIndex(value) {
  const index = Number(value);
  return Number.isFinite(index) && index > 0 ? index : Number.POSITIVE_INFINITY;
}

function sortAchievements(list = []) {
  return [...list].sort((a, b) => {
    const indexA = normalizeIndex(a?.Index_No);
    const indexB = normalizeIndex(b?.Index_No);
    if (indexA !== indexB) return indexA - indexB;

    const yearA = toTimestamp(a?.Year);
    const yearB = toTimestamp(b?.Year);
    if (yearA !== yearB) return yearB - yearA;

    return (b?.Id || 0) - (a?.Id || 0);
  });
}

function matchesSearch(item, query) {
  if (!query) return true;
  const searchBlob = [
    item?.Name,
    item?.Title,
    item?.Description,
    item?.Image,
    item?.Year && formatYear(item.Year),
    item?.Index_No,
    item?.Id,
  ]
    .map((value) => safeText(value).toLowerCase())
    .join(" ");

  return searchBlob.includes(query);
}

function AchievementCard({ item, onSelect, index }) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = resolveAssetSrc(item?.Image, "");
  const hasImage = Boolean(imageSrc) && !imageError;
  const title = item?.Title || item?.Name || "Untitled Achievement";

  return (
    <button
      type="button"
      style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
      onClick={() => onSelect(item)}
      className="w-full text-left bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full transition-all duration-300 hover:shadow-md hover:border-[#01327F]/20 group relative focus:outline-none focus:ring-2 focus:ring-[#01327F]/20"
    >
      {/* Media Area */}
      <div className="relative w-full h-48 sm:h-52 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            unoptimized
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-102"
          />
        ) : (
          <div className="w-full h-full bg-[#01327F]/[0.02] flex items-center justify-center text-amber-500/30">
            <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className="absolute top-3 left-3 bg-[#01327F] text-amber-400 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          {formatYear(item?.Year)}
        </span>
        
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#01327F] text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
          View Details
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 w-full">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-500 mb-1 block truncate">
          {safeText(item?.Name)}
        </span>
        <h3 className="text-base font-bold text-[#01327F] mb-2 group-hover:text-amber-500 transition-colors duration-150 line-clamp-1">
          {title}
        </h3>
        {item?.Description ? (
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2 flex-1">
            {item.Description}
          </p>
        ) : (
          <p className="text-xs md:text-sm text-gray-400 italic leading-relaxed mb-5 line-clamp-2 flex-1">
            Tap to view the complete achievement details.
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-400">{formatYear(item?.Year)}</span>
          <span className="inline-flex items-center gap-1 text-[#01327F] group-hover:text-amber-500 transition-colors duration-150">
            Open
            <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailRow({ label, value, variant = "text" }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 text-xs sm:text-sm gap-4">
      <span className="text-gray-400 font-medium shrink-0">{label}</span>
      <div 
        className={`text-[#01327F] font-semibold text-right break-all ${variant === "mono" ? "font-mono bg-gray-50 px-1.5 py-0.5 rounded text-[11px]" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

export default function AchievementsPageClient({
  initialAchievements = [],
  initialLoaded = false,
}) {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [loading, setLoading] = useState(!initialLoaded);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalImageError, setModalImageError] = useState(false);

  useEffect(() => {
    if (initialLoaded) return;

    const loadAchievements = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api/client/achievements");
        if (response.data.status === "success") {
          const payload = response.data.data;
          const list = Array.isArray(payload) ? payload : payload?.data || [];
          setAchievements(list);
        } else {
          setError(response.data.message || "Failed to load achievements.");
        }
      } catch (err) {
        setError("Unable to load achievements right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [initialLoaded]);

  useEffect(() => {
    if (!selected) {
      document.body.style.overflow = "";
      return;
    }

    setModalImageError(false);
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const sortedAchievements = sortAchievements(achievements);
  const trimmedSearch = searchQuery.trim();
  const query = trimmedSearch.toLowerCase();
  const visibleAchievements = sortedAchievements.filter((item) =>
    matchesSearch(item, query)
  );

  const latestYear = getLatestYear(achievements);

  const detailRows = selected
    ? [
      { label: "Achievement ID", value: safeText(selected.Id) },
      { label: "Branch ID", value: safeText(selected.Branch_Id) },
      { label: "Category / Name", value: safeText(selected.Name) },
      { label: "Title", value: safeText(selected.Title) },
      { label: "Year", value: formatYear(selected.Year) },
      { label: "Index Position", value: safeText(selected.Index_No) },
      {
        label: "Status",
        value: (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${selected.Is_Active === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
            {safeText(selected.Is_Active)}
          </span>
        ),
      },
      { label: "Image File", value: safeText(selected.Image), variant: "mono" },
      { label: "Created At", value: formatDateTime(selected.createdAt) },
      { label: "Updated At", value: formatDateTime(selected.updatedAt) },
    ]
    : [];

  const selectedImageSrc = selected ? resolveAssetSrc(selected.Image, "") : "";
  const selectedTitle = selected?.Title || selected?.Name || "Achievement";

  return (
    <>
      <section className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="bg-[#01327F]/[0.02] border-b border-gray-100 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-[2px] w-6 bg-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Recognition & Milestones</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-[#01327F] tracking-tight">Achievements</h1>
              <p className="text-sm text-gray-600 mt-3 max-w-xl leading-relaxed">
                Browse every published achievement, search by name, title, year, or description,
                and open any card to see the full record in one place.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold mt-5 text-gray-400">
                <Link href="/" className="hover:text-[#01327F] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#01327F]">Achievements</span>
              </div>
            </div>

            {/* Search & Stats Panel */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative w-full bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex items-center">
                <div className="text-gray-400 pl-3 shrink-0">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full pl-2.5 pr-8 py-2 text-sm bg-transparent border-0 text-[#01327F] placeholder-gray-400 font-medium focus:outline-none focus:ring-0"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 text-gray-400 hover:text-amber-500 p-1 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : null}
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3.5 border border-gray-100 rounded-xl shadow-sm text-center">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</div>
                  <div className="text-lg font-black text-[#01327F] mt-0.5">{loading ? "..." : achievements.length}</div>
                  <div className="text-[9px] font-medium text-gray-500 truncate mt-0.5">Published</div>
                </div>
                <div className="bg-white p-3.5 border border-gray-100 rounded-xl shadow-sm text-center">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Showing</div>
                  <div className="text-lg font-black text-[#01327F] mt-0.5">{loading ? "..." : visibleAchievements.length}</div>
                  <div className="text-[9px] font-medium text-gray-500 truncate mt-0.5">Matching</div>
                </div>
                <div className="bg-white p-3.5 border border-gray-100 rounded-xl shadow-sm text-center">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Latest Year</div>
                  <div className="text-lg font-black text-amber-500 mt-0.5">{loading ? "..." : latestYear}</div>
                  <div className="text-[9px] font-medium text-gray-500 truncate mt-0.5">Newest Rec</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body/List Section */}
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-8 text-xs sm:text-sm text-gray-500 font-medium">
            <p>
              Showing <strong className="text-[#01327F]">{loading ? 0 : visibleAchievements.length}</strong> achievement{visibleAchievements.length === 1 ? "" : "s"}
            </p>
            <span className="bg-[#01327F]/[0.03] text-[#01327F] font-bold px-3 py-1.5 rounded-lg max-w-xs truncate">
              {trimmedSearch ? `Filter: ${trimmedSearch}` : "All achievements"}
            </span>
          </div>

          {/* States: Loading Container */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl overflow-hidden min-h-[360px] flex flex-col">
                  <div className="bg-gray-200 h-48 sm:h-52 w-full" />
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-5 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-8 bg-gray-200 rounded w-full mt-auto" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* States: Error View Container */}
          {!loading && error && (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-[#01327F]">Could not load achievements</h2>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{error}</p>
              <button 
                type="button" 
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold bg-[#01327F] text-white px-5 py-2.5 rounded-xl hover:bg-amber-400 hover:text-[#01327F] transition-all"
              >
                Reload Page
              </button>
            </div>
          )}

          {/* States: Empty Result Filter View */}
          {!loading && !error && visibleAchievements.length === 0 && (
            <div className="text-center py-20 max-w-sm mx-auto">
              <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-[#01327F]">No achievements found</h2>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Try adjusting your search terms or view all published records.</p>
              <button 
                type="button" 
                onClick={() => setSearchQuery("")}
                className="mt-5 inline-flex items-center text-xs font-bold text-[#01327F] bg-[#01327F]/[0.04] px-4 py-2 rounded-xl hover:bg-amber-400 hover:text-[#01327F] transition-all"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Main Grid View */}
          {!loading && !error && visibleAchievements.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleAchievements.map((item, index) => (
                <AchievementCard
                  key={item?.Id || index}
                  item={item}
                  index={index}
                  onSelect={(achievement) => setSelected(achievement)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Detail Modal View Matrix */}
        {selected && (
          <div 
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01327F]/40 backdrop-blur-sm transition-opacity duration-300"
          >
            <div 
              role="dialog" 
              aria-modal="true" 
              aria-labelledby="achievement-modal-title" 
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row transform transition-all duration-300 animate-in fade-in zoom-in-95"
            >
              <button 
                type="button" 
                aria-label="Close achievement details" 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-amber-500 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-colors"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-full flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
                {/* Modal Media Half */}
                <div className="relative w-full md:w-1/2 h-52 sm:h-64 md:h-auto bg-[#01327F]/[0.02] flex items-center justify-center shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-gray-100">
                  {selectedImageSrc && !modalImageError ? (
                    <Image
                      src={selectedImageSrc}
                      alt={selectedTitle}
                      fill
                      unoptimized
                      onError={() => setModalImageError(true)}
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-500/20 py-12">
                      <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Modal Body Info Panel half */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                    Achievement Detail
                  </div>
                  <h2 
                    id="achievement-modal-title"
                    className="text-lg md:text-xl font-black text-[#01327F] leading-snug mb-3 pr-6"
                  >
                    {selectedTitle}
                  </h2>
                  
                  <div className="bg-gray-50/60 p-4 rounded-xl text-xs md:text-sm text-gray-600 leading-relaxed mb-6 border border-gray-100/50">
                    {selected.Description ? (
                      <p>{selected.Description}</p>
                    ) : (
                      <p className="italic text-gray-400">This achievement does not have a long description yet. The full record is shown below.</p>
                    )}
                  </div>

                  {/* Metadata Matrix Grid */}
                  <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm flex-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2 mb-2">
                      System Audit Parameters
                    </h4>
                    <div className="divide-y divide-gray-50">
                      {detailRows.map((row) => (
                        <DetailRow
                          key={row.label}
                          label={row.label}
                          value={row.value}
                          variant={row.variant}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom Footer Button inside details */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end shrink-0">
                    <button 
                      type="button"
                      onClick={() => setSelected(null)}
                      className="bg-[#01327F] text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-amber-400 hover:text-[#01327F] transition-colors duration-200 shadow-sm active:scale-95"
                    >
                      Close Overview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}