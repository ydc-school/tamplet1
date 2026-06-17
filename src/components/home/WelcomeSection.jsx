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
        if (res.data?.status === "success") {
          const d = res.data.data;
          setWelcomeData(Array.isArray(d) ? d[0] : d?.data?.[0] ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Premium Loading Skeleton
  if (loading) {
    return (
      <section className="max-w-[1280px] mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-10 bg-slate-200 rounded w-3/4"></div>
          <div className="h-24 bg-slate-200 rounded w-full"></div>
          <div className="h-10 bg-slate-200 rounded w-1/2"></div>
        </div>
        <div className="lg:col-span-5 h-[460px] bg-slate-200 rounded-3xl"></div>
      </section>
    );
  }

  if (!welcomeData) return null;

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN — Text Content & Core Features */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1">
          <header className="space-y-3">
            {/* Eyebrow Gold Tag */}
            <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.3em] uppercase block">
              Welcome to Institution
            </span>
            
            {/* Dynamic H2 Title with First Word Italicized */}
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1e1b4b] leading-tight tracking-tight">
              {welcomeData.Title?.split(" ").map((word, i) => (
                i === 0 ? <em key={i} className="font-serif italic text-[#7f1d1d] not-italic font-normal mr-2">{word}</em> : word + " "
              )) || "Welcome to Our Institution"}
            </h2>
            <div className="w-16 h-1 bg-[#c4a048] rounded-full mt-2" />
          </header>

          {/* Rich Text Message Container */}
          <main className="space-y-6">
            {welcomeData.Message && (
              <div 
                className="font-sans text-base text-[#0f172a]/70 leading-relaxed prose prose-slate max-w-none 
                  prose-p:mb-4 prose-strong:text-[#1e1b4b] prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: welcomeData.Message }} 
              />
            )}

            {/* Feature Badges Grid */}
            <nav aria-label="Core Features" className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {["Quality Education", "Experienced Faculty", "Holistic Development", "Modern Campus"].map((feature) => (
                <div 
                  key={feature} 
                  className="flex items-center gap-3 bg-[#f1f5f9]/50 border border-[#f1f5f9] px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <span className="w-2 h-2 rounded-full bg-[#7f1d1d] group-hover:scale-150 transition-transform" />
                  <span className="font-sans font-semibold text-sm text-[#1e1b4b]/90">{feature}</span>
                </div>
              ))}
            </nav>
          </main>

          {/* Action Footer CTA Link */}
          {welcomeData.Read_More_Url && (
            <footer className="pt-2">
              <Link 
                href={welcomeData.Read_More_Url}
                className="inline-flex items-center gap-2 font-sans text-xs font-black uppercase tracking-widest text-[#1e1b4b] hover:text-[#7f1d1d] transition-colors group"
              >
                Learn More 
                <span className="transform group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
              </Link>
            </footer>
          )}
        </div>

        {/* RIGHT COLUMN — Premium Visual Frame with Dynamic Badge */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <figure className="relative w-full max-w-[460px] aspect-square group">
            {/* Background Organic Layer Effect */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#1e1b4b]/5 to-[#7f1d1d]/5 rounded-[2.5rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            
            {/* Core Image Container */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-xl border border-[#f1f5f9]">
              {welcomeData.Image ? (
                <Image
                  src={`/uploads/${welcomeData.Image}`}
                  alt={welcomeData.Title || "Welcome Visual"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[#1e1b4b] flex items-center justify-center p-8 text-center">
                  <figcaption className="font-serif text-2xl font-bold text-white">
                    {welcomeData.Title || "Empowering Young Minds"}
                  </figcaption>
                </div>
              )}
            </div>

            {/* Floating Gold Experience Card Badge */}
            <aside 
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#c4a048] to-[#aa842c] text-white p-5 md:p-6 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300 z-10"
              style={{ borderRadius: "24px 8px 24px 24px" }}
            >
              <div className="flex items-center gap-3">
                <strong className="font-serif text-3xl md:text-4xl font-black block tracking-tight border-r border-white/20 pr-3">
                  {schoolInfo?.Experience || 26}+
                </strong>
                <span className="font-sans font-black text-[10px] md:text-xs uppercase tracking-widest block leading-tight max-w-[100px]">
                  Years of Excellence
                </span>
              </div>
            </aside>
          </figure>
        </div>

      </div>
    </section>
  );
}