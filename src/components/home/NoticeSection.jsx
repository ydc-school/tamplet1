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
        if (res?.data?.status === "success") setNotices(res?.data?.data?.data || []);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

  return (
    <>
      <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[2px] w-8 bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Latest Updates</span>
              <div />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#01327F]">News &amp; Notices</h2>
          </div>

          {/* Notice Board Panel */}
          <div className="bg-[#01327F]/[0.03] p-4 md:p-6 rounded-2xl">
            <div className="flex items-center justify-between p-4 bg-[#01327F] text-white rounded-xl mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-semibold tracking-wide text-sm md:text-base">Notice Board</span>
              </div>
              {!loading && (
                <span className="text-xs bg-amber-400 text-[#01327F] font-bold px-3 py-1 rounded-full">
                  {(notices?.length || 0)} notice{(notices?.length || 0) !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="mt-2">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse bg-white p-4 rounded-xl flex items-center justify-between h-16">
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded-md w-2/3" />
                        <div className="h-3 bg-gray-100 rounded-md w-1/4" />
                      </div>
                      <div className="h-7 bg-gray-200 rounded-lg w-14" />
                    </div>
                  ))}
                </div>
              ) : (notices?.length || 0) === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl font-medium text-sm">
                  No notices available at the moment.
                </div>
              ) : (
                <ul className="space-y-3">
                  {notices.map((notice) => (
                    <li key={notice?.Id} className="block">
                      <div 
                        onClick={() => setSelectedNotice(notice)}
                        className="relative overflow-hidden bg-white p-4 rounded-xl flex items-center justify-between gap-4 cursor-pointer hover:bg-[#01327F]/5 transition-all duration-200 group"
                      >
                        {notice?.Is_Important && (
                          <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
                        )}
                        <div className={`flex-1 min-w-0 ${notice?.Is_Important ? "pl-2" : ""}`}>
                          <div className="font-semibold text-[#01327F] text-sm md:text-base truncate group-hover:text-amber-500 transition-colors duration-150">
                            {notice?.Title || "Untitled Notice"}
                          </div>
                          {notice?.Date && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1 font-medium">
                              <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(notice.Date)}
                            </div>
                          )}
                        </div>
                        <button 
                          tabIndex={-1}
                          className="flex items-center gap-1 text-xs font-bold bg-[#01327F] text-white px-3 py-1.5 rounded-lg group-hover:bg-amber-400 group-hover:text-[#01327F] transition-colors duration-200 shrink-0"
                        >
                          View
                          <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
        <div 
          onClick={() => setSelectedNotice(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01327F]/40 backdrop-blur-sm transition-opacity duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-xl rounded-2xl p-6 md:p-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto transform transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">Notice Details</div>
                <h3 className="text-lg md:text-xl font-bold text-[#01327F] leading-snug">
                  {selectedNotice?.Title || "Notice Details"}
                </h3>
                {selectedNotice?.Date && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 font-medium">
                    <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(selectedNotice.Date)}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setSelectedNotice(null)} 
                aria-label="Close"
                className="text-gray-400 hover:text-amber-500 hover:bg-[#01327F]/5 p-2 rounded-full transition-colors duration-200 shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div 
              className="text-sm md:text-base text-gray-600 leading-relaxed overflow-x-auto min-h-[100px]"
              dangerouslySetInnerHTML={{ __html: selectedNotice?.Description || "" }} 
            />

            <div className="flex justify-end mt-2">
              <button 
                onClick={() => setSelectedNotice(null)}
                className="flex items-center gap-2 text-xs md:text-sm font-bold bg-[#01327F] text-white px-5 py-2.5 rounded-xl hover:bg-amber-400 hover:text-[#01327F] transition-all duration-200 active:scale-95"
              >
                Close Notice
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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