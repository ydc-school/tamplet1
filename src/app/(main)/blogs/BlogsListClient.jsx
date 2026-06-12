"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_PAGINATION = { total: 0, page: 1, limit: 10, totalPages: 1 };

export default function BlogsListPage({
  initialBlogs = [],
  initialPagination = DEFAULT_PAGINATION,
  initialLoaded = false,
}) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(!initialLoaded);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const skippedInitialSearch = useRef(false);

  const fetchBlogs = useCallback((page = 1, search = "") => {
    setLoading(true);
    setError(null);
    axios
      .get("/api/client/blog", { params: { page, limit: 10, search } })
      .then((res) => {
        if (res.data.status === "success") {
          setBlogs(res.data.data.data);
          setPagination(res.data.data.pagination);
        } else {
          setError(res.data.message || "Failed to fetch blogs");
        }
      })
      .catch(() => setError("Error loading blogs. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  // Debounced search logic
  useEffect(() => {
    if (!skippedInitialSearch.current && initialLoaded && searchQuery === "") {
      skippedInitialSearch.current = true;
      return;
    }
    const t = setTimeout(() => {
      setCurrentPage(1);
      fetchBlogs(1, searchQuery);
    }, 350);
    return () => clearTimeout(t);
  }, [searchQuery, fetchBlogs, initialLoaded]);

  const handlePage = (p) => {
    setCurrentPage(p);
    fetchBlogs(p, searchQuery);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const initials = (name = "") =>
    name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const stripHtml = (html = "") => {
    const pureText = html.replace(/<[^>]*>/g, "");
    return pureText.length > 120 ? pureText.slice(0, 120) + "..." : pureText;
  };

  const featured = currentPage === 1 && !searchQuery && blogs[0] ? blogs[0] : null;
  const rest = featured ? blogs.slice(1) : blogs;

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 antialiased pb-20 selection:bg-[#01327F]/10 selection:text-[#01327F]">
      
      {/* ── Hero / Filter Header Control Block ── */}
      <header className="relative bg-[#01327F] pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Ambience elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400/90">Knowledge & Insights</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Our Blog</h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            <p className="text-xs sm:text-sm text-white/70 font-medium shrink-0">
              Showing <span className="text-amber-400 font-bold">{pagination.total}</span> article{pagination.total !== 1 ? "s" : ""}
            </p>
            
            {/* Elegant Search bar input layout matching dashboard */}
            <div className="relative flex items-center w-full sm:w-72 group">
              <div className="absolute left-4 pointer-events-none text-white/50 group-focus-within:text-amber-400 transition-colors">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.07] text-white border border-white/[0.12] focus:border-amber-400 focus:bg-white focus:text-[#01327F] focus:ring-4 focus:ring-amber-400/10 rounded-xl pl-11 pr-4 py-3 text-sm font-medium placeholder-white/40 focus:placeholder-gray-400 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Layout Body Wrapper ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* ── Async Operation Loading Loader State ── */}
        {loading && (
          <div className="py-24 text-center space-y-4 animate-in fade-in duration-200">
            <div className="relative w-12 h-12 mx-auto">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-[#01327F] rounded-full animate-spin" />
            </div>
            <p className="text-xs font-bold text-[#01327F] uppercase tracking-wider animate-pulse">Loading articles...</p>
          </div>
        )}

        {/* ── Exception Error Handling Notice State ── */}
        {!loading && error && (
          <div className="max-w-md mx-auto py-16 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-lg font-black text-[#01327F] mb-1">Something went wrong</h2>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">{error}</p>
              <button 
                onClick={() => fetchBlogs(currentPage, searchQuery)}
                className="bg-[#01327F] hover:bg-amber-400 hover:text-[#01327F] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ── Cards Render Grid List ── */}
        {!loading && !error && (
          <>
            {blogs.length === 0 && (
              <div className="py-20 text-center max-w-sm mx-auto animate-in fade-in duration-300">
                <div className="p-4 rounded-full bg-gray-100 border border-gray-200 inline-block text-gray-400 mb-4">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="text-base font-black text-[#01327F]">No articles found</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">We couldn't find matches for "{searchQuery}". Try revising your phrase framework keyword query terms.</p>
              </div>
            )}

            <div className="space-y-10 animate-in fade-in duration-300">
              
              {/* ── FEATURED BLOG LAYOUT CARD ── */}
              {featured && (
                <Link 
                  href={`/blogs/${featured.Id}`}
                  className="group block bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Image Block Panel */}
                  <div className="relative lg:col-span-7 min-h-[260px] bg-gray-100 overflow-hidden">
                    {featured.Image ? (
                      <Image
                        src={`/uploads/${featured.Image}`}
                        alt={featured.Title}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#01327F]/5 to-amber-400/[0.02]">
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#eab308" strokeWidth={1} className="opacity-60">
                          <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Body Info Text Frame Panel */}
                  <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between gap-6 bg-white">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-1.5 bg-amber-400 text-[#01327F] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-2xs">
                        Featured Post
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#01327F] tracking-tight group-hover:text-amber-500 transition-colors leading-snug">
                        {featured.Title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                        {stripHtml(featured.Description)}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#01327F] text-white font-bold text-[11px] flex items-center justify-center border border-[#01327F]/10 shadow-sm shrink-0">
                          {initials(featured.Author)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-[#01327F] truncate">{featured.Author}</span>
                          <span className="text-[11px] text-gray-400 font-medium">{formatDate(featured.Date)}</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#01327F] group-hover:text-amber-500 transition-colors shrink-0">
                        Read Article
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} className="translate-x-0 group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* ── STANDARD BLOGS CARDS GRID MATRIX ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {rest.map((b) => (
                  <Link 
                    key={b.Id} 
                    href={`/blogs/${b.Id}`}
                    className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Thumbnail Image Cover Frame */}
                    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                      {b.Image ? (
                        <Image
                          src={`/uploads/${b.Image}`}
                          alt={b.Title}
                          fill
                          className="object-cover group-hover:scale-102 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#01327F]/[0.03] to-amber-400/[0.01]">
                          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#eab308" strokeWidth={1} className="opacity-50">
                            <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Meta Card Details Info Payload Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5 bg-white">
                      <div className="space-y-2.5">
                        <h2 className="text-base sm:text-lg font-black text-[#01327F] tracking-tight group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                          {b.Title}
                        </h2>
                        <p className="text-xs text-gray-500 leading-relaxed font-normal line-clamp-3">
                          {stripHtml(b.Description)}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gray-50 text-[#01327F] font-black text-[10px] flex items-center justify-center border border-gray-200 shrink-0">
                            {initials(b.Author)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-[#01327F] truncate">{b.Author}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{formatDate(b.Date)}</span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-[#01327F] group-hover:text-amber-500 transition-colors shrink-0">
                          Read
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
                            <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Modern Dynamic Pagination Control Bar Pipeline ── */}
            {pagination.totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2 border-t border-gray-100 pt-8">
                {/* Previous Page trigger controller */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePage(currentPage - 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-[#01327F] flex items-center justify-center hover:bg-[#01327F] hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-all shadow-2xs active:scale-95"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Numbered indexes buttons iterations */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePage(p)}
                      className={`w-10 h-10 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-2xs ${
                        p === currentPage
                          ? "bg-[#01327F] text-white border border-[#01327F]"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Next Page trigger controller */}
                <button
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => handlePage(currentPage + 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-[#01327F] flex items-center justify-center hover:bg-[#01327F] hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-all shadow-2xs active:scale-95"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}