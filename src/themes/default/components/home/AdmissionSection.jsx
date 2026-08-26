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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-neutral-50 animate-pulse">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <div className="h-10 bg-neutral-200 rounded w-1/3 mx-auto" />
          <div className="h-6 bg-neutral-200 rounded w-2/3 mx-auto" />
          <div className="h-[450px] bg-neutral-200 rounded-2xl w-full" />
        </div>
      </section>
    );
  }

  if (!admissionData) return null;

  const titleText = admissionData.Title || "";
  const match = titleText.match(/(.*?)(\d{4}-\d{4})/);
  const mainTitle = match ? match[1].trim() : titleText;
  const yearTitle = match ? match[2] : "";

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-12">


          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
            {mainTitle} {yearTitle && <span className="text-amber-600 block md:inline mt-1 md:mt-0">{yearTitle}</span>}
          </h2>

          {admissionData.Message && (
            <div
              className="text-lg text-neutral-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: admissionData.Message }}
            />
          )}
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center bg-white border border-neutral-200 rounded-2xl overflow-hidden">

          {admissionData.Image != "" &&
            <div className="md:col-span-7 relative h-[350px] md:h-[500px] w-full bg-neutral-100">
              <Image
                src={`/uploads/${admissionData.Image}`}
                alt={admissionData.Title || "Admission"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          }

          <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Secure Your Future Today
            </h3>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Join our vibrant academic community. Applications are currently being reviewed for the upcoming term. Explore programs and requirements.
            </p>

            <div className="flex flex-col justify-center sm:flex-row gap-4">
              {admissionData.Read_More_Url && (
                <Link
                  href="/admission-form"
                  className="  border-2 border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-white transition-all py-3 px-8 font-label-md text-label-md uppercase tracking-widest"
                >
                  Apply Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}