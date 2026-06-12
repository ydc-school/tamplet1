"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import Link from "next/link";

export default function FounderMessage() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/client/messages");
        if (response.data.status === "success") {
          setFounders(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching founder messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="rounded-2xl bg-[#01327F]/5 h-96 animate-pulse" />
        </div>
      </section>
    );
  }

  if (founders.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-[2px] w-8 bg-amber-400" />
          <span className="text-[#01327F] font-semibold text-sm uppercase tracking-[0.2em]">
            Message from Leadership
          </span>
          <div className="h-[2px] w-8 bg-amber-400" />
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, el: ".fm-pagination" }}
          autoplay={founders.length > 1 ? { delay: 6000, disableOnInteraction: false } : false}
          loop={founders.length > 1}
          className="[&_.swiper-pagination]:relative [&_.swiper-pagination]:mt-8 [&_.swiper-pagination-bullet]:bg-[#01327F]/20 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet-active]:bg-amber-400"
        >
          {founders.map((founder) => (
            <SwiperSlide key={founder.Id}>
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] gap-8 md:gap-12 items-center">
                {/* Image */}
                {founder.Image && (
                  <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden bg-[#01327F]/5 mx-auto max-w-[280px] md:max-w-none">
                    <Image
                      src={`/uploads/${founder.Image}`}
                      alt={founder.Name || "Leadership"}
                      fill
                      sizes="(max-width: 767px) 100vw, 340px"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                    {founder.Roll && (
                      <span className="absolute bottom-3 left-3 bg-[#01327F] text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full">
                        {founder.Roll}
                      </span>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-4 text-center md:text-left">
                  <span className="text-6xl md:text-7xl font-serif text-amber-400 leading-none">
                    &quot;
                  </span>

                  {founder.Description && (
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed -mt-4">
                      {founder.Description}
                    </p>
                  )}

                  <div className="h-1 w-12 bg-amber-400 rounded-full mx-auto md:mx-0" />

                  {founder.Name && (
                    <h3 className="text-xl md:text-2xl font-bold text-[#01327F]">
                      {founder.Name}
                    </h3>
                  )}
                  {founder.Roll && (
                    <p className="text-sm font-medium text-amber-500 uppercase tracking-wide -mt-3">
                      {founder.Roll}
                    </p>
                  )}

                  {founder.Read_More_Url && (
                    <Link
                      href={founder.Read_More_Url}
                      className="inline-flex items-center gap-2 self-center md:self-start mt-2 bg-[#01327F] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#02418f] transition-colors"
                    >
                      Read Full Message
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {founders.length > 1 && <div className="fm-pagination flex justify-center" />}
      </div>
    </section>
  );
}