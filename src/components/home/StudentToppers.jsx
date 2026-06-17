"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function StudentToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res.data?.status === "success") setToppers(res.data.data.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && toppers.length === 0) return null;

  const sorted = [...toppers].sort((a, b) => (parseInt(a.Rank) || 99) - (parseInt(b.Rank) || 99));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  return (
    <article>
      {/*
        UI PROMPT — STUDENT TOPPERS (Hall of Fame):
        Header: eyebrow "Hall of Fame" + H2 "Our Student Toppers".
        PODIUM (top 3): 3 columns, center tallest (rank 1). Circular photo 110×110,
        name H3, class, gold percentage score, "Batch YEAR" badge. Photo links to profile.
        REMAINING: smaller cards with 44×44 photo, name, "#rank • year".
        Celebratory gold accents, navy bg option, trophy visual cues.
        Full prompt: UI_PROMPTS.md → Section 10
      */}
      <header>
        <span>Hall of Fame</span>
        <h2>Our Student Toppers</h2>
      </header>

      {loading ? (
        <p>Loading toppers...</p>
      ) : (
        <main>
          {/* Podium for top 3 */}
          {top3.length > 0 && (
            <section aria-label="Podium">
              {podiumOrder.map((topper) => (
                <article key={topper.Id}>
                  <figure>
                    {topper.Image ? (
                      <Link href={`./student/${topper.Id}`}>
                        <Image src={`/uploads/${topper.Image}`} alt={topper.Student_Name} width={110} height={110} />
                      </Link>
                    ) : (
                      <span>{topper.Student_Name?.charAt(0)}</span>
                    )}
                  </figure>
                  <h3>{topper.Student_Name}</h3>
                  <p>{topper.Student_Class}</p>
                  <data value={topper.Marks_Percentage}>{topper.Marks_Percentage}%</data>
                  <span>Batch {topper.Year}</span>
                </article>
              ))}
            </section>
          )}

          {/* List for others */}
          {rest.length > 0 && (
            <section aria-label="Additional Toppers">
              {rest.map((topper) => (
                <article key={topper.Id}>
                  <figure>
                    {topper.Image && <Image src={`/uploads/${topper.Image}`} alt={topper.Student_Name} width={44} height={44} />}
                  </figure>
                  <h3>{topper.Student_Name}</h3>
                  <p>#{topper.Rank} • {topper.Year}</p>
                </article>
              ))}
            </section>
          )}
        </main>
      )}
    </article>
  );
}