"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function GalleryCategoryPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    Promise.all([
      axios.get("/api/client/gallery-category"),
      axios.get(`/api/client/gallery?Gallery_Category_Id=${categoryId}`)
    ])
      .then(([catRes, galRes]) => {
        if (catRes.data.status === "success") {
          const cats = catRes.data.data?.data ?? [];
          setCategory(cats.find((c) => c.Id.toString() === categoryId) ?? null);
        }
        if (galRes.data.status === "success") {
          setGalleries(galRes.data.data?.data ?? []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categoryId]);

  const stripHtml = (html) => html?.replace(/<[^>]+>/g, " ").trim() ?? "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@400;500;600&display=swap');

        .gcat-root {
          min-height: 100vh;
          background: #071020;
          font-family: 'Source Sans 3', sans-serif;
          position: relative; overflow: hidden;
        }
        .gcat-root::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .gcat-root::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .gcat-hero {
          background: linear-gradient(160deg, #0c1e3a 0%, #071020 100%);
          border-bottom: 1px solid rgba(196,160,72,0.12);
          padding: 110px 24px 52px;
          position: relative; z-index: 1;
        }
        .gcat-hero::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }
        .gcat-hero-inner { max-width: 1200px; margin: 0 auto; }

        .gcat-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #3a5a7a; background: none; border: none;
          cursor: pointer; padding: 0; margin-bottom: 24px;
          transition: color 0.2s;
        }
        .gcat-back:hover { color: #c4a048; }
        .gcat-back:hover .gcat-back-arr { transform: translateX(-3px); }
        .gcat-back-arr { transition: transform 0.2s; }

        .gcat-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;
        }
        .gcat-ey-dot { width: 5px; height: 5px; border-radius: 50%; background: #c4a048; }
        .gcat-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase; color: #c4a048;
        }
        .gcat-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 800; color: #f0e6c8; line-height: 1.15; margin-bottom: 8px;
        }
        .gcat-count {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 10px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(196,160,72,0.5);
        }
        .gcat-count-num { color: #c4a048; font-size: 15px; }

        .gcat-body {
          max-width: 1200px; margin: 0 auto;
          padding: 52px 24px 80px;
          position: relative; z-index: 1;
        }

        /* Grid */
        .gcat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 560px) { .gcat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 860px) { .gcat-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Gallery card */
        .gcat-card {
          display: block; text-decoration: none;
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px; overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          animation: gcat-fadein 0.5s ease both;
        }
        .gcat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.5);
          border-color: rgba(196,160,72,0.28);
        }
        @keyframes gcat-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gcat-card:nth-child(1){animation-delay:0s}
        .gcat-card:nth-child(2){animation-delay:.07s}
        .gcat-card:nth-child(3){animation-delay:.14s}
        .gcat-card:nth-child(4){animation-delay:.21s}
        .gcat-card:nth-child(5){animation-delay:.28s}
        .gcat-card:nth-child(6){animation-delay:.35s}

        .gcat-strip {
          height: 3px;
          background: linear-gradient(90deg, #c4a048, #e0c060, #c4a048);
        }

        .gcat-thumb {
          width: 100%; aspect-ratio: 16/9;
          background: linear-gradient(135deg, #0f2044 0%, #152a55 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .gcat-thumb-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .gcat-thumb-icon { color: rgba(196,160,72,0.18); position: relative; z-index: 1; transition: color 0.2s; }
        .gcat-card:hover .gcat-thumb-icon { color: rgba(196,160,72,0.35); }

        .gcat-thumb-arrow {
          position: absolute; bottom: 12px; right: 12px; z-index: 2;
          width: 30px; height: 30px;
          background: #c4a048; border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          color: #071020;
          opacity: 0; transform: scale(0.8);
          transition: all 0.25s;
        }
        .gcat-card:hover .gcat-thumb-arrow { opacity: 1; transform: scale(1); }

        .gcat-card-body { padding: 18px 20px 22px; }
        .gcat-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px; font-weight: 700;
          color: #d8c8a0; line-height: 1.3; margin-bottom: 8px;
          transition: color 0.2s;
        }
        .gcat-card:hover .gcat-card-name { color: #f0e6c8; }
        .gcat-card-desc {
          font-size: 13px; line-height: 1.65; color: #3a5a7a;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden; margin-bottom: 14px;
        }
        .gcat-card-hint {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(196,160,72,0.4); transition: all 0.2s;
        }
        .gcat-card:hover .gcat-card-hint { color: #c4a048; gap: 9px; }

        /* Empty */
        .gcat-empty { text-align: center; padding: 80px 24px; color: #3a5a7a; }
        .gcat-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; color: #c5d8e8; margin: 16px 0 8px;
        }

        /* Skeleton */
        .gcat-skel {
          height: 240px; border-radius: 4px;
          background: linear-gradient(90deg, #0f2044 25%, #152a52 50%, #0f2044 75%);
          background-size: 200% 100%;
          animation: gcat-shimmer 1.5s infinite;
        }
        @keyframes gcat-shimmer {
          0%{background-position:200% 0} 100%{background-position:-200% 0}
        }
      `}</style>

      <div className="gcat-root">
        <div className="gcat-hero">
          <div className="gcat-hero-inner">
            <button className="gcat-back" onClick={() => router.push("/gallery")}>
              <svg className="gcat-back-arr" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All Categories
            </button>
            <div className="gcat-eyebrow">
              <span className="gcat-ey-dot" />
              <span className="gcat-ey-text">Gallery</span>
            </div>
            <h1 className="gcat-title">
              {loading ? "Loading…" : category?.Name || category?.Title || "Gallery"}
            </h1>
            {!loading && (
              <div className="gcat-count">
                <span className="gcat-count-num">{galleries.length}</span>
                Album{galleries.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>

        <div className="gcat-body">
          {loading ? (
            <div className="gcat-grid">
              {[1,2,3,4,5,6].map(i => <div key={i} className="gcat-skel" />)}
            </div>
          ) : galleries.length === 0 ? (
            <div className="gcat-empty">
              <svg style={{ margin:"0 auto", display:"block", color:"rgba(196,160,72,0.12)" }} width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="gcat-empty-title">No albums in this category</div>
              <p style={{ fontSize:14 }}>Check back soon.</p>
            </div>
          ) : (
            <div className="gcat-grid">
              {galleries.map((gal) => (
                <Link key={gal.Id} href={`/gallery/${categoryId}/${gal.Id}`} className="gcat-card">
                  <div className="gcat-strip" />
                  <div className="gcat-thumb">
                    <div className="gcat-thumb-bg" />
                    <svg className="gcat-thumb-icon" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="gcat-thumb-arrow">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  <div className="gcat-card-body">
                    <div className="gcat-card-name">{gal.Name || `Album ${gal.Id}`}</div>
                    {gal.Description && (
                      <p className="gcat-card-desc">{stripHtml(gal.Description)}</p>
                    )}
                    <span className="gcat-card-hint">
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