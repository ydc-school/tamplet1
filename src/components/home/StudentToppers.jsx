"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function StudentToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res.data.status === "success") setToppers(res.data.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && toppers.length === 0) return null;

  // Sort by rank if available
  const sorted = [...toppers].sort((a, b) => (parseInt(a.Rank) || 99) - (parseInt(b.Rank) || 99));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  const medalColors = {
    1: { bg: "#c4a048", text: "#071020", label: "Gold" },
    2: { bg: "#94a3b8", text: "#071020", label: "Silver" },
    3: { bg: "#b87333", text: "#fff", label: "Bronze" },
  };

  return (
    <>
      <style>{`

        .tp-root {
          width: 100%;
          background: #071020;
          padding: 80px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .tp-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 30%, rgba(196,160,72,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .tp-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .tp-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Eyebrow */
        .tp-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-bottom: 10px;
        }
        .tp-ey-line {
          width: 48px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,160,72,0.5));
        }
        .tp-ey-line.rev { background: linear-gradient(to left, transparent, rgba(196,160,72,0.5)); }
        .tp-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase; color: #c4a048;
        }

        .tp-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 700; color: #f0e6c8;
          text-align: center; margin-bottom: 56px;
        }

        /* ── Podium ── */
        .tp-podium {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 16px;
          margin-bottom: 48px;
        }
        @media (max-width: 600px) {
          .tp-podium { flex-direction: column; align-items: center; gap: 20px; }
        }

        .tp-podium-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 240px;
          animation: tp-fadein 0.6s ease both;
        }
        .tp-podium-item:nth-child(1) { animation-delay: 0.1s; }
        .tp-podium-item:nth-child(2) { animation-delay: 0s; }
        .tp-podium-item:nth-child(3) { animation-delay: 0.2s; }
        @keyframes tp-fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Photo ring */
        .tp-photo-wrap {
          position: relative;
          margin-bottom: 14px;
        }
        .tp-photo-ring {
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid transparent;
          background-clip: padding-box;
          position: relative;
          flex-shrink: 0;
        }
        .tp-photo-ring.rank-1 {
          width: 110px; height: 110px;
          box-shadow: 0 0 0 3px #c4a048, 0 8px 28px rgba(196,160,72,0.3);
        }
        .tp-photo-ring.rank-2 {
          width: 90px; height: 90px;
          box-shadow: 0 0 0 2px #94a3b8, 0 6px 18px rgba(0,0,0,0.4);
        }
        .tp-photo-ring.rank-3 {
          width: 90px; height: 90px;
          box-shadow: 0 0 0 2px #b87333, 0 6px 18px rgba(0,0,0,0.4);
        }

        /* Rank badge */
        .tp-rank-badge {
          position: absolute;
          bottom: 0; right: 0;
          width: 26px; height: 26px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800;
          border: 2px solid #071020;
          z-index: 2;
        }

        /* Placeholder avatar */
        .tp-avatar-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #0f2044, #152a55);
          display: flex; align-items: center; justify-content: center;
          color: rgba(196,160,72,0.3);
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 700;
        }
        .tp-photo-ring.rank-1 .tp-avatar-placeholder { font-size: 34px; }

        .tp-card {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          padding: 18px 20px 20px;
          text-align: center;
          width: 100%;
          transition: transform 0.25s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .tp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .tp-card.rank-1::before { background: linear-gradient(90deg, transparent, #c4a048, transparent); }
        .tp-card.rank-2::before { background: linear-gradient(90deg, transparent, #94a3b8, transparent); }
        .tp-card.rank-3::before { background: linear-gradient(90deg, transparent, #b87333, transparent); }
        .tp-card.rank-1 {
          border-color: rgba(196,160,72,0.22);
          box-shadow: 0 12px 36px rgba(0,0,0,0.4);
        }
        .tp-podium-item:hover .tp-card {
          transform: translateY(-4px);
          box-shadow: 0 18px 48px rgba(0,0,0,0.45);
        }

        .tp-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 700;
          color: #f0e6c8; margin-bottom: 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tp-card.rank-1 .tp-name { font-size: 18px; }

        .tp-class {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #3a5a7a; margin-bottom: 10px;
        }

        .tp-score {
          display: inline-flex; align-items: baseline; gap: 2px;
          background: rgba(196,160,72,0.08);
          border: 1px solid rgba(196,160,72,0.15);
          border-radius: 2px;
          padding: 4px 12px;
          margin-bottom: 8px;
        }
        .tp-score-num {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 800;
          color: #c4a048; line-height: 1;
        }
        .tp-card.rank-1 .tp-score-num { font-size: 26px; }
        .tp-score-pct {
          font-size: 12px; font-weight: 700; color: #8a9aaa;
        }

        .tp-year {
          font-size: 11px; color: #3a5a7a;
          letter-spacing: 0.06em;
        }

        /* ── Extra toppers grid ── */
        .tp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          border-top: 1px solid rgba(196,160,72,0.1);
          padding-top: 32px;
          margin-top: 8px;
        }
        @media (min-width: 640px) { .tp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 900px) { .tp-grid { grid-template-columns: repeat(4, 1fr); } }

        .tp-mini-card {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.1);
          border-radius: 4px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .tp-mini-card:hover {
          border-color: rgba(196,160,72,0.25);
          transform: translateX(3px);
        }

        .tp-mini-img {
          width: 44px; height: 44px;
          border-radius: 50%; overflow: hidden; flex-shrink: 0;
          border: 2px solid rgba(196,160,72,0.2);
          background: #071020;
          position: relative;
        }
        .tp-mini-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #0f2044, #152a55);
          color: rgba(196,160,72,0.3);
          font-size: 16px; font-weight: 700;
          font-family: 'Playfair Display', serif;
        }

        .tp-mini-body { flex: 1; min-width: 0; }
        .tp-mini-name {
          font-size: 13px; font-weight: 600;
          color: #c5d8e8;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tp-mini-meta {
          font-size: 11px; color: #3a5a7a;
          display: flex; align-items: center; gap: 5px; margin-top: 2px;
        }
        .tp-mini-score {
          font-size: 13px; font-weight: 700;
          color: #c4a048; flex-shrink: 0;
        }

        /* Skeleton */
        .tp-skel {
          height: 280px; border-radius: 4px;
          background: linear-gradient(90deg, #0f2044 25%, #152a52 50%, #0f2044 75%);
          background-size: 200% 100%;
          animation: tp-shimmer 1.5s infinite;
        }
        @keyframes tp-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section className="tp-root">
        <div className="tp-inner">

          <div className="tp-eyebrow">
            <div className="tp-ey-line" />
            <span className="tp-ey-text">Hall of Fame</span>
            <div className="tp-ey-line rev" />
          </div>
          <h2 className="tp-heading">Our Student Toppers</h2>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[1, 2, 3].map(i => <div key={i} className="tp-skel" />)}
            </div>
          ) : (
            <>
              {/* Podium — top 3 */}
              {top3.length > 0 && (
                <div className="tp-podium">
                  {podiumOrder.map((topper) => {
                    if (!topper) return null;
                    const rank = parseInt(topper.Rank) || 1;
                    const medal = medalColors[rank] || medalColors[3];
                    const initials = topper.Student_Name?.charAt(0)?.toUpperCase() || "S";
                    return (
                      <div key={topper.Id} className="tp-podium-item">
                        <div className="tp-photo-wrap">
                          <div className={`tp-photo-ring rank-${rank}`}>
                            {topper.Image ? (
                              <Link href={"./student/" + topper?.Id}>
                                <Image
                                  src={`/uploads/${topper.Image}`}
                                  alt={topper.Student_Name || "Topper"}
                                  fill
                                  sizes="110px"
                                  className="object-contain object-top"
                                />
                              </Link>
                            ) : (
                              <div className="tp-avatar-placeholder">{initials}</div>
                            )}
                          </div>
                          <div
                            className="tp-rank-badge"
                            style={{ background: medal.bg, color: medal.text }}
                          >
                            {rank}
                          </div>
                        </div>

                        <div className={`tp-card rank-${rank}`}>
                          <div className="tp-name">{topper.Student_Name}</div>
                          {topper.Student_Class && (
                            <div className="tp-class">{topper.Student_Class}</div>
                          )}
                          {topper.Marks_Percentage && (
                            <div className="tp-score">
                              <span className="tp-score-num">{topper.Marks_Percentage}</span>
                              <span className="tp-score-pct">%</span>
                            </div>
                          )}
                          {topper.Year && <div className="tp-year">Batch {topper.Year}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Rest — mini cards */}
              {rest.length > 0 && (
                <div className="tp-grid">
                  {rest.map((topper) => {
                    const rank = parseInt(topper.Rank) || "-";
                    const initials = topper.Student_Name?.charAt(0)?.toUpperCase() || "S";
                    return (
                      <div key={topper.Id} className="tp-mini-card">
                        <div className="tp-mini-img">
                          {topper.Image ? (
                            <Link href={"./student/" + topper?.Id}>
                              <Image
                                src={`/uploads/${topper.Image}`}
                                alt={topper.Student_Name || "Topper"}
                                fill
                                sizes="44px"
                                className="object-cover object-top"
                              />
                            </Link>
                          ) : (
                            <div className="tp-mini-placeholder">{initials}</div>
                          )}
                        </div>
                        <div className="tp-mini-body">
                          <div className="tp-mini-name">{topper.Student_Name}</div>
                          <div className="tp-mini-meta">
                            <span>#{rank}</span>
                            {topper.Year && <><span>·</span><span>{topper.Year}</span></>}
                          </div>
                        </div>
                        {/* {topper.Marks_Percentage && (
                          <div className="tp-mini-score">{topper.Marks_Percentage}%</div>
                        )} */}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </>
  );
}