"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import slugify from "@/utils/slugify";

export default function HistorySection() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/pages/history")
      .then((res) => {
        if (res.data.status === "success") setHistory(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !history) return null;

  const historyHref = history.Id
    ? `/pages/${slugify(history.Name || "history")}/${history.Id}`
    : "#";

  return (
    <section className="bg-[#f6f8fc] py-20 md:py-28 overflow-hidden relative">
      {/* सजावटी वाटरमार्क या बैकग्राउंड लेयर */}
      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-[#1e1b4b]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT PANEL — Header & Legacy Badge (4 Columns) */}
        <header className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
          {/* Eyebrow Premium Gold Tag */}
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            Our Legacy
          </span>
          
          {/* Main Title with Styled Italicized Branding */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e1b4b] leading-tight tracking-tight">
            History of <em className="font-serif italic text-[#c4a048] not-italic font-normal">Yaduvanshi</em>
          </h2>
          
          <div className="w-12 h-1 bg-[#7f1d1d] rounded-full my-4" />

          {/* Academic Established Stamp Seal */}
          <div className="pt-2">
            <time 
              dateTime="1998"
              className="inline-flex items-center gap-2.5 bg-white border border-[#f1f5f9] shadow-md px-4 py-2 rounded-full font-sans text-xs font-black uppercase tracking-widest text-[#1e1b4b]"
            >
              <span className="w-2 h-2 rounded-full bg-[#7f1d1d]" />
              Est. 1998
            </time>
          </div>
        </header>

        {/* RIGHT PANEL — Rich HTML Prose Content & Action CTA (8 Columns) */}
        <div className="lg:col-span-8 space-y-8 bg-white border border-[#f1f5f9] rounded-[2rem] shadow-xl p-8 md:p-12 relative">
          
          {/* Main Content Area */}
          <main>
            {history.Page_Data && (
              <div 
                className="font-sans text-base text-[#0f172a]/75 leading-relaxed prose prose-slate max-w-none
                  prose-p:mb-5 prose-p:last:mb-0 prose-strong:text-[#1e1b4b] prose-strong:font-bold prose-headings:font-serif prose-headings:text-[#1e1b4b]"
                dangerouslySetInnerHTML={{ __html: history.Page_Data }} 
              />
            )}
          </main>

          {/* Footer Action Navigation Link */}
          <footer className="pt-4 border-t border-[#f1f5f9] flex justify-end">
            <Link 
              href={historyHref}
              className="inline-flex items-center gap-2 bg-[#1e1b4b] hover:bg-[#7f1d1d] text-white text-xs font-black uppercase tracking-widest px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              Read More
              <svg 
                width="14" 
                height="14" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </footer>
          
        </div>

      </div>
    </section>
  );
}