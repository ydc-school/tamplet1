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
      .catch(() => { })
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


      <section>
        <div>
          {/* Header */}
          <div>
            <div />
            <span>News &amp; Updates</span>
            <div />
          </div>
          <h2>Latest from Campus</h2>

          {/* Featured (first blog) */}
          <Link href={`/blogs/${featured.Id}`}>
            {featured.Image ? (
              <div>
                <Image
                  src={`/uploads/${featured.Image}`}
                  alt={featured.Title || "Blog"}
                  fill
                  sizes="(max-width: 767px) 100vw, 44vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <span>Featured</span>
              </div>
            ) : null}
            <div>
              <div>
                {featured.Date && <span>{formatDate(featured.Date)}</span>}
                {featured.Author && (
                  <>
                    <span />
                    <span>{featured.Author}</span>
                  </>
                )}
              </div>
              {featured.Title && <h3>{featured.Title}</h3>}
              {featured.Description && <p>{stripHtml(featured.Description)}</p>}
              <span>
                Read More
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Grid (remaining blogs) */}
          {rest.length > 0 && (
            <div>
              {rest.map((blog) => (
                <Link key={blog.Id} href={`/blogs/${blog.Id}`}>
                  <div />
                  {blog.Image ? (
                    <div>
                      <Image
                        src={`/uploads/${blog.Image}`}
                        alt={blog.Title || "Blog"}
                        fill
                        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="rgba(196,160,72,0.2)" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <div>
                      {blog.Date && <span>{formatDate(blog.Date)}</span>}
                      {blog.Author && (
                        <>
                          <span />
                          <span>{blog.Author}</span>
                        </>
                      )}
                    </div>
                    {blog.Title && <h3>{blog.Title}</h3>}
                    {blog.Description && <p>{stripHtml(blog.Description)}</p>}
                    <span>
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
          <div>
            <Link href="/blogs">
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