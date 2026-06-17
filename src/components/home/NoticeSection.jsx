"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NoticeSection() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/notification")
      .then((res) => {
        if (res.data?.status === "success") setNotices(res.data.data.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article>
      {/*
        UI PROMPT — NOTICE SECTION:
        Header: eyebrow "Latest Updates" + H2 "News & Notices".
        Notice Board panel: sub-heading + count badge + vertical notice list.
        Each notice card: important "!" badge, title H4, date, "View Details" on right, hover highlight.
        Modal on click: overlay dialog, title + date + HTML description + "Close Notice" button.
        Full prompt: UI_PROMPTS.md → Section 8
      */}
      <header>
        <span>Latest Updates</span>
        <h2>News &amp; Notices</h2>
      </header>

      <main>
        <h3>Notice Board</h3>
        {!loading && <p>{notices.length} notice{notices.length !== 1 ? "s" : ""}</p>}

        {loading ? (
          <p>Loading notices...</p>
        ) : notices.length === 0 ? (
          <p>No notices available.</p>
        ) : (
          <ul>
            {notices.map((notice) => (
              <li key={notice.Id}>
                <button onClick={() => setSelectedNotice(notice)}>
                  {notice.Is_Important && <span>!</span>}
                  <h4>{notice.Title}</h4>
                  {notice.Date && <time>{formatDate(notice.Date)}</time>}
                  <span>View Details</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {selectedNotice && (
        <dialog open onClick={() => setSelectedNotice(null)}>
          <article onClick={(e) => e.stopPropagation()}>
            <header>
              <p>Notice Details</p>
              <h3>{selectedNotice.Title}</h3>
              {selectedNotice.Date && <time>{formatDate(selectedNotice.Date)}</time>}
            </header>
            
            <div dangerouslySetInnerHTML={{ __html: selectedNotice.Description }} />

            <footer>
              <button onClick={() => setSelectedNotice(null)}>Close Notice</button>
            </footer>
          </article>
        </dialog>
      )}
    </article>
  );
}