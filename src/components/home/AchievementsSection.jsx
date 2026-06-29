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
      <style>{`

        .ach-root {
          width: 100%;
          background: #f3f7fc;
          padding: 72px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Gold top + bottom border */
        .ach-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }
        .ach-root::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,160,72,0.25), transparent);
        }

        /* Radial glow */
        .ach-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,160,72,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .ach-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Eyebrow */
        .ach-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .ach-ey-line {
          width: 48px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,160,72,0.5));
        }
        .ach-ey-line.rev {
          background: linear-gradient(to left, transparent, rgba(196,160,72,0.5));
        }
        .ach-ey-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c4a048;
        }

        .ach-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 34px);
          font-weight: 700;
          color: #10213a;
          text-align: center;
          margin-bottom: 52px;
        }

        /* Grid */
        .ach-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(196,160,72,0.1);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .ach-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Each stat */
        .ach-item {
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          animation: ach-fadein 0.6s ease forwards;
          position: relative;
        }
        .ach-item:hover {
          background: linear-gradient(145deg, #f8fbff 0%, #edf4ff 100%);
        }
        @keyframes ach-fadein {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ach-number {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 800;
          color: #c4a048;
          line-height: 1;
          display: flex;
          align-items: flex-start;
          gap: 2px;
        }
        .ach-suffix {
          font-size: 0.5em;
          font-weight: 700;
          color: #e0c060;
          margin-top: 6px;
        }

        .ach-divider {
          width: 28px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c4a048, transparent);
          border-radius: 2px;
          margin: 14px auto 12px;
        }

        .ach-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #5f7288;
          line-height: 1.4;
        }

        /* Loading skeleton */
        .ach-skel-item {
          background: linear-gradient(90deg, #ffffff 25%, #eef4ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          animation: ach-shimmer 1.5s infinite;
          height: 140px;
        }
        @keyframes ach-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

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
