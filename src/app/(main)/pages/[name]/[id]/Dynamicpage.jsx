"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function DynamicPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const { name } = params;
  const router = useRouter();
  const requestKey = `${id || ""}:${name || ""}`;
  const [pageData, setPageData] = useState(null);
  const [loadedKey, setLoadedKey] = useState("");
  const [error, setError] = useState(null);
  const loading = loadedKey !== requestKey;

  useEffect(() => {
    if (!id) return;
    let isCurrent = true;

    axios
      .get(`/api/client/pages/${id}/${name}`)
      .then((res) => {
        if (!isCurrent) return;

        if (res.data?.status === "success") {
          setPageData(res.data?.data ?? null);
          setError(null);
        } else {
          setPageData(null);
          setError(res.data?.message || "Failed to fetch page data");
        }
      })
      .catch(() => {
        if (!isCurrent) return;
        setPageData(null);
        setError("Error loading page content. Please try again later.");
      })
      .finally(() => {
        if (isCurrent) setLoadedKey(requestKey);
      });

    return () => {
      isCurrent = false;
    };
  }, [id, name, requestKey]);

  // ── JSON-LD structured data (renders only when page loaded) ──────────────
  const jsonLd =
    !loading && !error && pageData
      ? {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: pageData?.Name?.replace(/-/g, " ") || "Page",
          description: pageData?.Page_Data
            ? pageData.Page_Data.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
            : "",
          url:
            typeof window !== "undefined"
              ? window.location.href
              : `https://yaduvanshigroup.edu.in/pages/${name}/${id}`,
          publisher: {
            "@type": "Organization",
            name: "Yaduvanshi Group",
            url: "https://yaduvanshigroup.edu.in",
          },
        }
      : null;

  return (
    <>
      {/* JSON-LD structured data */}
      {jsonLd && (
        <Script
          id="page-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      )}

      <div className="min-h-screen bg-[#01327F]/[0.03] font-sans pb-16">
        {/* Loading State Skeleton */}
        {loading && (
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6 animate-pulse">
            {/* Skeleton Hero */}
            <div className="bg-white rounded-2xl p-6 md:p-8 space-y-4">
              <div className="h-4 w-16 bg-[#01327F]/10 rounded-full" />
              <div className="h-4 w-28 bg-amber-400/20 rounded-md" />
              <div className="h-10 w-2/3 md:w-1/2 bg-[#01327F]/10 rounded-xl" />
            </div>
            {/* Skeleton Content Card */}
            <div className="bg-white rounded-2xl p-6 md:p-10 space-y-4">
              <div className="h-4 w-full bg-[#01327F]/5 rounded-md" />
              <div className="h-4 w-full bg-[#01327F]/5 rounded-md" />
              <div className="h-4 w-4/5 bg-[#01327F]/5 rounded-md" />
              <div className="h-4 w-full bg-[#01327F]/5 rounded-md" />
              <div className="h-4 w-3/4 bg-[#01327F]/5 rounded-md" />
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-[500px] mx-auto px-4 pt-24 text-center">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-400/10 rounded-full flex items-center justify-center text-amber-500 mb-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#01327F] mb-2">Something went wrong</h2>
              <p className="text-sm text-[#01327F]/70 font-medium mb-6">{error}</p>
              <button 
                className="inline-flex items-center gap-2 bg-[#01327F] text-white px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide hover:bg-amber-500 hover:text-[#01327F] transition-all duration-300 transform hover:-translate-y-0.5" 
                onClick={() => window.location.reload()}
              >
                <svg className="animate-spin-slow" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Content State */}
        {!loading && !error && pageData && (
          <article className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
            {/* Hero Card */}
            <header className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-start gap-4">
              <button 
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#01327F]/60 hover:text-amber-500 transition-colors duration-200" 
                onClick={() => router.back()}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1.5">
                  <span className="h-[2px] w-8 bg-amber-400" />
                  <span className="text-[11px] font-bold tracking-[0.2em] text-amber-500 uppercase">Page</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#01327F] tracking-tight capitalize leading-tight">
                  {pageData?.Name?.replace(/-/g, " ")}
                </h1>
              </div>
            </header>

            {/* Body Content Card */}
            <main className="bg-white rounded-2xl p-6 md:p-10">
              <div
                className="prose max-w-none text-slate-700 leading-relaxed text-base md:text-[16.5px] 
                  prose-headings:text-[#01327F] prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:mb-5 prose-p:text-slate-600
                  prose-a:text-[#01327F] prose-a:font-semibold prose-a:underline hover:prose-a:text-amber-500 prose-a:transition-colors
                  prose-strong:text-[#01327F] prose-strong:font-bold
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-5 prose-ul:space-y-2
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-5 prose-ol:space-y-2
                  prose-li:text-slate-600
                  prose-img:rounded-xl prose-img:my-6
                  prose-table:w-full prose-table:my-6 prose-table:border-collapse
                  prose-th:bg-[#01327F]/5 prose-th:text-[#01327F] prose-th:p-3 prose-th:text-left prose-th:text-sm prose-th:font-bold prose-th:rounded-lg
                  prose-td:p-3 prose-td:text-sm prose-td:text-slate-600 prose-td:border-b prose-td:border-slate-100"
                dangerouslySetInnerHTML={{ __html: pageData?.Page_Data }}
              />
            </main>
          </article>
        )}
      </div>
    </>
  );
}