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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && toppers.length === 0) return null;

  const sorted = [...toppers].sort((a, b) => (parseInt(a.Rank) || 99) - (parseInt(b.Rank) || 99));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  const medalStyles = {
    1: "bg-gold text-on-gold",
    2: "bg-silver text-on-silver",
    3: "bg-bronze text-on-bronze",
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <span className="font-label-caps text-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span> HALL OF FAME
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Our Student Toppers</h2>
        </div>

        {loading ? (
           <div className="animate-pulse h-64 bg-secondary-container rounded-lg" />
        ) : (
          <div className="flex flex-col gap-16">
            
            {/* Podium */}
            <div className="flex justify-center items-end gap-4 md:gap-8">
              {podiumOrder.map((topper, i) => {
                const rank = parseInt(topper.Rank) || i + 1;
                return (
                  <div key={topper.Id} className={`flex flex-col items-center ${rank === 1 ? "order-1 -mt-8" : "order-none"}`}>
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                      {topper.Image ? (
                        <Image src={`/uploads/${topper.Image}`} alt={topper.Student_Name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center text-on-secondary font-bold text-2xl">
                          {topper.Student_Name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className={`px-4 py-1 rounded-full font-label-caps text-sm ${medalStyles[rank] || "bg-gray-400"}`}>
                      Rank {rank}
                    </div>
                    <h3 className="font-headline-sm text-primary mt-3 text-center">{topper.Student_Name}</h3>
                    <p className="text-secondary text-sm">{topper.Marks_Percentage}%</p>
                  </div>
                );
              })}
            </div>

            {/* Rest of the list */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((topper) => (
                  <div key={topper.Id} className="flex items-center gap-4 p-4 border border-on-surface/10 hover:border-primary/20 transition-all">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
                      {topper.Image && <Image src={`/uploads/${topper.Image}`} alt={topper.Student_Name} width={48} height={48} className="object-cover" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{topper.Student_Name}</h4>
                      <span className="text-sm text-secondary">#{topper.Rank} · {topper.Year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}