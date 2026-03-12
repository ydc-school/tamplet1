"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";

export default function FounderMessage() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("./api/client/messages");
        if (response.data.status === "success") {
          setFounders(response.data.data.data);
        }
      } catch (error) {
        // console.error("Error fetching founder messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <div className="animate-pulse text-gray-400 font-medium text-xl">Loading Messages...</div>
        </div>
      </section>
    );
  }

  if (founders.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-linear-to-b from-gray-50 to-white dark:from-blue-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Founder's Message
          </h2>
          <div className="mt-4 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="mt-5 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A heartfelt note from our leadership on the philosophy and purpose that drives our educational journey.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={founders.length > 1}
          className="w-full"
        >
          {founders.map((founder) => (
            <SwiperSlide key={founder.Id}>
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

                <div className="flex-shrink-0 relative group">
                  <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>

                    <Image
                      src={`/uploads/${founder.Image}`}
                      alt={founder.Name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-8 lg:space-y-10">
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed italic tracking-wide relative pl-6 md:pl-8 border-l-4 border-indigo-500/70">
                    {founder.Description}
                  </blockquote>

                  <div className="pt-4">
                    <p className="font-serif text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                      {founder.Name}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-1 capitalize">
                      {founder.Roll}
                    </p>
                  </div>

                  <div className="pt-4">
                    <a
                      href={founder.Read_More_Url?.startsWith('http') ? founder.Read_More_Url : `https://${founder.Read_More_Url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-medium rounded-lg text-white bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Read Full Message
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}