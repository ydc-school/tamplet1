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
    <section>
      <div>
        {/* Header */}
        <div>
          <span>ACADEMICS</span>
          <h2>Courses Offered</h2>
          <p>
            We provide a diverse range of undergraduate and postgraduate programs tailored to build future leaders.
          </p>
        </div>

        {/* Courses Grid */}
        <div>
          {courses.map((course) => (
            <div key={course.id}>
              <div>
                <span>{course.icon}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.desc}</p>

              <div>
                <button>
                  Course Details
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div>
          <button>
            View All Programs
          </button>
        </div>
      </div>
    </section>
  );
}