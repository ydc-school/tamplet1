"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function FounderMessage() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/client/messages")
      .then((res) => {
        if (res.data?.status === "success") setFounders(res.data.data.data || []);
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <article>Loading leadership message...</article>;
  if (founders.length === 0) return null;

  return (
    <article>
      <header>
        <span>Message from Leadership</span>
      </header>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={founders.length > 1 ? { delay: 6000, disableOnInteraction: false } : false}
        loop={founders.length > 1}
      >
        {founders.map((founder) => (
          <SwiperSlide key={founder.Id}>
            <section>
              {founder.Image && (
                <figure>
                  <Image
                    src={`/uploads/${founder.Image}`}
                    alt={founder.Name || "Leadership"}
                    width={340}
                    height={400}
                  />
                  <span>{founder.Roll}</span>
                </figure>
              )}

              <blockquote>
                <h3>{founder.Name}</h3>
                <p>{founder.Roll}</p>
                <p>{founder.Description}</p>
              </blockquote>

              {founder.Read_More_Url && (
                <footer>
                  <Link href={founder.Read_More_Url}>Read Full Message &rarr;</Link>
                </footer>
              )}
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  );
}