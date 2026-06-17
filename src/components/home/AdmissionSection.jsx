"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function AdmissionSection() {
  const [admissionData, setAdmissionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const response = await axios.get("/api/client/admission-open-message");
        if (response.data.status === "success") {
          const data = response.data.data;
          const finalData = Array.isArray(data) ? data[0] : (data.data ? data.data[0] : null);
          setAdmissionData(finalData);
        }
      } catch (error) {
        console.error("Error fetching admission data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionData();
  }, []);

  // प्रीमियम एडमिशन कंस्ट्रक्शन स्केलेटन लोडर
  if (loading) {
    return (
      <section className="max-w-[1280px] mx-auto px-8 py-20 animate-pulse space-y-8 text-center">
        <div className="w-24 h-4 bg-slate-200 rounded mx-auto"></div>
        <div className="w-2/4 h-10 bg-slate-200 rounded mx-auto"></div>
        <div className="max-w-4xl h-[450px] bg-slate-100 rounded-[2.5rem] mx-auto"></div>
      </section>
    );
  }

  if (!admissionData) return null;

  const titleText = admissionData.Title || "";
  const match = titleText.match(/(.*?)(\d{4}-\d{4})/);
  const mainTitle = match ? match[1].trim() : titleText;
  const yearTitle = match ? match[2] : "";

  return (
    <section className="bg-[#fdfbf7] py-20 md:py-28 overflow-hidden relative">
      {/* एम्बिएंट लक्ज़री बैकग्राउंड रिंग्स */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#c4a048]/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-8 flex flex-col items-center text-center">
        
        {/* HEADER SECTION */}
        <header className="space-y-3 mb-12 max-w-2xl">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            Admissions
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1e1b4b] tracking-tight leading-tight">
            {mainTitle}{" "}
            {yearTitle && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a048] via-amber-500 to-[#aa842c] font-serif italic not-italic font-normal">
                {yearTitle}
              </span>
            )}
          </h2>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mx-auto mt-4" />
        </header>

        {/* WIDE HERO BANNER BLOCK WITH FLOATING BADGE */}
        {admissionData.Image && (
          <figure className="relative w-full max-w-4xl aspect-[16/9.5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#c4a048]/10 bg-slate-100 group mb-12">
            <Image
              src={`/uploads/${admissionData.Image}`}
              alt={admissionData.Title || "Admission Showcase"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-102"
              priority
            />
            {/* "Now Open" लाइव नियॉन फ्लेयर पिल बैज */}
            <span className="absolute top-6 left-6 bg-gradient-to-r from-[#7f1d1d] to-red-700 text-white font-sans font-black text-[11px] uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 z-10 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              Now Open
            </span>
          </figure>
        )}

        {/* RICH TEXT ADMISSION DESCRIPTION PROSE */}
        {admissionData.Message && (
          <main className="max-w-3xl mx-auto mb-12 bg-white border border-[#f1f5f9] rounded-[2rem] shadow-xl p-8 md:p-12 text-left">
            <div 
              className="font-sans text-base text-[#0f172a]/75 leading-relaxed prose prose-slate max-w-none
                prose-p:mb-4 prose-p:last:mb-0 prose-strong:text-[#1e1b4b] prose-strong:font-bold prose-ul:list-disc prose-ul:pl-5"
              dangerouslySetInnerHTML={{ __html: admissionData.Message }} 
            />
          </main>
        )}

        {/* FOOTER SIDE-BY-SIDE HIGH-CONVERSIONS CTAs */}
        <footer className="flex flex-wrap items-center justify-center gap-4 w-full">
          {admissionData.Read_More_Url && (
            <Link 
              href="https://yaduvanshigroup.edu.in/admission-Form"
              className="bg-gradient-to-r from-[#c4a048] to-[#aa842c] hover:from-[#7f1d1d] hover:to-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 min-w-[160px]"
            >
              Apply Now
            </Link>
          )}
          <Link 
            href={admissionData.Read_More_Url || "#"}
            className="bg-white hover:bg-[#1e1b4b]/5 border border-[#1e1b4b]/20 text-[#1e1b4b] font-sans font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all duration-300 min-w-[160px]"
          >
            Learn More
          </Link>
        </footer>

      </div>
    </section>
  );
}