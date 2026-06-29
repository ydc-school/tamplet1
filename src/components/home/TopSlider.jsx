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
import useIsPhone from "@/utils/isphone";

export default function TopSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isPhone = useIsPhone();

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setSlides([]);

    axios
      .get(`/api/client/poster?isPhone=${isPhone ? "true" : "false"}`)
      .then((res) => {
        if (!ignore && res.data.status === "success") {
          const valid = res.data.data.data.filter((s) => hasPosterMedia(s));
          const sortedSlides = valid.sort((a, b) => {
            return (a.Index_No || 0) - (b.Index_No || 0);
          });
          setSlides(sortedSlides);
        }
      })
      .catch(() => { })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [isPhone]);

  if (loading) {
    return (
      <div className="relative w-full bg-[#f6f8fc] border-b-3 border-[#c4a048]">
        <div className="w-full h-screen lg:h-screen bg-gradient-to-r from-white via-[#eef4ff] to-white bg-[length:200%_100%] animate-shimmer"
          style={{ animation: 'shimmer 1.5s infinite linear' }} />
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full bg-[#f6f8fc] border-b-3 border-[#c4a048] group">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c4a048] via-[#e0c060] to-transparent z-10 pointer-events-none" />

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
        // Swiper core ko h-auto rakha hai jaisa aapne kaha
        className="w-full h-auto bg-[#f6f8fc]"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.Id || index}
            data-swiper-autoplay={isPosterVideo(slide.Image) ? 15000 : 4500}
            className="!h-auto"
          >
            {/* Slide Box: Phone par strict w-screen h-screen, desktop par automatic custom aspect layout */}
            <div className="relative w-screen h-screen lg:w-full xl:lg:h-[clamp(50vh,85vh,85vh)] lg:h-[clamp(200px,42vw,620px)] bg-[#f6f8fc] flex items-center justify-center overflow-hidden">
              <PosterMedia
                slide={slide}
                alt={slide.Name || "Poster"}
                // Mobile par w-screen h-screen aur object-cover, desktop par contain mode
                className="absolute inset-0 w-screen h-screen lg:w-full xl:h-s lg:h-full object-cover lg:object-contain transition-transform duration-[8000ms] ease-out swiper-slide-active:scale-104"
                priority={index === 0}
              />

              {/* Slide Label */}
              {slide.Name && (
                <div className="absolute bottom-5 left-6 z-10 flex items-center gap-2.5">
                  <div className="w-[3px] h-7 bg-[#c4a048] rounded-sm shrink-0" />
                  <span className="font-['Source_Sans_3',sans-serif] text-[13px] font-semibold tracking-wider text-[rgba(240,230,200,0.85)] drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                    {slide.Name}
                  </span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Counter */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 right-6 z-10 font-['Source_Sans_3',sans-serif] text-[12px] font-bold tracking-widest text-[rgba(196,160,72,0.7)]">
          <span className="text-[#c4a048] text-[16px]">
            {String((slides[activeIndex]?.Index) || activeIndex + 1).padStart(2, "0")}
          </span>
          <span> / {String(slides.length).padStart(2, "0")}</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <button className="ts-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] bg-[rgba(7,16,32,0.6)] border border-[rgba(196,160,72,0.25)] rounded-sm flex items-center justify-center cursor-pointer text-[#c4a048] opacity-0 group-hover:opacity-100 transition-all duration-250 backdrop-blur-sm hover:bg-[rgba(196,160,72,0.15)] hover:border-[#c4a048]" aria-label="Previous">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="ts-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] bg-[rgba(7,16,32,0.6)] border border-[rgba(196,160,72,0.25)] rounded-sm flex items-center justify-center cursor-pointer text-[#c4a048] opacity-0 group-hover:opacity-100 transition-all duration-250 backdrop-blur-sm hover:bg-[rgba(196,160,72,0.15)] hover:border-[#c4a048]" aria-label="Next">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Styles for Pagination Dots and Zoom effect */}
      <style>{`
        .swiper-pagination { bottom: 16px !important; }
        .swiper-pagination-bullet { width: 6px !important; height: 6px !important; background: rgba(255,255,255,0.35) !important; opacity: 1 !important; transition: all 0.25s !important; border-radius: 3px !important; }
        .swiper-pagination-bullet-active { background: #c4a048 !important; width: 20px !important; }
        .swiper-slide-active .swiper-slide-active\\:scale-104 { transform: scale(1.04) !important; }
      `}</style>
    </div>
  );
}