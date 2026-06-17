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
        if (res.data?.status === "success") {
          const d = res.data.data;
          setWelcomeData(Array.isArray(d) ? d[0] : d?.data?.[0] ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <article>Loading...</article>;
  if (!welcomeData) return null;

  return (
    <article>
      {/*
        UI PROMPT — WELCOME SECTION (2 columns):
        LEFT: Eyebrow "Welcome" (gold uppercase) + H2 title (first word italic).
        Rich HTML message + feature pills: Quality Education | Experienced Faculty | Holistic Development | Modern Campus.
        Optional "Learn More →" CTA link.
        RIGHT: Square image 460×460 rounded + floating badge "26+ Years of Excellence" (gold card overlay).
        Desktop: side-by-side. Mobile: stacked (text first). White bg.
        Full prompt: UI_PROMPTS.md → Section 5
      */}
      <header>
        <span>Welcome</span>
        <h2>
          {welcomeData.Title?.split(" ").map((word, i) => (
            i === 0 ? <em key={i}>{word} </em> : word + " "
          )) || "Welcome to Our Institution"}
        </h2>
      </header>

      <main>
        {welcomeData.Message && (
          <div dangerouslySetInnerHTML={{ __html: welcomeData.Message }} />
        )}

        <nav aria-label="Features">
          {["Quality Education", "Experienced Faculty", "Holistic Development", "Modern Campus"].map((p) => (
            <span key={p}>{p}</span>
          ))}
        </nav>
      </main>

      <figure>
        {welcomeData.Image ? (
          <Image
            src={`/uploads/${welcomeData.Image}`}
            alt={welcomeData.Title || "Welcome"}
            width={460}
            height={460}
            priority
          />
        ) : (
          <figcaption>{welcomeData.Title || "Empowering Young Minds"}</figcaption>
        )}
        
        <aside>
          <strong>{schoolInfo?.Experience || 26}+</strong>
          <span>Years of Excellence</span>
        </aside>
      </figure>

      {welcomeData.Read_More_Url && (
        <footer>
          <Link href={welcomeData.Read_More_Url}>Learn More &rarr;</Link>
        </footer>
      )}
    </article>
  );
}