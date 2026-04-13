"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const { schoolInfo, loading } = useSchool();

  const schoolName = schoolInfo?.School_Name ?? "Yaduvanshi";
  const shortName = schoolInfo?.Short_Name ?? "Degree College";
  const logoUrl = schoolInfo?.Logo_Url
    ? `/uploads/${schoolInfo.Logo_Url}`
    : "/logo/logo.png";

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
      <style>{`

        :root {
          --nb-bg: #0f2044;
          --nb-bg-scroll: rgba(10, 25, 58, 0.97);
          --nb-border: rgba(196, 160, 72, 0.2);
          --nb-gold: #c4a048;
          --nb-gold-light: #e0c060;
          --nb-text: #cbd5e1;
          --nb-text-muted: rgba(203, 213, 225, 0.55);
          --nb-dropdown-bg: #0a1836;
          --nb-hover-bg: rgba(196, 160, 72, 0.08);
          --nb-height: 72px;
        }

        .nb-wrap {
          position: sticky;
          top: 0;
          z-index: 999;
          width: 100%;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          background: var(--nb-bg);
          border-bottom: 1px solid var(--nb-border);
          font-family: 'Source Sans 3', sans-serif;
        }
        .nb-wrap.scrolled {
          background: var(--nb-bg-scroll);
          backdrop-filter: blur(14px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
        }

        /* Top accent bar */
        .nb-topbar {
          background: var(--nb-gold);
          height: 3px;
          width: 100%;
        }

        .nb-inner {
          max-width: 1400px;
          margin: 0 auto;
          height: var(--nb-height);
          padding: 0 28px;
          display: flex;
          align-items: center;
          gap: 0;
        }

        /* ── Logo ── */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
          padding-right: 28px;
          border-right: 1px solid var(--nb-border);
          height: 48px;
        }
        .nb-logo-img-wrap {
          width: 120px;
          height: 52px;
           border-radius: 0%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px var(--nb-gold);
        }
        .nb-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
         
        }
        .nb-logo-text { display: none; }
        @media (min-width: 600px) { .nb-logo-text { display: block; } }
        .nb-school-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #f0e6c8;
          line-height: 1.15;
        }
        .nb-school-sub {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--nb-gold);
          margin-top: 2px;
        }

        /* ── Desktop links ── */
        .nb-links {
          display: none;
          flex: 1;
          height: 100%;
          padding-left: 12px;
          list-style: none;
          margin: 0;
          align-items: center;
        }
        @media (min-width: 960px) { .nb-links { display: flex; } }

        .nb-item {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .nb-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0 14px;
          height: 100%;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--nb-text);
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s;
          position: relative;
        }
        .nb-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 14px;
          right: 14px;
          height: 2px;
          background: var(--nb-gold);
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: center;
        }
        .nb-btn:hover, .nb-btn.active { color: #f0e6c8; }
        .nb-btn:hover::after, .nb-btn.active::after { transform: scaleX(1); }

        .nb-chevron {
          width: 10px;
          height: 10px;
          color: var(--nb-gold);
          transition: transform 0.2s;
        }
        .nb-item:hover .nb-chevron { transform: rotate(180deg); }

        /* Dropdown */
        .nb-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 210px;
          background: var(--nb-dropdown-bg);
          border: 1px solid var(--nb-border);
          border-top: 2px solid var(--nb-gold);
          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition: all 0.22s ease;
          z-index: 200;
        }
        .nb-item:hover .nb-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .nb-drop-item {
          display: block;
          padding: 10px 18px;
          font-size: 13px;
          color: var(--nb-text);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all 0.15s;
          text-transform: capitalize;
        }
        .nb-drop-item:last-child { border-bottom: none; }
        .nb-drop-item:hover {
          background: var(--nb-hover-bg);
          color: var(--nb-gold-light);
          padding-left: 24px;
        }

        /* CTA */
        .nb-cta-wrap {
          margin-left: auto;
          padding-left: 24px;
          border-left: 1px solid var(--nb-border);
          height: 48px;
          display: none;
          align-items: center;
        }
        @media (min-width: 960px) { .nb-cta-wrap { display: flex; } }

        .nb-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--nb-gold);
          color: #0a1530;
          padding: 10px 22px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .nb-cta:hover {
          background: var(--nb-gold-light);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(196, 160, 72, 0.35);
        }
        .nb-cta-arrow { transition: transform 0.2s; }
        .nb-cta:hover .nb-cta-arrow { transform: translateX(3px); }

        /* Hamburger */
        .nb-ham {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 42px;
          height: 42px;
          gap: 5px;
          background: none;
          border: 1px solid var(--nb-border);
          border-radius: 3px;
          cursor: pointer;
          margin-left: auto;
          transition: border-color 0.2s, background 0.2s;
        }
        .nb-ham:hover { border-color: var(--nb-gold); background: var(--nb-hover-bg); }
        @media (min-width: 960px) { .nb-ham { display: none; } }
        .nb-bar {
          width: 18px;
          height: 1.5px;
          background: var(--nb-text);
          transition: all 0.3s ease;
          transform-origin: center;
        }nb
        .b1.open { transform: rotate(45deg) translate(4.5px, 4.5px); }
        .b2.open { opacity: 0; transform: scaleX(0); }
        .b3.open { transform: rotate(-45deg) translate(4.5px, -4.5px); }

        /* Mobile Panel */
        .nb-panel {
          display: none;
          position: fixed;
          top: calc(var(--nb-height) + 3px);
          left: 0;
          right: 0;
          bottom: 0;
          background: #081428;
          border-top: 1px solid var(--nb-border);
          overflow-y: auto;
          z-index: 998;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nb-panel.open { transform: translateX(0); }
        @media (max-width: 959px) { .nb-panel { display: block; } }

        .nb-panel-inner { padding: 16px 24px 48px; }

        .nb-panel-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--nb-gold);
          padding: 12px 0 10px;
          border-bottom: 1px solid var(--nb-border);
          margin-bottom: 4px;
        }

        .nb-m-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          font-size: 14px;
          font-weight: 500;
          color: var(--nb-text);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: color 0.2s;
        }
        .nb-m-link:hover, .nb-m-link.active { color: var(--nb-gold-light); }

        .nb-m-chevron {
          width: 14px;
          height: 14px;
          color: var(--nb-gold);
          transition: transform 0.2s;
        }
        .nb-m-chevron.r { transform: rotate(180deg); }

        .nb-m-sub {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
        }
        .nb-m-sub.open { max-height: 500px; }

        .nb-m-sub-item {
          display: block;
          padding: 10px 16px;
          font-size: 13px;
          color: var(--nb-text-muted);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          text-transform: capitalize;
          transition: all 0.15s;
        }
        .nb-m-sub-item:hover { color: var(--nb-gold-light); padding-left: 22px; }

        .nb-m-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          padding: 15px;
          background: var(--nb-gold);
          color: #0a1530;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s;
        }
        .nb-m-cta:hover { background: var(--nb-gold-light); }
      `}</style>

      <div ref={menuRef}>
        <div className="nb-topbar " />
        <nav className={`nb-wrap${scrolled ? " scrolled" : ""}`}>
          <div className="nb-inner">

            {/* Logo */}
            <Link href="/" className="nb-logo">
              <div className="nb-logo-img-wrap  bg-amber-800">
                <Image
                  src={logoUrl}
                  alt={`${schoolName} logo`}
                  width={502}
                  height={52}
                  className="nb-logo-img"
                  onError={(e) => { e.currentTarget.src = "/logo/logo.png"; }}
                  priority
                />
              </div>
              <div className="nb-logo-text">
                <div className="nb-school-name">{loading ? "…" : schoolName}</div>
                <div className="nb-school-sub">{loading ? "" : shortName}</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="nb-links">
              <li className="nb-item">
                <Link href="/" className="nb-btn active">Home</Link>
              </li>
              <li className="nb-item">
                <Link href="/blogs" className="nb-btn active">Blogs</Link>
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
                          <Link key={page.Id} href={`/pages/${page.Id}`} className="nb-drop-item">
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

            {/* Desktop CTA */}
            <div className="nb-cta-wrap">
              <Link href="https://yo-dalo.in/admission-Form" className="nb-cta">
                Student Admission
                <svg className="nb-cta-arrow" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Hamburger */}
            <button className="nb-ham" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              <span className={`nb-bar b1${open ? " open" : ""}`} />
              <span className={`nb-bar b2${open ? " open" : ""}`} />
              <span className={`nb-bar b3${open ? " open" : ""}`} />
            </button>
          </div>

          {/* Mobile Panel */}
          <div className={`nb-panel  ${open ? " open" : ""}`}>
            <div className="nb-panel-inner">
              <div className="nb-panel-label">Navigation</div>

              <Link href="/" onClick={handleMobileLink} className="nb-m-link active">Home</Link>

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
                          <Link key={page.Id} href={`/pages/${page.Id}`} onClick={handleMobileLink} className="nb-m-sub-item">
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

              <Link href="https://yo-dalo.in/admission-Form" onClick={handleMobileLink} className="nb-m-cta">
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