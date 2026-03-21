"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/blog")
      .then((res) => {
        if (res.data.status === "success") {
          setBlogs(res.data.data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bl-root">
        <div className="bl-inner">
          <div className="bl-eyebrow">
            <div className="bl-ey-line" />
            <span className="bl-ey-text">Latest Updates</span>
            <div className="bl-ey-line rev" />
          </div>
          <div className="bl-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bl-skeleton" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  // Strip HTML for plain text preview
  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  };

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <>
      <style>{`

        .bl-root {
          width: 100%;
          background: #071020;
          padding: 80px 24px;
          font-family: 'Source Sans 3', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .bl-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(196,160,72,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .bl-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,160,72,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,160,72,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .bl-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Eyebrow */
        .bl-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .bl-ey-line {
          width: 56px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,160,72,0.5));
        }
        .bl-ey-line.rev {
          background: linear-gradient(to left, transparent, rgba(196,160,72,0.5));
        }
        .bl-ey-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c4a048;
        }

        .bl-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 700;
          color: #f0e6c8;
          text-align: center;
          margin-bottom: 52px;
        }

        /* ── Featured card ── */
        .bl-featured {
          display: flex;
          flex-direction: column;
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.15);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 28px;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
          text-decoration: none;
        }
        @media (min-width: 768px) {
          .bl-featured { flex-direction: row; min-height: 320px; }
        }
        .bl-featured:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        }

        .bl-feat-img {
          position: relative;
          width: 100%;
          min-height: 220px;
          flex-shrink: 0;
          background: #071020;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .bl-feat-img { width: 44%; min-height: unset; }
        }
        .bl-feat-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 55%, #0f2044);
        }
        @media (max-width: 767px) {
          .bl-feat-img::after {
            background: linear-gradient(to top, #0f2044 0%, transparent 55%);
          }
        }

        .bl-feat-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          background: #c4a048;
          color: #071020;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
        }

        .bl-feat-body {
          flex: 1;
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 3px solid #c4a048;
        }
        @media (max-width: 767px) {
          .bl-feat-body {
            border-left: none;
            border-top: 3px solid #c4a048;
            padding: 24px 24px 28px;
          }
        }

        .bl-feat-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .bl-meta-date {
          font-size: 11.5px;
          color: #c4a048;
          font-weight: 600;
          letter-spacing: 0.06em;
        }
        .bl-meta-author {
          font-size: 11.5px;
          color: #4a6a8a;
          text-transform: capitalize;
        }
        .bl-meta-sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #2a4060;
        }

        .bl-feat-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 700;
          color: #f0e6c8;
          line-height: 1.3;
          margin-bottom: 14px;
        }
        .bl-feat-desc {
          font-size: 14px;
          line-height: 1.8;
          color: #6a8aaa;
          margin-bottom: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bl-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c4a048;
          border-bottom: 1px solid rgba(196,160,72,0.25);
          padding-bottom: 3px;
          width: fit-content;
          transition: all 0.2s;
        }
        .bl-featured:hover .bl-read-btn {
          color: #e0c060;
          border-color: #c4a048;
          gap: 11px;
        }

        /* ── Grid cards ── */
        .bl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 560px) {
          .bl-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .bl-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .bl-card {
          background: linear-gradient(145deg, #0f2044 0%, #091830 100%);
          border: 1px solid rgba(196,160,72,0.12);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          box-shadow: 0 8px 28px rgba(0,0,0,0.3);
        }
        .bl-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 48px rgba(0,0,0,0.45);
          border-color: rgba(196,160,72,0.28);
        }

        .bl-card-strip {
          height: 3px;
          background: linear-gradient(90deg, #c4a048, #e0c060, #c4a048);
        }

        .bl-card-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #071020;
          overflow: hidden;
        }
        .bl-card-img img {
          transition: transform 0.4s ease !important;
        }
        .bl-card:hover .bl-card-img img {
          transform: scale(1.04) !important;
        }
        .bl-card-img-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #0f2044 0%, #152a55 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bl-card-body {
          flex: 1;
          padding: 20px 22px 24px;
          display: flex;
          flex-direction: column;
        }

        .bl-card-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .bl-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 600;
          color: #d8c8a0;
          line-height: 1.4;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }
        .bl-card:hover .bl-card-title { color: #f0e6c8; }

        .bl-card-desc {
          font-size: 13px;
          line-height: 1.75;
          color: #4a6a8a;
          margin-bottom: 18px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bl-card-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(196,160,72,0.6);
          transition: all 0.2s;
        }
        .bl-card:hover .bl-card-link {
          color: #c4a048;
          gap: 9px;
        }

        /* View all */
        .bl-view-all {
          display: flex;
          justify-content: center;
          margin-top: 44px;
        }
        .bl-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(196,160,72,0.3);
          color: #c4a048;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 13px 32px;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.25s;
        }
        .bl-view-btn:hover {
          background: rgba(196,160,72,0.08);
          border-color: #c4a048;
          transform: translateY(-2px);
        }

        /* Skeleton */
        .bl-skeleton {
          height: 280px;
          border-radius: 4px;
          background: linear-gradient(90deg, #0f2044 25%, #152a52 50%, #0f2044 75%);
          background-size: 200% 100%;
          animation: bl-shimmer 1.5s infinite;
        }
        @keyframes bl-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section className="bl-root">
        <div className="bl-inner">

          {/* Header */}
          <div className="bl-eyebrow">
            <div className="bl-ey-line" />
            <span className="bl-ey-text">News &amp; Updates</span>
            <div className="bl-ey-line rev" />
          </div>
          <h2 className="bl-heading">Latest from Campus</h2>

          {/* Featured (first blog) */}
          <Link href={`/blog/${featured.Id}`} className="bl-featured">
            {featured.Image ? (
              <div className="bl-feat-img">
                <Image
                  src={`/uploads/${featured.Image}`}
                  alt={featured.Title || "Blog"}
                  fill
                  sizes="(max-width: 767px) 100vw, 44vw"
                  className="object-cover"
                  priority
                />
                <span className="bl-feat-badge">Featured</span>
              </div>
            ) : null}
            <div className="bl-feat-body">
              <div className="bl-feat-meta">
                {featured.Date && <span className="bl-meta-date">{formatDate(featured.Date)}</span>}
                {featured.Author && (
                  <>
                    <span className="bl-meta-sep" />
                    <span className="bl-meta-author">{featured.Author}</span>
                  </>
                )}
              </div>
              {featured.Title && <h3 className="bl-feat-title">{featured.Title}</h3>}
              {featured.Description && (
                <p className="bl-feat-desc">{stripHtml(featured.Description)}</p>
              )}
              <span className="bl-read-btn">
                Read More
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Grid (remaining blogs) */}
          {rest.length > 0 && (
            <div className="bl-grid">
              {rest.map((blog) => (
                <Link key={blog.Id} href={`/blog/${blog.Id}`} className="bl-card">
                  <div className="bl-card-strip" />
                  {blog.Image ? (
                    <div className="bl-card-img">
                      <Image
                        src={`/uploads/${blog.Image}`}
                        alt={blog.Title || "Blog"}
                        fill
                        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bl-card-img-placeholder">
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="rgba(196,160,72,0.2)" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  <div className="bl-card-body">
                    <div className="bl-card-meta">
                      {blog.Date && <span className="bl-meta-date">{formatDate(blog.Date)}</span>}
                      {blog.Author && (
                        <>
                          <span className="bl-meta-sep" />
                          <span className="bl-meta-author">{blog.Author}</span>
                        </>
                      )}
                    </div>
                    {blog.Title && <h3 className="bl-card-title">{blog.Title}</h3>}
                    {blog.Description && (
                      <p className="bl-card-desc">{stripHtml(blog.Description)}</p>
                    )}
                    <span className="bl-card-link">
                      Read More
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* View all */}
          <div className="bl-view-all">
            <Link href="/blog" className="bl-view-btn">
              View All Posts
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}