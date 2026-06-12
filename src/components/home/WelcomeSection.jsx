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
      <section>
        <div>
          {/* Text */}
          <div>
            <div>
              <span />
              <span>Welcome</span>
            </div>

            <h2>
              {welcomeData.Title
                ? welcomeData.Title.split(" ").map((word, i) =>
                  i === 0 ? <em key={i}>{word} </em> : word + " "
                )
                : "Welcome to Our Institution"}
            </h2>

            <div />

            {welcomeData.Message && (
              <div
                dangerouslySetInnerHTML={{ __html: welcomeData.Message }}
              />
            )}

            <div>
              {["Quality Education", "Experienced Faculty", "Holistic Development", "Modern Campus"].map((p) => (
                <span key={p}>
                  <span />
                  {p}
                </span>
              ))}
            </div>

            {welcomeData.Read_More_Url && (
              <Link href={welcomeData.Read_More_Url}>
                Learn More
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Image / Decorative */}
          <div>
            {hasImage ? (
              <div>
                <Image
                  src={`/uploads/${welcomeData.Image}`}
                  alt={welcomeData.Title || "Welcome"}
                  fill
                  sizes="(max-width: 899px) 100vw, 460px"
                  priority
                  style={{ objectFit: "contain" }}
                />
                <div>
                  <div>{schoolInfo?.Experience}+</div>
                  <div>Years of Excellence</div>
                </div>
              </div>
            ) : (
              <div>
                <div />
                <div />
                <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <p>
                  &quot;{welcomeData.Title || "Empowering Young Minds for a Better Tomorrow"}&quot;
                </p>
                <div style={{ position: "relative", bottom: "unset", left: "unset", alignSelf: "flex-start", margin: "0 0 0 32px" }}>
                  <div>26+</div>
                  <div>Years of Excellence</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
