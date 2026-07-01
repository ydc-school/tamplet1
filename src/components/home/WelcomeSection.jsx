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

  if (!welcomeData) return null;

  const hasImage = welcomeData.Image && welcomeData.Image.trim() !== "";

  return (
    <>
       <section className="py-stack-lg bg-surface-container-lowest relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-gutter text-center relative z-10">
                <div className="mb-10 flex flex-col items-center">
                    <span className="material-symbols-outlined text-heritage-gold text-5xl mb-4">format_quote</span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface italic leading-relaxed">
                        "Making a Difference to Education so that Education can make a Difference to the World."
                    </h2>
                </div>
                <div
                    className="space-y-6 text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto border-t border-outline-variant pt-10">
                    <p className="font-bold text-deep-maroon tracking-wide">‘Arise! Awake! and Stop not till the goal is
                        reached’</p>
                    <p>We encourage our learners to discover their passion and decide their goals in life.</p>
                    <p>Education begins at home and I applaud the parents who recognize that they and not someone else -
                        must take responsibility to assure that their children go to the best school.</p>
                    <div className="pt-6">
                        <button
                            className="border-2 border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-white transition-all py-3 px-8 font-label-md text-label-md uppercase tracking-widest">
                            Explore More
                        </button>
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
