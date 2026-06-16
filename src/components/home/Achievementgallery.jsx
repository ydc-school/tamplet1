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
        if (res.data.status === "success") setAchievements(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && achievements?.length === 0) return null;

  const formatYear = (y) => {
    if (!y) return "";
    const d = new Date(y);
    return isNaN(d) ? y : d.getFullYear();
  };

  return (
    <section>
      <h2>Our Achievements</h2>

      {/* Grid List */}
      <div className="grid">
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} className="skeleton" />)
          : achievements.map((item) => (
              <div key={item.Id} onClick={() => setSelected(item)} style={{ cursor: "pointer" }}>
                {item.Image && (
                  <div>
                    <Image
                      src={`/uploads/${item.Image}`}
                      alt={item.Title || item.Name || "Achievement"}
                      width={800}
                      height={600}
                    />
                    {item.Year && <span>{formatYear(item.Year)}</span>}
                  </div>
                )}
                <h3>{item.Title || item.Name}</h3>
                {item.Description && <p>{item.Description}</p>}
                <span>View Details</span>
              </div>
            ))}
      </div>

      {/* Modal Overlay */}
      {selected && (
        <div onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)}>Close</button>
            
            {selected.Image && (
              <Image
                src={`/uploads/${selected.Image}`}
                alt={selected.Title || selected.Name || "Achievement"}
                width={1200}
                height={900}
              />
            )}
            
            <h3>{selected.Title || selected.Name}</h3>
            {selected.Description && <p>{selected.Description}</p>}
            {selected.Year && <p>Year: {formatYear(selected.Year)}</p>}
          </div>
        </div>
      )}
    </section>
  );
}