import React from "react";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white min-h-[600px] flex items-center pt-16 pb-16 lg:pt-24 lg:pb-24">
      {/* Background radial gradients for dynamic feel (Blue/Indigo theme) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50 via-white to-white">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-60 animate-pulse delay-700"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-indigo-50 blur-3xl opacity-80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">

          {/* ----- Left Content Box ----- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start relative z-10">

            {/* University Tag/Badge */}
            <div className="inline-flex items-center gap-4 bg-white/70 backdrop-blur-md p-2 pr-6 rounded-full border border-gray-100 shadow-sm mb-6 max-w-full">
              <div className="h-14 w-14 relative shrink-0 bg-white rounded-full p-2 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-gray-50 flex items-center justify-center">
                <Image
                  src="/logo/6.png"
                  alt="Yaduvanshi Logo"
                  width={40}
                  height={40}
                  className="rounded-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight uppercase">
                  Yaduvanshi Degree College
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <p className="text-[11px] sm:text-xs font-bold text-gray-500 tracking-wider uppercase">
                    Mahendergarh, Haryana
                  </p>
                </div>
              </div>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight mb-6">
              Empowering futures through <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-400">Holistic Education</span>.
            </h1>

            {/* Sub-Headline Text */}
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-medium mix-blend-multiply">
              Among the top residential Colleges in India. Established under the aegis of Rao Chiranji Lal Samriti Jan Seva Trust. We offer a serene, pollution-free environment conducive to complete child development.
            </p>

            {/* Call Info widget */}
            <div className="flex items-center gap-3 mb-8 group cursor-pointer w-fit bg-blue-50/50 hover:bg-blue-50 px-5 py-2.5 rounded-full transition-all duration-300 border border-blue-100/50">
              <div className="flex h-8 w-8 rounded-full bg-blue-100 text-blue-700 items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              </div>
              <p className="text-blue-800 font-bold text-sm tracking-wide">Admission Helpline: +91 8607062323</p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="group flex-1 sm:flex-none flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold text-lg shadow-[0_8px_20px_-6px_rgba(37,99,235,0.6)] px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(37,99,235,0.8)] focus:ring-4 focus:ring-blue-500/30">
                Apply Now
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </button>

              <button className="flex-1 sm:flex-none flex items-center justify-center bg-white border-2 border-blue-200 hover:border-blue-600 hover:text-blue-700 text-blue-600 font-bold text-lg shadow-sm px-8 py-4 rounded-xl transition-all duration-300 hover:bg-blue-50 focus:ring-4 focus:ring-blue-500/20 active:scale-95">
                Explore Courses
              </button>
            </div>

          </div>

          {/* ----- Right Content / Hero Image ----- */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[550px] mt-10 lg:mt-0 flex items-center justify-center">
            {/* Abstract Background shape behind image */}
            <div className="absolute inset-4 -right-6 lg:-right-10 -bottom-6 lg:-bottom-10 bg-linear-to-br from-blue-100 to-indigo-100 rounded-4xl transform rotate-3 z-0 opacity-70"></div>

            <div className="relative w-full h-[400px] lg:h-[500px] rounded-4xl overflow-hidden shadow-2xl shadow-blue-900/10 z-10 border-[6px] border-white group">
              <Image
                src="/logo/5.png"
                alt="Yaduvanshi Degree College Campus"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />

              <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

              {/* Floating "Campus" Tag */}
              <div className="absolute top-8 -left-1 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-r-xl font-bold text-gray-800 shadow-xl border-y border-r border-gray-100 flex items-center gap-2">
                <span className="text-xl">🏫</span> Top Residential College
              </div>

              {/* Bottom Stats Card overlay */}
              <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/50 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex shrink-0 items-center justify-center text-blue-600 border border-blue-100">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-tight">Holistic Growth</h4>
                  <p className="text-sm font-semibold text-blue-600">Expert Faculty & Trust</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};