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
      <section>
        <div>
          <div>
            <div />
            <span>Hall of Fame</span>
            <div />
          </div>
          <h2>Our Student Toppers</h2>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[1, 2, 3].map((i) => <div key={i} />)}
            </div>
          ) : (
            <>
              {/* Podium — top 3 */}
              {top3.length > 0 && (
                <div>
                  {podiumOrder.map((topper) => {
                    if (!topper) return null;
                    const rank = parseInt(topper.Rank) || 1;
                    const medal = medalColors[rank] || medalColors[3];
                    const initials = topper.Student_Name?.charAt(0)?.toUpperCase() || "S";

                    return (
                      <div key={topper.Id}>
                        <div>
                          <div>
                            {topper.Image ? (
                              <Link href={"./student/" + topper?.Id}>
                                <Image
                                  src={`/uploads/${topper.Image}`}
                                  alt={topper.Student_Name || "Topper"}
                                  fill
                                  sizes="110px"
                                  style={{ objectFit: "contain", objectPosition: "top" }}
                                />
                              </Link>
                            ) : (
                              <div>{initials}</div>
                            )}
                          </div>
                          <div style={{ background: medal.bg, color: medal.text }}>
                            {rank}
                          </div>
                        </div>

                        <div>
                          <div>{topper.Student_Name}</div>
                          {topper.Student_Class && (
                            <div>{topper.Student_Class}</div>
                          )}
                          {topper.Marks_Percentage && (
                            <div>
                              <span>{topper.Marks_Percentage}</span>
                              <span>%</span>
                            </div>
                          )}
                          {topper.Year && <div>Batch {topper.Year}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Rest — mini cards */}
              {rest.length > 0 && (
                <div>
                  {rest.map((topper) => {
                    const rank = parseInt(topper.Rank) || "-";
                    const initials = topper.Student_Name?.charAt(0)?.toUpperCase() || "S";

                    return (
                      <div key={topper.Id}>
                        <div>
                          {topper.Image ? (
                            <Link href={"./student/" + topper?.Id}>
                              <Image
                                src={`/uploads/${topper.Image}`}
                                alt={topper.Student_Name || "Topper"}
                                fill
                                sizes="44px"
                                style={{ objectFit: "cover", objectPosition: "top" }}
                              />
                            </Link>
                          ) : (
                            <div>{initials}</div>
                          )}
                        </div>
                        <div>
                          <div>{topper.Student_Name}</div>
                          <div>
                            <span>#{rank}</span>
                            {topper.Year && <><span>·</span><span>{topper.Year}</span></>}
                          </div>
                        </div>
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