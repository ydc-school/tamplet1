"use client";
import { useSchool } from "@/context/SchoolContext";
import { useEffect, useRef, useState } from "react";

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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
    <div
      ref={ref}
      className="flex flex-col items-center text-center gap-3 py-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-400 leading-none">
        {formatted}
        {suffix && <span className="text-2xl md:text-3xl lg:text-4xl align-top">{suffix}</span>}
      </div>
      <div className="h-1 w-10 bg-white/15 rounded-full" />
      <p className="text-sm md:text-base font-medium text-blue-100 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

export default function AchievementsSection() {
  const { schoolInfo, loading } = useSchool();

  const stats = [
    {
      number: schoolInfo?.Experience || "26",
      suffix: "+",
      label: "Years of Excellence",
    },
    {
      number: schoolInfo?.Students || "55000",
      suffix: "+",
      label: "Students Enrolled",
    },
    {
      number: schoolInfo?.Teachers || "3000",
      suffix: "+",
      label: "Expert Faculty",
    },
    {
      number: schoolInfo?.Awards || "255",
      suffix: "+",
      label: "Awards Received",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#01327F] overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-amber-400/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[2px] w-8 bg-amber-400" />
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-[0.2em]">
              By the Numbers
            </span>
            <div className="h-[2px] w-8 bg-amber-400" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our Achievements
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 md:divide-x md:divide-white/10">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3 py-6">
                  <div className="h-12 w-20 bg-white/10 animate-pulse rounded-full" />
                  <div className="h-1 w-10 bg-white/10 animate-pulse rounded-full" />
                  <div className="h-3 w-24 bg-white/10 animate-pulse rounded-full" />
                </div>
              ))
            : stats.map((item, i) => (
                <StatItem
                  key={i}
                  number={item.number}
                  suffix={item.suffix}
                  label={item.label}
                  delay={i * 120}
                />
              ))}
        </div>
      </div>
    </section>
  );
}