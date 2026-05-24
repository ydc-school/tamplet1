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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [galleryId, initialLoaded]);

  // Keyboard nav
  const handleKey = useCallback((e) => {
    if (lightbox === null) return;
    if (e.key === "ArrowRight") setLightbox(i => (i + 1) % images.length);
    if (e.key === "ArrowLeft")  setLightbox(i => (i - 1 + images.length) % images.length);
    if (e.key === "Escape")     setLightbox(null);
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
    <>
      <style>{`
        .gd-root {
          min-height: 100vh;
          background: #f6f8fc;
          font-family: 'Source Sans 3', sans-serif;
          position: relative; overflow: hidden;
        }
        .gd-root::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .gd-root::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* Hero */
        .gd-hero {
          background: linear-gradient(160deg, #f3f7fc 0%, #f6f8fc 100%);
          border-bottom: 1px solid rgba(196,160,72,0.12);
          padding: 110px 24px 48px;
          position: relative; z-index: 1;
        }
        .gd-hero::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }
        .gd-hero-inner { max-width: 1200px; margin: 0 auto; }

        .gd-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #3a5a7a; background: none; border: none;
          cursor: pointer; padding: 0; margin-bottom: 24px;
          transition: color 0.2s;
        }
        .gd-back:hover { color: #c4a048; }
        .gd-back:hover .gd-back-arr { transform: translateX(-3px); }
        .gd-back-arr { transition: transform 0.2s; }

        .gd-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;
        }
        .gd-ey-dot { width: 5px; height: 5px; border-radius: 50%; background: #c4a048; }
        .gd-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase; color: #c4a048;
        }
        .gd-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 800; color: #10213a; line-height: 1.15;
        }
        .gd-desc { font-size: 14px; color: #3a5a7a; margin-top: 8px; max-width: 560px; }
        .gd-count {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 12px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(196,160,72,0.5);
        }
        .gd-count-num { color: #c4a048; font-size: 15px; }

        /* Body */
        .gd-body {
          max-width: 1200px; margin: 0 auto;
          padding: 48px 24px 80px;
          position: relative; z-index: 1;
        }

        /* Grid */
        .gd-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        @media (min-width: 640px) { .gd-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; } }
        @media (min-width: 960px) { .gd-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1200px) { .gd-grid { grid-template-columns: repeat(5, 1fr); } }

        /* Tile */
        .gd-tile {
          position: relative;
          aspect-ratio: 1/1;
          background: #ffffff;
          border: 1px solid rgba(196,160,72,0.1);
          border-radius: 3px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          animation: gd-fadein 0.4s ease both;
        }
        .gd-tile:hover {
          transform: scale(1.04);
          box-shadow: 0 12px 36px rgba(0,0,0,0.5);
          border-color: rgba(196,160,72,0.3);
          z-index: 2;
        }
        @keyframes gd-fadein {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .gd-tile:nth-child(1){animation-delay:0s}
        .gd-tile:nth-child(2){animation-delay:.04s}
        .gd-tile:nth-child(3){animation-delay:.08s}
        .gd-tile:nth-child(4){animation-delay:.12s}
        .gd-tile:nth-child(5){animation-delay:.16s}
        .gd-tile:nth-child(6){animation-delay:.20s}
        .gd-tile:nth-child(7){animation-delay:.24s}
        .gd-tile:nth-child(8){animation-delay:.28s}
        .gd-tile:nth-child(9){animation-delay:.32s}
        .gd-tile:nth-child(10){animation-delay:.36s}

        .gd-tile img { transition: transform 0.4s ease !important; }
        .gd-tile:hover img { transform: scale(1.08) !important; }

        .gd-overlay {
          position: absolute; inset: 0;
          background: rgba(7,16,32,0);
          transition: background 0.3s; z-index: 1;
        }
        .gd-tile:hover .gd-overlay { background: rgba(7,16,32,0.45); }

        .gd-zoom {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%) scale(0.7);
          opacity: 0; z-index: 2; color: white;
          transition: all 0.25s; pointer-events: none;
        }
        .gd-tile:hover .gd-zoom { opacity: 1; transform: translate(-50%,-50%) scale(1); }

        /* Empty / skeleton */
        .gd-empty { text-align: center; padding: 80px 24px; color: #3a5a7a; }
        .gd-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; color: #1d3557; margin: 16px 0 8px;
        }
        .gd-skel {
          aspect-ratio: 1/1; border-radius: 3px;
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: gd-shimmer 1.5s infinite;
        }
        @keyframes gd-shimmer {
          0%{background-position:200% 0} 100%{background-position:-200% 0}
        }

        /* ── Lightbox ── */
        .lb-wrap {
          position: fixed; inset: 0; z-index: 1100;
          background: rgba(0,0,0,0.93);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          animation: lb-in 0.2s ease;
        }
        @keyframes lb-in { from { opacity:0 } to { opacity:1 } }

        .lb-img {
          position: relative;
          width: min(92vw, 960px);
          height: min(82vh, 720px);
        }

        .lb-close {
          position: fixed; top: 16px; right: 16px; z-index: 10;
          width: 38px; height: 38px;
          background: rgba(7,16,32,0.75);
          border: 1px solid rgba(196,160,72,0.2);
          border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #c4a048; transition: all 0.2s;
        }
        .lb-close:hover { background: rgba(196,160,72,0.15); border-color: #c4a048; }

        .lb-prev, .lb-next {
          position: fixed; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px;
          background: rgba(7,16,32,0.75);
          border: 1px solid rgba(196,160,72,0.2);
          border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #c4a048; z-index: 10;
          transition: all 0.2s;
        }
        .lb-prev { left: 16px; }
        .lb-next { right: 16px; }
        .lb-prev:hover, .lb-next:hover { background: rgba(196,160,72,0.15); border-color: #c4a048; }

        .lb-counter {
          position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; color: rgba(196,160,72,0.5); z-index: 10;
        }
        .lb-counter-cur { color: #c4a048; }
      `}</style>

      <div className="gd-root">
        <div className="gd-hero">
          <div className="gd-hero-inner">
            <button className="gd-back" onClick={() => router.push(`/gallery/${categoryId}`)}>
              <svg className="gd-back-arr" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Albums
            </button>
            <div className="gd-eyebrow">
              <span className="gd-ey-dot" />
              <span className="gd-ey-text">Photos</span>
            </div>
            <h1 className="gd-title">
              {loading ? "Loading…" : gallery?.Name || "Photo Album"}
            </h1>
            {gallery?.Description && (
              <p className="gd-desc">{stripHtml(gallery.Description)}</p>
            )}
            {!loading && (
              <div className="gd-count">
                <span className="gd-count-num">{images.length}</span>
                Photo{images.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>

        <div className="gd-body">
          {loading ? (
            <div className="gd-grid">
              {[1,2,3,4,5,6,7,8,9,10].map(i => <div key={i} className="gd-skel" />)}
            </div>
          ) : images.length === 0 ? (
            <div className="gd-empty">
              <svg style={{ margin:"0 auto", display:"block", color:"rgba(196,160,72,0.12)" }} width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="gd-empty-title">No photos in this album yet</div>
              <p style={{ fontSize:14 }}>Check back soon.</p>
            </div>
          ) : (
            <div className="gd-grid">
              {images.map((img, idx) => (
                <div key={img.Id} className="gd-tile" onClick={() => setLightbox(idx)}>
                  <Image
                    src={`/uploads/${img.Image}`}
                    alt={`${gallery?.Name || "Gallery"} photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover"
                  />
                  <div className="gd-overlay" />
                  <div className="gd-zoom">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zm-3-3v6m-3-3h6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && images[lightbox] && (
        <div className="lb-wrap" onClick={() => setLightbox(null)}>
          <div className="lb-img" onClick={e => e.stopPropagation()}>
            <Image
              src={`/uploads/${images[lightbox].Image}`}
              alt={`${gallery?.Name || "Gallery"} photo ${lightbox + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>

          <button className="lb-close" onClick={() => setLightbox(null)}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button className="lb-prev" onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + images.length) % images.length); }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="lb-next" onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % images.length); }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="lb-counter">
                <span className="lb-counter-cur">{String(lightbox + 1).padStart(2, "0")}</span>
                {" / "}{String(images.length).padStart(2, "0")}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
