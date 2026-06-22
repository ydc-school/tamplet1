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

  if (loading) {
    return (
      <div className="ts-skeleton">
        <div className="ts-skel-inner" />
      </div>
    );
  }

  // if (slides.length === 0) return null;

  return (
    <>




      <section className="relative w-full h-[600px] overflow-hidden group">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img className="w-full h-full object-cover"
          data-alt="A grand theater stage filled with disciplined school students in smart formal blazers and sashes, standing at attention for an investiture ceremony at Lotus Valley International School. High-end stage lighting illuminates the children, creating a formal and prestigious atmosphere of academic achievement and tradition. The background features a large screen with school branding. Soft cinematic shadows and rich colors evoke excellence."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBysLaA1elv8rdKhXkT2vfPXjZK1fR-7T0RodV8Ggh8eKY8fPYzH4zkgOhT3TYJH8JnMqLf8NdU9mXAJwH2XGI7tOThXBRUbCK6fpCarvxyjqTbtxMlsQSv3Sf-5nAgzjAwl30EOapsNpafifa1C7YjOQ_2sn1cMlCEaI5h6foSDTb2nVKSnm0069jQz1jz8xv2uqaPfZ4UgsWzq-LBXes3bCmNFp6ef0_1hmLrUIIaw2138EsnKj_Emy1IQe2GVGvlc6z_uokVKI" />
        <div
          className="absolute inset-0 z-20 flex flex-col justify-center items-start px-gutter max-w-container-max mx-auto text-white">
          <div className="bg-deep-maroon/90 backdrop-blur-sm p-4 mb-4 rounded-sm shadow-xl">
            <span className="text-label-sm font-label-sm tracking-widest uppercase">Affiliation no - 531034</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl mb-6 max-w-3xl leading-tight">
            Shaping Visionaries <br />for a <span className="text-heritage-gold">Better Tomorrow</span>
          </h1>
          <button
            className="bg-deep-maroon hover:bg-primary py-4 px-10 text-white font-label-md text-label-md uppercase tracking-widest transition-all shadow-lg hover:shadow-primary/40 flex items-center gap-3">
            Virtual Tour 360 <span className="material-symbols-outlined">explore</span>
          </button>
        </div>
        
        <div
          className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md py-3 border-t border-heritage-gold">
          <div className="max-w-container-max mx-auto px-gutter flex items-center">
            <span className="bg-deep-maroon text-white px-4 py-1 font-label-md text-label-md mr-4 shrink-0">UPCOMING
              EVENTS</span>
            <marquee className="font-label-md text-on-surface" scrollamount="6">
              Registration Open for Academic Session 2025-26 | Inter-School Sports Meet starting Dec 15th |
              Parent-Teacher Interaction Schedule Updated...
            </marquee>
          </div>
        </div>
      </section>




      {/* <div className="ts-wrap">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={slides.length > 1}
          className="ts-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.Id || index} data-swiper-autoplay={isPosterVideo(slide.Image) ? 15000 : 4500}>
              <div style={{ position: "relative", background: "#f6f8fc", width: "100%", height: "100%" }}>
                <PosterMedia
                  slide={slide}
                  alt={slide.Name || "Poster"}
                  className="ts-slide-img object-contain"
                  priority={index === 0}
                />
                {slide.Name && (
                  <div className="ts-slide-label">
                    <div className="ts-label-bar" />
                    <span className="ts-label-text">{slide.Name}</span>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {slides.length > 1 && (
          <div className="ts-counter">
            <span className="ts-counter-cur">01</span>
            <span> / {String(slides.length).padStart(2, "0")}</span>
          </div>
        )}

        <button className="ts-prev" aria-label="Previous">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="ts-next" aria-label="Next">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div> */}
    </>
  );
}
