"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";

export default function WelcomeSection() {
  const [welcomeData, setWelcomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get("/api/client/school-welcome-message");
        if (response.data.status === "success") {
          setWelcomeData(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching welcome message:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWelcomeMessage();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full bg-linear-to-br from-white via-blue-50/30 to-indigo-50/20 py-24 flex items-center justify-center">
        <div className="animate-pulse text-indigo-400 font-medium text-xl">Loading Welcome Message...</div>
      </section>
    );
  }

  if (!welcomeData) return null;

  return (
    <section className="relative w-full bg-linear-to-br from-white via-blue-50/30 to-indigo-50/20 py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Decorative blurred blobs - more dynamic */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-blue-100/40 rounded-full blur-3xl opacity-60 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-indigo-100/50 rounded-full blur-3xl opacity-50 animate-pulse-slow pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text + CTA */}
          <div className="space-y-8 lg:space-y-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800 text-sm font-semibold tracking-wide border border-indigo-200/70 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              DISCOVER YADUVANSHI
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {welcomeData.Title.split('to').map((part, index) => (
                index === 1 ? (
                  <React.Fragment key={index}>
                    to <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                      {part.trim()}
                    </span>
                  </React.Fragment>
                ) : part
              ))}
            </h1>

            <div className="space-y-5 text-lg md:text-xl text-gray-700 leading-relaxed font-medium notice-content">
              <div dangerouslySetInnerHTML={{ __html: welcomeData.Message }} />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={welcomeData.Read_More_Url?.startsWith('http') ? welcomeData.Read_More_Url : `/about`}
                className="group relative inline-flex items-center gap-2 px-8 py-4 font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">Explore Our Legacy</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <button className="px-8 py-4 font-semibold text-indigo-700 bg-white border-2 border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors duration-300">
                Watch Campus Tour
              </button>
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="relative animate-fade-in-up animation-delay-300">
            {/* Main Image Card */}
            <div className="relative rounded-3xl overflow-hidden border-[12px] border-white/90 shadow-2xl shadow-indigo-500/20 transform hover:scale-[1.02] transition-all duration-500 group">
              <Image
                src="/poster/1.jpeg"
                alt="Yaduvanshi Degree College scenic campus view"
                width={1200}
                height={800}
                className="w-full h-[480px] md:h-[560px] lg:h-[620px] object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
                quality={75}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
            </div>

            {/* Floating Stats Badges */}
            <div className="absolute -bottom-8 -left-6 md:-left-10 bg-white/95 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-2xl border border-indigo-100 flex items-center gap-4 transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-lg">
                20+
              </div>
              <div>
                <p className="text-gray-900 font-extrabold text-lg md:text-xl">Years of</p>
                <p className="text-indigo-600 font-bold text-base md:text-lg">Educational Excellence</p>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 md:-right-10 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-blue-100 flex items-center gap-4 transform hover:-translate-y-2 transition-all duration-300 animation-delay-500">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg">
                100%
              </div>
              <div>
                <p className="text-gray-900 font-bold text-base md:text-lg">Holistic</p>
                <p className="text-gray-600 font-medium text-sm md:text-base">Student Development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}