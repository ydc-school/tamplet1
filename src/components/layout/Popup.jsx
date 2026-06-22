"use client";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import axios from "axios";
import PosterMedia, { hasPosterMedia, isPosterVideo } from "../home/PosterMedia";

export default function Popup() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/client/poster?indexNo=100")
      .then((res) => {
        if (res.data.status === "success") {
          const valid = res.data.data.data.filter((s) => hasPosterMedia(s));
          setSlides(valid);
          if (valid.length > 0) setIsOpen(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !isOpen || slides.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10" 
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-5xl bg-surface-dim dark:bg-surface-dim border border-outline-variant shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button aligned with template style */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-[2010] bg-heritage-navy/80 hover:bg-heritage-navy text-white hover:text-academic-gold p-2 rounded-full transition-all duration-300 flex items-center justify-center border border-outline-variant shadow-lg"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <section className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/60 !w-3 !h-3 transition-all duration-300 mx-1",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-academic-gold !w-6 !rounded-full !opacity-100"
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={slides.length > 1}
            className="h-full w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.Id || index} data-swiper-autoplay={isPosterVideo(slide.Image) ? 15000 : 5000}>
                <div className="relative w-full h-full flex items-center justify-center bg-black/40">
                  <PosterMedia
                    slide={slide}
                    alt={slide.Name || "Poster"}
                    className="w-full h-full object-contain"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls using Design.html classes */}
          <button className="ts-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-heritage-navy/40 hover:bg-heritage-navy text-white hover:text-academic-gold flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="ts-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-heritage-navy/40 hover:bg-heritage-navy text-white hover:text-academic-gold flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/10">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          {/* Slide Indicator formatted using font-label-caps & brand colors */}
          {slides.length > 1 && (
            <div className="absolute bottom-6 left-6 z-10 text-white font-label-caps bg-heritage-navy/60 px-4 py-2 rounded-md border border-white/10 backdrop-blur-sm shadow-md flex items-baseline gap-1">
              <span className="text-sm tracking-wider opacity-80">Slide</span>
              <span className="text-xl font-bold text-academic-gold">/</span>
              <span className="text-sm font-semibold text-academic-gold">{String(slides.length).padStart(2, "0")}</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}