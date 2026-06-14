"use client";
import React from "react";

export default function CourseSection() {
  const courses = [
    {
      id: 1,
      title: "Bachelor of Arts (B.A.)",
      desc: "A comprehensive undergraduate program focusing on humanities, arts, and social sciences.",
      icon: "menu_book"
    },
    {
      id: 2,
      title: "Bachelor of Science (B.Sc.)",
      desc: "Specialized undergraduate program designed for students with strong aptitude for scientific disciplines.",
      icon: "science"
    },
    {
      id: 3,
      title: "Bachelor of Commerce (B.Com)",
      desc: "Foundational degree equipping students with knowledge of business, accounting, and finance.",
      icon: "trending_up"
    },
    {
      id: 4,
      title: "Master of Science (M.Sc.)",
      desc: "Advanced postgraduate programs offering deeper specialization and research opportunities.",
      icon: "school"
    },
  ];

  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span> ACADEMICS
          </span>
          <h2 className="font-headline-lg text-primary mb-6">Courses Offered</h2>
          <p className="text-secondary max-w-xl text-lg">
            We provide a diverse range of undergraduate and postgraduate programs tailored to build future leaders.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="group bg-surface p-8 border border-on-surface/10 hover:border-primary/30 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">{course.icon}</span>
              </div>
              
              <h3 className="font-headline-sm text-primary mb-4">{course.title}</h3>
              <p className="text-secondary text-sm leading-relaxed mb-8 flex-grow">{course.desc}</p>

              <button className="inline-flex items-center gap-2 font-label-caps text-primary border-b border-primary pb-1 w-fit group-hover:opacity-70 transition-opacity">
                Course Details
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-16 text-center">
          <button className="bg-primary text-on-primary px-10 py-4 font-label-caps hover:opacity-90 transition-all">
            View All Programs
          </button>
        </div>
      </div>
    </section>
  );
}