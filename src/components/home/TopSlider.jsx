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
          const valid = res.data.data.data.filter((s) => s.Image && s.Image.trim() !== "");
          setSlides(valid);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="w-full h-[60vh] bg-surface-container animate-pulse" />;
  if (slides.length === 0) return null;

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group">
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
            <div className="relative w-full h-full bg-secondary-container">
              <Image
                src={`/uploads/${slide.Image}`}
                alt={slide.Name || "Poster"}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="ts-prev absolute left-8 top-1/2 z-10 p-4 bg-white/10 hover:bg-white text-white hover:text-primary transition-all backdrop-blur-sm">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <button className="ts-next absolute right-8 top-1/2 z-10 p-4 bg-white/10 hover:bg-white text-white hover:text-primary transition-all backdrop-blur-sm">
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-10 z-10 text-white font-label-caps">
          <span className="text-2xl font-bold">01</span>
          <span className="opacity-70"> / {String(slides.length).padStart(2, "0")}</span>
        </div>
      )}
    </section>
  );
}