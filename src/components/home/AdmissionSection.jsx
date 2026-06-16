"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function AdmissionSection() {
  const [admissionData, setAdmissionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const response = await axios.get("/api/client/admission-open-message");
        if (response.data.status === "success") {
          const data = response.data.data;
          const finalData = Array.isArray(data)
            ? data[0]
            : data.data
              ? data.data[0]
              : null;
          setAdmissionData(finalData);
        }
      } catch (error) {
        console.error("Error fetching admission data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionData();
  }, []);

  if (loading) {
    return (
      <section className="adm-root">
        <div className="adm-skeleton" />
      </section>
    );
  }

  if (!admissionData) return null;

  const titleText = admissionData.Title || "";
  const match = titleText.match(/(.*?)(\d{4}-\d{4})/);
  const mainTitle = match ? match[1].trim() : titleText;
  const yearTitle = match ? match[2] : "";

  return (
    <>
     

      <section className="adm-root">
        <div className="adm-inner">

          {/* Eyebrow */}
          <div className="adm-eyebrow">
            <div className="adm-eyebrow-line" />
            <span className="adm-eyebrow-text">Admissions</span>
            <div className="adm-eyebrow-line rev" />
          </div>

          {/* Card */}
          <div className="adm-card">
            <div className="adm-card-strip" />

            {/* Image */}
            {admissionData.Image && (
              <div className="adm-img-wrap">
                <Image
                  src={`/uploads/${admissionData.Image}`}
                  alt={admissionData.Title || "Admission"}
                  fill
                  sizes="(max-width: 860px) 100vw, 860px"
                  className="object-cover"
                  priority
                />
                <span className="adm-badge">Now Open</span>
              </div>
            )}

            {/* Content */}
            <div className="adm-content">
              <h2 className="adm-title">
                {mainTitle}{" "}
                {yearTitle && <span className="adm-title-year">{yearTitle}</span>}
              </h2>

              <div className="adm-divider" />

              {admissionData.Message && (
                <div
                  className="adm-message"
                  dangerouslySetInnerHTML={{ __html: admissionData.Message }}
                />
              )}

              <div className="adm-cta-row">
                {admissionData.Read_More_Url && (
                  <Link href="https://yaduvanshigroup.edu.in/admission-Form" className="adm-cta-primary">
                    Apply Now
                    <svg className="adm-cta-arrow" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
                <Link href={admissionData.Read_More_Url} className="adm-cta-secondary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}