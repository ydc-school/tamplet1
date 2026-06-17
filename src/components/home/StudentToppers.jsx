"use client";
import React, { useState, useEffect } from "react";
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
        if (res.data?.status === "success") {
          // सेफ नेस्टेड डेटा एक्सट्रैक्शन
          const dataArray = res.data.data?.data || res.data.data || [];
          setToppers(dataArray);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && toppers.length === 0) return null;

  // रैंक के आधार पर शार्ट करके टॉपर्स को अलग करना
  const sorted = [...toppers].sort((a, b) => (parseInt(a.Rank) || 99) - (parseInt(b.Rank) || 99));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  // पोडियम अरेंजमेंट: [रैंक 2, रैंक 1, रैंक 3] - रैंक 1 बीच में सबसे ऊंचा दिखेगा
  const podiumOrder = [];
  if (top3[1]) podiumOrder.push({ ...top3[1], position: "second" });
  if (top3[0]) podiumOrder.push({ ...top3[0], position: "first" });
  if (top3[2]) podiumOrder.push({ ...top3[2], position: "third" });

  // प्रीमियम कंस्ट्रक्शन स्केलेटन लोडिंग स्क्रीन
  if (loading) {
    return (
      <section className="bg-[#10213a] py-20 text-center animate-pulse">
        <div className="max-w-md mx-auto space-y-4 mb-16 px-8">
          <div className="h-4 bg-white/10 rounded w-1/3 mx-auto"></div>
          <div className="h-10 bg-white/10 rounded w-3/4 mx-auto"></div>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 items-end px-8 h-80">
          <div className="bg-white/5 h-48 rounded-t-2xl"></div>
          <div className="bg-white/10 h-64 rounded-t-2xl"></div>
          <div className="bg-white/5 h-40 rounded-t-2xl"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#10213a] text-white py-20 md:py-28 overflow-hidden relative">
      {/* सजावटी बैकग्राउंड एलीमेंट्स */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-[#7f1d1d]/20 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <header className="text-center space-y-3 mb-20">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            Hall of Fame
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-tight">
            Our Student Toppers
          </h2>
          <div className="w-20 h-1 bg-[#c4a048] rounded-full mx-auto mt-4" />
        </header>

        {/* MAIN SECTION */}
        <main className="space-y-24">
          
          {/* PODIUM ARCHITECTURE (TOP 3) */}
          {top3.length > 0 && (
            <section 
              aria-label="Academic Podium" 
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-end pt-12"
            >
              {podiumOrder.map((topper) => {
                const isFirst = topper.position === "first";
                const isSecond = topper.position === "second";
                
                return (
                  <article 
                    key={topper.Id} 
                    className={`flex flex-col items-center relative group order-1 ${
                      isFirst ? "md:-translate-y-6 z-20" : "z-10"
                    }`}
                  >
                    {/* सर्कुलर फोटो विद प्रीमियम मैटेलिक रिंग्स */}
                    <figure 
                      className={`relative rounded-full p-1.5 transition-all duration-500 group-hover:scale-105 shadow-2xl ${
                        isFirst 
                          ? "bg-gradient-to-tr from-[#c4a048] via-white to-[#aa842c] w-[130px] h-[130px]" 
                          : "bg-gradient-to-tr from-slate-400 via-white to-slate-500 w-[114px] h-[114px]"
                      }`}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#1e1b4b]">
                        {topper.Image ? (
                          <Link href={`/student/${topper.Id}`} className="block w-full h-full">
                            <Image 
                              src={`/uploads/${topper.Image}`} 
                              alt={topper.Student_Name} 
                              fill 
                              className="object-cover"
                            />
                          </Link>
                        ) : (
                          <span className="w-full h-full flex items-center justify-center font-serif font-bold text-2xl text-white/40">
                            {topper.Student_Name?.charAt(0)}
                          </span>
                        )}
                      </div>

                      {/* रैंक फ्लोटिंग मुकुट / क्राउन बैज */}
                      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-sans font-black uppercase tracking-widest text-white shadow-lg ${
                        isFirst ? "bg-[#c4a048]" : isSecond ? "bg-slate-500" : "bg-[#7f1d1d]"
                      }`}>
                        Rank {isFirst ? "1" : isSecond ? "2" : "3"}
                      </span>
                    </figure>

                    {/* स्टूडेंट बायो कार्ड */}
                    <div className="text-center mt-5 space-y-1.5 w-full">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#c4a048] transition-colors line-clamp-1">
                        {topper.Student_Name}
                      </h3>
                      <p className="font-sans text-xs text-white/60 font-semibold tracking-wide">
                        {topper.Student_Class}
                      </p>
                      
                      {/* शानदार परसेंटेज स्कोर डिस्प्ले */}
                      <div className="py-1">
                        <data 
                          value={topper.Marks_Percentage} 
                          className={`font-sans font-black text-2xl tracking-tight block ${
                            isFirst ? "text-[#c4a048]" : "text-white"
                          }`}
                        >
                          {topper.Marks_Percentage}%
                        </data>
                      </div>

                      {/* बैच वर्ष का टैग */}
                      <span className="inline-block px-4 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/80">
                        Batch {topper.Year}
                      </span>
                    </div>

                    {/* 3D विज़ुअल पोडियम बेस स्टैंड (सिर्फ डेस्कटॉप/टैबलेट ग्रिड पर अलाइन होगा) */}
                    <div 
                      className={`hidden md:block w-full mt-6 border-t border-white/10 transition-all duration-500 rounded-t-xl group-hover:bg-white/10 ${
                        isFirst ? "h-32 bg-white/5" : isSecond ? "h-24 bg-white/[0.03]" : "h-16 bg-white/[0.01]"
                      }`}
                    />
                  </article>
                );
              })}
            </section>
          )}

          {/* ADDITIONAL TOPPERS GRID (RANK 4+) */}
          {rest.length > 0 && (
            <section aria-label="Additional Toppers" className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <h4 className="font-serif text-xl font-bold text-white/90 whitespace-nowrap">Distinction Roll</h4>
                <div className="w-full h-px bg-white/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((topper) => (
                  <article 
                    key={topper.Id} 
                    className="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 p-4 rounded-2xl transition-all duration-300 group"
                  >
                    {/* छोटा गोल थंबनेल */}
                    <figure className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                      {topper.Image ? (
                        <Image 
                          src={`/uploads/${topper.Image}`} 
                          alt={topper.Student_Name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center font-serif font-bold text-sm text-white/30">
                          {topper.Student_Name?.charAt(0)}
                        </span>
                      )}
                    </figure>

                    {/* विवरण टेक्स्ट */}
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="font-sans font-bold text-sm text-white group-hover:text-[#c4a048] transition-colors truncate">
                        {topper.Student_Name}
                      </h3>
                      <p className="font-sans text-xs text-white/50 font-medium">
                        Class {topper.Student_Class} • <span className="text-[#c4a048] font-bold">{topper.Marks_Percentage}%</span>
                      </p>
                      <p className="font-sans text-[10px] text-white/40 font-semibold uppercase tracking-wider">
                        #{topper.Rank} • {topper.Year}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </section>
  );
}