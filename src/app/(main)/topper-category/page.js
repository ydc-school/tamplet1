"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function TopperCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          setCategories(sortByIndex(data));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="tc-root">
      {/* Page Header Landmark */}
      <header className="tc-hero">
        <p className="tc-eyebrow">Hall of Fame</p>
        <h1>Topper Categories</h1>
        <p className="tc-sub">
          Explore topper groups by stream, level, class, or academic year.
        </p>
        {!loading && (
          <p aria-live="polite">
            Showing {categories.length} Categor{categories.length === 1 ? "y" : "ies"}
          </p>
        )}
      </header>

      {/* Main Content Area */}
      <section aria-label="List of topper categories">
        {loading ? (
          <div aria-busy="true">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div role="status">No topper categories found.</div>
        ) : (
          <ul className="tc-grid">
            {categories.map((category) => (
              <li key={category.Id}>
                <article className="tc-card">
                  <Link href={`/topper-category/${category.Id}`}>
                    <header>
                      <h2>{category.Name || `Category ${category.Id}`}</h2>
                    </header>
                    
                    <section className="tc-card-body">
                      <p>View the topper list for this category and open student profiles.</p>
                      <footer className="tc-tags">
                        {category.Class && <span className="tc-tag">{category.Class}</span>}
                        {category.Year && <span className="tc-tag">{category.Year}</span>}
                      </footer>
                    </section>
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