"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function GalleryCategoryPage({
  categoryId: categoryIdProp,
  initialCategory = null,
  initialGalleries = [],
  initialLoaded = false,
}) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const router = useRouter();
  const [category] = useState(initialCategory);
  const [galleries, setGalleries] = useState(initialGalleries);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    if (!categoryId) return;

    axios.get(`/api/client/gallery?Gallery_Category_Id=${categoryId}`)
      .then((res) => {
        if (res.data.status === "success") {
          setGalleries(res.data.data?.data ?? []);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));

  }, [categoryId, initialLoaded]);
  const stripHtml = (html) => html?.replace(/<[^>]+>/g, " ").trim() ?? "";

  return (
    <div>
      <div>
        <div>
          <button onClick={() => router.push("/gallery")}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Categories
          </button>
          <div>
            <span />
            <span>Gallery</span>
          </div>
          <h1>
            {loading ? "Loading…" : category?.Name || category?.Title || "Gallery"}
          </h1>
          {!loading && (
            <div>
              <span>{galleries.length}</span>
              Album{galleries.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      <div>
        {loading ? (
          <div>
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} />)}
          </div>
        ) : galleries.length === 0 ? (
          <div>
            <svg style={{ margin: "0 auto", display: "block", color: "rgba(196,160,72,0.12)" }} width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>No albums in this category</div>
            <p style={{ fontSize: 14 }}>Check back soon.</p>
          </div>
        ) : (
          <div>
            {galleries.map((gal) => (
              <Link key={gal.Id} href={`/gallery/${categoryId}/${gal.Id}`}>
                <div />
                <div>
                  <div />
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div>{gal.Name || `Album ${gal.Id}`}</div>
                  {gal.Description && (
                    <p>{stripHtml(gal.Description)}</p>
                  )}
                  <span>
                    View Photos
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
