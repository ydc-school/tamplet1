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
      <header className="w-full">
        <nav className="bg-deep-maroon text-on-primary shadow-sm flex flex-col w-full">
          <div
            className="max-w-container-max mx-auto w-full px-gutter py-2 flex justify-between items-center text-label-sm font-label-sm">
            <div className="flex gap-6 items-center">
              <a className="flex items-center gap-2 hover:bg-primary-container/20 transition-colors py-1 px-2"
                href="#">
                <span className="material-symbols-outlined text-[18px]">badge</span>
                I-Card
              </a>
              <a className="flex items-center gap-2 hover:bg-primary-container/20 transition-colors py-1 px-2"
                href="#">
                <span className="material-symbols-outlined text-[18px]">info</span>
                Public Disclosure
              </a>
              <a className="flex items-center gap-2 hover:bg-primary-container/20 transition-colors py-1 px-2"
                href="#">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                NEP 2020
              </a>
              <a className="flex items-center gap-2 hover:bg-primary-container/20 transition-colors py-1 px-2"
                href="#">
                <span className="material-symbols-outlined text-[18px]">newspaper</span>
                VISTAS
              </a>
            </div>
            <div className="flex gap-6 items-center">
              <a className="flex items-center gap-2 hover:bg-primary-container/20 transition-colors py-1 px-2"
                href="#">
                <span className="material-symbols-outlined text-[18px]">login</span>
                Login
              </a>
              <a className="flex items-center gap-2 hover:bg-primary-container/20 transition-colors py-1 px-2"
                href="#">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Cyber Security
              </a>
              <div className="flex gap-3 ml-4 border-l border-white/20 pl-4">
                <span
                  className="material-symbols-outlined cursor-pointer hover:text-heritage-gold">account_circle</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-heritage-gold">groups</span>
              </div>
            </div>
          </div>
        </nav>
      
        <div className="bg-white py-6">
          <div
            className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <img alt="Lotus Valley Logo" className="h-16 md:h-20 object-contain"
                src="https://lh3.googleusercontent.com/aida/AP1WRLueGe-wnE9VO_V-_lt1RCPM1Bj9tGW76RrUZjbP9zhsn6ULtyoFy7bbIbjTwLdCz3UnQ_YNaVNuF6SsRAE__1hubtkGCe_Pd3qSI1SBBbPu0MIjaqwOb0g_NeaKIRELVhzK5FnnFpuj7GcSQSwgcTI2nJIP5Er-oy0Huyv7i12tZM5jN-pjDTy_PUDXRydn8cajyruVBc-a0PX5Go5U9hj_76Oz194vxptuWXyyzD3kPTuIAKMmeDzSXkM" />
            </div>
            <div className="hidden md:flex gap-8 text-on-surface">
              <div className="flex flex-col items-center group cursor-pointer">
                <span
                  className="material-symbols-outlined text-deep-maroon mb-1 transition-transform group-hover:-translate-y-1">school</span>
                <span className="font-label-md text-label-md">About Us</span>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <span
                  className="material-symbols-outlined text-deep-maroon mb-1 transition-transform group-hover:-translate-y-1">auto_stories</span>
                <span className="font-label-md text-label-md">Learning</span>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <span
                  className="material-symbols-outlined text-deep-maroon mb-1 transition-transform group-hover:-translate-y-1">how_to_reg</span>
                <span className="font-label-md text-label-md">Admissions</span>
              </div>
              <div className="flex flex-col items-center group cursor-pointer text-heritage-gold">
                <span
                  className="material-symbols-outlined mb-1 transition-transform group-hover:-translate-y-1">event</span>
                <span className="font-label-md text-label-md">News &amp; Events</span>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <span
                  className="material-symbols-outlined text-deep-maroon mb-1 transition-transform group-hover:-translate-y-1">contact_page</span>
                <span className="font-label-md text-label-md">Contact Us</span>
              </div>
            </div>
          </div>
        </div>
       
        <nav className="bg-academic-teal text-white w-full sticky top-0 z-50 shadow-md">
          <div className="max-w-container-max mx-auto flex justify-center items-center w-full px-8 py-3">
            <div
              className="flex flex-wrap justify-center gap-x-8 gap-y-2 uppercase font-label-md text-label-md tracking-widest">
              <a className="hover:text-heritage-gold transition-colors active:scale-95" href="#">Awards</a>
              <a className="hover:text-heritage-gold transition-colors active:scale-95" href="#">Gallery</a>
              <a className="hover:text-heritage-gold transition-colors active:scale-95" href="#">Careers</a>
              <a className="hover:text-heritage-gold transition-colors active:scale-95" href="#">School Calendar</a>
              <a className="hover:text-heritage-gold transition-colors active:scale-95" href="#">Alumni</a>
              <a className="hover:text-heritage-gold transition-colors active:scale-95" href="#">eMagazine</a>
              <a className="hover:text-heritage-gold transition-colors active:scale-95" href="#">TAABIR</a>
            </div>
          </div>
        </nav>
      </header>

      {/* <div ref={menuRef}>
        <div className="nb-topbar" />

       
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
      </div> */}
    </>
  );
}