"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function StudentProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res.data.status === "success") {
          const found = res.data.data.data.find((s) => s.Id.toString() === id);
          setStudent(found || null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const medalColor = (rank) => {
    const r = parseInt(rank);
    if (r === 1) return { bg: "#c4a048", text: "#071020", label: "Gold" };
    if (r === 2) return { bg: "#94a3b8", text: "#071020", label: "Silver" };
    if (r === 3) return { bg: "#b87333", text: "#fff",    label: "Bronze" };
    return       { bg: "#1e3a5a",  text: "#c4a048", label: `#${rank}` };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Source+Sans+3:wght@400;500;600&display=swap');

        .sp-root {
          min-height: 100vh;
          background: #071020;
          padding: 120px 24px 80px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .sp-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(196,160,72,0.06) 0%, transparent 65%);
          pointer-events: none;
        }
        .sp-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .sp-inner {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Back button */
        .sp-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #3a5a7a;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s;
        }
        .sp-back:hover { color: #c4a048; }
        .sp-back:hover .sp-back-arrow { transform: translateX(-3px); }
        .sp-back-arrow { transition: transform 0.2s; }

        /* Card */
        .sp-card {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.15);
          border-top: 3px solid #c4a048;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 768px) { .sp-card { flex-direction: row; } }

        /* ── Left panel ── */
        .sp-left {
          flex-shrink: 0;
          width: 100%;
          background: linear-gradient(160deg, #0c1e3a 0%, #071020 100%);
          border-right: 1px solid rgba(196,160,72,0.1);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (min-width: 768px) { .sp-left { width: 300px; } }
        @media (min-width: 1024px) { .sp-left { width: 340px; } }

        /* Photo */
        .sp-photo-wrap {
          position: relative;
          width: 200px;
          height: 200px;
          margin-bottom: 24px;
        }
        .sp-photo-ring {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(196,160,72,0.3);
          box-shadow: 0 0 0 6px rgba(196,160,72,0.08), 0 12px 36px rgba(0,0,0,0.5);
          position: relative;
          background: #071020;
        }
        .sp-photo-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #0f2044, #152a55);
          font-family: 'Playfair Display', serif;
          font-size: 64px; font-weight: 700; color: rgba(196,160,72,0.25);
        }

        /* Rank badge */
        .sp-rank-badge {
          position: absolute;
          bottom: 4px; right: 4px;
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          border: 2px solid #071020;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          line-height: 1;
        }
        .sp-rank-num {
          font-size: 14px; font-weight: 800;
          font-family: 'Playfair Display', serif;
        }
        .sp-rank-label { font-size: 7px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }

        /* Stat pills */
        .sp-stats { width: 100%; display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
        .sp-stat {
          display: flex; align-items: center; gap: 14px;
          background: rgba(196,160,72,0.05);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 3px;
          padding: 14px 16px;
        }
        .sp-stat-icon {
          width: 36px; height: 36px;
          border-radius: 3px;
          background: rgba(196,160,72,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #c4a048; flex-shrink: 0;
        }
        .sp-stat-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #3a5a7a;
          margin-bottom: 2px;
        }
        .sp-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: #f0e6c8; line-height: 1;
        }
        .sp-stat-pct { font-size: 13px; color: #8a9aaa; }

        /* ── Right panel ── */
        .sp-right {
          flex: 1;
          padding: 40px 40px 44px;
          display: flex; flex-direction: column;
        }
        @media (max-width: 600px) { .sp-right { padding: 28px 24px 32px; } }

        .sp-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #c4a048; margin-bottom: 12px;
        }
        .sp-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #c4a048; }

        .sp-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800; color: #f0e6c8;
          line-height: 1.1; margin-bottom: 8px;
        }
        .sp-sub {
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #3a5a7a; margin-bottom: 28px;
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        }
        .sp-sub-sep { width: 3px; height: 3px; border-radius: 50%; background: #1e3a5a; }

        .sp-divider {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #c4a048, transparent);
          border-radius: 2px; margin-bottom: 28px;
        }

        /* Info grid */
        .sp-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        @media (min-width: 480px) { .sp-info-grid { grid-template-columns: repeat(2, 1fr); } }

        .sp-info-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 16px;
          background: rgba(196,160,72,0.04);
          border: 1px solid rgba(196,160,72,0.1);
          border-radius: 3px;
        }
        .sp-info-icon {
          width: 34px; height: 34px; border-radius: 3px;
          background: rgba(196,160,72,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #c4a048; flex-shrink: 0;
        }
        .sp-info-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #3a5a7a; margin-bottom: 3px;
        }
        .sp-info-val {
          font-size: 14px; font-weight: 600;
          color: #c5d8e8; text-transform: capitalize;
        }

        /* About */
        .sp-about-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 700;
          color: #f0e6c8; margin-bottom: 14px;
          display: flex; align-items: center; gap: 10px;
        }
        .sp-about-bar {
          width: 24px; height: 2px;
          background: #c4a048; border-radius: 2px;
        }
        .sp-about-text {
          font-size: 14.5px; line-height: 1.85; color: #6a8aaa; margin-bottom: 20px;
        }

        /* Quote block */
        .sp-quote {
          border-left: 3px solid #c4a048;
          padding: 16px 20px;
          background: rgba(196,160,72,0.05);
          border-radius: 0 3px 3px 0;
        }
        .sp-quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 40px; color: rgba(196,160,72,0.2);
          line-height: 0.8; margin-bottom: 8px;
        }
        .sp-quote-text {
          font-family: 'Playfair Display', serif;
          font-style: italic; font-size: 14px;
          line-height: 1.7; color: rgba(196,160,72,0.7);
        }

        /* States */
        .sp-state {
          min-height: 100vh;
          background: #071020;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Source Sans 3', sans-serif;
        }
        .sp-state-box { text-align: center; padding: 40px 24px; }
        .sp-state-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 700; color: #f0e6c8; margin-bottom: 12px;
        }
        .sp-state-msg { font-size: 15px; color: #3a5a7a; margin-bottom: 28px; }

        .sp-spinner {
          width: 40px; height: 40px;
          border: 2px solid rgba(196,160,72,0.15);
          border-top-color: #c4a048;
          border-radius: 50%;
          animation: sp-spin 0.8s linear infinite;
          margin: 0 auto 16px;
        }
        @keyframes sp-spin { to { transform: rotate(360deg); } }

        .sp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #c4a048; color: #071020;
          font-size: 12.5px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 12px 28px; border: none;
          border-radius: 2px; cursor: pointer;
          transition: all 0.25s;
        }
        .sp-btn:hover { background: #e0c060; transform: translateY(-2px); }
      `}</style>

      {/* Loading */}
      {loading && (
        <div className="sp-state">
          <div className="sp-state-box">
            <div className="sp-spinner" />
            <p style={{ color: "#3a5a7a", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>Loading Profile...</p>
          </div>
        </div>
      )}

      {/* Not found */}
      {!loading && !student && (
        <div className="sp-state">
          <div className="sp-state-box">
            <h2 className="sp-state-title">Student Not Found</h2>
            <p className="sp-state-msg">The profile you are looking for does not exist or has been removed.</p>
            <button className="sp-btn" onClick={() => router.back()}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      )}

      {/* Profile */}
      {!loading && student && (() => {
        const medal = medalColor(student.Rank);
        const initials = student.Student_Name?.charAt(0)?.toUpperCase() || "S";
        return (
          <div className="sp-root">
            <div className="sp-inner">

              <button className="sp-back" onClick={() => router.back()}>
                <svg className="sp-back-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Toppers
              </button>

              <div className="sp-card">

                {/* Left */}
                <div className="sp-left">
                  <div className="sp-photo-wrap">
                    <div className="sp-photo-ring">
                      {student.Image ? (
                        <Image
                          src={`/uploads/${student.Image}`}
                          alt={student.Student_Name}
                          fill
                          sizes="200px"
                          className="object-cover object-top"
                          priority
                        />
                      ) : (
                        <div className="sp-photo-placeholder">{initials}</div>
                      )}
                    </div>
                    {student.Rank && (
                      <div className="sp-rank-badge" style={{ background: medal.bg, color: medal.text }}>
                        <span className="sp-rank-num">{student.Rank}</span>
                        <span className="sp-rank-label">{medal.label}</span>
                      </div>
                    )}
                  </div>

                  <div className="sp-stats">
                    {student.Marks_Percentage && (
                      <div className="sp-stat">
                        <div className="sp-stat-icon">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="sp-stat-label">Score</div>
                          <div className="sp-stat-val">
                            {student.Marks_Percentage}
                            <span className="sp-stat-pct">%</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {student.Year && (
                      <div className="sp-stat">
                        <div className="sp-stat-icon">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="sp-stat-label">Academic Year</div>
                          <div className="sp-stat-val">{student.Year}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right */}
                <div className="sp-right">
                  <div className="sp-badge">
                    <span className="sp-badge-dot" />
                    Student Profile
                  </div>
                  <h1 className="sp-name">{student.Student_Name}</h1>
                  <div className="sp-sub">
                    {student.Student_Class && <span>{student.Student_Class}</span>}
                    {student.Student_Class && student.Gender && <span className="sp-sub-sep" />}
                    {student.Gender && <span style={{ textTransform: "capitalize" }}>{student.Gender}</span>}
                  </div>
                  <div className="sp-divider" />

                  <div className="sp-info-grid">
                    {student.Father_name && (
                      <div className="sp-info-item">
                        <div className="sp-info-icon">
                          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="sp-info-label">Father's Name</div>
                          <div className="sp-info-val">{student.Father_name}</div>
                        </div>
                      </div>
                    )}
                    {student.Year && (
                      <div className="sp-info-item">
                        <div className="sp-info-icon">
                          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <div className="sp-info-label">Batch</div>
                          <div className="sp-info-val">{student.Year}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {student.Description && (
                    <>
                      <div className="sp-about-title">
                        <div className="sp-about-bar" />
                        About Achievement
                      </div>
                      <p className="sp-about-text">{student.Description}</p>
                    </>
                  )}

                  <div className="sp-quote">
                    <div className="sp-quote-mark">"</div>
                    <p className="sp-quote-text">
                      Success is not final, failure is not fatal: it is the courage to continue that counts.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}