"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function GalleryDetailPage({
  categoryId: categoryIdProp,
  galleryId: galleryIdProp,
  initialGallery = null,
  initialImages = [],
  initialLoaded = false,
}) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const galleryId = galleryIdProp || params.galleryId;
  const router = useRouter();
  const [gallery, setGallery] = useState(initialGallery);
  const [images, setImages] = useState(initialImages);
  const [loading, setLoading] = useState(!initialLoaded);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (initialLoaded) return;
    if (!galleryId) return;
    axios
      .get(`/api/client/gallery/${galleryId}`)
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data;
          setGallery({ Name: data.Name, Description: data.Description });
          setImages(data.img ?? []);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [galleryId, initialLoaded]);

  // Keyboard navigation logic
  const handleKey = useCallback((e) => {
    if (lightbox === null) return;
    if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % images.length);
    if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + images.length) % images.length);
    if (e.key === "Escape") setLightbox(null);
  }, [lightbox, images.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const stripHtml = (html) => html?.replace(/<[^>]+>/g, " ").trim() ?? "";

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 antialiased pb-20 selection:bg-[#01327F]/10 selection:text-[#01327F]">
      
      {/* ── Modern Corporate-Identity Hero Header Block ── */}
      <header className="relative bg-[#01327F] pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Light Trailing Ambience */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-start gap-4">
          <button 
            onClick={() => router.push(`/gallery/${categoryId}`)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-amber-400 bg-white/[0.06] border border-white/[0.1] backdrop-blur-md px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Albums
          </button>

          <div className="inline-flex items-center gap-2 bg-amber-400 text-[#01327F] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#01327F] animate-pulse" />
            Media Gallery
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            {loading ? "Loading…" : gallery?.Name || "Photo Album"}
          </h1>

          {gallery?.Description && (
            <p className="text-sm sm:text-base text-white/70 max-w-2xl font-normal leading-relaxed mt-1">
              {stripHtml(gallery.Description)}
            </p>
          )}

          {!loading && (
            <div className="inline-flex items-center gap-2 mt-2 bg-white/[0.07] border border-white/[0.1] px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400">
              <span>{images.length}</span>
              <span className="text-white/60">Photo{images.length !== 1 ? "s" : ""} Available</span>
            </div>
          )}
        </div>
      </header>

      {/* ── Photo Layout Grid Frame Area ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Shimmer Placeholder Loading Skeletal State */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-2xl border border-gray-100" />
            ))}
          </div>
        ) : images.length === 0 ? (
          /* Empty Album Framework Notification Layout */
          <div className="py-24 text-center max-w-sm mx-auto animate-in fade-in duration-300">
            <div className="p-4 rounded-full bg-gray-100 border border-gray-200 inline-block text-gray-400 mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 className="text-base font-black text-[#01327F]">No photos in this album yet</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">Check back soon. The pipeline cloud media folder asset registry database framework stack container is empty.</p>
          </div>
        ) : (
          /* Interactive Mosaic Grid Layer rendering */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-in fade-in duration-300">
            {images.map((img, idx) => (
              <div 
                key={img.Id} 
                onClick={() => setLightbox(idx)}
                className="group relative aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:border-[#01327F]/10 transition-all duration-300"
              >
                <Image
                  src={`/uploads/${img.Image}`}
                  alt={`${gallery?.Name || "Gallery"} photo ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, (max-width: 1200px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Micro Ambient Shadow Gradient Mask Layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Centered Glassmorphic Action Zoom Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                  <div className="p-3 bg-white/20 border border-white/30 backdrop-blur-md rounded-xl text-white shadow-lg">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zm-3-3v6m-3-3h6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Fullscreen High-Fidelity Overlay Lightbox ── */}
      {lightbox !== null && images[lightbox] && (
        <div 
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 select-none animate-in fade-in duration-200"
        >
          {/* Main Focused Render Target Image Core Frame */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full max-w-5xl max-h-[82vh] flex items-center justify-center animate-in zoom-in-95 duration-300"
          >
            <Image
              src={`/uploads/${images[lightbox].Image}`}
              alt={`${gallery?.Name || "Gallery"} photo ${lightbox + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Absolute Top Floating Header Dismiss Controls */}
          <button 
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-11 h-11 bg-white/10 hover:bg-amber-400 hover:text-[#01327F] border border-white/10 text-white rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95"
            aria-label="Close lightbox"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Absolute Bottom Floating Dynamic Timeline Stepper Index Indicator */}
          {images.length > 1 && (
            <>
              {/* Previous trigger controller button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + images.length) % images.length); }}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/5 hover:bg-amber-400 hover:text-[#01327F] border border-white/10 text-white rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95"
                aria-label="Previous image"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next trigger controller button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % images.length); }}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/5 hover:bg-amber-400 hover:text-[#01327F] border border-white/10 text-white rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95"
                aria-label="Next image"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Track Counter Indicator Tag Metadata overlay badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl font-bold text-xs tracking-widest text-white/90 shadow-lg inline-flex items-center gap-1.5">
                <span className="text-amber-400">{String(lightbox + 1).padStart(2, "0")}</span>
                <span className="opacity-40">/</span>
                <span>{String(images.length).padStart(2, "0")}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}