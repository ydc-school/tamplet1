export default function HistorySection() {
  return (
    <section className="w-full relative bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col md:flex-row gap-12 items-start">

          <div className="w-full md:w-1/3">
            <span className="inline-block py-1.5 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-bold tracking-wider mb-4 border border-blue-200">
              OUR LEGACY
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              History Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">Yaduvanshi</span>
            </h2>
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-gray-50 border-l-4 border-blue-600 p-8 rounded-r-2xl shadow-sm">
              <p className="text-gray-700 leading-relaxed text-lg text-justify mb-6">
                Education forms the basic fabric of one's personality that shapes one into complete human being with a purpose. Our vision of true education is to ensure holistic development of students' mental, physical, emotional and spiritual well-being.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-justify">
                Yaduvanshi Group of Institutions has established new dimensions in the area of Education by creating a chain of premium Educational Institutions. With decades of excellence, the group has become a beacon of quality education, shaping the lives of thousands of students and preparing them for a bright global future.
              </p>
              <button className="mt-8 flex items-center gap-2 text-blue-700 font-bold hover:text-blue-900 transition-colors group">
                Founder's Message
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}