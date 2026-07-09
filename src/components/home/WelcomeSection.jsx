"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";

export default function WelcomeSection() {
  const [welcomeData, setWelcomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { schoolInfo } = useSchool();

  useEffect(() => {
    axios
      .get("/api/client/school-welcome-message")
      .then((res) => {
        if (res.data.status === "success") {
          const d = res.data.data;
          setWelcomeData(Array.isArray(d) ? d[0] : d?.data?.[0] ?? null);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const stripHtml = (html) =>
    html ? html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";

  if (loading) {
    return (
      <section className="wc-root">
        <div className="wc-skel" />
      </section>
    );
  }

  if (!welcomeData) return null;

  const hasImage = welcomeData.Image && welcomeData.Image.trim() !== "";

  return (
    <>
      <section className="py-stack-lg bg-surface-container-lowest relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-gutter text-center relative z-10">
          <div className="mb-10 flex flex-col items-center">
            <span className="material-symbols-outlined text-heritage-gold text-5xl mb-4">format_quote</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface italic leading-relaxed">
              {welcomeData?.Title}
            </h2>
          </div>
          <div
            className="space-y-6 text-on-surface-variant font-body-lg text-body-lg max-w-5xl mx-auto border-t border-outline-variant pt-10">
            {welcomeData.Message && (
              <div
                className="wc-message"
                dangerouslySetInnerHTML={{ __html: welcomeData.Message }}
              />
            )}


            {welcomeData.Read_More_Url && (
              <Link href={welcomeData.Read_More_Url}  className="pt-6">
                <button
                  className="border-2 border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-white transition-all py-3 px-8 font-label-md text-label-md uppercase tracking-widest">
                  Explore More
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

    
    </>
  );
}
