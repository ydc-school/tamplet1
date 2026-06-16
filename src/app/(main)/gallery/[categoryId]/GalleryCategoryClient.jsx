"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function GalleryCategoryPage({ categoryId: categoryIdProp, initialCategory = null, initialGalleries = [], initialLoaded = false }) {
  const params = useParams();
  const categoryId = categoryIdProp || params.categoryId;
  const router = useRouter();
  const [galleries, setGalleries] = useState(initialGalleries);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded || !categoryId) return;
    axios.get(`/api/client/gallery?Gallery_Category_Id=${categoryId}`)
      .then((res) => {
        if (res.data.status === "success") setGalleries(res.data.data?.data ?? []);
      })
      .finally(() => setLoading(false));
  }, [categoryId, initialLoaded]);

  return (
    <main className="gcat-root">
      {/* Page Header */}
      <header className="gcat-hero">
        <button onClick={() => router.push("/gallery")} aria-label="Back to all categories">
          All Categories
        </button>
        <h1>{loading ? "Loading…" : initialCategory?.Name || "Gallery Category"}</h1>
        {!loading && (
          <p>{galleries.length} Album{galleries.length !== 1 ? "s" : ""}</p>
        )}
      </header>

      {/* Album List */}
      <section aria-label="Photo albums in this category">
        {loading ? (
          <div aria-busy="true">Loading albums...</div>
        ) : galleries.length === 0 ? (
          <div role="status">No albums available.</div>
        ) : (
          <ul className="gcat-grid">
            {galleries.map((gal) => (
              <li key={gal.Id}>
                <article className="gcat-card">
                  <Link href={`/gallery/${categoryId}/${gal.Id}`}>
                    <header>
                      <h2>{gal.Name || `Album ${gal.Id}`}</h2>
                    </header>
                    {gal.Description && <p>{stripHtml(gal.Description)}</p>}
                    <footer>View Photos</footer>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}