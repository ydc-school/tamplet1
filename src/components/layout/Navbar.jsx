"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";
import { useFallbackImage } from "@/hooks/useFallbackImage";
import slugify from "@/utils/slugify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const { schoolInfo, loading } = useSchool();
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(
    schoolInfo?.Logo_Url,
    "/logo/logo.png"
  );

  const schoolName = schoolInfo?.School_Name ?? "Yaduvanshi";
  const shortName = schoolInfo?.Short_Name ?? "Degree College";

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get("/api/client/pages");
        if (response.data.status === "success") {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileLink = () => {
    setOpen(false);
    setOpenCategory(null);
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
    

      <div ref={menuRef}>
        <div className="nb-topbar" />

        {/* Branding Section (Logo + Admission Open Image) */}
        <div className="nb-top-branding">
          <div className="nb-branding-inner">
            <Link href="/" className="nb-logo">
              <div className="nb-logo-img-wrap bg-amber-800">
                <Image
                  src={logoSrc}
                  alt={`${schoolName} logo`}
                  width={120}
                  height={52}
                  className="nb-logo-img"
                  onError={handleLogoError}
                  unoptimized
                  priority
                />
              </div>
              <div className="nb-logo-text">
                <div className="nb-school-name">{loading ? "…" : schoolName}</div>
                <div className="nb-school-sub">{loading ? "" : shortName}</div>
              </div>
            </Link>

            {/* Note: Change the src string below to your real image path when ready */}
            <div className="nb-admission-banner">
              <Image
                src="/poster/31y.png"
                alt="Admission Open"
                width={180}
                height={55}
                className="nb-admission-img"
                priority
              />
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className={`nb-wrap${scrolled ? " scrolled" : ""}`}>
          <div className="nb-inner">
            <ul className="nb-links">
              <li className="nb-item">
                <Link href="/" className="nb-btn active">Home</Link>
              </li>
              <li className="nb-item">
                <Link href="/achievements" className="nb-btn">Achievements</Link>
              </li>

              {categories.map((cat) => (
                <li key={cat.Id} className="nb-item">
                  {cat.pages?.length > 0 ? (
                    <>
                      <button className="nb-btn">
                        {cat.Name}
                        <svg className="nb-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="nb-dropdown">
                        {cat.pages.map((page) => (
                          <Link key={page.Id} href={`/pages/${slugify(page.Name)}/${page.Id}`} className="nb-drop-item">
                            {page.Name.replace(/-/g, " ")}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <button className="nb-btn">{cat.Name}</button>
                  )}
                </li>
              ))}
            </ul>

            <div className="nb-cta-wrap">
              <Link href="/admission-form" className="nb-cta">
                Student Admission
                <svg className="nb-cta-arrow" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <button className="nb-ham" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              <span className={`nb-bar b1${open ? " open" : ""}`} />
              <span className={`nb-bar b2${open ? " open" : ""}`} />
              <span className={`nb-bar b3${open ? " open" : ""}`} />
            </button>
          </div>

          <div className={`nb-panel ${open ? " open" : ""}`}>
            <div className="nb-panel-inner">
              <div className="nb-panel-label">Navigation</div>

              <Link href="/" onClick={handleMobileLink} className="nb-m-link active">Home</Link>
              <Link href="/achievements" onClick={handleMobileLink} className="nb-m-link">Achievements</Link>

              {categories.map((cat) => (
                <div key={cat.Id}>
                  {cat.pages?.length > 0 ? (
                    <>
                      <button
                        className="nb-m-link"
                        onClick={() => setOpenCategory(openCategory === cat.Id ? null : cat.Id)}
                      >
                        {cat.Name}
                        <svg className={`nb-m-chevron${openCategory === cat.Id ? " r" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`nb-m-sub${openCategory === cat.Id ? " open" : ""}`}>
                        {cat.pages.map((page) => (
                          <Link key={page.Id} href={`/pages/${slugify(page.Name)}/${page.Id}`} onClick={handleMobileLink} className="nb-m-sub-item">
                            {page.Name.replace(/-/g, " ")}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <button className="nb-m-link">{cat.Name}</button>
                  )}
                </div>
              ))}

              <Link href="https://yaduvanshigroup.edu.in/admission-Form" onClick={handleMobileLink} className="nb-m-cta">
                Student Admission
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}