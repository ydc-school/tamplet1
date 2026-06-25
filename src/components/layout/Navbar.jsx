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





  const youtubeUrl = schoolInfo?.Youtube_Url ? `${schoolInfo.Youtube_Url}` : "#";
  const linkedinUrl = schoolInfo?.Linkedin_Url ? `${schoolInfo.Linkedin_Url}` : "#";
  const instagramUrl = schoolInfo?.Instagram_Url ? `${schoolInfo.Instagram_Url}` : "#";
  const twitterUrl = schoolInfo?.Twitter_Url ? `${schoolInfo.Twitter_Url}` : "#";






  return (
    <>
      <header className="w-full relative z-50" ref={menuRef}>
        <nav className="bg-deep-maroon text-white shadow-sm flex flex-col w-full text-xs">
          <div className="max-w-7xl mx-auto w-full px-6 py-2 flex justify-between items-center font-medium tracking-wide">
            <div className="flex gap-6 items-center">
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">badge</span>
                chairman's Window
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">info</span>
                Public Disclosure
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                CLOUD9 APP
              </Link>
              <Link href="https://admin.yaduvanshigroup.edu.in/" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">newspaper</span>
                Admin Portal
              </Link>
            </div>

            <div className="flex gap-6 items-center">


             
              <div className="flex gap-4 ml-4 border-l border-white/20 pl-4 items-center text-white">
                {/* Facebook */}
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </a>

             

                {/* Instagram */}
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white  border-b border-gray-100">
          <div className="max-w-7xl mx-auto  px-6 flex justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-72  h-32 md:w-92 md:h-32  flex-shrink-0">
                <Image
                  src={logoSrc}
                  alt={`${schoolName} Logo`}
                  fill
                  className="object-contain"
                  onError={handleLogoError}
                  unoptimized
                  priority
                />
              </div>

            </Link>

            <div className="hidden md:flex gap-6 items-center">
              <div className="relative w-[140px] h-[48px]  md:w-92 md:h-32 flex-shrink-0">
                <Image
                  src="/poster/31y.png"
                  alt="Admission Open"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <Link href="/admission-form" className="bg-[#6d001d] text-white px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-[#850325] transition-all flex items-center gap-2 shadow-sm active:scale-95">
                Student Admission
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <button
                className="md:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                <span className={`w-6 h-0.5 bg-gray-800 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`w-6 h-0.5 bg-gray-800 transition-all ${open ? "opacity-0" : ""}`} />
                <span className={`w-6 h-0.5 bg-gray-800 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="flex flex-col gap-1.5 justify-center items-center w-8 h-8"
                onClick={() => setOpen(!open)}
              >
                <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        <nav className={` bg-[#6d001d] text-white w-full transition-all duration-300 ${scrolled ? "fixed top-0 left-0 shadow-md z-50" : "relative"}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-6">
            <ul className="hidden md:flex items-center flex-wrap gap-1 text-xs font-bold tracking-widest uppercase">
              <li>
                <Link href="/" className="inline-block px-4 py-3.5 hover:text-amber-400 transition-colors border-b-2 border-transparent hover:border-amber-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="inline-block px-4 py-3.5 hover:text-amber-400 transition-colors border-b-2 border-transparent hover:border-amber-400">
                  Achievements
                </Link>
              </li>

              {categories.map((cat) => (
                <li key={cat.Id} className="relative group py-3.5 px-4 cursor-pointer">
                  {cat.pages?.length > 0 ? (
                    <>
                      <div className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                        {cat.Name}
                        <svg className="w-3 h-3 transform group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="absolute top-full left-0 mt-0 w-52 bg-white text-gray-800 rounded-b-md shadow-xl border-t-2 border-amber-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-1 z-[60]">
                        {cat.pages.map((page) => (
                          <Link
                            key={page.Id}
                            href={`/pages/${slugify(page.Name)}/${page.Id}`}
                            className="px-4 py-2 text-xs font-semibold hover:bg-gray-50 hover:text-[#6d001d] transition-colors uppercase tracking-wider"
                          >
                            {page.Name.replace(/-/g, " ")}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <span className="hover:text-amber-400 transition-colors">{cat.Name}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest py-3.5 ml-auto">
              <Link href="#" className="hover:text-amber-400 transition-colors">Gallery</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Careers</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Alumni</Link>
            </div>
          </div>
        </nav>

        <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#6d001d] text-white">
            <span className="font-bold tracking-wider uppercase text-sm">Navigation Menu</span>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-1.5">
            <Link href="/" onClick={handleMobileLink} className="px-4 py-3 rounded-md font-bold text-xs uppercase tracking-wider text-gray-800 hover:bg-gray-50 hover:text-[#6d001d] transition-colors border-l-4 border-transparent">
              Home
            </Link>
            <Link href="/achievements" onClick={handleMobileLink} className="px-4 py-3 rounded-md font-bold text-xs uppercase tracking-wider text-gray-800 hover:bg-gray-50 hover:text-[#6d001d] transition-colors border-l-4 border-transparent">
              Achievements
            </Link>

            {categories.map((cat) => (
              <div key={cat.Id} className="flex flex-col">
                {cat.pages?.length > 0 ? (
                  <>
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-md font-bold text-xs uppercase tracking-wider text-gray-800 hover:bg-gray-50 transition-colors text-left border-l-4 border-transparent ${openCategory === cat.Id ? "bg-gray-50 text-[#6d001d]" : ""}`}
                      onClick={() => setOpenCategory(openCategory === cat.Id ? null : cat.Id)}
                    >
                      {cat.Name}
                      <svg className={`w-4 h-4 transform transition-transform duration-200 ${openCategory === cat.Id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`flex flex-col pl-6 bg-gray-50/50 rounded-b-md overflow-hidden transition-all duration-300 ${openCategory === cat.Id ? "max-h-[500px] py-1 border-l-2 border-amber-400 ml-4" : "max-h-0"}`}>
                      {cat.pages.map((page) => (
                        <Link
                          key={page.Id}
                          href={`/pages/${slugify(page.Name)}/${page.Id}`}
                          onClick={handleMobileLink}
                          className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-[#6d001d] transition-colors uppercase tracking-wider"
                        >
                          {page.Name.replace(/-/g, " ")}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <button className="w-full text-left px-4 py-3 rounded-md font-bold text-xs uppercase tracking-wider text-gray-800 hover:bg-gray-50 transition-colors border-l-4 border-transparent">
                    {cat.Name}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
            <div className="relative w-[140px] h-[45px] mx-auto">
              <Image src="/poster/31y.png" alt="Admission Open" fill className="object-contain" />
            </div>
            <Link
              href="/admission-form"
              onClick={handleMobileLink}
              className="w-full bg-[#6d001d] text-white text-center py-3 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-[#850325] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Student Admission
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity backdrop-blur-xs"
            onClick={() => setOpen(false)}
          />
        )}
      </header>
    </>
  );
}