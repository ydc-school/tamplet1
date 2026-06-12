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
        if (res.data.status === "success") setFacilities(res.data.data.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);




  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);








  if (!loading && facilities.length === 0) return null;

  return (
    <>
      <section>
        <div>
          {/* Eyebrow + heading */}
          <div>
            <div />
            <span>Campus Infrastructure</span>
            <div />
          </div>
          <h2>Our Facilities</h2>
          <p>
            World-class infrastructure designed to support learning, growth, and overall student well-being.
          </p>

          {/* Grid */}
          <div>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} />
              ))
              : facilities.map((f, idx) => (
                <FacilityCard
                  key={f.Id}
                  facility={f}
                  idx={idx}
                  onClick={() => setSelected(f)}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            {/* Modal image */}
            {selected.Image ? (
              <Image
                src={`/uploads/${selected.Image}`}
                alt={selected.Title}
                width={900}
                height={520}
                sizes="(max-width: 720px) 100vw, 680px"
              />
            ) : (
              <div>
                <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="rgba(196,160,72,0.15)" strokeWidth={0.8}>
                  <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Modal header */}
            <div>
              <div>
                <div>
                  {selected.Name || "Facility Details"}
                </div>
                <h3>{selected.Title}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div>
              <p>{selected.Description}</p>
            </div>

            {/* Modal footer */}
            <div>
              <button onClick={() => setSelected(null)}>
                Close
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Card sub-component ── */
function FacilityCard({ facility, idx, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = facility.Image && !imgErr;

  return (
    <div onClick={onClick}>
      {/* Image / placeholder */}
      <div>
        {hasImg ? (
          <Image
            src={`/uploads/${facility.Image}`}
            alt={facility.Title}
            width={520}
            height={320}
            sizes="(max-width: 640px) 100vw, 33vw"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div>
            <svg width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth={0.9}>
              <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {facility.Index_No > 0 && (
          <span>#{String(idx + 1).padStart(2, "0")}</span>
        )}
      </div>

      {/* Body */}
      <div>
        {facility.Name && (
          <span>{facility.Name}</span>
        )}
        <h3>{facility.Title}</h3>
        <p>{facility.Description}</p>

        <div>
          <button tabIndex={-1}>
            View Details
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
