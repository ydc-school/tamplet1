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
    axios.get(`/api/client/gallery/${galleryId}`)
      .then((res) => {
        if (res.data.status === "success") {
          setGallery({ Name: res.data.data.Name, Description: res.data.data.Description });
          setImages(res.data.data.img ?? []);
        }
      })
      .finally(() => setLoading(false));
  }, [galleryId, initialLoaded]);

  const handleKey = useCallback((e) => {
    if (lightbox === null) return;
    if (e.key === "ArrowRight") setLightbox(i => (i + 1) % images.length);
    if (e.key === "ArrowLeft") setLightbox(i => (i - 1 + images.length) % images.length);
    if (e.key === "Escape") setLightbox(null);
  }, [lightbox, images.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Editorial Header */}
      <header className="mb-16 border-b border-stone-200 pb-12">
        <button onClick={() => router.push(`/gallery/${categoryId}`)} className="text-xs uppercase tracking-widest text-stone-500 hover:text-amber-800 transition-colors mb-6 flex items-center gap-2">
          ← Back to Albums
        </button>
        <span className="text-amber-800 uppercase tracking-[0.2em] text-xs font-semibold">Visual Archives</span>
        <h1 className="font-serif text-5xl text-stone-900 mt-4 mb-6">{loading ? "Loading..." : gallery?.Name}</h1>
        {gallery?.Description && <p className="text-stone-600 max-w-2xl text-lg font-serif italic">{gallery.Description}</p>}
      </header>

      {/* Masonry-Style Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div key={img.Id} onClick={() => setLightbox(idx)} className="relative group aspect-square bg-stone-100 overflow-hidden cursor-pointer">
            <Image src={`/uploads/${img.Image}`} alt="Gallery photo" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-widest">View</span>
            </div>
          </div>
        ))}
      </section>

      {/* Editorial Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 animate-fade-in" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-8 right-8 text-stone-900 hover:text-amber-800">✕</button>
          
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <Image src={`/uploads/${images[lightbox].Image}`} alt="Full view" fill className="object-contain" />
          </div>

          <div className="flex gap-8 mt-6">
            <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + images.length) % images.length); }} className="uppercase text-xs tracking-widest text-stone-500 hover:text-amber-800">Previous</button>
            <span className="text-stone-300">|</span>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % images.length); }} className="uppercase text-xs tracking-widest text-stone-500 hover:text-amber-800">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}