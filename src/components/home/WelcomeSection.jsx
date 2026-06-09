"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";

export default function WelcomeSection() {
  const [welcomeData, setWelcomeData] = useState(null);
  const [loading, setLoading] = useState(true);

   const { schoolInfo } = useSchool(); 

  useEffect(() => {
    axios
      .get("/api/client/school-welcome-message")
      .then((res) => {
        if (res.data.status === "success") {
          const d = res.data.data;
          setWelcomeData(Array.isArray(d) ? d[0] : d?.data?.[0] ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stripHtml = (html) =>
    html ? html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";

  if (loading) {
    return (
      <section className="wc-root">
        <div className="wc-skel" />
      </section>
    );
  }

  if (!welcomeData) return null;

  const hasImage = welcomeData.Image && welcomeData.Image.trim() !== "";

  return (
    <>
      <style>{`

        .wc-root {
          width: 100%;
          background: #f8fbff;
          padding: 80px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .wc-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 55% 60% at 100% 50%, rgba(196,160,72,0.05) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 0% 0%, rgba(15,32,68,0.7) 0%, transparent 55%);
          pointer-events: none;
        }
        .wc-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .wc-inner {
          max-width: 1140px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .wc-inner {
            flex-direction: row;
            align-items: stretch;
            gap: 64px;
          }
        }

        /* ── Text side ── */
        .wc-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .wc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }
        .wc-ey-dot { width: 6px; height: 6px; border-radius: 50%; background: #c4a048; }
        .wc-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase; color: #c4a048;
        }

        .wc-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 700;
          color: #10213a;
          line-height: 1.25;
          margin-bottom: 24px;
        }
        .wc-title em { font-style: italic; color: #c4a048; }

        .wc-divider {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, #c4a048, transparent);
          border-radius: 2px;
          margin-bottom: 24px;
        }

        .wc-message {
          font-size: 15.5px;
          line-height: 1.85;
          color: #5f7288;
          margin-bottom: 32px;
        }
        .wc-message p { margin-bottom: 10px; }
        .wc-message strong { color: #1d3557; font-weight: 600; }

        /* Feature pills */
        .wc-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }
        .wc-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: rgba(196,160,72,0.07);
          border: 1px solid rgba(196,160,72,0.18);
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #57697d;
        }
        .wc-pill-dot { width: 5px; height: 5px; border-radius: 50%; background: #c4a048; flex-shrink: 0; }

        .wc-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #c4a048;
          color: #f6f8fc;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 12px 28px;
          text-decoration: none;
          border-radius: 2px;
          width: fit-content;
          transition: all 0.25s ease;
        }
        .wc-cta:hover {
          background: #e0c060;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(196,160,72,0.3);
        }
        .wc-cta-arrow { transition: transform 0.2s; }
        .wc-cta:hover .wc-cta-arrow { transform: translateX(4px); }

        /* ── Image side ── */
        .wc-img-wrap {
          flex-shrink: 0;
          width: 100%;
          max-width: 460px;
          position: relative;
        }
        @media (min-width: 900px) { .wc-img-wrap { width: 420px; } }
        @media (min-width: 1100px) { .wc-img-wrap { width: 460px; } }

        .wc-img-card {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(196,160,72,0.18);
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        }
        /* Gold corner accents */
        .wc-img-card::before,
        .wc-img-card::after {
          content: '';
          position: absolute;
          width: 28px; height: 28px;
          z-index: 2; pointer-events: none;
        }
        .wc-img-card::before {
          top: -1px; left: -1px;
          border-top: 2px solid #c4a048;
          border-left: 2px solid #c4a048;
        }
        .wc-img-card::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid #c4a048;
          border-right: 2px solid #c4a048;
        }

        /* No-image decorative block */
        .wc-no-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.15);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        .wc-no-img::before,
        .wc-no-img::after {
          content: '';
          position: absolute;
          width: 28px; height: 28px;
          z-index: 2; pointer-events: none;
        }
        .wc-no-img::before {
          top: -1px; left: -1px;
          border-top: 2px solid #c4a048;
          border-left: 2px solid #c4a048;
        }
        .wc-no-img::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid #c4a048;
          border-right: 2px solid #c4a048;
        }
        .wc-no-img-icon { color: rgba(196,160,72,0.15); }
        .wc-no-img-quote {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(16px, 2.5vw, 22px);
          color: rgba(240,230,200,0.15);
          text-align: center;
          padding: 0 32px;
          line-height: 1.6;
        }
        /* Decorative background circles */
        .wc-no-img-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .wc-no-img-circle.c1 {
          width: 200px; height: 200px;
          top: -60px; right: -60px;
          border: 1px solid rgba(196,160,72,0.07);
        }
        .wc-no-img-circle.c2 {
          width: 300px; height: 300px;
          bottom: -80px; left: -80px;
          border: 1px solid rgba(196,160,72,0.05);
        }

        /* Stat badge overlay */
        .wc-stat-badge {
          position: absolute;
          bottom: -16px;
          left: -16px;
          background: linear-gradient(135deg, #c4a048, #e0c060);
          color: #f6f8fc;
          padding: 16px 20px;
          border-radius: 3px;
          box-shadow: 0 8px 24px rgba(196,160,72,0.35);
          z-index: 3;
        }
        @media (max-width: 899px) {
          .wc-stat-badge { bottom: 12px; left: 12px; }
        }
        .wc-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 800;
          line-height: 1; color: #f6f8fc;
        }
        .wc-stat-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(7,16,32,0.7); margin-top: 2px;
        }

        /* Skeleton */
        .wc-skel {
          max-width: 1140px; margin: 0 auto;
          height: 420px; border-radius: 4px;
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: wc-shimmer 1.5s infinite;
        }
        @keyframes wc-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section className="wc-root">
        <div className="wc-inner">

          {/* Text */}
          <div className="wc-text">
            <div className="wc-eyebrow">
              <span className="wc-ey-dot" />
              <span className="wc-ey-text">Welcome</span>
            </div>

            <h2 className="wc-title">
              {welcomeData.Title
                ? welcomeData.Title.split(" ").map((word, i) =>
                    i === 0 ? <em key={i}>{word} </em> : word + " "
                  )
                : "Welcome to Our Institution"}
            </h2>

            <div className="wc-divider" />

            {welcomeData.Message && (
              <div
                className="wc-message"
                dangerouslySetInnerHTML={{ __html: welcomeData.Message }}
              />
            )}

            <div className="wc-pills">
              {["Quality Education", "Experienced Faculty", "Holistic Development", "Modern Campus"].map((p) => (
                <span key={p} className="wc-pill">
                  <span className="wc-pill-dot" />
                  {p}
                </span>
              ))}
            </div>

            {welcomeData.Read_More_Url && (
              <Link href={welcomeData.Read_More_Url} className="wc-cta">
                Learn More
                <svg className="wc-cta-arrow" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Image / Decorative */}
          <div className="wc-img-wrap">
            {hasImage ? (
              <div className="wc-img-card">
                <Image
                  src={`/uploads/${welcomeData.Image}`}
                  alt={welcomeData.Title || "Welcome"}
                  fill
                  sizes="(max-width: 899px) 100vw, 460px"
                  className="object-cover"
                  priority
                />
                <div className="wc-stat-badge">
                  <div className="wc-stat-num">{schoolInfo?.Experience}+</div>
                  <div className="wc-stat-label">Years of Excellence</div>
                </div>
              </div>
            ) : (
              <div className="wc-no-img">
                <div className="wc-no-img-circle c1" />
                <div className="wc-no-img-circle c2" />
                <svg className="wc-no-img-icon" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <p className="wc-no-img-quote">
                  &quot;{welcomeData.Title || "Empowering Young Minds for a Better Tomorrow"}&quot;
                </p>
                <div className="wc-stat-badge" style={{ position: "relative", bottom: "unset", left: "unset", alignSelf: "flex-start", margin: "0 0 0 32px" }}>
                  <div className="wc-stat-num">26+</div>
                  <div className="wc-stat-label">Years of Excellence</div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
