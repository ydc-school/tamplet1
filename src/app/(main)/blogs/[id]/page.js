"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const IMG_BASE = process.env.NEXT_PUBLIC_BACKEND_URL + "/uploads/";

export default function BlogDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
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
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });

  const initials = (name = "") =>
    name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <>
      <style>{`
        .bd-root {
          min-height: 100vh;
          background: #071020;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .bd-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .bd-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.02) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* ── Hero ── */
        .bd-hero {
          width: 100%;
          background: linear-gradient(160deg, #0c1e3a 0%, #071020 100%);
          border-bottom: 1px solid rgba(196,160,72,0.12);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .bd-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent);
        }

        /* Cover image */
        .bd-cover {
          width: 100%;
          height: clamp(220px, 38vw, 420px);
          object-fit: fill;
          display: block;
          filter: brightness(0.55) saturate(0.6);
        }
        .bd-cover-placeholder {
          width: 100%;
          height: clamp(220px, 38vw, 420px);
          background: linear-gradient(135deg, #0c1e3a 0%, #071020 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(196,160,72,0.08);
        }
        .bd-cover-ph-icon { opacity: 0.1; }

        /* Hero text overlay */
        .bd-hero-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(7,16,32,0.95) 0%, rgba(7,16,32,0.5) 60%, transparent 100%);
          padding: 60px 24px 48px;
        }
        .bd-hero-inner { max-width: 860px; margin: 0 auto; }

        /* Back button */
        .bd-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(196,160,72,0.6); background: none; border: none;
          cursor: pointer; padding: 0; margin-bottom: 20px;
          transition: color 0.2s; font-family: inherit;
        }
        .bd-back:hover { color: #c4a048; }
        .bd-back:hover .bd-back-arr { transform: translateX(-3px); }
        .bd-back-arr { transition: transform 0.2s; }

        /* Eyebrow */
        .bd-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 14px;
        }
        .bd-ey-dot { width: 5px; height: 5px; border-radius: 50%; background: #c4a048; flex-shrink: 0; }
        .bd-ey-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase; color: #c4a048;
        }

        .bd-blog-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 4vw, 42px);
          font-weight: 800; color: #f0e6c8;
          line-height: 1.2; margin: 0 0 20px;
        }

        /* Meta row */
        .bd-meta {
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
        }
        .bd-author-row { display: flex; align-items: center; gap: 8px; }
        .bd-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(196,160,72,0.15);
          border: 1px solid rgba(196,160,72,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #c4a048; flex-shrink: 0;
        }
        .bd-author-name { font-size: 13px; font-weight: 600; color: #c5d8e8; }
        .bd-meta-sep { width: 3px; height: 3px; border-radius: 50%; background: #3a5a7a; }
        .bd-pub-date { font-size: 12px; color: #3a5a7a; }
        .bd-read-time { font-size: 12px; color: #3a5a7a; }

        /* No cover — hero with padding only */
        .bd-hero-text-only { padding: 110px 24px 48px; }

        /* ── Content ── */
        .bd-content-wrap {
          max-width: 860px;
          margin: 0 auto;
          padding: 52px 24px 80px;
          position: relative;
          z-index: 1;
        }

        .bd-card {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          padding: 40px 48px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 600px) { .bd-card { padding: 28px 20px; } }
        .bd-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          background: radial-gradient(circle at top right, rgba(196,160,72,0.06), transparent 70%);
          pointer-events: none;
        }

        /* ── Prose ── */
        .bd-prose {
          font-size: 15.5px;
          line-height: 1.85;
          color: #6a8aaa;
        }
        .bd-prose h1, .bd-prose h2, .bd-prose h3,
        .bd-prose h4, .bd-prose h5, .bd-prose h6 {
          font-family: 'Playfair Display', serif;
          color: #f0e6c8; line-height: 1.3;
          margin: 28px 0 12px; font-weight: 700;
        }
        .bd-prose h1 { font-size: clamp(22px, 3vw, 30px); }
        .bd-prose h2 { font-size: clamp(19px, 2.5vw, 25px); }
        .bd-prose h3 { font-size: 20px; }
        .bd-prose h4 { font-size: 17px; }
        .bd-prose p { margin-bottom: 16px; }
        .bd-prose strong { color: #c5d8e8; font-weight: 600; }
        .bd-prose em { color: #c4a048; font-style: italic; }
        .bd-prose a { color: #c4a048; text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s; }
        .bd-prose a:hover { color: #e0c060; }
        .bd-prose ul, .bd-prose ol { padding-left: 20px; margin-bottom: 16px; }
        .bd-prose li { margin-bottom: 8px; }
        .bd-prose ul li::marker { color: #c4a048; }
        .bd-prose ol li::marker { color: #c4a048; font-weight: 700; }
        .bd-prose blockquote {
          border-left: 3px solid #c4a048;
          padding: 14px 20px; margin: 24px 0;
          background: rgba(196,160,72,0.05);
          border-radius: 0 3px 3px 0;
          color: rgba(196,160,72,0.75);
          font-style: italic;
        }
        .bd-prose hr {
          border: none; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,160,72,0.3), transparent);
          margin: 32px 0;
        }
        .bd-prose table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .bd-prose th {
          background: rgba(196,160,72,0.08); color: #c4a048;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 12px 16px; border: 1px solid rgba(196,160,72,0.12); text-align: left;
        }
        .bd-prose td {
          padding: 11px 16px; border: 1px solid rgba(196,160,72,0.08);
          color: #6a8aaa; font-size: 14px;
        }
        .bd-prose tr:hover td { background: rgba(196,160,72,0.03); }
        .bd-prose img {
          max-width: 100%; border-radius: 4px;
          border: 1px solid rgba(196,160,72,0.12); margin: 16px 0;
        }

        /* ── Divider ── */
        .bd-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,160,72,0.2), transparent);
          margin: 36px 0;
        }

        /* ── Share row ── */
        .bd-share-row {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .bd-share-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #3a5a7a;
        }
        .bd-share-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent;
          border: 1px solid rgba(196,160,72,0.18);
          border-radius: 2px; padding: 7px 14px;
          font-size: 12px; font-weight: 600; color: #6a8aaa;
          cursor: pointer; font-family: inherit;
          transition: all 0.18s;
        }
        .bd-share-btn:hover { border-color: rgba(196,160,72,0.4); color: #c4a048; }
        .bd-copied {
          font-size: 11px; color: #c4a048; opacity: 0;
          transition: opacity 0.3s;
        }
        .bd-copied.show { opacity: 1; }

        /* ── Back footer ── */
        .bd-back-footer {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #3a5a7a; background: transparent;
          border: 1px solid rgba(196,160,72,0.15);
          border-radius: 2px; padding: 10px 20px;
          cursor: pointer; font-family: inherit;
          transition: all 0.2s; margin-top: 36px;
        }
        .bd-back-footer:hover { color: #c4a048; border-color: rgba(196,160,72,0.35); }

        /* ── States ── */
        .bd-state {
          min-height: 60vh; display: flex; align-items: center;
          justify-content: center; padding: 40px 24px;
          position: relative; z-index: 1;
        }
        .bd-state-box { text-align: center; }
        .bd-spinner {
          width: 38px; height: 38px;
          border: 2px solid rgba(196,160,72,0.12);
          border-top-color: #c4a048; border-radius: 50%;
          animation: bd-spin 0.8s linear infinite;
          margin: 0 auto 14px;
        }
        @keyframes bd-spin { to { transform: rotate(360deg); } }
        .bd-state-label { font-size: 14px; color: #3a5a7a; }
        .bd-err-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 700; color: #f0e6c8; margin-bottom: 10px;
        }
        .bd-err-msg { font-size: 14px; color: #3a5a7a; margin-bottom: 24px; }
        .bd-retry-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: #c4a048; color: #071020;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 11px 24px; border: none; border-radius: 2px;
          cursor: pointer; font-family: inherit;
        }
        .bd-retry-btn:hover { background: #e0c060; }
      `}</style>

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
                  <img
                    className="bd-cover"
                    src={`/uploads/${blog.Image}`}
                    alt={blog.Title}
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