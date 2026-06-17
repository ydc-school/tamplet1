"use client";
import React, { useEffect, useState, use } from "react";
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

  const jsonLd = pageData ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.Name?.replace(/-/g, " "),
    "description": pageData.Page_Data?.replace(/<[^>]*>/g, "").substring(0, 160)
  } : null;

  return (
    <main className="bg-[#f8fafc] min-h-screen pb-24 relative overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#c4a048]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      {jsonLd && (
        <Script id="page-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      )}

      {loading && (
        <section aria-busy="true" className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 space-y-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-[#7f1d1d] rounded-full animate-spin" />
          <p className="font-sans font-black text-xs uppercase tracking-widest text-[#1e1b4b]">Loading Page...</p>
        </section>
      )}

      {!loading && error && (
        <section role="alert" className="max-w-xl mx-auto my-20 p-8 border border-red-100 bg-red-50/50 rounded-[2.5rem] text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✕</div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">System Error</h2>
          <p className="font-sans text-sm text-red-700/80 font-medium">{error}</p>
          <button onClick={() => router.back()} className="font-sans font-black text-xs uppercase tracking-wider text-[#1e1b4b] underline block mx-auto pt-2">Return Back</button>
        </section>
      )}

      {!loading && !error && pageData && (
        <article className="w-full">
          <header className="bg-white border-b border-slate-100 pt-24 pb-12 md:pb-16 mb-12 md:mb-16">
            <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-6">
              <button 
                onClick={() => router.back()} 
                className="inline-flex items-center gap-2 text-[#1e1b4b]/80 hover:text-[#7f1d1d] font-sans font-black text-xs uppercase tracking-widest bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200/60 transition-all duration-300 transform hover:-translate-x-1 focus:outline-none"
              >
                <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>

              <div className="space-y-2">
                <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
                  Institutional Dossier
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1e1b4b] tracking-tight leading-tight">
                  {pageData.Name?.replace(/-/g, " ")}
                </h1>
                <div className="w-20 h-1 bg-[#7f1d1d] rounded-full mt-4" />
              </div>
            </div>
          </header>

          <section className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <div
              className="dp-prose font-sans text-base md:text-lg text-slate-800 leading-relaxed font-medium tracking-normal whitespace-pre-line
                prose-headings:font-serif prose-headings:text-[#1e1b4b] prose-headings:font-black
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:mb-6 prose-p:text-slate-700/90
                prose-a:text-[#7f1d1d] prose-a:underline prose-a:font-semibold hover:prose-a:text-[#c4a048]
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
                prose-img:rounded-[2rem] prose-img:border prose-img:border-slate-100 prose-img:shadow-md prose-img:my-8 prose-img:max-w-full
                prose-table:w-full prose-table:my-8 prose-table:border-collapse prose-table:bg-white prose-table:rounded-[1.5rem] prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-slate-100
                prose-th:bg-slate-50 prose-th:text-[#1e1b4b] prose-th:font-black prose-th:text-xs prose-th:uppercase prose-th:tracking-wider prose-th:p-4 prose-th:text-left prose-th:border-b prose-th:border-slate-100
                prose-td:p-4 prose-td:text-sm prose-td:text-slate-600 prose-td:border-b prose-td:border-slate-50
                prose-blockquote:border-l-4 prose-blockquote:border-[#c4a048] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:my-8 prose-blockquote:bg-white/50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-xl"
              dangerouslySetInnerHTML={{ __html: pageData.Page_Data }}
            />
          </section>
        </article>
      )}
    </main>
  );
}