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

      <section className="px-6 py-8 space-y-12">

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          spaceBetween={40}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          
         
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="founders-swiper  !pb-14"
        >


          <SwiperSlide className="h-full max-w-2xl">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-l-4 border-rps-navy pl-3">Chairperson's Message</h2>
              <div className="border-2 border-rps-navy p-1">
                <img alt="Chairperson" className="w-full"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLs7txoZUtjUs4fR55P1xxYyJxhgDkUomKLpAw_6-Ra_6tyEbx1EytdQDca7_rHOs5Dx-pqgk_WBlGhV1CZ6xI99l7wiitvf_lIiNNhgZVzNvONpG9Fdlhi8fgJ1mJFaUuiuqNieQMRX3qX5u1oy-CkrPQC_jgwWNRhRLGMOs2oNgNVWKTPwOTceHV1iWUVAHt3H5sGIXLH2neJsBSJySaE0Z9Ala0ixPc_o6ZfKB_TG9SRLANor9--TEwtT" />
              </div>
              <p className="text-sm text-gray-700 sm:text-xl italic">
                "Education has always been regarded as the strongest foundation upon which the future is built. Schools,
                therefore, must be sanctuaries of inspiration—spaces that ignite curiosity, nurture creativity..."
              </p>
              <a className="text-rps-light-blue font-bold text-sm" href="#">+ READ MORE</a>
            </div>

          </SwiperSlide>
          <SwiperSlide className="h-full max-w-2xl">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-l-4 border-rps-navy pl-3">Chairperson's Message</h2>
              <div className="border-2 border-rps-navy p-1">
                <img alt="Chairperson" className="w-full"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLs7txoZUtjUs4fR55P1xxYyJxhgDkUomKLpAw_6-Ra_6tyEbx1EytdQDca7_rHOs5Dx-pqgk_WBlGhV1CZ6xI99l7wiitvf_lIiNNhgZVzNvONpG9Fdlhi8fgJ1mJFaUuiuqNieQMRX3qX5u1oy-CkrPQC_jgwWNRhRLGMOs2oNgNVWKTPwOTceHV1iWUVAHt3H5sGIXLH2neJsBSJySaE0Z9Ala0ixPc_o6ZfKB_TG9SRLANor9--TEwtT" />
              </div>
              <p className="text-sm text-gray-700 sm:text-xl italic">
                "Education has always been regarded as the strongest foundation upon which the future is built. Schools,
                therefore, must be sanctuaries of inspiration—spaces that ignite curiosity, nurture creativity..."
              </p>
              <a className="text-rps-light-blue font-bold text-sm" href="#">+ READ MORE</a>
            </div>

          </SwiperSlide>
          <SwiperSlide className="h-full max-w-2xl">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-l-4 border-rps-navy pl-3">Chairperson's Message</h2>
              <div className="border-2 border-rps-navy p-1">
                <img alt="Chairperson" className="w-full"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLs7txoZUtjUs4fR55P1xxYyJxhgDkUomKLpAw_6-Ra_6tyEbx1EytdQDca7_rHOs5Dx-pqgk_WBlGhV1CZ6xI99l7wiitvf_lIiNNhgZVzNvONpG9Fdlhi8fgJ1mJFaUuiuqNieQMRX3qX5u1oy-CkrPQC_jgwWNRhRLGMOs2oNgNVWKTPwOTceHV1iWUVAHt3H5sGIXLH2neJsBSJySaE0Z9Ala0ixPc_o6ZfKB_TG9SRLANor9--TEwtT" />
              </div>
              <p className="text-sm text-gray-700 sm:text-xl italic">
                "Education has always been regarded as the strongest foundation upon which the future is built. Schools,
                therefore, must be sanctuaries of inspiration—spaces that ignite curiosity, nurture creativity..."
              </p>
              <a className="text-rps-light-blue font-bold text-sm" href="#">+ READ MORE</a>
            </div>

          </SwiperSlide>

        </Swiper>
      </section >

      {/* <section classNameName="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-16 md:px-8 overflow-hidden">
        <div className="w-full mx-auto">

        
          <div className="text-center mb-12">
            <span className="text-3xl font-semibold tracking-wider text-amber-600 uppercase">
              Leadership Insights
            </span>
            <h2 className="text-6xl md:text-4xl font-bold text-gray-900 mt-2">
              Message from our Founders
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          </div>

        
          <Swiper
            modules={[Pagination, EffectCoverflow, Navigation, Autoplay]}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 50,
              modifier: 5,
              slideShadows: false,
              scale: 0.9,
            }}
            breakpoints={{
              0: {
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
            
                <div className="  transition-all duration-300 overflow-hidden gap-3 flex flex-col  group">

                 
                  <div className="fm-divider" />


                  {founder.Roll && <h1 className="text-7xl w-1/2 font-bold font-medium text-gray-800 mb-4"><span className="h-full w-2 bg-blue-500"></span> {founder?.Roll}</h1>}


             
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

      
        <style jsx global>{`
  .founders-swiper {
    overflow: visible !important;
    padding-top: 40px;
    padding-bottom: 60px;
  }

  .founders-swiper .swiper-wrapper {
    align-items: center;
  }

  .founders-swiper .swiper-slide {
    transform: scale(0.8);
    opacity: 0.5;
    transition: all 0.5s ease;
  }

  .founders-swiper .swiper-slide-prev,
  .founders-swiper .swiper-slide-next {
    transform: scale(0.9);
    opacity: 0.8;
  }

  .founders-swiper .swiper-slide-active {
    transform: scale(1.15);
    opacity: 1;
    z-index: 20;
  }

  .founders-swiper .swiper-button-next,
  .founders-swiper .swiper-button-prev {
    color: #d97706 !important;
    background: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .founders-swiper .swiper-button-next:after,
  .founders-swiper .swiper-button-prev:after {
    font-size: 18px !important;
    font-weight: bold;
  }

  .founders-swiper .swiper-pagination-bullet-active {
    background: #d97706 !important;
  }


  .founders-swiper .swiper-slide {
    transform: scale(0.8);
    opacity: 0.5;
    transition: all 0.5s ease;
  }

  .founders-swiper .swiper-slide-prev,
  .founders-swiper .swiper-slide-next {
    transform: scale(0.9);
    opacity: 1;
  }



`}</style>



      </section> */}
    </>
  );
}