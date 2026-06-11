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
      day: "numeric", month: "long", year: "numeric",
    });

  const initials = (name = "") =>
    name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <>
  
      <div className="bd-root">
        {/* ── Loading ── */}
        {loading && (
          <div className="bd-state">
            <div className="bd-state-box">
              <div className="bd-spinner" />
              <p className="bd-state-label">Loading article...</p>
            </div>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="bd-state">
            <div className="bd-state-box">
              <h2 className="bd-err-title">Something went wrong</h2>
              <p className="bd-err-msg">{error}</p>
              <button className="bd-retry-btn" onClick={() => window.location.reload()}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ── Content ── */}
        {!loading && !error && blog && (
          <>
            {/* Hero */}
            <div className="bd-hero" style={{ position: "relative" }}>
              {blog.Image ? (
                <>
                  <Image
                    className="bd-cover"
                    src={`/uploads/${blog.Image}`}
                    alt={blog.Title}
                    width={1600}
                    height={620}
                    sizes="100vw"
                    priority
                  />
                  <div className="bd-hero-overlay">
                    <div className="bd-hero-inner">
                      <button className="bd-back" onClick={() => router.back()}>
                        <svg className="bd-back-arr" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blogs
                      </button>
                      <div className="bd-eyebrow">
                        <span className="bd-ey-dot" />
                        <span className="bd-ey-text">Blog</span>
                      </div>
                      <h1 className="bd-blog-title">{blog.Title}</h1>
                      <div className="bd-meta">
                        <div className="bd-author-row">
                          <div className="bd-avatar">{initials(blog.Author)}</div>
                          <span className="bd-author-name">{blog.Author}</span>
                        </div>
                        <span className="bd-meta-sep" />
                        <span className="bd-pub-date">{formatDate(blog.Date)}</span>
                        <span className="bd-meta-sep" />
                        <span className="bd-read-time">
                          {Math.max(1, Math.ceil(blog.Content?.replace(/<[^>]*>/g, "").split(" ").length / 200))} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bd-cover-placeholder">
                    <svg className="bd-cover-ph-icon" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth={0.8}>
                      <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="bd-hero-overlay">
                    <div className="bd-hero-inner">
                      <button className="bd-back" onClick={() => router.back()}>
                        <svg className="bd-back-arr" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blogs
                      </button>
                      <div className="bd-eyebrow">
                        <span className="bd-ey-dot" />
                        <span className="bd-ey-text">Blog</span>
                      </div>
                      <h1 className="bd-blog-title">{blog.Title}</h1>
                      <div className="bd-meta">
                        <div className="bd-author-row">
                          <div className="bd-avatar">{initials(blog.Author)}</div>
                          <span className="bd-author-name">{blog.Author}</span>
                        </div>
                        <span className="bd-meta-sep" />
                        <span className="bd-pub-date">{formatDate(blog.Date)}</span>
                        <span className="bd-meta-sep" />
                        <span className="bd-read-time">
                          {Math.max(1, Math.ceil(blog.Content?.replace(/<[^>]*>/g, "").split(" ").length / 200))} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Body */}
            <div className="bd-content-wrap">
              <div className="bd-card">
                {/* Blog name (slug label) */}
                {blog.Name && (
                  <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3a5a7a", marginBottom: "24px" }}>
                    {blog.Name.replace(/-/g, " ")}
                  </p>
                )}

                {/* Main content */}
                <div
                  className="bd-prose"
                  dangerouslySetInnerHTML={{ __html: blog.Content }}
                />

                <div className="bd-divider" />

                {/* Share row */}
                <ShareRow />

                {/* Back button */}
                <div>
                  <button className="bd-back-footer" onClick={() => router.back()}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blogs
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ── Share buttons sub-component ── */
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
    <div className="bd-share-row">
      <span className="bd-share-label">Share</span>

      <button className="bd-share-btn" onClick={copyLink}>
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copy Link
      </button>

      <button className="bd-share-btn" onClick={shareOnWhatsApp}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.716a.5.5 0 00.625.632l5.963-1.527A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.433l-.371-.22-3.843.985.993-3.76-.239-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        WhatsApp
      </button>

      <button className="bd-share-btn" onClick={shareOnX}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Post on X
      </button>

      <span className={`bd-copied ${copied ? "show" : ""}`}>✓ Copied!</span>
    </div>
  );
}
