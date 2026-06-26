"use client";
import React, { useState, useEffect ,useRef} from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";


export default function StudentToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res.data.status === "success") setToppers(res.data.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && toppers.length === 0) return null;

  // Sort by rank if available
  const sorted = [...toppers].sort((a, b) => (parseInt(a.Rank) || 99) - (parseInt(b.Rank) || 99));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  const medalColors = {
    1: { bg: "#c4a048", text: "#f6f8fc", label: "Gold" },
    2: { bg: "#94a3b8", text: "#f6f8fc", label: "Silver" },
    3: { bg: "#b87333", text: "#fff", label: "Bronze" },
  };







const carouselRef = useRef(null);

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
    



 <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1200px]  mx-auto px-12 relative">
        
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 w-screen overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          id="testimonialCarousel"
        >
          {toppers.map((item) => (
            <div
              key={item.id}
              className="w-[250px] snap-center opacity-100 translate-y-0 transition-all duration-1000"
            >
              <div
                className={`bg-[#fef8f6] text-white  bg-academic-teal flex flex-col-reverse  border border-[#34291e]/15 [box-shadow:0px_4px_20px_rgba(75,63,51,0.08)] transform ${item.rotateClass} -translate-y-2 transition-all duration-500 group relative [background-image:url('https://www.transparenttextures.com/patterns/natural-paper.png')]`}
              >

                {/* Custom SVG Quote Icon */}
               

                <blockquote className="font-serif text-[20px] flex flex-col text-center bg-academic-teal leading-[1.5] text-white  mb-3 relative z-10 italic pt-2">
                       <h4>{item?.Student_Name || "Topper"}</h4>
                       <h4>{item?.Student_Class}</h4>
                       <h4>{item?.Marks_Percentage}</h4>
                </blockquote>

                <div className="flex items-center ">
                  <div className="w-full h-52 bg-[#4b3f33] overflow-hidden rounded-lg border border-[#34291e]/10 relative">
                    <Image
                      className="w-full h-full object-fill [filter:grayscale(1)_sepia(0.3)_contrast(1.1)]"
                      src={`/uploads/${item?.Image}`}
                      alt={item?.imgAlt}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                   
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
              className="w-12 h-12 flex items-center justify-center border border-[#34291e]/20 text-[#34291e] hover:bg-[#34291e] hover:text-white transition-all duration-300"
              onClick={() => scrollCarousel(-1)}
              aria-label="Previous testimonial"
            >
              {/* Back Arrow SVG */}
              <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0 l7-7m-7 7h18" />
              </svg>
            </button>
            <button
              className="w-12 h-12 flex items-center justify-center border border-[#34291e]/20 text-[#34291e] hover:bg-[#34291e] hover:text-white transition-all duration-300"
              onClick={() => scrollCarousel(1)}
              aria-label="Next testimonial"
            >
              {/* Forward Arrow SVG */}
              <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <div className="font-sans text-[12px] font-semibold tracking-widest text-[#7f756d] hidden md:block uppercase">
            Navigation 01 — 03
          </div>
        </div>

      </div>
    </section>




     
    </>
  );
}