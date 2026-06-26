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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios
      .get("/api/client/poster")
      .then((res) => {
        if (res.data.status === "success") {
          const valid = res.data.data.data.filter((s) => hasPosterMedia(s));
          const sortedSlides = valid.sort((a, b) => {
            return (a.Index_No || 0) - (b.Index_No || 0);
          });
          setSlides(sortedSlides);
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

  if (slides.length === 0) return null;

  return (
    <>
      <style>{`
        .ts-skeleton {
          width: 100%;
          position: relative;
          background: #f6f8fc;
          border-bottom: 3px solid #c4a048;
        }
        .ts-skel-inner {
          width: 100%;
          height: clamp(200px, 42vw, 620px);
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: ts-shimmer 1.5s infinite;
        }
        
        /* Large screens (lg: min-width: 1024px) ke liye skeleton height update */
        @media (min-width: 1024px) {
          .ts-skel-inner {
            height: 100vh;
          }
        }

        @keyframes ts-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .ts-wrap {
          width: 100%;
          position: relative;
          background: #f6f8fc;
          border-bottom: 3px solid #c4a048;
        }
        .ts-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
          z-index: 10;
          pointer-events: none;
        }
        .ts-swiper {
          width: 100%;
          height: clamp(200px, 42vw, 620px) !important;
          display: block;
          background: #f6f8fc;
        }

        /* --- LARGE SCREEN CHANGES (lg:h-screen) --- */
        @media (min-width: 1024px) {
          .ts-swiper {
            height: 100vh !important;
          }
        }

        .ts-slide-img {
          position: absolute;
          inset: 0;
          transition: transform 8s ease !important;
        }
        .swiper-slide-active .ts-slide-img {
          transform: scale(1.04) !important;
        }
        .ts-slide-label {
          position: absolute;
          bottom: 20px;
          left: 24px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ts-label-bar {
          width: 3px;
          height: 28px;
          background: #c4a048;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .ts-label-text {
          font-family: 'Source Sans 3', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(240,230,200,0.85);
          text-shadow: 0 1px 6px rgba(0,0,0,0.6);
        }
        .ts-counter {
          position: absolute;
          bottom: 20px;
          right: 24px;
          z-index: 2;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(196,160,72,0.7);
        }
        .ts-counter-cur { color: #c4a048; font-size: 16px; }
        .ts-prev, .ts-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 42px;
          height: 42px;
          background: rgba(7,16,32,0.6);
          border: 1px solid rgba(196,160,72,0.25);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #c4a048;
          opacity: 0;
          transition: all 0.25s ease;
          backdrop-filter: blur(4px);
        }
        .ts-prev { left: 16px; }
        .ts-next { right: 16px; }
        .ts-wrap:hover .ts-prev,
        .ts-wrap:hover .ts-next { opacity: 1; }
        .ts-prev:hover, .ts-next:hover {
          background: rgba(196,160,72,0.15);
          border-color: #c4a048;
        }
        .ts-swiper .swiper-pagination {
          bottom: 16px !important;
        }
        .ts-swiper .swiper-pagination-bullet {
          width: 6px !important;
          height: 6px !important;
          background: rgba(255,255,255,0.35) !important;
          opacity: 1 !important;
          transition: all 0.25s !important;
          border-radius: 3px !important;
        }
        .ts-swiper .swiper-pagination-bullet-active {
          background: #c4a048 !important;
          width: 20px !important;
        }
      `}</style>

      <div className="ts-wrap">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation={{ nextEl: ".ts-next", prevEl: ".ts-prev" }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={slides.length > 1}
          className="ts-swiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.Id || index} data-swiper-autoplay={isPosterVideo(slide.Image) ? 15000 : 4500}>
              <div style={{ position: "relative", background: "#f6f8fc", width: "100%", height: "100%" }}>
                {/* Note: Agar full screen me images choti dikhein to 'object-contain' ko change karke 'object-cover' try kar sakte hain */}
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
            <span className="ts-counter-cur">
              {String((slides[activeIndex]?.Index) || activeIndex + 1).padStart(2, "0")}
            </span>
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
      </div>





<div className="max-w-screen p-8">

    <div className="flex justify-center mb-8">
        <div className="bg-blue-800 text-white px-12 py-3 rounded-xl text-3xl font-bold shadow-lg">
            COURSES OFFERED
        </div>
    </div>

    <div className="grid lg:grid-cols-5 grid-cols-1 gap-6">

      

       



<div className="col-span-2">

            <div className="bg-red-600 text-white text-center py-2 rounded-xl font-bold mb-4">
                PG Courses
            </div>

            <div className="grid grid-cols-2 gap-2">

                <div className="space-y-2">

                      <div className="bg-cyan-400 rounded-lg px-2 whitespace-nowrap text-center font-semibold">M.Tech (CSE)</div>
                    <div className="bg-cyan-100 rounded-lg p-2 text-center font-semibold">M.Tech (ECE)</div>
                    <div className="bg-cyan-400 rounded-lg p-2 text-center font-semibold">M.Ed.</div>
                    <div className="bg-cyan-100 rounded-lg p-2 text-center font-semibold">M.A. Hindi</div>
                    <div className="bg-cyan-400 rounded-lg p-2 text-center font-semibold">M.A. English</div>
                    <div className="bg-cyan-100 rounded-lg p-2 text-center font-semibold">M.A. Sanskrit</div>
                    <div className="bg-cyan-400 rounded-lg p-2 text-center font-semibold">M.A. History</div>
                    <div className="bg-cyan-100 rounded-lg p-2 text-center font-semibold">M.A. Political Science</div>

                </div>

                <div className="space-y-2">

                 
                    <div className="bg-cyan-400 rounded-lg p-2 text-center font-semibold">M.Com</div>
                    <div className="bg-cyan-100 rounded-lg p-2 text-center font-semibold">M.Sc Physics</div>
                    <div className="bg-cyan-400 rounded-lg p-2 text-center font-semibold">M.Sc Chemistry</div>
                    <div className="bg-cyan-100 rounded-lg p-2 text-center font-semibold">M.Sc Maths</div>
                    <div className="bg-cyan-400 rounded-lg p-2 text-center font-semibold">M.Sc Zoology</div>
                    <div className="bg-cyan-100 rounded-lg p-2 text-center font-semibold">M.Sc Botany</div>
                    <div className="bg-cyan-400 rounded-lg p-2 text-center font-semibold">M.Sc Computer Sci.</div>
                    <div className="bg-cyan-100 rounded-lg p-2 text-center font-semibold">M.Sc Geography</div>

                </div>

            </div>

        </div>



        <div className="col-span-2">

            <div className="bg-red-600 text-white text-center py-2 rounded-xl font-bold mb-4">
                UG Courses
            </div>

            <div className="grid grid-cols-3 gap-2">

                <div className="space-y-2">

                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.Tech (CSE)</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Tech (CE)</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.Tech (ME)</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Tech (ECE)</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.Tech (EE)</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Ed.</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.A.-B.Ed.</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Sc.-B.Ed.</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.P.Ed.</div>

                </div>

                <div className="space-y-2">

                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.A.</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.A. Yoga</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.A. Hons English</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Com</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.Com Hons</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Sc Medical</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.Sc Non Medical</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Sc Hons Physics</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.Sc Hons Chemistry</div>

                </div>

                <div className="space-y-2">

                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.Sc Hons Maths</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Sc Hons Zoology</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">B.Sc Hons Botany</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">B.Sc Computer Sci.</div>
                    <div className="bg-yellow-400 rounded-lg p-2 text-center font-semibold">BBA</div>
                    <div className="bg-yellow-100 rounded-lg p-2 text-center font-semibold">BCA</div>

                </div>

            </div>

        </div>

      

        <div>

            <div className="bg-red-600 text-white text-center py-2 rounded-xl font-bold mb-4">
              UG Courses
            </div>

            <div className="space-y-2">

                <div className="bg-lime-400 rounded-lg p-2 text-center font-semibold">Polytechnic (ME)</div>
                <div className="bg-lime-100 rounded-lg p-2 text-center font-semibold">Polytechnic (ECE)</div>
                <div className="bg-lime-400 rounded-lg p-2 text-center font-semibold">Polytechnic (EE)</div>
                <div className="bg-lime-100 rounded-lg p-2 text-center font-semibold">Polytechnic (CE)</div>
                <div className="bg-lime-400 rounded-lg p-2 text-center font-semibold">ITI (Electrician)</div>
                <div className="bg-lime-100 rounded-lg p-2 text-center font-semibold">ITI (Fitter)</div>
                <div className="bg-lime-400 rounded-lg p-2 text-center font-semibold">ITI (Draughtsman)</div>
                <div className="bg-lime-100 rounded-lg p-2 text-center font-semibold">D.El.Ed.</div>
                <div className="bg-lime-400 rounded-lg p-2 text-center font-semibold">D.P.Ed.</div>

            </div>

        </div>

       

        <div>

            <div className="bg-red-600 text-white text-center py-2 rounded-xl font-bold mb-4">
                Distance Courses
            </div>

            <div className="grid grid-cols-2 gap-2">

                <div className="space-y-2">
                    <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">M.Com</div>
                    <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">M.Sc Maths</div>
                    <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">B.A.</div>
                </div>

                <div className="space-y-2">
                    <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">M.A. English</div>
                    <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">M.A. Hindi</div>
                    <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">B.Com</div>
                </div>

            </div>

            <div className="bg-red-600 text-white text-center py-2 rounded-xl font-bold mt-6 mb-4">
                Diploma Courses
            </div>

            <div className="space-y-2">

                <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">Computer Applications & Data Science</div>
                <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">Artificial Intelligence</div>
                <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">Cyber Security</div>
                <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">Business Analytics</div>
                <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">Banking & Finance</div>
                <div className="bg-yellow-300 rounded-lg p-2 text-center font-semibold">Financial Market</div>

            </div>

        </div>

    </div>

</div>




    

  












        </>
        );
}