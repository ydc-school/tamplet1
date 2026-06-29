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
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-10" onClick={() => setIsOpen(false)}>
      <div className="relative w-full max-w-5xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
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
          <SwiperSlide key={slide.Id || index} data-swiper-autoplay={isPosterVideo(slide.Image) ? 15000 : 5000}>
            <div className="relative w-full h-full">
              <PosterMedia
                slide={slide}
                alt={slide.Name || "Poster"}
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="ts-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white text-white hover:text-primary transition-all backdrop-blur-sm">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <button className="ts-next absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white text-white hover:text-primary transition-all backdrop-blur-sm">
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>

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
