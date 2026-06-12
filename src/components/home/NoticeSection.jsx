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
        if (res.data.status === "success") setNotices(res.data.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <section>
        <div>
          {/* Header */}
          <div>
            <div />
            <span>Latest Updates</span>
            <div />
          </div>
          <h2>News &amp; Notices</h2>

          {/* Notice Board Panel */}
          <div>
            <div>
              <span />
              <span>Notice Board</span>
              {!loading && (
                <span>{notices.length} notice{notices.length !== 1 ? "s" : ""}</span>
              )}
            </div>

            <div>
              {loading ? (
                <div>
                  {[1, 2, 3, 4, 5].map((i) => <div key={i} />)}
                </div>
              ) : notices.length === 0 ? (
                <div>No notices available at the moment.</div>
              ) : (
                <ul>
                  {notices.map((notice) => (
                    <li key={notice.Id}>
                      <div onClick={() => setSelectedNotice(notice)}>
                        {notice.Is_Important && <span />}
                        <div>
                          <div>{notice.Title}</div>
                          {notice.Date && (
                            <div>
                              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(notice.Date)}
                            </div>
                          )}
                        </div>
                        <button tabIndex={-1}>
                          View
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedNotice && (
        <div onClick={() => setSelectedNotice(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <div>
              <div>
                <div>Notice Details</div>
                <h3>{selectedNotice.Title}</h3>
                {selectedNotice.Date && (
                  <div>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(selectedNotice.Date)}
                  </div>
                )}
              </div>
              <button onClick={() => setSelectedNotice(null)} aria-label="Close">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div dangerouslySetInnerHTML={{ __html: selectedNotice.Description }} />

            <div>
              <button onClick={() => setSelectedNotice(null)}>
                Close Notice
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}