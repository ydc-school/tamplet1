"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function FacilitySection() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/facility", { params: { limit: 12, isActive: "active" } })
      .then((res) => {
        if (res.data?.status === "success") setFacilities(res.data.data.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  if (!loading && facilities.length === 0) return null;

  return (
    <article>
      {/*
        UI PROMPT — FACILITY SECTION:
        Header: eyebrow "Campus Infrastructure" + H2 "Our Facilities" + subtitle paragraph.
        Grid 2-3 cols: each card = image 520×320, "#01" index badge, category name (gold),
        title H3, description excerpt, "View Details". Hover: card lift shadow.
        Modal: full image 900×520, category + title H3, full description, close button. Body scroll locked.
        Full prompt: UI_PROMPTS.md → Section 12
      */}
      <header>
        <span>Campus Infrastructure</span>
        <h2>Our Facilities</h2>
        <p>World-class infrastructure designed to support learning, growth, and overall student well-being.</p>
      </header>

      <main>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <p key={i}>Loading facility...</p>)
          : facilities.map((f, idx) => (
              <FacilityCard key={f.Id} facility={f} idx={idx} onClick={() => setSelected(f)} />
            ))}
      </main>

      {selected && (
        <dialog open onClick={() => setSelected(null)}>
          <article onClick={(e) => e.stopPropagation()}>
            {selected.Image && (
              <figure>
                <Image src={`/uploads/${selected.Image}`} alt={selected.Title} width={900} height={520} />
              </figure>
            )}
            <header>
              <span>{selected.Name}</span>
              <h3>{selected.Title}</h3>
              <button onClick={() => setSelected(null)}>Close</button>
            </header>
            <p>{selected.Description}</p>
            <footer>
              <button onClick={() => setSelected(null)}>Close</button>
            </footer>
          </article>
        </dialog>
      )}
    </article>
  );
}

function FacilityCard({ facility, idx, onClick }) {
  return (
    <button onClick={onClick}>
      {facility.Image && (
        <figure>
          <Image src={`/uploads/${facility.Image}`} alt={facility.Title} width={520} height={320} />
        </figure>
      )}
      {facility.Index_No > 0 && <span>#{String(idx + 1).padStart(2, "0")}</span>}
      <span>{facility.Name}</span>
      <h3>{facility.Title}</h3>
      <p>{facility.Description}</p>
      <span>View Details</span>
    </button>
  );
}