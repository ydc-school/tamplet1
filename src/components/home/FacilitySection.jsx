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
   

      <section className="fc-root">
        <div className="fc-inner">

          
          <div className="fc-eyebrow">
            <div className="fc-ey-line" />
            <span className="fc-ey-text">Campus Infrastructure</span>
            <div className="fc-ey-line rev" />
          </div>
          <h2 className="fc-heading">Our Facilities</h2>
          <p className="fc-subheading">
            World-class infrastructure designed to support learning, growth, and overall student well-being.
          </p>

       
          <div className="fc-grid">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="fc-skel" />
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

    
      {selected && (
        <div className="fc-overlay" onClick={() => setSelected(null)}>
          <div className="fc-modal" onClick={(e) => e.stopPropagation()}>

          
            {selected.Image ? (
              <Image
                className="fc-modal-img"
                src={`/uploads/${selected.Image}`}
                alt={selected.Title}
                width={900}
                height={520}
                sizes="(max-width: 720px) 100vw, 680px"
              />
            ) : (
              <div className="fc-modal-img-placeholder">
                <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="rgba(196,160,72,0.15)" strokeWidth={0.8}>
                  <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

           
            <div className="fc-modal-header">
              <div>
                <div className="fc-modal-label">
                  {selected.Name || "Facility Details"}
                </div>
                <h3 className="fc-modal-title">{selected.Title}</h3>
              </div>
              <button
                className="fc-close-btn"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          
            <div className="fc-modal-body">
              <p>{selected.Description}</p>
            </div>

           
            <div className="fc-modal-footer">
              <button className="fc-close-full" onClick={() => setSelected(null)}>
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


function FacilityCard({ facility, idx, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = facility.Image && !imgErr;

  return (
    <div className="fc-card" onClick={onClick}>

      {/* Image / placeholder */}
      <div className="fc-img-wrap">
        {hasImg ? (
          <Image
            className="fc-img"
            src={`/uploads/${facility.Image}`}
            alt={facility.Title}
            width={520}
            height={320}
            sizes="(max-width: 640px) 100vw, 33vw"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="fc-img-placeholder">
            <svg className="fc-img-ph-icon" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="#c4a048" strokeWidth={0.9}>
              <path strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {facility.Index_No > 0 && (
          <span className="fc-index-badge">#{String(idx + 1).padStart(2, "0")}</span>
        )}
      </div>

      {/* Body */}
      <div className="fc-card-body">
        {facility.Name && (
          <span className="fc-card-name">{facility.Name}</span>
        )}
        <h3 className="fc-card-title">{facility.Title}</h3>
        <p className="fc-card-desc">{facility.Description}</p>

        <div className="fc-card-footer">
          <button className="fc-view-btn" tabIndex={-1}>
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
