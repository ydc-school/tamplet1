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
      <style>{`
        .bl-root { min-height: 100vh; background: #f6f8fc; font-family: 'Source Sans 3', sans-serif; position: relative; overflow: hidden; }
        .bl-root::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%); pointer-events: none; }
        .bl-root::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px); background-size: 56px 56px; pointer-events: none; }

        /* Hero */
        .bl-hero { width: 100%; background: linear-gradient(160deg, #f3f7fc 0%, #f6f8fc 100%); border-bottom: 1px solid rgba(196,160,72,0.12); padding: 110px 24px 48px; position: relative; z-index: 1; overflow: hidden; }
        .bl-hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent); }
        .bl-hero-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
        .bl-eyebrow { display: inline-flex; align-items: center; gap: 8px; }
        .bl-ey-dot { width: 5px; height: 5px; border-radius: 50%; background: #c4a048; }
        .bl-ey-text { font-size: 10px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: #c4a048; }
        .bl-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 46px); font-weight: 800; color: #10213a; line-height: 1.2; margin: 0; }
        .bl-meta-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .bl-count { font-size: 13px; color: #3a5a7a; }
        .bl-count span { color: #c4a048; font-weight: 700; }
        .bl-search-wrap { position: relative; margin-left: auto; }
        .bl-search-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; }
        .bl-search { background: rgba(255,255,255,0.04); border: 1px solid rgba(196,160,72,0.15); border-radius: 2px; color: #1d3557; font-family: inherit; font-size: 13px; padding: 9px 14px 9px 36px; width: 240px; outline: none; transition: border-color 0.2s; }
        .bl-search::placeholder { color: #3a5a7a; }
        .bl-search:focus { border-color: rgba(196,160,72,0.4); }

        /* Content */
        .bl-content { max-width: 1100px; margin: 0 auto; padding: 48px 24px 80px; position: relative; z-index: 1; }

        /* Grid */
        .bl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

        /* Card */
        .bl-card { background: linear-gradient(145deg, #ffffff 0%, #edf4ff 100%); border: 1px solid rgba(196,160,72,0.12); border-radius: 4px; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; cursor: pointer; transition: border-color 0.22s, transform 0.22s; }
        .bl-card:hover { border-color: rgba(196,160,72,0.35); transform: translateY(-3px); }

        /* Img */
        .bl-card-img { width: 100%; height: 180px; object-fit: cover; display: block; filter: brightness(0.85) saturate(0.7); transition: filter 0.3s; }
        .bl-card:hover .bl-card-img { filter: brightness(0.95) saturate(0.9); }
        .bl-img-placeholder { width: 100%; height: 180px; background: linear-gradient(135deg, #f3f7fc 0%, #f6f8fc 100%); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(196,160,72,0.08); }
        .bl-img-ph-icon { opacity: 0.15; }

        /* Card body */
        .bl-card-body { padding: 22px 24px 20px; flex: 1; display: flex; flex-direction: column; gap: 10px; position: relative; }
        .bl-card-body::before { content: ''; position: absolute; top: 0; right: 0; width: 80px; height: 80px; background: radial-gradient(circle at top right, rgba(196,160,72,0.05), transparent 70%); pointer-events: none; }
        .bl-cat-badge { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #c4a048; background: rgba(196,160,72,0.08); border: 1px solid rgba(196,160,72,0.18); border-radius: 2px; padding: 3px 8px; display: inline-block; }
        .bl-card-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #10213a; line-height: 1.35; margin: 0; flex: 1; }
        .bl-card-excerpt { font-size: 13px; line-height: 1.7; color: #3a5a7a; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        /* Card footer */
        .bl-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(196,160,72,0.08); margin-top: 4px; }
        .bl-author-row { display: flex; align-items: center; gap: 8px; }
        .bl-avatar { width: 26px; height: 26px; border-radius: 50%; background: rgba(196,160,72,0.12); border: 1px solid rgba(196,160,72,0.2); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #c4a048; flex-shrink: 0; }
        .bl-author-name { font-size: 11px; font-weight: 600; color: #1d3557; display: block; }
        .bl-pub-date { font-size: 10px; color: #3a5a7a; display: block; }
        .bl-read-more { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #c4a048; }
        .bl-card:hover .bl-read-more { gap: 8px; }

        /* Featured */
        .bl-featured { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; min-height: 260px; }
        @media (max-width: 640px) { .bl-featured { grid-template-columns: 1fr; } }
        .bl-featured .bl-img-placeholder { height: 100%; min-height: 200px; }
        .bl-featured .bl-card-img { height: 100%; min-height: 200px; }
        .bl-featured .bl-card-title { font-size: clamp(18px, 2.5vw, 24px); }
        .bl-featured-badge { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #f6f8fc; background: #c4a048; border-radius: 2px; padding: 3px 8px; display: inline-block; margin-bottom: 4px; }

        /* States */
        .bl-state { min-height: 40vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; }
        .bl-spinner { width: 38px; height: 38px; border: 2px solid rgba(196,160,72,0.12); border-top-color: #c4a048; border-radius: 50%; animation: bl-spin 0.8s linear infinite; }
        @keyframes bl-spin { to { transform: rotate(360deg); } }
        .bl-state-label { font-size: 14px; color: #3a5a7a; }
        .bl-err-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #10213a; margin-bottom: 8px; }
        .bl-err-msg { font-size: 14px; color: #3a5a7a; margin-bottom: 16px; }
        .bl-retry-btn { display: inline-flex; align-items: center; gap: 7px; background: #c4a048; color: #f6f8fc; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 11px 24px; border: none; border-radius: 2px; cursor: pointer; font-family: inherit; }
        .bl-retry-btn:hover { background: #e0c060; }
        .bl-empty { text-align: center; padding: 60px 24px; grid-column: 1 / -1; }
        .bl-empty-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #10213a; margin-bottom: 8px; }
        .bl-empty-sub { font-size: 14px; color: #3a5a7a; }

        /* Pagination */
        .bl-pagination { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 48px; }
        .bl-page-btn { width: 36px; height: 36px; border: 1px solid rgba(196,160,72,0.15); border-radius: 2px; background: transparent; color: #3a5a7a; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: inherit; transition: all 0.18s; }
        .bl-page-btn:hover:not(:disabled) { border-color: rgba(196,160,72,0.35); color: #c4a048; }
        .bl-page-btn.active { background: #c4a048; border-color: #c4a048; color: #f6f8fc; }
        .bl-page-btn:disabled { opacity: 0.3; cursor: default; }
      `}</style>

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
