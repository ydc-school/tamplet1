"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Parallax, Navigation } from 'swiper/modules';
import axios from "axios";
import Link from "next/link";



import 'swiper/css/navigation';


// import required modules
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
      <section className="fm-root">
        <div className="fm-skeleton" />
      </section>
    );
  }

  // if (founders.length === 0) return null;

  return (
    <>

      <style>{`



.swiper {
  width: 100%;
  height: 100%;
  background: #000;
}

.swiper-slide {
  font-size: 18px;
  color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 40px 60px;
}

.parallax-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 130%;
  height: 100%;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center;
}

.swiper-slide .title {
  font-size: 41px;
  font-weight: 300;
}

.swiper-slide .subtitle {
  font-size: 21px;
}

.swiper-slide .text {
  font-size: 14px;
  max-width: 400px;
  line-height: 1.3;
}

      `}</style>


      <section className="w-screen h-auto ">
        <>
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }}
            speed={600}
            parallax={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Parallax, Pagination, Navigation]}
            className="mySwiper"
          >
            <div
              slot="container-start"
              className="parallax-bg"
              style={{
                'background-image':
                  'url(https://swiperjs.com/demos/images/abstract-1.jpg)',
              }}
              data-swiper-parallax="-23%"
            ></div>

            <SwiperSlide className=" flex flex-col sm:flex-row  items-center justify-center  bg-gray-800" >
              <div className="flex flex-col items-center justify-center h-full ">
                <div className="" data-swiper-parallax="-300">
                  Slide 3
                </div>
                <div className="" data-swiper-parallax="-200">
                  Subtitle
                </div>
                <div className="text" data-swiper-parallax="-100">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                    dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                    laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                    Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                    Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                    ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                    tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                  </p>
                </div>
              </div>


              <div className="w-full mt-8 h-52 bg-amber-800">f</div>

            </SwiperSlide>
          </Swiper>
        </>

      </section>













      {/* <section className="fm-root">
        <div className="fm-inner">

          <div className="fm-eyebrow">
            <div className="fm-ey-line" />
            <span className="fm-ey-text">Message from Leadership</span>
            <div className="fm-ey-line rev" />
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={founders.length > 1 ? { delay: 6000, disableOnInteraction: false } : false}
            loop={founders.length > 1}
            className="fm-swiper"
          >
            {founders.map((founder) => (
              <SwiperSlide key={founder.Id}>
                <div className="fm-card">
                  <div className="fm-strip" />

                 
                  {founder.Image && (
                    <div className="fm-img-col">
                      <Image
                        src={`/uploads/${founder.Image}`}
                        alt={founder.Name || "Leadership"}
                        fill
                        sizes="(max-width: 767px) 100vw, 340px"
                        className="object-cover object-top"
                      />
                      {founder.Roll && (
                        <span className="fm-role-badge">{founder.Roll}</span>
                      )}
                    </div>
                  )}

             
                  <div className="fm-content">
                    <span className="fm-quote-mark">&quot;</span>

                    {founder.Name && <h3 className="fm-name">{founder.Name}</h3>}
                    {founder.Roll && <p className="fm-role">{founder.Roll}</p>}

                    <div className="fm-divider" />

                    {founder.Description && (
                      <p className="fm-description">{founder.Description}</p>
                    )}

                    {founder.Read_More_Url && (
                      <Link href={founder.Read_More_Url} className="fm-read-more">
                        Read Full Message
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section> */}
    </>
  );
}
