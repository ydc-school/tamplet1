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
            <SwiperSlide
              key={item.Id || item._id}
              className="!w-[240px] group perspective-1000 select-none"
            >
              <div
                className="
      relative flex items-center justify-center w-[240px] p-[12px] overflow-hidden
      rounded-md group-hover:rounded-3xl
      transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      transform-gpu
      group-hover:scale-105
    "
              >
                <div
                  className="
        absolute h-[160%] w-[160%] rounded-inherit
        bg-gradient-to-r from-red-600 to-blue-900
        origin-center animate-[moving_4.8s_linear_infinite_paused]
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        group-hover:animate-[moving_4.8s_linear_infinite_running]
        group-hover:w-[40%] group-hover:z-[-1]
      "
                />

                <div
                  className="
        relative w-full flex flex-col gap-3 p-1.5 bg-white overflow-hidden z-10
        rounded-[4px] group-hover:rounded-[22px]
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      "
                >
                  <div
                    className="
          bg-red-500 h-16 mx-3
          rounded-sm group-hover:rounded-xl
          flex items-center justify-center
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:bg-red-600
        "
                  >
                    <h2 className="text-white font-extrabold leading-none flex items-baseline">
                      <span className="text-5xl tracking-tighter">
                        {item?.Marks_Percentage || "95.00"}
                      </span>
                      <span className="text-3xl ml-0.5">%</span>
                    </h2>
                  </div>

                  <div
                    className="
          relative h-[320px] bg-gray-100 overflow-hidden
          rounded-sm group-hover:rounded-2xl
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        "
                  >
                    {item?.Image ? (
                      <Image
                        src={`/uploads/${item.Image}`}
                        fill
                        alt={item?.Student_Name}
                        className="
              object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-110
            "
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-300">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="py-2 px-4 text-center">
                    <h2
                      className="
            text-3xl font-black uppercase tracking-wide text-gray-900
            transition-colors duration-300
            group-hover:text-red-600
          "
                    >
                      {item?.Student_Name}
                    </h2>

                    <p className="text-lg font-semibold text-gray-500">
                      {item?.Student_Class || "5th Sem."}
                    </p>

                    <h3
                      className="
            text-2xl font-black text-red-500
            transition-transform duration-300
            group-hover:scale-105
          "
                    >
                      RANK - {item?.Rank}
                    </h3>

                    <h4 className="text-xl font-light text-gray-400">
                      Topper-{item?.Year || "2020"}
                    </h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}