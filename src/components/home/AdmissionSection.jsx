"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function AdmissionSection() {
  const [admissionData, setAdmissionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const response = await axios.get("/api/client/admission-open-message");
        if (response.data.status === "success") {
          const data = response.data.data;
          const finalData = Array.isArray(data) ? data[0] : (data.data ? data.data[0] : null);
          setAdmissionData(finalData);
        }
      } catch (error) {
        console.error("Error fetching admission data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionData();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-24 bg-blue-900/50 flex items-center justify-center">
        <div className="animate-pulse text-blue-200 font-medium text-xl">Loading Admission Info...</div>
      </section>
    );
  }

  if (!admissionData) return null;

  // Attempt to split title into main part and year part for styling
  const titleText = admissionData.Title;
  const match = titleText.match(/(.*?)(\d{4}-\d{4})/);
  const mainTitle = match ? match[1].trim() : titleText;
  const yearTitle = match ? match[2] : "";

  return (
    <section className="w-full relative bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 py-24 overflow-hidden">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

        <div className="text-white">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-sm font-bold tracking-wider mb-6 border border-white/20">
            JOIN US TODAY
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            {mainTitle} <br />
            {yearTitle && <span className="text-blue-300">{yearTitle}</span>}
          </h2>

          <h3 className="text-2xl font-bold text-blue-100 mb-6 border-l-4 border-blue-400 pl-4">
            Life @ Yaduvanshi
          </h3>

          <div
            className="text-blue-50 leading-relaxed text-lg mb-8 opacity-90 notice-content"
            dangerouslySetInnerHTML={{ __html: admissionData.Message }}
          />

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={admissionData.Read_More_Url?.startsWith('http') ? admissionData.Read_More_Url : `https://${admissionData.Read_More_Url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-extrabold shadow-xl hover:-translate-y-1 transition-all inline-block"
            >
              Apply For Admission
            </a>
            <button className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all">
              Download Guidelines
            </button>
          </div>
        </div>

        <div className="relative w-full h-96 lg:h-[500px]">
          {/* Decorative Frame */}
          <div className="absolute inset-4 -right-4 lg:-right-6 -bottom-4 lg:-bottom-6 border-2 border-dashed border-blue-400/50 rounded-4xl z-0"></div>

          <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-4xl border border-white/20 flex flex-col items-center justify-center p-8 text-center shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <Image
              src={`/uploads/${admissionData.Image}`}
              alt="Yaduvanshi Students"
              fill
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-overlay"
            />

            <div className="relative z-20 bg-blue-900/80 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Ready to shape your future?</h3>
              <p className="text-blue-200">Admissions are filling fast.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}