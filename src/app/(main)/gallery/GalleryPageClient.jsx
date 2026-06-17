"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function GalleryPage({ initialCategories = [], initialLoaded = false }) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    axios.get("/api/client/gallery-category").then((res) => {
      if (res.data.status === "success") {
        // Sorting logic remains the same
        const sorted = [...(res.data.data?.data ?? [])].sort((a, b) => (a.Index_No ?? 999) - (b.Index_No ?? 999));
        setCategories(sorted);
      }
    }).finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <main className="gl-root">
      {/*
        UI PROMPT — GALLERY PAGE (Categories):
        Hero: H1 "Photo Gallery" + subtitle "Explore our campus life, events and achievements".
        3-column category grid: cover image 4:3 aspect, category name H2, description excerpt, "View Photos" footer.
        Hover: image zoom + overlay darken. Card links to /gallery/[categoryId].
        Full prompt: UI_PROMPTS.md → Section 20
      */}
      {/* Hero Section */}
      <header className="gl-hero">
        <h1>Photo Gallery</h1>
        <p>Explore our campus life, events and achievements</p>
      </header>

      {/* Gallery Categories Section */}
      <section aria-label="Gallery Categories">
        {loading ? (
          <div aria-busy="true">Loading galleries...</div>
        ) : categories.length === 0 ? (
          <p role="status">No galleries found.</p>
        ) : (
          <ul className="gl-grid">
            {categories.map((cat) => (
              <li key={cat.Id}>
                <article className="gl-cat-card">
                  <Link href={`/gallery/${cat.Id}`}>
                    {cat.Image && (
                      <figure>
                        <Image src={`/uploads/${cat.Image}`} alt={cat.Name} fill className="object-cover" />
                      </figure>
                    )}
                    <header>
                      <h2>{cat.Name || "Untitled Gallery"}</h2>
                    </header>
                    {cat.Description && <p>{cat.Description.replace(/<[^>]+>/g, " ").trim()}</p>}
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