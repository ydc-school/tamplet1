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
      <header className="w-full relative z-50" ref={menuRef}>
        <nav className="bg-[#6d001d] text-white shadow-sm flex flex-col w-full text-xs">
          <div className="max-w-7xl mx-auto w-full px-6 py-2 flex justify-between items-center font-medium tracking-wide">
            <div className="flex gap-6 items-center">
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">badge</span>
                I-Card
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">info</span>
                Public Disclosure
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                NEP 2020
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">newspaper</span>
                VISTAS
              </Link>
            </div>
            <div className="flex gap-6 items-center">
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">login</span>
                Login
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:bg-white/10 transition-colors py-1 px-2 rounded">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Cyber Security
              </Link>
              <div className="flex gap-3 ml-4 border-l border-white/20 pl-4">
                <span className="material-symbols-outlined cursor-pointer hover:text-amber-400">account_circle</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-amber-400">groups</span>
              </div>
            </div>
          </div>
        </nav>
      
        <div className="bg-white  border-b border-gray-100">
          <div className="max-w-7xl mx-auto  flex justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-full  h-auto md:w-92 md:h-32  flex-shrink-0">
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
       
        <nav className={`bg-[#004d40] text-white w-full transition-all duration-300 ${scrolled ? "fixed top-0 left-0 shadow-md z-50" : "relative"}`}>
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