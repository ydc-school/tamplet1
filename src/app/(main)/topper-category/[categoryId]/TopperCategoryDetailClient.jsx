"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

// ... (Helper functions wahi rahengi)

export default function TopperCategoryDetailPage({ categoryId: categoryIdProp, initialCategory = null, initialToppers = [], initialLoaded = false }) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);
  const [toppers, setToppers] = useState(initialToppers);
  const [loading, setLoading] = useState(!initialLoaded);

  // ... (Fetch logic wahi rahegi)

  return (
    <main className="tcd-root">
      {/*
        UI PROMPT — TOPPER CATEGORY DETAIL PAGE:
        Hero: "← All Categories" back + category name H1 + subtitle + Class/Year chips + student count.
        3-column topper grid: student name H2, photo (or initial avatar), rank badge "Rank #1",
        description, footer "98.5% Score" + "View Profile →" link. Links to /student/[id].
        Full prompt: UI_PROMPTS.md → Section 24
      */}
      {/* Header Landmark */}
      <header className="tcd-hero">
        <button onClick={() => router.push("/topper-category")} aria-label="Go back to all topper categories">
          All Categories
        </button>

        <h1>{loading ? "Loading…" : category?.Name || "Topper Category"}</h1>
        <p>Browse the students listed under this topper category.</p>

        {!loading && (
          <div className="tcd-meta-row">
            {category?.Class && <span className="tcd-chip">{category.Class}</span>}
            {category?.Year && <span className="tcd-chip">{category.Year}</span>}
            <p aria-live="polite">{toppers.length} Student{toppers.length === 1 ? "" : "s"}</p>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <section aria-label="Topper student list">
        {loading ? (
          <div aria-busy="true">Loading toppers...</div>
        ) : toppers.length === 0 ? (
          <div role="status">No toppers found in this category.</div>
        ) : (
          <ul className="tcd-grid">
            {toppers.map((topper) => (
              <li key={topper.Id}>
                <article className="tcd-card">
                  <header>
                    <h2>{topper.Student_Name || "Student"}</h2>
                  </header>

                  <figure className="tcd-image-wrap">
                    {topper.Image ? (
                      <Image src={`/uploads/${topper.Image}`} alt={topper.Student_Name} fill sizes="33vw" />
                    ) : (
                      <div aria-label="No photo">{topper.Student_Name?.charAt(0)}</div>
                    )}
                    <figcaption>Rank #{topper.Rank || "-"}</figcaption>
                  </figure>

                  <section className="tcd-card-body">
                    <p>{topper.Description}</p>
                    <footer>
                      <span>{topper.Marks_Percentage || "--"}% Score</span>
                      <Link href={`/student/${topper.Id}`}>View Profile</Link>
                    </footer>
                  </section>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}