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

  // ... (Fetch logic wahi rahegi)

  return (
    <main className="bd-root">
      {/*
        UI PROMPT — BLOG DETAIL PAGE:
        Hero: full-width cover image 1600×620 (or gray placeholder) + bottom gradient overlay.
        "← Back to Blogs" button top-left. Article title H1 (white on overlay). Meta: author + date.
        Content: max-width prose, rich HTML article (.bd-prose). Footer: divider + social share buttons.
        Medium/Substack-like readable layout. Full prompt: UI_PROMPTS.md → Section 18
      */}
      {loading && <section aria-busy="true">Loading article...</section>}

      {!loading && error && <section role="alert">Error: {error}</section>}

      {!loading && !error && blog && (
        <article>
          {/* Hero Section */}
          <header className="bd-hero">
            {blog.Image ? (
              <figure>
                <Image src={`/uploads/${blog.Image}`} alt={blog.Title} width={1600} height={620} priority />
              </figure>
            ) : (
              <div className="bd-cover-placeholder" aria-label="No image available" />
            )}

            <div className="bd-hero-inner">
              <button onClick={() => router.back()}>Back to Blogs</button>
              <h1>{blog.Title}</h1>
              
              {/* Meta Data */}
              <address className="bd-meta">
                <span className="bd-author-name">By {blog.Author}</span>
                <time dateTime={blog.Date}>{new Date(blog.Date).toLocaleDateString("en-IN")}</time>
              </address>
            </div>
          </header>

          {/* Blog Content */}
          <section className="bd-content-wrap">
            <div
              className="bd-prose"
              dangerouslySetInnerHTML={{ __html: blog.Content }}
            />
            
            <footer className="bd-divider">
              <ShareRow />
            </footer>
          </section>
        </article>
      )}
    </main>
  );
}

/* ── Share buttons remain the same ── */