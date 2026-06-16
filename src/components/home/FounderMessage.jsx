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
      <section className="fm-root">
        <div className="fm-skeleton" />
      </section>
    );
  }

  if (founders.length === 0) return null;

  return (
    <>
     

      <section className="fm-root">
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

                  {/* Image */}
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

                  {/* Content */}
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
      </section>
    </>
  );
}
