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

export default function PhonePoster() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios
      .get("/api/client/poster?isPhone=true")
      .then((res) => {
        if (res.data.status === "success") {
          const valid = res.data.data.data.filter((s) => hasPosterMedia(s));
          const sortedSlides = valid.sort((a, b) => {
            return (a.Index_No || 0) - (b.Index_No || 0);
          });
          setSlides(sortedSlides);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="relative w-full bg-[#f6f8fc] border-b-3 border-[#c4a048]">
        <div className="w-full h-[clamp(200px,42vw,620px)] lg:h-screen bg-gradient-to-r from-white via-[#eef4ff] to-white bg-[length:200%_100%] animate-pulse" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className="group relative w-screen h-[clamp(200px,42vw,620px)] lg:h-screen bg-[#f6f8fc] border-b-3 border-[#c4a048] overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c4a048] via-[#e0c060] via-[#c4a048] to-transparent z-10 pointer-events-none" />

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
        className="w-full h-full block bg-[#f6f8fc] 
                   [&_.swiper-pagination]:bottom-4 [&_.swiper-pagination]:z-10
                   [&_.swiper-pagination-bullet]:w-1.5 [&_.swiper-pagination-bullet]:h-1.5 
                   [&_.swiper-pagination-bullet]:bg-white/35 [&_.swiper-pagination-bullet]:opacity-100 
                   [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-200 [&_.swiper-pagination-bullet]:rounded-[3px]
                   [&_.swiper-pagination-bullet-active]:bg-[#c4a048] [&_.swiper-pagination-bullet-active]:w-5"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.Id || index} data-swiper-autoplay={isPosterVideo(slide.Image) ? 15000 : 4500}>
            <div className="relative w-full h-full bg-[#f6f8fc]">
              <PosterMedia
                slide={slide}
                alt={slide.Name || "Poster"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out group-[.swiper-slide-active]:scale-104"
                priority={index === 0}
              />
              
              {slide.Name && (
                <div className="absolute bottom-5 left-6 z-2 flex items-center gap-2.5">
                  <div className="w-[3px] h-7 bg-[#c4a048] rounded-[2px] shrink-0" />
                  <span className="font-['Source_Sans_3',sans-serif] text-[13px] font-semibold tracking-wider text-[#f0e6c8]/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
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
        <div className="absolute bottom-5 right-6 z-2 font-['Source_Sans_3',sans-serif] text-[12px] font-bold tracking-widest text-[#c4a048]/70">
          <span className="text-[#c4a048] text-[16px]">
            {String((slides[activeIndex]?.Index) || activeIndex + 1).padStart(2, "0")}
          </span>
          <span> / {String(slides.length).padStart(2, "0")}</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <button className="ts-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] bg-[#071020]/60 border border-[#c4a048]/25 rounded-[2px] flex items-center justify-center cursor-pointer text-[#c4a048] opacity-0 group-hover:opacity-100 transition-all duration-250 backdrop-blur-[4px] hover:bg-[#c4a048]/15 hover:border-[#c4a048]" aria-label="Previous">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="ts-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] bg-[#071020]/60 border border-[#c4a048]/25 rounded-[2px] flex items-center justify-center cursor-pointer text-[#c4a048] opacity-0 group-hover:opacity-100 transition-all duration-250 backdrop-blur-[4px] hover:bg-[#c4a048]/15 hover:border-[#c4a048]" aria-label="Next">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}