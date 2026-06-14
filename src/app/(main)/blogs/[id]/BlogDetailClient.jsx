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

  useEffect(() => {
    if (initialLoaded && initialBlog?.Id?.toString() === id?.toString()) return;
    if (!id) return;
    setLoading(true);
    axios
      .get(`/api/client/blog/${id}`)
      .then((res) => {
        if (res.data.status === "success") setBlog(res.data.data);
        else setError(res.data.message || "Blog not found");
      })
      .catch(() => setError("Error loading article."))
      .finally(() => setLoading(false));
  }, [id, initialBlog, initialLoaded]);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const getInitials = (n = "") => n.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <article className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      {loading ? (
        <div className="h-96 flex items-center justify-center text-stone-400 font-serif italic">Loading chronicles...</div>
      ) : error ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-serif text-stone-800">Content Unavailable</h2>
          <button onClick={() => router.back()} className="mt-4 text-amber-800 underline uppercase text-xs tracking-widest">Return Home</button>
        </div>
      ) : blog && (
        <>
          {/* Header Section */}
          <header className="mb-16">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-stone-500 hover:text-amber-800 transition-colors text-xs uppercase tracking-widest mb-8">
              ← Back to Overview
            </button>
            <span className="text-amber-800 uppercase tracking-[0.2em] text-xs font-semibold">Editorial</span>
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mt-4 mb-8 leading-tight">{blog.Title}</h1>
            
            <div className="flex items-center gap-6 text-sm text-stone-600 border-y border-stone-200 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-900">
                <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs">{getInitials(blog.Author)}</div>
                {blog.Author}
              </div>
              <span>{formatDate(blog.Date)}</span>
              <span className="font-medium text-amber-800">
                {Math.max(1, Math.ceil(blog.Content?.replace(/<[^>]*>/g, "").split(" ").length / 200))} min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {blog.Image && (
            <div className="relative w-full h-[400px] md:h-[600px] mb-12 bg-stone-100">
              <Image src={`/uploads/${blog.Image}`} alt={blog.Title} fill className="object-cover" priority />
            </div>
          )}

          {/* Content Body */}
          <div className="prose prose-stone prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.Content }} />
          </div>

          <footer className="mt-16 pt-8 border-t border-stone-200">
            <ShareRow />
          </footer>
        </>
      )}
    </article>
  );
}

function ShareRow() {
  const copyLink = () => navigator.clipboard.writeText(window.location.href);
  return (
    <div className="flex items-center gap-6">
      <span className="uppercase text-xs tracking-widest text-stone-400">Share this article</span>
      <button onClick={copyLink} className="text-stone-600 hover:text-amber-800 transition-colors text-sm">Copy Link</button>
      <button onClick={() => window.open(`https://wa.me/?text=${window.location.href}`)} className="text-stone-600 hover:text-amber-800 transition-colors text-sm">WhatsApp</button>
    </div>
  );
}