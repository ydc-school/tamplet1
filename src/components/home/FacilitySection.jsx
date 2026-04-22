"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const IMG_BASE = process.env.NEXT_PUBLIC_BACKEND_URL + "/uploads/";

export default function FacilitySection() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/facility", { params: { limit: 12, isActive: "active" } })
      .then((res) => {
        if (res.data.status === "success") setFacilities(res.data.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && facilities.length === 0) return null;

  return (
    <>
      <style>{`
        .fc-root {
          width: 100%;
          background: #071020;
          padding: 80px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .fc-root::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 70%);
          pointer-events: none;
        }
        .fc-root::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .fc-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Eyebrow */
        .fc-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 10px;
        }
        .fc-ey-line {
          width: 48px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,160,72,0.5));
        }
        .fc-ey-line.rev {
          background: linear-gradient(to left, transparent, rgba(196,160,72,0.5));
        }
        .fc-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase; color: #c4a048;
        }
        .fc-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 34px);
          font-weight: 700; color: #f0e6c8;
          text-align: center; margin-bottom: 8px;
        }
        .fc-subheading {
          font-size: 15px; color: #3a5a7a;
          text-align: center; margin-bottom: 48px;
          max-width: 560px; margin-left: auto; margin-right: auto;
          line-height: 1.7;
        }

        /* Grid */
        .fc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        /* Card */
        .fc-card {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .fc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c4a048, transparent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .fc-card:hover {
          border-color: rgba(196,160,72,0.32);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.45);
        }
        .fc-card:hover::before { transform: scaleX(1); }

        /* Card image */
        .fc-img-wrap {
          width: 100%;
          height: 180px;
          overflow: hidden;
          background: linear-gradient(135deg, #0c1e3a 0%, #071020 100%);
          position: relative;
          flex-shrink: 0;
        }
        .fc-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.8) saturate(0.65);
          transition: filter 0.3s, transform 0.35s;
        }
        .fc-card:hover .fc-img {
          filter: brightness(0.95) saturate(0.9);
          transform: scale(1.04);
        }
        .fc-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .fc-img-ph-icon { opacity: 0.12; }

        /* Index badge */
        .fc-index-badge {
          position: absolute;
          top: 10px; right: 10px;
          background: rgba(7,16,32,0.75);
          border: 1px solid rgba(196,160,72,0.25);
          border-radius: 2px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em;
          color: #c4a048;
          padding: 3px 8px;
          backdrop-filter: blur(4px);
        }

        /* Card body */
        .fc-card-body {
          padding: 22px 22px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
        }
        .fc-card-body::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 80px; height: 80px;
          background: radial-gradient(circle at top right, rgba(196,160,72,0.05), transparent 70%);
          pointer-events: none;
        }

        .fc-card-name {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #c4a048;
        }
        .fc-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 17px; font-weight: 700;
          color: #f0e6c8; line-height: 1.35;
          transition: color 0.2s;
        }
        .fc-card:hover .fc-card-title { color: #e0c870; }

        .fc-card-desc {
          font-size: 13px; line-height: 1.7;
          color: #3a5a7a; flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .fc-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(196,160,72,0.08);
          margin-top: 4px;
        }
        .fc-view-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(196,160,72,0.55);
          background: none; border: none;
          cursor: pointer; padding: 0;
          font-family: inherit;
          transition: all 0.2s;
        }
        .fc-card:hover .fc-view-btn { color: #c4a048; gap: 9px; }

        /* Skeleton */
        .fc-skel {
          height: 280px; border-radius: 4px;
          background: linear-gradient(90deg, #0f2044 25%, #152a52 50%, #0f2044 75%);
          background-size: 200% 100%;
          animation: fc-shimmer 1.5s infinite;
        }
        @keyframes fc-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Modal ── */
        .fc-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fc-fadein 0.2s ease;
        }
        @keyframes fc-fadein { from { opacity: 0; } to { opacity: 1; } }

        .fc-modal {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.2);
          border-top: 3px solid #c4a048;
          border-radius: 4px;
          width: 100%; max-width: 680px;
          max-height: 90vh;
          display: flex; flex-direction: column;
          box-shadow: 0 32px 80px rgba(0,0,0,0.65);
          animation: fc-slidein 0.25s ease;
          overflow: hidden;
        }
        @keyframes fc-slidein {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Modal image */
        .fc-modal-img {
          width: 100%; height: auto;
          object-fit: contain;
         
          flex-shrink: 0;
        }
        .fc-modal-img-placeholder {
          width: 100%; height: 160px;
          background: linear-gradient(135deg, #0c1e3a 0%, #071020 100%);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(196,160,72,0.1);
        }

        .fc-modal-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px; padding: 22px 28px 18px;
          border-bottom: 1px solid rgba(196,160,72,0.12);
        }
        .fc-modal-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #c4a048; margin-bottom: 6px;
        }
        .fc-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(17px, 3vw, 22px);
          font-weight: 700; color: #f0e6c8; line-height: 1.3;
        }
        .fc-close-btn {
          width: 34px; height: 34px; border-radius: 3px;
          border: 1px solid rgba(196,160,72,0.15);
          background: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #3a5a7a; flex-shrink: 0;
          transition: all 0.2s;
        }
        .fc-close-btn:hover {
          border-color: #c4a048; color: #c4a048;
          background: rgba(196,160,72,0.06);
        }

        .fc-modal-body {
          flex: 1; overflow-y: auto;
          padding: 22px 28px;
          scrollbar-width: thin;
          scrollbar-color: rgba(196,160,72,0.2) transparent;
          font-size: 14.5px; line-height: 1.85; color: #7a90a8;
        }
        .fc-modal-body::-webkit-scrollbar { width: 4px; }
        .fc-modal-body::-webkit-scrollbar-thumb {
          background: rgba(196,160,72,0.2); border-radius: 2px;
        }
        .fc-modal-body p { margin-bottom: 10px; }
        .fc-modal-body strong { color: #d4c090; }

        .fc-modal-footer {
          padding: 16px 28px 22px;
          display: flex; justify-content: flex-end;
          border-top: 1px solid rgba(196,160,72,0.08);
        }
        .fc-close-full {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          border: 1px solid rgba(196,160,72,0.3);
          color: #c4a048; font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 10px 24px; border-radius: 2px; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .fc-close-full:hover {
          background: rgba(196,160,72,0.08); border-color: #c4a048;
        }
      `}</style>

      <section className="fc-root">
        <div className="fc-inner">

          {/* Eyebrow + heading */}
          <div className="fc-eyebrow">
            <div className="fc-ey-line" />
            <span className="fc-ey-text">Campus Infrastructure</span>
            <div className="fc-ey-line rev" />
          </div>
          <h2 className="fc-heading">Our Facilities</h2>
          <p className="fc-subheading">
            World-class infrastructure designed to support learning, growth, and overall student well-being.
          </p>

          {/* Grid */}
          <div className="fc-grid">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="fc-skel" />
              ))
              : facilities.map((f, idx) => (
                <FacilityCard
                  key={f.Id}
                  facility={f}
                  idx={idx}
                  onClick={() => setSelected(f)}
                />
              ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="fc-overlay" onClick={() => setSelected(null)}>
          <div className="fc-modal" onClick={(e) => e.stopPropagation()}>

            {/* Modal image */}
            {selected.Image ? (
              <img
                className="fc-modal-img"
                src={`/uploads/${selected.Image}`}
                alt={selected.Title}
              />
            ) : (
              <div className="fc-modal-img-placeholder">
                <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="rgba(196,160,72,0.15)" strokeWidth={0.8}>
                  <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Modal header */}
            <div className="fc-modal-header">
              <div>
                <div className="fc-modal-label">
                  {selected.Name || "Facility Details"}
                </div>
                <h3 className="fc-modal-title">{selected.Title}</h3>
              </div>
              <button
                className="fc-close-btn"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="fc-modal-body">
              <p>{selected.Description}</p>
            </div>

            {/* Modal footer */}
            <div className="fc-modal-footer">
              <button className="fc-close-full" onClick={() => setSelected(null)}>
                Close
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

/* ── Card sub-component ── */
function FacilityCard({ facility, idx, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = facility.Image && !imgErr;

  return (
    <div className="fc-card" onClick={onClick}>

      {/* Image / placeholder */}
      <div className="fc-img-wrap">
        {hasImg ? (
          <img
            className="fc-img"
            src={`/uploads/${facility.Image}`}
            alt={facility.Title}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="fc-img-placeholder">
            <svg className="fc-img-ph-icon" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth={0.9}>
              <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {facility.Index_No > 0 && (
          <span className="fc-index-badge">#{String(idx + 1).padStart(2, "0")}</span>
        )}
      </div>

      {/* Body */}
      <div className="fc-card-body">
        {facility.Name && (
          <span className="fc-card-name">{facility.Name}</span>
        )}
        <h3 className="fc-card-title">{facility.Title}</h3>
        <p className="fc-card-desc">{facility.Description}</p>

        <div className="fc-card-footer">
          <button className="fc-view-btn" tabIndex={-1}>
            View Details
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}