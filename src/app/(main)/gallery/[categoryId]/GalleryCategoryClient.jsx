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
      .finally(() => setLoading(false));
  }, [categoryId, initialLoaded]);

  const stripHtml = (html) => html?.replace(/<[^>]+>/g, " ").trim() ?? "";

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Editorial Header */}
      <header className="mb-16 border-b border-stone-200 pb-12">
        <button onClick={() => router.push("/gallery")} className="text-xs uppercase tracking-widest text-stone-500 hover:text-amber-800 transition-colors mb-6 flex items-center gap-2">
          ← All Categories
        </button>
        <span className="text-amber-800 uppercase tracking-[0.2em] text-xs font-semibold">Visual Archives</span>
        <h1 className="font-serif text-5xl text-stone-900 mt-4 mb-6">
          {loading ? "Loading..." : category?.Name || category?.Title || "Gallery"}
        </h1>
        {!loading && (
          <p className="text-stone-500 uppercase text-xs tracking-widest">
            {galleries.length} {galleries.length !== 1 ? "Albums" : "Album"}
          </p>
        )}
      </header>

      {/* Albums Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-full py-20 text-center text-stone-400 font-serif italic">Loading archives...</div>
        ) : galleries.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-stone-400">No albums found in this category.</p>
          </div>
        ) : (
          galleries.map((gal) => (
            <Link key={gal.Id} href={`/gallery/${categoryId}/${gal.Id}`} className="group flex flex-col">
              <div className="aspect-[4/3] bg-stone-100 mb-6 overflow-hidden relative">
                {/* Image Placeholder effect */}
                <div className="absolute inset-0 bg-stone-200 group-hover:bg-stone-300 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-stone-800 uppercase text-xs tracking-widest font-semibold">Explore</span>
                </div>
              </div>
              
              <div className="flex-grow">
                <h2 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">
                  {gal.Name || `Album ${gal.Id}`}
                </h2>
                {gal.Description && (
                  <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">{stripHtml(gal.Description)}</p>
                )}
              </div>
              
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