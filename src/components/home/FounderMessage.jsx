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
    <section>
      <div>
        <div>
          <div />
          <span>Message from Leadership</span>
          <div />
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={founders.length > 1 ? { delay: 6000, disableOnInteraction: false } : false}
          loop={founders.length > 1}
        >
          {founders.map((founder) => (
            <SwiperSlide key={founder.Id}>
              <div>
                <div />

                {/* Image */}
                {founder.Image && (
                  <div>
                    <Image
                      src={`/uploads/${founder.Image}`}
                      alt={founder.Name || "Leadership"}
                      fill
                      sizes="(max-width: 767px) 100vw, 340px"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                    {founder.Roll && <span>{founder.Roll}</span>}
                  </div>
                )}

                {/* Content */}
                <div>
                  <span>&quot;</span>

                  {founder.Name && <h3>{founder.Name}</h3>}
                  {founder.Roll && <p>{founder.Roll}</p>}

                  <div />

                  {founder.Description && <p>{founder.Description}</p>}

                  {founder.Read_More_Url && (
                    <Link href={founder.Read_More_Url}>
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
  );
}
