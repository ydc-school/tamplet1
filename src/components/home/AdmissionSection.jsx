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
        if (response?.data?.status === "success") {
          const data = response.data.data;
          const finalData = Array.isArray(data)
            ? data[0]
            : data?.data
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
      <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto animate-pulse">
          {/* Eyebrow Skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[2px] w-8 bg-gray-200" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          {/* Card Skeleton */}
          <div className="bg-[#01327F]/[0.03] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[350px]">
            <div className="w-full h-64 md:h-80 bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-7 bg-gray-300 rounded-md w-3/4" />
              <div className="h-[1px] bg-gray-200 w-full my-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="flex gap-4 mt-6">
                <div className="h-10 bg-gray-300 rounded-xl w-28" />
                <div className="h-10 bg-gray-200 rounded-xl w-24" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!admissionData) return null;

  const titleText = admissionData?.Title || "";
  const match = titleText.match(/(.*?)(\d{4}-\d{4})/);
  const mainTitle = match ? match[1].trim() : titleText;
  const yearTitle = match ? match[2] : "";

  return (
    <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Admissions</span>
            <div />
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#01327F]/[0.03] rounded-2xl p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div />

          {/* Image */}
          {admissionData?.Image && (
            <div className="relative w-full h-64 sm:h-72 md:h-85 min-h-[260px] rounded-2xl overflow-hidden group bg-white">
              <Image
                src={`/uploads/${admissionData.Image}`}
                alt={admissionData?.Title || "Admission"}
                fill
                sizes="(max-width: 860px) 100vw, 860px"
                className="object-cover transition-transform duration-300 group-hover:scale-102"
                priority
              />
              <span className="absolute top-4 left-4 bg-amber-400 text-[#01327F] text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full">
                Now Open
              </span>
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col h-full justify-center py-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#01327F] leading-tight">
              {mainTitle || "Admission Notice"}{" "}
              {yearTitle && <span className="text-amber-500 block sm:inline mt-1 sm:mt-0 font-black">{yearTitle}</span>}
            </h2>

            <div className="h-[1px] bg-[#01327F]/10 w-full my-4" />

            {admissionData?.Message && (
              <div
                className="text-sm md:text-base text-gray-600 leading-relaxed space-y-3 mb-6 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: admissionData.Message }}
              />
            )}

            <div className="flex flex-wrap items-center gap-4">
              {admissionData?.Read_More_Url && (
                <Link 
                  href="https://yaduvanshigroup.edu.in/admission-Form"
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-[#01327F] text-white px-5 py-2.5 rounded-xl hover:bg-amber-400 hover:text-[#01327F] transition-all duration-200 group active:scale-95"
                >
                  Apply Now
                  <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
              <Link 
                href={admissionData?.Read_More_Url || "#"}
                className="inline-flex items-center text-xs md:text-sm font-bold text-[#01327F] hover:text-amber-500 px-3 py-2 rounded-xl transition-colors duration-200"
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