"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import slugify from "@/utils/slugify";

export default function HistorySection() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/pages/history")
      .then((res) => {
        if (res.data.status === "success") setHistory(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !history) return null;

  const historyHref = history.Id
    ? `/pages/${slugify(history.Name || "history")}/${history.Id}`
    : "#";

  return (
    <article>
      {/*
        UI PROMPT — HISTORY SECTION:
        Header: eyebrow "Our Legacy" (gold) + H2 "History of Yaduvanshi" (italic gold) + "Est. 1998" badge.
        Body: rich HTML prose content from API. Footer: "Read More →" link with arrow icon.
        Light bg #f6f8fc, max-width prose container, academic elegant style.
        Full prompt: UI_PROMPTS.md → Section 6
      */}
      <header>
        <p>Our Legacy</p>
        <h2>History of <em>Yaduvanshi</em></h2>
        <time dateTime="1998">Est. 1998</time>
      </header>

      <main>
        <div dangerouslySetInnerHTML={{ __html: history.Page_Data }} />
      </main>

      <footer>
        <Link href={historyHref}>
          Read More
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </footer>
    </article>
  );
}