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
      <section>
        <div>
          {/* Left */}
          <div>
            <div>
              <span />
              <span>Our Legacy</span>
            </div>
            <h2>
              History of <em>Yaduvanshi</em>
            </h2>
            <div>
              <div />
              <span>Est. 1998</span>
            </div>
          </div>

          {/* Right */}
          <div>
            <div>
              <div
                dangerouslySetInnerHTML={{ __html: history.Page_Data }}
              />

              <Link href={historyHref}>
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
