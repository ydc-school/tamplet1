"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function AchievementGallery() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/achievements")
      .then((res) => {
        console.log(res.data.data)
        if (res.data.status === "success") setAchievements(res.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && achievements?.length === 0) return null;

  const formatYear = (y) => {
    if (!y) return "";
    const d = new Date(y);
    return isNaN(d) ? y : d.getFullYear();
  };

  return (
   <>
  <section>
    <div>
      <div>
        <div />
        <span>Pride &amp; Excellence</span>
        <div />
      </div>
      <h2>Our Achievements</h2>

      <div>
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} />)
          : achievements.map((item) => (
              <div key={item.Id} onClick={() => setSelected(item)}>
                <div />
                {item.Image ? (
                  <div>
                    <Image
                      src={`/uploads/${item.Image}`}
                      alt={item.Title || item.Name || "Achievement"}
                      width={800}
                      height={600}
                      style={{ width: "100%", height: "auto" }}
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    {item.Year && <span>{formatYear(item.Year)}</span>}
                    <div>
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0zm-3-3v6m-3-3h6" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div>
                    <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3>{item.Title || item.Name}</h3>
                  {item.Description && <p>{item.Description}</p>}
                  <span>
                    View Details
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  </section>

  {/* Modal */}
  {selected && (
    <div onClick={() => setSelected(null)}>
      <div onClick={(e) => e.stopPropagation()}>
        {selected.Image && (
          <div>
            <Image
              src={`/uploads/${selected.Image}`}
              alt={selected.Title || selected.Name || "Achievement"}
              width={1200}
              height={900}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="680px"
            />
            <button onClick={() => setSelected(null)}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div>
          {!selected.Image && (
            <button style={{ display: "flex" }} onClick={() => setSelected(null)}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <div>Achievement</div>
          <h3>{selected.Title || selected.Name}</h3>
          <div />
          {selected.Description && <p>{selected.Description}</p>}
          {selected.Year && (
            <div>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Year: {formatYear(selected.Year)}
            </div>
          )}
        </div>
      </div>
    </div>
  )}
</>
  );
}