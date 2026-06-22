"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';



export default function StudentToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res.data.status === "success") setToppers(res.data.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);
  if (!loading && toppers.length === 0) return null;
  return (
    <>
      <div className="w-full h-screen bg-green-700 flex flex-col items-center justify-center gap-4">
        {loading ? (
          <div className="text-white text-xl font-semibold">Loading Toppers...</div>
        ) : (
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={2}
            centeredSlides={true}
            spaceBetween={50}
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="w-full h-96 rounded-lg flex items-center justify-start"
          >
            {toppers.map((topper) => (
              <SwiperSlide key={topper.Id} className="w-full h-full flex flex-col items-center justify-center bg-[#6d001d] text-white p-4">
                <div className="flex flex-col items-center gap-3 w-full h-full justify-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden fallback-bg-gray">
                    {topper.Image ? (
                      <Image
                        src={`/uploads/${topper.Image}`}
                        alt={topper.Student_Name || "Topper"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-amber-500 flex items-center justify-center text-2xl font-bold">
                        {topper.Student_Name?.charAt(0)?.toUpperCase() || "S"}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold tracking-wide">
                      {topper.Student_Name || "No Name"}
                    </h3>
                    <p className="text-sm opacity-90">
                      S/O: {topper.Father_Name || "N/A"}
                    </p>
                    <span className="inline-block mt-1 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider">
                      Rank: #{topper.Rank || "-"}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}