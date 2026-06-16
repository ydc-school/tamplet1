"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import slugify from "@/utils/slugify";



export default function HistorySection() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    axios
      .get("/api/client/pages/history")
      .then((res) => {
        
        if (res.data.status === "success") setHistory(res.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && history?.length === 0) return null;

  const historyHref = history?.Id
    ? `/pages/${slugify(history.Name || "history")}/${history.Id}`
    : "#";






  return (
    <>
    

      <section className="hs-root">
        <div className="hs-inner">

          {/* Left */}
          <div className="hs-left">
            <div className="hs-eyebrow">
              <span className="hs-ey-dot" />
              <span className="hs-ey-text">Our Legacy</span>
            </div>
            <h2 className="hs-heading">
              History of <em>Yaduvanshi</em>
            </h2>
            <div className="hs-year-block">
              <div className="hs-year-line" />
              <span className="hs-year-label">Est. 1998</span>
            </div>
          </div>

          {/* Right */}
          <div className="hs-right">
            <div className="hs-card">
              <div
                className="nt-modal-body"
                dangerouslySetInnerHTML={{ __html: history.Page_Data }}
              />


            <Link href={historyHref} className="hs-cta">
                Read More
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
