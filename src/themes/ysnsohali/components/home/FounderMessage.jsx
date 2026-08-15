"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "motion/react";
import { fadeUp } from "@/utils/animtion";





export default function FounderMessage() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://yaduvanshigroup.edu.in/api/client/messages");
        if (response.data.status === "success") {
          const valid = response?.data?.data?.data;
          const sortedMessages = valid.sort((a, b) => {
            return (a.Index_No || 0) - (b.Index_No || 0);
          });

          setFounders(sortedMessages);
        }
      } catch (error) {
        console.error("Error fetching founder messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);


  if (founders.length == 0) return null;



  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-12 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border border-gray-100 rounded-3xl p-6 space-y-6">
              <div className="aspect-[4/5] bg-gray-200 rounded-2xl animate-pulse" />
              <div className="space-y-3">
                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20 bg-gray-50/50 rounded-3xl my-8">
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 bg-rps-navy/5 text-rps-navy px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase">
          <User className="w-4 h-4" /> Leadership Insights
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Messages from our Founders
        </h2>
        <div className="h-1 w-20 bg-rps-navy mx-auto rounded-full" />
      </div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={32}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="founders-swiper !pb-16"
      >
        {founders?.map((founder) => (
          <SwiperSlide key={founder?.Id} className="h-auto">
            <motion.div {...fadeUp} className="flex flex-col h-full bg-white border border-gray-100 rounded-3xl p-6 transition-all duration-300 hover:border-rps-navy/30">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 mb-6">
                <img
                  alt={founder?.Roll || "Founder"}
                  className="w-full h-full object-cover object-center"
                  src={`/uploads/${founder?.Image}`}
                />
              </div>

              <div className="flex flex-col flex-grow space-y-4">
                <h3 className="text-xl font-bold text-gray-950 tracking-tight line-clamp-1">
                  {founder?.Roll}
                </h3>

                {founder?.Description && <div className="relative flex-grow">
                  <p className="text-gray-600 leading-relaxed italic text-base line-clamp-4">
                    "{founder?.Description}"
                  </p>
                </div>}

                {founder?.Read_More_Url && <div className="pt-4 border-t border-gray-100 mt-auto">
                  <Link
                    className="inline-flex items-center gap-2 text-rps-navy font-bold text-sm tracking-wider uppercase group hover:text-rps-light-blue transition-colors duration-200"
                    href={founder?.Read_More_Url}
                  >
                    Read Full Message
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}