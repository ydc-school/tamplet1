"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_PAGINATION = { total: 0, page: 1, limit: 10, totalPages: 1 };

export default function BlogsListPage({ initialBlogs = [], initialPagination = DEFAULT_PAGINATION, initialLoaded = false }) {
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
    axios.get("/api/client/blog", { params: { page, limit: 10, search } })
      .then((res) => {
        if (res.data.status === "success") {
          setBlogs(res.data.data.data);
          setPagination(res.data.data.pagination);
        } else setError(res.data.message || "Failed to fetch blogs");
      })
      .catch(() => setError("Error loading blogs. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!skippedInitialSearch.current && initialLoaded && searchQuery === "") {
      skippedInitialSearch.current = true;
      return;
    }
    const t = setTimeout(() => { setCurrentPage(1); fetchBlogs(1, searchQuery); }, 350);
    return () => clearTimeout(t);
  }, [searchQuery, fetchBlogs, initialLoaded]);

  const handlePage = (p) => { setCurrentPage(p); fetchBlogs(p, searchQuery); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const initials = (name = "") => name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").slice(0, 120) + "...";

  const featured = currentPage === 1 && !searchQuery && blogs[0] ? blogs[0] : null;
  const rest = featured ? blogs.slice(1) : blogs;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Header */}
      <header className="mb-16 border-b border-stone-200 pb-12">
        <span className="text-amber-800 uppercase tracking-[0.2em] text-xs font-semibold">Knowledge & Insights</span>
        <h1 className="font-serif text-5xl mt-4 mb-8 text-stone-900">Our Blog</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-stone-500">Showing <span className="font-bold text-stone-900">{pagination.total}</span> articles</p>
          <div className="relative max-w-sm w-full">
            <input className="w-full bg-stone-50 border border-stone-200 py-3 px-4 outline-none focus:border-stone-500 transition-colors" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </header>

      {/* Grid */}
      <section className="min-h-[60vh]">
        {loading ? <div className="text-center font-serif italic text-stone-400 py-20">Loading archives...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured && (
              <Link href={`/blogs/${featured.Id}`} className="md:col-span-2 group">
                <div className="relative h-[400px] overflow-hidden bg-stone-100 mb-6">
                  {featured.Image && <Image src={`/uploads/${featured.Image}`} alt={featured.Title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                </div>
                <h2 className="font-serif text-3xl mb-4 group-hover:text-amber-900 transition-colors">{featured.Title}</h2>
                <p className="text-stone-600 mb-4">{stripHtml(featured.Description)}</p>
                <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Read More →</div>
              </Link>
            )}

            {rest.map((b) => (
              <Link key={b.Id} href={`/blogs/${b.Id}`} className="group border-t border-stone-100 pt-6">
                <h3 className="font-serif text-xl mb-3 group-hover:text-amber-900 transition-colors">{b.Title}</h3>
                <p className="text-sm text-stone-600 mb-4">{stripHtml(b.Description)}</p>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>{formatDate(b.Date)}</span>
                  <span className="group-hover:text-amber-800">Read Article</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <nav className="mt-20 flex justify-center gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => handlePage(p)} className={`w-10 h-10 border ${p === currentPage ? "bg-stone-900 text-white" : "border-stone-200 hover:border-stone-900"}`}>
              {p}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}