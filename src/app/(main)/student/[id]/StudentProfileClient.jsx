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
    axios.get(`/api/client/toper/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setStudent(res.data.data || null);
        }
      })
      .finally(() => setLoading(false));
  }, [id, initialLoaded, initialStudent]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {loading ? (
        <div className="py-20 text-center font-serif italic text-stone-400">Loading academic profile...</div>
      ) : !student ? (
        <div className="text-center py-20">
          <h2 className="font-serif text-3xl text-stone-900 mb-4">Profile Not Found</h2>
          <button onClick={() => router.back()} className="text-amber-800 uppercase tracking-widest text-xs hover:underline">← Go Back</button>
        </div>
      ) : (
        <article className="grid md:grid-cols-12 gap-12">
          {/* Left Column: Image & Rank */}
          <div className="md:col-span-4">
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-6">
              {student.Image ? (
                <Image src={`/uploads/${student.Image}`} alt={student.Student_Name} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-stone-300 text-6xl font-serif">
                  {student.Student_Name?.charAt(0)}
                </div>
              )}
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 bg-amber-800 text-white px-4 py-2 font-serif text-sm">
                Rank {student.Rank}
              </div>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="md:col-span-8">
            <button onClick={() => router.back()} className="text-xs uppercase tracking-widest text-stone-500 hover:text-amber-800 transition-colors mb-6 flex items-center gap-2">
              ← Return to List
            </button>
            
            <header className="border-b border-stone-200 pb-8 mb-8">
              <span className="text-amber-800 uppercase tracking-[0.2em] text-xs font-semibold">Distinguished Scholar</span>
              <h1 className="font-serif text-5xl text-stone-900 mt-2">{student.Student_Name}</h1>
              <div className="mt-4 flex gap-6 text-stone-500 uppercase tracking-widest text-xs">
                <span>Class: {student.Student_Class}</span>
                <span>Batch: {student.Year}</span>
              </div>
            </header>

            {student.Description && (
              <div className="prose prose-stone mb-10">
                <h3 className="font-serif text-xl">Academic Achievement</h3>
                <p className="text-stone-600 leading-relaxed">{student.Description}</p>
              </div>
            )}

            {/* Quote Section */}
            <blockquote className="border-l-4 border-amber-800 pl-6 py-2 italic text-stone-700 font-serif text-lg">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."
            </blockquote>
          </div>
        </article>
      )}
    </div>
  );
}