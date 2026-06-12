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
  const [activeIndex, setActiveIndex] = useState(0);

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
      <div className="w-full h-[300px] md:h-[450px] lg:h-[550px] bg-[#01327F]/5 overflow-hidden relative">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#01327F]/10 via-[#01327F]/5 to-[#01327F]/10" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
        pagination={{ clickable: true, el: ".ts-pagination" }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.Id || index}>
            <div className="relative w-full h-full bg-[#f6f8fc]">
              <Image
                src={`/uploads/${slide.Image}`}
                alt={slide.Name || "Poster"}
                fill
                sizes="100vw"
                priority={index === 0}
                style={{ objectFit: "contain" }}
              />
              {slide.Name && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#01327F] via-[#01327F]/70 to-transparent px-4 md:px-8 py-4 md:py-6 flex items-center gap-3">
                  <span className="h-6 w-1 bg-amber-400 rounded-full shrink-0" />
                  <span className="text-white text-sm md:text-lg font-semibold tracking-wide">
                    {slide.Name}
                  </span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide counter */}
      {slides.length > 1 && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-[#01327F]/70 text-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-full">
          <span className="text-amber-400 font-bold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/70"> / {String(slides.length).padStart(2, "0")}</span>
        </div>
      )}

      {/* Custom nav */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous"
            className="ts-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full bg-[#01327F]/60 text-white hover:bg-amber-400 hover:text-[#01327F] transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next"
            className="ts-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full bg-[#01327F]/60 text-white hover:bg-amber-400 hover:text-[#01327F] transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Pagination dots */}
      {slides.length > 1 && (
        <div className="ts-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 [&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:bg-amber-400 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2" />
      )}
    </div>
  );
}