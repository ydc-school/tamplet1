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
    <section className="w-full relative bg-gray-50/50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-800 text-sm font-bold tracking-wider mb-4 border border-blue-200">
            ACADEMICS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Courses Offered
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            We provide a diverse range of undergraduate and postgraduate programs tailored to build future leaders.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:bg-blue-600 transition-colors duration-300">
                <span className="group-hover:scale-110 transition-transform duration-300 group-hover:brightness-0 group-hover:invert">{course.icon}</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {course.desc}
              </p>

              <div className="mt-auto">
                <button className="flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-800">
                  Course Details
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-700 text-gray-800 font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-blue-500/20 active:scale-95">
            View All Programs
          </button>
        </div>

      </div>
    </section>
  );
}