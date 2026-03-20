"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function AdmissionSection() {
  const [admissionData, setAdmissionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const response = await axios.get("/api/client/admission-open-message");
        if (response.data.status === "success") {
          const data = response.data.data;
          const finalData = Array.isArray(data)
            ? data[0]
            : data.data
            ? data.data[0]
            : null;
          setAdmissionData(finalData);
        }
      } catch (error) {
        console.error("Error fetching admission data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionData();
  }, []);

  if (loading) {
    return (
      <section className="adm-root">
        <div className="adm-skeleton" />
      </section>
    );
  }

  if (!admissionData) return null;

  const titleText = admissionData.Title || "";
  const match = titleText.match(/(.*?)(\d{4}-\d{4})/);
  const mainTitle = match ? match[1].trim() : titleText;
  const yearTitle = match ? match[2] : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap');

        .adm-root {
          width: 100%;
          background: #071020;
          padding: 72px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Background texture */
        .adm-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(196,160,72,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 20% 100%, rgba(15,32,68,0.8) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Subtle grid lines */
        .adm-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(196,160,72,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(196,160,72,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .adm-inner {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Section eyebrow label */
        .adm-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 36px;
        }
        .adm-eyebrow-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(to right, transparent, #c4a048);
        }
        .adm-eyebrow-line.rev {
          background: linear-gradient(to left, transparent, #c4a048);
        }
        .adm-eyebrow-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #c4a048;
        }

        /* Card */
        .adm-card {
          background: linear-gradient(160deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.18);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(196,160,72,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .adm-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(196,160,72,0.12);
        }

        /* Gold top strip */
        .adm-card-strip {
          height: 3px;
          background: linear-gradient(90deg, #c4a048, #e0c060, #c4a048);
        }

        /* Image area */
        .adm-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          overflow: hidden;
          background: #0a1530;
        }
        .adm-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, #0f2044, transparent);
          z-index: 1;
        }

        /* Badge overlay on image */
        .adm-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 2;
          background: #c4a048;
          color: #071020;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 2px;
        }

        /* Content */
        .adm-content {
          padding: 32px 40px 40px;
        }
        @media (max-width: 600px) {
          .adm-content { padding: 24px 24px 32px; }
        }

        .adm-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 4vw, 34px);
          font-weight: 700;
          color: #f0e6c8;
          line-height: 1.25;
          margin-bottom: 6px;
          text-align: center;
        }
        .adm-title-year {
          color: #c4a048;
        }

        .adm-divider {
          width: 56px;
          height: 2px;
          background: linear-gradient(90deg, #c4a048, transparent);
          margin: 16px auto 22px;
          border-radius: 2px;
        }

        .adm-message {
          font-size: 15px;
          line-height: 1.8;
          color: #7a90a8;
          text-align: center;
          margin-bottom: 28px;
        }

        /* Strip the rich-text wrapper but keep content readable */
        .adm-message h1, .adm-message h2, .adm-message h3 {
          font-family: 'Playfair Display', serif;
          color: #c5d8e8;
          font-size: 17px;
          margin-bottom: 8px;
        }
        .adm-message p { margin-bottom: 8px; }
        .adm-message strong { color: #d4c090; }

        .adm-cta-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .adm-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #c4a048;
          color: #071020;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 12px 28px;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .adm-cta-primary:hover {
          background: #e0c060;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(196,160,72,0.35);
        }
        .adm-cta-arrow { transition: transform 0.2s; }
        .adm-cta-primary:hover .adm-cta-arrow { transform: translateX(4px); }

        .adm-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #c4a048;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 12px 24px;
          border: 1px solid rgba(196,160,72,0.3);
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .adm-cta-secondary:hover {
          border-color: #c4a048;
          background: rgba(196,160,72,0.07);
        }

        /* Skeleton */
        .adm-skeleton {
          max-width: 860px;
          margin: 0 auto;
          height: 420px;
          border-radius: 4px;
          background: linear-gradient(90deg, #0f2044 25%, #152a52 50%, #0f2044 75%);
          background-size: 200% 100%;
          animation: adm-shimmer 1.5s infinite;
        }
        @keyframes adm-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section className="adm-root">
        <div className="adm-inner">

          {/* Eyebrow */}
          <div className="adm-eyebrow">
            <div className="adm-eyebrow-line" />
            <span className="adm-eyebrow-text">Admissions</span>
            <div className="adm-eyebrow-line rev" />
          </div>

          {/* Card */}
          <div className="adm-card">
            <div className="adm-card-strip" />

            {/* Image */}
            {admissionData.Image && (
              <div className="adm-img-wrap">
                <Image
                  src={`/uploads/${admissionData.Image}`}
                  alt={admissionData.Title || "Admission"}
                  fill
                  sizes="(max-width: 860px) 100vw, 860px"
                  className="object-cover"
                  priority
                />
                <span className="adm-badge">Now Open</span>
              </div>
            )}

            {/* Content */}
            <div className="adm-content">
              <h2 className="adm-title">
                {mainTitle}{" "}
                {yearTitle && <span className="adm-title-year">{yearTitle}</span>}
              </h2>

              <div className="adm-divider" />

              {admissionData.Message && (
                <div
                  className="adm-message"
                  dangerouslySetInnerHTML={{ __html: admissionData.Message }}
                />
              )}

              <div className="adm-cta-row">
                {admissionData.Read_More_Url && (
                  <Link href={admissionData.Read_More_Url} className="adm-cta-primary">
                    Apply Now
                    <svg className="adm-cta-arrow" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
                <Link href="/pages/admission" className="adm-cta-secondary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}