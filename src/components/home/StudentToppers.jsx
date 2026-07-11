"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';

export default function StudentToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res.data.status === "success") {
          const fetchedData = res.data.data?.data || res.data.data || [];
          setToppers(fetchedData);
        }
      })
      .catch((err) => {
        console.error("Error fetching toppers data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-[#7f756d]">
        Loading Toppers...
      </div>
    );
  }

  if (toppers.length === 0) return null;

  const sortedToppers = [...toppers].sort(
    (a, b) => (parseInt(a.Rank) || 99) - (parseInt(b.Rank) || 99)
  );

  return (
    <>
      <section className="py-12 px-6 bg-academic-teal w-full">
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-headline-lg font-bold text-white">Our Top Performers</h2>
          <p className="text-label-sm text-white">Proud moments of our brilliant students</p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, FreeMode]}
          spaceBetween={24}
          slidesPerView={'auto'}
          centeredSlides={false}
          grabCursor={true}
          loop={sortedToppers.length > 2}
          freeMode={true}
          speed={4000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="mySwiper !pb-12 [&>.swiper-wrapper]:!ease-linear"
        >
          {sortedToppers.map((item) => (
            <SwiperSlide key={item.Id || item._id} className="!w-[240px]">
              <div className="bg-white  p-1 rounded-xl overflow-hidden shadow-sm">

                {/* Percentage */}
                <div className="bg-red-500 h-16 flex mx-4 rounded-xl items-center justify-center">
                  <h2 className="text-white font-extrabold  leading-none">
                    <span className="text-5xl">
                      {item?.Marks_Percentage || "95.00"}
                    </span>
                    <span className="text-4xl">%</span>
                  </h2>
                </div>

                {/* Image */}
                <div className="relative h-[320px] bg-gray-200 rounded-xl overflow-hidden">
                  {item?.Image ? (
                    <Image
                      src={`/uploads/${item.Image}`}
                      fill
                      className="object-cover"
                      alt={item?.Student_Name}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="py-2 px-4 text-center">

                  <h2 className="text-3xl font-black uppercase tracking-wide text-gray-900">
                    {item?.Student_Name}
                  </h2>

                  <p className="text-lg font-semibold text-gray-600 ">
                    {item?.Student_Class || "5th Sem."}
                  </p>

                  <h3 className="text-2xl font-extrabold text-red-500">
                    RANK - {item?.Rank}
                  </h3>

                  <h4 className="text-xl font-light text-gray-800">
                    Topper-{item?.Year || "2020"}
                  </h4>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}