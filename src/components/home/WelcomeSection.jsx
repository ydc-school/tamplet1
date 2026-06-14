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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="py-24 bg-surface" />;
  if (!welcomeData) return null;

  const hasImage = welcomeData.Image && welcomeData.Image.trim() !== "";

  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Text Side */}
        <div>
          <span className="font-label-caps text-label-caps text-secondary mb-4 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-primary"></span>
            WELCOME
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-8">
            {welcomeData.Title?.split(" ").map((word, i) =>
              i === 0 ? <span key={i} className="italic font-serif">{word} </span> : word + " "
            )}
          </h2>

          <div className="font-body-lg text-secondary mb-8 prose" dangerouslySetInnerHTML={{ __html: welcomeData.Message }} />

          <div className="grid grid-cols-2 gap-4 mb-10">
            {["Quality Education", "Experienced Faculty", "Holistic Development", "Modern Campus"].map((p) => (
              <div key={p} className="flex items-center gap-3 font-label-caps text-label-caps text-primary">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                {p}
              </div>
            ))}
          </div>

          {welcomeData.Read_More_Url && (
            <Link href={welcomeData.Read_More_Url} className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary border-b border-primary pb-2 hover:opacity-70 transition-opacity">
              Learn More
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          )}
        </div>

        {/* Image/Visual Side */}
        <div className="relative aspect-[4/3] w-full bg-secondary-container overflow-hidden">
          {hasImage ? (
            <Image
              src={`/uploads/${welcomeData.Image}`}
              alt={welcomeData.Title || "Welcome"}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex flex-col justify-center items-center h-full p-12 text-center">
              <span className="material-symbols-outlined text-[48px] text-primary mb-4">school</span>
              <p className="font-headline-md text-primary italic">"{welcomeData.Title}"</p>
            </div>
          )}
          
          {/* Experience Badge */}
          <div className="absolute bottom-6 left-6 bg-primary text-on-primary p-6">
            <span className="block text-headline-md font-bold">{schoolInfo?.Experience}+</span>
            <span className="font-label-caps text-[10px] tracking-widest uppercase">Years of Excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}