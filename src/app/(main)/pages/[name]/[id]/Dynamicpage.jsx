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

        if (res.data.status === "success") {
          setPageData(res.data.data);
          setError(null);
        } else {
          setPageData(null);
          setError(res.data.message || "Failed to fetch page data");
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

  // ── JSON-LD Structured Data Schema Pipeline ──
  const jsonLd =
    !loading && !error && pageData
      ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: pageData.Name?.replace(/-/g, " ") || "Page",
        description: pageData.Page_Data
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
      {/* Structural JSON-LD Content Engine Injector */}
      {jsonLd && (
        <Script
          id="page-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      )}

      <article className="min-h-screen bg-gray-50/50 text-gray-800 antialiased selection:bg-[#01327F]/10 selection:text-[#01327F]">
        
        {/* ── Async Processing Loading State ── */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="text-center space-y-4">
              <div className="relative w-12 h-12 mx-auto">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-[#01327F] rounded-full animate-spin" />
              </div>
              <p className="text-xs font-bold text-[#01327F] uppercase tracking-wider animate-pulse">Loading page...</p>
            </div>
          </div>
        )}

        {/* ── Exception Error Handling State ── */}
        {!loading && error && (
          <div className="max-w-xl mx-auto px-4 py-24 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-100 shadow-xl">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-[#01327F] tracking-tight mb-2">Something went wrong</h2>
              <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-[#01327F] hover:bg-amber-400 hover:text-[#01327F] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ── Main Layout Hydrated Visual Viewport Content ── */}
        {!loading && !error && pageData && (
          <>
            {/* Corporate Branding Unified Page Hero Cover Block */}
            <header className="relative bg-[#01327F] pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
              {/* Background Geometry Ambience Grids */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

              <div className="relative max-w-4xl mx-auto flex flex-col items-start gap-4">
                <button 
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-amber-400 bg-white/[0.06] border border-white/[0.1] backdrop-blur-md px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <div className="inline-flex items-center gap-2 bg-amber-400/90 text-[#01327F] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01327F] animate-pulse" />
                  Institutional Profile
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] max-w-3xl drop-shadow-sm">
                  {pageData.Name.replace(/-/g, " ")}
                </h1>
              </div>
            </header>

            {/* Dynamic Rich-Text Content Display Matrix Container */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-10 md:p-16">
                
                {/* Dynamically Injected Rich Raw HTML Code String Content Node */}
                <div 
                  dangerouslySetInnerHTML={{ __html: pageData.Page_Data }} 
                  className="prose prose-base sm:prose-lg max-w-none text-gray-600 font-normal leading-relaxed
                    [&_p]:mb-6 [&_p]:text-gray-600 [&_p]:leading-relaxed
                    [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:font-black [&_h1]:text-[#01327F] [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:tracking-tight
                    [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-black [&_h2]:text-[#01327F] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight
                    [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#01327F] [&_h3]:mt-8 [&_h3]:mb-3
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                    [&_li]:text-gray-600
                    [&_blockquote]:border-l-4 [&_blockquote]:border-amber-400 [&_blockquote]:bg-gray-50 [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:rounded-r-xl [&_blockquote]:text-gray-700
                    [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-8 [&_img]:mx-auto
                    [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:text-sm
                    [&_th]:bg-[#01327F]/5 [&_th]:text-[#01327F] [&_th]:font-bold [&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-gray-200
                    [&_td]:p-3 [&_td]:border [&_td]:border-gray-200 [&_td]:text-gray-600
                    [&_a]:text-[#01327F] [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-amber-500 transition-colors"
                />

              </div>
            </main>
          </>
        )}
      </article>
    </>
  );
}