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
          const finalData = Array.isArray(data) ? data[0] : data.data ? data.data[0] : null;
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

  if (loading) return <section className="py-24 bg-surface animate-pulse"><div className="max-w-container-max mx-auto px-6 h-96 bg-secondary-container" /></section>;
  if (!admissionData) return null;

  const titleText = admissionData.Title || "";
  const match = titleText.match(/(.*?)(\d{4}-\d{4})/);
  const mainTitle = match ? match[1].trim() : titleText;
  const yearTitle = match ? match[2] : "";

  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span> ADMISSIONS
          </span>
        </div>

        {/* Admission Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-on-surface/10 bg-surface shadow-xl">
          
          {/* Image */}
          {admissionData.Image && (
            <div className="relative h-80 lg:h-auto min-h-[400px] w-full overflow-hidden">
              <Image
                src={`/uploads/${admissionData.Image}`}
                alt={admissionData.Title || "Admission"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-6 left-6 bg-primary text-on-primary px-4 py-1 font-label-caps text-xs">
                ADMISSIONS OPEN
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <h2 className="font-headline-lg text-primary mb-4 leading-tight">
              {mainTitle}{" "}
              {yearTitle && <span className="block text-secondary font-serif italic text-3xl">{yearTitle}</span>}
            </h2>

            <div className="w-16 h-[2px] bg-primary mb-8" />

            {admissionData.Message && (
              <div
                className="prose text-secondary mb-10"
                dangerouslySetInnerHTML={{ __html: admissionData.Message }}
              />
            )}

            <div className="flex flex-wrap gap-4">
              {admissionData.Read_More_Url && (
                <Link 
                  href="https://yaduvanshigroup.edu.in/admission-Form"
                  className="bg-primary text-on-primary px-8 py-4 font-label-caps hover:opacity-90 transition-all flex items-center gap-2"
                >
                  Apply Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              )}
              <Link 
                href={admissionData.Read_More_Url || "#"}
                className="border border-primary text-primary px-8 py-4 font-label-caps hover:bg-primary hover:text-on-primary transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}