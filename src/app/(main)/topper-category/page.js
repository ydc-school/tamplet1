"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const sortByIndex = (items) =>
  [...items].sort((a, b) => {
    const aIndex = a?.Index_No;
    const bIndex = b?.Index_No;

    if (aIndex === null || aIndex === undefined) return 1;
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
      <style>{`
        .tc-root {
          min-height: 100vh;
          background: #f6f8fc;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .tc-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .tc-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .tc-hero {
          width: 100%;
          background: linear-gradient(160deg, #f3f7fc 0%, #f6f8fc 100%);
          border-bottom: 1px solid rgba(196,160,72,0.12);
          padding: 110px 24px 56px;
          position: relative;
          z-index: 1;
        }
        .tc-hero::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }
        .tc-hero-inner,
        .tc-body {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .tc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .tc-ey-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c4a048;
        }
        .tc-ey-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #c4a048;
        }
        .tc-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 800;
          color: #10213a;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .tc-sub {
          max-width: 720px;
          font-size: 15px;
          line-height: 1.7;
          color: #3a5a7a;
        }
        .tc-meta {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(196,160,72,0.55);
        }
        .tc-meta-num {
          font-size: 16px;
          color: #c4a048;
        }

        .tc-body {
          padding: 52px 24px 84px;
        }

        .tc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) {
          .tc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 980px) {
          .tc-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .tc-card {
          display: block;
          text-decoration: none;
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          animation: tc-fadein 0.45s ease both;
        }
        .tc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.48);
          border-color: rgba(196,160,72,0.28);
        }
        @keyframes tc-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tc-strip {
          height: 3px;
          background: linear-gradient(90deg, #c4a048, #e0c060, #c4a048);
        }
        .tc-card-top {
          position: relative;
          min-height: 180px;
          padding: 24px 22px 18px;
          background:
            radial-gradient(circle at top right, rgba(196,160,72,0.13), transparent 38%),
            linear-gradient(135deg, #ffffff 0%, #eef4ff 100%);
        }
        .tc-order {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border: 1px solid rgba(196,160,72,0.18);
          background: rgba(196,160,72,0.08);
          color: #c4a048;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .tc-order-num {
          font-size: 13px;
          color: #10213a;
        }
        .tc-card-title {
          margin-top: 18px;
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 800;
          color: #10213a;
          line-height: 1.1;
          text-transform: capitalize;
        }
        .tc-card-caption {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.7;
          color: #3a5a7a;
        }
        .tc-card-bottom {
          padding: 18px 22px 22px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          border-top: 1px solid rgba(196,160,72,0.08);
        }
        .tc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tc-tag {
          display: inline-flex;
          align-items: center;
          padding: 7px 10px;
          border-radius: 2px;
          background: rgba(16,33,58,0.05);
          border: 1px solid rgba(16,33,58,0.08);
          font-size: 11px;
          font-weight: 600;
          color: #1d3557;
        }
        .tc-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(196,160,72,0.48);
          transition: gap 0.2s, color 0.2s;
        }
        .tc-card:hover .tc-link {
          color: #c4a048;
          gap: 10px;
        }

        .tc-empty {
          text-align: center;
          padding: 84px 24px;
          color: #3a5a7a;
        }
        .tc-empty-title {
          margin: 14px 0 8px;
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #1d3557;
        }

        .tc-skel-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) {
          .tc-skel-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 980px) {
          .tc-skel-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .tc-skel {
          height: 290px;
          border-radius: 4px;
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: tc-shimmer 1.5s infinite;
        }
        @keyframes tc-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

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
