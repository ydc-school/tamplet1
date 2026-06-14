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
      const eased = 1 - Math.pow(1 - progress, 3);
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
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group p-8 border border-on-surface/10 hover:border-primary/30 transition-all duration-500 bg-surface">
      <div className="text-4xl md:text-5xl font-headline-lg text-primary mb-4 flex items-baseline">
        {count.toLocaleString("en-IN")}
        {suffix && <span className="text-2xl text-secondary">{suffix}</span>}
      </div>
      <div className="w-12 h-[2px] bg-primary mb-4 transition-all group-hover:w-20" />
      <p className="font-label-caps text-secondary text-sm tracking-wider">{label}</p>
    </div>
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
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span> BY THE NUMBERS
          </span>
          <h2 className="font-headline-lg text-primary">Our Achievements</h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4].map((i) => <div key={i} className="h-40 bg-surface animate-pulse border border-on-surface/10" />)
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