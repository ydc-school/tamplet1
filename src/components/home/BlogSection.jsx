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
        if (res.data?.status === "success") setBlogs(res.data.data.data || []);
      })
      .catch((err) => console.error("Blog fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading updates...</p>;
  if (!blogs || blogs.length === 0) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };
  
  const stripHtml = (html) => html?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || "";

  const [featured, ...rest] = blogs;

  return (
    <article>
      <header>
        <span>News &amp; Updates</span>
        <h2>Latest from Campus</h2>
      </header>

      {/* Featured Blog */}
      {featured && (
        <Link href={`/blogs/${featured.Id}`}>
          {featured.Image && (
            <figure>
              <Image src={`/uploads/${featured.Image}`} alt={featured.Title || "Blog"} width={800} height={400} />
              <span>Featured</span>
            </figure>
          )}
          <time dateTime={featured.Date}>{formatDate(featured.Date)}</time>
          <span>{featured.Author}</span>
          <h3>{featured.Title}</h3>
          <p>{stripHtml(featured.Description)}</p>
        </Link>
      )}

      {/* Remaining Blogs */}
      {rest.length > 0 && (
        <main>
          {rest.map((blog) => (
            <Link key={blog.Id} href={`/blogs/${blog.Id}`}>
              {blog.Image && (
                <figure>
                  <Image src={`/uploads/${blog.Image}`} alt={blog.Title || "Blog"} width={400} height={250} />
                </figure>
              )}
              <time dateTime={blog.Date}>{formatDate(blog.Date)}</time>
              <h3>{blog.Title}</h3>
              <p>{stripHtml(blog.Description)}</p>
            </Link>
          ))}
        </main>
      )}

      <footer>
        <Link href="/blogs">View All Posts</Link>
      </footer>
    </article>
  );
}