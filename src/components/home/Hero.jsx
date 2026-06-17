"use client";
import React from "react";
import Image from "next/image";
import { useSchool } from "@/context/SchoolContext";
import { useFallbackImage } from "@/hooks/useFallbackImage";

export const Hero = () => {
  const { schoolInfo } = useSchool();
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(
    schoolInfo?.Logo_Url,
    "/logo/logo.png"
  );

  return (
    <section className="bg-gradient-to-br from-[#10213a] via-[#1e1b4b] to-[#0f172a] text-white min-h-[90vh] flex items-center pt-24 pb-16 md:py-32 overflow-hidden relative">
      {/* सिनेमैटिक बैकग्राउंड लाइट्स */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7f1d1d]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c4a048]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN — Brand Identity & Copy (7 Columns) */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1">
          
          {/* Institutional Branding Badge */}
          <figure className="inline-flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 p-1 flex-shrink-0">
              <Image
                src={logoSrc}
                alt={`${schoolInfo?.School_Name ?? "School"} Logo`}
                fill
                className="object-contain"
                onError={handleLogoError}
                unoptimized
              />
            </div>
            <figcaption className="text-left">
              <h2 className="font-serif text-sm md:text-base font-bold text-white tracking-wide">
                {schoolInfo?.School_Name ?? "Yaduvanshi Degree College"}
              </h2>
              <address className="font-sans text-[11px] text-white/60 not-italic font-semibold uppercase tracking-wider">
                {schoolInfo?.City ?? "Mahendergarh"}, {schoolInfo?.State ?? "Haryana"}
              </address>
            </figcaption>
          </figure>

          {/* Core Punchy Heading */}
          <header className="space-y-4">
            <h1 className="font-serif text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
              {schoolInfo?.Motto || "Empowering futures"} through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a048] via-amber-200 to-[#c4a048] font-serif italic not-italic font-normal">
                Holistic Education
              </span>.
            </h1>
            <div className="w-20 h-1.5 bg-[#7f1d1d] rounded-full" />
          </header>

          {/* Description Prose */}
          <main className="space-y-6 max-w-xl">
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed font-medium">
              {schoolInfo?.Address && schoolInfo?.City
                ? `Located at ${schoolInfo.Address}, ${schoolInfo.City}, ${schoolInfo.State} — ${schoolInfo.Pin_Code}. Affiliated with ${schoolInfo.Board_Affiliation ?? "leading boards"}, offering quality ${schoolInfo.Medium_Of_Instruction ?? "English"}-medium education.`
                : "Among the top residential institutions in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust, we offer a serene, pollution-free environment conducive to complete development."
              }
            </p>

            {/* Helpline Floating Banner */}
            <div className="inline-block pt-1">
              <a 
                href={`tel:${schoolInfo?.Contact_Person_Phone || "+918607062323"}`}
                className="inline-flex items-center gap-3 bg-[#7f1d1d]/30 border border-[#7f1d1d]/40 text-rose-200 px-4 py-2.5 rounded-xl font-sans text-sm font-bold tracking-wide transition-colors hover:bg-[#7f1d1d]/50"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Admission Helpline: {schoolInfo?.Contact_Person_Phone ?? schoolInfo?.Alternate_Phone ?? "+91 8607062323"}
              </a>
            </div>

            {/* Micro Interaction CTAs */}
            <nav className="flex flex-wrap items-center gap-4 pt-2">
              <button className="bg-gradient-to-r from-[#c4a048] to-[#aa842c] hover:from-[#7f1d1d] hover:to-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none">
                Apply Now
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-sans font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-md focus:outline-none">
                Explore Courses
              </button>
            </nav>
          </main>
        </div>

        {/* RIGHT COLUMN — Frame & Quick Live Stats (5 Columns) */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center items-center lg:items-end relative">
          
          <aside className="w-full max-w-[480px] space-y-6 group">
            {/* Core Image Showcase Frame */}
            <figure className="relative w-full aspect-[6/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-800">
              <Image
                src="/logo/5.png"
                alt={`${schoolInfo?.School_Name ?? "College"} Campus`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </figure>
            
            {/* Real-time Integrated Counter Stats Card */}
            <section className="bg-gradient-to-br from-white to-[#f8fafc] text-[#1e1b4b] p-5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-4 transform group-hover:translate-y-[-4px] transition-transform duration-300">
              <div className="space-y-0.5">
                <h3 className="font-serif text-xl md:text-2xl font-black tracking-tight text-[#7f1d1d]">
                  {schoolInfo?.Students ? `${schoolInfo.Students}+` : "100%"}
                </h3>
                <p className="font-sans text-[11px] font-black uppercase tracking-wider text-[#1e1b4b]/60">
                  {schoolInfo?.Students ? "Active Students" : "Holistic Growth"}
                </p>
              </div>

              <div className="w-px h-10 bg-[#1e1b4b]/10" />

              <div className="space-y-0.5 text-right">
                <h3 className="font-serif text-xl md:text-2xl font-black tracking-tight text-[#1e1b4b]">
                  {schoolInfo?.Teachers ? `${schoolInfo.Teachers}` : "Expert"}
                </h3>
                <p className="font-sans text-[11px] font-black uppercase tracking-wider text-[#1e1b4b]/60">
                  {schoolInfo?.Teachers ? "Faculty Experts" : "Trust & Legacy"}
                </p>
              </div>

              {schoolInfo?.Experience && (
                <>
                  <div className="w-px h-10 bg-[#1e1b4b]/10" />
                  <div className="space-y-0.5 text-right">
                    <h3 className="font-serif text-xl md:text-2xl font-black tracking-tight text-[#c4a048]">
                      {schoolInfo.Experience}+
                    </h3>
                    <p className="font-sans text-[11px] font-black uppercase tracking-wider text-[#1e1b4b]/60">
                      Years Experience
                    </p>
                  </div>
                </>
              )}
            </section>
          </aside>

        </div>

      </div>
    </section>
  );
};