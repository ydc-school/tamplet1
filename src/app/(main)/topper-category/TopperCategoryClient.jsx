"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const sortByIndex = (items) =>
  [...items].sort((a, b) => {
    const aIndex = a?.Index_No;
    const bIndex = b?.Index_No;
    if (aIndex == null) return 1;
    if (bIndex == null) return -1;
    return aIndex - bIndex;
  });

export default function TopperCategoryPage({
  initialCategories = [],
  initialLoaded = false,
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    axios.get("/api/client/toper-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          setCategories(sortByIndex(data));
        }
      })
      .finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Editorial Header */}
      <header className="mb-20 border-b border-stone-200 pb-12">
        <span className="text-amber-800 uppercase tracking-[0.2em] text-xs font-semibold">Hall of Fame</span>
        <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mt-4 mb-6">Topper Categories</h1>
        <p className="text-stone-500 text-lg font-serif italic max-w-xl">
          Discover the scholars who have set the benchmark for excellence across various academic disciplines.
        </p>
        {!loading && (
          <div className="mt-8 text-xs uppercase tracking-widest text-stone-400">
            {categories.length} {categories.length === 1 ? "Category" : "Categories"} found
          </div>
        )}
      </header>

      {/* Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center text-stone-400 italic">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="col-span-full py-20 text-center text-stone-500">No categories found at the moment.</div>
        ) : (
          categories.map((cat) => (
            <Link key={cat.Id} href={`/topper-category/${cat.Id}`} 
                  className="group flex flex-col bg-stone-50 border border-stone-200 p-8 hover:border-amber-800 transition-all">
              <div className="flex-grow">
                <div className="text-[10px] uppercase tracking-widest text-amber-900 font-bold mb-4">
                  {cat.Year || "Archive"} | {cat.Class || "General"}
                </div>
                <h2 className="font-serif text-2xl text-stone-900 group-hover:text-amber-900 transition-colors">
                  {cat.Name}
                </h2>
                <p className="text-stone-500 text-sm mt-4 leading-relaxed">
                  Explore the detailed list of high achievers within this specific academic group.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-stone-400">Order: {cat.Index_No ?? 0}</span>
                <span className="text-xs uppercase tracking-widest text-stone-900 font-semibold group-hover:text-amber-800 transition-colors">
                  View List →
                </span>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}