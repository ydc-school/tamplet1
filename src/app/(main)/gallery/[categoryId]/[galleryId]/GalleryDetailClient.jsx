"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function GalleryDetailPage({ categoryId: categoryIdProp, galleryId: galleryIdProp, initialGallery = null, initialImages = [], initialLoaded = false }) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const galleryId = galleryIdProp || params.galleryId;
  const router = useRouter();
  
  const [gallery, setGallery] = useState(initialGallery);
  const [images, setImages] = useState(initialImages);
  const [loading, setLoading] = useState(!initialLoaded);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // ... (Fetch logic and Keyboard nav logic wahi rahegi)

  return (
    <main className="gd-root">
      {/*
        UI PROMPT — GALLERY DETAIL (Photo Album + Lightbox):
        Hero: "← Back to Albums" + album name H1 + description.
        Photo grid 3-4 cols: square/landscape thumbnails, hover zoom + expand icon, click opens lightbox.
        Lightbox: full-screen dark overlay, large centered image, "03 / 12" counter, Prev/Next arrows, close X.
        Keyboard arrow navigation. Full prompt: UI_PROMPTS.md → Section 22
      */}
      {/* Header Landmark */}
      <header className="gd-hero">
        <button onClick={() => router.push(`/gallery/${categoryId}`)}>Back to Albums</button>
        <h1>{loading ? "Loading…" : gallery?.Name || "Photo Album"}</h1>
        {gallery?.Description && <p>{stripHtml(gallery.Description)}</p>}
      </header>

      {/* Gallery Section */}
      <section aria-label="Photo gallery grid">
        {loading ? (
          <div aria-busy="true">Loading images...</div>
        ) : (
          <ul className="gd-grid">
            {images.map((img, idx) => (
              <li key={img.Id} className="gd-tile" onClick={() => setLightboxIndex(idx)}>
                <figure>
                  <Image src={`/uploads/${img.Image}`} alt={`${gallery?.Name} photo ${idx + 1}`} fill />
                </figure>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <dialog open className="lb-wrap" onClick={() => setLightboxIndex(null)}>
          <article onClick={e => e.stopPropagation()}>
            <figure>
              <Image src={`/uploads/${images[lightboxIndex].Image}`} alt="Full size" fill />
              <figcaption>{String(lightboxIndex + 1).padStart(2, "0")} / {images.length}</figcaption>
            </figure>
            <nav aria-label="Lightbox navigation">
              <button onClick={() => setLightboxIndex(i => (i - 1 + images.length) % images.length)}>Previous</button>
              <button onClick={() => setLightboxIndex(i => (i + 1) % images.length)}>Next</button>
            </nav>
            <button onClick={() => setLightboxIndex(null)}>Close</button>
          </article>
        </dialog>
      )}
    </main>
  );
}