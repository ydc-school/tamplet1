"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";



export default function HistorySection() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    axios
      .get("/api/client/pages/history")
      .then((res) => {
        
        if (res.data.status === "success") setHistory(res.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && history?.length === 0) return null;






  return (
    <>
      <style>{`

        .hs-root {
          width: 100%;
          background: #f8fbff;
          padding: 80px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .hs-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 0% 50%, rgba(196,160,72,0.05) 0%, transparent 65%);
          pointer-events: none;
        }
        .hs-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .hs-inner {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        @media (min-width: 768px) {
          .hs-inner {
            flex-direction: row;
            align-items: flex-start;
            gap: 64px;
          }
        }

        /* Left column */
        .hs-left {
          flex-shrink: 0;
          width: 100%;
        }
        @media (min-width: 768px) { .hs-left { width: 300px; } }
        @media (min-width: 1024px) { .hs-left { width: 340px; } }

        .hs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }
        .hs-ey-dot {
          width: 6px; height: 6px;
          border-radius: 50%; background: #c4a048; flex-shrink: 0;
        }
        .hs-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase; color: #c4a048;
        }

        .hs-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: #10213a;
          line-height: 1.2;
          margin-bottom: 24px;
        }
        .hs-heading em {
          font-style: italic;
          color: #c4a048;
        }

        /* Decorative vertical line + year marker */
        .hs-year-block {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 8px;
        }
        .hs-year-line {
          width: 2px;
          height: 64px;
          background: linear-gradient(to bottom, #c4a048, transparent);
          border-radius: 2px;
        }
        .hs-year-label {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 700;
          color: rgba(196,160,72,0.35);
          letter-spacing: 0.06em;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        /* Right column */
        .hs-right { flex: 1; }

        .hs-card {
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.14);
          border-left: 3px solid #c4a048;
          border-radius: 0 4px 4px 0;
          padding: 36px 40px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 600px) {
          .hs-card { padding: 26px 24px; }
        }

        /* Corner accent */
        .hs-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 80px; height: 80px;
          background: radial-gradient(circle at top right, rgba(196,160,72,0.08), transparent 70%);
          pointer-events: none;
        }

        .hs-para {
          font-size: 15px;
          line-height: 1.9;
          color: #5f7288;
          margin-bottom: 20px;
          text-align: justify;
        }
        .hs-para:last-of-type { margin-bottom: 0; }
        .hs-para strong { color: #1d3557; font-weight: 600; }

        .hs-divider {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, #c4a048, transparent);
          margin: 22px 0;
        }

        .hs-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c4a048;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          border-bottom: 1px solid rgba(196,160,72,0.25);
          padding-bottom: 3px;
          transition: all 0.2s;
        }
        .hs-cta:hover {
          color: #e0c060;
          border-color: #c4a048;
          gap: 12px;
        }
      `}</style>

      <section className="hs-root">
        <div className="hs-inner">

          {/* Left */}
          <div className="hs-left">
            <div className="hs-eyebrow">
              <span className="hs-ey-dot" />
              <span className="hs-ey-text">Our Legacy</span>
            </div>
            <h2 className="hs-heading">
              History of <em>Yaduvanshi</em>
            </h2>
            <div className="hs-year-block">
              <div className="hs-year-line" />
              <span className="hs-year-label">Est. 1998</span>
            </div>
          </div>

          {/* Right */}
          <div className="hs-right">
            <div className="hs-card">
              <div
                className="nt-modal-body"
                dangerouslySetInnerHTML={{ __html: history.Page_Data }}
              />


            <Link href={`/pages/${history?.Id}`}  className="hs-cta">
                Read More
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}