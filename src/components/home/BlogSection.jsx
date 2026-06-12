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
        if (res?.data?.status === "success") {
          setBlogs(res?.data?.data?.data || []);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[2px] w-8 bg-gray-200" />
            <div className="h-4 bg-gray-200 rounded w-28" />
          </div>
          <div className="h-8 bg-gray-300 rounded-lg w-48 mb-10" />
          
          {/* Featured Skeleton */}
          <div className="bg-[#01327F]/[0.03] rounded-2xl h-64 md:h-80 w-full mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="bg-gray-200 rounded-xl h-full w-full" />
            <div className="space-y-4 justify-center flex flex-col">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#01327F]/[0.02] p-4 rounded-2xl space-y-4">
                <div className="bg-gray-200 h-48 rounded-xl w-full" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-5 bg-gray-300 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if ((blogs?.length || 0) === 0) return null;

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
      <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[2px] w-8 bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">News &amp; Updates</span>
              <div />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#01327F]">Latest from Campus</h2>
          </div>

          {/* Featured (first blog) */}
          {featured && (
            <Link 
              href={`/blogs/${featured?.Id}`}
              className="group block bg-[#01327F]/[0.03] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 transition-all duration-300 hover:bg-[#01327F]/5"
            >
              {featured?.Image ? (
                <div className="relative w-full h-56 sm:h-64 md:h-full min-h-[240px] bg-white">
                  <Image
                    src={`/uploads/${featured.Image}`}
                    alt={featured?.Title || "Blog"}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-102"
                    priority
                  />
                  <span className="absolute top-4 left-4 bg-amber-400 text-[#01327F] text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-sm">
                    Featured
                  </span>
                </div>
              ) : null}
              <div className="p-6 md:p-8 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                  {featured?.Date && <span>{formatDate(featured.Date)}</span>}
                  {featured?.Author && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="truncate">{featured.Author}</span>
                    </>
                  )}
                </div>
                {featured?.Title && (
                  <h3 className="text-xl md:text-2xl font-bold text-[#01327F] mb-3 group-hover:text-amber-500 transition-colors duration-150 line-clamp-2 leading-snug">
                    {featured.Title}
                  </h3>
                )}
                {featured?.Description && (
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
                    {stripHtml(featured.Description)}
                  </p>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#01327F] group-hover:text-amber-500 transition-colors duration-150 mt-auto">
                  Read More
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          {/* Grid (remaining blogs) */}
          {(rest?.length || 0) > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {rest.map((blog) => (
                <Link 
                  key={blog?.Id} 
                  href={`/blogs/${blog?.Id}`}
                  className="group block bg-[#01327F]/[0.02] rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:bg-[#01327F]/5"
                >
                  <div />
                  {blog?.Image ? (
                    <div className="relative w-full h-48 sm:h-52 shrink-0 bg-white">
                      <Image
                        src={`/uploads/${blog.Image}`}
                        alt={blog?.Title || "Blog"}
                        fill
                        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-102"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-[#01327F]/[0.03] flex items-center justify-center shrink-0 rounded-t-2xl">
                      <svg className="w-8 h-8 text-amber-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5 font-medium">
                      {blog?.Date && <span>{formatDate(blog.Date)}</span>}
                      {blog?.Author && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="truncate">{blog.Author}</span>
                        </>
                      )}
                    </div>
                    {blog?.Title && (
                      <h3 className="text-base md:text-lg font-bold text-[#01327F] mb-2 group-hover:text-amber-500 transition-colors duration-150 line-clamp-2 leading-snug">
                        {blog.Title}
                      </h3>
                    )}
                    {blog?.Description && (
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                        {stripHtml(blog.Description)}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#01327F] group-hover:text-amber-500 transition-colors duration-150 mt-auto">
                      Read More
                      <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* View all */}
          <div className="flex justify-center mt-4">
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-[#01327F] text-white px-6 py-3 rounded-xl hover:bg-amber-400 hover:text-[#01327F] transition-all duration-200 group active:scale-95"
            >
              View All Posts
              <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}