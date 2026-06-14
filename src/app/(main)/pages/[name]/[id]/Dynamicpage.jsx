"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function DynamicPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id, name } = params;
  const router = useRouter();
  const requestKey = `${id || ""}:${name || ""}`;
  const [pageData, setPageData] = useState(null);
  const [loadedKey, setLoadedKey] = useState("");
  const [error, setError] = useState(null);
  const loading = loadedKey !== requestKey;

  useEffect(() => {
    if (!id) return;
    let isCurrent = true;
    axios.get(`/api/client/pages/${id}/${name}`)
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
      .finally(() => { if (isCurrent) setLoadedKey(requestKey); });
    return () => { isCurrent = false; };
  }, [id, name, requestKey]);

  const jsonLd = !loading && !error && pageData ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageData.Name?.replace(/-/g, " "),
    description: pageData.Page_Data?.replace(/<[^>]*>/g, " ").slice(0, 160),
    publisher: { "@type": "Organization", name: "Heritage Academy" },
  } : null;

  return (
    <>
      {jsonLd && <Script id="page-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="afterInteractive" />}

      <main className="max-w-4xl mx-auto px-6 py-24 min-h-[80vh]">
        {loading ? (
          <div className="py-24 text-center font-serif italic text-stone-400 animate-pulse">
            Loading archival content...
          </div>
        ) : error ? (
          <div className="py-24 text-center">
            <h2 className="font-serif text-3xl mb-4 text-stone-900">Unavailable</h2>
            <p className="text-stone-600 mb-8 max-w-sm mx-auto">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-3 text-xs uppercase tracking-[0.2em] bg-stone-900 text-white hover:bg-amber-900 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : pageData && (
          <article className="animate-in fade-in duration-700">
            {/* Editorial Header */}
            <header className="mb-20 border-b border-stone-200 pb-12">
              <button 
                onClick={() => router.back()} 
                className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-amber-900 transition-colors mb-10 flex items-center gap-2"
              >
                ← Return to Archive
              </button>
              <span className="text-amber-800 uppercase tracking-[0.2em] text-[10px] font-bold">
                Institutional Documentation
              </span>
              <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mt-4 leading-[1.1]">
                {pageData.Name.replace(/-/g, " ")}
              </h1>
            </header>

            {/* Editorial Content Body */}
            <div className="prose prose-stone prose-lg max-w-none 
                            prose-headings:font-serif prose-headings:text-stone-900 
                            prose-p:leading-8 prose-p:text-stone-700
                            prose-a:text-amber-900 prose-a:underline-offset-4 
                            prose-blockquote:border-l-amber-800 prose-blockquote:bg-stone-50 prose-blockquote:py-1">
              <div dangerouslySetInnerHTML={{ __html: pageData.Page_Data }} />
            </div>
            
            {/* Footer */}
            <footer className="mt-20 pt-10 border-t border-stone-100 text-[10px] uppercase tracking-[0.2em] text-stone-400 italic">
              Heritage Academy Archive — {new Date().getFullYear()}
            </footer>
          </article>
        )}
      </main>
    </>
  );
}