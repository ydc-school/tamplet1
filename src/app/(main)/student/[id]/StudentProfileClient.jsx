"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function StudentProfile({ id, initialStudent = null, initialLoaded = false }) {
  const router = useRouter();
  const [student, setStudent] = useState(initialStudent);
  const [loading, setLoading] = useState(!initialLoaded);

  // ... (Fetch logic wahi rahegi)

  return (
    <main className="sp-root">
      {loading ? (
        <section aria-busy="true">Loading profile...</section>
      ) : !student ? (
        <section role="alert">
          <h2>Student Not Found</h2>
          <button onClick={() => router.back()}>Go Back</button>
        </section>
      ) : (
        <article className="sp-inner">
          <header>
            <button onClick={() => router.back()}>Back to Toppers</button>
          </header>

          <div className="sp-card">
            {/* Student Identity */}
            <aside className="sp-left">
              <figure className="sp-photo-wrap">
                {student.Image ? (
                  <Image src={`/uploads/${student.Image}`} alt={student.Student_Name} fill />
                ) : (
                  <div aria-label="No photo">{student.Student_Name?.charAt(0)}</div>
                )}
              </figure>
              {student.Rank && <div aria-label={`Rank ${student.Rank}`}>{student.Rank}</div>}
            </aside>

            {/* Profile Information */}
            <section className="sp-right">
              <span role="doc-subtitle">Student Profile</span>
              <h1>{student.Student_Name}</h1>
              
              <dl className="sp-info-grid">
                <dt>Class</dt>
                <dd>{student.Student_Class}</dd>
                
                <dt>Father's Name</dt>
                <dd>{student.Father_name}</dd>
                
                <dt>Batch</dt>
                <dd>{student.Year}</dd>
              </dl>

              {student.Description && (
                <section>
                  <h3>About Achievement</h3>
                  <p>{student.Description}</p>
                </section>
              )}
            </section>
          </div>
        </article>
      )}
    </main>
  );
}