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
          <Link href={`/blogs/${featured.Id}`} className="bl-featured">
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
                <Link key={blog.Id} href={`/blogs/${blog.Id}`} className="bl-card">
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
            <Link href="/blogs" className="bl-view-btn">
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