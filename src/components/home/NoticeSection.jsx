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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
     

      <section className="nt-root">
        <div className="nt-inner">

          <div className="nt-eyebrow">
            <div className="nt-ey-line" />
            <span className="nt-ey-text">Latest Updates</span>
            <div className="nt-ey-line rev" />
          </div>
          <h2 className="nt-heading">News &amp; Notices</h2>

          <div className="nt-panel">
            <div className="nt-panel-header">
              <span className="nt-panel-dot" />
              <span className="nt-panel-title">Notice Board</span>
              {!loading && (
                <span className="nt-panel-count">{notices.length} notice{notices.length !== 1 ? "s" : ""}</span>
              )}
            </div>

            <div className="nt-list-wrap">
              {loading ? (
                <div className="nt-list">
                  {[1,2,3,4,5].map((i) => <div key={i} className="nt-skel-row" />)}
                </div>
              ) : notices.length === 0 ? (
                <div className="nt-empty">No notices available at the moment.</div>
              ) : (
                <ul className="nt-list">
                  {notices.map((notice) => (
                    <li key={notice.Id}>
                      <div className="nt-row" onClick={() => setSelectedNotice(notice)}>
                        {notice.Is_Important && <span className="nt-new-dot" />}
                        <div className="nt-row-body">
                          <div className="nt-row-title">{notice.Title}</div>
                          {notice.Date && (
                            <div className="nt-row-date">
                              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(notice.Date)}
                            </div>
                          )}
                        </div>
                        <button className="nt-view-btn" tabIndex={-1}>
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
        <div className="nt-overlay" onClick={() => setSelectedNotice(null)}>
          <div className="nt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nt-modal-header">
              <div>
                <div className="nt-modal-label">Notice Details</div>
                <h3 className="nt-modal-title">{selectedNotice.Title}</h3>
                {selectedNotice.Date && (
                  <div className="nt-modal-date">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(selectedNotice.Date)}
                  </div>
                )}
              </div>
              <button className="nt-close-btn" onClick={() => setSelectedNotice(null)} aria-label="Close">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="nt-modal-body"
              dangerouslySetInnerHTML={{ __html: selectedNotice.Description }}
            />

            <div className="nt-modal-footer">
              <button className="nt-close-full" onClick={() => setSelectedNotice(null)}>
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