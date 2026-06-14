"use client";
import React, { useState, useEffect } from "react";
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
        if (res.data.status === "success") setHistory(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && history?.length === 0) return null;

  const historyHref = history?.Id
    ? `/pages/${slugify(history.Name || "history")}/${history.Id}`
    : "#";

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          
          {/* Left Column */}
          <div className="md:col-span-4">
            <span className="font-label-caps text-label-caps text-secondary mb-4 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-primary"></span>
              OUR LEGACY
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-8">
              History of <span className="italic font-serif">Yaduvanshi</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-[1px] h-16 bg-primary/20"></div>
              <span className="font-label-caps text-label-caps text-secondary">Est. 1998</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-8">
            <div className="border border-on-surface/10 p-10 md:p-12 hover:border-primary/20 transition-all duration-300">
              <div
                className="font-body-lg text-secondary prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: history.Page_Data }}
              />

              <Link href={historyHref} className="inline-flex items-center gap-2 mt-10 font-label-caps text-label-caps text-primary border-b border-primary pb-2 hover:opacity-70 transition-opacity">
                Read More
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}