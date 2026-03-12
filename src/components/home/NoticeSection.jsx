"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NoticeSection() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("/api/client/notification");
        if (response.data.status === "success") {
          setNotices(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const [selectedNotice, setSelectedNotice] = useState(null);

  if (loading) {
    return (
      <section className="w-full bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notices...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50/50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-12 flex flex-col items-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold tracking-wider mb-4 border border-indigo-200">
            LATEST UPDATES
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            News & Events
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 p-2 border border-gray-100">
          <div className="bg-blue-50/50 h-[500px] overflow-y-scroll rounded-xl overflow-hidden p-4 sm:p-8 border border-blue-50">
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li
                  key={notice.Id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {notice.Title}
                      </h3>
                      {notice.Is_Important && (
                        <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md animate-pulse">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {new Date(notice.Date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="w-full sm:w-auto bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold px-6 py-2.5 rounded-lg transition-colors border border-blue-100 hover:border-transparent flex items-center justify-center gap-2"
                  >
                    View
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notice Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider mb-3">
                      NOTICE DETAILS
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">
                      {selectedNotice.Title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {new Date(selectedNotice.Date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>

                <div className="prose prose-blue max-w-none text-gray-600 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedNotice.Description }}
                    className="leading-relaxed notice-content"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="bg-gray-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}