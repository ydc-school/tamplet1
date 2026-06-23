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
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);
  if (!loading && slides.length === 0) return null;

  if (loading) {
    return (
      <div className="w-full h-[600px] md:h-screen bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6d001d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }



  return (
    <>

      <section className="group relative w-full h-[209px] md:h-screen overflow-hidden bg-black">
        {slides?.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
            pagination={{ clickable: true, modifierClass: "custom-swiper-pagination-" }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={slides.length > 1}
            className="w-full h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide?.Id || index} data-swiper-autoplay={isPosterVideo(slide?.Image) ? 15000 : 4500}>
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <PosterMedia
                    slide={slide}
                    alt={slide?.Name || "Poster"}
                    className="w-full h-full object-contain"
                    priority={index === 0}
                  />

                  <div className="absolute inset-0  z-10" />


                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {slides?.length > 1 && (
          <>
            <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-[#6d001d] text-white flex items-center justify-center transition-all border border-white/10 opacity-0 group-hover:opacity-100">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-[#6d001d] text-white flex items-center justify-center transition-all border border-white/10 opacity-0 group-hover:opacity-100">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}


      </section>
      <div className="z-30 bg-white/95 backdrop-blur-md py-3 border-t border-amber-500">
        <div className="max-w-7xl mx-auto px-6 flex items-center">
          <span className="bg-[#6d001d] text-white px-4 py-1 text-xs font-bold mr-4 shrink-0 rounded-sm">
            UPCOMING EVENTS
          </span>
          <marquee className="text-xs font-bold text-gray-800 tracking-wide" scrollamount="6">
            Registration Open for Academic Session 2026-27 | Inter-School Sports Meet starting Dec 15th | Parent-Teacher Interaction Schedule Updated...
          </marquee>
        </div>
      </div>
    </>
  );
}