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
        if (res.data?.status === "success") {
          const dataArray = res.data.data?.data || res.data.data || [];
          setNotices(dataArray);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  // Premium Loading Grid Skeleton
  if (loading) {
    return (
      <section className="max-w-[1280px] mx-auto px-8 py-16 animate-pulse">
        <div className="w-1/4 h-4 bg-slate-200 rounded mb-3"></div>
        <div className="w-2/4 h-10 bg-slate-200 rounded mb-12"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-slate-100 rounded-2xl w-full"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8fafc] py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* HEADER SECTION */}
        <header className="space-y-3 mb-12">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.3em] uppercase block">
            Latest Updates
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1e1b4b] tracking-tight">
            News &amp; Notices
          </h2>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mt-2" />
        </header>

        {/* NOTICES BOARD CONTAINER */}
        <main className="bg-white border border-[#f1f5f9] rounded-[2rem] shadow-xl p-6 md:p-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-6 mb-6">
            <h3 className="font-serif text-xl font-bold text-[#1e1b4b]">
              Notice Board
            </h3>
            {/* Total Count Badge */}
            <span className="bg-[#1e1b4b]/5 text-[#1e1b4b] font-sans font-black text-xs px-3 py-1.5 rounded-full tracking-wider">
              {notices.length} {notices.length === 1 ? "NOTICE" : "NOTICES"}
            </span>
          </div>

          {notices.length === 0 ? (
            <div className="text-center py-12 text-[#0f172a]/40 font-sans font-medium text-sm">
              No notices available at the moment.
            </div>
          ) : (
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li key={notice.Id}>
                  <button 
                    onClick={() => setSelectedNotice(notice)}
                    className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#f8fafc]/60 hover:bg-white border border-transparent hover:border-[#f1f5f9] hover:shadow-md transition-all duration-300 group focus:outline-none"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      {/* Important Warning Badge Accent */}
                      {notice.Is_Important && (
                        <span 
                          className="w-6 h-6 rounded-full bg-[#7f1d1d] text-white flex items-center justify-center font-sans font-black text-xs shadow-md shadow-[#7f1d1d]/20 flex-shrink-0 animate-pulse"
                          title="Important Notice"
                        >
                          !
                        </span>
                      )}
                      
                      {/* Notice Info Metadata */}
                      <div className="space-y-1">
                        <h4 className="font-sans font-bold text-base text-[#1e1b4b] group-hover:text-[#7f1d1d] transition-colors line-clamp-1 pr-4">
                          {notice.Title}
                        </h4>
                        {notice.Date && (
                          <time className="font-sans text-xs text-[#0f172a]/50 font-semibold block">
                            {formatDate(notice.Date)}
                          </time>
                        )}
                      </div>
                    </div>

                    {/* View Details Right Button Action */}
                    <div className="flex-shrink-0 self-end sm:self-center">
                      <span className="inline-flex items-center gap-1.5 font-sans font-black text-[11px] uppercase tracking-wider text-[#c4a048] group-hover:text-[#1e1b4b] transition-colors">
                        View Details 
                        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>

      {/* OVERLAY DIALOG MODAL PANEL SHEET */}
      {selectedNotice && (
        <dialog 
          open 
          className="fixed inset-0 z-[150] w-full h-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 border-none overflow-y-auto animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSelectedNotice(null)}
        >
          <article 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl border border-[#f1f5f9] p-6 md:p-10 space-y-6 flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Modal Box Header */}
            <header className="border-b border-[#f1f5f9] pb-5 space-y-2 relative">
              <span className="font-sans font-black text-[10px] uppercase tracking-widest text-[#c4a048] bg-[#c4a048]/5 px-2.5 py-1 rounded-md inline-block">
                Notice Details
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1e1b4b] pr-8 leading-snug">
                {selectedNotice.Title}
              </h3>
              {selectedNotice.Date && (
                <time className="font-sans text-xs text-[#0f172a]/40 font-semibold block">
                  Published on {formatDate(selectedNotice.Date)}
                </time>
              )}
            </header>
            
            {/* Rich Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div 
                className="font-sans text-sm text-[#0f172a]/80 leading-relaxed prose prose-indigo max-w-none 
                  prose-p:mb-4 prose-strong:text-[#1e1b4b] prose-strong:font-bold prose-ul:list-disc prose-ul:pl-5"
                dangerouslySetInnerHTML={{ __html: selectedNotice.Description }} 
              />
            </div>

            {/* Modal Box Footer Actions */}
            <footer className="border-t border-[#f1f5f9] pt-4 flex justify-end">
              <button 
                onClick={() => setSelectedNotice(null)}
                className="bg-[#1e1b4b] hover:bg-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md transition-colors focus:outline-none"
              >
                Close Notice
              </button>
            </footer>
          </article>
        </dialog>
      )}
    </section>
  );
}