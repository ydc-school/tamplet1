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
        if (res.data?.status === "success") {
          const dataArray = res.data.data?.data || res.data.data || [];
          setBlogs(dataArray);
        }
      })
      .catch((err) => console.error("Blog fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="max-w-[1280px] mx-auto px-8 py-20 animate-pulse space-y-12">
        <div className="w-1/4 h-4 bg-slate-200 rounded mx-auto"></div>
        <div className="w-2/4 h-10 bg-slate-200 rounded mx-auto mb-12"></div>
        <div className="h-[400px] bg-slate-100 rounded-[2.5rem] w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 bg-slate-100 rounded-3xl w-full"></div>
          ))}
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  
  const stripHtml = (html) => html?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || "";

  const [featured, ...rest] = blogs;

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* HEADER SECTION */}
        <header className="text-center space-y-3 mb-16">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            News &amp; Updates
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1e1b4b] tracking-tight">
            Latest from Campus
          </h2>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mx-auto mt-2" />
        </header>

        {/* FEATURED POST — LUXURY MAGAZINE HERO CARD */}
        {featured && (
          <div className="mb-16 md:mb-24">
            <Link 
              href={`/blogs/${featured.Id}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#f8fafc]/60 border border-[#f1f5f9] p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 items-center block"
            >
              {/* फ़ीचर्ड इमेज फ़्रेम */}
              {featured.Image && (
                <figure className="relative w-full aspect-[2/1] lg:aspect-auto lg:h-[400px] lg:col-span-7 rounded-[2rem] overflow-hidden bg-slate-100 shadow-md">
                  <Image 
                    src={`/uploads/${featured.Image}`} 
                    alt={featured.Title || "Featured Blog"} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    priority
                  />
                  {/* फ़ीचर्ड गोल्ड बैज */}
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-[#c4a048] to-[#aa842c] text-white font-sans font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg z-10">
                    Featured
                  </span>
                </figure>
              )}

              {/* फ़ीचर्ड कंटेंट */}
              <div className={`space-y-4 lg:col-span-5 ${!featured.Image ? "lg:col-span-12" : ""}`}>
                <div className="flex items-center gap-3 font-sans text-xs font-semibold text-[#0f172a]/50">
                  <time dateTime={featured.Date}>{formatDate(featured.Date)}</time>
                  {featured.Author && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#1e1b4b]/20" />
                      <span className="text-[#7f1d1d] uppercase tracking-wider font-bold">{featured.Author}</span>
                    </>
                  )}
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors leading-snug">
                  {featured.Title}
                </h3>
                
                <p className="font-sans text-sm md:text-base text-[#0f172a]/65 leading-relaxed font-medium line-clamp-4">
                  {stripHtml(featured.Description)}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 font-sans font-black text-xs uppercase tracking-widest text-[#c4a048] group-hover:text-[#1e1b4b] transition-colors">
                    Read Article 
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* REMAINING BLOGS MATRIX GRID */}
        {rest.length > 0 && (
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((blog) => (
              <Link 
                key={blog.Id} 
                href={`/blogs/${blog.Id}`}
                className="bg-white border border-[#f1f5f9] rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden group transform hover:-translate-y-1 h-full block"
              >
                {/* ग्रिड थंबनेल */}
                {blog.Image && (
                  <figure className="relative w-full aspect-[1.6/1] bg-slate-100 overflow-hidden">
                    <Image 
                      src={`/uploads/${blog.Image}`} 
                      alt={blog.Title || "Blog Thumbnail"} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </figure>
                )}

                {/* ग्रिड डिटेल्स */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {blog.Date && (
                      <time className="font-sans text-xs text-[#0f172a]/40 font-semibold block">
                        {formatDate(blog.Date)}
                      </time>
                    )}
                    <h3 className="font-serif text-lg md:text-xl font-bold text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors line-clamp-2 leading-snug">
                      {blog.Title}
                    </h3>
                    <p className="font-sans text-sm text-[#0f172a]/60 font-medium leading-relaxed line-clamp-3">
                      {stripHtml(blog.Description)}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 font-sans font-black text-[11px] uppercase tracking-wider text-[#c4a048] group-hover:text-[#1e1b4b] transition-colors">
                      Read Post 
                      <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </main>
        )}

        {/* BOTTOM GLOBAL ACTION TRIGGER */}
        <footer className="mt-16 md:mt-20 text-center">
          <Link 
            href="/blogs"
            className="inline-flex items-center justify-center bg-[#1e1b4b] hover:bg-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            View All Posts
          </Link>
        </footer>

      </div>
    </section>
  );
}