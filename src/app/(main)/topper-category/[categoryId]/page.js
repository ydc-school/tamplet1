"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const getRankValue = (rank) => {
  const parsed = parseInt(rank, 10);
  return Number.isNaN(parsed) ? 999 : parsed;
};

const sortToppers = (items) =>
  [...items].sort((a, b) => {
    const rankDiff = getRankValue(a?.Rank) - getRankValue(b?.Rank);
    if (rankDiff !== 0) return rankDiff;

    const aIndex = a?.Index_No ?? Number.MAX_SAFE_INTEGER;
    const bIndex = b?.Index_No ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  });

export default function TopperCategoryDetailPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);

    Promise.all([
      // axios.get(`/api/client/toper/${categoryId}`),
      axios.get("/api/client/toper?topperCategoryId=" + categoryId, {
        params: {
          topperCategoryId: categoryId,
          limit: 1000,
          sortBy: "Rank",
          sortOrder: "ASC",
        },
      }),
    ])
      .then(([topperRes]) => {
       

        if (topperRes.data?.status === "success") {
          const records = topperRes.data.data?.data ?? topperRes.data.data ?? [];
          setToppers(sortToppers(records));
        } else {
          setToppers([]);
        }
      })
      .catch(() => {
        setCategory(null);
        setToppers([]);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  const categoryTitle = useMemo(() => {
    if (loading) return "Loading…";
    return category?.Name || "Topper Category";
  }, [category, loading]);

  return (
    <>
     
      <div className="tcd-root">
        <div className="tcd-hero">
          <div className="tcd-hero-inner">
            <button className="tcd-back" onClick={() => router.push("/topper-category")}>
              <svg className="tcd-back-arr" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All Categories
            </button>

            <div className="tcd-eyebrow">
              <span className="tcd-ey-dot" />
              <span className="tcd-ey-text">Topper Category</span>
            </div>

            <h1 className="tcd-title">{categoryTitle}</h1>
            <p className="tcd-sub">
              Browse the students listed under this topper category and open any profile to see more detailed academic information.
            </p>

            {!loading && (
              <div className="tcd-meta-row">
                {category?.Class && <span className="tcd-chip">{category.Class}</span>}
                {category?.Year && <span className="tcd-chip">{category.Year}</span>}
                <div className="tcd-count">
                  <span className="tcd-count-num">{toppers.length}</span>
                  Student{toppers.length === 1 ? "" : "s"}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="tcd-body">
          {loading ? (
            <div className="tcd-skel-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="tcd-skel" />
              ))}
            </div>
          ) : toppers.length === 0 ? (
            <div className="tcd-empty">
              <svg style={{ margin: "0 auto", display: "block", color: "rgba(196,160,72,0.15)" }} width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586A2 2 0 0114 3.586L18.414 8A2 2 0 0119 9.414V19a2 2 0 01-2 2z" />
              </svg>
              <div className="tcd-empty-title">No toppers in this category</div>
              <p style={{ fontSize: 14 }}>Students added to this category will show here.</p>
            </div>
          ) : (
            <div className="tcd-grid">
              {toppers.map((topper) => {
                const initials = topper.Student_Name?.charAt(0)?.toUpperCase() || "S";

                return (
                  <div key={topper.Id} className="tcd-card">
                    <div className="tcd-strip" />
                    <div className="tcd-image-wrap">
                      {topper.Image ? (
                        <Image
                          src={`/uploads/${topper.Image}`}
                          alt={topper.Student_Name || "Topper"}
                          fill
                          sizes="(max-width: 719px) 100vw, (max-width: 1039px) 50vw, 33vw"
                          className="tcd-image"
                        />
                      ) : (
                        <div className="tcd-placeholder">{initials}</div>
                      )}
                      <div className="tcd-rank">#{topper.Rank || "-"}</div>
                    </div>

                    <div className="tcd-card-body">
                      <div className="tcd-name">{topper.Student_Name || "Student"}</div>
                      <div className="tcd-student-meta">
                        {topper.Student_Class && (
                          <span className="tcd-student-chip">{topper.Student_Class}</span>
                        )}
                        {topper.Year && (
                          <span className="tcd-student-chip">{topper.Year}</span>
                        )}
                        {topper.Gender && (
                          <span className="tcd-student-chip" style={{ textTransform: "capitalize" }}>
                            {topper.Gender}
                          </span>
                        )}
                      </div>

                      <div className="tcd-desc">
                        {topper.Description || `Open ${topper.Student_Name || "this student"}'s profile to view more information.`}
                      </div>

                      <div className="tcd-card-foot">
                        <div className="tcd-score">
                          <span className="tcd-score-num">{topper.Marks_Percentage || "--"}</span>
                          <span className="tcd-score-pct">%</span>
                        </div>

                        <Link href={`/student/${topper.Id}`} className="tcd-link">
                          Student Profile
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
