"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function AchievementGallery() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/achievements")
      .then((res) => {
        console.log(res.data.data)
        if (res.data.status === "success") setAchievements(res.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && achievements?.length === 0) return null;

  const formatYear = (y) => {
    if (!y) return "";
    const d = new Date(y);
    return isNaN(d) ? y : d.getFullYear();
  };

  return (
    <>
      <style>{`

        .ag-root {
          width: 100%;
          background: #071020;
          padding: 80px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .ag-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 65% 45% at 50% 0%, rgba(196,160,72,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .ag-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .ag-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Eyebrow */
        .ag-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 10px;
        }
        .ag-ey-line {
          width: 48px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,160,72,0.5));
        }
        .ag-ey-line.rev { background: linear-gradient(to left, transparent, rgba(196,160,72,0.5)); }
        .ag-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase; color: #c4a048;
        }
        .ag-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 700; color: #f0e6c8;
          text-align: center; margin-bottom: 52px;
        }

        /* Grid */
        .ag-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 560px) { .ag-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .ag-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1200px) { .ag-grid { grid-template-columns: repeat(4, 1fr); } }

        /* Card */
        .ag-card {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          animation: ag-fadein 0.5s ease both;
        }
        .ag-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.5);
          border-color: rgba(196,160,72,0.28);
        }
        @keyframes ag-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ag-card:nth-child(1) { animation-delay: 0s; }
        .ag-card:nth-child(2) { animation-delay: 0.07s; }
        .ag-card:nth-child(3) { animation-delay: 0.14s; }
        .ag-card:nth-child(4) { animation-delay: 0.21s; }
        .ag-card:nth-child(5) { animation-delay: 0.28s; }
        .ag-card:nth-child(6) { animation-delay: 0.35s; }

        /* Gold top strip */
        .ag-strip {
          height: 3px;
          background: linear-gradient(90deg, #c4a048, #e0c060, #c4a048);
          flex-shrink: 0;
        }

        /* Image */
        .ag-img-wrap {
          position: relative;
          width: 100%;
          background: #071020;
          overflow: hidden;
        }
        .ag-img-wrap img {
          width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
          position: static !important;
          display: block;
          transition: transform 0.4s ease !important;
        }
        .ag-card:hover .ag-img-wrap img {
          transform: scale(1.06) !important;
        }
        /* Dark overlay on hover */
        .ag-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(7,16,32,0);
          transition: background 0.3s;
          z-index: 1;
        }
        .ag-card:hover .ag-img-wrap::after {
          background: rgba(7,16,32,0.25);
        }
        /* Zoom icon on hover */
        .ag-zoom-icon {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.7);
          opacity: 0;
          z-index: 2;
          color: white;
          transition: all 0.25s ease;
          pointer-events: none;
        }
        .ag-card:hover .ag-zoom-icon {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        /* No image placeholder */
        .ag-no-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, #0f2044, #152a55);
          display: flex; align-items: center; justify-content: center;
          color: rgba(196,160,72,0.15);
        }

        /* Year badge */
        .ag-year-badge {
          position: absolute;
          top: 10px; right: 10px;
          z-index: 3;
          background: #c4a048;
          color: #071020;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em;
          padding: 3px 10px;
          border-radius: 2px;
        }

        /* Body */
        .ag-body {
          padding: 18px 20px 22px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .ag-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 600;
          color: #d8c8a0; line-height: 1.35;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }
        .ag-card:hover .ag-title { color: #f0e6c8; }
        .ag-desc {
          font-size: 13px; line-height: 1.7;
          color: #4a6a8a; flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ag-read-hint {
          display: inline-flex; align-items: center; gap: 5px;
          margin-top: 12px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(196,160,72,0.45);
          transition: all 0.2s;
        }
        .ag-card:hover .ag-read-hint { color: #c4a048; gap: 8px; }

        /* Skeleton */
        .ag-skel {
          height: 280px; border-radius: 4px;
          background: linear-gradient(90deg, #0f2044 25%, #152a52 50%, #0f2044 75%);
          background-size: 200% 100%;
          animation: ag-shimmer 1.5s infinite;
        }
        @keyframes ag-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Modal ── */
        .ag-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: ag-fadein-ov 0.2s ease;
        }
        @keyframes ag-fadein-ov { from { opacity: 0; } to { opacity: 1; } }

        .ag-modal {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.2);
          border-top: 3px solid #c4a048;
          border-radius: 4px;
          width: 100%; max-width: 680px;
          max-height: 92vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7);
          animation: ag-slide 0.25s ease;
          scrollbar-width: thin;
          scrollbar-color: rgba(196,160,72,0.2) transparent;
        }
        @keyframes ag-slide {
          from { opacity: 0; transform: scale(0.97) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ag-modal-img {
          position: relative;
          width: 100%;
          background: #071020;
          overflow: hidden;
        }
        .ag-modal-img img {
          width: 100% !important;
          height: auto !important;
          display: block;
          position: static !important;
        }
        .ag-modal-close {
          position: absolute;
          top: 12px; right: 12px; z-index: 5;
          width: 34px; height: 34px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(196,160,72,0.2);
          border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #c4a048;
          transition: all 0.2s;
        }
        .ag-modal-close:hover { background: rgba(196,160,72,0.15); border-color: #c4a048; }

        .ag-modal-body { padding: 28px 32px 32px; }
        @media (max-width: 560px) { .ag-modal-body { padding: 22px 22px 28px; } }

        .ag-modal-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #c4a048; margin-bottom: 10px;
        }
        .ag-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700; color: #f0e6c8;
          line-height: 1.3; margin-bottom: 16px;
        }
        .ag-modal-divider {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #c4a048, transparent);
          border-radius: 2px; margin-bottom: 18px;
        }
        .ag-modal-desc {
          font-size: 15px; line-height: 1.85; color: #6a8aaa;
        }
        .ag-modal-year {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 20px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #3a5a7a;
        }
      `}</style>

      <section className="ag-root">
        <div className="ag-inner">

          <div className="ag-eyebrow">
            <div className="ag-ey-line" />
            <span className="ag-ey-text">Pride &amp; Excellence</span>
            <div className="ag-ey-line rev" />
          </div>
          <h2 className="ag-heading">Our Achievements</h2>

          <div className="ag-grid">
            {loading
              ? [1, 2, 3, 4].map((i) => <div key={i} className="ag-skel" />)
              : achievements.map((item) => (
                <div key={item.Id} className="ag-card" onClick={() => setSelected(item)}>
                  <div className="ag-strip" />
                  {item.Image ? (
                    <div className="ag-img-wrap">
                      <Image
                        src={`/uploads/${item.Image}`}
                        alt={item.Title || item.Name || "Achievement"}
                        width={800}
                        height={600}
                        style={{ width: "100%", height: "auto" }}
                        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      {item.Year && (
                        <span className="ag-year-badge">{formatYear(item.Year)}</span>
                      )}
                      <div className="ag-zoom-icon">
                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zm-3-3v6m-3-3h6" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="ag-no-img">
                      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  )}
                  <div className="ag-body">
                    <h3 className="ag-title">{item.Title || item.Name}</h3>
                    {item.Description && (
                      <p className="ag-desc">{item.Description}</p>
                    )}
                    <span className="ag-read-hint">
                      View Details
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="ag-overlay" onClick={() => setSelected(null)}>
          <div className="ag-modal" onClick={(e) => e.stopPropagation()}>
            {selected.Image && (
              <div className="ag-modal-img">
                <Image
                  src={`/uploads/${selected.Image}`}
                  alt={selected.Title || selected.Name || "Achievement"}
                  width={1200}
                  height={900}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  sizes="680px"
                />
                <button className="ag-modal-close" onClick={() => setSelected(null)}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <div className="ag-modal-body">
              {!selected.Image && (
                <button className="ag-modal-close" style={{ position: "static", marginBottom: 16, marginLeft: "auto", display: "flex" }} onClick={() => setSelected(null)}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <div className="ag-modal-label">Achievement</div>
              <h3 className="ag-modal-title">{selected.Title || selected.Name}</h3>
              <div className="ag-modal-divider" />
              {selected.Description && (
                <p className="ag-modal-desc">{selected.Description}</p>
              )}
              {selected.Year && (
                <div className="ag-modal-year">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Year: {formatYear(selected.Year)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}