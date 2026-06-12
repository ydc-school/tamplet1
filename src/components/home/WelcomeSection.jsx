"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";

export default function WelcomeSection() {
  const [welcomeData, setWelcomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { schoolInfo } = useSchool();

  useEffect(() => {
    axios
      .get("/api/client/school-welcome-message")
      .then((res) => {
        if (res.data.status === "success") {
          const d = res.data.data;
          setWelcomeData(Array.isArray(d) ? d[0] : d?.data?.[0] ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="h-72 md:h-96 bg-[#01327F]/5 animate-pulse rounded-2xl" />
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 bg-[#01327F]/10 animate-pulse rounded-full" />
            <div className="h-10 w-3/4 bg-[#01327F]/10 animate-pulse rounded-full" />
            <div className="h-4 w-full bg-[#01327F]/10 animate-pulse rounded-full" />
            <div className="h-4 w-5/6 bg-[#01327F]/10 animate-pulse rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  if (!welcomeData) return null;

  const hasImage = welcomeData.Image && welcomeData.Image.trim() !== "";

  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-8 bg-amber-400" />
            <span className="text-[#01327F] font-semibold text-sm uppercase tracking-[0.2em]">
              Welcome
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#01327F] leading-tight">
            {welcomeData.Title
              ? welcomeData.Title.split(" ").map((word, i) =>
                  i === 0 ? (
                    <em key={i} className="italic text-amber-500 not-italic font-extrabold mr-2">
                      {word}
                    </em>
                  ) : (
                    word + " "
                  )
                )
              : "Welcome to Our Institution"}
          </h2>

          <div className="h-1 w-16 bg-amber-400 rounded-full" />

          {welcomeData.Message && (
            <div
              className="text-slate-600 text-sm md:text-base leading-relaxed [&_p]:mb-3 [&_a]:text-[#01327F] [&_a]:font-medium [&_strong]:text-[#01327F]"
              dangerouslySetInnerHTML={{ __html: welcomeData.Message }}
            />
          )}

          <div className="flex flex-wrap gap-3 md:gap-4">
            {["Quality Education", "Experienced Faculty", "Holistic Development", "Modern Campus"].map((p) => (
              <span
                key={p}
                className="flex items-center gap-2 text-sm font-medium text-[#01327F] bg-[#01327F]/5 px-4 py-2 rounded-full"
              >
                <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                {p}
              </span>
            ))}
          </div>

          {welcomeData.Read_More_Url && (
            <Link
              href={welcomeData.Read_More_Url}
              className="inline-flex items-center gap-2 self-start mt-2 bg-[#01327F] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#02418f] transition-colors"
            >
              Learn More
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* Image / Decorative */}
        <div className="order-1 md:order-2 relative">
          {hasImage ? (
            <div className="relative w-full h-72 md:h-96 lg:h-[28rem] rounded-2xl bg-[#01327F]/5 overflow-hidden">
              <Image
                src={`/uploads/${welcomeData.Image}`}
                alt={welcomeData.Title || "Welcome"}
                fill
                sizes="(max-width: 899px) 100vw, 460px"
                priority
                style={{ objectFit: "contain" }}
              />
              <div className="absolute bottom-4 right-4 bg-[#01327F] text-white rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-amber-400">
                  {schoolInfo?.Experience}+
                </div>
                <div className="text-xs md:text-sm font-medium text-blue-100">
                  Years of Excellence
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full min-h-72 md:min-h-96 lg:min-h-[28rem] rounded-2xl bg-[#01327F] flex flex-col items-center justify-center text-center px-8 py-12 gap-6 overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-400/10" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/5" />

              <svg
                width="56"
                height="56"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                className="text-amber-400 relative z-10"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>

              <p className="text-white text-lg md:text-xl font-semibold leading-relaxed max-w-xs relative z-10">
                &quot;{welcomeData.Title || "Empowering Young Minds for a Better Tomorrow"}&quot;
              </p>

              <div className="self-start ml-8 relative z-10">
                <div className="text-3xl font-extrabold text-amber-400">26+</div>
                <div className="text-sm font-medium text-blue-100">Years of Excellence</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}