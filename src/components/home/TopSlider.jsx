"use client";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import axios from "axios";
import PosterMedia, { hasPosterMedia, isPosterVideo } from "./PosterMedia";

export default function TopSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/poster")
      .then((res) => {
        if (res.data.status === "success") {
          const valid = res.data.data.data.filter((s) => hasPosterMedia(s));
          setSlides(valid);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="ts-skeleton">
        <div className="ts-skel-inner" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <>
      <style>{`
        .ts-skeleton {
          width: 100%;
          position: relative;
          background: #f6f8fc;
          border-bottom: 3px solid #c4a048;
        }
        .ts-skel-inner {
          width: 100%;
          height: clamp(200px, 42vw, 620px);
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: ts-shimmer 1.5s infinite;
        }
        @keyframes ts-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .ts-wrap {
          width: 100%;
          position: relative;
          background: #f6f8fc;
          border-bottom: 3px solid #c4a048;
        }
        .ts-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
          z-index: 10;
          pointer-events: none;
        }
        .ts-swiper {
          width: 100%;
          height: clamp(200px, 42vw, 620px) !important;
          display: block;
          background: #f6f8fc;
        }
        .ts-slide-img {
          position: absolute;
          inset: 0;
          transition: transform 8s ease !important;
        }
        .swiper-slide-active .ts-slide-img {
          transform: scale(1.04) !important;
        }
        .ts-slide-label {
          position: absolute;
          bottom: 20px;
          left: 24px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ts-label-bar {
          width: 3px;
          height: 28px;
          background: #c4a048;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .ts-label-text {
          font-family: 'Source Sans 3', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(240,230,200,0.85);
          text-shadow: 0 1px 6px rgba(0,0,0,0.6);
        }
        .ts-counter {
          position: absolute;
          bottom: 20px;
          right: 24px;
          z-index: 2;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(196,160,72,0.7);
        }
        .ts-counter-cur { color: #c4a048; font-size: 16px; }
        .ts-prev, .ts-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 42px;
          height: 42px;
          background: rgba(7,16,32,0.6);
          border: 1px solid rgba(196,160,72,0.25);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #c4a048;
          opacity: 0;
          transition: all 0.25s ease;
          backdrop-filter: blur(4px);
        }
        .ts-prev { left: 16px; }
        .ts-next { right: 16px; }
        .ts-wrap:hover .ts-prev,
        .ts-wrap:hover .ts-next { opacity: 1; }
        .ts-prev:hover, .ts-next:hover {
          background: rgba(196,160,72,0.15);
          border-color: #c4a048;
        }
        .ts-swiper .swiper-pagination {
          bottom: 16px !important;
        }
        .ts-swiper .swiper-pagination-bullet {
          width: 6px !important;
          height: 6px !important;
          background: rgba(255,255,255,0.35) !important;
          opacity: 1 !important;
          transition: all 0.25s !important;
          border-radius: 3px !important;
        }
        .ts-swiper .swiper-pagination-bullet-active {
          background: #c4a048 !important;
          width: 20px !important;
        }
      `}</style>

      <div className="ts-wrap">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={slides.length > 1}
          className="ts-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.Id || index} data-swiper-autoplay={isPosterVideo(slide.Image) ? 15000 : 4500}>
              <div style={{ position: "relative", background: "#f6f8fc", width: "100%", height: "100%" }}>
                <PosterMedia
                  slide={slide}
                  alt={slide.Name || "Poster"}
                  className="ts-slide-img object-contain"
                  priority={index === 0}
                />
                {slide.Name && (
                  <div className="ts-slide-label">
                    <div className="ts-label-bar" />
                    <span className="ts-label-text">{slide.Name}</span>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {slides.length > 1 && (
          <div className="ts-counter">
            <span className="ts-counter-cur">01</span>
            <span> / {String(slides.length).padStart(2, "0")}</span>
          </div>
        )}

        <button className="ts-prev" aria-label="Previous">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="ts-next" aria-label="Next">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
