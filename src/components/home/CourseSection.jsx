export default function CourseSection() {
  const courses = [
    { id: 1, title: "Bachelor of Arts (B.A.)", desc: "A comprehensive undergraduate program focusing on humanities, arts, and social sciences.", icon: "📚" },
    { id: 2, title: "Bachelor of Science (B.Sc.)", desc: "Specialized undergraduate program designed for students with strong aptitude for scientific disciplines.", icon: "🔬" },
    { id: 3, title: "Bachelor of Commerce (B.Com)", desc: "Foundational degree equipping students with knowledge of business, accounting, and finance.", icon: "💼" },
    { id: 4, title: "Master of Science (M.Sc.)", desc: "Advanced postgraduate programs offering deeper specialization and research opportunities.", icon: "🎓" },
  ];

  return (
    <article>
      <header>
        <span>ACADEMICS</span>
        <h2>Courses Offered</h2>
        <p>We provide a diverse range of undergraduate and postgraduate programs tailored to build future leaders.</p>
      </header>

      <main>
        {courses.map((course) => (
          <section key={course.id}>
            <span>{course.icon}</span>
            <h3>{course.title}</h3>
            <p>{course.desc}</p>
            <button>Course Details &rarr;</button>
          </section>
        ))}
      </main>

      <footer>
        <button>View All Programs</button>
      </footer>
    </article>
  );
}