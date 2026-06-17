"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper Essential CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Popup() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  useEffect(() => {
    axios
      .get("/api/client/poster?indexNo=100")
      .then((res) => {
        if (res.data.status === "success") {
          const dataArray = res.data.data?.data || res.data.data || [];
          const valid = dataArray.filter((s) => s.Image && s.Image.trim() !== "");
          setSlides(valid);
          if (valid.length > 0) setIsOpen(true);
        }
      })
      .catch((err) => console.error("Popup fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // बैकड्रॉप ओपन होने पर बॉडी स्क्रॉल लॉक गार्ड
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (loading || !isOpen || slides.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 md:p-10 animate-[fadeIn_0.3s_ease-out]"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-5xl rounded-[2.5rem] bg-transparent overflow-hidden shadow-2xl transition-all duration-300 animate-[zoomIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* PREMIUM CIRCULAR CLOSE BUTTON — TOP-RIGHT */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-[2020] bg-black/40 hover:bg-[#7f1d1d] text-white w-10 h-10 rounded-full border border-white/20 transition-all duration-300 flex items-center justify-center backdrop-blur-md focus:outline-none group active:scale-90 shadow-lg"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* CONTAINER SECTION HOLDER */}
        <section className="relative w-full h-[50vh] md:h-[75vh] overflow-hidden rounded-[2.5rem] bg-slate-950/20
          [&_.swiper-pagination-bullet]:!bg-white [&_.swiper-pagination-bullet]:!opacity-40 [&_.swiper-pagination-bullet]:!w-2.5 [&_.swiper-pagination-bullet]:!h-2.5 [&_.swiper-pagination-bullet]:mx-1.5 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300
          [&_.swiper-pagination-bullet-active]:!bg-[#c4a048] [&_.swiper-pagination-bullet-active]:!opacity-100 [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!rounded-full
          [&_.swiper-pagination]:!bottom-6 z-10"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={slides.length > 1}
            onSlideChange={(swiper) => setCurrentActiveIndex(swiper.realIndex)}
            className="h-full w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.Id || index} className="w-full h-full bg-transparent flex items-center justify-center">
                <div className="relative w-full h-full select-none">
                  <Image
                    src={`/uploads/${slide.Image}`}
                    alt={slide.Name || "Campus Poster Announcement"}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* GLASSMORPHISM NAVIGATION TRIGGERS (Only Visible on Multi-Slides) */}
          {slides.length > 1 && (
            <>
              <button className="ts-prev absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-[2010] w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#1e1b4b] border border-white/10 hover:border-white shadow-xl transition-all duration-300 backdrop-blur-md flex items-center justify-center focus:outline-none active:scale-90 group">
                <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="ts-next absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-[2010] w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#1e1b4b] border border-white/10 hover:border-white shadow-xl transition-all duration-300 backdrop-blur-md flex items-center justify-center focus:outline-none active:scale-90 group">
                <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* DYNAMIC REAL-TIME SLIDE COUNTER (BOTTOM LEFT) */}
          {slides.length > 1 && (
            <div className="absolute bottom-5 left-6 md:left-8 z-[2010] text-white font-sans font-black text-[11px] uppercase tracking-[0.2em] bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl hidden sm:flex items-center gap-1.5 shadow-lg select-none">
              <span className="text-[#c4a048]">Slide</span>
              <span>{String(currentActiveIndex + 1).padStart(2, "0")}</span>
              <span className="opacity-40">/</span>
              <span className="opacity-50">{String(slides.length).padStart(2, "0")}</span>
            </div>
          )}
        </section>
        
      </div>
    </div>
  );
}