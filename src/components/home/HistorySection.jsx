"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import slugify from "@/utils/slugify";

export default function HistorySection() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/pages/history")
      .then((res) => {
        if (res?.data?.status === "success") setHistory(res?.data?.data || []);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && (!history || history?.length === 0)) return null;

  const historyHref = history?.Id
    ? `/pages/${slugify(history?.Name || "history")}/${history?.Id}`
    : "#";

  if (loading) {
    return (
      <section className="bg-[#01327F]/[0.03] py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start animate-pulse">
          {/* Left Skeleton */}
          <div className="col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-[2px] w-8 bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
            <div className="h-8 bg-gray-300 rounded-lg w-3/4 md:w-full" />
            <div className="h-7 bg-gray-200 rounded-full w-24 mt-2" />
          </div>

          {/* Right Skeleton */}
          <div className="col-span-1 md:col-span-2 bg-white p-6 md:p-8 rounded-2xl flex flex-col gap-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
            <div className="h-10 bg-gray-300 rounded-xl w-32 mt-4" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-[#01327F]/[0.03] py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Left */}
          <div className="col-span-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[2px] w-8 bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Our Legacy</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#01327F] leading-tight balance">
              History of <em className="not-italic text-amber-500">Yaduvanshi</em>
            </h2>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#01327F] text-white px-3 py-1.5 rounded-full mt-4 self-start">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              <span>Est. 1998</span>
            </div>
          </div>

          {/* Right */}
          <div className="col-span-1 md:col-span-2 bg-white p-6 md:p-8 rounded-2xl flex flex-col gap-6">
            <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4">
              <div
                className="line-clamp-6 md:line-clamp-none overflow-hidden"
                dangerouslySetInnerHTML={{ __html: history?.Page_Data || "" }}
              />
            </div>

            <Link 
              href={historyHref}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-amber-400 text-[#01327F] px-5 py-2.5 rounded-xl hover:bg-[#01327F] hover:text-white transition-all duration-200 self-start group active:scale-95"
            >
              Read More
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}