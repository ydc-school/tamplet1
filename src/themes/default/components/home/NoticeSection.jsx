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
      .catch((err) => console.error("Error fetching notices:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

   if (!loading && notices.length === 0) return null;

  return (
    <>
      <section className="py-16 bg-surface-container-low text-on-background font-body-md">
        <div className="max-w-container-max mx-auto px-gutter">
          
          {/* Eyebrow & Heading (Playfair Display) */}
          <div className="text-center mb-10">
            <span className="text-deep-maroon font-label-md text-label-md uppercase tracking-widest block mb-2">
              Latest Updates
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">
              News &amp; <span className="text-heritage-gold">Notices</span>
            </h2>
            <div className="w-24 h-1 bg-heritage-gold mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Main Notice Board Container */}
          <div className="bg-white rounded-lg shadow-2xl border border-surface-variant overflow-hidden max-w-4xl mx-auto">
            
            {/* Header section matching School's premium UI */}
            <div className="bg-deep-maroon text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-heritage-gold animate-pulse">
                  campaign
                </span>
                <span className="font-headline-md text-headline-md font-semibold tracking-wide">
                  Notice Board
                </span>
              </div>
              {!loading && (
                <span className="bg-white/20 text-white font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
                  {notices.length} {notices.length !== 1 ? "notices" : "notice"}
                </span>
              )}
            </div>

            {/* List Wrap */}
            <div className="divide-y divide-surface-container-high max-h-[500px] overflow-y-auto">
              {loading ? (
                // Loading Skeleton Rows
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-6 animate-pulse flex items-center justify-between">
                    <div className="space-y-3 w-2/3">
                      <div className="h-4 bg-surface-container rounded w-full"></div>
                      <div className="h-3 bg-surface-container rounded w-1/4"></div>
                    </div>
                    <div className="h-8 bg-surface-container rounded w-16"></div>
                  </div>
                ))
              ) : notices.length === 0 ? (
                <div className="p-12 text-center text-on-surface-variant italic font-body-lg">
                  No notices available at the moment.
                </div>
              ) : (
                <ul className="divide-y divide-surface-container-high m-0 p-0 list-none">
                  {notices.map((notice) => (
                    <li key={notice.Id} className="group hover:bg-surface-bright transition-colors duration-200">
                      <div
                        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                        onClick={() => setSelectedNotice(notice)}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          {/* Important/New Badge Indicator */}
                          {notice.Is_Important && (
                            <span className="inline-flex items-center justify-center bg-error text-white font-label-sm text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm mt-1 shrink-0 animate-bounce">
                              NEW
                            </span>
                          )}
                          <div>
                            <h3 className="font-body-lg text-body-lg text-on-surface font-semibold group-hover:text-deep-maroon transition-colors line-clamp-2">
                              {notice.Title}
                            </h3>
                            {notice.Date && (
                              <div className="flex items-center gap-1.5 text-slate-gray font-label-sm text-label-sm mt-2">
                                <span className="material-symbols-outlined text-[16px]">
                                  calendar_month
                                </span>
                                {formatDate(notice.Date)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* View Button mimicking primary buttons */}
                        <button
                          className="bg-academic-teal hover:bg-heritage-gold text-white text-label-md font-label-md uppercase tracking-wider py-2 px-5 rounded-sm shadow transition-all duration-200 flex items-center gap-1 shrink-0 self-start sm:self-center"
                          tabIndex={-1}
                        >
                          View
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                            chevron_right
                          </span>
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

      {/* Styled Notice Detail Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-deep-maroon text-white p-6 relative border-b border-heritage-gold">
              <span className="text-heritage-gold font-label-sm text-label-sm uppercase tracking-widest block mb-1">
                Notice Details
              </span>
              <h3 className="font-headline-md text-headline-md font-bold pr-8 leading-snug">
                {selectedNotice.Title}
              </h3>
              {selectedNotice.Date && (
                <div className="flex items-center gap-1.5 text-white/80 font-label-sm text-label-sm mt-3">
                  <span className="material-symbols-outlined text-[16px]">
                    calendar_month
                  </span>
                  {formatDate(selectedNotice.Date)}
                </div>
              )}
              {/* Close Icon Button */}
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
                onClick={() => setSelectedNotice(null)}
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Modal Description Content */}
            <div className="p-8 overflow-y-auto text-on-surface-variant font-body-lg space-y-4 max-h-[50vh] prose prose-maroon max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: selectedNotice.Description }}
              />
            </div>

            {/* Modal Footer */}
            <div className="bg-surface-container-low px-6 py-4 flex justify-end border-t border-surface-variant">
              <button
                className="border-2 border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-white transition-all py-2 px-6 font-label-md text-label-md uppercase tracking-widest rounded-sm flex items-center gap-2"
                onClick={() => setSelectedNotice(null)}
              >
                Close Notice
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}