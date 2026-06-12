"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const sortByIndex = (items) =>
  [...items].sort((a, b) => {
    const aIndex = a?.Index_No;
    const bIndex = b?.Index_No;

    if (aIndex === null || aIndex === undefined) return 1;
    if (bIndex === null || bIndex === undefined) return -1;

    return aIndex - bIndex;
  });

export default function TopperCategoryPage({
  initialCategories = [],
  initialLoaded = false,
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(!initialLoaded);

  useEffect(() => {
    if (initialLoaded) return;
    axios
      .get("/api/client/toper-category")
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data?.data ?? res.data.data ?? [];
          setCategories(sortByIndex(data));
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [initialLoaded]);

  return (
    <div>
      {/* Hero Section */}
      <div>
        <div>
          <div>
            <span />
            <span>Hall of Fame</span>
          </div>
          <h1>Topper Categories</h1>
          <p>
            Explore topper groups by stream, level, class, or academic year and open each category to view the students featured inside it.
          </p>
          {!loading && (
            <div>
              <span>{categories.length}</span>
              Categor{categories.length === 1 ? "y" : "ies"}
            </div>
          )}
        </div>
      </div>

      {/* Body Section */}
      <div>
        {loading ? (
          <div>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div>
            <svg style={{ margin: "0 auto", display: "block", color: "rgba(196,160,72,0.15)" }} width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0l-2-2m2 2l-2 2M5 7h14M5 12h5" />
            </svg>
            <div>No topper categories found</div>
            <p style={{ fontSize: 14 }}>New categories will appear here once they are added.</p>
          </div>
        ) : (
          <div>
            {categories.map((category) => (
              <Link key={category.Id} href={`/topper-category/${category.Id}`}>
                <div />
                <div>
                  <div>
                    Display Order
                    <span>{category.Index_No ?? 0}</span>
                  </div>
                  <div>{category.Name || `Category ${category.Id}`}</div>
                  <p>
                    View the topper list for this category and open student profiles for more details.
                  </p>
                </div>
                <div>
                  <div>
                    {category.Class && <span>{category.Class}</span>}
                    {category.Year && <span>{category.Year}</span>}
                    {!category.Class && !category.Year && (
                      <span>Active Category</span>
                    )}
                  </div>
                  <span>
                    View Toppers
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
