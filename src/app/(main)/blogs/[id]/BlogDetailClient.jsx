"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BlogDetailPage({ id, initialBlog = null, initialLoaded = false }) {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);
  const [loading, setLoading] = useState(!initialLoaded);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialLoaded && initialBlog?.Id?.toString() === id?.toString()) return;
    if (!id) return;
    const timer = window.setTimeout(() => {
      setLoading(true);
      setError(null);
      axios
        .get(`/api/client/blog/${id}`)
        .then((res) => {
          if (res.data.status === "success") setBlog(res.data.data);
          else setError(res.data.message || "Blog not found");
        })
        .catch(() => setError("Error loading blog. Please try again later."))
        .finally(() => setLoading(false));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [id, initialBlog, initialLoaded]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const initials = (name = "") =>
    name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <article className="min-h-screen bg-gray-50/50 text-gray-800 antialiased selection:bg-[#01327F]/10 selection:text-[#01327F]">
      {/* ── Loading State ── */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="text-center space-y-4">
            <div className="relative w-12 h-12 mx-auto">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-[#01327F] rounded-full animate-spin" />
            </div>
            <p className="text-xs font-bold text-[#01327F] uppercase tracking-wider animate-pulse">Loading article...</p>
          </div>
        </div>
      )}

      {/* ── Error State ── */}
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

      {/* ── Article Content ── */}
      {!loading && !error && blog && (
        <>
          {/* Header/Hero Frame */}
          <div className="relative w-full bg-[#01327F] overflow-hidden group">
            {blog.Image ? (
              <>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#01327F] via-[#01327F]/70 to-black/40" />
                <Image
                  src={`/uploads/${blog.Image}`}
                  alt={blog.Title}
                  width={1600}
                  height={620}
                  className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700 opacity-60 mix-blend-overlay"
                  sizes="100vw"
                  priority
                />
              </>
            ) : (
              <div className="relative w-full h-[320px] sm:h-[400px] bg-gradient-to-br from-[#01327F] to-[#0b1e3d] flex items-center justify-center p-8 overflow-hidden">
                {/* Decorative background geometry grids */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none scale-150 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none" />
                <div className="p-6 rounded-full bg-white/[0.02] border border-white/[0.05] shadow-inner mb-24 md:mb-16">
                  <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="#eab308" strokeWidth={0.75} className="opacity-80">
                    <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Floating Top Info Overlay Text Content */}
            <div className={`${blog.Image ? 'absolute bottom-0 inset-x-0' : 'absolute bottom-0 inset-x-0'} z-20 px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 max-w-4xl mx-auto w-full`}>
              <div className="flex flex-col items-start gap-4">
                <button 
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-amber-400 bg-white/[0.06] border border-white/[0.1] backdrop-blur-md px-4 py-2.5 rounded-xl transition-all"
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blogs
                </button>

                <div className="inline-flex items-center gap-2 bg-amber-400/90 text-[#01327F] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01327F] animate-pulse" />
                  Blog Article
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] max-w-3xl drop-shadow-sm">
                  {blog.Title}
                </h1>

                {/* Article Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/80 font-medium pt-2 border-t border-white/[0.12] w-full mt-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-[#01327F] font-bold text-[11px] tracking-wider flex items-center justify-center shadow-md border border-amber-300">
                      {initials(blog.Author)}
                    </div>
                    <span className="font-semibold text-white">{blog.Author}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <time>{formatDate(blog.Date)}</time>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.max(1, Math.ceil(blog.Content?.replace(/<[^>]*>/g, "").split(" ").length / 200))} min read
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Editorial Body Frame Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-10 md:p-16">
              
              {/* Optional Category Label Subhead */}
              {blog.Name && (
                <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#01327F]/60 bg-[#01327F]/[0.03] border border-[#01327F]/5 inline-block px-3 py-1.5 rounded-lg mb-8">
                  {blog.Name.replace(/-/g, " ")}
                </p>
              )}

              {/* Dynamic Raw HTML Rich Content Injector Area */}
              <div 
                dangerouslySetInnerHTML={{ __html: blog.Content }} 
                className="prose prose-base sm:prose-lg max-w-none text-gray-600 font-normal leading-relaxed
                  [&_p]:mb-6 [&_p]:text-gray-600 [&_p]:leading-relaxed
                  [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-black [&_h2]:text-[#01327F] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight
                  [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#01327F] [&_h3]:mt-8 [&_h3]:mb-3
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                  [&_li]:text-gray-600
                  [&_blockquote]:border-l-4 [&_blockquote]:border-amber-400 [&_blockquote]:bg-gray-50 [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:rounded-r-xl [&_blockquote]:text-gray-700
                  [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-8 [&_img]:mx-auto
                  [&_a]:text-[#01327F] [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-amber-500 transition-colors"
              />

              {/* Visual Decorative Separator Divider */}
              <div className="h-[1px] w-full bg-gray-100 my-10" />

              {/* Built-in Post Native Share Tools Section */}
              <ShareRow />

              {/* Absolute Bottom Floating Dynamic Footer Control Actions */}
              <div className="mt-12 pt-6 border-t border-gray-100 flex justify-center">
                <button 
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#01327F] bg-[#01327F]/[0.04] border border-[#01327F]/5 hover:bg-amber-400 hover:text-[#01327F] px-6 py-3.5 rounded-xl transition-all duration-200 shadow-sm active:scale-95"
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blogs Listing
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

/* ── Share Row Sub-Component Layout ── */
function ShareRow() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(document.title + " — " + window.location.href)}`, "_blank");
  };

  const shareOnX = () => {
    window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl relative overflow-hidden">
      <span className="text-[11px] font-black uppercase tracking-widest text-[#01327F] mr-2">Share Article</span>

      <div className="flex flex-wrap items-center gap-2">
        <button 
          onClick={copyLink}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#01327F]/[0.04] border border-gray-200 text-gray-700 font-semibold text-xs px-3.5 py-2 rounded-lg transition-all active:scale-95 shadow-2xs"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Link
        </button>

        <button 
          onClick={shareOnWhatsApp}
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-all active:scale-95 shadow-2xs"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.716a.5.5 0 00.625.632l5.963-1.527A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.433l-.371-.22-3.843.985.993-3.76-.239-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          WhatsApp
        </button>

        <button 
          onClick={shareOnX}
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-all active:scale-95 shadow-2xs"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Post on X
        </button>
      </div>

      {/* Floating Copied Tooltip Toast Alert */}
      <span className={`absolute right-4 bg-green-500 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm transition-all duration-300 ${copied ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95 pointer-events-none'}`}>
        ✓ Copied!
      </span>
    </div>
  );
}