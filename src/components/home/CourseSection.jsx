"use client";
import React from "react";

export default function CourseSection() {
  const courses = [
    {
      id: 1,
      title: "Bachelor of Arts (B.A.)",
      desc: "A comprehensive undergraduate program focusing on humanities, arts, and social sciences.",
      icon: "📚"
    },
    {
      id: 2,
      title: "Bachelor of Science (B.Sc.)",
      desc: "Specialized undergraduate program designed for students with strong aptitude for scientific disciplines.",
      icon: "🔬"
    },
    {
      id: 3,
      title: "Bachelor of Commerce (B.Com)",
      desc: "Foundational degree equipping students with knowledge of business, accounting, and finance.",
      icon: "💼"
    },
    {
      id: 4,
      title: "Master of Science (M.Sc.)",
      desc: "Advanced postgraduate programs offering deeper specialization and research opportunities.",
      icon: "🎓"
    },
  ];

  return (
    <section className="bg-[#01327F]/[0.03] py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="h-[2px] w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">ACADEMICS</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#01327F]">Courses Offered</h2>
          <p className="text-sm md:text-base text-gray-600 mt-3 max-w-2xl leading-relaxed">
            We provide a diverse range of undergraduate and postgraduate programs tailored to build future leaders.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(courses || []).map((course) => (
            <div 
              key={course?.id}
              className="group bg-white p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:bg-[#01327F]/5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#01327F] flex items-center justify-center text-xl mb-5 group-hover:bg-amber-400 transition-colors duration-200 shrink-0">
                <span>{course?.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[#01327F] mb-2 group-hover:text-amber-500 transition-colors duration-150 line-clamp-1">
                {course?.title || "Course Title"}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6 flex-1">
                {course?.desc || "No description available."}
              </p>

              <div className="mt-auto">
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#01327F] group-hover:text-amber-500 transition-colors duration-150">
                  Course Details
                  <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center mt-10 md:mt-14">
          <button className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-[#01327F] text-white px-6 py-3 rounded-xl hover:bg-amber-400 hover:text-[#01327F] transition-all duration-200 active:scale-95">
            View All Programs
          </button>
        </div>
      </div>
    </section>
  );
}