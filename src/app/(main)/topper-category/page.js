"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const sortByIndex = (items) =>
  [...items].sort((a, b) => {
    const aIndex = a?.Index_No;
    const bIndex = b?.Index_No;

    if (aIndex = <style>{`
        .tcd-root {
          min-height: 100vh;
          background: #f6f8fc;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .tcd-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .tcd-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .tcd-hero {
          background: linear-gradient(160deg, #f3f7fc 0%, #f6f8fc 100%);
          border-bottom: 1px solid rgba(196,160,72,0.12);
          padding: 110px 24px 56px;
          position: relative;
          z-index: 1;
        }
        .tcd-hero::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }
        .tcd-hero-inner,
        .tcd-body {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .tcd-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 22px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3a5a7a;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tcd-back:hover {
          color: #c4a048;
        }
        .tcd-back:hover .tcd-back-arr {
          transform: translateX(-3px);
        }
        .tcd-back-arr {
          transition: transform 0.2s;
        }
        .tcd-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .tcd-ey-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c4a048;
        }
        .tcd-ey-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #c4a048;
        }
        .tcd-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 800;
          color: #10213a;
          line-height: 1.1;
          margin-bottom: 10px;
          text-transform: capitalize;
        }
        .tcd-sub {
          max-width: 760px;
          font-size: 15px;
          line-height: 1.7;
          color: #3a5a7a;
        }
        .tcd-meta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-top: 18px;
        }
        .tcd-chip {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 2px;
          background: rgba(16,33,58,0.05);
          border: 1px solid rgba(16,33,58,0.08);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #1d3557;
        }
        .tcd-count {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(196,160,72,0.55);
        }
        .tcd-count-num {
          font-size: 16px;
          color: #c4a048;
        }

        .tcd-body {
          padding: 52px 24px 84px;
        }
        .tcd-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 720px) {
          .tcd-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1040px) {
          .tcd-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .tcd-card {
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          animation: tcd-fadein 0.45s ease both;
        }
        .tcd-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.48);
          border-color: rgba(196,160,72,0.28);
        }
        @keyframes tcd-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tcd-strip {
          height: 3px;
          background: linear-gradient(90deg, #c4a048, #e0c060, #c4a048);
        }
        .tcd-image-wrap {
          position: relative;
          aspect-ratio: 5 / 4;
          background: linear-gradient(135deg, #ffffff 0%, #eef4ff 100%);
          overflow: hidden;
        }
        .tcd-image {
          object-fit: contain;
          object-position: top;
        }
        .tcd-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 64px;
          font-weight: 700;
          color: rgba(196,160,72,0.22);
        }
        .tcd-rank {
          position: absolute;
          right: 14px;
          bottom: 14px;
          min-width: 42px;
          height: 42px;
          padding: 0 10px;
          border-radius: 999px;
          background: #10213a;
          color: #f6f8fc;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          border: 2px solid rgba(246,248,252,0.9);
          box-shadow: 0 10px 24px rgba(16,33,58,0.28);
        }

        .tcd-card-body {
          padding: 20px 20px 22px;
        }
        .tcd-name {
          font-family: 'Playfair Display', serif;
          font-size: 21px;
          font-weight: 800;
          color: #10213a;
          line-height: 1.15;
        }
        .tcd-student-meta {
          margin-top: 7px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          color: #3a5a7a;
          font-size: 12px;
          font-weight: 600;
        }
        .tcd-student-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 10px;
          border-radius: 2px;
          background: rgba(196,160,72,0.08);
          border: 1px solid rgba(196,160,72,0.14);
        }
        .tcd-desc {
          margin-top: 14px;
          font-size: 13px;
          line-height: 1.7;
          color: #3a5a7a;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 66px;
        }
        .tcd-card-foot {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .tcd-score {
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
          padding: 7px 12px;
          border-radius: 2px;
          background: rgba(196,160,72,0.09);
          border: 1px solid rgba(196,160,72,0.15);
        }
        .tcd-score-num {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 800;
          color: #c4a048;
          line-height: 1;
        }
        .tcd-score-pct {
          font-size: 12px;
          font-weight: 700;
          color: #8a9aaa;
        }
        .tcd-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(196,160,72,0.48);
          text-decoration: none;
          transition: gap 0.2s, color 0.2s;
        }
        .tcd-card:hover .tcd-link {
          color: #c4a048;
          gap: 10px;
        }

        .tcd-empty {
          text-align: center;
          padding: 84px 24px;
          color: #3a5a7a;
        }
        .tcd-empty-title {
          margin: 14px 0 8px;
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #1d3557;
        }

        .tcd-skel-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 720px) {
          .tcd-skel-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1040px) {
          .tcd-skel-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .tcd-skel {
          height: 420px;
          border-radius: 4px;
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: tcd-shimmer 1.5s infinite;
        }
        @keyframes tcd-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>== null || aIndex === undefined) return 1;
    if (bIndex === null || bIndex === undefined) return -1;

    return aIndex - bIndex;
  });

export default function TopperCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          setCategories(sortByIndex(data));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
     

      <div className="tc-root">
        <div className="tc-hero">
          <div className="tc-hero-inner">
            <div className="tc-eyebrow">
              <span className="tc-ey-dot" />
              <span className="tc-ey-text">Hall of Fame</span>
            </div>
            <h1 className="tc-title">Topper Categories</h1>
            <p className="tc-sub">
              Explore topper groups by stream, level, class, or academic year and open each category to view the students featured inside it.
            </p>
            {!loading && (
              <div className="tc-meta">
                <span className="tc-meta-num">{categories.length}</span>
                Categor{categories.length === 1 ? "y" : "ies"}
              </div>
            )}
          </div>
        </div>

        <div className="tc-body">
          {loading ? (
            <div className="tc-skel-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="tc-skel" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="tc-empty">
              <svg style={{ margin: "0 auto", display: "block", color: "rgba(196,160,72,0.15)" }} width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0l-2-2m2 2l-2 2M5 7h14M5 12h5" />
              </svg>
              <div className="tc-empty-title">No topper categories found</div>
              <p style={{ fontSize: 14 }}>New categories will appear here once they are added.</p>
            </div>
          ) : (
            <div className="tc-grid">
              {categories.map((category) => (
                <Link key={category.Id} href={`/topper-category/${category.Id}`} className="tc-card">
                  <div className="tc-strip" />
                  <div className="tc-card-top">
                    <div className="tc-order">
                      Display Order
                      <span className="tc-order-num">{category.Index_No ?? 0}</span>
                    </div>
                    <div className="tc-card-title">{category.Name || `Category ${category.Id}`}</div>
                    <p className="tc-card-caption">
                      View the topper list for this category and open student profiles for more details.
                    </p>
                  </div>
                  <div className="tc-card-bottom">
                    <div className="tc-tags">
                      {category.Class && <span className="tc-tag">{category.Class}</span>}
                      {category.Year && <span className="tc-tag">{category.Year}</span>}
                      {!category.Class && !category.Year && (
                        <span className="tc-tag">Active Category</span>
                      )}
                    </div>
                    <span className="tc-link">
                      View Toppers
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
