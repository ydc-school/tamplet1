"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function GalleryPage({
  initialCategories = [],
  initialLoaded = false,
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    axios
      .get("/api/client/gallery-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          // Index_No ascending (lower = top), nulls last
          const sorted = [...data].sort((a, b) => {
            if (a.Index_No === null && b.Index_No === null) return 0;
            if (a.Index_No === null) return 1;
            if (b.Index_No === null) return -1;
            return a.Index_No - b.Index_No;
          });
          setCategories(sorted);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <>
      <style>{`

        .gl-root {
          min-height: 100vh;
          background: #f6f8fc;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .gl-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .gl-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* Hero */
        .gl-hero {
          width: 100%;
          background: linear-gradient(160deg, #f3f7fc 0%, #f6f8fc 100%);
          border-bottom: 1px solid rgba(196,160,72,0.12);
          padding: 110px 24px 52px;
          position: relative;
          z-index: 1;
        }
        .gl-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }
        .gl-hero-inner { max-width: 1160px; margin: 0 auto; }
        .gl-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 14px;
        }
        .gl-ey-dot { width: 5px; height: 5px; border-radius: 50%; background: #c4a048; }
        .gl-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase; color: #c4a048;
        }
        .gl-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 800; color: #10213a; line-height: 1.15; margin-bottom: 10px;
        }
        .gl-hero-sub {
          font-size: 15px; color: #3a5a7a; margin-top: 8px;
        }

        /* Body */
        .gl-body {
          max-width: 1160px;
          margin: 0 auto;
          padding: 52px 24px 80px;
          position: relative; z-index: 1;
        }

        /* Grid */
        .gl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 540px) { .gl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 860px) { .gl-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1100px) { .gl-grid { grid-template-columns: repeat(4, 1fr); } }

        /* Category card */
        .gl-cat-card {
          display: block;
          text-decoration: none;
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          animation: gl-fadein 0.5s ease both;
        }
        .gl-cat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.5);
          border-color: rgba(196,160,72,0.28);
        }
        @keyframes gl-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gl-cat-card:nth-child(1) { animation-delay: 0s; }
        .gl-cat-card:nth-child(2) { animation-delay: 0.06s; }
        .gl-cat-card:nth-child(3) { animation-delay: 0.12s; }
        .gl-cat-card:nth-child(4) { animation-delay: 0.18s; }
        .gl-cat-card:nth-child(5) { animation-delay: 0.24s; }
        .gl-cat-card:nth-child(6) { animation-delay: 0.3s; }
        .gl-cat-card:nth-child(7) { animation-delay: 0.36s; }
        .gl-cat-card:nth-child(8) { animation-delay: 0.42s; }

        .gl-strip {
          height: 3px;
          background: linear-gradient(90deg, #c4a048, #e0c060, #c4a048);
        }

        /* Thumbnail */
        .gl-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #f6f8fc;
          overflow: hidden;
        }
        .gl-thumb img { transition: transform 0.4s ease !important; }
        .gl-cat-card:hover .gl-thumb img { transform: scale(1.07) !important; }
        .gl-thumb-overlay {
          position: absolute; inset: 0;
          background: rgba(7,16,32,0);
          transition: background 0.3s; z-index: 1;
        }
        .gl-cat-card:hover .gl-thumb-overlay { background: rgba(7,16,32,0.2); }

        /* No image */
        .gl-no-thumb {
          width: 100%; aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, #ffffff, #eef4ff);
          display: flex; align-items: center; justify-content: center;
        }

        /* Hover arrow */
        .gl-arrow-icon {
          position: absolute;
          bottom: 12px; right: 12px; z-index: 2;
          width: 32px; height: 32px;
          background: #c4a048; border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          color: #f6f8fc;
          opacity: 0; transform: scale(0.8);
          transition: all 0.25s;
        }
        .gl-cat-card:hover .gl-arrow-icon { opacity: 1; transform: scale(1); }

        /* Card body */
        .gl-cat-body { padding: 18px 20px 22px; }
        .gl-cat-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px; font-weight: 700;
          color: #d8c8a0; line-height: 1.3; margin-bottom: 6px;
          transition: color 0.2s;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gl-cat-card:hover .gl-cat-name { color: #10213a; }
        .gl-cat-desc {
          font-size: 12.5px; line-height: 1.65; color: #3a5a7a;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .gl-cat-hint {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(196,160,72,0.4);
          transition: all 0.2s;
        }
        .gl-cat-card:hover .gl-cat-hint { color: #c4a048; gap: 9px; }

        /* Empty state */
        .gl-empty {
          text-align: center; padding: 80px 24px;
          color: #3a5a7a;
        }
        .gl-empty-icon { margin: 0 auto 16px; color: rgba(196,160,72,0.15); }
        .gl-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; color: #1d3557; margin-bottom: 8px;
        }

        /* Skeleton */
        .gl-skel {
          height: 260px; border-radius: 4px;
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: gl-shimmer 1.5s infinite;
        }
        @keyframes gl-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="gl-root">
        {/* Hero */}
        <div className="gl-hero">
          <div className="gl-hero-inner">
            <div className="gl-eyebrow">
              <span className="gl-ey-dot" />
              <span className="gl-ey-text">Media</span>
            </div>
            <h1 className="gl-hero-title">Photo Gallery</h1>
            <p className="gl-hero-sub">Explore our campus life, events and achievements</p>
          </div>
        </div>

        {/* Body */}
        <div className="gl-body">
          {loading ? (
            <div className="gl-grid">
              {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="gl-skel" />)}
            </div>
          ) : categories.length === 0 ? (
            <div className="gl-empty">
              <svg className="gl-empty-icon" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="gl-empty-title">No galleries yet</div>
              <p style={{ fontSize: 14 }}>Check back soon for photos and updates.</p>
            </div>
          ) : (
            <div className="gl-grid">
              {categories.map((cat) => (
                <Link key={cat.Id} href={`/gallery/${cat.Id}`} className="gl-cat-card">
                  <div className="gl-strip" />
                  {cat.Image ? (
                    <div className="gl-thumb">
                      <Image
                        src={`/uploads/${cat.Image}`}
                        alt={cat.Name || "Gallery"}
                        fill
                        sizes="(max-width: 540px) 100vw, (max-width: 860px) 50vw, (max-width: 1100px) 33vw, 25vw"
                        className="object-cover"
                      />
                      <div className="gl-thumb-overlay" />
                      <div className="gl-arrow-icon">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="gl-no-thumb">
                      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="rgba(196,160,72,0.15)" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="gl-cat-body">
                    <div className="gl-cat-name">{cat.Name || "Untitled Gallery"}</div>
                    {cat.Description && (
                      <div className="gl-cat-desc">
                        {cat.Description.replace(/<[^>]+>/g, " ").trim()}
                      </div>
                    )}
                    <span className="gl-cat-hint">
                      View Photos
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
