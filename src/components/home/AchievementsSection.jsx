"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSchool } from "@/context/SchoolContext";

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(String(target).replace(/\D/g, "")) || 0;
    if (num === 0) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Smooth Cubic Easing
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, start, duration]);
  return count;
}

function StatItem({ number, label, suffix, delay }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(number, 2200, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formatted = count.toLocaleString("en-IN");

  return (
    <article 
      ref={ref} 
      style={{ animationDelay: `${delay}ms` }}
      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1.5 group animate-[fadeInUp_0.6s_ease-out_both]"
    >
      {/* एनिमेटेड लार्ज नंबर डिस्प्ले */}
      <data 
        value={count}
        className="font-serif text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c4a048] via-amber-200 to-[#aa842c] block selection:bg-transparent"
      >
        {formatted}
        {suffix && (
          <span className="text-[#c4a048] font-sans font-bold text-2xl md:text-3xl ml-0.5 inline-block transform group-hover:scale-110 transition-transform">
            {suffix}
          </span>
        )}
      </data>

      {/* गोल्ड सिल्क हॉरिजॉन्टल डिवाइडर */}
      <hr className="w-12 h-0.5 bg-[#c4a048]/40 border-none my-4 transform group-hover:w-20 transition-all duration-500 rounded-full" />

      {/* स्टेट लेबल */}
      <h3 className="font-sans font-black text-xs md:text-sm uppercase tracking-[0.2em] text-white/80 leading-relaxed max-w-[180px]">
        {label}
      </h3>
    </article>
  );
}

export default function AchievementsSection() {
  const { schoolInfo, loading } = useSchool();

  const stats = [
    { number: schoolInfo?.Experience || "26", suffix: "+", label: "Years of Excellence" },
    { number: schoolInfo?.Students || "55000", suffix: "+", label: "Students Enrolled" },
    { number: schoolInfo?.Teachers || "3000", suffix: "+", label: "Expert Faculty" },
    { number: schoolInfo?.Awards || "255", suffix: "+", label: "Awards Received" },
  ];

  return (
    <section className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#10213a] py-20 md:py-28 overflow-hidden relative">
      {/* सिनेमैटिक बैकग्राउंड लाइट्स */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#7f1d1d]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c4a048]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <header className="text-center space-y-3 mb-16 md:mb-24">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            By the Numbers
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-tight">
            Our Achievements
          </h2>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mx-auto mt-2" />
        </header>

        {/* STATS MATRIX GRID CONTAINER */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-48 bg-white/5 border border-white/10 rounded-[2rem] animate-pulse w-full" 
                />
              ))
            : stats.map((item, i) => (
                <StatItem
                  key={i}
                  number={item.number}
                  suffix={item.suffix}
                  label={item.label}
                  delay={i * 120} // 120ms Staggered Delay Injection
                />
              ))
          }
        </main>

      </div>
    </section>
  );
}