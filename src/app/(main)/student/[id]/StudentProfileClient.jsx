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
    if (r === 1) return { bg: "#c4a048", text: "#f6f8fc", label: "Gold" };
    if (r === 2) return { bg: "#94a3b8", text: "#f6f8fc", label: "Silver" };
    if (r === 3) return { bg: "#b87333", text: "#fff", label: "Bronze" };
    return { bg: "#1e3a5a", text: "#c4a048", label: `#${rank}` };
  };

  return (
    <>
      {/* Loading */}
      {loading && (
        <div>
          <div>
            <div />
            <p style={{ color: "#3a5a7a", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>Loading Profile...</p>
          </div>
        </div>
      )}

      {/* Not found */}
      {!loading && !student && (
        <div>
          <div>
            <h2>Student Not Found</h2>
            <p>The profile you are looking for does not exist or has been removed.</p>
            <button onClick={() => router.back()}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      )}

      {/* Profile */}
      {!loading && student && (() => {
        const medal = medalColor(student.Rank);
        const initials = student.Student_Name?.charAt(0)?.toUpperCase() || "S";
        return (
          <div>
            <div>
              <button onClick={() => router.back()}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Toppers
              </button>

              <div>
                {/* Left Column */}
                <div>
                  <div>
                    <div>
                      {student.Image ? (
                        <Image
                          src={`/uploads/${student.Image}`}
                          alt={student.Student_Name}
                          fill
                          sizes="200px"
                          style={{ objectFit: "cover", objectPosition: "top" }}
                          priority
                        />
                      ) : (
                        <div>{initials}</div>
                      )}
                    </div>
                    {student.Rank && (
                      <div style={{ background: medal.bg, color: medal.text }}>
                        <span>{student.Rank}</span>
                        <span>{medal.label}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    {student.Marks_Percentage && (
                      <div>
                        <div>
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <div>Score</div>
                        </div>
                      </div>
                    )}
                    {student.Year && (
                      <div>
                        <div>
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div>Academic Year</div>
                          <div>{student.Year}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div>
                    <span />
                    Student Profile
                  </div>
                  <h1>{student.Student_Name}</h1>
                  <div>
                    {student.Student_Class && <span>{student.Student_Class}</span>}
                    {student.Student_Class && student.Gender && <span />}
                    {student.Gender && <span style={{ textTransform: "capitalize" }}>{student.Gender}</span>}
                  </div>
                  <div />

                  <div>
                    {student.Father_name && (
                      <div>
                        <div>
                          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <div>Father's Name</div>
                          <div>{student.Father_name}</div>
                        </div>
                      </div>
                    )}
                    {student.Year && (
                      <div>
                        <div>
                          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <div>Batch</div>
                          <div>{student.Year}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {student.Description && (
                    <>
                      <div>
                        <div />
                        About Achievement
                      </div>
                      <p>{student.Description}</p>
                    </>
                  )}

                  <div>
                    <div>&quot;</div>
                    <p>
                      Success is not final, failure is not fatal: it is the courage to continue that counts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
