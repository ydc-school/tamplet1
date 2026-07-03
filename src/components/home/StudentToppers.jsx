"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";



import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules


// optional: Agar navigation/pagination features chahiye to modules import karein
import { Pagination, Autoplay } from 'swiper/modules';







export default function StudentToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res.data.status === "success") {
          // Response data check aur ranking logic safe execution ke liye
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

  if (!toppers.length === 0) return null;

  // Data ko display karne se pehle Rank wise sort kar rahe hain
  const sortedToppers = [...toppers].sort(
    (a, b) => (parseInt(a.Rank) || 99) - (parseInt(b.Rank) || 99)
  );

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>




     
      <section className="py-12 px-6 bg-academic-teal w-full">
        {/* Optional: Section Title */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-headline-lg font-bold text-white">Our Top Performers</h2>
          <p className="text-label-sm  text-white">Proud moments of our brilliant students</p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={'auto'}
          centeredSlides={false}
          grabCursor={true}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="mySwiper !pb-12" // Padding bottom taaki pagination dots card se na chipke
        >
          {/* Slide 1 */}

          {sortedToppers.map((item) => (

            <SwiperSlide key={item.Id || item._id} className="!w-[200px]">
              <div className="bg-white  overflow-hidden   transition-shadow duration-300   h-[380px] flex flex-col">
                {/* Image Wrapper */}
                <div className="w-full h-[60%]  flex items-center justify-center text-slate-400 text-sm font-medium relative">

                  {item?.Image ? (
                    <Image
                      className="object-cover"
                      src={`/uploads/${item.Image}`}
                      alt={item?.imgAlt || item?.Student_Name || "Topper Image"}
                      fill
                      sizes="250px"
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                  {/* Badge */}
                  <span className="absolute top-3 right-3  text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    Rank 1
                  </span>
                </div>
                {/* Content Wrapper */}
                <div className="p-5 flex flex-col justify-between flex-grow text-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 truncate">{item?.Student_Name || "Topper"}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">S/O {item?.Father_name}</p>
                  </div>
                  <div className=" py-2 mt-2">
                    <span className="text-xs font-semibold text-indigo-600 block uppercase tracking-wider">Score</span>
                    <h2 className="text-2xl font-extrabold text-indigo-700"> {item?.Marks_Percentage}</h2>
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