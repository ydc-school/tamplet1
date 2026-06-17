"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function StudentProfile({ id, initialStudent = null, initialLoaded = false }) {
  const router = useRouter();
  const [student, setStudent] = useState(initialStudent);
  const [loading, setLoading] = useState(!initialLoaded);

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c4a048]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-8 relative z-10">
        
        <header className="mb-10 text-left">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-[#1e1b4b]/80 hover:text-[#7f1d1d] font-sans font-black text-xs uppercase tracking-widest bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm transition-all duration-300 transform hover:-translate-x-1 focus:outline-none"
          >
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Toppers
          </button>
        </header>

        {loading ? (
          <section aria-busy="true" className="bg-white border border-[#f1f5f9] rounded-[2.5rem] shadow-xl p-12 h-[400px] animate-pulse w-full" />
        ) : !student ? (
          <section role="alert" className="bg-white border border-slate-100 rounded-[2.5rem] p-12 text-center space-y-6 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 bg-amber-50 text-[#c4a048] rounded-full flex items-center justify-center mx-auto text-xl font-bold">!</div>
            <h2 className="font-serif text-2xl font-bold text-[#1e1b4b]">Student Not Found</h2>
            <p className="font-sans text-sm text-slate-500 font-medium">The specified student profile could not be retrieved from the directory.</p>
            <button 
              onClick={() => router.back()} 
              className="bg-[#1e1b4b] hover:bg-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shadow-md"
            >
              Go Back
            </button>
          </section>
        ) : (
          <article className="bg-white border border-[#f1f5f9] rounded-[2.5rem] shadow-xl overflow-hidden p-6 md:p-12 lg:p-16 transition-all duration-500 animate-[fadeIn_0.3s_ease-out]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
              
              <aside className="md:col-span-4 flex flex-col items-center text-center relative group">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/60 p-2 shadow-inner">
                  <figure className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-100">
                    {student.Image ? (
                      <Image 
                        src={`/uploads/${student.Image}`} 
                        alt={student.Student_Name} 
                        fill 
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-103"
                        sizes="(max-w-768px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-serif text-5xl font-black bg-gradient-to-br from-[#1e1b4b]/5 to-[#7f1d1d]/5 text-[#1e1b4b]/30 select-none" aria-label="No photo">
                        {student.Student_Name?.charAt(0)}
                      </div>
                    )}
                  </figure>
                </div>

                {student.Rank && (
                  <div 
                    aria-label={`Rank ${student.Rank}`}
                    className="absolute -bottom-4 bg-gradient-to-r from-[#c4a048] to-[#aa842c] text-white font-sans font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-lg border border-[#c4a048]/20 flex items-center gap-1.5 select-none"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-white/90" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Rank #{student.Rank}
                  </div>
                )}
              </aside>

              <section className="md:col-span-8 space-y-8 pt-4 md:pt-0">
                <div className="space-y-2 text-center md:text-left">
                  <span role="doc-subtitle" className="font-sans font-black text-xs text-[#c4a048] tracking-[0.4em] uppercase block">
                    Student Profile
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e1b4b] tracking-tight leading-none">
                    {student.Student_Name}
                  </h1>
                  <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mx-auto md:mx-0 mt-3" />
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8">
                  <div className="space-y-1">
                    <dt className="font-sans text-[11px] font-black uppercase tracking-wider text-slate-400">Class / Stream</dt>
                    <dd className="font-sans text-sm md:text-base font-bold text-[#1e1b4b]">{student.Student_Class}</dd>
                  </div>
                  
                  <div className="space-y-1">
                    <dt className="font-sans text-[11px] font-black uppercase tracking-wider text-slate-400">Father's Name</dt>
                    <dd className="font-sans text-sm md:text-base font-bold text-[#1e1b4b]">{student.Father_name}</dd>
                  </div>

                  <div className="sm:col-span-2 h-px bg-slate-100/70 my-1" />

                  <div className="space-y-1">
                    <dt className="font-sans text-[11px] font-black uppercase tracking-wider text-slate-400">Academic Session / Batch</dt>
                    <dd className="font-sans text-sm md:text-base font-bold text-[#7f1d1d] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7f1d1d]" />
                      {student.Year}
                    </dd>
                  </div>
                </dl>

                {student.Description && (
                  <section className="space-y-3 pt-2 border-t border-slate-100">
                    <h3 className="font-serif text-lg font-bold text-[#1e1b4b] flex items-center gap-2">
                      About Achievement
                    </h3>
                    <p className="font-sans text-sm md:text-base text-[#0f172a]/75 leading-relaxed font-medium whitespace-pre-line bg-gradient-to-r from-amber-50/40 to-transparent p-4 md:p-6 rounded-2xl border-l-4 border-[#c4a048]">
                      {student.Description}
                    </p>
                  </section>
                )}
              </section>

            </div>
          </article>
        )}
      </div>
    </main>
  );
}