"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function TopSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/poster")
      .then((res) => {
        if (res.data?.status === "success") {
          const valid = res.data.data.data.filter((s) => s.Image?.trim());
          setSlides(valid);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <article>Loading slider...</article>;
  if (slides.length === 0) return null;

  return (
    <section aria-label="Hero Slider">
      {/*
        UI PROMPT — TOP SLIDER / HERO:
        Full-width Swiper carousel, fade effect, no side padding.
        Each slide: full-width cover image (100vw) + optional bottom caption overlay.
        Controls: Prev/Next buttons (left-right center), clickable pagination dots.
        Slide counter "01 / 05" badge (if multiple slides). Autoplay 4.5s, loop.
        Full prompt: UI_PROMPTS.md → Section 4
      */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.Id || index}>
            <figure>
              <Image
                src={`/uploads/${slide.Image}`}
                alt={slide.Name || "Poster"}
                fill
                sizes="100vw"
                priority={index === 0}
              />
              {slide.Name && (
                <figcaption>
                  <span>{slide.Name}</span>
                </figcaption>
              )}
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      {slides.length > 1 && (
        <aside aria-label="Slide Counter">
          <span>01</span> / <span>{String(slides.length).padStart(2, "0")}</span>
        </aside>
      )}

      <nav aria-label="Slider Navigation">
        <button className="ts-prev" aria-label="Previous">Previous</button>
        <button className="ts-next" aria-label="Next">Next</button>
      </nav>
    </section>
  );
}