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

      <style>{`
        .dp-root {
          min-height: 100vh;
          background: #f6f8fc;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .dp-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .dp-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* ── Hero banner ── */
        .dp-hero {
          width: 100%;
          background: linear-gradient(160deg, #f3f7fc 0%, #f6f8fc 100%);
          border-bottom: 1px solid rgba(196,160,72,0.12);
          padding: 110px 24px 48px;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .dp-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }

        .dp-hero-inner {
          max-width: 860px;
          margin: 0 auto;
        }

        /* Back button */
        .dp-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #3a5a7a; background: none; border: none;
          cursor: pointer; padding: 0; margin-bottom: 24px;
          transition: color 0.2s;
        }
        .dp-back:hover { color: #c4a048; }
        .dp-back:hover .dp-back-arr { transform: translateX(-3px); }
        .dp-back-arr { transition: transform 0.2s; }

        /* Eyebrow */
        .dp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 14px;
        }
        .dp-ey-dot { width: 5px; height: 5px; border-radius: 50%; background: #c4a048; }
        .dp-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase; color: #c4a048;
        }

        .dp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 44px);
          font-weight: 800; color: #10213a;
          line-height: 1.2; text-transform: capitalize;
          margin-bottom: 0;
        }

        /* ── Content area ── */
        .dp-content-wrap {
          max-width: 100%;
          margin: 0 auto;
          padding: 52px 24px 80px;
          position: relative;
          z-index: 1;
        }

        .dp-content-card {
          background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          padding: 40px 48px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
          position: relative;
          overflow: auto;
        }
        @media (max-width: 600px) { .dp-content-card { padding: 28px 24px; } }

        /* Corner accent */
        .dp-content-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 100px; height: 100px;
          background: radial-gradient(circle at top right, rgba(196,160,72,0.07), transparent 70%);
          pointer-events: none;
        }

        /* Rich text prose styles */
        .dp-prose {
          font-size: 15.5px;
          line-height: 1.85;
          color: #5f7288;
        }
        .dp-prose h1, .dp-prose h2, .dp-prose h3,
        .dp-prose h4, .dp-prose h5, .dp-prose h6 {
          font-family: 'Playfair Display', serif;
          color: #10213a;
          line-height: 1.3;
          margin: 28px 0 12px;
          font-weight: 700;
        }
        .dp-prose h1 { font-size: clamp(22px, 3vw, 30px); }
        .dp-prose h2 { font-size: clamp(19px, 2.5vw, 25px); }
        .dp-prose h3 { font-size: 20px; }
        .dp-prose h4 { font-size: 17px; }
        .dp-prose p { margin-bottom: 16px; }
        .dp-prose strong { color: #1d3557; font-weight: 600; }
        .dp-prose em { color: #c4a048; font-style: italic; }
        .dp-prose a { color: #c4a048; text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s; }
        .dp-prose a:hover { color: #e0c060; }
        .dp-prose ul, .dp-prose ol { padding-left: 20px; margin-bottom: 16px; }
        .dp-prose li { margin-bottom: 8px; }
        .dp-prose ul li::marker { color: #c4a048; }
        .dp-prose ol li::marker { color: #c4a048; font-weight: 700; }
        .dp-prose blockquote {
          border-left: 3px solid #c4a048;
          padding: 14px 20px;
          margin: 24px 0;
          background: rgba(196,160,72,0.05);
          border-radius: 0 3px 3px 0;
          color: rgba(196,160,72,0.75);
          font-style: italic;
        }
        .dp-prose hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,160,72,0.3), transparent);
          margin: 32px 0;
        }
        .dp-prose table {
          width: 100%; border-collapse: collapse; margin-bottom: 20px;
        }
        .dp-prose th {
          background: rgba(196,160,72,0.08);
          color: #c4a048;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 12px 16px;
          border: 1px solid rgba(196,160,72,0.12);
          text-align: left;
        }
        .dp-prose td {
          padding: 11px 16px;
          border: 1px solid rgba(196,160,72,0.08);
          color: #5f7288; font-size: 14px;
        }
        .dp-prose tr:hover td { background: rgba(196,160,72,0.03); }
        .dp-prose img {
          max-width: 100%; border-radius: 4px;
          border: 1px solid rgba(196,160,72,0.12);
          margin: 16px 0;
        }

        /* ── States ── */
        .dp-state {
          min-height: 60vh;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 24px;
          position: relative; z-index: 1;
        }
        .dp-state-box { text-align: center; }
        .dp-spinner {
          width: 38px; height: 38px;
          border: 2px solid rgba(196,160,72,0.12);
          border-top-color: #c4a048;
          border-radius: 50%;
          animation: dp-spin 0.8s linear infinite;
          margin: 0 auto 14px;
        }
        @keyframes dp-spin { to { transform: rotate(360deg); } }
        .dp-state-label { font-size: 14px; color: #3a5a7a; }
        .dp-err-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 700;
          color: #10213a; margin-bottom: 10px;
        }
        .dp-err-msg { font-size: 14px; color: #3a5a7a; margin-bottom: 24px; }
        .dp-retry-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: #c4a048; color: #f6f8fc;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 11px 24px; border: none; border-radius: 2px;
          cursor: pointer; transition: all 0.2s;
        }
        .dp-retry-btn:hover { background: #e0c060; }
      `}</style>

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
