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

  // ── JSON-LD structured data (renders only when page loaded) ──────────────
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
      {/* JSON-LD structured data */}
      {jsonLd && (
        <Script
          id="page-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      )}

      

      <div className="dp-root">
        {/* Loading */}
        {loading && (
          <div className="dp-state">
            <div className="dp-state-box">
              <div className="dp-spinner" />
              <p className="dp-state-label">Loading page...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="dp-state">
            <div className="dp-state-box">
              <h2 className="dp-err-title">Something went wrong</h2>
              <p className="dp-err-msg">{error}</p>
              <button className="dp-retry-btn" onClick={() => window.location.reload()}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && pageData && (
          <>
            {/* Hero — h1 is the main on-page heading for SEO */}
            <div className="dp-hero">
              <div className="dp-hero-inner">
                <button className="dp-back" onClick={() => router.back()}>
                  <svg className="dp-back-arr" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <div className="dp-eyebrow">
                  <span className="dp-ey-dot" />
                  <span className="dp-ey-text">Page</span>
                </div>
                {/* h1 — important for on-page SEO */}
                <h1 className="dp-title">
                  {pageData.Name.replace(/-/g, " ")}
                </h1>
              </div>
            </div>

            {/* Body */}
            <div className="dp-content-wrap">
              <div className="dp-content-card">
                <div
                  className="dp-prose"
                  dangerouslySetInnerHTML={{ __html: pageData.Page_Data }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
