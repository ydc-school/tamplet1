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
    return (a?.Index_No ?? 999) - (b?.Index_No ?? 999);
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
    axios.get("/api/client/toper?topperCategoryId=" + categoryId, {
      params: { topperCategoryId: categoryId, limit: 1000, sortBy: "Rank", sortOrder: "ASC" },
    })
      .then((res) => {
        if (res.data?.status === "success") {
          setToppers(sortToppers(res.data.data?.data ?? res.data.data ?? []));
        }
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Editorial Header */}
      <header className="mb-20 border-b border-stone-200 pb-12">
        <button onClick={() => router.push("/topper-category")} className="text-xs uppercase tracking-widest text-stone-500 hover:text-amber-800 transition-colors mb-6 flex items-center gap-2">
          ← All Categories
        </button>
        <span className="text-amber-800 uppercase tracking-[0.2em] text-xs font-semibold">Academic Excellence</span>
        <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mt-4 mb-6">
          {loading ? "Loading..." : category?.Name || "Topper Category"}
        </h1>
        {!loading && (
          <p className="text-stone-500 text-lg font-serif italic max-w-xl">
            Celebrating our top achievers who have set new benchmarks in academic brilliance.
          </p>
        )}
      </header>

      {/* Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-full py-20 text-center text-stone-400 font-serif italic">Loading scholars...</div>
        ) : toppers.length === 0 ? (
          <div className="col-span-full py-20 text-center text-stone-500">No toppers recorded in this category yet.</div>
        ) : (
          toppers.map((topper) => (
            <div key={topper.Id} className="group flex flex-col bg-stone-50 border border-stone-200 p-6 transition-all hover:border-amber-800">
              {/* Profile Image */}
              <div className="relative aspect-square mb-6 overflow-hidden bg-stone-200">
                {topper.Image ? (
                  <Image src={`/uploads/${topper.Image}`} alt={topper.Student_Name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex items-center justify-center h-full text-stone-400 text-3xl font-serif">
                    {topper.Student_Name?.charAt(0)}
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-amber-800 text-white text-[10px] uppercase tracking-widest px-3 py-1">
                  Rank {topper.Rank || "-"}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-grow">
                <h2 className="font-serif text-2xl text-stone-900 mb-2 group-hover:text-amber-900">{topper.Student_Name || "Student"}</h2>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-4 flex gap-4">
                  <span>{topper.Student_Class}</span>
                  <span>{topper.Year}</span>
                </div>
                
                <div className="mt-auto pt-6 border-t border-stone-200 flex items-center justify-between">
                  <div className="text-2xl font-serif text-amber-900">
                    {topper.Marks_Percentage}% <span className="text-xs text-stone-400 uppercase tracking-widest">Score</span>
                  </div>
                  <Link href={`/student/${topper.Id}`} className="text-xs uppercase tracking-widest text-stone-900 font-semibold hover:text-amber-800 transition-colors">
                    View Profile →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}