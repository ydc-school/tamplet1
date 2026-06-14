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
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-label-caps text-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span> LATEST UPDATES
          </span>
          <h2 className="font-headline-lg text-primary">News & Notices</h2>
        </div>

        {/* Notice Board Panel */}
        <div className="bg-surface border border-on-surface/10 p-8 md:p-12">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-on-surface/10">
            <h3 className="font-headline-sm text-primary flex items-center gap-3">
              <span className="material-symbols-outlined">notifications_active</span>
              Notice Board
            </h3>
            {!loading && (
              <span className="font-label-caps text-secondary">{notices.length} active notices</span>
            )}
          </div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-surface-container rounded" />)}
            </div>
          ) : notices.length === 0 ? (
            <p className="text-secondary text-center py-10">No notices available at the moment.</p>
          ) : (
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li key={notice.Id} className="group border border-transparent hover:border-primary/20 transition-all bg-surface-container-lowest p-6">
                  <button onClick={() => setSelectedNotice(notice)} className="w-full flex justify-between items-center text-left">
                    <div className="flex items-center gap-4">
                      {notice.Is_Important && <span className="w-2 h-2 bg-error rounded-full" />}
                      <div>
                        <h4 className="font-semibold text-primary group-hover:text-primary transition-colors">{notice.Title}</h4>
                        <p className="text-sm text-secondary flex items-center gap-2 mt-1">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          {formatDate(notice.Date)}
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6" onClick={() => setSelectedNotice(null)}>
          <div className="bg-surface max-w-2xl w-full p-10 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedNotice(null)} className="absolute top-6 right-6 text-secondary hover:text-primary">
              <span className="material-symbols-outlined">close</span>
            </button>
            <span className="font-label-caps text-primary mb-2 block">{formatDate(selectedNotice.Date)}</span>
            <h3 className="font-headline-md text-primary mb-6">{selectedNotice.Title}</h3>
            <div className="prose text-secondary mb-8" dangerouslySetInnerHTML={{ __html: selectedNotice.Description }} />
            <button onClick={() => setSelectedNotice(null)} className="bg-primary text-on-primary px-8 py-3 font-label-caps hover:opacity-90">
              Close Notice
            </button>
          </div>
        </div>
      )}
    </section>
  );
}