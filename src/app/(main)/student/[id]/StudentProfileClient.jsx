"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function StudentProfile({ id, initialStudent = null, initialLoaded = false }) {
  const router = useRouter();
  const [student, setStudent] = useState(initialStudent);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded && initialStudent?.Id?.toString() === id?.toString()) return;
    if (!id) return;
    axios
      .get(`/api/client/toper/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setStudent(res.data.data || null);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [id, initialLoaded, initialStudent]);

  const medalColor = (rank) => {
    const r = parseInt(rank);
    if (r === 1) return { bg: "bg-amber-400", text: "text-white", ring: "ring-amber-200", label: "Gold Rank" };
    if (r === 2) return { bg: "bg-slate-400", text: "text-white", ring: "ring-slate-200", label: "Silver Rank" };
    if (r === 3) return { bg: "bg-orange-700", text: "text-white", ring: "ring-orange-200", label: "Bronze Rank" };
    return { bg: "bg-[#01327F]", text: "text-amber-400", ring: "ring-blue-100", label: `Rank ${rank}` };
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Loading State */}
      {loading && (
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-32">
          <div className="w-12 h-12 border-4 border-[#01327F]/20 border-t-[#01327F] rounded-full animate-spin mb-4" />
          <p className="text-[#01327F] font-bold uppercase tracking-widest text-xs">Loading Profile...</p>
        </div>
      )}

      {/* Not Found State */}
      {!loading && !student && (
        <div className="max-w-md mx-auto bg-white p-10 rounded-3xl border border-gray-100 shadow-xl text-center">
          <div className="text-gray-300 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-xl font-black text-[#01327F] mb-2">Student Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">The profile you are looking for does not exist or has been removed.</p>
          <button onClick={() => router.back()} className="bg-[#01327F] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-amber-500 transition-all">Go Back</button>
        </div>
      )}

      {/* Profile Content */}
      {!loading && student && (() => {
        const medal = medalColor(student.Rank);
        return (
          <div className="max-w-5xl mx-auto">
            <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#01327F] text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M15 19l-7-7 7-7" /></svg>
              Back to Toppers
            </button>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden grid lg:grid-cols-[380px,1fr]">
              {/* Sidebar */}
              <div className="bg-gray-50 p-8 flex flex-col items-center text-center">
                <div className={`relative w-48 h-48 rounded-full overflow-hidden border-4 ${medal.ring} bg-white shadow-lg mb-6`}>
                  {student.Image ? (
                    <Image src={`/uploads/${student.Image}`} alt={student.Student_Name} fill className="object-cover" priority />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#01327F] text-white text-5xl font-black">{student.Student_Name?.charAt(0)}</div>
                  )}
                </div>
                
                <div className={`${medal.bg} ${medal.text} px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-md`}>
                  {medal.label}
                </div>

                <div className="w-full space-y-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                    <div className="p-2 bg-blue-50 text-[#01327F] rounded-lg"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
                    <div className="text-left">
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Score</div>
                      <div className="font-black text-[#01327F]">{student.Marks_Percentage}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Info */}
              <div className="p-8 sm:p-12">
                <div className="inline-block bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4">Student Profile</div>
                <h1 className="text-4xl font-black text-[#01327F] mb-2">{student.Student_Name}</h1>
                <div className="flex gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">
                  <span>{student.Student_Class}</span>
                  <span className="w-px h-4 bg-gray-200" />
                  <span className="capitalize">{student.Gender}</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  <div className="border-l-2 border-[#01327F] pl-4">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Father's Name</div>
                    <div className="font-bold text-gray-800">{student.Father_name}</div>
                  </div>
                  <div className="border-l-2 border-[#01327F] pl-4">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Batch Year</div>
                    <div className="font-bold text-gray-800">{student.Year}</div>
                  </div>
                </div>

                {student.Description && (
                  <div className="mb-10">
                    <h3 className="text-xs font-black text-[#01327F] uppercase tracking-widest mb-3">About Achievement</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{student.Description}</p>
                  </div>
                )}

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 italic text-gray-500 text-sm">
                  &quot;Success is not final, failure is not fatal: it is the courage to continue that counts.&quot;
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}