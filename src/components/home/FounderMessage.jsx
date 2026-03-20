"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import Link from "next/link";

export default function FounderMessage() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/client/messages");
        if (response.data.status === "success") {
          setFounders(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching founder messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <section className="fm-root">
        <div className="fm-skeleton" />
      </section>
    );
  }

  if (founders.length === 0) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Source+Sans+3:wght@400;500;600&display=swap');

        .fm-root {
          width: 100%;
          background: #0a1628;
          padding: 80px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .fm-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(196,160,72,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 0% 50%, rgba(15,32,68,0.6) 0%, transparent 60%);
          pointer-events: none;
        }
        .fm-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .fm-inner {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Eyebrow */
        .fm-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
        }
        .fm-ey-line {
          width: 56px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,160,72,0.5));
        }
        .fm-ey-line.rev {
          background: linear-gradient(to left, transparent, rgba(196,160,72,0.5));
        }
        .fm-ey-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c4a048;
        }

        /* Swiper overrides */
        .fm-swiper {
          padding-bottom: 48px !important;
        }
        .fm-swiper .swiper-pagination-bullet {
          background: rgba(196,160,72,0.3) !important;
          width: 6px !important;
          height: 6px !important;
          opacity: 1 !important;
          transition: all 0.2s !important;
        }
        .fm-swiper .swiper-pagination-bullet-active {
          background: #c4a048 !important;
          width: 22px !important;
          border-radius: 3px !important;
        }

        /* Card */
        .fm-card {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.15);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 56px rgba(0,0,0,0.45);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fm-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 72px rgba(0,0,0,0.5);
        }
        @media (min-width: 768px) {
          .fm-card { flex-direction: row; min-height: 380px; }
        }

        /* Gold strip */
        .fm-strip {
          height: 3px;
          background: linear-gradient(90deg, #c4a048, #e0c060, #c4a048);
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .fm-strip {
            height: auto;
            width: 3px;
            background: linear-gradient(180deg, #c4a048, #e0c060, #c4a048);
          }
        }

        /* Image column */
        .fm-img-col {
          flex-shrink: 0;
          width: 100%;
          position: relative;
          background: #071020;
          min-height: 260px;
        }
        @media (min-width: 768px) {
          .fm-img-col {
            width: 300px;
            min-height: unset;
          }
        }
        @media (min-width: 1024px) {
          .fm-img-col { width: 340px; }
        }

        /* Dark gradient overlay on image */
        .fm-img-col::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 60%, #0f2044);
          z-index: 1;
        }
        @media (max-width: 767px) {
          .fm-img-col::after {
            background: linear-gradient(to top, #0f2044 0%, transparent 60%);
          }
        }

        /* Role badge */
        .fm-role-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 2;
          background: #c4a048;
          color: #071020;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 2px;
        }
        @media (min-width: 768px) {
          .fm-role-badge {
            bottom: 20px;
            left: 20px;
          }
        }

        /* Content column */
        .fm-content {
          flex: 1;
          padding: 32px 36px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        @media (max-width: 600px) {
          .fm-content { padding: 28px 24px 32px; }
        }

        /* Open quote */
        .fm-quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 96px;
          line-height: 0.6;
          color: rgba(196,160,72,0.12);
          position: absolute;
          top: 24px;
          right: 28px;
          user-select: none;
          pointer-events: none;
        }

        .fm-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700;
          color: #f0e6c8;
          margin-bottom: 4px;
        }
        .fm-role {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c4a048;
          margin-bottom: 20px;
        }

        .fm-divider {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #c4a048, transparent);
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .fm-description {
          font-size: 14.5px;
          line-height: 1.85;
          color: #7a90a8;
          margin-bottom: 28px;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .fm-read-more {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c4a048;
          text-decoration: none;
          border-bottom: 1px solid rgba(196,160,72,0.25);
          padding-bottom: 3px;
          width: fit-content;
          transition: all 0.2s ease;
        }
        .fm-read-more:hover {
          color: #e0c060;
          border-color: #c4a048;
          gap: 11px;
        }

        /* Skeleton */
        .fm-skeleton {
          max-width: 1160px;
          margin: 0 auto;
          height: 380px;
          border-radius: 4px;
          background: linear-gradient(90deg, #0f2044 25%, #152a52 50%, #0f2044 75%);
          background-size: 200% 100%;
          animation: fm-shimmer 1.5s infinite;
        }
        @keyframes fm-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section className="fm-root">
        <div className="fm-inner">

          <div className="fm-eyebrow">
            <div className="fm-ey-line" />
            <span className="fm-ey-text">Message from Leadership</span>
            <div className="fm-ey-line rev" />
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={founders.length > 1 ? { delay: 6000, disableOnInteraction: false } : false}
            loop={founders.length > 1}
            className="fm-swiper"
          >
            {founders.map((founder) => (
              <SwiperSlide key={founder.Id}>
                <div className="fm-card">
                  <div className="fm-strip" />

                  {/* Image */}
                  {founder.Image && (
                    <div className="fm-img-col">
                      <Image
                        src={`/uploads/${founder.Image}`}
                        alt={founder.Name || "Leadership"}
                        fill
                        sizes="(max-width: 767px) 100vw, 340px"
                        className="object-cover object-top"
                      />
                      {founder.Roll && (
                        <span className="fm-role-badge">{founder.Roll}</span>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="fm-content">
                    <span className="fm-quote-mark">"</span>

                    {founder.Name && <h3 className="fm-name">{founder.Name}</h3>}
                    {founder.Roll && <p className="fm-role">{founder.Roll}</p>}

                    <div className="fm-divider" />

                    {founder.Description && (
                      <p className="fm-description">{founder.Description}</p>
                    )}

                    {founder.Read_More_Url && (
                      <Link href={founder.Read_More_Url} className="fm-read-more">
                        Read Full Message
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>
    </>
  );
}