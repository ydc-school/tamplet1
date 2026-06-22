"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NoticeSection() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/notification")
      .then((res) => {
        if (res.data.status === "success") setNotices(res.data.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  if (!loading && notices.length === 0) return null;


  return (
    <>
      <style>{`

        .nt-root {
          width: 100%;
          background: #f6f8fc;
          padding: 80px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .nt-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 70%);
          pointer-events: none;
        }
        .nt-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .nt-inner {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Eyebrow */
        .nt-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 10px;
        }
        .nt-ey-line {
          width: 48px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,160,72,0.5));
        }
        .nt-ey-line.rev { background: linear-gradient(to left, transparent, rgba(196,160,72,0.5)); }
        .nt-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase; color: #c4a048;
        }

        .nt-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 34px);
          font-weight: 700; color: #10213a;
          text-align: center; margin-bottom: 40px;
        }

        /* Panel */
        .nt-panel {
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.15);
          border-top: 3px solid #c4a048;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 20px 56px rgba(0,0,0,0.45);
        }

        /* Panel header */
        .nt-panel-header {
          display: flex; align-items: center; gap: 10px;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(196,160,72,0.12);
          background: rgba(196,160,72,0.04);
        }
        .nt-panel-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #c4a048; flex-shrink: 0;
        }
        .nt-panel-title {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #c4a048;
        }
        .nt-panel-count {
          margin-left: auto;
          font-size: 11px; font-weight: 600;
          color: #3a5a7a; letter-spacing: 0.06em;
        }

        /* Scrollable list */
        .nt-list-wrap {
          height: 480px;
          overflow-y: auto;
          padding: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(196,160,72,0.2) transparent;
        }
        .nt-list-wrap::-webkit-scrollbar { width: 4px; }
        .nt-list-wrap::-webkit-scrollbar-track { background: transparent; }
        .nt-list-wrap::-webkit-scrollbar-thumb {
          background: rgba(196,160,72,0.2); border-radius: 2px;
        }

        .nt-list { display: flex; flex-direction: column; gap: 8px; }

        /* Notice row */
        .nt-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: rgba(15,32,68,0.5);
          border: 1px solid rgba(196,160,72,0.08);
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .nt-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #c4a048;
          transform: scaleY(0);
          transition: transform 0.2s ease;
          transform-origin: bottom;
        }
        .nt-row:hover {
          background: rgba(15,32,68,0.9);
          border-color: rgba(196,160,72,0.22);
          transform: translateX(3px);
        }
        .nt-row:hover::before { transform: scaleY(1); }

        /* Animated "NEW" dot */
        .nt-new-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #ef4444; flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(239,68,68,0.5);
          animation: nt-ping 1.5s infinite;
        }
        @keyframes nt-ping {
          0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          70%  { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }

        .nt-row-body { flex: 1; min-width: 0; }
        .nt-row-title {
          font-size: 14px; font-weight: 600;
          color: #1d3557; line-height: 1.4;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: color 0.2s;
        }
        .nt-row:hover .nt-row-title { color: #10213a; }
        .nt-row-date {
          font-size: 11.5px; color: #3a5a7a;
          margin-top: 3px; display: flex; align-items: center; gap: 5px;
        }

        .nt-view-btn {
          display: inline-flex; align-items: center; gap: 6px;
          flex-shrink: 0;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(196,160,72,0.55);
          background: none; border: none; cursor: pointer;
          padding: 0;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nt-row:hover .nt-view-btn { color: #c4a048; gap: 9px; }

        /* Empty state */
        .nt-empty {
          text-align: center; padding: 60px 24px;
          color: #3a5a7a; font-size: 14px;
        }

        /* Skeleton */
        .nt-skel-row {
          height: 64px; border-radius: 3px;
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: nt-shimmer 1.5s infinite;
        }
        @keyframes nt-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Modal ── */
        .nt-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: nt-fadein 0.2s ease;
        }
        @keyframes nt-fadein { from { opacity: 0; } to { opacity: 1; } }

        .nt-modal {
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.2);
          border-top: 3px solid #c4a048;
          border-radius: 4px;
          width: 100%; max-width: 640px;
          max-height: 90vh;
          display: flex; flex-direction: column;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          animation: nt-slidein 0.25s ease;
        }
        @keyframes nt-slidein {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .nt-modal-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px; padding: 24px 28px 20px;
          border-bottom: 1px solid rgba(196,160,72,0.12);
        }
        .nt-modal-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #c4a048; margin-bottom: 8px;
        }
        .nt-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(17px, 3vw, 22px);
          font-weight: 700; color: #10213a; line-height: 1.3;
        }
        .nt-modal-date {
          font-size: 12px; color: #3a5a7a;
          margin-top: 6px; display: flex; align-items: center; gap: 5px;
        }
        .nt-close-btn {
          width: 34px; height: 34px; border-radius: 3px;
          border: 1px solid rgba(196,160,72,0.15);
          background: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #3a5a7a; flex-shrink: 0;
          transition: all 0.2s;
        }
        .nt-close-btn:hover { border-color: #c4a048; color: #c4a048; background: rgba(196,160,72,0.06); }

        .nt-modal-body {
          flex: 1; overflow-y: auto;
          padding: 24px 28px;
          scrollbar-width: thin;
          scrollbar-color: rgba(196,160,72,0.2) transparent;
          font-size: 14.5px; line-height: 1.85; color: #5f7288;
        }
        .nt-modal-body::-webkit-scrollbar { width: 4px; }
        .nt-modal-body::-webkit-scrollbar-thumb { background: rgba(196,160,72,0.2); border-radius: 2px; }
        .nt-modal-body h1, .nt-modal-body h2, .nt-modal-body h3 {
          font-family: 'Playfair Display', serif; color: #1d3557; margin-bottom: 10px;
        }
        .nt-modal-body p { margin-bottom: 10px; }
        .nt-modal-body strong { color: #d4c090; }

        .nt-modal-footer {
          padding: 16px 28px 24px;
          display: flex; justify-content: flex-end;
          border-top: 1px solid rgba(196,160,72,0.08);
        }
        .nt-close-full {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; border: 1px solid rgba(196,160,72,0.3);
          color: #c4a048; font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 10px 24px; border-radius: 2px; cursor: pointer;
          transition: all 0.2s;
        }
        .nt-close-full:hover { background: rgba(196,160,72,0.08); border-color: #c4a048; }
      `}</style>

      <section className="nt-root">
        <div className="nt-inner">

          <div className="nt-eyebrow">
            <div className="nt-ey-line" />
            <span className="nt-ey-text">Latest Updates</span>
            <div className="nt-ey-line rev" />
          </div>
          <h2 className="nt-heading">News &amp; Notices</h2>

          <div className="nt-panel">
            <div className="nt-panel-header">
              <span className="nt-panel-dot" />
              <span className="nt-panel-title">Notice Board</span>
              {!loading && (
                <span className="nt-panel-count">{notices.length} notice{notices.length !== 1 ? "s" : ""}</span>
              )}
            </div>

            <div className="nt-list-wrap">
              {loading ? (
                <div className="nt-list">
                  {[1,2,3,4,5].map((i) => <div key={i} className="nt-skel-row" />)}
                </div>
              ) : notices.length === 0 ? (
                <div className="nt-empty">No notices available at the moment.</div>
              ) : (
                <ul className="nt-list">
                  {notices.map((notice) => (
                    <li key={notice.Id}>
                      <div className="nt-row" onClick={() => setSelectedNotice(notice)}>
                        {notice.Is_Important && <span className="nt-new-dot" />}
                        <div className="nt-row-body">
                          <div className="nt-row-title">{notice.Title}</div>
                          {notice.Date && (
                            <div className="nt-row-date">
                              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(notice.Date)}
                            </div>
                          )}
                        </div>
                        <button className="nt-view-btn" tabIndex={-1}>
                          View
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedNotice && (
        <div className="nt-overlay" onClick={() => setSelectedNotice(null)}>
          <div className="nt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nt-modal-header">
              <div>
                <div className="nt-modal-label">Notice Details</div>
                <h3 className="nt-modal-title">{selectedNotice.Title}</h3>
                {selectedNotice.Date && (
                  <div className="nt-modal-date">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(selectedNotice.Date)}
                  </div>
                )}
              </div>
              <button className="nt-close-btn" onClick={() => setSelectedNotice(null)} aria-label="Close">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="nt-modal-body"
              dangerouslySetInnerHTML={{ __html: selectedNotice.Description }}
            />

            <div className="nt-modal-footer">
              <button className="nt-close-full" onClick={() => setSelectedNotice(null)}>
                Close Notice
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