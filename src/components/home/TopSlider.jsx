"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper CSS Styles imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function TopSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // एक्टिव स्लाइड इंडेक्स को ट्रैक करने के लिए स्टेट (ताकि काउंटर 100% वर्किंग रहे)
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    axios
      .get("/api/client/poster")
      .then((res) => {
        if (res.data?.status === "success") {
          // डेटा को सुरक्षित फ़िल्टर करना
          const valid = (res.data.data?.data || res.data.data || []).filter((s) => s.Image?.trim());
          setSlides(valid);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Premium Skeleton Loading Screen
  if (loading) {
    return (
      <article className="w-full h-[65vh] md:h-[85vh] bg-[#1e1b4b]/10 animate-pulse flex flex-col justify-end p-12 md:p-24">
        <div className="space-y-4 max-w-xl">
          <div className="h-4 bg-slate-300 rounded w-1/4"></div>
          <div className="h-12 bg-slate-300 rounded w-3/4"></div>
          <div className="h-6 bg-slate-300 rounded w-1/2"></div>
        </div>
      </article>
    );
  }

  if (slides.length === 0) return null;

  return (
    <section aria-label="Hero Slider" className="relative w-full h-[65vh] md:h-[85vh] bg-[#1e1b4b] overflow-hidden group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
        pagination={{ 
          clickable: true,
          el: ".ts-pagination",
          bulletClass: "inline-block w-2.5 h-2.5 rounded-full bg-white/40 cursor-pointer transition-all duration-300 mx-1",
          bulletActiveClass: "!bg-[#7f1d1d] !w-8"
        }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.Id || index} className="relative w-full h-full">
            <figure className="relative w-full h-full m-0 p-0">
              {/* Cover Image Section */}
              <div className="relative w-full h-full brightness-[0.75] contrast-[1.05]">
                <Image
                  src={`/uploads/${slide.Image}`}
                  alt={slide.Name || "Yaduvanshi Banner Poster"}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              {/* Premium Cinematic Text Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b]/90 via-[#1e1b4b]/40 to-transparent flex items-center">
                {slide.Name && (
                  <figcaption className="max-w-[1280px] mx-auto px-8 w-full z-10">
                    <div className="max-w-2xl text-white space-y-4 md:space-y-6 transform translate-y-0 animate-[fadeInUp_0.8s_ease-out]">
                      <span className="font-sans font-black text-[#f1f5f9] tracking-[0.4em] uppercase text-xs md:text-sm block">
                        Yaduvanshi Group of Institutions
                      </span>
                      <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-md">
                        {slide.Name}
                      </h2>
                      <div className="w-24 h-1.5 bg-[#7f1d1d] rounded-full" />
                    </div>
                  </figcaption>
                )}
              </div>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dynamic Slide Counter Badge */}
      {slides.length > 1 && (
        <aside 
          aria-label="Slide Counter" 
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center bg-[#1e1b4b]/60 backdrop-blur-md border border-white/10 text-white font-sans text-xs font-black tracking-widest px-4 py-6 rounded-full space-y-2 select-none"
        >
          <span className="text-[#f1f5f9] text-base">{String(activeIndex).padStart(2, "0")}</span>
          <div className="w-px h-6 bg-white/20" />
          <span className="opacity-40">{String(slides.length).padStart(2, "0")}</span>
        </aside>
      )}

      {/* Navigation Layer Controls */}
      <div className="absolute inset-x-0 bottom-8 max-w-[1280px] mx-auto px-8 z-20 flex justify-between items-center pointer-events-none">
        {/* Custom Bullet Pagination Box */}
        <div className="ts-pagination flex items-center pointer-events-auto" />

        {/* Action Arrows Wrapper */}
        <nav aria-label="Slider Navigation" className="flex items-center gap-3 pointer-events-auto">
          {/* Previous Arrow Button */}
          <button 
            className="ts-prev w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#7f1d1d] hover:border-[#7f1d1d] transition-all duration-300 focus:outline-none group/btn active:scale-95"
            aria-label="Previous Slide"
          >
            <svg className="w-5 h-5 transform group-hover/btn:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow Button */}
          <button 
            className="ts-next w-12 h-12 rounded-full border border-white/20 bg-[#1e1b4b] text-white flex items-center justify-center hover:bg-[#7f1d1d] transition-all duration-300 focus:outline-none group/btn active:scale-95 shadow-lg"
            aria-label="Next Slide"
          >
            <svg className="w-5 h-5 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </section>
  );
}