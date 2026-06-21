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

  const stripHtml = (html) =>
    html ? html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";

  if (loading) {
    return (
      <section className="wc-root">
        <div className="wc-skel" />
      </section>
    );
  }

  // if (!welcomeData) return null;

  // const hasImage = welcomeData.Image && welcomeData.Image.trim() !== "";

  return (
    <>
     





 <section className="py-section-padding bg-white" id="about">
        <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex flex-col items-center mb-stack-lg">
                <h2 className="font-headline-lg text-headline-lg text-heritage-navy uppercase tracking-widest mb-4">About Us
                </h2>
                <div className="w-24 h-1 bg-academic-gold"></div>
            </div>
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg leading-relaxed text-on-surface-variant font-body-md">
                <div className="space-y-4">
                    <p>Yaduvanshi Group of Institutions, founded in 1995 by Mr. Rao Bahadur Singh under Rao Chiranji Lal
                        Samriti Jan Seva Trust, is a premier educational network across Haryana, including Mahendergarh,
                        Narnaul, Rewari, and Satnali.</p>
                    <p>Our lush, modern campuses offer top-tier programs in Engineering, Management, Pharmacy, and
                        Education. We focus on academic excellence, holistic development, and competitive exam success.
                        Combining advanced laboratories, sports, and cultural activities, the Group grooms disciplined,
                        skilled global professionals deeply rooted in Indian values, ready to face modern challenges
                        with confidence.</p>
                </div>
                <div className="space-y-4">
                    <p>Our campuses stand out for their state-of-the-art infrastructure, designed to bridge the gap
                        between theoretical knowledge and real-world skills. Students gain hands-on experience through
                        regular industry visits, corporate guest lectures, and mandatory internship programs. This
                        strong emphasis on practical exposure ensures that our graduates are highly employable and ready
                        to excel in the competitive global job market.</p>
                    <p>Furthermore, we take immense pride in our dedicated placement cell, which works tirelessly to
                        connect students with top-tier national and multinational companies. Through comprehensive
                        personality development bootcamps, mock interviews, and soft-skills training, we empower every
                        individual to secure rewarding career opportunities and achieve long-term professional success.
                    </p>
                </div>
            </div>
        </div>
    </section>











      {/* <section className="wc-root">
        <div className="wc-inner">

         
          <div className="wc-text">
            <div className="wc-eyebrow">
              <span className="wc-ey-dot" />
              <span className="wc-ey-text">Welcome</span>
            </div>

            <h2 className="wc-title">
              {welcomeData.Title
                ? welcomeData.Title.split(" ").map((word, i) =>
                    i === 0 ? <em key={i}>{word} </em> : word + " "
                  )
                : "Welcome to Our Institution"}
            </h2>

            <div className="wc-divider" />

            {welcomeData.Message && (
              <div
                className="wc-message"
                dangerouslySetInnerHTML={{ __html: welcomeData.Message }}
              />
            )}

            <div className="wc-pills">
              {["Quality Education", "Experienced Faculty", "Holistic Development", "Modern Campus"].map((p) => (
                <span key={p} className="wc-pill">
                  <span className="wc-pill-dot" />
                  {p}
                </span>
              ))}
            </div>

            {welcomeData.Read_More_Url && (
              <Link href={welcomeData.Read_More_Url} className="wc-cta">
                Learn More
                <svg className="wc-cta-arrow" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>

          
          <div className="wc-img-wrap">
            {hasImage ? (
              <div className="wc-img-card">
                <Image
                  src={`/uploads/${welcomeData.Image}`}
                  alt={welcomeData.Title || "Welcome"}
                  fill
                  sizes="(max-width: 899px) 100vw, 460px"
                  className="object-contain"
                  priority
                />
                <div className="wc-stat-badge">
                  <div className="wc-stat-num">{schoolInfo?.Experience}+</div>
                  <div className="wc-stat-label">Years of Excellence</div>
                </div>
              </div>
            ) : (
              <div className="wc-no-img">
                <div className="wc-no-img-circle c1" />
                <div className="wc-no-img-circle c2" />
                <svg className="wc-no-img-icon" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <p className="wc-no-img-quote">
                  &quot;{welcomeData.Title || "Empowering Young Minds for a Better Tomorrow"}&quot;
                </p>
                <div className="wc-stat-badge" style={{ position: "relative", bottom: "unset", left: "unset", alignSelf: "flex-start", margin: "0 0 0 32px" }}>
                  <div className="wc-stat-num">26+</div>
                  <div className="wc-stat-label">Years of Excellence</div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section> */}
    </>
  );
}
