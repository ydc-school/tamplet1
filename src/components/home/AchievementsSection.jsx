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
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formatted = count.toLocaleString("en-IN");

  return (
    <div ref={ref} className="ach-item" style={{ animationDelay: `${delay}ms` }}>
      <div className="ach-number">
        {formatted}
        {suffix && <span className="ach-suffix">{suffix}</span>}
      </div>
      <div className="ach-divider" />
      <p className="ach-label">{label}</p>
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
    <>
    
      <section className="ach-root">
        <div className="ach-glow" />
        <div className="ach-inner">

          <div className="ach-eyebrow">
            <div className="ach-ey-line" />
            <span className="ach-ey-text">By the Numbers</span>
            <div className="ach-ey-line rev" />
          </div>
          <h2 className="ach-heading">Our Achievements</h2>

          <div className="ach-grid">
            {loading
              ? [1, 2, 3, 4].map((i) => <div key={i} className="ach-skel-item" />)
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
          </div>

        </div>
      </section>
    </>
  );
}
