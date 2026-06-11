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
