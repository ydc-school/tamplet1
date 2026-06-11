"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function StudentToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/client/toper")
      .then((res) => {
        if (res.data.status === "success") setToppers(res.data.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && toppers.length === 0) return null;

  // Sort by rank if available
  const sorted = [...toppers].sort((a, b) => (parseInt(a.Rank) || 99) - (parseInt(b.Rank) || 99));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  const medalColors = {
    1: { bg: "#c4a048", text: "#f6f8fc", label: "Gold" },
    2: { bg: "#94a3b8", text: "#f6f8fc", label: "Silver" },
    3: { bg: "#b87333", text: "#fff", label: "Bronze" },
  };

  return (
    <>
     

      <section className="tp-root">
        <div className="tp-inner">

          <div className="tp-eyebrow">
            <div className="tp-ey-line" />
            <span className="tp-ey-text">Hall of Fame</span>
            <div className="tp-ey-line rev" />
          </div>
          <h2 className="tp-heading">Our Student Toppers</h2>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[1, 2, 3].map(i => <div key={i} className="tp-skel" />)}
            </div>
          ) : (
            <>
              {/* Podium — top 3 */}
              {top3.length > 0 && (
                <div className="tp-podium">
                  {podiumOrder.map((topper) => {
                    if (!topper) return null;
                    const rank = parseInt(topper.Rank) || 1;
                    const medal = medalColors[rank] || medalColors[3];
                    const initials = topper.Student_Name?.charAt(0)?.toUpperCase() || "S";
                    return (
                      <div key={topper.Id} className="tp-podium-item">
                        <div className="tp-photo-wrap">
                          <div className={`tp-photo-ring rank-${rank}`}>
                            {topper.Image ? (
                              <Link href={"./student/" + topper?.Id}>
                                <Image
                                  src={`/uploads/${topper.Image}`}
                                  alt={topper.Student_Name || "Topper"}
                                  fill
                                  sizes="110px"
                                  className="object-contain object-top"
                                />
                              </Link>
                            ) : (
                              <div className="tp-avatar-placeholder">{initials}</div>
                            )}
                          </div>
                          <div
                            className="tp-rank-badge"
                            style={{ background: medal.bg, color: medal.text }}
                          >
                            {rank}
                          </div>
                        </div>

                        <div className={`tp-card rank-${rank}`}>
                          <div className="tp-name">{topper.Student_Name}</div>
                          {topper.Student_Class && (
                            <div className="tp-class">{topper.Student_Class}</div>
                          )}
                          {topper.Marks_Percentage && (
                            <div className="tp-score">
                              <span className="tp-score-num">{topper.Marks_Percentage}</span>
                              <span className="tp-score-pct">%</span>
                            </div>
                          )}
                          {topper.Year && <div className="tp-year">Batch {topper.Year}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Rest — mini cards */}
              {rest.length > 0 && (
                <div className="tp-grid">
                  {rest.map((topper) => {
                    const rank = parseInt(topper.Rank) || "-";
                    const initials = topper.Student_Name?.charAt(0)?.toUpperCase() || "S";
                    return (
                      <div key={topper.Id} className="tp-mini-card">
                        <div className="tp-mini-img">
                          {topper.Image ? (
                            <Link href={"./student/" + topper?.Id}>
                              <Image
                                src={`/uploads/${topper.Image}`}
                                alt={topper.Student_Name || "Topper"}
                                fill
                                sizes="44px"
                                className="object-cover object-top"
                              />
                            </Link>
                          ) : (
                            <div className="tp-mini-placeholder">{initials}</div>
                          )}
                        </div>
                        <div className="tp-mini-body">
                          <div className="tp-mini-name">{topper.Student_Name}</div>
                          <div className="tp-mini-meta">
                            <span>#{rank}</span>
                            {topper.Year && <><span>·</span><span>{topper.Year}</span></>}
                          </div>
                        </div>
                        {/* {topper.Marks_Percentage && (
                          <div className="tp-mini-score">{topper.Marks_Percentage}%</div>
                        )} */}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </>
  );
}