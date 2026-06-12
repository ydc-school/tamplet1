"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function GalleryPage({
  initialCategories = [],
  initialLoaded = false,
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    axios
      .get("/api/client/gallery-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          // Index_No ascending (lower = top), nulls last
          const sorted = [...data].sort((a, b) => {
            if (a.Index_No === null && b.Index_No === null) return 0;
            if (a.Index_No === null) return 1;
            if (b.Index_No === null) return -1;
            return a.Index_No - b.Index_No;
          });
          setCategories(sorted);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <div>
      {/* Hero */}
      <div>
        <div>
          <div>
            <span />
            <span>Media</span>
          </div>
          <h1>Photo Gallery</h1>
          <p>Explore our campus life, events and achievements</p>
        </div>
      </div>

      {/* Body */}
      <div>
        {loading ? (
          <div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div key={i} />)}
          </div>
        ) : categories.length === 0 ? (
          <div>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>No galleries yet</div>
            <p style={{ fontSize: 14 }}>Check back soon for photos and updates.</p>
          </div>
        ) : (
          <div>
            {categories.map((cat) => (
              <Link key={cat.Id} href={`/gallery/${cat.Id}`}>
                <div />
                {cat.Image ? (
                  <div>
                    <Image
                      src={`/uploads/${cat.Image}`}
                      alt={cat.Name || "Gallery"}
                      fill
                      sizes="(max-width: 540px) 100vw, (max-width: 860px) 50vw, (max-width: 1100px) 33vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div />
                    <div>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div>
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="rgba(196,160,72,0.15)" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div>
                  <div>{cat.Name || "Untitled Gallery"}</div>
                  {cat.Description && (
                    <div>
                      {cat.Description.replace(/<[^>]+>/g, " ").trim()}
                    </div>
                  )}
                  <span>
                    View Photos
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
