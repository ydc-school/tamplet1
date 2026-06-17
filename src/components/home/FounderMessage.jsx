"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper core styles
import "swiper/css";
import "swiper/css/pagination";

export default function FounderMessage() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/client/messages")
      .then((res) => {
        if (res.data?.status === "success") {
          const dataArray = res.data.data?.data || res.data.data || [];
          setFounders(dataArray);
        }
      })
      .catch((err) => console.error("Error loading leadership messages:", err))
      .finally(() => setLoading(false));
  }, []);

  // Premium Management Loading Grid
  if (loading) {
    return (
      <section className="max-w-[1280px] mx-auto px-8 py-20 animate-pulse">
        <div className="w-1/4 h-4 bg-slate-200 rounded mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-slate-50 p-8 rounded-[2.5rem]">
          <div className="md:col-span-4 h-[400px] bg-slate-200 rounded-3xl"></div>
          <div className="md:col-span-8 space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-24 bg-slate-200 rounded w-full"></div>
          </div>
        </div>
      </section>
    );
  }

  if (founders.length === 0) return null;

  return (
    <section className="bg-[#f8fafc] py-20 md:py-28 overflow-hidden relative">
      {/* सजावटी बैकग्राउंड एलीमेंट्स */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#1e1b4b]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#7f1d1d]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* HEADER SECTION */}
        <header className="text-center space-y-3 mb-16">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            Message from Leadership
          </span>
          <div className="w-12 h-0.5 bg-[#7f1d1d] rounded-full mx-auto mt-2" />
        </header>

        {/* SWIPER CAROUSEL CONTAINER */}
        <div className="max-w-5xl mx-auto [&_.swiper-pagination-bullet-active]:bg-[#7f1d1d] [&_.swiper-pagination-bullet]:mx-1.5 [&_.swiper-pagination]:!bottom-0 pb-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={founders.length > 1 ? { delay: 6000, disableOnInteraction: false } : false}
            loop={founders.length > 1}
            className="w-full"
          >
            {founders.map((founder) => (
              <SwiperSlide key={founder.Id} className="px-1 py-2">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center bg-white border border-[#f1f5f9] rounded-[2.5rem] shadow-xl p-6 md:p-10 lg:p-12">
                  
                  {/* LEFT COLUMN — PORTRAIT FRAME WITH BADGE (4 Columns) */}
                  {founder.Image && (
                    <figure className="md:col-span-4 relative w-full max-w-[340px] aspect-[34/40] mx-auto group flex-shrink-0">
                      {/* एम्बिएंट शैडो लेयर */}
                      <div className="absolute -inset-2 bg-gradient-to-tr from-[#1e1b4b]/10 to-[#7f1d1d]/10 rounded-[2rem] transform -rotate-2 opacity-60 group-hover:rotate-0 transition-transform duration-500" />
                      
                      {/* इमेज एंकर बॉक्स */}
                      <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-lg border border-[#f1f5f9]">
                        <Image
                          src={`/uploads/${founder.Image}`}
                          alt={founder.Name || "Leadership"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-103"
                          priority
                        />
                      </div>
                      
                      {/* फ्लोटिंग रोल डिग्निटी टैग */}
                      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#7f1d1d] text-white text-[10px] font-sans font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg border border-white/10 whitespace-nowrap z-10">
                        {founder.Roll || "Management"}
                      </span>
                    </figure>
                  )}

                  {/* RIGHT COLUMN — TEXT ESSAY BLOCKQUOTE (8 Columns) */}
                  <blockquote className={`space-y-6 md:col-span-8 text-left ${!founder.Image ? "md:col-span-12" : ""}`}>
                    
                    {/* सुलेख चिन्ह (Decorative Quote Mark Visual) */}
                    <span className="font-serif text-6xl text-[#c4a048]/20 block h-6 leading-none -ml-4 pointer-events-none">
                      “
                    </span>

                    {/* लीडर प्रोफाइल डिटेल्स */}
                    <header className="space-y-1">
                      <h3 className="font-serif text-2xl md:text-3xl font-black text-[#1e1b4b]">
                        {founder.Name}
                      </h3>
                      <p className="font-sans text-xs md:text-sm text-[#c4a048] font-bold uppercase tracking-widest">
                        {founder.Roll}
                      </p>
                    </header>

                    {/* कोर मैसेज पैराग्राफ */}
                    <div className="relative">
                      <p className="font-sans text-base text-[#0f172a]/75 leading-relaxed font-medium line-clamp-6 md:line-clamp-none">
                        {founder.Description}
                      </p>
                    </div>

                    {/* एक्शन रीड मोर ट्रिगर लिंक */}
                    {founder.Read_More_Url && (
                      <footer className="pt-2">
                        <Link 
                          href={founder.Read_More_Url}
                          className="inline-flex items-center gap-2 font-sans text-xs font-black uppercase tracking-widest text-[#1e1b4b] hover:text-[#7f1d1d] transition-colors group"
                        >
                          Read Full Message 
                          <span className="transform group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                        </Link>
                      </footer>
                    )}
                  </blockquote>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}