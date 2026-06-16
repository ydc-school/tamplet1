"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

// ... (Helper functions: getRankValue, sortToppers wahi rahengi)

export default function TopperCategoryDetailPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... (useEffect logic wahi rahegi)

  return (
    <main className="tcd-root">
      {/* Page Header */}
      <header className="tcd-hero">
        <button onClick={() => router.push("/topper-category")} aria-label="Back to all categories">
          All Categories
        </button>

        <h1>{loading ? "Loading…" : category?.Name || "Topper Category"}</h1>
        
        <p>
          Browse the students listed under this topper category and open any profile to see more detailed academic information.
        </p>

        {!loading && (
          <div className="tcd-meta-row">
            {category?.Class && <span className="tcd-chip">{category.Class}</span>}
            {category?.Year && <span className="tcd-chip">{category.Year}</span>}
            <p aria-live="polite">
              {toppers.length} Student{toppers.length === 1 ? "" : "s"} found
            </p>
          </div>
        )}
      </header>

      {/* Toppers Grid */}
      <section aria-label="Topper student list">
        {loading ? (
          <div aria-busy="true">Loading topper details...</div>
        ) : toppers.length === 0 ? (
          <div role="status">No toppers in this category.</div>
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
                      <Image
                        src={`/uploads/${topper.Image}`}
                        alt={topper.Student_Name || "Topper profile photo"}
                        fill
                        sizes="(max-width: 719px) 100vw, (max-width: 1039px) 50vw, 33vw"
                      />
                    ) : (
                      <div aria-label="No photo available">{topper.Student_Name?.charAt(0)}</div>
                    )}
                    <figcaption>Rank #{topper.Rank || "-"}</figcaption>
                  </figure>

                  <section className="tcd-card-body">
                    <p>{topper.Description}</p>
                    <footer>
                      <span aria-label="Percentage Score">{topper.Marks_Percentage || "--"}%</span>
                      <Link href={`/student/${topper.Id}`}>
                        Student Profile
                      </Link>
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