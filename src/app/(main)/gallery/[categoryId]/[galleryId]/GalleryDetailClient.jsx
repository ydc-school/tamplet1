"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// सेफ HTML क्लीनर हेल्पर
const stripHtml = (htmlString) => {
  if (!htmlString) return "";
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
};

export default function GalleryDetailPage({ categoryId: categoryIdProp, galleryId: galleryIdProp, initialGallery = null, initialImages = [], initialLoaded = false }) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const galleryId = galleryIdProp || params.galleryId;
  const router = useRouter();
  
  const [gallery, setGallery] = useState(initialGallery);
  const [images, setImages] = useState(initialImages);
  const [loading, setLoading] = useState(!initialLoaded);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // ... (आपकी Fetch / Axios लॉजिक यहाँ बिना किसी बदलाव के काम करेगी)

  // कीबोर्ड नेविगेशन गार्ड (Left / Right / Escape)
  useEffect(() => {
    if (lightboxIndex === null) return;
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, images.length]);

  // लाइटबॉक्स ओपन होने पर पैरेंट स्क्रॉल लॉक गार्ड
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 overflow-hidden relative">
      {/* एम्बिएंट लक्ज़री बैकग्राउंड लाइट्स */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1e1b4b]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* PREMIUM ACADEMIC HERO HEADER */}
        <header className="space-y-4 mb-16 md:mb-24 text-left max-w-3xl">
          <button 
            onClick={() => router.push(`/gallery/${categoryId}`)}
            className="inline-flex items-center gap-2 text-[#1e1b4b]/80 hover:text-[#7f1d1d] font-sans font-black text-xs uppercase tracking-widest bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm transition-all duration-300 transform hover:-translate-x-1 focus:outline-none"
          >
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Albums
          </button>

          <div className="space-y-2 pt-2">
            <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.3em] uppercase block">
              Campus Life &amp; Events
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-black text-[#1e1b4b] tracking-tight leading-tight">
              {loading ? "Loading Album…" : gallery?.Name || "Photo Album"}
            </h1>
            <div className="w-20 h-1.5 bg-[#7f1d1d] rounded-full mt-3" />
          </div>

          {gallery?.Description && (
            <p className="font-sans text-sm md:text-base text-[#0f172a]/60 leading-relaxed font-medium pt-2">
              {stripHtml(gallery.Description)}
            </p>
          )}
        </header>

        {/* PHOTO MATRIX GRID SECTION */}
        <section aria-label="Photo gallery grid" className="min-h-[300px]">
          {loading ? (
            /* स्केलेटन पल्स ग्रिड लोडर */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-slate-200 border border-slate-100 rounded-[2rem] aspect-square animate-pulse w-full" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
              <p className="font-sans font-medium text-base text-slate-400">No memories captured in this album yet.</p>
            </div>
          ) : (
            /* 3-4 COLUMNS CORE PRECISION GRID */
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 m-0 p-0 list-none">
              {images.map((img, idx) => (
                <li 
                  key={img.Id || idx} 
                  onClick={() => setLightboxIndex(idx)}
                  className="relative aspect-square bg-slate-100 border border-slate-200/40 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-500 group transform hover:-translate-y-1"
                >
                  <figure className="w-full h-full m-0 p-0 relative">
                    <Image 
                      src={`/uploads/${img.Image}`} 
                      alt={`${gallery?.Name || "Gallery"} snapshot ${idx + 1}`} 
                      fill 
                      sizes="(max-w-768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    {/* ग्लासमोर्फिज़्म होवर एक्सपैंड मास्क */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 text-white border border-white/30 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 backdrop-blur-md">
                        {/* एक्सपैंड प्लस / ज़ूम आइकन */}
                        <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>

      {/* FULL SCREEN IMMERSIVE DIALOG LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <dialog 
          open 
          className="fixed inset-0 z-[2000] w-full h-full bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-0 border-none m-0 select-none overflow-hidden animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setLightboxIndex(null)}
        >
          <article 
            onClick={e => e.stopPropagation()}
            className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12"
          >
            {/* सेंटर्ड लार्ज इमेज फ्रेम */}
            <figure className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] flex items-center justify-center m-0 p-0">
              <Image 
                src={`/uploads/${images[lightboxIndex].Image}`} 
                alt="Full size projection" 
                fill 
                unoptimized
                className="object-contain" 
              />
              
              {/* फ्लोटिंग प्रिसिजन नंबर काउंटर */}
              <figcaption className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white font-sans font-black text-xs uppercase tracking-[0.3em] bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-xl">
                <span className="text-[#c4a048]">{String(lightboxIndex + 1).padStart(2, "0")}</span>
                <span className="opacity-40 mx-1">/</span>
                <span className="opacity-60">{String(images.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>

            {/* ACCESSIBLE NAV ARROWS LEFT / RIGHT */}
            {images.length > 1 && (
              <nav aria-label="Lightbox navigation" className="absolute inset-x-4 md:inset-x-10 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10">
                <button 
                  onClick={() => setLightboxIndex(i => (i - 1 + images.length) % images.length)}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#c4a048] border border-white/10 hover:border-[#c4a048] text-white transition-all duration-300 backdrop-blur-md flex items-center justify-center pointer-events-auto shadow-2xl focus:outline-none active:scale-90 group"
                  aria-label="Previous photo"
                >
                  <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => setLightboxIndex(i => (i + 1) % images.length)}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#c4a048] border border-white/10 hover:border-[#c4a048] text-white transition-all duration-300 backdrop-blur-md flex items-center justify-center pointer-events-auto shadow-2xl focus:outline-none active:scale-90 group"
                  aria-label="Next photo"
                >
                  <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            )}

            {/* TOP-RIGHT CLOSE X TRIGGER BUTTON */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 bg-white/5 hover:bg-[#7f1d1d] text-white rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/10 group focus:outline-none shadow-2xl"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </article>
        </dialog>
      )}
    </main>
  );
}