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
    axios.get("/api/client/gallery-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          const sorted = [...data].sort((a, b) => (a.Index_No ?? 999) - (b.Index_No ?? 999));
          setCategories(sorted);
        }
      })
      .finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Editorial Header */}
      <header className="mb-20 border-b border-stone-200 pb-12">
        <span className="text-amber-800 uppercase tracking-[0.2em] text-xs font-semibold">Visual Archives</span>
        <h1 className="font-serif text-6xl text-stone-900 mt-4 mb-6">Photo Gallery</h1>
        <p className="text-stone-500 text-lg font-serif italic max-w-xl">Explore our campus life, events, and academic achievements through our curated visual records.</p>
      </header>

      {/* Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {loading ? (
          <div className="col-span-full py-20 text-center text-stone-400">Loading archives...</div>
        ) : categories.length === 0 ? (
          <div className="col-span-full py-20 text-center text-stone-500">No galleries available at the moment.</div>
        ) : (
          categories.map((cat) => (
            <Link key={cat.Id} href={`/gallery/${cat.Id}`} className="group flex flex-col">
              {/* Image Container with Hover Effect */}
              <div className="relative aspect-[4/3] bg-stone-100 mb-6 overflow-hidden">
                {cat.Image && (
                  <Image
                    src={`/uploads/${cat.Image}`}
                    alt={cat.Name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Text Info */}
              <h2 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">
                {cat.Name || "Untitled Gallery"}
              </h2>
              {cat.Description && (
                <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {cat.Description.replace(/<[^>]+>/g, "").trim()}
                </p>
              )}
              
              <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mt-auto pt-4 border-t border-stone-100">
                View Photos →
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}