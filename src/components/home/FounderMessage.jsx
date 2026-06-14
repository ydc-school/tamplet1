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
      <section className="py-24 bg-surface-container-lowest animate-pulse">
        <div className="max-w-container-max mx-auto px-6 h-96 bg-surface rounded-lg" />
      </section>
    );
  }

  if (founders.length === 0) return null;

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <span className="font-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span> LEADERSHIP
          </span>
          <h2 className="font-headline-lg text-primary text-center">Message from Leadership</h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ 
            clickable: true,
            bulletActiveClass: "!bg-primary !opacity-100"
          }}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          loop={founders.length > 1}
          className="pb-12"
        >
          {founders.map((founder) => (
            <SwiperSlide key={founder.Id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-surface-container-lowest p-8 md:p-16 border border-on-surface/10">
                
                {/* Image Section */}
                {founder.Image && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={`/uploads/${founder.Image}`}
                      alt={founder.Name || "Leadership"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-primary text-on-primary px-6 py-2 font-label-caps text-sm">
                      {founder.Roll}
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="space-y-6">
                  <span className="text-6xl text-primary/20 font-serif">“</span>
                  
                  <div>
                    <h3 className="font-headline-md text-primary">{founder.Name}</h3>
                    <p className="text-secondary font-label-caps">{founder.Roll}</p>
                  </div>

                  <div className="w-16 h-[2px] bg-primary" />

                  <p className="text-secondary leading-relaxed text-lg italic">
                    {founder.Description}
                  </p>

                  {founder.Read_More_Url && (
                    <Link 
                      href={founder.Read_More_Url} 
                      className="inline-flex items-center gap-2 font-label-caps text-primary border-b border-primary pb-1 hover:opacity-70 transition-opacity"
                    >
                      Read Full Message
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}