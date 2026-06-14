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

  if (loading) return <section className="py-24 bg-surface animate-pulse"><div className="max-w-container-max mx-auto px-6 h-96 bg-secondary-container" /></section>;
  if (blogs.length === 0) return null;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const stripHtml = (html) => html?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().substring(0, 120) + "...";

  const featured = blogs[0];
  const rest = blogs.slice(1, 4); // Display limited posts for balance

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span> LATEST FROM CAMPUS
          </span>
          <h2 className="font-headline-lg text-primary">News & Updates</h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Featured Post */}
          <Link href={`/blogs/${featured.Id}`} className="group relative block overflow-hidden bg-surface-container-lowest">
            <div className="relative h-96 w-full overflow-hidden">
              {featured.Image && <Image src={`/uploads/${featured.Image}`} alt={featured.Title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              <div className="absolute top-6 left-6 bg-primary text-on-primary px-4 py-1 font-label-caps text-xs">FEATURED</div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-secondary mb-4 font-label-caps">
                <span>{formatDate(featured.Date)}</span>
                <span className="w-1 h-1 bg-secondary rounded-full" />
                <span>{featured.Author || "Admin"}</span>
              </div>
              <h3 className="font-headline-md text-primary mb-4 group-hover:text-secondary transition-colors">{featured.Title}</h3>
              <p className="text-secondary leading-relaxed mb-6">{stripHtml(featured.Description)}</p>
              <span className="inline-flex items-center gap-2 font-label-caps text-primary border-b border-primary pb-1">
                Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </Link>

          {/* Secondary Posts */}
          <div className="flex flex-col gap-8">
            {rest.map((blog) => (
              <Link key={blog.Id} href={`/blogs/${blog.Id}`} className="group flex items-start gap-6 border-b border-on-surface/10 pb-8 last:border-0 last:pb-0">
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                  {blog.Image ? <Image src={`/uploads/${blog.Image}`} alt={blog.Title} fill className="object-cover" /> : <div className="w-full h-full bg-secondary-container" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 text-xs text-secondary mb-2 font-label-caps">
                    <span>{formatDate(blog.Date)}</span>
                  </div>
                  <h4 className="font-headline-sm text-primary mb-2 group-hover:text-secondary transition-colors">{blog.Title}</h4>
                  <p className="text-sm text-secondary line-clamp-2">{stripHtml(blog.Description)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link href="/blogs" className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 font-label-caps hover:opacity-90 transition-all">
            View All Posts <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}