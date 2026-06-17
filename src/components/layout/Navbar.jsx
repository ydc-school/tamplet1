"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useSchool } from "@/context/SchoolContext";
import { useFallbackImage } from "@/hooks/useFallbackImage";
import slugify from "@/utils/slugify";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { schoolInfo, loading } = useSchool();
  const { src: logoSrc, handleError: handleLogoError } = useFallbackImage(schoolInfo?.Logo_Url, "/logo/logo.png");

  useEffect(() => {
    axios.get("/api/client/pages").then((res) => setCategories(res.data.data || []));
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-[#f1f5f9]" 
        : "bg-white border-b border-[#f1f5f9]"
    }`}>
      {/* SECTION 1 — Branding Bar */}
      <section 
        className={`max-w-[1280px] mx-auto px-8 flex justify-between items-center border-b border-[#f1f5f9]/60 transition-all duration-500 ${
          scrolled ? "h-0 opacity-0 overflow-hidden pointer-events-none py-0" : "h-24 py-4"
        }`} 
        aria-label="Branding"
      >
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-14 h-14 bg-[#1e1b4b] flex items-center justify-center transition-transform duration-500 group-hover:rotate-12" style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}>
            <Image 
              src={logoSrc} 
              alt={schoolInfo?.School_Name || "Logo"} 
              width={40} 
              height={40} 
              onError={handleLogoError} 
              priority 
              className="object-contain brightness-0 invert"
            />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#1e1b4b] leading-none tracking-tight">
              {loading ? "Yaduvanshi School" : schoolInfo?.School_Name}
            </h1>
            <p className="font-sans text-[10px] text-[#7f1d1d] font-black tracking-[0.25em] uppercase mt-1">
              Heritage of Excellence
            </p>
          </div>
        </Link>

        <figure aria-label="Admission Advertisement" className="hidden sm:block relative overflow-hidden rounded-full border border-[#7f1d1d]/20 shadow-sm group">
          <Image 
            src="/poster/31y.png" 
            alt="Admission Open" 
            width={180} 
            height={55} 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#7f1d1d]/5 pointer-events-none mix-blend-multiply" />
        </figure>
      </section>

      {/* SECTION 2 — Primary Navigation Bar */}
      <div className="w-full">
        <div className={`max-w-[1280px] mx-auto px-8 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "h-20" : "h-16"
        }`}>
          {/* Desktop Navigation with Pure CSS Hover Dropdown */}
          <nav aria-label="Main Navigation" className="hidden lg:block h-full">
            <ul className="flex items-center gap-8 font-sans text-sm font-semibold text-[#0f172a]/70 h-full">
              <li className="flex items-center h-full">
                <Link href="/" className="text-[#1e1b4b] font-bold relative group py-2">
                  Home
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7f1d1d] rounded-full scale-x-100 transition-transform origin-left" />
                </Link>
              </li>

              {categories.map((cat) => (
                /* 'group' क्लास पैरेंट पर जोड़ी ताकि होवर डिटेक्ट हो, और 'h-full flex items-center' ताकि होवर एरिया बड़ा रहे */
                <li key={cat.Id} className="relative group h-full flex items-center cursor-pointer">
                  {cat.pages?.length > 0 ? (
                    <div className="py-2">
                      <span className="hover:text-[#1e1b4b] flex items-center gap-1.5 transition-colors select-none">
                        {cat.Name}
                        <svg className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      
                      {/* Dropdown Container — Default 'invisible opacity-0' और Hover पर 'visible opacity-100' */}
                      <ul className="absolute top-[85%] left-0 w-64 bg-white/95 backdrop-blur-xl border border-[#f1f5f9] rounded-2xl shadow-xl p-3 space-y-1 z-50 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {cat.pages.map((page) => (
                          <li key={page.Id}>
                            <Link 
                              href={`/pages/${slugify(page.Name)}/${page.Id}`}
                              className="block px-4 py-2.5 rounded-xl hover:bg-[#f1f5f9] text-[#0f172a]/80 hover:text-[#1e1b4b] transition-all font-medium"
                            >
                              {page.Name.replace(/-/g, " ")}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <span className="hover:text-[#1e1b4b] transition-colors">{cat.Name}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Compact Left Branding for Scrolled State */}
          <div className={`lg:hidden flex items-center gap-3 ${scrolled ? "block" : "hidden"}`}>
            <div className="w-9 h-9 bg-[#1e1b4b] rounded-xl flex items-center justify-center">
              <span className="text-white font-serif text-sm font-bold">Y</span>
            </div>
            <span className="font-serif font-bold text-sm text-[#1e1b4b]">Yaduvanshi</span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4 ml-auto lg:ml-0">
            <Link 
              href="/admission-form"
              className="bg-[#1e1b4b] hover:bg-[#7f1d1d] text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Student Admission
            </Link>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              aria-label="Open menu"
              className="lg:hidden p-2.5 text-[#1e1b4b] hover:bg-[#f1f5f9] rounded-xl transition-colors focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Phone पर क्लिक ही सबसे बेस्ट रहता है) */}
      {isMobileMenuOpen && (
        <dialog 
          open 
          className="fixed inset-0 z-[100] w-full h-full bg-white/95 backdrop-blur-2xl flex flex-col p-8 overflow-y-auto border-none"
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1e1b4b] rounded-xl flex items-center justify-center">
                <span className="text-white font-serif text-base font-bold">Y</span>
              </div>
              <span className="font-serif font-bold text-lg text-[#1e1b4b]">Yaduvanshi Menu</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 bg-[#f1f5f9] hover:bg-[#7f1d1d] hover:text-white rounded-full flex items-center justify-center text-[#1e1b4b] transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile Navigation" className="w-full flex-1">
            <ul className="space-y-6 text-xl font-serif font-bold text-[#1e1b4b]">
              <li className="border-b border-[#f1f5f9] pb-3">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#7f1d1d] transition-colors">
                  Home
                </Link>
              </li>
              
              {categories.map((cat) => (
                <li key={cat.Id} className="border-b border-[#f1f5f9] pb-3">
                  {cat.pages?.length > 0 ? (
                    <details className="w-full group">
                      <summary className="flex justify-between items-center cursor-pointer list-none hover:text-[#7f1d1d] transition-colors focus:outline-none">
                        {cat.Name}
                        <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <ul className="mt-3 pl-4 space-y-3 text-sm font-sans font-medium text-[#0f172a]/70">
                        {cat.pages.map((page) => (
                          <li key={page.Id}>
                            <Link 
                              href={`/pages/${slugify(page.Name)}/${page.Id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-1 hover:text-[#1e1b4b] transition-colors"
                            >
                              {page.Name.replace(/-/g, " ")}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <span className="block hover:text-[#7f1d1d] transition-colors">{cat.Name}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </dialog>
      )}
    </header>
  );
}