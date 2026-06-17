"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function BlogsListPage({ initialBlogs = [], initialPagination = { total: 0, totalPages: 1 }, initialLoaded = false }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(!initialLoaded);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ... (Fetch logic wahi rahegi)

  return (
    <main className="bl-root">
      {/*
        UI PROMPT — BLOGS LIST PAGE:
        Hero: H1 "Our Blog" + subtitle "Knowledge & Insights" + search bar (rounded, placeholder "Search articles...").
        3-column blog grid: cover image 520×320, title H2, excerpt, footer meta (author + date). Hover shadow lift.
        Pagination: numbered buttons, active page gold filled. Loading/empty states.
        Full prompt: UI_PROMPTS.md → Section 17
      */}
      <header className="bl-hero">
        <h1>Our Blog</h1>
        <p>Knowledge & Insights</p>
        
        {/* Search Landmark */}
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="search" 
            placeholder="Search articles..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </form>
      </header>

      {/* Blog Feed */}
      <section aria-label="Blog posts">
        {loading ? (
          <div aria-live="polite">Loading articles...</div>
        ) : (
          <div className="bl-grid">
            {blogs.map((b) => (
              <article key={b.Id} className="bl-card">
                <Link href={`/blogs/${b.Id}`}>
                  <figure>
                    <Image src={`/uploads/${b.Image}`} alt={b.Title} width={520} height={320} />
                  </figure>
                  <header>
                    <h2>{b.Title}</h2>
                  </header>
                  <p>{stripHtml(b.Description)}</p>
                  <footer>
                    <address>By {b.Author}</address>
                    <time dateTime={b.Date}>{formatDate(b.Date)}</time>
                  </footer>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Pagination Landmark */}
      {pagination.totalPages > 1 && (
        <nav aria-label="Pagination Navigation">
          <ol>
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <li key={i + 1}>
                <button 
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                  onClick={() => handlePage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </main>
  );
}