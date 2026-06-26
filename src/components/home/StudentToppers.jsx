"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";

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

  if (toppers.length === 0) return null;

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
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative">
        
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 w-full overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          id="testimonialCarousel"
        >
          {sortedToppers.map((item) => (
            <div
              key={item.Id || item._id}
              className="w-[250px] shrink-0 snap-center opacity-100 translate-y-0 transition-all duration-1000"
            >
              <div
                className={`bg-[#fef8f6] text-white flex flex-col-reverse border border-[#34291e]/15 [box-shadow:0px_4px_20px_rgba(75,63,51,0.08)] transform ${
                  item.rotateClass || ""
                } -translate-y-2 transition-all duration-500 group relative [background-image:url('https://www.transparenttextures.com/patterns/natural-paper.png')]`}
              >
                {/* Topper Details */}
                <blockquote className="font-serif text-[18px] flex flex-col text-center bg-academic-teal leading-[1.5] text-white mb-3 relative z-10 italic pt-2 px-3">
                  <h4 className="font-bold">{item?.Student_Name || "Topper"}</h4>
                  <h4 className="text-sm opacity-90">{item?.Student_Class}</h4>
                  <h4 className="text-lg font-semibold mt-1 text-yellow-400">
                    {item?.Marks_Percentage}
                  </h4>
                </blockquote>

                {/* Topper Image Container */}
                <div className="flex items-center p-3">
                  <div className="w-full h-52 bg-[#4b3f33] overflow-hidden rounded-lg border border-[#34291e]/10 relative">
                    {item?.Image ? (
                      <Image
                        className="object-cover [filter:grayscale(1)_sepia(0.3)_contrast(1.1)]"
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center mt-12">
          <div className="flex gap-3">
            <button
              className="w-12 h-12 flex items-center justify-center border border-[#34291e]/20 text-[#34291e] hover:bg-[#34291e] hover:text-white transition-all duration-300 rounded-full"
              onClick={() => scrollCarousel(-1)}
              aria-label="Previous topper"
            >
              <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0 l7-7m-7 7h18" />
              </svg>
            </button>
            <button
              className="w-12 h-12 flex items-center justify-center border border-[#34291e]/20 text-[#34291e] hover:bg-[#34291e] hover:text-white transition-all duration-300 rounded-full"
              onClick={() => scrollCarousel(1)}
              aria-label="Next topper"
            >
              <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <div className="font-sans text-[12px] font-semibold tracking-widest text-[#7f756d] hidden md:block uppercase">
            Toppers Gallery
          </div>
        </div>

      </div>
    </section>
  );
}