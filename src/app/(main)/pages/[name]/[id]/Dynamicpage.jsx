"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function DynamicPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id, name } = params;
  const router = useRouter();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`/api/client/pages/${id}/${name}`)
      .then((res) => {
        if (res.data.status === "success") {
          setPageData(res.data.data);
          setError(null);
        } else {
          setError(res.data.message || "Failed to fetch page data");
        }
      })
      .catch(() => setError("Error loading page content."))
      .finally(() => setLoading(false));
  }, [id, name]);

  // JSON-LD structured data (SEO)
  const jsonLd = pageData ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.Name?.replace(/-/g, " "),
    "description": pageData.Page_Data?.replace(/<[^>]*>/g, "").substring(0, 160)
  } : null;

  return (
    <main className="dp-root">
      {/*
        UI PROMPT — DYNAMIC CMS PAGE:
        Hero: "← Back" button + eyebrow "Page" + page title H1 (e.g. "About Us").
        Content: rich HTML prose (.dp-prose), max-width 4xl centered. Supports headings, tables, images.
        States: loading spinner, error alert box. Minimal content-focused documentation style.
        Full prompt: UI_PROMPTS.md → Section 26
      */}
      {jsonLd && (
        <Script id="page-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      )}

      {loading && <section aria-busy="true">Loading content...</section>}

      {!loading && error && <section role="alert"><h2>Error</h2><p>{error}</p></section>}

      {!loading && !error && pageData && (
        <article>
          <header className="dp-hero">
            <button onClick={() => router.back()}>Back</button>
            <span>Page</span>
            <h1>{pageData.Name.replace(/-/g, " ")}</h1>
          </header>

          <section className="dp-content-wrap">
            <div
              className="dp-prose"
              dangerouslySetInnerHTML={{ __html: pageData.Page_Data }}
            />
          </section>
        </article>
      )}
    </main>
  );
}