"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// डमी या हेल्पर शेयर रो कॉम्पोनेंट (यदि आपके पास अलग फ़ाइल में न हो)
function ShareRow() {
  return (
    <div className="flex items-center gap-4 py-6 border-t border-slate-100 mt-12">
      <span className="font-sans font-black text-[11px] uppercase tracking-wider text-slate-400">Share Article:</span>
      <div className="flex items-center gap-2">
        {["twitter", "facebook", "linkedin"].map((platform) => (
          <button key={platform} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#7f1d1d] text-slate-500 hover:text-white transition-colors duration-300 flex items-center justify-center border border-slate-100" aria-label={`Share on ${platform}`}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BlogDetailPage({ id, initialBlog = null, initialLoaded = false }) {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);
  const [loading, setLoading] = useState(!initialLoaded);
  const [error, setError] = useState(null);

  // ... (आपकी Fetch / Axios लॉजिक यहाँ बिना किसी बदलाव के काम करेगी)

  return (
    <main className="bg-white min-h-screen pb-24 relative overflow-x-hidden">
      
      {/* 1. LOADING HUB STATE */}
      {loading && (
        <section aria-busy="true" className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 space-y-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-[#7f1d1d] rounded-full animate-spin" />
          <p className="font-sans font-black text-xs uppercase tracking-widest text-[#1e1b4b]">Loading Article...</p>
        </section>
      )}

      {/* 2. ERROR HUB STATE */}
      {!loading && error && (
        <section role="alert" className="max-w-xl mx-auto my-20 p-8 border border-red-100 bg-red-50/50 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✕</div>
          <h2 className="font-serif text-xl font-bold text-slate-900">Failed to load content</h2>
          <p className="font-sans text-sm text-red-700/80 font-medium">{error}</p>
          <button onClick={() => router.back()} className="font-sans font-black text-xs uppercase tracking-wider text-[#1e1b4b] underline">Return Back</button>
        </section>
      )}

      {/* 3. CORE ARTICLE DISPLAY */}
      {!loading && !error && blog && (
        <article className="w-full">
          
          {/* CINEMATIC HERO HERO CONTAINER */}
          <header className="relative w-full h-[55vh] md:h-[65vh] lg:h-[75vh] bg-slate-900 overflow-hidden flex flex-col justify-end">
            
            {/* BACKGROUND COVER IMAGE WITH BOTOM SMOOTH GRADIENT OVERLAY */}
            {blog.Image ? (
              <figure className="absolute inset-0 z-0">
                <Image 
                  src={`/uploads/${blog.Image}`} 
                  alt={blog.Title} 
                  fill
                  priority 
                  className="object-cover opacity-85 transition-transform duration-1000 scale-100 hover:scale-102"
                />
                {/* रिच सिनेमैटिक ग्रेडिएंट मास्क */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10" />
              </figure>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#1e1b4b] z-0" aria-label="No image available" />
            )}

            {/* FLOATING HEADER TEXT CONTENT — FULLY CONTEXT ALIGNED */}
            <div className="w-full max-w-4xl mx-auto px-6 md:px-8 pb-12 md:pb-16 relative z-20 space-y-6">
              
              {/* BACK BUTTON TO HUB — TOP FLOATING */}
              <button 
                onClick={() => router.back()} 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-sans font-black text-xs uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 transform hover:-translate-x-1 focus:outline-none"
              >
                <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Blogs
              </button>

              <div className="space-y-4">
                {/* MAIN WHITE H1 TITLE */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-sm max-w-3xl">
                  {blog.Title}
                </h1>
                
                <div className="w-20 h-1 bg-[#c4a048] rounded-full" />
              </div>

              {/* META DATA ROWS */}
              <address className="flex items-center gap-4 sm:gap-6 text-white/80 font-sans text-xs md:text-sm font-medium pt-2 select-none not-italic">
                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c4a048]" />
                  By <strong className="text-white font-semibold">{blog.Author || "Administrator"}</strong>
                </span>
                <time dateTime={blog.Date} className="opacity-75">
                  {blog.Date ? new Date(blog.Date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : ""}
                </time>
              </address>
            </div>
          </header>

          {/* MEDIUM / SUBSTACK INSPIRED CONTENT CORE COMPONENT */}
          <section className="w-full max-w-4xl mx-auto px-6 md:px-8 pt-12 md:pt-20">
            
            {/* RICH TEXT TYPOGRAPHY CONTAINER (.bd-prose) */}
            <div
              className="bd-prose font-sans text-base md:text-lg text-slate-800 leading-relaxed font-medium tracking-normal whitespace-pre-line
                prose-headings:font-serif prose-headings:text-[#1e1b4b] prose-headings:font-black
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:mb-6 prose-p:text-slate-700/90
                prose-a:text-[#7f1d1d] prose-a:underline prose-a:font-semibold hover:prose-a:text-[#c4a048]
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-[#c4a048] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:my-8 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-xl"
              dangerouslySetInnerHTML={{ __html: blog.Content }}
            />
            
            {/* COMPONENT DIVIDER & PLATFORM SHARE ROW */}
            <footer className="mt-16">
              <ShareRow />
            </footer>

          </section>
        </article>
      )}
    </main>
  );
}