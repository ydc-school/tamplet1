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
    const fetchPosters = async () => {
      try {
        const response = await axios.get("/api/client/poster");
        if (response.data.status === "success") {
          setSlides(response.data.data.data);

        }
      } catch (error) {
        console.error("Error fetching posters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[35vw] flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 font-medium">Loading Posters...</div>
      </div>
    );
  }

  if (slides.length === 0) {
    return null; // Or show fallback
  }

  return (
    <div className="w-full relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={slides.length > 1}
        className="w-full h-[35vw] sm:h-[40vw] md:h-[38vw] lg:h-[36vw] xl:h-[38vw] min-h-[100px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.Id || index}>
            <div className="relative w-full h-full bg-gray-100">
              <Image
                src={`/uploads/${slide.Image}`}
                alt={slide.Name || "Poster"}
                fill
                sizes="100vw"
                className="object-contain"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev text-white! opacity-0! group-hover:opacity-100! transition-opacity duration-300 drop-shadow-md after:text-xl! md:after:text-2xl! lg:after:text-3xl! left-2! sm:left-4! lg:left-8!"></div>

      <div className="swiper-button-next text-white! opacity-0! group-hover:opacity-100! transition-opacity duration-300 drop-shadow-md after:text-xl! md:after:text-2xl! lg:after:text-3xl! right-2! sm:right-4! lg:right-8!"></div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: white !important;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background-color: white !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}