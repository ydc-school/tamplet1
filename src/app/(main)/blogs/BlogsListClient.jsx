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

  // Debounced search
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
      day: "numeric", month: "short", year: "numeric",
    });

  const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").slice(0, 120) + "...";

  const featured = currentPage === 1 && !searchQuery && blogs[0] ? blogs[0] : null;
  const rest = featured ? blogs.slice(1) : blogs;

  return (
    <>
    
      <div className="bl-root">
        {/* ── Hero ── */}
        <div className="bl-hero">
          <div className="bl-hero-inner">
            <div className="bl-eyebrow">
              <span className="bl-ey-dot" />
              <span className="bl-ey-text">Knowledge & Insights</span>
            </div>
            <h1 className="bl-title">Our Blog</h1>
            <div className="bl-meta-row">
              <p className="bl-count">
                Showing <span>{pagination.total}</span> article{pagination.total !== 1 ? "s" : ""}
              </p>
              <div className="bl-search-wrap">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#3a5a7a" strokeWidth={2.5}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  className="bl-search"
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bl-content">
          {/* ── Loading ── */}
          {loading && (
            <div className="bl-state">
              <div className="bl-spinner" />
              <p className="bl-state-label">Loading articles...</p>
            </div>
          )}

          {/* ── Error ── */}
          {!loading && error && (
            <div className="bl-state">
              <h2 className="bl-err-title">Something went wrong</h2>
              <p className="bl-err-msg">{error}</p>
              <button className="bl-retry-btn" onClick={() => fetchBlogs(currentPage, searchQuery)}>
                Try Again
              </button>
            </div>
          )}

          {/* ── Grid ── */}
          {!loading && !error && (
            <>
              <div className="bl-grid">
                {blogs.length === 0 && (
                  <div className="bl-empty">
                    <p className="bl-empty-title">No articles found</p>
                    <p className="bl-empty-sub">Try a different search term.</p>
                  </div>
                )}

                {/* Featured card */}
                {featured && (
                  <Link href={`/blogs/${featured.Id}`} className="bl-card bl-featured">
                    <div>
                      {featured.Image
                        ? (
                          <Image
                            className="bl-card-img"
                            src={`/uploads/${featured.Image}`}
                            alt={featured.Title}
                            width={900}
                            height={520}
                            sizes="(max-width: 640px) 100vw, 50vw"
                            priority
                          />
                        )
                        : (
                          <div className="bl-img-placeholder">
                            <svg className="bl-img-ph-icon" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth={1}>
                              <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                    </div>
                    <div className="bl-card-body">
                      <div>
                        <span className="bl-featured-badge">Featured</span>
                      </div>
                      <h2 className="bl-card-title">{featured.Title}</h2>
                      <p className="bl-card-excerpt">{stripHtml(featured.Description)}</p>
                      <div className="bl-card-footer">
                        <div className="bl-author-row">
                          <div className="bl-avatar">{initials(featured.Author)}</div>
                          <div>
                            <span className="bl-author-name">{featured.Author}</span>
                            <span className="bl-pub-date">{formatDate(featured.Date)}</span>
                          </div>
                        </div>
                        <span className="bl-read-more">
                          Read More
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Regular cards */}
                {rest.map((b) => (
                  <Link key={b.Id} href={`/blogs/${b.Id}`} className="bl-card">
                    {b.Image
                      ? (
                        <Image
                          className="bl-card-img"
                          src={`/uploads/${b.Image}`}
                          alt={b.Title}
                          width={520}
                          height={320}
                          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        />
                      )
                      : (
                        <div className="bl-img-placeholder">
                          <svg className="bl-img-ph-icon" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth={1}>
                            <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    <div className="bl-card-body">
                      <h2 className="bl-card-title">{b.Title}</h2>
                      <p className="bl-card-excerpt">{stripHtml(b.Description)}</p>
                      <div className="bl-card-footer">
                        <div className="bl-author-row">
                          <div className="bl-avatar">{initials(b.Author)}</div>
                          <div>
                            <span className="bl-author-name">{b.Author}</span>
                            <span className="bl-pub-date">{formatDate(b.Date)}</span>
                          </div>
                        </div>
                        <span className="bl-read-more">
                          Read
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* ── Pagination ── */}
              {pagination.totalPages > 1 && (
                <div className="bl-pagination">
                  <button
                    className="bl-page-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePage(currentPage - 1)}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={`bl-page-btn ${p === currentPage ? "active" : ""}`}
                      onClick={() => handlePage(p)}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    className="bl-page-btn"
                    disabled={currentPage === pagination.totalPages}
                    onClick={() => handlePage(currentPage + 1)}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
