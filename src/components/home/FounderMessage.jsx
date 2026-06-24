"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-coverflow';

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

  // Skeleton Loader (Loading State)
  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (founders.length === 0) return null;

  return (












    <>



      <section className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-16 md:px-8 overflow-hidden">
        <div className="w-full mx-auto">

          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-3xl font-semibold tracking-wider text-amber-600 uppercase">
              Leadership Insights
            </span>
            <h2 className="text-6xl md:text-4xl font-bold text-gray-900 mt-2">
              Message from our Founders
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Swiper Slider */}
          <Swiper
            modules={[Pagination, EffectCoverflow, Navigation, Autoplay]}
            spaceBetween={250}
            slidesPerView={1}
            navigation={true}
            loop={true}
            effect="coverflow"
            centeredSlides={true}


            coverflowEffect={{
              rotate: 0,            // स्लाइड को टेढ़ा (rotate) नहीं करेगा
              stretch: 0,           // स्लाइड्स के बीच का खिंचाव
              depth: 100,           // साइड वाली स्लाइड्स को पीछे धकेलेगा (जिससे सेंटर बड़ा दिखेगा)
              modifier: 2.5,        // इफेक्ट का असर कितना मजबूत होगा (इसे बढ़ाकर सेंटर को और बड़ा कर सकते हैं)
              slideShadows: false,  // साइड स्लाइड्स पर परछाईं (Shadow) बंद/चालू करने के लिए
            }}
            pagination={{ clickable: true }}
            // autoplay={{
            //   delay: 1000,
            //   disableOnInteraction: false,
            // }}

            speed={5000}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            allowTouchMove={true}
            // Responsiveness: lg स्क्रीन पर 3 स्लाइड्स दिखेंगी
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="founders-swiper !pb-14"
          >
            {founders.map((founder) => (
              <SwiperSlide key={founder.Id} className="h-full">
                <div className="  transition-all duration-300 overflow-hidden gap-3 flex flex-col  group">

                  {/* {founder.Name && <h3 className="fm-name">{founder.Name}</h3>}
                  {founder.Roll && <p className="fm-role">{founder.Roll}</p>} */}

                  <div className="fm-divider" />


                  {founder.Roll && <h1 className="text-7xl w-1/2 font-bold font-medium text-gray-800 mb-4"><span className="h-full w-2 bg-blue-500"></span> {founder?.Roll}</h1>}


                  {/* Image Section */}
                  {founder.Image && (
                    <div className="relative w-full bg-deep-maroon  border-7 border-[#6d001d]  min-h-[550px] overflow-hidden">
                      <Image
                        src={`/uploads/${founder.Image}`}
                        alt={founder.Name || "Leadership"}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}


                  {founder.Description && (
                    <p className="text-gray-700 text-4xl py-6 font-headline-md leading-tight">
                      {founder.Description}
                    </p>
                  )}






                  {founder.Read_More_Url && (

                    <Link
                      href={founder.Read_More_Url}
                      className="mt-4 text-4xl inline-block text-amber-600 font-semibold hover:text-amber-800 transition-colors duration-300"
                    >
                      Read More &rarr;
                    </Link>

                  )}



                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation button styling customization via Global Stylesheet or CSS injection */}
        <style jsx global>{`
        .founders-swiper .swiper-button-next,
        .founders-swiper .swiper-button-prev {
          color: #d97706 !important;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .founders-swiper .swiper-button-next:after,
        .founders-swiper .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold;
          font-family: 'Source Sans 3', sans-serif;
        }
        .founders-swiper .swiper-pagination-bullet-active {
          background: #d97706 !important;
        }
      `}</style>




      </section>
    </>
  );
}