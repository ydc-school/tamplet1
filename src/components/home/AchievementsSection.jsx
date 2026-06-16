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

  const formatted = count.toLocaleString("en-IN");

  return (
    <article ref={ref} style={{ animationDelay: `${delay}ms` }}>
      <data value={count}>
        {formatted}
        {suffix && <span>{suffix}</span>}
      </data>
      <hr />
      <h3>{label}</h3>
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
    <>
      <header>
        <span>By the Numbers</span>
        <h2>Our Achievements</h2>
      </header>

      {loading
        ? Array.from({ length: 4 }).map((_, i) => <article key={i}>Loading...</article>)
        : stats.map((item, i) => (
            <StatItem
              key={i}
              number={item.number}
              suffix={item.suffix}
              label={item.label}
              delay={i * 120}
            />
          ))
      }
    </>
  );
}