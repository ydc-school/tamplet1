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
    <section>
      <div>
        {/* Eyebrow */}
        <div>
          <div />
          <span>Admissions</span>
          <div />
        </div>

        {/* Card */}
        <div>
          <div />

          {/* Image */}
          {admissionData.Image && (
            <div>
              <Image
                src={`/uploads/${admissionData.Image}`}
                alt={admissionData.Title || "Admission"}
                fill
                sizes="(max-width: 860px) 100vw, 860px"
                style={{ objectFit: "cover" }}
                priority
              />
              <span>Now Open</span>
            </div>
          )}

          {/* Content */}
          <div>
            <h2>
              {mainTitle}{" "}
              {yearTitle && <span>{yearTitle}</span>}
            </h2>

            <div />

            {admissionData.Message && (
              <div
                dangerouslySetInnerHTML={{ __html: admissionData.Message }}
              />
            )}

            <div>
              {admissionData.Read_More_Url && (
                <Link href="https://yaduvanshigroup.edu.in/admission-Form">
                  Apply Now
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
              <Link href={admissionData.Read_More_Url}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}