"use client";
import React from "react";

export default function CourseSection() {
  const courses = [
    { 
      id: 1, 
      title: "Bachelor of Arts (B.A.)", 
      desc: "A comprehensive undergraduate program focusing on humanities, arts, and social sciences.", 
      icon: "📚",
      color: "from-amber-500/10 to-[#c4a048]/10 text-[#c4a048]"
    },
    { 
      id: 2, 
      title: "Bachelor of Science (B.Sc.)", 
      desc: "Specialized undergraduate program designed for students with strong aptitude for scientific disciplines.", 
      icon: "🔬",
      color: "from-blue-500/10 to-teal-500/10 text-teal-600"
    },
    { 
      id: 3, 
      title: "Bachelor of Commerce (B.Com)", 
      desc: "Foundational degree equipping students with knowledge of business, accounting, and finance.", 
      icon: "💼",
      color: "from-emerald-500/10 to-green-500/10 text-emerald-600"
    },
    { 
      id: 4, 
      title: "Master of Science (M.Sc.)", 
      desc: "Advanced postgraduate programs offering deeper specialization and research opportunities.", 
      icon: "🎓",
      color: "from-[#7f1d1d]/10 to-rose-500/10 text-[#7f1d1d]"
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden relative">
      {/* एम्बिएंट सॉफ्ट बैकग्राउंड लेयर्स */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#f6f8fc] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* HEADER SECTION */}
        <header className="max-w-2xl space-y-3 mb-16 md:mb-20">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.3em] uppercase block">
            Academics
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1e1b4b] tracking-tight">
            Courses Offered
          </h2>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mt-2" />
          <p className="font-sans text-base text-[#0f172a]/60 leading-relaxed pt-2">
            We provide a diverse range of undergraduate and postgraduate programs tailored to build future leaders.
          </p>
        </header>

        {/* MODERN COURSE MATRIX GRID */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {courses.map((course) => (
            <section 
              key={course.id} 
              className="bg-[#f8fafc]/50 hover:bg-white border border-[#f1f5f9] hover:border-transparent p-6 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between items-start group transform hover:-translate-y-1"
            >
              <div className="space-y-4 md:space-y-6 w-full">
                {/* प्रीमियम कस्टमाइज्ड आइकॉन एंकर */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl shadow-inner transform group-hover:scale-110 transition-transform duration-300`}>
                  <span role="img" aria-label="course-icon">{course.icon}</span>
                </div>

                {/* कोर्स डिटेल्स */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors">
                    {course.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-[#0f172a]/65 leading-relaxed font-medium">
                    {course.desc}
                  </p>
                </div>
              </div>

              {/* इनलाइन माइक्रो-इंटरैक्शन ट्रिगर बटन */}
              <div className="pt-6 w-full">
                <button className="inline-flex items-center gap-2 font-sans font-black text-[11px] uppercase tracking-wider text-[#c4a048] group-hover:text-[#1e1b4b] transition-colors focus:outline-none">
                  Course Details 
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </section>
          ))}
        </main>

        {/* BOTTOM GLOBAL ACTION ACTION CTA */}
        <footer className="mt-12 md:mt-16 text-center">
          <button className="inline-flex items-center justify-center bg-[#1e1b4b] hover:bg-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none active:scale-95">
            View All Programs
          </button>
        </footer>

      </div>
    </section>
  );
}