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

export default function Popup() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/client/poster?indexNo=100")
      .then((res) => {
        if (res.data.status === "success") {
          const valid = res.data.data.data.filter((s) => s.Image && s.Image.trim() !== "");
          setSlides(valid);
          if (valid.length > 0) setIsOpen(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !isOpen || slides.length === 0) return null;

  return (
    /* UI PROMPT — POPUP MODAL: Full-screen overlay z-2000, black/70 + blur backdrop.
       Centered modal max-w-5xl, close button top-right (circular, white X).
       Inner: Swiper fade slider 50vh mobile / 75vh desktop, object-contain images.
       Prev/Next glass buttons left-right center. White pagination dots, active=gold.
       Slide counter bottom-left "Slide / 03". Autoplay 5s, loop. Click outside to close.
       Full prompt: UI_PROMPTS.md → Section 1 */
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-10" onClick={() => setIsOpen(false)}>
      <div className="relative w-full max-w-5xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-[2010] bg-black/50 hover:bg-black text-white p-2 rounded-full transition-all flex items-center justify-center"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <section className="relative w-full h-[50vh] md:h-[75vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
        pagination={{ 
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white !opacity-50 !w-3 !h-3",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-primary !opacity-100" 
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={slides.length > 1}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.Id || index}>
            <div className="relative w-full h-full">
              <Image
                src={`/uploads/${slide.Image}`}
                alt={slide.Name || "Poster"}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="ts-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white text-white hover:text-primary transition-all backdrop-blur-sm">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <button className="ts-next absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white text-white hover:text-primary transition-all backdrop-blur-sm">
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-10 z-10 text-white font-label-caps">
          <span className="text-2xl font-bold">Slide</span>
          <span className="opacity-70"> / {String(slides.length).padStart(2, "0")}</span>
        </div>
      )}
    </section>
      </div>
    </div>
  );
}