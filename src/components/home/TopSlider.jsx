"use client";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import axios from "axios";

export default function TopSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/poster")
      .then((res) => {
        if (res.data.status === "success") {
          const valid = res.data.data.data.filter(
            (s) => s.Image && s.Image.trim() !== ""
          );
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
            <SwiperSlide key={slide.Id || index}>
              <div style={{ position: "relative", background: "#f6f8fc", width: "100%", height: "100%" }}>
                <Image
                  src={`/uploads/${slide.Image}`}
                  alt={slide.Name || "Poster"}
                  fill
                  sizes="100vw"
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

        {/* Slide counter */}
        {slides.length > 1 && (
          <div className="ts-counter">
            <span className="ts-counter-cur">01</span>
            <span> / {String(slides.length).padStart(2, "0")}</span>
          </div>
        )}

        {/* Custom nav */}
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
